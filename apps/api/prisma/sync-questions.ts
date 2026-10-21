import type { Prisma } from "../src/generated/prisma";
import type { QuestionSeed } from "./seed-data/questions";

const retiredSlugs = ["income-range", "family-size", "charging-access"];
const questionInclude = { options: { include: { effects: true } }, outgoingRules: true } as const;
type StoredQuestion = Prisma.QuestionGetPayload<{ include: typeof questionInclude }>;
type SyncDb = Pick<Prisma.TransactionClient, "question" | "questionOption" | "optionEffect" | "questionBranchRule">;

function serializeEffects(effects: Array<{ targetType: string; targetKey: string; weightDelta: unknown }>) {
  return effects.map((effect) => `${effect.targetType}:${effect.targetKey}:${Number(effect.weightDelta)}`).sort();
}

function questionContent(question: QuestionSeed | StoredQuestion) {
  const rules = "outgoingRules" in question
    ? question.outgoingRules.map((rule) => ({
        sourceOptionOrder: question.options.find((option) => option.id === rule.sourceOptionId)?.order ?? null,
        targetBranchKey: rule.targetBranchKey,
        priority: rule.priority,
        candidateQuestionId: rule.candidateQuestionId,
        traitKey: rule.traitKey,
        traitOperator: rule.traitOperator,
        traitThreshold: rule.traitThreshold === null ? null : Number(rule.traitThreshold),
      }))
    : (question.branchRules ?? []).map((rule) => ({ ...rule, candidateQuestionId: null, traitKey: null, traitOperator: null, traitThreshold: null }));

  return JSON.stringify({
    title: question.title, description: question.description, type: question.type,
    branchKey: question.branchKey, isAnchor: question.isAnchor, priority: question.priority,
    discrimination: question.discrimination, status: question.status,
    options: question.options.map((option) => ({
      order: option.order, label: option.label, effects: serializeEffects(option.effects),
    })).sort((left, right) => left.order - right.order),
    rules: rules.map((rule) => JSON.stringify(rule)).sort(),
  });
}

export async function syncQuestionBank(db: SyncDb, definitions: readonly QuestionSeed[], apply = true) {
  const existing = await db.question.findMany({ include: questionInclude });
  const bySlug = new Map(existing.map((question) => [question.slug, question]));
  const created: string[] = [];
  const updated: string[] = [];
  const archived = existing.filter((question) => retiredSlugs.includes(question.slug) && question.status !== "ARCHIVED").map((question) => question.slug);

  for (const definition of definitions) {
    const stored = bySlug.get(definition.slug);
    if (stored && questionContent(stored) === questionContent(definition)) continue;
    (stored ? updated : created).push(definition.slug);
    if (!apply) continue;

    const { options, branchRules, ...data } = definition;
    const question = await db.question.upsert({
      where: { slug: definition.slug }, create: data, update: data,
    });
    const optionIds = new Map<number, string>();
    for (const option of options) {
      const savedOption = await db.questionOption.upsert({
        where: { questionId_order: { questionId: question.id, order: option.order } },
        create: { questionId: question.id, label: option.label, order: option.order },
        update: { label: option.label },
      });
      optionIds.set(option.order, savedOption.id);
      const previous = stored?.options.find((item) => item.order === option.order);
      if (previous && JSON.stringify(serializeEffects(previous.effects)) === JSON.stringify(serializeEffects(option.effects))) continue;
      await db.optionEffect.deleteMany({ where: { optionId: savedOption.id } });
      if (option.effects.length > 0) {
        await db.optionEffect.createMany({ data: option.effects.map((effect) => ({ optionId: savedOption.id, ...effect })) });
      }
    }
    await db.questionBranchRule.deleteMany({ where: { sourceQuestionId: question.id } });
    if (branchRules?.length) {
      await db.questionBranchRule.createMany({ data: branchRules.map(({ sourceOptionOrder, ...rule }) => ({
        ...rule, sourceQuestionId: question.id, sourceOptionId: optionIds.get(sourceOptionOrder)!,
      })) });
    }
  }

  if (apply && archived.length > 0) {
    await db.question.updateMany({
      where: { slug: { in: retiredSlugs }, status: { not: "ARCHIVED" } },
      data: { status: "ARCHIVED", isAnchor: false },
    });
  }
  return { created, updated, archived };
}
