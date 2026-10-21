import { describe, expect, it, vi } from "vitest";
import { syncQuestionBank } from "../prisma/sync-questions";
import { questions } from "../prisma/seed-data/questions";

describe("non-destructive question bank sync", () => {
  it("preserves question and answer option IDs while updating their effects", async () => {
    const question = questions.find((item) => item.slug === "loan-pressure")!;
    const stored = { id: "existing_question", ...question, options: question.options.map((option) => ({
      ...option, id: `existing_option_${option.order}`, effects: [],
    })), outgoingRules: [] };
    const upsertOption = vi.fn().mockImplementation(async (args) => ({ id: `existing_option_${args.where.questionId_order.order}` }));
    const db = {
      question: { findMany: vi.fn().mockResolvedValue([stored, { ...stored, slug: "income-range" }]), upsert: vi.fn().mockResolvedValue({ id: "existing_question" }), updateMany: vi.fn() },
      questionOption: { upsert: upsertOption },
      optionEffect: { deleteMany: vi.fn(), createMany: vi.fn() },
      questionBranchRule: { deleteMany: vi.fn(), createMany: vi.fn() },
    };
    const result = await syncQuestionBank(db as never, [question]);
    expect(result.updated).toEqual(["loan-pressure"]);
    expect(db.question.upsert).toHaveBeenCalledWith(expect.objectContaining({ where: { slug: "loan-pressure" } }));
    expect(upsertOption).toHaveBeenCalledWith(expect.objectContaining({ where: { questionId_order: { questionId: "existing_question", order: 5 } } }));
    expect(db.optionEffect.createMany).toHaveBeenCalledWith({ data: expect.arrayContaining([
      expect.objectContaining({ optionId: "existing_option_5", targetKey: "monthly_payment_sensitivity", weightDelta: 5 }),
    ]) });
    expect(db.question.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      where: { slug: { in: ["income-range", "family-size", "charging-access"] }, status: { not: "ARCHIVED" } },
      data: { status: "ARCHIVED", isAnchor: false },
    }));
  });

  it("performs no writes for unchanged seeded questions on reruns", async () => {
    const question = questions.find((item) => item.slug === "driving-style")!;
    const options = question.options.map((option) => ({ ...option, id: `option_${option.order}` }));
    const stored = { ...question, id: "question", options, outgoingRules: question.branchRules!.map((rule) => ({
      sourceOptionId: `option_${rule.sourceOptionOrder}`, targetBranchKey: rule.targetBranchKey, priority: rule.priority,
      candidateQuestionId: null, traitKey: null, traitOperator: null, traitThreshold: null,
    })) };
    const db = { question: { findMany: vi.fn().mockResolvedValue([stored]), upsert: vi.fn(), updateMany: vi.fn() } };
    expect(await syncQuestionBank(db as never, [question])).toMatchObject({ created: [], updated: [] });
    expect(db.question.upsert).not.toHaveBeenCalled();
  });
});
