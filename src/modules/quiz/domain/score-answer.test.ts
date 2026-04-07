import { describe, expect, it } from "vitest";
import { scoreAnswers } from "./score-answer";

describe("scoreAnswers", () => {
  it("aggregates dimension weights from selected options", () => {
    const result = scoreAnswers([
      { weights: { practical: 3, saving: 2, comfort: 1, value: 1 } },
      { weights: { emotional: 1, quality: 2, driving: 3, brand: 1 } },
    ]);

    expect(result).toEqual({
      practical: 3,
      emotional: 1,
      saving: 2,
      quality: 2,
      comfort: 1,
      driving: 3,
      brand: 1,
      value: 1,
    });
  });
});
