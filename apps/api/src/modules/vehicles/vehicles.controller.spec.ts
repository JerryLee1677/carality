import { describe, expect, it, vi } from "vitest";
import { VehiclesController } from "./vehicles.controller";

describe("VehiclesController", () => {
  it("returns active vehicles from the vehicle service", async () => {
    const vehicles = [
      {
        slug: "byd-song-plus-dmi",
        brand: "比亚迪",
        series: "宋 PLUS",
        modelName: "DM-i",
        priceMin: 129800,
        priceMax: 189800,
        energyType: "PHEV",
        bodyType: "SUV",
        summary: "偏家庭导向",
        recommendation: "适合家庭用户",
      },
    ];
    const vehiclesService = {
      findActiveRecommendationVehicles: vi.fn().mockResolvedValue(vehicles),
    };
    const controller = new VehiclesController(vehiclesService as never);

    await expect(controller.listVehicles()).resolves.toEqual({ vehicles });
    expect(vehiclesService.findActiveRecommendationVehicles).toHaveBeenCalled();
  });

  it("returns one vehicle by slug", async () => {
    const vehicles = [
      {
        slug: "byd-song-plus-dmi",
        brand: "比亚迪",
      },
      {
        slug: "tesla-model-3",
        brand: "特斯拉",
      },
    ];
    const controller = new VehiclesController({
      findActiveRecommendationVehicles: vi.fn().mockResolvedValue(vehicles),
    } as never);

    await expect(controller.getVehicle("tesla-model-3")).resolves.toEqual({
      vehicle: {
        slug: "tesla-model-3",
        brand: "特斯拉",
      },
    });
  });
});
