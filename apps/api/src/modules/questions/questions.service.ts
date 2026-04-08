import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../common/prisma/prisma.service";
import type { NextQuestionInput } from "./next-question-input.type";
import type { NextQuestionResult } from "./next-question-result.type";
import type { QuestionSummary } from "./question-summary.type";

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
    const candidates = await this.prisma.question.findMany({
      where: {
        status: "ACTIVE",
        id: {
          notIn: input.answeredQuestionIds,
        },
        OR: input.currentBranchKey
          ? [{ branchKey: input.currentBranchKey }, { branchKey: null }]
          : [{ branchKey: null }],
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
          },
        },
      },
    });

    const ranked = candidates
      .map((candidate) => {
        const branchFit =
          candidate.branchKey && candidate.branchKey === input.currentBranchKey
            ? 100
            : candidate.branchKey === null
              ? 40
              : 0;
        const infoGain = candidate.discrimination ?? 0;
        const rankingScore =
          (candidate.priority ?? 0) +
          branchFit +
          infoGain +
          this.getTypeBalanceBonus(candidate.type, input);

        return {
          candidate,
          branchFit,
          infoGain,
          rankingScore,
        };
      })
      .sort((left, right) => right.rankingScore - left.rankingScore);

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
      return questionType === "CAR_USAGE" ? 25 : -40;
    }

    if (diff <= -2) {
      return questionType === "LIFE_STYLE" ? 25 : -40;
    }

    return 0;
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
      options: question.options,
    };
  }
}
