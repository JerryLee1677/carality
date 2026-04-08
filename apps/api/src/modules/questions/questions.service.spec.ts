import { NotFoundException } from "@nestjs/common";
import { describe, expect, it, vi } from "vitest";
import { QuestionsService } from "./questions.service";

describe("QuestionsService", () => {
  it("returns the highest-priority active anchor question first", async () => {
    const prisma = {
      question: {
        findFirst: vi.fn().mockResolvedValue({
          id: "question_anchor_1",
          slug: "social-first-contact",
          title: "聚会上遇到陌生人你会怎么做？",
          description: "选择最贴近你第一反应的答案",
          branchKey: "social-expression",
          type: "LIFE_STYLE",
          options: [
            {
              id: "option_1",
              label: "主动开启话题",
              order: 1,
            },
          ],
        }),
      },
    };

    const service = new QuestionsService(prisma as never);

    await expect(service.getInitialQuestion()).resolves.toEqual({
      id: "question_anchor_1",
      slug: "social-first-contact",
      title: "聚会上遇到陌生人你会怎么做？",
      description: "选择最贴近你第一反应的答案",
      branchKey: "social-expression",
      type: "LIFE_STYLE",
      options: [
        {
          id: "option_1",
          label: "主动开启话题",
          order: 1,
        },
      ],
    });

    expect(prisma.question.findFirst).toHaveBeenCalledWith({
      where: {
        status: "ACTIVE",
        isAnchor: true,
      },
      orderBy: [{ priority: "desc" }, { createdAt: "asc" }],
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
  });

  it("throws when no active anchor question exists", async () => {
    const prisma = {
      question: {
        findFirst: vi.fn().mockResolvedValue(null),
      },
    };

    const service = new QuestionsService(prisma as never);

    await expect(service.getInitialQuestion()).rejects.toBeInstanceOf(NotFoundException);
  });

  it("returns the next unanswered active question from the same branch first", async () => {
    const findMany = vi.fn().mockResolvedValue([
      {
        id: "question_2",
        slug: "group-trip-plan",
        title: "和朋友出行时你更像哪种角色？",
        description: null,
        branchKey: "social-expression",
        type: "LIFE_STYLE",
        priority: 80,
        discrimination: 72,
        options: [
          {
            id: "option_2",
            label: "主动组织路线和安排",
            order: 1,
          },
        ],
      },
    ]);
    const prisma = {
      question: {
        findMany,
      },
    };

    const service = new QuestionsService(prisma as never);

    await expect(
      service.getNextQuestion({
        answeredQuestionIds: ["question_1"],
        currentBranchKey: "social-expression",
        lifeQuestionCount: 1,
        carQuestionCount: 0,
      }),
    ).resolves.toEqual({
      nextQuestion: {
        id: "question_2",
        slug: "group-trip-plan",
        title: "和朋友出行时你更像哪种角色？",
        description: null,
        branchKey: "social-expression",
        type: "LIFE_STYLE",
        options: [
          {
            id: "option_2",
            label: "主动组织路线和安排",
            order: 1,
          },
        ],
      },
      candidates: [
        {
          questionId: "question_2",
          branchFit: 100,
          infoGain: 72,
          rankingScore: 252,
          wasSelected: true,
        },
      ],
    });
  });

  it("prefers a car usage question when life questions are ahead in the session mix", async () => {
    const findMany = vi.fn().mockResolvedValue([
      {
        id: "question_life",
        slug: "daily-rhythm",
        title: "你的日常节奏更接近哪一种？",
        description: null,
        branchKey: "social-expression",
        type: "LIFE_STYLE",
        priority: 90,
        discrimination: 60,
        options: [],
      },
      {
        id: "question_car",
        slug: "commute-priority",
        title: "日常通勤选车时，你最优先考虑什么？",
        description: null,
        branchKey: "social-expression",
        type: "CAR_USAGE",
        priority: 80,
        discrimination: 70,
        options: [],
      },
    ]);
    const prisma = {
      question: {
        findMany,
      },
    };

    const service = new QuestionsService(prisma as never);

    await expect(
      service.getNextQuestion({
        answeredQuestionIds: ["question_1"],
        currentBranchKey: "social-expression",
        lifeQuestionCount: 4,
        carQuestionCount: 1,
      }),
    ).resolves.toEqual({
      nextQuestion: {
        id: "question_car",
        slug: "commute-priority",
        title: "日常通勤选车时，你最优先考虑什么？",
        description: null,
        branchKey: "social-expression",
        type: "CAR_USAGE",
        options: [],
      },
      candidates: [
        {
          questionId: "question_car",
          branchFit: 100,
          infoGain: 70,
          rankingScore: 275,
          wasSelected: true,
        },
        {
          questionId: "question_life",
          branchFit: 100,
          infoGain: 60,
          rankingScore: 210,
          wasSelected: false,
        },
      ],
    });
  });
});
