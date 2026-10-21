import { describe, expect, it, vi } from "vitest";
import { questions } from "../../../prisma/seed-data/questions";
import { QuestionsService } from "./questions.service";
import { deriveUserConditions } from "./user-conditions";
import { getQuestionMetadata, hasSufficientInformation } from "./question-selection-metadata";

async function path(seed: string, target: number, order = 3, choices: Record<string, number> = {}) {
  const bank = questions.map((question) => ({ ...question, id: question.slug,
    options: question.options.map((option) => ({ ...option, id: `${question.slug}_${option.order}` })) }));
  const service = new QuestionsService({ question: {
    findMany: vi.fn().mockImplementation(async ({ where }) => bank.filter((question) => !where.id.notIn.includes(question.id))),
  } } as never);
  const history = [{ slug: "budget-range", order: choices["budget-range"] ?? 3 }];
  while (history.length < target) {
    const result = await service.getNextQuestion({ answeredQuestionIds: history.map((answer) => answer.slug),
      currentBranchKey: "steady-practical", lifeQuestionCount: 0, carQuestionCount: history.length,
      coveredTraitKeys: [], answerHistory: history, selectionSeed: seed, targetQuestionCount: target,
      userConditions: deriveUserConditions(history.map(({ slug, order: value }) => ({ question: { slug }, option: { order: value } }))),
    });
    if (!result.nextQuestion) break;
    const slug = result.nextQuestion.slug;
    history.push({ slug, order: choices[slug] ?? order });
  }
  return history;
}

describe("shared adaptive bank", () => {
  it("contains 100–120 unique, translated scenario questions with known metadata", () => {
    expect(questions.length).toBeGreaterThanOrEqual(100);
    expect(questions.length).toBeLessThanOrEqual(120);
    expect(new Set(questions.map((question) => question.slug)).size).toBe(questions.length);
    expect(questions.every((question) => getQuestionMetadata(question.slug).dimension !== "unknown")).toBe(true);
  });

  it("replays a session deterministically and varies equally useful questions across sessions", async () => {
    const first = await path("session-alpha", 24);
    expect(await path("session-alpha", 24)).toEqual(first);
    expect(await path("session-beta", 24)).not.toEqual(first);
    expect(first.slice(0, 5).map((answer) => answer.slug)).toEqual([
      "budget-range", "passenger-count", "charging-availability", "recharge-patience", "energy-preference",
    ]);
  });

  it.each([24, 56])("fills a %i-question neutral path without topic duplication or irrelevant EV follow-ups", async (target) => {
    const history = await path("neutral", target, 3, {
      "passenger-count": 1, "charging-availability": 4, "recharge-patience": 1, "energy-preference": 1,
    });
    expect(history).toHaveLength(target);
    const metadata = history.map((answer) => getQuestionMetadata(answer.slug));
    expect(new Set(metadata.map((item) => item.topic)).size).toBe(history.length);
    expect(metadata.some((item) => item.condition === "ev" || item.condition === "plugin")).toBe(false);
    expect(new Set(metadata.map((item) => item.dimension)).size).toBeGreaterThanOrEqual(10);
  });

  it("only stops early when explicit conditions and repeated useful dimension signals are available", async () => {
    expect(hasSufficientInformation([], deriveUserConditions([]), 24)).toBe(false);
    expect((await path("clear-quick", 24, 5)).length).toBeLessThan(24);
    expect((await path("clear-standard", 56, 5)).length).toBeLessThan(56);
    expect(await path("neutral", 56, 3)).toHaveLength(56);
  });
});
