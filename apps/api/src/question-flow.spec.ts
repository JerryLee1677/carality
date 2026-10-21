import { describe, expect, it, vi } from "vitest";
import { questions } from "../prisma/seed-data/questions";
import { QuestionsService } from "./modules/questions/questions.service";
import { deriveUserConditions } from "./modules/questions/user-conditions";

async function followQuestionPath(choices: Record<string, number>, targetCount: number) {
  const candidates = questions.map((question) => ({
    ...question,
    id: question.slug,
    options: question.options.map((option) => ({ ...option, id: `${question.slug}_${option.order}` })),
  }));
  const service = new QuestionsService({ question: {
    findFirst: vi.fn().mockResolvedValue(candidates.filter((question) => question.isAnchor)
      .sort((left, right) => right.priority - left.priority)[0]),
    findMany: vi.fn().mockImplementation(async ({ where }: {
      where: { id: { notIn: string[] } };
    }) => candidates.filter((question) => !where.id.notIn.includes(question.id))),
  } } as never);
  const answers: Array<{ question: { slug: string }; option: { order: number } }> = [];
  let currentQuestion = await service.getInitialQuestion();
  let lifeQuestionCount = 0;
  let carQuestionCount = 0;
  for (let step = 0; step < targetCount; step += 1) {
    answers.push({ question: { slug: currentQuestion.slug }, option: { order: choices[currentQuestion.slug] ?? 3 } });
    if (currentQuestion.type === "LIFE_STYLE") lifeQuestionCount += 1;
    else carQuestionCount += 1;
    const result = await service.getNextQuestion({
      answeredQuestionIds: answers.map((answer) => answer.question.slug),
      currentBranchKey: null,
      lifeQuestionCount,
      carQuestionCount,
      coveredTraitKeys: [],
      userConditions: deriveUserConditions(answers),
    });
    if (!result.nextQuestion) break;
    currentQuestion = result.nextQuestion;
  }
  return { slugs: answers.map((answer) => answer.question.slug), conditions: deriveUserConditions(answers) };
}

describe("seeded question paths", () => {
  it.each([24, 56])("confirms energy before skipping EV follow-ups with a %i-question target", async (targetCount) => {
    const result = await followQuestionPath({
      "budget-range": 3, "passenger-count": 1, "charging-availability": 4,
      "recharge-patience": 1, "energy-preference": 1,
    }, targetCount);
    expect(result.slugs.slice(0, 5)).toEqual([
      "budget-range", "passenger-count", "charging-availability", "recharge-patience", "energy-preference",
    ]);
    expect(result.slugs).not.toContain("winter-range-anxiety");
    expect(new Set(result.slugs).size).toBe(result.slugs.length);
    expect(result.conditions).toMatchObject({ budgetMax: 220_000, allowedEnergyTypes: ["ICE", "HEV"] });
  });

  it("skips public charging patience when charging is reliable and retains EV questions", async () => {
    const result = await followQuestionPath({ "charging-availability": 1, "energy-preference": 5 }, 24);
    expect(result.slugs.slice(0, 4)).toEqual([
      "budget-range", "passenger-count", "charging-availability", "energy-preference",
    ]);
    expect(result.slugs).not.toContain("recharge-patience");
    expect(result.slugs).toContain("winter-range-anxiety");
    expect(result.conditions.allowedEnergyTypes).toEqual(["EV"]);
  });

  it("keeps uncertain energy choices unknown after rejecting charging waits", async () => {
    const result = await followQuestionPath({
      "charging-availability": 4, "recharge-patience": 1, "energy-preference": 6,
    }, 24);
    expect(result.slugs).toContain("energy-preference");
    expect(result.slugs).not.toContain("winter-range-anxiety");
    expect(result.conditions).toMatchObject({ energyAnswered: true, allowedEnergyTypes: null });
  });
});
