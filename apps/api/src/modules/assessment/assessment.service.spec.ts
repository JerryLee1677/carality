import { describe, expect, it, vi } from "vitest";
import { AssessmentService } from "./assessment.service";

describe("AssessmentService", () => {
  it("resolves personality images across supported file extensions", () => {
    const service = new AssessmentService({} as never, {} as never);

    expect((service as any).resolvePersonalityImageUrl("pscv")).toBe(
      "/images/personalities/pscv.png",
    );
    expect((service as any).resolvePersonalityImageUrl("eqdv")).toBe(
      "/images/personalities/eqdv.jpeg",
    );
  });

  it("creates a quick session, stores the first question pointer, and returns that question", async () => {
    const create = vi.fn().mockResolvedValue({
      id: "session_1",
      status: "DRAFT",
    });
    const update = vi.fn().mockResolvedValue(undefined);

    const prisma = {
      assessmentSession: {
        create,
        update,
      },
    };
    const questionsService = {
      getInitialQuestion: vi.fn().mockResolvedValue({
        id: "question_1",
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
    };

    const service = new AssessmentService(prisma as never, questionsService as never);

    await expect(service.createSession({ mode: "quick" })).resolves.toEqual({
      sessionId: "session_1",
      status: "in_progress",
      mode: "quick",
      targetQuestionCount: 24,
      nextQuestion: {
        id: "question_1",
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
      },
    });

    expect(create).toHaveBeenCalledWith({
      data: {
        status: "IN_PROGRESS",
        stepIndex: 0,
        mode: "QUICK",
        targetQuestionCount: 24,
      },
      select: {
        id: true,
        status: true,
      },
    });
    expect(update).toHaveBeenCalledWith({
      where: {
        id: "session_1",
      },
      data: {
        currentQuestionId: "question_1",
        currentBranchKey: "social-expression",
      },
    });
  });

  it("stores the answer, logs snapshots and candidates, and advances to the next question", async () => {
    const sessionFindUnique = vi.fn().mockResolvedValue({
      id: "session_1",
      status: "IN_PROGRESS",
      stepIndex: 0,
      currentQuestionId: "question_1",
      currentBranchKey: "social-expression",
      lifeQuestionCount: 0,
      carQuestionCount: 0,
    });
    const answerFindMany = vi.fn().mockResolvedValue([{ questionId: "question_1" }]);
    const answerCreate = vi.fn().mockResolvedValue(undefined);
    const snapshotCreateMany = vi.fn().mockResolvedValue(undefined);
    const snapshotFindMany = vi.fn().mockResolvedValue([
      {
        targetType: "PERSONALITY_TRAIT",
        traitKey: "social_confidence",
        traitValue: 2,
      },
      {
        targetType: "BRANCH_SIGNAL",
        traitKey: "social-expression",
        traitValue: 1,
      },
    ]);
    const candidateCreateMany = vi.fn().mockResolvedValue(undefined);
    const sessionUpdate = vi.fn().mockResolvedValue(undefined);
    const questionFindUnique = vi.fn().mockResolvedValue({
      id: "question_1",
      type: "LIFE_STYLE",
    });
    const optionFindUnique = vi.fn().mockResolvedValue({
      id: "option_1",
      questionId: "question_1",
      effects: [
        {
          targetType: "PERSONALITY_TRAIT",
          targetKey: "social_confidence",
          weightDelta: 2,
        },
        {
          targetType: "BRANCH_SIGNAL",
          targetKey: "social-expression",
          weightDelta: 1,
        },
      ],
    });

    const prisma = {
      assessmentSession: {
        create: vi.fn(),
        findUnique: sessionFindUnique,
        update: sessionUpdate,
      },
      assessmentAnswer: {
        create: answerCreate,
        findMany: answerFindMany,
      },
      sessionTraitSnapshot: {
        createMany: snapshotCreateMany,
        findMany: snapshotFindMany,
      },
      sessionQuestionCandidate: {
        createMany: candidateCreateMany,
      },
      question: {
        findUnique: questionFindUnique,
      },
      questionOption: {
        findUnique: optionFindUnique,
      },
      questionBranchRule: {
        findMany: vi.fn().mockResolvedValue([]),
      },
    };
    const questionsService = {
      getInitialQuestion: vi.fn(),
      getNextQuestion: vi.fn().mockResolvedValue({
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
            rankingScore: 180,
            wasSelected: true,
          },
        ],
      }),
    };

    const service = new AssessmentService(prisma as never, questionsService as never);

    await expect(
      service.submitAnswer("session_1", {
        questionId: "question_1",
        optionId: "option_1",
      }),
    ).resolves.toEqual({
      accepted: true,
      completed: false,
      lockedQuestionId: "question_1",
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
    });

    expect(answerCreate).toHaveBeenCalledWith({
      data: {
        sessionId: "session_1",
        questionId: "question_1",
        optionId: "option_1",
        stepIndex: 1,
      },
    });
    expect(snapshotCreateMany).toHaveBeenCalledWith({
      data: [
        {
          sessionId: "session_1",
          stepIndex: 1,
          targetType: "PERSONALITY_TRAIT",
          traitKey: "social_confidence",
          traitValue: 2,
        },
        {
          sessionId: "session_1",
          stepIndex: 1,
          targetType: "BRANCH_SIGNAL",
          traitKey: "social-expression",
          traitValue: 1,
        },
      ],
    });
    expect(candidateCreateMany).toHaveBeenCalledWith({
      data: [
        {
          sessionId: "session_1",
          stepIndex: 1,
          questionId: "question_2",
          branchFit: 100,
          infoGain: 72,
          rankingScore: 180,
          wasSelected: true,
        },
      ],
    });
    expect(questionsService.getNextQuestion).toHaveBeenCalledWith({
      answeredQuestionIds: ["question_1"],
      currentBranchKey: "social-expression",
      lifeQuestionCount: 1,
      carQuestionCount: 0,
    });
    expect(sessionUpdate).toHaveBeenCalledWith({
      where: {
        id: "session_1",
      },
      data: {
        stepIndex: 1,
        currentQuestionId: "question_2",
        currentBranchKey: "social-expression",
        lifeQuestionCount: {
          increment: 1,
        },
      },
    });
  });

  it("aggregates trait snapshots and applies a matching branch rule before selecting the next question", async () => {
    const sessionFindUnique = vi.fn().mockResolvedValue({
      id: "session_2",
      status: "IN_PROGRESS",
      stepIndex: 1,
      currentQuestionId: "question_3",
      currentBranchKey: "steady-practical",
      lifeQuestionCount: 1,
      carQuestionCount: 0,
    });
    const answerFindMany = vi.fn().mockResolvedValue([{ questionId: "question_1" }, { questionId: "question_3" }]);
    const answerCreate = vi.fn().mockResolvedValue(undefined);
    const snapshotCreateMany = vi.fn().mockResolvedValue(undefined);
    const candidateCreateMany = vi.fn().mockResolvedValue(undefined);
    const sessionUpdate = vi.fn().mockResolvedValue(undefined);
    const questionFindUnique = vi.fn().mockResolvedValue({
      id: "question_3",
      type: "LIFE_STYLE",
    });
    const optionFindUnique = vi.fn().mockResolvedValue({
      id: "option_3",
      questionId: "question_3",
      effects: [
        {
          targetType: "PERSONALITY_TRAIT",
          targetKey: "social_confidence",
          weightDelta: 2,
        },
      ],
    });
    const snapshotFindMany = vi.fn().mockResolvedValue([
      {
        targetType: "PERSONALITY_TRAIT",
        traitKey: "social_confidence",
        traitValue: 1,
      },
      {
        targetType: "PERSONALITY_TRAIT",
        traitKey: "social_confidence",
        traitValue: 2,
      },
    ]);
    const branchRuleFindMany = vi.fn().mockResolvedValue([
      {
        targetBranchKey: "social-expression",
        traitKey: "social_confidence",
        traitOperator: "GTE",
        traitThreshold: 3,
        priority: 100,
      },
    ]);

    const prisma = {
      assessmentSession: {
        create: vi.fn(),
        findUnique: sessionFindUnique,
        update: sessionUpdate,
      },
      assessmentAnswer: {
        create: answerCreate,
        findMany: answerFindMany,
      },
      sessionTraitSnapshot: {
        createMany: snapshotCreateMany,
        findMany: snapshotFindMany,
      },
      sessionQuestionCandidate: {
        createMany: candidateCreateMany,
      },
      question: {
        findUnique: questionFindUnique,
      },
      questionOption: {
        findUnique: optionFindUnique,
      },
      questionBranchRule: {
        findMany: branchRuleFindMany,
      },
    };
    const questionsService = {
      getInitialQuestion: vi.fn(),
      getNextQuestion: vi.fn().mockResolvedValue({
        nextQuestion: {
          id: "question_4",
          slug: "technology-tolerance",
          title: "面对一台功能很多的新车，你更可能？",
          description: null,
          branchKey: "social-expression",
          type: "CAR_USAGE",
          options: [],
        },
        candidates: [
          {
            questionId: "question_4",
            branchFit: 100,
            infoGain: 70,
            rankingScore: 255,
            wasSelected: true,
          },
        ],
      }),
    };

    const service = new AssessmentService(prisma as never, questionsService as never);

    await service.submitAnswer("session_2", {
      questionId: "question_3",
      optionId: "option_3",
    });

    expect(snapshotFindMany).toHaveBeenCalledWith({
      where: {
        sessionId: "session_2",
      },
      select: {
        targetType: true,
        traitKey: true,
        traitValue: true,
      },
      orderBy: {
        stepIndex: "asc",
      },
    });
    expect(branchRuleFindMany).toHaveBeenCalledWith({
      where: {
        sourceQuestionId: "question_3",
        OR: [{ sourceOptionId: "option_3" }, { sourceOptionId: null }],
      },
      orderBy: [{ priority: "desc" }],
    });
    expect(questionsService.getNextQuestion).toHaveBeenCalledWith({
      answeredQuestionIds: ["question_1", "question_3"],
      currentBranchKey: "social-expression",
      lifeQuestionCount: 2,
      carQuestionCount: 0,
    });
    expect(sessionUpdate).toHaveBeenCalledWith({
      where: {
        id: "session_2",
      },
      data: {
        stepIndex: 2,
        currentQuestionId: "question_4",
        currentBranchKey: "social-expression",
        lifeQuestionCount: {
          increment: 1,
        },
      },
    });
  });

  it("completes a session, selects a personality profile, and persists ranked vehicle recommendations", async () => {
    const sessionFindUnique = vi.fn().mockResolvedValue({
      id: "session_complete_1",
      status: "IN_PROGRESS",
    });
    const snapshotFindMany = vi.fn().mockResolvedValue([
      {
        targetType: "PERSONALITY_TRAIT",
        traitKey: "stability_preference",
        traitValue: 3,
      },
      {
        targetType: "VEHICLE_PREFERENCE",
        traitKey: "family_fit",
        traitValue: 4,
      },
      {
        targetType: "VEHICLE_PREFERENCE",
        traitKey: "running_cost",
        traitValue: 3,
      },
    ]);
    const profileFindMany = vi.fn().mockResolvedValue([
      {
        id: "profile_steady",
        code: "STEADY_PRAGMATIST",
        name: "务实省心型",
        summary: "你买车时优先考虑省钱、舒适、耐用和值得买，核心诉求是稳定满足通勤和家庭需要。",
        detail: "detail",
        rules: [
          {
            targetKey: "stability_preference",
            traitOperator: "GTE",
            traitThreshold: 2,
            weight: 5,
          },
          {
            targetKey: "family_fit",
            traitOperator: "GTE",
            traitThreshold: 3,
            weight: 4,
          },
        ],
      },
      {
        id: "profile_expression",
        code: "EXPRESSIVE_EXPLORER",
        name: "表达探索型",
        summary: "重视新鲜感、表达欲和技术体验。",
        detail: "detail",
        rules: [
          {
            targetKey: "novelty_seeking",
            traitOperator: "GTE",
            traitThreshold: 2,
            weight: 5,
          },
        ],
      },
    ]);
    const vehicleFindMany = vi.fn().mockResolvedValue([
      {
        id: "vehicle_1",
        slug: "byd-song-plus-dmi",
        brand: "比亚迪",
        series: "宋 PLUS",
        modelName: "DM-i",
        recommendation: "适合偏稳健务实、重视空间与长期成本的用户",
        constraintRules: [],
        traitWeights: [
          { targetType: "VEHICLE_PREFERENCE", targetKey: "family_fit", weight: 10 },
          { targetType: "VEHICLE_PREFERENCE", targetKey: "running_cost", weight: 9 },
          { targetType: "PERSONALITY_TRAIT", targetKey: "stability_preference", weight: 7 },
        ],
      },
      {
        id: "vehicle_2",
        slug: "tesla-model-3",
        brand: "特斯拉",
        series: "Model 3",
        modelName: "后轮驱动版",
        recommendation: "适合偏表达探索、愿意尝鲜并在意科技体验的用户",
        constraintRules: [],
        traitWeights: [
          { targetType: "VEHICLE_PREFERENCE", targetKey: "smart_features", weight: 9 },
          { targetType: "PERSONALITY_TRAIT", targetKey: "novelty_seeking", weight: 8 },
        ],
      },
    ]);
    const resultCreate = vi.fn().mockResolvedValue({
      id: "result_1",
      sessionId: "session_complete_1",
    });
    const recommendationCreateMany = vi.fn().mockResolvedValue(undefined);
    const sessionUpdate = vi.fn().mockResolvedValue(undefined);

    const prisma = {
      assessmentSession: {
        create: vi.fn(),
        findUnique: sessionFindUnique,
        update: sessionUpdate,
      },
      assessmentAnswer: {
        create: vi.fn(),
        findMany: vi.fn(),
      },
      sessionTraitSnapshot: {
        createMany: vi.fn(),
        findMany: snapshotFindMany,
      },
      sessionQuestionCandidate: {
        createMany: vi.fn(),
      },
      question: {
        findUnique: vi.fn(),
      },
      questionOption: {
        findUnique: vi.fn(),
      },
      questionBranchRule: {
        findMany: vi.fn(),
      },
      personalityProfile: {
        findMany: profileFindMany,
      },
      vehicle: {
        findMany: vehicleFindMany,
      },
      sessionResult: {
        create: resultCreate,
      },
      sessionVehicleRecommendation: {
        createMany: recommendationCreateMany,
      },
    };
    const questionsService = {
      getInitialQuestion: vi.fn(),
      getNextQuestion: vi.fn(),
    };

    const service = new AssessmentService(prisma as never, questionsService as never);

    const result = await service.completeSession("session_complete_1");

    expect(result).toEqual({
      sessionId: "session_complete_1",
      personality: {
        code: "pscv",
        word: "Guardian",
        name: "务实省心型",
        epithet: "守序顾家者",
        subtitle: "你当前更偏务实，同时也明显偏向成本敏感。",
        summary:
          "你买车时优先考虑省钱、舒适、耐用和值得买，核心诉求是稳定满足通勤和家庭需要。",
        decisionStyle: expect.any(String),
        lifeScenes: expect.any(Array),
        usageHabits: expect.any(Array),
        strengths: expect.any(Array),
        cautions: expect.any(Array),
        matchScore: expect.any(Number),
        dimensionSnapshot: expect.any(Array),
        imageUrl: "/images/personalities/pscv.png",
      },
      recommendationEntry: {
        label: "查看适合你人格的车型方向",
        href: "/result/session_complete_1/recommendations",
      },
      personalityProfile: {
        code: "PSCV",
        archetypeCode: "STEADY_PRAGMATIST",
        word: "Guardian",
        name: "务实省心型",
        epithet: "守序顾家者",
        summary: "你买车时优先考虑省钱、舒适、耐用和值得买，核心诉求是稳定满足通勤和家庭需要。",
      },
      recommendations: [
        {
          slug: "byd-song-plus-dmi",
          brand: "比亚迪",
          series: "宋 PLUS",
          rank: 1,
          score: 68,
          reason: "你当前更看重空间实用性、家庭适配、使用成本，这台车在家庭适配、使用成本上更贴合你的选择。",
        },
        {
          slug: "tesla-model-3",
          brand: "特斯拉",
          series: "Model 3",
          rank: 2,
          score: 34,
          reason: "你当前更看重空间实用性、家庭适配、使用成本，但这台车在这些维度上的匹配度偏低。",
        },
      ],
    });
    expect(result.personality.dimensionSnapshot[3]).toMatchObject({
      key: "brandValue",
      label: "品牌 vs 价值",
      directionLabel: "更偏价值优先",
    });

    expect(profileFindMany).toHaveBeenCalledWith({
      include: {
        rules: true,
      },
    });
    expect(vehicleFindMany).toHaveBeenCalledWith({
      include: {
        traitWeights: true,
        constraintRules: true,
      },
      where: {
        status: "active",
      },
    });
    expect(resultCreate).toHaveBeenCalledWith({
      data: {
        sessionId: "session_complete_1",
        personalityProfileId: "profile_steady",
        confidenceScore: 1,
        summary: "你买车时优先考虑省钱、舒适、耐用和值得买，核心诉求是稳定满足通勤和家庭需要。",
        explanation: "务实省心型",
      },
      select: {
        id: true,
        sessionId: true,
      },
    });
    expect(recommendationCreateMany).toHaveBeenCalledWith({
      data: [
        {
          resultId: "result_1",
          vehicleId: "vehicle_1",
          rank: 1,
          score: 68,
          reason: "你当前更看重空间实用性、家庭适配、使用成本，这台车在家庭适配、使用成本上更贴合你的选择。",
        },
        {
          resultId: "result_1",
          vehicleId: "vehicle_2",
          rank: 2,
          score: 34,
          reason: "你当前更看重空间实用性、家庭适配、使用成本，但这台车在这些维度上的匹配度偏低。",
        },
      ],
    });
    expect(sessionUpdate).toHaveBeenCalledWith({
      where: {
        id: "session_complete_1",
      },
      data: {
        status: "COMPLETED",
        currentQuestionId: null,
        completedAt: expect.any(Date),
      },
    });
  });

  it("filters out vehicles that fail hard constraints before weighted ranking", async () => {
    const sessionFindUnique = vi.fn().mockResolvedValue({
      id: "session_constraints_1",
      status: "IN_PROGRESS",
    });
    const snapshotFindMany = vi.fn().mockResolvedValue([
      {
        targetType: "PERSONALITY_TRAIT",
        traitKey: "stability_preference",
        traitValue: 3,
      },
      {
        targetType: "VEHICLE_PREFERENCE",
        traitKey: "family_fit",
        traitValue: 2,
      },
    ]);
    const profileFindMany = vi.fn().mockResolvedValue([
      {
        id: "profile_steady",
        code: "STEADY_PRAGMATIST",
        name: "稳健务实型",
        summary: "做决定偏稳，重视长期成本、确定性和日常便利。",
        detail: "detail",
        rules: [
          {
            targetKey: "stability_preference",
            traitOperator: "GTE",
            traitThreshold: 2,
            weight: 5,
          },
        ],
      },
    ]);
    const vehicleFindMany = vi.fn().mockResolvedValue([
      {
        id: "vehicle_pass",
        slug: "toyota-camry",
        brand: "丰田",
        series: "凯美瑞",
        modelName: "2.0E",
        recommendation: "static",
        constraintRules: [
          {
            targetType: "PERSONALITY_TRAIT",
            targetKey: "stability_preference",
            traitOperator: "GTE",
            traitThreshold: 3,
          },
        ],
        traitWeights: [
          { targetType: "PERSONALITY_TRAIT", targetKey: "stability_preference", weight: 10 },
        ],
      },
      {
        id: "vehicle_fail",
        slug: "future-ev-x",
        brand: "未来",
        series: "EV",
        modelName: "X",
        recommendation: "static",
        constraintRules: [
          {
            targetType: "PERSONALITY_TRAIT",
            targetKey: "stability_preference",
            traitOperator: "GTE",
            traitThreshold: 5,
          },
        ],
        traitWeights: [
          { targetType: "PERSONALITY_TRAIT", targetKey: "stability_preference", weight: 100 },
        ],
      },
    ]);
    const resultCreate = vi.fn().mockResolvedValue({
      id: "result_constraints_1",
      sessionId: "session_constraints_1",
    });
    const recommendationCreateMany = vi.fn().mockResolvedValue(undefined);
    const sessionUpdate = vi.fn().mockResolvedValue(undefined);

    const prisma = {
      assessmentSession: {
        create: vi.fn(),
        findUnique: sessionFindUnique,
        update: sessionUpdate,
      },
      assessmentAnswer: {
        create: vi.fn(),
        findMany: vi.fn(),
      },
      sessionTraitSnapshot: {
        createMany: vi.fn(),
        findMany: snapshotFindMany,
      },
      sessionQuestionCandidate: {
        createMany: vi.fn(),
      },
      question: {
        findUnique: vi.fn(),
      },
      questionOption: {
        findUnique: vi.fn(),
      },
      questionBranchRule: {
        findMany: vi.fn(),
      },
      personalityProfile: {
        findMany: profileFindMany,
      },
      vehicle: {
        findMany: vehicleFindMany,
      },
      sessionResult: {
        create: resultCreate,
      },
      sessionVehicleRecommendation: {
        createMany: recommendationCreateMany,
      },
    };
    const questionsService = {
      getInitialQuestion: vi.fn(),
      getNextQuestion: vi.fn(),
    };

    const service = new AssessmentService(prisma as never, questionsService as never);

    await expect(service.completeSession("session_constraints_1")).resolves.toMatchObject({
      sessionId: "session_constraints_1",
      personalityProfile: {
        code: "PSCV",
        archetypeCode: "STEADY_PRAGMATIST",
        word: "Guardian",
        name: "务实省心型",
        epithet: "守序顾家者",
        summary: "你买车时优先考虑省钱、舒适、耐用和值得买，核心诉求是稳定满足通勤和家庭需要。",
      },
      recommendations: [
        {
          slug: "toyota-camry",
          brand: "丰田",
          series: "凯美瑞",
          rank: 1,
          score: 38,
          reason: "你当前更看重家庭适配、舒适性、空间实用性，但这台车在这些维度上的匹配度偏低。",
        },
      ],
    });

    expect(recommendationCreateMany).toHaveBeenCalledWith({
      data: [
        {
          resultId: "result_constraints_1",
          vehicleId: "vehicle_pass",
          rank: 1,
          score: 38,
          reason: "你当前更看重家庭适配、舒适性、空间实用性，但这台车在这些维度上的匹配度偏低。",
        },
      ],
    });
  });

  it("scores vehicle traits against matching target types when keys overlap", async () => {
    const prisma = {
      assessmentSession: {
        create: vi.fn(),
        findUnique: vi.fn().mockResolvedValue({
          id: "session_type_split_1",
          status: "IN_PROGRESS",
        }),
        update: vi.fn().mockResolvedValue(undefined),
      },
      sessionTraitSnapshot: {
        createMany: vi.fn(),
        findMany: vi.fn().mockResolvedValue([
          {
            targetType: "PERSONALITY_TRAIT",
            traitKey: "shared_signal",
            traitValue: 1,
          },
          {
            targetType: "VEHICLE_PREFERENCE",
            traitKey: "shared_signal",
            traitValue: 5,
          },
        ]),
      },
      personalityProfile: {
        findMany: vi.fn().mockResolvedValue([
          {
            id: "profile_steady",
            code: "STEADY_PRAGMATIST",
            name: "稳健务实型",
            summary: "summary",
            detail: "detail",
            rules: [],
          },
        ]),
      },
      vehicle: {
        findMany: vi.fn().mockResolvedValue([
          {
            id: "vehicle_personality",
            slug: "personality-car",
            brand: "品牌A",
            series: "系列A",
            modelName: "车型A",
            recommendation: "static",
            constraintRules: [],
            traitWeights: [
              {
                targetType: "PERSONALITY_TRAIT",
                targetKey: "shared_signal",
                weight: 10,
              },
            ],
          },
          {
            id: "vehicle_preference",
            slug: "preference-car",
            brand: "品牌B",
            series: "系列B",
            modelName: "车型B",
            recommendation: "static",
            constraintRules: [],
            traitWeights: [
              {
                targetType: "VEHICLE_PREFERENCE",
                targetKey: "shared_signal",
                weight: 10,
              },
            ],
          },
        ]),
      },
      sessionResult: {
        create: vi.fn().mockResolvedValue({
          id: "result_type_split_1",
          sessionId: "session_type_split_1",
        }),
      },
      sessionVehicleRecommendation: {
        createMany: vi.fn().mockResolvedValue(undefined),
      },
    };
    const service = new AssessmentService(prisma as never, {
      getInitialQuestion: vi.fn(),
      getNextQuestion: vi.fn(),
    } as never);

    await expect(service.completeSession("session_type_split_1")).resolves.toMatchObject({
      sessionId: "session_type_split_1",
      personalityProfile: {
        code: "PSCV",
        archetypeCode: "STEADY_PRAGMATIST",
        name: "务实省心型",
        summary: "你买车时优先考虑省钱、舒适、耐用和值得买，核心诉求是稳定满足通勤和家庭需要。",
      },
      recommendations: [
        {
          slug: "preference-car",
          brand: "品牌B",
          series: "系列B",
          rank: 1,
          score: 39,
          reason: "这台车和你的主要用车偏好整体比较接近。",
        },
        {
          slug: "personality-car",
          brand: "品牌A",
          series: "系列A",
          rank: 2,
          score: 37,
          reason: "这台车和你的主要用车偏好整体比较接近。",
        },
      ],
    });
  });

  it("fails completion when hard constraints exclude every active vehicle", async () => {
    const prisma = {
      assessmentSession: {
        create: vi.fn(),
        findUnique: vi.fn().mockResolvedValue({
          id: "session_no_vehicle_1",
          status: "IN_PROGRESS",
        }),
        update: vi.fn().mockResolvedValue(undefined),
      },
      sessionTraitSnapshot: {
        createMany: vi.fn(),
        findMany: vi.fn().mockResolvedValue([
          {
            targetType: "PERSONALITY_TRAIT",
            traitKey: "stability_preference",
            traitValue: 2,
          },
        ]),
      },
      personalityProfile: {
        findMany: vi.fn().mockResolvedValue([
          {
            id: "profile_steady",
            code: "STEADY_PRAGMATIST",
            name: "稳健务实型",
            summary: "summary",
            detail: "detail",
            rules: [],
          },
        ]),
      },
      vehicle: {
        findMany: vi.fn().mockResolvedValue([
          {
            id: "vehicle_fail",
            slug: "future-ev-x",
            brand: "未来",
            series: "EV",
            modelName: "X",
            recommendation: "static",
            constraintRules: [
              {
                targetType: "PERSONALITY_TRAIT",
                targetKey: "stability_preference",
                traitOperator: "GTE",
                traitThreshold: 5,
              },
            ],
            traitWeights: [
              {
                targetType: "PERSONALITY_TRAIT",
                targetKey: "stability_preference",
                weight: 10,
              },
            ],
          },
        ]),
      },
      sessionResult: {
        create: vi.fn().mockResolvedValue({
          id: "result_no_vehicle_1",
          sessionId: "session_no_vehicle_1",
        }),
      },
      sessionVehicleRecommendation: {
        createMany: vi.fn(),
      },
    };
    const service = new AssessmentService(prisma as never, {
      getInitialQuestion: vi.fn(),
      getNextQuestion: vi.fn(),
    } as never);

    await expect(service.completeSession("session_no_vehicle_1")).resolves.toMatchObject({
      sessionId: "session_no_vehicle_1",
      recommendations: [
        {
          slug: "future-ev-x",
          brand: "未来",
          series: "EV",
          rank: 1,
        },
      ],
    });
  });

  it("matches hard constraints against the rule target type when keys overlap", async () => {
    const prisma = {
      assessmentSession: {
        create: vi.fn(),
        findUnique: vi.fn().mockResolvedValue({
          id: "session_constraint_type_split_1",
          status: "IN_PROGRESS",
        }),
        update: vi.fn().mockResolvedValue(undefined),
      },
      sessionTraitSnapshot: {
        createMany: vi.fn(),
        findMany: vi.fn().mockResolvedValue([
          {
            targetType: "PERSONALITY_TRAIT",
            traitKey: "shared_signal",
            traitValue: 2,
          },
          {
            targetType: "VEHICLE_PREFERENCE",
            traitKey: "shared_signal",
            traitValue: 5,
          },
        ]),
      },
      personalityProfile: {
        findMany: vi.fn().mockResolvedValue([
          {
            id: "profile_steady",
            code: "STEADY_PRAGMATIST",
            name: "稳健务实型",
            summary: "summary",
            detail: "detail",
            rules: [],
          },
        ]),
      },
      vehicle: {
        findMany: vi.fn().mockResolvedValue([
          {
            id: "vehicle_wrong_type",
            slug: "wrong-type-car",
            brand: "品牌C",
            series: "系列C",
            modelName: "车型C",
            recommendation: "static",
            constraintRules: [
              {
                targetType: "PERSONALITY_TRAIT",
                targetKey: "shared_signal",
                traitOperator: "GTE",
                traitThreshold: 5,
              },
            ],
            traitWeights: [
              {
                targetType: "PERSONALITY_TRAIT",
                targetKey: "shared_signal",
                weight: 100,
              },
            ],
          },
          {
            id: "vehicle_right_type",
            slug: "right-type-car",
            brand: "品牌D",
            series: "系列D",
            modelName: "车型D",
            recommendation: "static",
            constraintRules: [
              {
                targetType: "VEHICLE_PREFERENCE",
                targetKey: "shared_signal",
                traitOperator: "GTE",
                traitThreshold: 5,
              },
            ],
            traitWeights: [
              {
                targetType: "VEHICLE_PREFERENCE",
                targetKey: "shared_signal",
                weight: 10,
              },
            ],
          },
        ]),
      },
      sessionResult: {
        create: vi.fn().mockResolvedValue({
          id: "result_constraint_type_split_1",
          sessionId: "session_constraint_type_split_1",
        }),
      },
      sessionVehicleRecommendation: {
        createMany: vi.fn().mockResolvedValue(undefined),
      },
    };
    const service = new AssessmentService(prisma as never, {
      getInitialQuestion: vi.fn(),
      getNextQuestion: vi.fn(),
    } as never);

    await expect(service.completeSession("session_constraint_type_split_1")).resolves.toMatchObject({
      sessionId: "session_constraint_type_split_1",
      personalityProfile: {
        code: "PSCV",
        archetypeCode: "STEADY_PRAGMATIST",
        name: "务实省心型",
        summary: "你买车时优先考虑省钱、舒适、耐用和值得买，核心诉求是稳定满足通勤和家庭需要。",
      },
      recommendations: [
        {
          slug: "right-type-car",
          brand: "品牌D",
          series: "系列D",
          rank: 1,
          score: 39,
          reason: "这台车和你的主要用车偏好整体比较接近。",
        },
      ],
    });
  });

  it("penalizes vehicles that miss the user's strongest performance and tech preferences", async () => {
    const prisma = {
      assessmentSession: {
        create: vi.fn(),
        findUnique: vi.fn().mockResolvedValue({
          id: "session_priority_penalty_1",
          status: "IN_PROGRESS",
        }),
        update: vi.fn().mockResolvedValue(undefined),
      },
      sessionTraitSnapshot: {
        createMany: vi.fn(),
        findMany: vi.fn().mockResolvedValue([
          { targetType: "HARD_CONSTRAINT", traitKey: "budget_level", traitValue: 4 },
          { targetType: "HARD_CONSTRAINT", traitKey: "charging_access", traitValue: 4 },
          { targetType: "HARD_CONSTRAINT", traitKey: "energy_acceptance_ev", traitValue: 4 },
          { targetType: "HARD_CONSTRAINT", traitKey: "energy_acceptance_ice", traitValue: 4 },
          { targetType: "HARD_CONSTRAINT", traitKey: "monthly_payment_sensitivity", traitValue: 3 },
          { targetType: "VEHICLE_PREFERENCE", traitKey: "smart_features", traitValue: 5 },
          { targetType: "VEHICLE_PREFERENCE", traitKey: "driving_engagement", traitValue: 5 },
          { targetType: "VEHICLE_PREFERENCE", traitKey: "running_cost", traitValue: 4 },
          { targetType: "VEHICLE_PREFERENCE", traitKey: "daily_reliability", traitValue: 4 },
          { targetType: "PERSONALITY_TRAIT", traitKey: "stability_preference", traitValue: 4 },
        ]),
      },
      personalityProfile: {
        findMany: vi.fn().mockResolvedValue([
          {
            id: "profile_expression",
            code: "EXPRESSIVE_EXPLORER",
            name: "表达探索型",
            summary: "summary",
            detail: "detail",
            rules: [],
          },
        ]),
      },
      vehicle: {
        findMany: vi.fn().mockResolvedValue([
          {
            id: "vehicle_commuter",
            slug: "commuter-car",
            brand: "品牌通勤",
            series: "系列通勤",
            modelName: "城市版",
            recommendation: "static",
            constraintRules: [
              { targetType: "HARD_CONSTRAINT", targetKey: "budget_level", traitOperator: "GTE", traitThreshold: 1 },
              { targetType: "HARD_CONSTRAINT", targetKey: "energy_acceptance_ice", traitOperator: "GTE", traitThreshold: 3 },
              { targetType: "HARD_CONSTRAINT", targetKey: "monthly_payment_sensitivity", traitOperator: "GTE", traitThreshold: 3 },
            ],
            traitWeights: [
              { targetType: "VEHICLE_PREFERENCE", targetKey: "running_cost", weight: 10 },
              { targetType: "VEHICLE_PREFERENCE", targetKey: "daily_reliability", weight: 10 },
              { targetType: "PERSONALITY_TRAIT", targetKey: "stability_preference", weight: 10 },
            ],
          },
          {
            id: "vehicle_performance",
            slug: "performance-tech-car",
            brand: "品牌性能",
            series: "系列性能",
            modelName: "高阶版",
            recommendation: "static",
            constraintRules: [
              { targetType: "HARD_CONSTRAINT", targetKey: "budget_level", traitOperator: "GTE", traitThreshold: 4 },
              { targetType: "HARD_CONSTRAINT", targetKey: "charging_access", traitOperator: "GTE", traitThreshold: 3 },
              { targetType: "HARD_CONSTRAINT", targetKey: "energy_acceptance_ev", traitOperator: "GTE", traitThreshold: 3 },
            ],
            traitWeights: [
              { targetType: "VEHICLE_PREFERENCE", targetKey: "smart_features", weight: 10 },
              { targetType: "VEHICLE_PREFERENCE", targetKey: "driving_engagement", weight: 10 },
              { targetType: "VEHICLE_PREFERENCE", targetKey: "design_presence", weight: 4 },
            ],
          },
        ]),
      },
      sessionResult: {
        create: vi.fn().mockResolvedValue({
          id: "result_priority_penalty_1",
          sessionId: "session_priority_penalty_1",
        }),
      },
      sessionVehicleRecommendation: {
        createMany: vi.fn().mockResolvedValue(undefined),
      },
    };
    const service = new AssessmentService(prisma as never, {
      getInitialQuestion: vi.fn(),
      getNextQuestion: vi.fn(),
    } as never);

    await expect(service.completeSession("session_priority_penalty_1")).resolves.toMatchObject({
      sessionId: "session_priority_penalty_1",
      personalityProfile: {
        code: "PSDV",
        archetypeCode: "EXPRESSIVE_EXPLORER",
        name: "理性驾趣型",
        summary: "你在意驾驶乐趣和车辆反应，但前提仍是成本可控、选择划算，不会为情绪感完全失去理性。",
      },
      recommendations: [
        {
          slug: "performance-tech-car",
          brand: "品牌性能",
          series: "系列性能",
          rank: 1,
          score: 60,
          reason: "你当前更看重科技配置、使用成本、动力表现，这台车在科技配置、动力表现上更贴合你的选择。",
        },
        {
          slug: "commuter-car",
          brand: "品牌通勤",
          series: "系列通勤",
          rank: 2,
          score: 42,
          reason: "你当前更看重科技配置、使用成本、动力表现，但这台车在这些维度上的匹配度偏低。",
        },
      ],
    });
  });

  it("prioritizes vehicles whose core scores match a tech-and-handling-heavy preference vector", async () => {
    const prisma = {
      assessmentSession: {
        create: vi.fn(),
        findUnique: vi.fn().mockResolvedValue({
          id: "session_core_vector_1",
          status: "IN_PROGRESS",
        }),
        update: vi.fn().mockResolvedValue(undefined),
      },
      sessionTraitSnapshot: {
        createMany: vi.fn(),
        findMany: vi.fn().mockResolvedValue([
          { targetType: "HARD_CONSTRAINT", traitKey: "budget_level", traitValue: 4 },
          { targetType: "HARD_CONSTRAINT", traitKey: "charging_access", traitValue: 4 },
          { targetType: "HARD_CONSTRAINT", traitKey: "energy_acceptance_ev", traitValue: 4 },
          { targetType: "VEHICLE_PREFERENCE", traitKey: "smart_features", traitValue: 6 },
          { targetType: "VEHICLE_PREFERENCE", traitKey: "driving_engagement", traitValue: 6 },
          { targetType: "VEHICLE_PREFERENCE", traitKey: "brand_expression", traitValue: 3 },
          { targetType: "VEHICLE_PREFERENCE", traitKey: "design_presence", traitValue: 3 },
          { targetType: "PERSONALITY_TRAIT", traitKey: "novelty_seeking", traitValue: 3 },
          { targetType: "PERSONALITY_TRAIT", traitKey: "control_preference", traitValue: 3 },
          { targetType: "PERSONALITY_TRAIT", traitKey: "expression_drive", traitValue: 2 },
        ]),
      },
      personalityProfile: {
        findMany: vi.fn().mockResolvedValue([
          {
            id: "profile_expression",
            code: "EXPRESSIVE_EXPLORER",
            name: "表达探索型",
            summary: "summary",
            detail: "detail",
            rules: [],
          },
        ]),
      },
      vehicle: {
        findMany: vi.fn().mockResolvedValue([
          {
            id: "vehicle_commuter",
            slug: "commuter-sedan",
            brand: "品牌通勤",
            series: "通勤轿车",
            modelName: "",
            summary: "static",
            recommendation: "static",
            status: "active",
            handlingScore: 42,
            comfortScore: 70,
            spaceScore: 68,
            smartScore: 38,
            powerScore: 40,
            economyScore: 88,
            brandScore: 35,
            designScore: 36,
            reliabilityScore: 85,
            familyScore: 62,
            constraintRules: [],
            traitWeights: [
              { targetType: "VEHICLE_PREFERENCE", targetKey: "running_cost", weight: 10 },
              { targetType: "VEHICLE_PREFERENCE", targetKey: "daily_reliability", weight: 9 },
            ],
          },
          {
            id: "vehicle_tech",
            slug: "tech-performance-ev",
            brand: "品牌性能",
            series: "科技性能轿车",
            modelName: "",
            summary: "static",
            recommendation: "static",
            status: "active",
            handlingScore: 90,
            comfortScore: 70,
            spaceScore: 58,
            smartScore: 94,
            powerScore: 92,
            economyScore: 58,
            brandScore: 76,
            designScore: 84,
            reliabilityScore: 65,
            familyScore: 44,
            constraintRules: [],
            traitWeights: [
              { targetType: "VEHICLE_PREFERENCE", targetKey: "smart_features", weight: 10 },
              { targetType: "VEHICLE_PREFERENCE", targetKey: "driving_engagement", weight: 10 },
            ],
          },
        ]),
      },
      sessionResult: {
        create: vi.fn().mockResolvedValue({
          id: "result_core_vector_1",
          sessionId: "session_core_vector_1",
        }),
      },
      sessionVehicleRecommendation: {
        createMany: vi.fn().mockResolvedValue(undefined),
      },
    };

    const service = new AssessmentService(prisma as never, {
      getInitialQuestion: vi.fn(),
      getNextQuestion: vi.fn(),
    } as never);

    const result = await service.completeSession("session_core_vector_1");

    expect(result.recommendations[0]).toMatchObject({
      slug: "tech-performance-ev",
      brand: "品牌性能",
      series: "科技性能轿车",
      rank: 1,
    });
    expect(result.recommendations[1]).toMatchObject({
      slug: "commuter-sedan",
      brand: "品牌通勤",
      series: "通勤轿车",
      rank: 2,
    });
    expect(result.recommendations[0]?.score).toBeGreaterThan(result.recommendations[1]?.score ?? 0);
  });

  it("prefers EV recommendations when the user has charging access and explicitly accepts EV", async () => {
    const prisma = {
      assessmentSession: {
        create: vi.fn(),
        findUnique: vi.fn().mockResolvedValue({
          id: "session_ev_preferred_1",
          status: "IN_PROGRESS",
        }),
        update: vi.fn().mockResolvedValue(undefined),
      },
      sessionTraitSnapshot: {
        createMany: vi.fn(),
        findMany: vi.fn().mockResolvedValue([
          { targetType: "HARD_CONSTRAINT", traitKey: "budget_level", traitValue: 4 },
          { targetType: "HARD_CONSTRAINT", traitKey: "charging_access", traitValue: 5 },
          { targetType: "HARD_CONSTRAINT", traitKey: "energy_acceptance_ev", traitValue: 5 },
          { targetType: "HARD_CONSTRAINT", traitKey: "energy_acceptance_ice", traitValue: 2 },
          { targetType: "VEHICLE_PREFERENCE", traitKey: "smart_features", traitValue: 6 },
          { targetType: "VEHICLE_PREFERENCE", traitKey: "design_presence", traitValue: 4 },
          { targetType: "PERSONALITY_TRAIT", traitKey: "novelty_seeking", traitValue: 3 },
        ]),
      },
      personalityProfile: {
        findMany: vi.fn().mockResolvedValue([
          {
            id: "profile_expression",
            code: "EXPRESSIVE_EXPLORER",
            name: "表达探索型",
            summary: "summary",
            detail: "detail",
            rules: [],
          },
        ]),
      },
      vehicle: {
        findMany: vi.fn().mockResolvedValue([
          {
            id: "vehicle_ice",
            slug: "premium-ice-suv",
            brand: "品牌燃油",
            series: "燃油豪华 SUV",
            modelName: "",
            summary: "static",
            recommendation: "static",
            status: "active",
            energyType: "ICE",
            handlingScore: 78,
            comfortScore: 90,
            spaceScore: 88,
            smartScore: 80,
            powerScore: 80,
            economyScore: 68,
            brandScore: 82,
            designScore: 82,
            reliabilityScore: 82,
            familyScore: 86,
            constraintRules: [],
            traitWeights: [
              { targetType: "VEHICLE_PREFERENCE", targetKey: "comfort_space", weight: 8 },
              { targetType: "VEHICLE_PREFERENCE", targetKey: "brand_expression", weight: 8 },
              { targetType: "VEHICLE_PREFERENCE", targetKey: "smart_features", weight: 6 },
            ],
          },
          {
            id: "vehicle_ev",
            slug: "smart-ev-sedan",
            brand: "品牌纯电",
            series: "智能纯电轿车",
            modelName: "",
            summary: "static",
            recommendation: "static",
            status: "active",
            energyType: "EV",
            handlingScore: 60,
            comfortScore: 62,
            spaceScore: 52,
            smartScore: 88,
            powerScore: 70,
            economyScore: 74,
            brandScore: 58,
            designScore: 74,
            reliabilityScore: 60,
            familyScore: 44,
            constraintRules: [],
            traitWeights: [
              { targetType: "VEHICLE_PREFERENCE", targetKey: "smart_features", weight: 10 },
              { targetType: "VEHICLE_PREFERENCE", targetKey: "design_presence", weight: 8 },
            ],
          },
        ]),
      },
      sessionResult: {
        create: vi.fn().mockResolvedValue({
          id: "result_ev_preferred_1",
          sessionId: "session_ev_preferred_1",
        }),
      },
      sessionVehicleRecommendation: {
        createMany: vi.fn().mockResolvedValue(undefined),
      },
    };

    const service = new AssessmentService(prisma as never, {
      getInitialQuestion: vi.fn(),
      getNextQuestion: vi.fn(),
    } as never);

    const result = await service.completeSession("session_ev_preferred_1");

    expect(result.recommendations[0]).toMatchObject({
      slug: "smart-ev-sedan",
      brand: "品牌纯电",
      series: "智能纯电轿车",
      rank: 1,
    });
    expect(result.recommendations[1]).toMatchObject({
      slug: "premium-ice-suv",
      brand: "品牌燃油",
      series: "燃油豪华 SUV",
      rank: 2,
    });
  });

  it("rolls back the final answer flow when auto-complete fails vehicle matching", async () => {
    const tx = {
      assessmentSession: {
        findUnique: vi.fn().mockResolvedValue({
          id: "session_auto_complete_fail",
          status: "IN_PROGRESS",
          stepIndex: 5,
          currentQuestionId: "question_6",
          currentBranchKey: "steady-practical",
          lifeQuestionCount: 3,
          carQuestionCount: 2,
        }),
        update: vi.fn().mockResolvedValue(undefined),
      },
      assessmentAnswer: {
        create: vi.fn().mockResolvedValue(undefined),
        findMany: vi.fn().mockResolvedValue([
          { questionId: "question_1" },
          { questionId: "question_3" },
          { questionId: "question_5" },
          { questionId: "question_6" },
        ]),
      },
      sessionTraitSnapshot: {
        createMany: vi.fn().mockResolvedValue(undefined),
        findMany: vi.fn().mockResolvedValue([
          { targetType: "PERSONALITY_TRAIT", traitKey: "stability_preference", traitValue: 2 },
        ]),
      },
      sessionQuestionCandidate: {
        createMany: vi.fn().mockResolvedValue(undefined),
      },
      question: {
        findUnique: vi.fn().mockResolvedValue({
          id: "question_6",
          type: "CAR_USAGE",
        }),
      },
      questionOption: {
        findUnique: vi.fn().mockResolvedValue({
          id: "option_6",
          questionId: "question_6",
          effects: [],
        }),
      },
      questionBranchRule: {
        findMany: vi.fn().mockResolvedValue([]),
      },
      personalityProfile: {
        findMany: vi.fn().mockResolvedValue([
          {
            id: "profile_steady",
            code: "STEADY_PRAGMATIST",
            name: "稳健务实型",
            summary: "summary",
            detail: "detail",
            rules: [],
          },
        ]),
      },
      vehicle: {
        findMany: vi.fn().mockResolvedValue([
          {
            id: "vehicle_fail",
            slug: "future-ev-x",
            brand: "未来",
            series: "EV",
            modelName: "X",
            recommendation: "static",
            constraintRules: [
              {
                targetType: "PERSONALITY_TRAIT",
                targetKey: "stability_preference",
                traitOperator: "GTE",
                traitThreshold: 5,
              },
            ],
            traitWeights: [
              {
                targetType: "PERSONALITY_TRAIT",
                targetKey: "stability_preference",
                weight: 10,
              },
            ],
          },
        ]),
      },
      sessionResult: {
        create: vi.fn().mockResolvedValue({
          id: "result_auto_complete_fail",
          sessionId: "session_auto_complete_fail",
        }),
      },
      sessionVehicleRecommendation: {
        createMany: vi.fn(),
      },
    };
    const prisma = {
      ...tx,
      $transaction: vi.fn(async (callback: (inner: typeof tx) => Promise<unknown>) => callback(tx)),
    };
    const questionsService = {
      getInitialQuestion: vi.fn(),
      getNextQuestion: vi.fn().mockResolvedValue({
        nextQuestion: null,
        candidates: [],
      }),
    };
    const service = new AssessmentService(prisma as never, questionsService as never);

    await expect(
      service.submitAnswer("session_auto_complete_fail", {
        questionId: "question_6",
        optionId: "option_6",
      }),
    ).resolves.toMatchObject({
      accepted: true,
      completed: true,
      lockedQuestionId: "question_6",
      nextQuestion: null,
    });

    expect(prisma.$transaction).toHaveBeenCalledTimes(1);
    expect(tx.assessmentAnswer.create).toHaveBeenCalledTimes(1);
    expect(tx.assessmentSession.update).toHaveBeenCalledTimes(2);
    expect(tx.sessionResult.create).toHaveBeenCalledTimes(1);
  });

  it("auto-completes the session when the stop condition is met after answer submission", async () => {
    const sessionFindUnique = vi.fn().mockResolvedValue({
      id: "session_auto_complete",
      status: "IN_PROGRESS",
      stepIndex: 2,
      currentQuestionId: "question_5",
      currentBranchKey: "steady-practical",
      lifeQuestionCount: 1,
      carQuestionCount: 1,
    });
    const answerCreate = vi.fn().mockResolvedValue(undefined);
    const answerFindMany = vi.fn().mockResolvedValue([
      { questionId: "question_1" },
      { questionId: "question_3" },
      { questionId: "question_5" },
    ]);
    const snapshotCreateMany = vi.fn().mockResolvedValue(undefined);
    const snapshotFindMany = vi.fn().mockResolvedValue([
      { targetType: "PERSONALITY_TRAIT", traitKey: "stability_preference", traitValue: 3 },
      { targetType: "VEHICLE_PREFERENCE", traitKey: "family_fit", traitValue: 4 },
      { targetType: "VEHICLE_PREFERENCE", traitKey: "running_cost", traitValue: 3 },
    ]);
    const sessionUpdate = vi.fn().mockResolvedValue(undefined);
    const questionFindUnique = vi.fn().mockResolvedValue({
      id: "question_5",
      type: "CAR_USAGE",
    });
    const optionFindUnique = vi.fn().mockResolvedValue({
      id: "option_5",
      questionId: "question_5",
      effects: [],
    });
    const profileFindMany = vi.fn().mockResolvedValue([
      {
        id: "profile_steady",
        code: "STEADY_PRAGMATIST",
        name: "稳健务实型",
        summary: "做决定偏稳，重视长期成本、确定性和日常便利。",
        detail: "detail",
        rules: [
          {
            targetKey: "stability_preference",
            traitOperator: "GTE",
            traitThreshold: 2,
            weight: 5,
          },
        ],
      },
    ]);
    const vehicleFindMany = vi.fn().mockResolvedValue([
      {
        id: "vehicle_1",
        slug: "byd-song-plus-dmi",
        brand: "比亚迪",
        series: "宋 PLUS",
        modelName: "DM-i",
        recommendation: "static",
        constraintRules: [],
        traitWeights: [
          { targetType: "VEHICLE_PREFERENCE", targetKey: "family_fit", weight: 10 },
          { targetType: "VEHICLE_PREFERENCE", targetKey: "running_cost", weight: 9 },
          { targetType: "PERSONALITY_TRAIT", targetKey: "stability_preference", weight: 7 },
        ],
      },
    ]);
    const resultCreate = vi.fn().mockResolvedValue({
      id: "result_auto",
      sessionId: "session_auto_complete",
    });
    const recommendationCreateMany = vi.fn().mockResolvedValue(undefined);

    const prisma = {
      assessmentSession: {
        create: vi.fn(),
        findUnique: sessionFindUnique,
        update: sessionUpdate,
      },
      assessmentAnswer: {
        create: answerCreate,
        findMany: answerFindMany,
      },
      sessionTraitSnapshot: {
        createMany: snapshotCreateMany,
        findMany: snapshotFindMany,
      },
      sessionQuestionCandidate: {
        createMany: vi.fn(),
      },
      question: {
        findUnique: questionFindUnique,
      },
      questionOption: {
        findUnique: optionFindUnique,
      },
      questionBranchRule: {
        findMany: vi.fn().mockResolvedValue([]),
      },
      personalityProfile: {
        findMany: profileFindMany,
      },
      vehicle: {
        findMany: vehicleFindMany,
      },
      sessionResult: {
        create: resultCreate,
      },
      sessionVehicleRecommendation: {
        createMany: recommendationCreateMany,
      },
    };
    const questionsService = {
      getInitialQuestion: vi.fn(),
      getNextQuestion: vi.fn().mockResolvedValue({
        nextQuestion: null,
        candidates: [],
      }),
    };

    const service = new AssessmentService(prisma as never, questionsService as never);

    await expect(
      service.submitAnswer("session_auto_complete", {
        questionId: "question_5",
        optionId: "option_5",
      }),
    ).resolves.toMatchObject({
      accepted: true,
      completed: true,
      lockedQuestionId: "question_5",
      nextQuestion: null,
      result: {
        sessionId: "session_auto_complete",
        personalityProfile: {
          code: "PSCV",
          archetypeCode: "STEADY_PRAGMATIST",
          name: "务实省心型",
          summary: "你买车时优先考虑省钱、舒适、耐用和值得买，核心诉求是稳定满足通勤和家庭需要。",
        },
        recommendations: [
          {
            slug: "byd-song-plus-dmi",
            brand: "比亚迪",
            series: "宋 PLUS",
            rank: 1,
            score: 68,
            reason: "你当前更看重空间实用性、家庭适配、使用成本，这台车在家庭适配、使用成本上更贴合你的选择。",
          },
        ],
      },
    });
  });

  it("uses transactional trait snapshots when auto-completing after the last answer", async () => {
    const tx = {
      assessmentSession: {
        findUnique: vi.fn().mockResolvedValue({
          id: "session_tx_traits",
          status: "IN_PROGRESS",
          stepIndex: 0,
          currentQuestionId: "question_1",
          currentBranchKey: "steady-practical",
          lifeQuestionCount: 0,
          carQuestionCount: 0,
          targetQuestionCount: 1,
        }),
        update: vi.fn().mockResolvedValue(undefined),
        create: vi.fn(),
      },
      assessmentAnswer: {
        create: vi.fn().mockResolvedValue(undefined),
        findMany: vi.fn().mockResolvedValue([{ questionId: "question_1" }]),
      },
      sessionTraitSnapshot: {
        createMany: vi.fn().mockResolvedValue(undefined),
        findMany: vi.fn().mockResolvedValue([
          {
            targetType: "PERSONALITY_TRAIT",
            traitKey: "expression_drive",
            traitValue: 5,
          },
          {
            targetType: "VEHICLE_PREFERENCE",
            traitKey: "smart_features",
            traitValue: 5,
          },
          {
            targetType: "VEHICLE_PREFERENCE",
            traitKey: "driving_engagement",
            traitValue: 5,
          },
        ]),
      },
      sessionQuestionCandidate: {
        createMany: vi.fn().mockResolvedValue(undefined),
      },
      question: {
        findUnique: vi.fn().mockResolvedValue({
          id: "question_1",
          type: "CAR_USAGE",
        }),
      },
      questionOption: {
        findUnique: vi.fn().mockResolvedValue({
          id: "option_1",
          questionId: "question_1",
          effects: [
            {
              targetType: "PERSONALITY_TRAIT",
              targetKey: "expression_drive",
              weightDelta: 5,
            },
          ],
        }),
      },
      questionBranchRule: {
        findMany: vi.fn().mockResolvedValue([]),
      },
      personalityProfile: {
        findMany: vi.fn().mockResolvedValue([
          {
            id: "profile_expression",
            code: "EXPRESSIVE_EXPLORER",
            name: "表达探索型",
            summary: "summary",
            detail: "detail",
            rules: [],
          },
        ]),
      },
      vehicle: {
        findMany: vi.fn().mockResolvedValue([
          {
            id: "vehicle_1",
            slug: "performance-tech-car",
            brand: "品牌性能",
            series: "系列性能",
            modelName: "高阶版",
            recommendation: "static",
            constraintRules: [],
            traitWeights: [
              { targetType: "VEHICLE_PREFERENCE", targetKey: "smart_features", weight: 10 },
              { targetType: "VEHICLE_PREFERENCE", targetKey: "driving_engagement", weight: 10 },
            ],
          },
        ]),
      },
      sessionResult: {
        create: vi.fn().mockResolvedValue({
          id: "result_tx_traits",
          sessionId: "session_tx_traits",
        }),
      },
      sessionVehicleRecommendation: {
        createMany: vi.fn().mockResolvedValue(undefined),
      },
    };

    const prisma = {
      $transaction: vi.fn(async (callback: (db: typeof tx) => Promise<unknown>) => callback(tx)),
      assessmentSession: {
        create: vi.fn(),
        findUnique: vi.fn(),
        update: vi.fn(),
      },
      assessmentAnswer: {
        create: vi.fn(),
        findMany: vi.fn(),
      },
      sessionTraitSnapshot: {
        createMany: vi.fn(),
        findMany: vi.fn().mockResolvedValue([]),
      },
      questionBranchRule: {
        findMany: vi.fn(),
      },
      sessionQuestionCandidate: {
        createMany: vi.fn(),
      },
      question: {
        findUnique: vi.fn(),
      },
      questionOption: {
        findUnique: vi.fn(),
      },
      personalityProfile: {
        findMany: vi.fn(),
      },
      vehicle: {
        findMany: vi.fn(),
      },
      sessionResult: {
        create: vi.fn(),
      },
      sessionVehicleRecommendation: {
        createMany: vi.fn(),
      },
    };

    const service = new AssessmentService(prisma as never, {
      getInitialQuestion: vi.fn(),
      getNextQuestion: vi.fn().mockResolvedValue({
        nextQuestion: null,
        candidates: [],
      }),
    } as never);

    await expect(
      service.submitAnswer("session_tx_traits", {
        questionId: "question_1",
        optionId: "option_1",
      }),
    ).resolves.toMatchObject({
      completed: true,
      result: {
        personalityProfile: {
          code: "EQDV",
          archetypeCode: "EXPRESSIVE_EXPLORER",
        },
      },
    });
  });

  it("keeps the session in progress after the third answer when another question is available", async () => {
    const sessionFindUnique = vi.fn().mockResolvedValue({
      id: "session_continue_after_three",
      status: "IN_PROGRESS",
      stepIndex: 2,
      currentQuestionId: "question_5",
      currentBranchKey: "steady-practical",
      lifeQuestionCount: 1,
      carQuestionCount: 1,
    });
    const sessionUpdate = vi.fn().mockResolvedValue(undefined);

    const prisma = {
      assessmentSession: {
        create: vi.fn(),
        findUnique: sessionFindUnique,
        update: sessionUpdate,
      },
      assessmentAnswer: {
        create: vi.fn().mockResolvedValue(undefined),
        findMany: vi.fn().mockResolvedValue([
          { questionId: "question_1" },
          { questionId: "question_3" },
          { questionId: "question_5" },
        ]),
      },
      sessionTraitSnapshot: {
        createMany: vi.fn().mockResolvedValue(undefined),
        findMany: vi.fn().mockResolvedValue([]),
      },
      sessionQuestionCandidate: {
        createMany: vi.fn().mockResolvedValue(undefined),
      },
      question: {
        findUnique: vi.fn().mockResolvedValue({
          id: "question_5",
          type: "CAR_USAGE",
        }),
      },
      questionOption: {
        findUnique: vi.fn().mockResolvedValue({
          id: "option_5",
          questionId: "question_5",
          effects: [],
        }),
      },
      questionBranchRule: {
        findMany: vi.fn().mockResolvedValue([]),
      },
    };
    const questionsService = {
      getInitialQuestion: vi.fn(),
      getNextQuestion: vi.fn().mockResolvedValue({
        nextQuestion: {
          id: "question_6",
          slug: "brand-vs-value",
          title: "如果两台车功能接近，你更容易被什么打动？",
          description: null,
          branchKey: "social-expression",
          type: "CAR_USAGE",
          options: [],
        },
        candidates: [],
      }),
    };

    const service = new AssessmentService(prisma as never, questionsService as never);

    await expect(
      service.submitAnswer("session_continue_after_three", {
        questionId: "question_5",
        optionId: "option_5",
      }),
    ).resolves.toEqual({
      accepted: true,
      completed: false,
      lockedQuestionId: "question_5",
      nextQuestion: {
        id: "question_6",
        slug: "brand-vs-value",
        title: "如果两台车功能接近，你更容易被什么打动？",
        description: null,
        branchKey: "social-expression",
        type: "CAR_USAGE",
        options: [],
      },
    });
  });

  it("keeps the session in progress after the sixth answer when another question is available", async () => {
    const sessionFindUnique = vi.fn().mockResolvedValue({
      id: "session_continue_after_six",
      status: "IN_PROGRESS",
      stepIndex: 5,
      currentQuestionId: "question_9",
      currentBranchKey: "steady-practical",
      lifeQuestionCount: 3,
      carQuestionCount: 2,
    });

    const prisma = {
      assessmentSession: {
        create: vi.fn(),
        findUnique: sessionFindUnique,
        update: vi.fn().mockResolvedValue(undefined),
      },
      assessmentAnswer: {
        create: vi.fn().mockResolvedValue(undefined),
        findMany: vi.fn().mockResolvedValue([
          { questionId: "question_1" },
          { questionId: "question_2" },
          { questionId: "question_4" },
          { questionId: "question_6" },
          { questionId: "question_8" },
          { questionId: "question_9" },
        ]),
      },
      sessionTraitSnapshot: {
        createMany: vi.fn().mockResolvedValue(undefined),
        findMany: vi.fn().mockResolvedValue([]),
      },
      sessionQuestionCandidate: {
        createMany: vi.fn().mockResolvedValue(undefined),
      },
      question: {
        findUnique: vi.fn().mockResolvedValue({
          id: "question_9",
          type: "CAR_USAGE",
        }),
      },
      questionOption: {
        findUnique: vi.fn().mockResolvedValue({
          id: "option_9",
          questionId: "question_9",
          effects: [],
        }),
      },
      questionBranchRule: {
        findMany: vi.fn().mockResolvedValue([]),
      },
    };
    const questionsService = {
      getInitialQuestion: vi.fn(),
      getNextQuestion: vi.fn().mockResolvedValue({
        nextQuestion: {
          id: "question_10",
          slug: "ownership-horizon",
          title: "你希望这台车陪你用多久？",
          description: null,
          branchKey: null,
          type: "LIFE_STYLE",
          options: [],
        },
        candidates: [],
      }),
    };

    const service = new AssessmentService(prisma as never, questionsService as never);

    await expect(
      service.submitAnswer("session_continue_after_six", {
        questionId: "question_9",
        optionId: "option_9",
      }),
    ).resolves.toEqual({
      accepted: true,
      completed: false,
      lockedQuestionId: "question_9",
      nextQuestion: {
        id: "question_10",
        slug: "ownership-horizon",
        title: "你希望这台车陪你用多久？",
        description: null,
        branchKey: null,
        type: "LIFE_STYLE",
        options: [],
      },
    });
  });

  it("selects the profile whose persisted rules score highest, even if hardcoded labels would suggest another profile", async () => {
    const sessionFindUnique = vi.fn().mockResolvedValue({
      id: "session_rule_profile",
      status: "IN_PROGRESS",
    });
    const snapshotFindMany = vi.fn().mockResolvedValue([
      {
        targetType: "VEHICLE_PREFERENCE",
        traitKey: "smart_features",
        traitValue: 5,
      },
      {
        targetType: "PERSONALITY_TRAIT",
        traitKey: "novelty_seeking",
        traitValue: 1,
      },
    ]);
    const profileFindMany = vi.fn().mockResolvedValue([
      {
        id: "profile_steady",
        code: "STEADY_PRAGMATIST",
        name: "务实省心型",
        summary: "你买车时优先考虑省钱、舒适、耐用和值得买，核心诉求是稳定满足通勤和家庭需要。",
        detail: "detail",
        rules: [
          {
            targetKey: "smart_features",
            traitOperator: "GTE",
            traitThreshold: 4,
            weight: 10,
          },
        ],
      },
      {
        id: "profile_expression",
        code: "EXPRESSIVE_EXPLORER",
        name: "表达探索型",
        summary: "重视新鲜感、表达欲和技术体验。",
        detail: "detail",
        rules: [
          {
            targetKey: "novelty_seeking",
            traitOperator: "GTE",
            traitThreshold: 2,
            weight: 20,
          },
        ],
      },
    ]);
    const vehicleFindMany = vi.fn().mockResolvedValue([]);
    const resultCreate = vi.fn().mockResolvedValue({
      id: "result_rule_profile",
      sessionId: "session_rule_profile",
    });

    const prisma = {
      assessmentSession: {
        create: vi.fn(),
        findUnique: sessionFindUnique,
        update: vi.fn().mockResolvedValue(undefined),
      },
      assessmentAnswer: {
        create: vi.fn(),
        findMany: vi.fn(),
      },
      sessionTraitSnapshot: {
        createMany: vi.fn(),
        findMany: snapshotFindMany,
      },
      sessionQuestionCandidate: {
        createMany: vi.fn(),
      },
      question: {
        findUnique: vi.fn(),
      },
      questionOption: {
        findUnique: vi.fn(),
      },
      questionBranchRule: {
        findMany: vi.fn(),
      },
      personalityProfile: {
        findMany: profileFindMany,
      },
      vehicle: {
        findMany: vehicleFindMany,
      },
      sessionResult: {
        create: resultCreate,
      },
      sessionVehicleRecommendation: {
        createMany: vi.fn().mockResolvedValue(undefined),
      },
    };
    const questionsService = {
      getInitialQuestion: vi.fn(),
      getNextQuestion: vi.fn(),
    };

    const service = new AssessmentService(prisma as never, questionsService as never);

    await expect(service.completeSession("session_rule_profile")).resolves.toMatchObject({
      sessionId: "session_rule_profile",
      personality: {
        word: "Planner",
        name: "高配舒享型",
        epithet: "舒享规划者",
      },
      recommendations: [],
    });
  });

  it("returns a completed result from persistence for result page fetching", async () => {
    const sessionFindUnique = vi.fn().mockResolvedValue({
      id: "session_result_1",
      result: {
        sessionId: "session_result_1",
        personalityProfile: {
          code: "STEADY_PRAGMATIST",
          name: "稳健务实型",
          summary: "做决定偏稳，重视长期成本、确定性和日常便利。",
        },
        recommendations: [
          {
            rank: 1,
            score: 88,
            reason: "你当前更看重家庭适配、稳定性、长期使用成本，这台车在这些维度上最贴合你的选择。",
            vehicle: {
              slug: "byd-song-plus-dmi",
              brand: "比亚迪",
              series: "宋 PLUS",
              modelName: "DM-i",
            },
          },
        ],
      },
    });

    const prisma = {
      assessmentSession: {
        create: vi.fn(),
        findUnique: sessionFindUnique,
        update: vi.fn(),
      },
      sessionTraitSnapshot: {
        findMany: vi.fn().mockResolvedValue([
          {
            targetType: "PERSONALITY_TRAIT",
            traitKey: "stability_preference",
            traitValue: 3,
          },
          {
            targetType: "VEHICLE_PREFERENCE",
            traitKey: "running_cost",
            traitValue: 3,
          },
          {
            targetType: "VEHICLE_PREFERENCE",
            traitKey: "family_fit",
            traitValue: 4,
          },
          {
            targetType: "VEHICLE_PREFERENCE",
            traitKey: "daily_reliability",
            traitValue: 3,
          },
        ]),
      },
    };
    const questionsService = {
      getInitialQuestion: vi.fn(),
      getNextQuestion: vi.fn(),
    };

    const service = new AssessmentService(prisma as never, questionsService as never);

    await expect(service.getSessionResult("session_result_1")).resolves.toMatchObject({
      personality: {
        word: "Guardian",
        name: "务实省心型",
        epithet: "守序顾家者",
      },
      sessionId: "session_result_1",
      personalityProfile: {
        code: "PSCV",
        archetypeCode: "STEADY_PRAGMATIST",
        name: "务实省心型",
        summary: "你买车时优先考虑省钱、舒适、耐用和值得买，核心诉求是稳定满足通勤和家庭需要。",
      },
      recommendations: [
        {
          slug: "byd-song-plus-dmi",
          brand: "比亚迪",
          series: "宋 PLUS",
          rank: 1,
          score: 88,
          reason: "你当前更看重家庭适配、稳定性、长期使用成本，这台车在这些维度上最贴合你的选择。",
        },
      ],
    });

    expect(sessionFindUnique).toHaveBeenCalledWith({
      where: {
        id: "session_result_1",
      },
      select: {
        id: true,
        result: {
          select: {
            sessionId: true,
            personalityProfile: {
              select: {
                code: true,
                name: true,
                summary: true,
              },
            },
            recommendations: {
              orderBy: {
                rank: "asc",
              },
              select: {
                rank: true,
                score: true,
                reason: true,
                vehicle: {
                  select: {
                    slug: true,
                    brand: true,
                    series: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  });

  it("returns the current session snapshot for refresh recovery", async () => {
    const sessionFindUnique = vi.fn().mockResolvedValue({
      id: "session_current_1",
      status: "IN_PROGRESS",
      stepIndex: 3,
      currentQuestionId: "question_6",
    });
    const questionFindUnique = vi.fn().mockResolvedValue({
      id: "question_6",
      slug: "city-parking-pressure",
      title: "在拥挤城市里停车不方便时，你更希望车子怎样？",
      description: null,
      branchKey: "steady-practical",
      type: "CAR_USAGE",
      options: [
        {
          id: "option_1",
          label: "辅助功能到位，能少花精力最好",
          order: 1,
        },
      ],
    });

    const prisma = {
      assessmentSession: {
        create: vi.fn(),
        findUnique: sessionFindUnique,
        update: vi.fn(),
      },
      question: {
        findUnique: questionFindUnique,
      },
    };
    const questionsService = {
      getInitialQuestion: vi.fn(),
      getNextQuestion: vi.fn(),
    };

    const service = new AssessmentService(prisma as never, questionsService as never);

    await expect(service.getCurrentSession("session_current_1")).resolves.toEqual({
      sessionId: "session_current_1",
      status: "in_progress",
      mode: "standard",
      targetQuestionCount: 56,
      stepIndex: 3,
      nextQuestion: {
        id: "question_6",
        slug: "city-parking-pressure",
        title: "在拥挤城市里停车不方便时，你更希望车子怎样？",
        description: null,
        branchKey: "steady-practical",
        type: "CAR_USAGE",
        options: [
          {
            id: "option_1",
            label: "辅助功能到位，能少花精力最好",
            order: 1,
          },
        ],
      },
    });
  });
});
