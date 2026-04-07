import { describe, expect, it } from "vitest";
import { buildPersonalityCode } from "./build-personality-code";

describe("buildPersonalityCode", () => {
  it("builds a 4-letter code with stable tie-breakers", () => {
    const code = buildPersonalityCode({
      practical: 8,
      emotional: 8,
      saving: 6,
      quality: 4,
      comfort: 3,
      driving: 3,
      brand: 2,
      value: 2,
    });

    expect(code).toBe("PSCV");
  });
});
