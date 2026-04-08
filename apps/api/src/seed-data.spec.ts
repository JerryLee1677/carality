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

  it("keeps personality profiles rule-driven", () => {
    expect(personalityProfiles.length).toBeGreaterThanOrEqual(2);
    expect(personalityProfiles.every((profile) => profile.rules.length >= 3)).toBe(true);
  });
});
