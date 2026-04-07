import { describe, expect, it } from "vitest";
import { matchVehicles } from "./match-vehicles";

describe("matchVehicles", () => {
  it("returns the best match first and keeps up to 4 ranked vehicles", () => {
    const results = matchVehicles(
      {
        practical: 8,
        emotional: 2,
        saving: 9,
        quality: 4,
        comfort: 8,
        driving: 3,
        brand: 2,
        value: 9,
      },
      [
        {
          slug: "family-suv",
          modelName: "家庭 SUV",
          dimensionWeights: {
            practical: 90,
            emotional: 40,
            saving: 92,
            quality: 65,
            comfort: 88,
            driving: 45,
            brand: 50,
            value: 90,
          },
        },
        {
          slug: "sport-sedan",
          modelName: "运动轿车",
          dimensionWeights: {
            practical: 45,
            emotional: 85,
            saving: 40,
            quality: 72,
            comfort: 50,
            driving: 90,
            brand: 80,
            value: 55,
          },
        },
      ],
    );

    expect(results[0].slug).toBe("family-suv");
    expect(results).toHaveLength(2);
  });
});
