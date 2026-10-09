import type { DongchediCarDetailsRecord } from "./dongchedi-car-details-importer";

export type CoreScores = {
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

export type TraitWeight = {
  targetType: "VEHICLE_PREFERENCE" | "PERSONALITY_TRAIT";
  targetKey: string;
  weight: number;
};

export type ConstraintRule = {
  targetType: "HARD_CONSTRAINT";
  targetKey: string;
  traitOperator: "GTE";
  traitThreshold: number;
};

export type VehicleCandidate = {
  source: "dongchedi";
  sourceSeriesId: number;
  sourceCarId: number;
  brandName: string;
  seriesName: string;
  carName: string;
  energyType: DongchediCarDetailsRecord["energyType"];
  bodyType: string;
  priceMin: number | null;
  priceMax: number | null;
  coreScores: CoreScores;
  traitWeights: TraitWeight[];
  constraintRules: ConstraintRule[];
  dataConfidence: number;
  qualityStatus: "PENDING" | "REJECTED";
  rejectReason: string | null;
};

const brandTiers: Record<string, number> = {
  奔驰: 88, 宝马: 88, 奥迪: 85, 保时捷: 96, 雷克萨斯: 86,
  特斯拉: 84, 蔚来: 80, 理想: 80, 问界: 80, 极氪: 78,
  大众: 76, 丰田: 78, 本田: 77, 别克: 72, 福特: 72,
  比亚迪: 78, 吉利: 72, 长安: 70, 奇瑞: 69, 长城: 69,
  五菱: 62, 吉利银河: 72,
};

function clampScore(value: number) {
  return Math.max(10, Math.min(98, Math.round(value)));
}

function normalizeRange(value: number | null, min: number, max: number, inverted = false) {
  if (value === null) {
    return 0.5;
  }

  const ratio = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return inverted ? 1 - ratio : ratio;
}

function priceFromTexts(
  officialPrice: string | null | undefined,
  dealerPrice: string | null | undefined,
) {
  for (const text of [officialPrice, dealerPrice]) {
    if (!text || text.includes("暂无")) {
      continue;
    }

    const range = text.match(/^(\d+(?:\.\d+)?)-(\d+(?:\.\d+)?)万/);
    if (range) {
      return {
        priceMin: Math.round(Number(range[1]) * 10_000),
        priceMax: Math.round(Number(range[2]) * 10_000),
      };
    }

    const values = [...text.matchAll(/(\d+(?:\.\d+)?)万/g)].map((match) => Number(match[1]));
    if (values.length > 0) {
      return {
        priceMin: Math.round(Math.min(...values) * 10_000),
        priceMax: Math.round(Math.max(...values) * 10_000),
      };
    }
  }

  return { priceMin: null, priceMax: null };
}

function bodySizeBonus(bodyType: string) {
  if (bodyType.includes("MPV")) return 8;
  if (bodyType.includes("SUV")) return 4;
  return 0;
}

function buildCoreScores(record: DongchediCarDetailsRecord): CoreScores {
  const wheelbase = normalizeRange(record.wheelbaseMm, 2400, 3200);
  const length = normalizeRange(record.lengthMm, 3600, 5400);
  const width = normalizeRange(record.widthMm, 1600, 2050);
  const seats = normalizeRange(record.seatCount, 2, 9);
  const powerToWeight =
    record.maxPowerKw && record.curbWeightKg
      ? normalizeRange((record.maxPowerKw / record.curbWeightKg) * 1000, 40, 200)
      : 0.5;
  const acceleration = normalizeRange(record.acceleration100, 4, 14, true);
  const fuelEconomy = normalizeRange(record.wltcFuelL100km, 3.5, 12, true);
  const electricRange = normalizeRange(record.rangeKm, 150, 800);
  const bodyBonus = bodySizeBonus(record.bodyType);

  const spaceScore = clampScore(38 + wheelbase * 30 + length * 20 + width * 12 + seats * 10 + bodyBonus);
  const comfortScore = clampScore(48 + wheelbase * 25 + length * 10 + bodyBonus * 1.5);
  const familyScore = clampScore(35 + seats * 25 + spaceScore * 0.35 + bodyBonus * 2);
  const powerScore = clampScore(38 + powerToWeight * 35 + acceleration * 30);
  const handlingScore = clampScore(
    43 + powerToWeight * 22 + acceleration * 15 +
      (record.driveForm?.includes("四驱") ? 12 : 0) +
      (record.bodyType.includes("轿车") ? 5 : 0),
  );
  const economyScore = clampScore(
    record.energyType === "EV"
      ? 55 + electricRange * 25
      : 48 + fuelEconomy * 35 + (record.energyType === "HEV" ? 10 : 0),
  );
  const smartScore = clampScore(
    50 +
      (record.hasOtaUpgrade ? 12 : 0) +
      (record.hasNavigationAssistedDriving ? 16 : 0) +
      (record.hasVoiceRecognition ? 6 : 0) +
      (record.centerScreenSize ? 12 : 0),
  );
  const brandBase = Object.entries(brandTiers).find(([brand]) => record.brandName.includes(brand))?.[1] ?? 65;
  const brandScore = clampScore(brandBase);

  return {
    handlingScore,
    comfortScore,
    spaceScore,
    smartScore,
    powerScore,
    economyScore,
    brandScore,
    designScore: clampScore(brandBase * 0.8 + 12),
    reliabilityScore: clampScore(brandBase * 0.75 + 12),
    familyScore,
  };
}

function buildTraitWeights(coreScores: CoreScores): TraitWeight[] {
  const dimensions: Array<{ targetKey: string; score: number; personality?: boolean }> = [
    { targetKey: "driving_engagement", score: coreScores.handlingScore * 0.6 + coreScores.powerScore * 0.4 },
    { targetKey: "comfort_space", score: coreScores.comfortScore * 0.6 + coreScores.spaceScore * 0.4 },
    { targetKey: "family_fit", score: coreScores.familyScore },
    { targetKey: "running_cost", score: coreScores.economyScore },
    { targetKey: "smart_features", score: coreScores.smartScore },
    { targetKey: "brand_expression", score: coreScores.brandScore * 0.7 + coreScores.designScore * 0.3 },
    { targetKey: "daily_reliability", score: coreScores.reliabilityScore, personality: false },
    { targetKey: "stability_preference", score: coreScores.reliabilityScore, personality: true },
  ];

  return dimensions
    .sort((left, right) => right.score - left.score)
    .slice(0, 5)
    .map((dimension) => ({
      targetType: dimension.personality ? "PERSONALITY_TRAIT" : "VEHICLE_PREFERENCE",
      targetKey: dimension.targetKey,
      weight: Math.max(5, Math.min(10, Math.round(dimension.score / 10))),
    }));
}

function buildConstraintRules(
  record: DongchediCarDetailsRecord,
  priceMin: number | null,
): ConstraintRule[] {
  const rules: ConstraintRule[] = [];

  if (record.energyType === "EV") {
    rules.push(
      { targetType: "HARD_CONSTRAINT", targetKey: "charging_access", traitOperator: "GTE", traitThreshold: 3 },
      { targetType: "HARD_CONSTRAINT", targetKey: "energy_acceptance_ev", traitOperator: "GTE", traitThreshold: 3 },
    );
  }

  if (record.energyType === "PHEV" || record.energyType === "EREV") {
    rules.push(
      { targetType: "HARD_CONSTRAINT", targetKey: "charging_access", traitOperator: "GTE", traitThreshold: 2 },
      { targetType: "HARD_CONSTRAINT", targetKey: "energy_acceptance_phev", traitOperator: "GTE", traitThreshold: 2 },
    );
  }

  if ((record.bodyType.includes("MPV") || record.seatCount === 7) && priceMin !== null) {
    rules.push({
      targetType: "HARD_CONSTRAINT",
      targetKey: "family_size",
      traitOperator: "GTE",
      traitThreshold: 2,
    });
  }

  return rules;
}

export function buildVehicleCandidate(
  record: DongchediCarDetailsRecord,
  seriesOfficialPriceText?: string | null | undefined,
  seriesDealerPriceText?: string | null | undefined,
): VehicleCandidate {
  const directPrice = priceFromTexts(record.officialPriceText, record.dealerPriceText);
  const fallbackPrice = priceFromTexts(seriesOfficialPriceText, seriesDealerPriceText);
  const { priceMin, priceMax } = directPrice.priceMin !== null ? directPrice : fallbackPrice;
  const coreScores = buildCoreScores(record);
  const requiredFields = [
    record.wheelbaseMm,
    record.lengthMm,
    record.widthMm,
    record.heightMm,
    record.seatCount,
    record.maxPowerKw,
    record.maxTorqueNm,
    priceMin,
    priceMax,
    record.acceleration100,
    record.energyType === "EV" ? record.rangeKm : record.wltcFuelL100km,
    record.energyType === "EV" ? record.batteryCapacityKwh : record.wltcFuelL100km,
  ];
  const missingCount = requiredFields.filter((value) => value === null).length;
  const dataConfidence = Number(Math.max(0.3, 1 - missingCount * 0.09).toFixed(2));
  const missingCritical = priceMin === null || record.maxPowerKw === null || record.seatCount === null;

  return {
    source: "dongchedi",
    sourceSeriesId: record.sourceSeriesId,
    sourceCarId: record.sourceCarId,
    brandName: record.brandName,
    seriesName: record.seriesName,
    carName: record.carName,
    energyType: record.energyType,
    bodyType: record.bodyType,
    priceMin,
    priceMax,
    coreScores,
    traitWeights: buildTraitWeights(coreScores),
    constraintRules: buildConstraintRules(record, priceMin),
    dataConfidence,
    qualityStatus: missingCritical ? "REJECTED" : "PENDING",
    rejectReason: missingCritical ? "missing_price_power_or_seat_data" : null,
  };
}
