import {
  isLikelyDongchediBlock,
  nextHumanDelayMs,
  shouldTakeHumanRest,
} from "./dongchedi-pacing";

describe("Dongchedi human pacing", () => {
  it("generates randomized delays within the configured range", () => {
    const options = { delayMs: 3000, maxDelayMs: 9000, restEvery: 40, restMs: 180000 };

    expect(nextHumanDelayMs(options, () => 0)).toBe(3000);
    expect(nextHumanDelayMs(options, () => 0.5)).toBe(6000);
    expect(nextHumanDelayMs(options, () => 0.999)).toBe(8994);
  });

  it("requires a rest only after the configured number of fetched pages", () => {
    const options = { delayMs: 3000, maxDelayMs: 9000, restEvery: 3, restMs: 180000 };

    expect(shouldTakeHumanRest(2, options)).toBe(false);
    expect(shouldTakeHumanRest(3, options)).toBe(true);
    expect(shouldTakeHumanRest(4, options)).toBe(false);
    expect(shouldTakeHumanRest(6, options)).toBe(true);
  });

  it("detects likely blocked and rate-limited responses", () => {
    expect(isLikelyDongchediBlock({ status: 200, html: "" })).toBe(true);
    expect(isLikelyDongchediBlock({ status: 403, html: "<html></html>" })).toBe(true);
    expect(isLikelyDongchediBlock({ status: 429, html: "<html></html>" })).toBe(true);
    expect(isLikelyDongchediBlock({ status: 200, html: "no data" })).toBe(true);
    expect(isLikelyDongchediBlock({ status: 200, html: "__NEXT_DATA__" })).toBe(false);
  });
});
