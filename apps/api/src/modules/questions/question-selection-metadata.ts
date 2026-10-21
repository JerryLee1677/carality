import { questionBankExtension, type PreferenceDimension, type QuestionCondition } from "./question-bank-extension";
import { isEnergyAllowed, type UserConditions } from "./user-conditions";

export type QuestionSelectionMetadata = {
  dimension: PreferenceDimension | "facts" | "unknown";
  topic: string;
  condition: QuestionCondition;
};
export type SelectionAnswer = { slug: string; order: number };

const existingGroups: Record<PreferenceDimension | "facts", string[]> = {
  facts: ["budget-range", "passenger-count", "charging-availability", "recharge-patience", "energy-preference"],
  handling: ["driving-style", "control-vs-ease", "travel-role"],
  comfort: ["child-comfort-priority", "rear-seat-priority", "comfort-vs-style-home"],
  space: ["cargo-space-demand", "full-load-frequency", "parking-environment", "fixed-parking"],
  smart: ["driver-assist-attitude", "cabin-tech-attitude", "new-tech-upgrade", "city-parking-priority"],
  power: ["speed-response", "highway-frequency", "cross-city-usage"],
  economy: ["ownership-horizon", "loan-pressure", "resale-focus", "daily-commute-distance", "urban-congestion", "winter-range-anxiety", "commute-priority", "long-term-cost-view"],
  brand: ["brand-importance", "new-force-brand", "niche-brand-acceptance", "brand-vs-value"],
  design: ["design-pay-premium", "expression-scene"],
  reliability: ["maintenance-attitude", "risk-change-attitude", "daily-reliability-priority"],
  family: ["child-seat-demand", "elder-passenger-frequency", "family-weekend-car", "suburban-family-usage"],
  decision: ["social-first-contact", "weekend-plan", "purchase-decision-style", "road-trip-role", "group-trip-role", "weekend-trip-frequency", "social-confidence-scene", "planning-bias-scene"],
};

const metadata = new Map<string, QuestionSelectionMetadata>();
for (const [dimension, slugs] of Object.entries(existingGroups)) {
  for (const slug of slugs) metadata.set(slug, { dimension: dimension as QuestionSelectionMetadata["dimension"], topic: slug, condition: "all" });
}
for (const question of questionBankExtension) metadata.set(question.slug, question);
for (const [slug, topic] of Object.entries({ "child-seat-demand": "child-seat", "elder-passenger-frequency": "elder-access",
  "city-parking-priority": "parking-assist", "daily-reliability-priority": "repair-downtime",
  "maintenance-attitude": "maintenance-cost", "design-pay-premium": "brand-premium",
  "planning-bias-scene": "comparison-notes", "cabin-tech-attitude": "screen-learning",
  "fixed-parking": "parking-environment", "weekend-plan": "comparison-notes" })) {
  metadata.set(slug, { ...metadata.get(slug)!, topic });
}
for (const slug of ["child-seat-demand", "elder-passenger-frequency", "child-comfort-priority", "rear-seat-priority", "full-load-frequency", "family-weekend-car"]) {
  metadata.set(slug, { ...metadata.get(slug)!, condition: "passengers" });
}
metadata.set("winter-range-anxiety", { ...metadata.get("winter-range-anxiety")!, condition: "ev" });

export function getQuestionMetadata(slug: string): QuestionSelectionMetadata {
  return metadata.get(slug) ?? { dimension: "unknown", topic: slug, condition: "all" };
}

export function isScenarioEligible(slug: string, conditions: UserConditions) {
  const condition = getQuestionMetadata(slug).condition;
  if (condition === "passengers") return conditions.passengerCount === null || conditions.passengerCount >= 2;
  if (condition === "ev") return isEnergyAllowed("EV", conditions) &&
    (conditions.allowedEnergyTypes !== null || conditions.charging === "reliable" || conditions.rechargePatience === true);
  if (condition === "plugin") return ["EV", "PHEV", "EREV"].some((energy) => isEnergyAllowed(energy, conditions)) &&
    (conditions.allowedEnergyTypes !== null || conditions.charging === "reliable" || conditions.rechargePatience === true);
  return true;
}

export function hasSufficientInformation(history: SelectionAnswer[], conditions: UserConditions, target: number) {
  if (!conditions.budgetAnswered || !conditions.passengerAnswered || !conditions.energyAnswered ||
    !conditions.chargingAnswered || (conditions.charging !== "reliable" && !conditions.rechargeAnswered)) return false;
  const standard = target > 24;
  if (history.length < (standard ? 36 : 18)) return false;
  const usefulCounts = new Map<string, number>();
  let preferenceCount = 0;
  let usefulCount = 0;
  for (const answer of history) {
    const { dimension } = getQuestionMetadata(answer.slug);
    if (dimension === "facts" || dimension === "unknown") continue;
    preferenceCount += 1;
    if (answer.order === 3) continue;
    usefulCount += 1;
    usefulCounts.set(dimension, (usefulCounts.get(dimension) ?? 0) + 1);
  }
  return usefulCount >= preferenceCount * 0.75 &&
    Object.keys(existingGroups).filter((dimension) => dimension !== "facts")
      .every((dimension) => (usefulCounts.get(dimension) ?? 0) >= (standard ? 2 : 1));
}

export function stableQuestionJitter(seed: string, step: number, slug: string) {
  let hash = 2166136261;
  for (const char of `${seed}:${step}:${slug}`) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  return ((hash >>> 0) / 0x1_0000_0000) * 12;
}
