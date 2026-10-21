import { describe, expect, it } from "vitest";
import { deriveUserConditions, isQuestionEligible, isEnergyAllowed } from "./user-conditions";

const answer = (slug: string, order: number) => ({ question: { slug }, option: { order } });

describe("shared user conditions", () => {
  it("keeps unanswered and neutral conditions unknown", () => {
    const context = deriveUserConditions([answer("charging-access", 3), answer("recharge-patience", 3)]);
    expect(context.charging).toBe("unknown");
    expect(context.rechargePatience).toBeNull();
    expect(context.allowedEnergyTypes).toBeNull();
    expect(isEnergyAllowed("EV", context)).toBe(true);
  });

  it("uses concrete facts without scaling their numeric meaning", () => {
    const context = deriveUserConditions([answer("budget-range", 3), answer("passenger-count", 4)]);
    expect(context.budgetMax).toBe(220_000);
    expect(context.passengerCount).toBe(7);
    expect(deriveUserConditions([answer("budget-range", 6)]).budgetMax).toBeNull();
    expect(deriveUserConditions([answer("fixed-parking", 5)]).charging).toBe("unknown");
  });

  it("asks for energy confirmation before winter range when public charging is unacceptable", () => {
    const context = deriveUserConditions([answer("charging-availability", 4), answer("recharge-patience", 1)]);
    expect(isQuestionEligible("energy-preference", context)).toBe(true);
    expect(isQuestionEligible("winter-range-anxiety", context)).toBe(false);
  });

  it("skips plug-in follow-ups and disallows plug-in fallback for an explicit fuel choice", () => {
    const context = deriveUserConditions([answer("energy-preference", 1)]);
    for (const slug of ["charging-availability", "recharge-patience", "winter-range-anxiety"]) {
      expect(isQuestionEligible(slug, context)).toBe(false);
    }
    for (const energy of ["EV", "PHEV", "EREV"]) expect(isEnergyAllowed(energy, context)).toBe(false);
    for (const energy of ["ICE", "HEV"]) expect(isEnergyAllowed(energy, context)).toBe(true);
    expect(isEnergyAllowed(null, context)).toBe(false);
  });

  it("keeps hybrid choices while skipping pure EV questions", () => {
    const context = deriveUserConditions([answer("energy-preference", 2)]);
    expect(isQuestionEligible("winter-range-anxiety", context)).toBe(false);
    expect(isEnergyAllowed("PHEV", context)).toBe(true);
    expect(isEnergyAllowed("EREV", context)).toBe(true);
    expect(isEnergyAllowed("EV", context)).toBe(false);
  });

  it("allows winter range with reliable charging despite unwillingness to wait", () => {
    const context = deriveUserConditions([answer("charging-availability", 1), answer("recharge-patience", 1)]);
    expect(isQuestionEligible("recharge-patience", context)).toBe(false);
    expect(isQuestionEligible("winter-range-anxiety", context)).toBe(true);
  });

  it("honors explicit EV permission even without home charging", () => {
    const context = deriveUserConditions([answer("charging-availability", 4), answer("recharge-patience", 1), answer("energy-preference", 4)]);
    expect(isQuestionEligible("winter-range-anxiety", context)).toBe(true);
    expect(isEnergyAllowed("EV", context)).toBe(true);
    expect(isEnergyAllowed("ICE", context)).toBe(false);
  });
});
