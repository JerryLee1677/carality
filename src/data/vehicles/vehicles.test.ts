import { describe, expect, it } from "vitest";
import { questions } from "@/data/quiz/questions";
import { vehicles } from "@/data/vehicles/vehicles";

describe("seed data", () => {
  it("contains 11 questions with at least 2 options each", () => {
    expect(questions).toHaveLength(11);
    expect(questions.every((question) => question.options.length >= 2)).toBe(true);
  });

  it("contains at least 20 vehicles with 8 dimension weights", () => {
    expect(vehicles.length).toBeGreaterThanOrEqual(20);

    expect(
      vehicles.every((vehicle) =>
        [
          "practical",
          "emotional",
          "saving",
          "quality",
          "comfort",
          "driving",
          "brand",
          "value",
        ].every((key) => typeof vehicle.dimensionWeights[key as keyof typeof vehicle.dimensionWeights] === "number"),
      ),
    ).toBe(true);
  });
});
