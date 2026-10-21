export type EnergyType = "ICE" | "HEV" | "PHEV" | "EREV" | "EV";

export type UserConditions = {
  budgetAnswered: boolean;
  budgetMax: number | null;
  passengerAnswered: boolean;
  passengerCount: number | null;
  chargingAnswered: boolean;
  charging: "reliable" | "public" | "none" | "unknown";
  rechargeAnswered: boolean;
  rechargePatience: boolean | null;
  energyAnswered: boolean;
  allowedEnergyTypes: EnergyType[] | null;
};

type ConditionAnswer = { question: { slug: string }; option: { order: number } };

export function deriveUserConditions(answers: ConditionAnswer[]): UserConditions {
  const context: UserConditions = {
    budgetAnswered: false,
    budgetMax: null,
    passengerAnswered: false,
    passengerCount: null,
    chargingAnswered: false,
    charging: "unknown",
    rechargeAnswered: false,
    rechargePatience: null,
    energyAnswered: false,
    allowedEnergyTypes: null,
  };

  for (const answer of answers) {
    const slug = answer.question?.slug;
    const order = answer.option?.order;
    if (!Number.isInteger(order) || order < 1) continue;

    if (slug === "budget-range" && order <= 6) {
      context.budgetAnswered = true;
      context.budgetMax = [100_000, 160_000, 220_000, 300_000, 500_000, null][order - 1];
    }
    if (slug === "passenger-count" && order <= 5) {
      context.passengerAnswered = true;
      context.passengerCount = [2, 4, 5, 7, null][order - 1];
    }
    if (slug === "charging-availability" && order <= 5) {
      context.chargingAnswered = true;
      context.charging = (["reliable", "reliable", "public", "none", "unknown"] as const)[order - 1];
    }
    if (slug === "charging-access" && order <= 5 && !context.chargingAnswered) {
      context.charging = order >= 4 ? "reliable" : order <= 2 ? "none" : "unknown";
    }
    if (slug === "recharge-patience" && order <= 5) {
      context.rechargeAnswered = true;
      context.rechargePatience = order <= 2 ? false : order >= 4 ? true : null;
    }
    if (slug === "energy-preference" && order <= 6) {
      context.energyAnswered = true;
      const choices: Array<EnergyType[] | null> = [
        ["ICE", "HEV"],
        ["ICE", "HEV", "PHEV", "EREV"],
        ["ICE", "HEV", "PHEV", "EREV", "EV"],
        ["PHEV", "EREV", "EV"],
        ["EV"],
        null,
      ];
      context.allowedEnergyTypes = choices[order - 1];
    }
  }

  return context;
}

export function isEnergyAllowed(energyType: string | null | undefined, context: UserConditions) {
  return context.allowedEnergyTypes === null ||
    context.allowedEnergyTypes.includes((energyType ?? "").toUpperCase() as EnergyType);
}

export function isQuestionEligible(slug: string, context: UserConditions) {
  if (["income-range", "family-size", "charging-access"].includes(slug)) return false;
  if (slug === "budget-range") return !context.budgetAnswered;
  if (slug === "passenger-count") return !context.passengerAnswered;
  if (slug === "charging-availability") {
    return !context.chargingAnswered && ["EV", "PHEV", "EREV"].some((energy) => isEnergyAllowed(energy, context));
  }
  if (slug === "recharge-patience") {
    return !context.rechargeAnswered && context.chargingAnswered &&
      context.charging !== "reliable" && isEnergyAllowed("EV", context);
  }
  if (slug === "energy-preference") {
    return !context.energyAnswered && context.chargingAnswered &&
      (context.charging === "reliable" || context.rechargeAnswered);
  }
  if (slug === "winter-range-anxiety") {
    if (!isEnergyAllowed("EV", context)) return false;
    return context.allowedEnergyTypes !== null || context.charging === "reliable" || context.rechargePatience === true;
  }
  return true;
}

export function getConditionQuestionPriority(slug: string) {
  const sequence = ["budget-range", "passenger-count", "charging-availability", "recharge-patience", "energy-preference"];
  const index = sequence.indexOf(slug);
  return index === -1 ? 0 : 10_000 - index * 1_000;
}
