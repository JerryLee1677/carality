import { afterEach, describe, expect, it, vi } from "vitest";
import { vehicleRepository } from "./vehicle-repository";

describe("vehicleRepository", () => {
  const originalEnv = { ...process.env };

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    process.env = { ...originalEnv };
  });

  it("loads vehicles from the assessment API", async () => {
    process.env.ASSESSMENT_API_BASE_URL = "http://api.test";
    const fetch = vi.fn().mockResolvedValue({
      ok: true,
      headers: {
        get: () => "application/json",
      },
      json: () =>
        Promise.resolve({
          vehicles: [
            {
              slug: "byd-song-plus-dmi",
              brand: "比亚迪",
            },
          ],
        }),
    });
    vi.stubGlobal("fetch", fetch);

    await expect(vehicleRepository.getAll()).resolves.toEqual([
      {
        slug: "byd-song-plus-dmi",
        brand: "比亚迪",
      },
    ]);
    expect(fetch).toHaveBeenCalledWith(
      "http://api.test/vehicles",
      expect.objectContaining({
        cache: "no-store",
      }),
    );
  });

  it("loads one vehicle by slug from the assessment API", async () => {
    process.env.ASSESSMENT_API_BASE_URL = "http://api.test";
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        headers: {
          get: () => "application/json",
        },
        json: () =>
          Promise.resolve({
            vehicle: {
              slug: "tesla-model-3",
              brand: "特斯拉",
            },
          }),
      }),
    );

    await expect(vehicleRepository.getBySlug("tesla-model-3")).resolves.toEqual({
      slug: "tesla-model-3",
      brand: "特斯拉",
    });
  });
});
