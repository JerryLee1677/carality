import {
  buildScoreCalibration,
  calibrateCoreScores,
  type CoreScores,
} from "./vehicle-score-calibrator";

type ReferenceVehicle = {
  energyType: string;
  bodyType: string;
  handlingScore: number;
  comfortScore: number;
  spaceScore: number;
  smartScore: number;
  powerScore: number;
  economyScore: number;
  brandScore: number;
  designScore: number;
  reliabilityScore: number;
  familyScore: number;
};

export type ImportableExternalVehicleCandidate = {
  source: string;
  sourceSeriesId: number;
  sourceCarId: number;
  brandName: string;
  seriesName: string;
  carName: string;
  energyType: string;
  bodyType: string;
  priceMin: number | null;
  priceMax: number | null;
  coreScores: CoreScores;
  traitWeights: Array<{
    targetType: "HARD_CONSTRAINT" | "PERSONALITY_TRAIT" | "VEHICLE_PREFERENCE";
    targetKey: string;
    weight: number | { toString(): string };
  }>;
  constraintRules: Array<{
    targetType: "HARD_CONSTRAINT";
    targetKey: string;
    traitOperator: "EQ" | "NEQ" | "GT" | "GTE" | "LT" | "LTE";
    traitThreshold: number | { toString(): string };
  }>;
  dataConfidence: number | { toString(): string };
  qualityStatus: string;
  rejectReason: string | null;
};

export type ImportedVehicleInput = {
  slug: string;
  brand: string;
  series: string;
  modelName: string;
  priceMin: number;
  priceMax: number;
  energyType: string;
  bodyType: string;
  handlingScore: number;
  comfortScore: number;
  spaceScore: number;
  smartScore: number;
  powerScore: number;
  economyScore: number;
  brandScore: number;
  designScore: number;
  reliabilityScore: number;
  familyScore: number;
  summary: string;
  recommendation: string;
  status: string;
  source: string;
  sourceSeriesId: number;
  sourceCarId: number;
  dataConfidence: number;
  recommendationStatus: string;
  traitWeights: {
    create: Array<{
      targetType: "HARD_CONSTRAINT" | "PERSONALITY_TRAIT" | "VEHICLE_PREFERENCE";
      targetKey: string;
      weight: number;
    }>;
  };
  constraintRules: {
    create: Array<{
      targetType: "HARD_CONSTRAINT";
      targetKey: string;
      traitOperator: "EQ" | "NEQ" | "GT" | "GTE" | "LT" | "LTE";
      traitThreshold: number;
    }>;
  };
};

type VehicleImporterDb = {
  vehicle: {
    findMany(args?: { where?: Record<string, unknown> }): Promise<unknown[]>;
    findFirst(args: { where: Record<string, unknown> }): Promise<unknown | null>;
    create(args: { data: ImportedVehicleInput }): Promise<unknown>;
  };
  externalVehicleCandidate: {
    findMany(args: {
      where: Record<string, unknown>;
      orderBy: Record<string, string>;
    }): Promise<ImportableExternalVehicleCandidate[]>;
  };
};

const commercialBodyTypes = new Set([
  "微卡",
  "货车",
  "轻卡",
  "客车",
  "轻客",
  "微面",
  "房车",
]);

export function isImportablePassengerCandidate(candidate: ImportableExternalVehicleCandidate) {
  const confidence = Number(candidate.dataConfidence);
  return (
    candidate.qualityStatus === "PENDING" &&
    candidate.priceMin !== null &&
    candidate.priceMax !== null &&
    Number.isFinite(confidence) &&
    confidence >= 0.75 &&
    !commercialBodyTypes.has(candidate.bodyType)
  );
}

export function buildVehicleFromCandidate(
  candidate: ImportableExternalVehicleCandidate,
  calibration: ReturnType<typeof buildScoreCalibration> = {},
): ImportedVehicleInput {
  const confidence = Number(candidate.dataConfidence);
  const scoreEntries = Object.entries(candidate.coreScores) as Array<[keyof CoreScores, number]>;

  for (const [, value] of scoreEntries) {
    if (!Number.isFinite(value)) {
      throw new Error(`External candidate ${candidate.sourceCarId} has invalid core scores`);
    }
  }

  return {
    slug: `${candidate.source}-${candidate.sourceSeriesId}-${candidate.sourceCarId}`,
    brand: candidate.brandName,
    series: candidate.seriesName,
    modelName: candidate.carName,
    priceMin: candidate.priceMin ?? 0,
    priceMax: candidate.priceMax ?? 0,
    energyType: candidate.energyType,
    bodyType: candidate.bodyType,
    ...calibrateCoreScores(candidate.coreScores, calibration, candidate),
    summary: `${candidate.brandName}${candidate.seriesName}，基于懂车帝参数生成的候选车型。`,
    recommendation: "数据审核通过后进入车型推荐池",
    status: "active",
    source: candidate.source,
    sourceSeriesId: candidate.sourceSeriesId,
    sourceCarId: candidate.sourceCarId,
    dataConfidence: confidence,
    recommendationStatus: "PENDING",
    traitWeights: {
      create: candidate.traitWeights.map((weight) => ({
        targetType: weight.targetType,
        targetKey: weight.targetKey,
        weight: Number(weight.weight),
      })),
    },
    constraintRules: {
      create: candidate.constraintRules.map((rule) => ({
        targetType: rule.targetType,
        targetKey: rule.targetKey,
        traitOperator: rule.traitOperator,
        traitThreshold: Number(rule.traitThreshold),
      })),
    },
  };
}

export async function importVehicleCandidates(
  db: VehicleImporterDb,
  options: { source?: string; limit?: number; dryRun?: boolean } = {},
) {
  const source = options.source ?? "dongchedi";
  const referenceVehicles = await db.vehicle.findMany({
    where: { source: "internal", recommendationStatus: "ACTIVE" },
  }) as unknown as ReferenceVehicle[];
  const candidates = await db.externalVehicleCandidate.findMany({
    where: { source, qualityStatus: "PENDING" },
    orderBy: { sourceSeriesId: "asc" },
  });
  const externalCalibrationRows = candidates.map((candidate) => ({
    energyType: candidate.energyType,
    bodyType: candidate.bodyType,
    coreScores: candidate.coreScores,
  }));
  const calibration = buildScoreCalibration(
    referenceVehicles.map((vehicle) => ({
      energyType: vehicle.energyType,
      bodyType: vehicle.bodyType,
      coreScores: {
        handlingScore: vehicle.handlingScore,
        comfortScore: vehicle.comfortScore,
        spaceScore: vehicle.spaceScore,
        smartScore: vehicle.smartScore,
        powerScore: vehicle.powerScore,
        economyScore: vehicle.economyScore,
        brandScore: vehicle.brandScore,
        designScore: vehicle.designScore,
        reliabilityScore: vehicle.reliabilityScore,
        familyScore: vehicle.familyScore,
      },
    })),
    externalCalibrationRows,
  );
  const summary = {
    checked: 0,
    imported: 0,
    skippedExisting: 0,
    rejected: {
      commercialBodyType: 0,
      lowConfidence: 0,
      missingPrice: 0,
    },
    dryRun: options.dryRun ?? false,
  };

  for (const candidate of candidates) {
    if (options.limit !== undefined && summary.checked >= options.limit) {
      break;
    }

    summary.checked += 1;

    if (candidate.priceMin === null || candidate.priceMax === null) {
      summary.rejected.missingPrice += 1;
      continue;
    }
    if (Number(candidate.dataConfidence) < 0.75) {
      summary.rejected.lowConfidence += 1;
      continue;
    }
    if (commercialBodyTypes.has(candidate.bodyType)) {
      summary.rejected.commercialBodyType += 1;
      continue;
    }

    const existing = await db.vehicle.findFirst({
      where: {
        source,
        sourceSeriesId: candidate.sourceSeriesId,
        sourceCarId: candidate.sourceCarId,
      },
    });
    if (existing) {
      summary.skippedExisting += 1;
      continue;
    }

    if (!options.dryRun) {
      await db.vehicle.create({
        data: buildVehicleFromCandidate(candidate, calibration),
      });
    }
    summary.imported += 1;
  }

  return summary;
}
