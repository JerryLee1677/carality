import { describe, expect, it } from "vitest";
import { resolveVehiclePoolPolicy, normalizeVehicleSeries } from "./mainstream-vehicle-pool";
import { AssessmentService } from "../assessment/assessment.service";
import { deriveUserConditions } from "../questions/user-conditions";
import { vehicles as seededVehicles } from "../../../prisma/seed-data/vehicles";

function vehicle(id: string, brand: string, series: string, score = 70, priceMin = 150_000, energyType = "ICE") {
  return { id, slug: id, brand, series, priceMin, priceMax: priceMin, energyType,
    traitWeights: [], constraintRules: [], handlingScore: score, comfortScore: score,
    spaceScore: score, smartScore: score, powerScore: score, economyScore: score,
    brandScore: score, designScore: score, reliabilityScore: score, familyScore: score };
}

function recommend(vehicles: ReturnType<typeof vehicle>[], choices: Record<string, number> = {}) {
  const service = new AssessmentService({} as never, {} as never);
  return (service as any).buildDualBucketRankedVehicleRecommendations(vehicles, {
    byKey: {}, byTargetType: {}, minByTargetType: {},
    userConditions: deriveUserConditions(Object.entries(choices).map(([slug, order]) => ({ question: { slug }, option: { order } }))),
  }) as Array<{ slug: string; score: number; diagnostics: { poolTier: string; constraintMisses: string[] } }>;
}

describe("mainstream vehicle pool", () => {
  it.each([
    { name: "低预算燃油通勤", budget: 1, energy: 1, allowed: ["ICE", "HEV"], ceiling: 100_000 },
    { name: "低预算纯电通勤", budget: 1, energy: 5, allowed: ["EV"], ceiling: 100_000 },
    { name: "家用混动备选", budget: 3, energy: 2, allowed: ["ICE", "HEV", "PHEV", "EREV"], ceiling: 220_000 },
    { name: "充电便利新能源", budget: 4, energy: 4, allowed: ["EV", "PHEV", "EREV"], ceiling: 300_000 },
    { name: "不限预算纯电", budget: 6, energy: 5, allowed: ["EV"], ceiling: Infinity },
  ])("preserves hard conditions and diversity for $name using the seeded catalog", (persona) => {
    const catalog = seededVehicles.map((item) => ({ ...item, id: item.slug,
      traitWeights: [...item.traitWeights], constraintRules: [...item.constraintRules] }));
    const result = recommend(catalog, { "budget-range": persona.budget, "energy-preference": persona.energy,
      "passenger-count": 2, "charging-availability": persona.energy === 1 ? 4 : 1, "recharge-patience": 1 });
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(6);
    const selected = result.map((item) => catalog.find((candidate) => candidate.slug === item.slug)!);
    expect(selected.every((item) => item.priceMin <= persona.ceiling && persona.allowed.includes(item.energyType))).toBe(true);
    expect(selected.every((item) => resolveVehiclePoolPolicy(item).tier !== "EXCLUDED")).toBe(true);
    expect(new Set(selected.map(normalizeVehicleSeries)).size).toBe(selected.length);
    for (const item of selected) expect(selected.filter((candidate) => candidate.brand === item.brand).length).toBeLessThanOrEqual(2);
    const tiers = result.map((item) => item.diagnostics.poolTier);
    expect(tiers).toEqual([...tiers].sort());
  });

  it("resolves reviewed aliases while excluding unknown series and avoiding brand-only promotion", () => {
    expect(resolveVehiclePoolPolicy({ brand: "比亚迪", series: "宋 PLUS DM-i" }).tier).toBe("PRIMARY");
    expect(resolveVehiclePoolPolicy({ brand: "陌生厂商", series: "定制神车" }).tier).toBe("EXCLUDED");
    expect(resolveVehiclePoolPolicy({ brand: "丰田", series: "未知车型" }).tier).toBe("EXCLUDED");
    expect(normalizeVehicleSeries({ brand: "AITO问界", series: "问界M7" }))
      .toBe(normalizeVehicleSeries({ brand: "问界", series: "M7" }));
  });

  it("ranks primary series ahead of supplemental series and excludes unreviewed imports", () => {
    const result = recommend([vehicle("unknown", "陌生厂商", "定制神车", 100),
      vehicle("supplemental", "马自达", "CX-5", 100), vehicle("primary", "丰田", "凯美瑞", 40)]);
    expect(result.map((item) => item.slug)).toEqual(["primary", "supplemental"]);
    expect(result[0].diagnostics.poolTier).toBe("PRIMARY");
  });

  it("never relaxes budget or energy to fill a recommendation slot", () => {
    const result = recommend([vehicle("expensive", "丰田", "凯美瑞", 90, 250_000),
      vehicle("fuel", "大众", "朗逸", 80, 90_000), vehicle("ev", "比亚迪", "海鸥", 80, 80_000, "EV")],
    { "budget-range": 1, "energy-preference": 1 });
    expect(result.map((item) => item.slug)).toEqual(["fuel"]);
    expect(recommend([vehicle("expensive", "丰田", "凯美瑞", 90, 250_000)], { "budget-range": 1 })).toEqual([]);
    expect(recommend([vehicle("no-price", "丰田", "凯美瑞", 90, 0)], { "budget-range": 1 })).toEqual([]);
  });

  it("only widens to supplemental series after primary diversity is exhausted", () => {
    const primary = [vehicle("camry", "丰田", "凯美瑞"), vehicle("corolla", "丰田", "卡罗拉"),
      vehicle("rav4", "丰田", "RAV4"), vehicle("accord", "本田", "雅阁"),
      vehicle("civic", "本田", "思域"), vehicle("lavida", "大众", "朗逸"), vehicle("sagitar", "大众", "速腾")];
    const supplemental = vehicle("cx5", "马自达", "CX-5");
    const enoughPrimary = recommend([...primary, supplemental]);
    expect(enoughPrimary).toHaveLength(6);
    expect(enoughPrimary.every((item) => item.diagnostics.poolTier === "PRIMARY")).toBe(true);
    const shortPool = recommend([...primary.slice(0, 3), supplemental]);
    expect(shortPool.map((item) => item.slug)).toContain("cx5");
    expect(shortPool.filter((item) => item.diagnostics.poolTier === "PRIMARY")).toHaveLength(2);
  });

  it("deduplicates aliases across brands and keeps both energy buckets ordered by match", () => {
    const result = recommend([vehicle("local", "问界", "M7", 90, 250_000, "EREV"),
      vehicle("imported", "AITO问界", "问界M7", 80, 250_000, "EREV"), vehicle("fuel", "丰田", "凯美瑞", 50)]);
    expect(result).toHaveLength(2);
    expect(result.map((item) => item.score)).toEqual(result.map((item) => item.score).sort((left, right) => right - left));
  });
});
