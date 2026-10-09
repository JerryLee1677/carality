import { afterEach, describe, expect, it, vi } from "vitest";
import { VehiclesService } from "./vehicles.service";

describe("VehiclesService", () => {
  const originalEnv = { ...process.env };

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    process.env = { ...originalEnv };
  });

  it("loads active recommendation vehicles from Feishu Base tables", async () => {
    process.env.FEISHU_APP_ID = "cli_test";
    process.env.FEISHU_APP_SECRET = "secret_test";
    process.env.FEISHU_BASE_TOKEN = "base_test";
    process.env.FEISHU_VEHICLES_TABLE_ID = "tbl_vehicles";
    process.env.FEISHU_VEHICLE_TAGS_TABLE_ID = "tbl_tags";
    process.env.FEISHU_VEHICLE_WEIGHTS_TABLE_ID = "tbl_weights";
    process.env.FEISHU_VEHICLE_RULES_TABLE_ID = "tbl_rules";

    const fetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            code: 0,
            tenant_access_token: "tenant_token",
          }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            code: 0,
            data: {
              has_more: false,
              items: [
                {
                  record_id: "rec_vehicle",
                  fields: {
                    slug: "byd-song-plus-dmi",
                    brand: "比亚迪",
                    series: "宋 PLUS",
                    modelName: "DM-i",
                    priceMin: 129800,
                    priceMax: 189800,
                    energyType: ["PHEV"],
                    bodyType: ["SUV"],
                    summary: "偏家庭导向",
                    recommendation: "适合家庭用户",
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
                    status: "active",
                    recommendationStatus: "ACTIVE",
                  },
                },
                {
                  record_id: "rec_archived",
                  fields: {
                    slug: "archived-car",
                    brand: "旧品牌",
                    series: "旧车系",
                    modelName: "旧车型",
                    status: "archived",
                    recommendationStatus: "ACTIVE",
                  },
                },
              ],
            },
          }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            code: 0,
            data: {
              has_more: false,
              items: [
                {
                  fields: {
                    vehicleSlug: "byd-song-plus-dmi",
                    tag: "family",
                  },
                },
              ],
            },
          }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            code: 0,
            data: {
              has_more: false,
              items: [
                {
                  fields: {
                    vehicleSlug: "byd-song-plus-dmi",
                    targetType: ["VEHICLE_PREFERENCE"],
                    targetKey: "comfort_space",
                    weight: 9,
                  },
                },
              ],
            },
          }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            code: 0,
            data: {
              has_more: false,
              items: [
                {
                  fields: {
                    vehicleSlug: "byd-song-plus-dmi",
                    targetType: "HARD_CONSTRAINT",
                    targetKey: "budget_level",
                    traitOperator: ["GTE"],
                    traitThreshold: 2,
                  },
                },
              ],
            },
          }),
      });

    vi.stubGlobal("fetch", fetch);

    const service = new VehiclesService();

    await expect(service.findActiveRecommendationVehicles({} as never)).resolves.toEqual([
      {
        id: "byd-song-plus-dmi",
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
        tags: ["family"],
        traitWeights: [
          {
            targetType: "VEHICLE_PREFERENCE",
            targetKey: "comfort_space",
            weight: 9,
          },
        ],
        constraintRules: [
          {
            targetType: "HARD_CONSTRAINT",
            targetKey: "budget_level",
            traitOperator: "GTE",
            traitThreshold: 2,
          },
        ],
      },
    ]);

    expect(fetch).toHaveBeenCalledWith(
      "https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal",
      expect.objectContaining({
        method: "POST",
      }),
    );
    expect(fetch).toHaveBeenCalledWith(
      "https://open.feishu.cn/open-apis/bitable/v1/apps/base_test/tables/tbl_vehicles/records?page_size=500",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer tenant_token",
        }),
      }),
    );
  });
});
