import { describe, expect, it } from "vitest";
import { personalityProfiles } from "../prisma/seed-data/personality-profiles";
import { questions } from "../prisma/seed-data/questions";
import { vehicles } from "../prisma/seed-data/vehicles";

describe("assessment seed data", () => {
  it("contains at least 40 questions with five-point scale anchors", () => {
    expect(questions.length).toBeGreaterThanOrEqual(40);
    expect(questions.every((question) => question.options.length === 5)).toBe(true);
    expect(questions.map((question) => question.slug)).toEqual(
      expect.arrayContaining([
        "income-range",
        "family-size",
        "charging-access",
        "ownership-horizon",
        "daily-commute-distance",
        "driving-style",
      ]),
    );
  });

  it("contains enough branch rules to steer the next question selection", () => {
    const branchRuleCount = questions.reduce((total, question) => {
      const questionRuleCount =
        "branchRules" in question && Array.isArray(question.branchRules)
          ? question.branchRules.length
          : 0;

      return total + questionRuleCount;
    }, 0);

    expect(branchRuleCount).toBeGreaterThanOrEqual(8);
  });

  it("contains at least 50 vehicles with trait weights and constraint rules", () => {
    expect(vehicles.length).toBeGreaterThanOrEqual(50);
    expect(vehicles.every((vehicle) => vehicle.traitWeights.length >= 3)).toBe(true);
    expect(vehicles.every((vehicle) => vehicle.constraintRules.length >= 2)).toBe(true);
  });

  it("stores explicit core scores for every vehicle seed entry", () => {
    expect(vehicles.every((vehicle) => "coreScores" in vehicle)).toBe(true);
  });

  it("assigns every vehicle a complete 0-100 core score vector", () => {
    expect(
      vehicles.every((vehicle) =>
        [
          vehicle.handlingScore,
          vehicle.comfortScore,
          vehicle.spaceScore,
          vehicle.smartScore,
          vehicle.powerScore,
          vehicle.economyScore,
          vehicle.brandScore,
          vehicle.designScore,
          vehicle.reliabilityScore,
          vehicle.familyScore,
        ].every((score) => Number.isInteger(score) && score >= 0 && score <= 100),
      ),
    ).toBe(true);
  });

  it("gives every vehicle at least one dominant preference trait", () => {
    expect(
      vehicles.every((vehicle) =>
        vehicle.traitWeights.some(
          (weight) => weight.targetType === "VEHICLE_PREFERENCE" && weight.weight >= 8,
        ),
      ),
    ).toBe(true);
  });

  it("keeps vehicle slugs unique at model level", () => {
    const slugs = vehicles.map((vehicle) => vehicle.slug);
    const uniqueSlugs = new Set(slugs);

    expect(uniqueSlugs.size).toBe(slugs.length);
  });

  it("includes current volkswagen, honda, and lynk & co series coverage", () => {
    const slugs = vehicles.map((vehicle) => vehicle.slug);

    expect(slugs).toEqual(
      expect.arrayContaining([
        "volkswagen-passat-pro",
        "volkswagen-tiguan-l-pro",
        "volkswagen-id3",
        "volkswagen-id4-x",
        "honda-accord",
        "honda-breeze-ehev",
        "honda-integra",
        "honda-ens1-p7",
        "lynkco-03-plus",
        "lynkco-08-emp",
        "lynkco-z10",
        "lynkco-900",
      ]),
    );
  });

  it("keeps the benchmark tech/performance and commuter models clearly differentiated", () => {
    const bySlug = new Map(vehicles.map((vehicle) => [vehicle.slug, vehicle]));
    const preferenceWeight = (slug: string, targetKey: string) =>
      bySlug
        .get(slug)
        ?.traitWeights.find(
          (weight) => weight.targetType === "VEHICLE_PREFERENCE" && weight.targetKey === targetKey,
        )?.weight ?? 0;

    expect(preferenceWeight("xiaomi-su7", "smart_features")).toBeGreaterThanOrEqual(9);
    expect(preferenceWeight("xiaomi-su7", "driving_engagement")).toBeGreaterThanOrEqual(8);
    expect(preferenceWeight("tesla-model-3", "smart_features")).toBeGreaterThanOrEqual(9);
    expect(preferenceWeight("tesla-model-3", "driving_engagement")).toBeGreaterThanOrEqual(8);
    expect(preferenceWeight("lynkco-03-plus", "driving_engagement")).toBeGreaterThanOrEqual(9);
    expect(preferenceWeight("honda-civic", "driving_engagement")).toBeGreaterThanOrEqual(8);
    expect(preferenceWeight("honda-integra", "driving_engagement")).toBeGreaterThanOrEqual(8);
    expect(preferenceWeight("nissan-sylphy", "smart_features")).toBeLessThanOrEqual(2);
    expect(preferenceWeight("nissan-sylphy", "driving_engagement")).toBeLessThanOrEqual(2);
    expect(preferenceWeight("volkswagen-sagitar", "smart_features")).toBeLessThanOrEqual(3);
    expect(preferenceWeight("volkswagen-sagitar", "driving_engagement")).toBeLessThanOrEqual(4);
  });

  it("keeps core score benchmarks realistic for typical family, commuter, and performance models", () => {
    const bySlug = new Map(vehicles.map((vehicle) => [vehicle.slug, vehicle]));
    const xiaomiSu7 = bySlug.get("xiaomi-su7");
    const nissanSylphy = bySlug.get("nissan-sylphy");
    const volkswagenSagitar = bySlug.get("volkswagen-sagitar");
    const liAutoL6 = bySlug.get("li-auto-l6");
    const lynkco03Plus = bySlug.get("lynkco-03-plus");

    expect(xiaomiSu7?.smartScore).toBeGreaterThanOrEqual(90);
    expect(xiaomiSu7?.powerScore).toBeGreaterThanOrEqual(85);
    expect(xiaomiSu7?.handlingScore).toBeGreaterThanOrEqual(80);

    expect(nissanSylphy?.comfortScore).toBeGreaterThanOrEqual(72);
    expect(nissanSylphy?.familyScore).toBeGreaterThanOrEqual(58);
    expect(nissanSylphy?.smartScore).toBeLessThanOrEqual(35);

    expect(volkswagenSagitar?.spaceScore).toBeGreaterThanOrEqual(60);
    expect(volkswagenSagitar?.reliabilityScore).toBeGreaterThanOrEqual(68);

    expect(liAutoL6?.familyScore).toBeGreaterThanOrEqual(88);
    expect(liAutoL6?.smartScore).toBeGreaterThanOrEqual(80);
    expect(liAutoL6?.comfortScore).toBeGreaterThanOrEqual(85);

    expect(lynkco03Plus?.handlingScore).toBeGreaterThanOrEqual(88);
    expect(lynkco03Plus?.powerScore).toBeGreaterThanOrEqual(85);
    expect(lynkco03Plus?.brandScore).toBeGreaterThanOrEqual(72);
  });

  it("keeps volkswagen, honda, and lynk & co score anchors internally consistent", () => {
    const bySlug = new Map(vehicles.map((vehicle) => [vehicle.slug, vehicle]));

    expect(bySlug.get("volkswagen-viloran")?.familyScore).toBeGreaterThanOrEqual(88);
    expect(bySlug.get("volkswagen-viloran")?.comfortScore).toBeGreaterThanOrEqual(90);
    expect(bySlug.get("volkswagen-golf")?.handlingScore).toBeGreaterThanOrEqual(74);
    expect(bySlug.get("volkswagen-id3")?.economyScore).toBeGreaterThanOrEqual(80);
    expect(bySlug.get("volkswagen-id3")?.smartScore).toBeGreaterThanOrEqual(58);

    expect(bySlug.get("honda-accord")?.comfortScore).toBeGreaterThanOrEqual(75);
    expect(bySlug.get("honda-breeze-ehev")?.familyScore).toBeGreaterThanOrEqual(74);
    expect(bySlug.get("honda-odyssey-ehev")?.familyScore).toBeGreaterThanOrEqual(90);
    expect(bySlug.get("honda-ens2")?.smartScore).toBeGreaterThanOrEqual(70);
    expect(bySlug.get("honda-zrv")?.handlingScore).toBeGreaterThanOrEqual(68);

    expect(bySlug.get("lynkco-08-emp")?.smartScore).toBeGreaterThanOrEqual(82);
    expect(bySlug.get("lynkco-z10")?.handlingScore).toBeGreaterThanOrEqual(80);
    expect(bySlug.get("lynkco-z10")?.smartScore).toBeGreaterThanOrEqual(88);
    expect(bySlug.get("lynkco-900")?.familyScore).toBeGreaterThanOrEqual(88);
    expect(bySlug.get("lynkco-06-emp")?.economyScore).toBeGreaterThanOrEqual(76);
  });

  it("keeps personality profiles rule-driven", () => {
    expect(personalityProfiles.length).toBeGreaterThanOrEqual(2);
    expect(personalityProfiles.every((profile) => profile.rules.length >= 3)).toBe(true);
  });
});
