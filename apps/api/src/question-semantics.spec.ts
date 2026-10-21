import { describe, expect, it } from "vitest";
import { questions } from "../prisma/seed-data/questions";

describe("question agreement semantics", () => {
  it.each([
    ["loan-pressure", "monthly_payment_sensitivity"],
    ["resale-focus", "resale_sensitivity"],
    ["recharge-patience", "energy_acceptance_ev"],
    ["driving-style", "stability_preference"],
    ["control-vs-ease", "smart_features"],
    ["driver-assist-attitude", "smart_features"],
    ["cabin-tech-attitude", "smart_features"],
    ["social-first-contact", "social_confidence"],
    ["weekend-plan", "planning_bias"],
    ["purchase-decision-style", "cost_control"],
    ["road-trip-role", "novelty_seeking"],
    ["group-trip-role", "planning_bias"],
    ["risk-change-attitude", "stability_preference"],
    ["new-tech-upgrade", "smart_features"],
    ["travel-role", "driving_engagement"],
    ["child-comfort-priority", "comfort_space"],
    ["commute-priority", "running_cost"],
    ["rear-seat-priority", "comfort_space"],
    ["city-parking-priority", "smart_features"],
    ["family-weekend-car", "comfort_space"],
    ["brand-vs-value", "brand_expression"],
    ["daily-reliability-priority", "daily_reliability"],
    ["social-confidence-scene", "social_confidence"],
    ["planning-bias-scene", "planning_bias"],
    ["expression-scene", "expression_drive"],
    ["comfort-vs-style-home", "comfort_space"],
    ["long-term-cost-view", "running_cost"],
  ])("agreeing with %s increases %s", (slug, targetKey) => {
    const question = questions.find((item) => item.slug === slug)!;
    const effect = (order: number) => question.options.find((item) => item.order === order)!
      .effects.filter((item) => item.targetKey === targetKey)
      .reduce((total, item) => total + item.weightDelta, 0);
    expect(effect(5)).toBeGreaterThan(effect(1));
    expect(effect(4)).toBeGreaterThan(0);
    expect(question.options.find((item) => item.order === 3)!.effects).toEqual([]);
  });

  it("does not infer charging availability from a fixed parking space", () => {
    const question = questions.find((item) => item.slug === "fixed-parking")!;
    expect(question.options.flatMap((item) => item.effects).map((item) => item.targetKey))
      .not.toContain("charging_access");
    const value = (order: number) => question.options.find((item) => item.order === order)!
      .effects.find((item) => item.targetKey === "parking_constraint")!.weightDelta;
    expect(value(5)).toBeLessThan(value(1));
  });

  it("steers agreeable steady driving and outgoing answers to matching branches", () => {
    for (const [slug, branch] of [["driving-style", "steady-practical"], ["social-first-contact", "social-expression"]]) {
      expect(questions.find((item) => item.slug === slug)!.branchRules)
        .toContainEqual(expect.objectContaining({ sourceOptionOrder: 5, targetBranchKey: branch }));
    }
  });
});
