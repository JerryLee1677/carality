import { afterEach, describe, expect, it, vi } from "vitest";
import { VehiclesService } from "./vehicles.service";

function buildVehicle(overrides: Record<string, unknown> = {}) {
  return {
    id: "vehicle_1",
    slug: "byd-song-plus-dmi",
    brand: "比亚迪",
    series: "宋 PLUS",
    modelName: "DM-i",
    priceMin: 129_800,
    priceMax: 189_800,
    energyType: "PHEV",
    bodyType: "SUV",
    summary: "偏家庭导向",
    recommendation: "适合家庭用户",
    status: "active",
    handlingScore: 20,
    comfortScore: 92,
    spaceScore: 94,
    smartScore: 18,
    powerScore: 18,
    economyScore: 81,
    brandScore: 18,
    designScore: 18,
    reliabilityScore: 18,
    familyScore: 100,
    traitWeights: [
      { targetType: "VEHICLE_PREFERENCE", targetKey: "comfort_space", weight: 9 },
    ],
    constraintRules: [
      {
        targetType: "HARD_CONSTRAINT",
        targetKey: "budget_level",
        traitOperator: "GTE",
        traitThreshold: 2,
      },
    ],
    ...overrides,
  };
}

function buildDb() {
  return {
    vehicle: {
      findMany: vi.fn().mockResolvedValue([buildVehicle()]),
      findFirst: vi.fn().mockResolvedValue(buildVehicle()),
    },
  };
}

describe("VehiclesService", () => {
  const originalEnv = { ...process.env };

  afterEach(() => {
    vi.restoreAllMocks();
    process.env = { ...originalEnv };
  });

  it("loads the active vehicle pool from the database", async () => {
    const db = buildDb();

    const vehicles = await new VehiclesService().findActiveRecommendationVehicles(db as never);

    expect(vehicles).toHaveLength(1);
    expect(vehicles[0]).toMatchObject({ slug: "byd-song-plus-dmi", energyType: "PHEV" });
    expect(db.vehicle.findMany).toHaveBeenCalledWith({
      include: { traitWeights: true, constraintRules: true },
      where: { status: "active", recommendationStatus: "ACTIVE" },
    });
  });

  it("serves repeated catalog reads from the in-process cache", async () => {
    const db = buildDb();
    const service = new VehiclesService();

    await service.findActiveRecommendationVehicles(db as never);
    await service.findActiveRecommendationVehicles(db as never);

    expect(db.vehicle.findMany).toHaveBeenCalledTimes(1);
  });

  it("deduplicates concurrent catalog reads", async () => {
    const db = buildDb();
    const service = new VehiclesService();

    await Promise.all([
      service.findActiveRecommendationVehicles(db as never),
      service.findActiveRecommendationVehicles(db as never),
    ]);

    expect(db.vehicle.findMany).toHaveBeenCalledTimes(1);
  });

  it("queries the database again when the cache is disabled", async () => {
    process.env.VEHICLE_CATALOG_CACHE_TTL_MS = "0";
    const db = buildDb();
    const service = new VehiclesService();

    await service.findActiveRecommendationVehicles(db as never);
    await service.findActiveRecommendationVehicles(db as never);

    expect(db.vehicle.findMany).toHaveBeenCalledTimes(2);
  });

  it("does not cache failed catalog reads", async () => {
    const db = buildDb();
    db.vehicle.findMany
      .mockRejectedValueOnce(new Error("database unavailable"))
      .mockResolvedValueOnce([buildVehicle()]);
    const service = new VehiclesService();

    await expect(service.findActiveRecommendationVehicles(db as never)).rejects.toThrow(
      "database unavailable",
    );
    await expect(service.findActiveRecommendationVehicles(db as never)).resolves.toHaveLength(1);
    expect(db.vehicle.findMany).toHaveBeenCalledTimes(2);
  });

  it("reads a single vehicle by slug instead of the whole pool", async () => {
    const db = buildDb();

    const vehicle = await new VehiclesService().findVehicleBySlug(db as never, "byd-song-plus-dmi");

    expect(vehicle).toMatchObject({ slug: "byd-song-plus-dmi" });
    expect(db.vehicle.findFirst).toHaveBeenCalledWith({
      include: { traitWeights: true, constraintRules: true },
      where: {
        status: "active",
        recommendationStatus: "ACTIVE",
        slug: "byd-song-plus-dmi",
      },
    });
    expect(db.vehicle.findMany).not.toHaveBeenCalled();
  });

  it("returns null when the slug is not in the active pool", async () => {
    const db = buildDb();
    db.vehicle.findFirst.mockResolvedValue(null);

    await expect(
      new VehiclesService().findVehicleBySlug(db as never, "missing-slug"),
    ).resolves.toBeNull();
  });
});
