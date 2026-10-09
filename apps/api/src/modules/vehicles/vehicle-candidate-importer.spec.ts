import { describe, expect, it, vi } from "vitest";
import {
  buildVehicleFromCandidate,
  importVehicleCandidates,
  isImportablePassengerCandidate,
  type ImportableExternalVehicleCandidate,
} from "./vehicle-candidate-importer";

function buildCandidate(overrides: Partial<ImportableExternalVehicleCandidate> = {}) {
  return {
    source: "dongchedi",
    sourceSeriesId: 415,
    sourceCarId: 253447,
    brandName: "大众",
    seriesName: "迈腾",
    carName: "300TSI 尊享版",
    energyType: "ICE",
    bodyType: "三厢车",
    priceMin: 179900,
    priceMax: 179900,
    coreScores: {
      handlingScore: 61,
      comfortScore: 63,
      spaceScore: 70,
      smartScore: 68,
      powerScore: 64,
      economyScore: 66,
      brandScore: 76,
      designScore: 73,
      reliabilityScore: 69,
      familyScore: 70,
    },
    traitWeights: [
      { targetType: "PERSONALITY_TRAIT", targetKey: "comfort_space", weight: 7 },
    ],
    constraintRules: [
      { targetType: "HARD_CONSTRAINT", targetKey: "budget_level", traitOperator: "GTE", traitThreshold: 3 },
    ],
    dataConfidence: 1,
    qualityStatus: "PENDING",
    rejectReason: null,
    ...overrides,
  } as ImportableExternalVehicleCandidate;
}

describe("vehicle candidate importer", () => {
  it("accepts pending priced passenger cars with sufficient confidence", () => {
    expect(isImportablePassengerCandidate(buildCandidate())).toBe(true);
  });

  it("rejects commercial vehicles, low-confidence data, and missing prices", () => {
    expect(isImportablePassengerCandidate(buildCandidate({ bodyType: "微卡" }))).toBe(false);
    expect(isImportablePassengerCandidate(buildCandidate({ dataConfidence: 0.7 }))).toBe(false);
    expect(isImportablePassengerCandidate(buildCandidate({ priceMin: null }))).toBe(false);
    expect(isImportablePassengerCandidate(buildCandidate({ qualityStatus: "REJECTED" }))).toBe(false);
  });

  it("maps an external candidate into an auditable vehicle row", () => {
    const input = buildVehicleFromCandidate(buildCandidate());

    expect(input).toMatchObject({
      slug: "dongchedi-415-253447",
      brand: "大众",
      series: "迈腾",
      modelName: "300TSI 尊享版",
      priceMin: 179900,
      priceMax: 179900,
      energyType: "ICE",
      bodyType: "三厢车",
      status: "active",
      recommendationStatus: "PENDING",
      source: "dongchedi",
      sourceSeriesId: 415,
      sourceCarId: 253447,
      dataConfidence: 1,
      handlingScore: 61,
      comfortScore: 63,
      spaceScore: 70,
    });
    expect(input.traitWeights.create).toHaveLength(1);
    expect(input.constraintRules.create).toHaveLength(1);
  });

  it("imports eligible candidates once and skips duplicates", async () => {
    const candidate = buildCandidate();
    const db = {
      externalVehicleCandidate: {
        findMany: vi.fn().mockResolvedValue([candidate, candidate]),
      },
      vehicle: {
        findMany: vi.fn().mockResolvedValue([]),
        findFirst: vi.fn().mockResolvedValueOnce(null).mockResolvedValueOnce({ id: "existing" }),
        create: vi.fn(),
      },
    };

    const summary = await importVehicleCandidates(db, {});

    expect(summary.checked).toBe(2);
    expect(summary.imported).toBe(1);
    expect(summary.skippedExisting).toBe(1);
    expect(db.vehicle.create).toHaveBeenCalledTimes(1);
  });
});
