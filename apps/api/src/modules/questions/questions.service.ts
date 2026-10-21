import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../common/prisma/prisma.service";
import type { NextQuestionInput } from "./next-question-input.type";
import type { NextQuestionResult } from "./next-question-result.type";
import type { QuestionSummary } from "./question-summary.type";
import { deriveUserConditions, getConditionQuestionPriority, isQuestionEligible } from "./user-conditions";
import { getQuestionMetadata, hasSufficientInformation, isScenarioEligible, stableQuestionJitter } from "./question-selection-metadata";

type QuestionRecordWithOptions = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  branchKey: string | null;
  type: string;
  priority?: number;
  discrimination?: number;
  options: Array<{
    id: string;
    label: string;
    order: number;
    effects?: Array<{
      targetKey: string;
    }>;
  }>;
};

@Injectable()
export class QuestionsService {
  constructor(private readonly prisma: PrismaService) {}

  async getInitialQuestion(): Promise<QuestionSummary> {
    const question = await this.prisma.question.findFirst(this.buildInitialQuestionQuery());

    if (!question) {
      throw new NotFoundException("No active anchor question is available");
    }

    return this.toQuestionSummary(question);
  }

  async getNextQuestion(input: NextQuestionInput): Promise<NextQuestionResult> {
    const history = input.answerHistory ?? [];
    const userConditions = input.userConditions ?? deriveUserConditions([]);
    if (input.targetQuestionCount && hasSufficientInformation(history, userConditions, input.targetQuestionCount)) {
      return { nextQuestion: null, candidates: [] };
    }
    const answeredTopics = new Set(history.map((answer) => getQuestionMetadata(answer.slug).topic));
    const dimensionCounts = new Map<string, number>();
    for (const answer of history) {
      const { dimension } = getQuestionMetadata(answer.slug);
      dimensionCounts.set(dimension, (dimensionCounts.get(dimension) ?? 0) + 1);
    }
    const candidates = await this.prisma.question.findMany({
      where: {
        status: "ACTIVE",
        id: {
          notIn: input.answeredQuestionIds,
        },
      },
      include: {
        options: {
          orderBy: {
            order: "asc",
          },
          select: {
            id: true,
            label: true,
            order: true,
            effects: {
              select: {
                targetKey: true,
              },
            },
          },
        },
      },
    });

    const ranked = candidates
      .filter((candidate) => isQuestionEligible(candidate.slug, userConditions) &&
        isScenarioEligible(candidate.slug, userConditions) &&
        !answeredTopics.has(getQuestionMetadata(candidate.slug).topic))
      .map((candidate) => {
        const branchFit =
          candidate.branchKey && candidate.branchKey === input.currentBranchKey
            ? 10
            : candidate.branchKey === null
              ? 3
              : 0;
        const infoGain = candidate.discrimination ?? 0;
        const coverageBonus = this.getTraitCoverageBonus(candidate, input);
        const dimension = getQuestionMetadata(candidate.slug).dimension;
        const dimensionBonus = dimension === "facts" || dimension === "unknown" ? 0 : 70 / (1 + (dimensionCounts.get(dimension) ?? 0));
        const rankingScore =
          getConditionQuestionPriority(candidate.slug) +
          (candidate.priority ?? 0) * 0.1 +
          branchFit +
          infoGain * 0.08 + dimensionBonus +
          (input.selectionSeed ? stableQuestionJitter(input.selectionSeed, history.length, candidate.slug) : 0) +
          this.getTypeBalanceBonus(candidate.type, input) +
          coverageBonus;

        return {
          candidate,
          branchFit,
          infoGain,
          rankingScore: Number(rankingScore.toFixed(3)),
        };
      })
      .sort((left, right) => right.rankingScore - left.rankingScore || left.candidate.slug.localeCompare(right.candidate.slug));

    return {
      nextQuestion: ranked[0] ? this.toQuestionSummary(ranked[0].candidate) : null,
      candidates: ranked.map((item, index) => ({
        questionId: item.candidate.id,
        branchFit: item.branchFit,
        infoGain: item.infoGain,
        rankingScore: item.rankingScore,
        wasSelected: index === 0,
      })),
    };
  }

  private buildInitialQuestionQuery() {
    return {
      where: {
        status: "ACTIVE" as const,
        isAnchor: true,
      },
      orderBy: [{ priority: "desc" as const }, { createdAt: "asc" as const }],
      include: {
        options: {
          orderBy: {
            order: "asc" as const,
          },
          select: {
            id: true,
            label: true,
            order: true,
          },
        },
      },
    };
  }

  private getTypeBalanceBonus(questionType: string, input: NextQuestionInput) {
    const diff = input.lifeQuestionCount - input.carQuestionCount;

    if (diff >= 2) {
      return questionType === "CAR_USAGE" ? 3 : -3;
    }

    if (diff <= -2) {
      return questionType === "LIFE_STYLE" ? 3 : -3;
    }

    return 0;
  }

  private getTraitCoverageBonus(
    candidate: QuestionRecordWithOptions,
    input: NextQuestionInput,
  ) {
    const coveredTraitKeys = new Set(input.coveredTraitKeys);
    const uncoveredTraitKeys = new Set(
      candidate.options.flatMap((option) =>
        (option.effects ?? []).map((effect) => effect.targetKey),
      ),
    );
    let uncoveredCount = 0;

    for (const traitKey of uncoveredTraitKeys) {
      if (!coveredTraitKeys.has(traitKey)) {
        uncoveredCount += 1;
      }
    }

    return Math.min(15, uncoveredCount * 3);
  }

  private toQuestionSummary(question: QuestionRecordWithOptions | null): QuestionSummary {
    if (!question) {
      throw new NotFoundException("Question not found");
    }

    return {
      id: question.id,
      slug: question.slug,
      title: question.title,
      description: question.description,
      branchKey: question.branchKey,
      type: question.type,
      options: question.options.map(({ id, label, order }) => ({ id, label, order })),
    };
  }
}
