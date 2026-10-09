export type CoreScoreKey =
  | "handlingScore"
  | "comfortScore"
  | "spaceScore"
  | "smartScore"
  | "powerScore"
  | "economyScore"
  | "brandScore"
  | "designScore"
  | "reliabilityScore"
  | "familyScore";

export type CoreScores = Record<CoreScoreKey, number>;

export type CalibrationVehicle = {
  energyType: string;
  bodyType: string;
  coreScores: CoreScores;
};

type ScoreTransform = {
  referenceMin: number;
  referenceMax: number;
  externalMin: number;
  externalMax: number;
};

export type ScoreCalibration = Record<string, Record<CoreScoreKey, ScoreTransform>>;

const scoreKeys: CoreScoreKey[] = [
  "handlingScore",
  "comfortScore",
  "spaceScore",
  "smartScore",
  "powerScore",
  "economyScore",
  "brandScore",
  "designScore",
  "reliabilityScore",
  "familyScore",
];

function minMax(values: number[]): ScoreTransform["referenceMin"] extends never ? never : { min: number; max: number } {
  if (values.length === 0) {
    return { min: 50, max: 50 };
  }

  return { min: Math.min(...values), max: Math.max(...values) };
}

function calibrationGroup(vehicle: Pick<CalibrationVehicle, "energyType" | "bodyType">) {
  if (vehicle.bodyType.includes("MPV")) {
    return `${vehicle.energyType}:MPV`;
  }
  if (vehicle.bodyType.includes("SUV")) {
    return `${vehicle.energyType}:SUV`;
  }
  return vehicle.energyType;
}

export function buildScoreCalibration(
  referenceVehicles: CalibrationVehicle[],
  externalVehicles: CalibrationVehicle[],
): ScoreCalibration {
  const referenceGroups = new Map<string, CalibrationVehicle[]>();
  const externalGroups = new Map<string, CalibrationVehicle[]>();

  for (const vehicle of referenceVehicles) {
    const key = calibrationGroup(vehicle);
    referenceGroups.set(key, [...(referenceGroups.get(key) ?? []), vehicle]);
  }
  for (const vehicle of externalVehicles) {
    const key = calibrationGroup(vehicle);
    externalGroups.set(key, [...(externalGroups.get(key) ?? []), vehicle]);
  }

  const calibration: ScoreCalibration = {};
  for (const [group, referenceRows] of referenceGroups) {
    const externalRows = externalGroups.get(group);
    if (!externalRows || externalRows.length === 0) {
      continue;
    }

    calibration[group] = Object.fromEntries(
      scoreKeys.map((key) => {
        const reference = minMax(referenceRows.map((row) => row.coreScores[key]));
        const external = minMax(externalRows.map((row) => row.coreScores[key]));

        return [
          key,
          {
            referenceMin: reference.min,
            referenceMax: reference.max,
            externalMin: external.min,
            externalMax: external.max,
          },
        ];
      }),
    ) as Record<CoreScoreKey, ScoreTransform>;
  }

  return calibration;
}

function clampScore(value: number) {
  return Math.max(35, Math.min(92, Math.round(value)));
}

export function calibrateCoreScores(
  scores: CoreScores,
  calibration: ScoreCalibration,
  vehicle: Pick<CalibrationVehicle, "energyType" | "bodyType">,
): CoreScores {
  const group = calibration[calibrationGroup(vehicle)];
  if (!group) {
    return Object.fromEntries(
      scoreKeys.map((key) => [key, clampScore(scores[key])]),
    ) as CoreScores;
  }

  return Object.fromEntries(
    scoreKeys.map((key) => {
      const transform = group[key];
      const externalRange = transform.externalMax - transform.externalMin;
      const referenceRange = transform.referenceMax - transform.referenceMin;
      const ratio = externalRange === 0 ? 0.5 : (scores[key] - transform.externalMin) / externalRange;
      const calibrated =
        externalRange === 0
          ? (transform.referenceMin + transform.referenceMax) / 2
          : transform.referenceMin + ratio * referenceRange;

      return [key, clampScore(calibrated)];
    }),
  ) as CoreScores;
}
