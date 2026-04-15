import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../common/prisma/prisma.service";
import { QuestionsService } from "../questions/questions.service";
import { CompleteSessionResponseDto } from "./dto/complete-session-response.dto";
import type { RankedQuestionCandidate } from "../questions/next-question-result.type";
import { CreateSessionResponseDto } from "./dto/create-session-response.dto";
import { CreateSessionDto } from "./dto/create-session.dto";
import { SubmitAnswerDto } from "./dto/submit-answer.dto";
import { SubmitAnswerResponseDto } from "./dto/submit-answer-response.dto";

type TraitTargetType =
  | "HARD_CONSTRAINT"
  | "PERSONALITY_TRAIT"
  | "VEHICLE_PREFERENCE"
  | "BRANCH_SIGNAL";

type AggregatedTraits = {
  byKey: Record<string, number>;
  byTargetType: Partial<Record<TraitTargetType, Record<string, number>>>;
};

type CorePreferenceKey =
  | "handling"
  | "comfort"
  | "space"
  | "smart"
  | "power"
  | "economy"
  | "brand"
  | "design"
  | "reliability"
  | "family";

type CorePreferenceVector = Record<CorePreferenceKey, number>;
type PersonalityDimension = {
  key: string;
  label: string;
  value: number;
  directionLabel: string;
};

type VehicleScoreSource = {
  energyType?: string | null;
  traitWeights: Array<{
    targetType: TraitTargetType;
    targetKey: string;
    weight: number | { toString(): string };
  }>;
  constraintRules: Array<{
    targetType: TraitTargetType;
    targetKey: string;
    traitOperator: "EQ" | "NEQ" | "GT" | "GTE" | "LT" | "LTE";
    traitThreshold: number | { toString(): string };
  }>;
  handlingScore?: number | null;
  comfortScore?: number | null;
  spaceScore?: number | null;
  smartScore?: number | null;
  powerScore?: number | null;
  economyScore?: number | null;
  brandScore?: number | null;
  designScore?: number | null;
  reliabilityScore?: number | null;
  familyScore?: number | null;
};

const CORE_PREFERENCE_LABELS: Record<CorePreferenceKey, string> = {
  handling: "操控响应",
  comfort: "舒适性",
  space: "空间实用性",
  smart: "科技配置",
  power: "动力表现",
  economy: "使用成本",
  brand: "品牌感",
  design: "设计辨识度",
  reliability: "可靠稳定性",
  family: "家庭适配",
};

const DISPLAY_PERSONALITY_PROFILES: Record<
  string,
  {
    name: string;
    summary: string;
  }
> = {
  PSCV: {
    name: "务实省心型",
    summary: "你买车时优先考虑省钱、舒适、耐用和值得买，核心诉求是稳定满足通勤和家庭需要。",
  },
  PSCB: {
    name: "体面务实型",
    summary: "你希望一台车既省心舒适，也有成熟品牌带来的体面感和安心感。",
  },
  PSDV: {
    name: "理性驾趣型",
    summary: "你在意驾驶乐趣和车辆反应，但前提仍是成本可控、选择划算，不会为情绪感完全失去理性。",
  },
  PSDB: {
    name: "克制性能型",
    summary: "你想要驾控和品牌带来的满足感，但依然会把理性和实际价值放在前面。",
  },
  PQCV: {
    name: "品质实用型",
    summary: "你愿意为更完整的品质体验付费，但核心仍是舒适、稳定和长期使用价值。",
  },
  PQCB: {
    name: "成熟品质型",
    summary: "你看重舒适、质感和品牌成熟度，希望整台车在体验和体面感上都比较均衡。",
  },
  PQDV: {
    name: "精致驾控型",
    summary: "你追求更完整的驾驶质感和配置体验，同时仍会认真衡量一台车是否值得入手。",
  },
  PQDB: {
    name: "格调性能型",
    summary: "你偏爱更高级的驾控体验和品牌质感，买车时很看重整体格调和完成度。",
  },
  ESCV: {
    name: "感受家用型",
    summary: "你容易被顺手、舒服和整体感受打动，但最终仍偏向舒适、省心和高性价比。",
  },
  ESCB: {
    name: "感性体面型",
    summary: "你喜欢顺眼、舒服、有面子的车，不一定追求极致参数，但很重视感受是否到位。",
  },
  ESDV: {
    name: "玩乐超值型",
    summary: "你重视驾驶乐趣和新鲜感，但不想为品牌溢价多花钱，更希望把钱花在体验本身上。",
  },
  ESDB: {
    name: "外放驾趣型",
    summary: "你希望车有个性、有乐趣、有存在感，最好还能兼顾足够鲜明的品牌表达。",
  },
  EQCV: {
    name: "高配舒享型",
    summary: "你更在意座舱体验、配置完整度和舒适感，偏好长期使用中持续让人满意的车。",
  },
  EQCB: {
    name: "豪华舒享型",
    summary: "你注重品牌、品质、舒适和体面，买车时会优先考虑整体体验是否足够高级。",
  },
  EQDV: {
    name: "科技驾趣型",
    summary: "你看重科技、性能和品质完成度，希望一台车本身就能持续提供兴奋感和新鲜感。",
  },
  EQDB: {
    name: "旗舰表达型",
    summary: "你追求品牌、科技、驾控和辨识度，买车同时也在买表达和气场。",
  },
};

const PERSONALITY_DIRECTION_CONTENT: Record<
  string,
  {
    subtitle: string;
    decision: string;
    scene: string;
    habit: string;
    strength: string;
    caution: string;
  }
> = {
  "更偏务实": {
    subtitle: "会优先确认长期是否省心、划算、可持续。",
    decision: "决策时会先看风险和长期负担，再考虑体验是否足够满意。",
    scene: "更常见于预算需要兼顾现实压力的生活节奏。",
    habit: "选车时会优先排除后续容易带来麻烦的方案。",
    strength: "判断稳，不容易被短期情绪带偏。",
    caution: "可能低估纯粹的情绪价值和驾驶兴奋感。",
  },
  "更偏表达": {
    subtitle: "更容易被体验、辨识度和情绪价值驱动。",
    decision: "决策时会先判断一台车有没有感觉，再考虑长期是否值得投入。",
    scene: "更常见于个人表达欲和新鲜感需求更强的生活状态。",
    habit: "选车时会主动关注设计、品牌感受和驾驶反馈。",
    strength: "更容易识别真正让自己满意的体验差异。",
    caution: "可能在兴奋感较强时低估长期使用成本。",
  },
  "更偏成本敏感": {
    subtitle: "对预算效率、月供压力和长期成本更敏感。",
    decision: "会反复确认花出去的钱是否真正换回了长期价值。",
    scene: "更常见于需要综合平衡预算、家庭和长期用车支出的阶段。",
    habit: "更看重保值、维护成本和持续使用的经济性。",
    strength: "擅长控制投入产出比，不容易冲动超预算。",
    caution: "可能因为过度关注成本而压缩体验上限。",
  },
  "更偏品质体验": {
    subtitle: "更在意质感、完整体验和长期使用满意度。",
    decision: "会愿意为更顺手、更高级、更完整的体验支付额外成本。",
    scene: "更常见于对生活完成度和使用感受有明确要求的阶段。",
    habit: "会优先看座舱体验、配置完成度和整体高级感。",
    strength: "能更准确识别哪些体验差异值得付费。",
    caution: "可能为体验溢价支付过多预算。",
  },
  "更偏舒适家庭": {
    subtitle: "更重视空间、舒适和家庭成员共同体验。",
    decision: "会优先考虑一台车能否稳定服务通勤、家用和多人出行。",
    scene: "更常见于需要兼顾家庭成员和日常通勤的用车场景。",
    habit: "会把乘坐感受、空间效率和使用便利性放在前面。",
    strength: "更能筛出真正适合长期家用的车型。",
    caution: "可能把驾控和个性表达压得过低。",
  },
  "更偏驾驶掌控": {
    subtitle: "更在意车辆反馈、操控感和驾驶参与度。",
    decision: "会优先判断这台车开起来是否足够顺手、够有掌控感。",
    scene: "更常见于把驾驶本身也当成使用体验一部分的场景。",
    habit: "会主动关注动力响应、底盘反馈和整体驾驶乐趣。",
    strength: "更能识别哪些车真正适合自己驾驶。",
    caution: "可能忽略家人乘坐舒适和空间容忍度。",
  },
  "更偏稳定保守": {
    subtitle: "更偏好成熟、稳定、可预期的方案。",
    decision: "会优先信任经过验证、长期风险更低的选择。",
    scene: "更常见于不希望把时间和精力耗在试错上的阶段。",
    habit: "会更看重可靠性、成熟方案和低维护压力。",
    strength: "不容易被短期趋势或噱头带偏判断。",
    caution: "可能对新技术和新品牌保持过度谨慎。",
  },
  "更偏尝鲜科技": {
    subtitle: "更愿意拥抱新技术和新的使用体验。",
    decision: "会主动关注一台车是否代表更新的技术方向和体验方式。",
    scene: "更常见于愿意尝试新技术、接受新使用习惯的阶段。",
    habit: "会优先关注智能能力、补能方式和科技完成度。",
    strength: "更容易抓住体验升级带来的真实变化。",
    caution: "可能低估新方案在稳定性上的不确定性。",
  },
};

type AssessmentDbClient = Pick<
  PrismaService,
  | "assessmentSession"
  | "assessmentAnswer"
  | "sessionTraitSnapshot"
  | "questionBranchRule"
  | "sessionQuestionCandidate"
  | "question"
  | "questionOption"
  | "personalityProfile"
  | "vehicle"
  | "sessionResult"
  | "sessionVehicleRecommendation"
>;

@Injectable()
export class AssessmentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly questionsService: QuestionsService,
  ) {}

  async createSession(payload?: CreateSessionDto): Promise<CreateSessionResponseDto> {
    const initialQuestion = await this.questionsService.getInitialQuestion();
    const mode = payload?.mode === "quick" ? "quick" : "standard";
    const targetQuestionCount = mode === "quick" ? 24 : 56;
    const session = await this.prisma.assessmentSession.create({
      data: {
        status: "IN_PROGRESS",
        stepIndex: 0,
        mode: mode === "quick" ? "QUICK" : "STANDARD",
        targetQuestionCount,
      },
      select: {
        id: true,
        status: true,
      },
    });

    await this.prisma.assessmentSession.update({
      where: {
        id: session.id,
      },
      data: {
        currentQuestionId: initialQuestion.id,
        currentBranchKey: initialQuestion.branchKey ?? null,
      },
    });

    return {
      sessionId: session.id,
      status: "in_progress",
      mode,
      targetQuestionCount,
      nextQuestion: initialQuestion,
    };
  }

  async submitAnswer(sessionId: string, payload: SubmitAnswerDto): Promise<SubmitAnswerResponseDto> {
    return this.withAssessmentTransaction(async (db) => {
      const session = await db.assessmentSession.findUnique({
        where: {
          id: sessionId,
        },
        select: {
          id: true,
          status: true,
          stepIndex: true,
          currentQuestionId: true,
          currentBranchKey: true,
          lifeQuestionCount: true,
          carQuestionCount: true,
          targetQuestionCount: true,
        },
      });

      if (!session) {
        throw new NotFoundException("Assessment session not found");
      }

      if (session.status !== "IN_PROGRESS") {
        throw new ConflictException("Assessment session is not accepting answers");
      }

      if (session.currentQuestionId !== payload.questionId) {
        throw new ConflictException("Only the current question can be answered");
      }

      const currentQuestion = await db.question.findUnique({
        where: {
          id: payload.questionId,
        },
        select: {
          id: true,
          type: true,
        },
      });

      if (!currentQuestion) {
        throw new NotFoundException("Current question not found");
      }

      const selectedOption = await db.questionOption.findUnique({
        where: {
          id: payload.optionId,
        },
        select: {
          id: true,
          questionId: true,
          effects: {
            select: {
              targetType: true,
              targetKey: true,
              weightDelta: true,
            },
          },
        },
      });

      if (!selectedOption || selectedOption.questionId !== payload.questionId) {
        throw new ConflictException("Selected option does not belong to the current question");
      }

      const nextStepIndex = session.stepIndex + 1;

      await db.assessmentAnswer.create({
        data: {
          sessionId,
          questionId: payload.questionId,
          optionId: payload.optionId,
          stepIndex: nextStepIndex,
        },
      });

      if (selectedOption.effects.length > 0) {
        await db.sessionTraitSnapshot.createMany({
          data: selectedOption.effects.map((effect) => ({
            sessionId,
            stepIndex: nextStepIndex,
            targetType: effect.targetType,
            traitKey: effect.targetKey,
            traitValue: Number(effect.weightDelta),
          })),
        });
      }

      const answeredQuestions = await db.assessmentAnswer.findMany({
        where: {
          sessionId,
        },
        select: {
          questionId: true,
        },
      });

      const traitSnapshots = await db.sessionTraitSnapshot.findMany({
        where: {
          sessionId,
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

      const aggregatedTraits = this.aggregateTraitSnapshots(traitSnapshots);

      const branchRules = await db.questionBranchRule.findMany({
        where: {
          sourceQuestionId: payload.questionId,
          OR: [{ sourceOptionId: payload.optionId }, { sourceOptionId: null }],
        },
        orderBy: [{ priority: "desc" }],
      });

      const nextBranchKey =
        branchRules.find((rule) =>
          this.matchesBranchRule(
            this.getTraitValue(aggregatedTraits, rule.traitKey ?? ""),
            rule.traitOperator,
            rule.traitThreshold ? Number(rule.traitThreshold) : null,
          ),
        )?.targetBranchKey ?? session.currentBranchKey;

      const nextQuestionResult = await this.questionsService.getNextQuestion({
        answeredQuestionIds: answeredQuestions.map((item) => item.questionId),
        currentBranchKey: nextBranchKey,
        lifeQuestionCount:
          session.lifeQuestionCount + (currentQuestion.type === "LIFE_STYLE" ? 1 : 0),
        carQuestionCount:
          session.carQuestionCount + (currentQuestion.type === "CAR_USAGE" ? 1 : 0),
      });

      if (nextQuestionResult.candidates.length > 0) {
        await db.sessionQuestionCandidate.createMany({
          data: nextQuestionResult.candidates.map((candidate: RankedQuestionCandidate) => ({
            sessionId,
            stepIndex: nextStepIndex,
            questionId: candidate.questionId,
            branchFit: candidate.branchFit,
            infoGain: candidate.infoGain,
            rankingScore: candidate.rankingScore,
            wasSelected: candidate.wasSelected,
          })),
        });
      }

      await db.assessmentSession.update({
        where: {
          id: sessionId,
        },
        data: {
          stepIndex: nextStepIndex,
          currentQuestionId: nextQuestionResult.nextQuestion?.id ?? null,
          currentBranchKey: nextQuestionResult.nextQuestion?.branchKey ?? nextBranchKey,
          ...(currentQuestion.type === "LIFE_STYLE"
            ? {
                lifeQuestionCount: {
                  increment: 1,
                },
              }
            : {
                carQuestionCount: {
                  increment: 1,
                },
          }),
        },
      });

      if (
        this.shouldAutoComplete(
          nextStepIndex,
          nextQuestionResult.nextQuestion,
          session.targetQuestionCount,
        )
      ) {
        const result = await this.completeSessionWithDb(db, sessionId);

        return {
          accepted: true,
          completed: true,
          lockedQuestionId: payload.questionId,
          nextQuestion: null,
          result,
        };
      }

      return {
        accepted: true,
        completed: false,
        lockedQuestionId: payload.questionId,
        nextQuestion: nextQuestionResult.nextQuestion,
      };
    });
  }

  async completeSession(sessionId: string): Promise<CompleteSessionResponseDto> {
    return this.completeSessionWithDb(this.prisma, sessionId);
  }

  private async completeSessionWithDb(
    db: AssessmentDbClient,
    sessionId: string,
  ): Promise<CompleteSessionResponseDto> {
    const session = await db.assessmentSession.findUnique({
      where: {
        id: sessionId,
      },
      select: {
        id: true,
        status: true,
      },
    });

    if (!session) {
      throw new NotFoundException("Assessment session not found");
    }

    const aggregatedTraits = await this.getAggregatedTraitsWithDb(db, sessionId);

    const profiles = await db.personalityProfile.findMany({
      include: {
        rules: true,
      },
    });
    const selectedProfile = this.selectPersonalityProfile(profiles, aggregatedTraits);

    if (!selectedProfile) {
      throw new NotFoundException("No personality profile is configured");
    }

    const vehicles = await db.vehicle.findMany({
      include: {
        traitWeights: true,
        constraintRules: true,
      },
      where: {
        status: "active",
      },
    });

    const filteredVehicles = vehicles.filter((vehicle) =>
      this.matchesVehicleConstraints(vehicle.constraintRules, aggregatedTraits),
    );
    const recommendationPool = filteredVehicles.length > 0 ? filteredVehicles : vehicles;

    const rankedRecommendations = recommendationPool
      .map((vehicle) => {
        const score = this.scoreVehicle(vehicle, aggregatedTraits);
        const reason = this.buildRecommendationReason(aggregatedTraits, vehicle);

        return {
          vehicleId: vehicle.id,
          slug: vehicle.slug,
          brand: vehicle.brand,
          series: vehicle.series,
          rank: 0,
          score,
          reason,
        };
      })
      .sort((left, right) => right.score - left.score)
      .map((vehicle, index) => ({
        ...vehicle,
        rank: index + 1,
      }))
      .slice(0, 3);

    const result = await db.sessionResult.create({
      data: {
        sessionId,
        personalityProfileId: selectedProfile.id,
        confidenceScore: 1,
        summary: selectedProfile.summary,
        explanation: selectedProfile.name,
      },
      select: {
        id: true,
        sessionId: true,
      },
    });

    if (rankedRecommendations.length > 0) {
      await db.sessionVehicleRecommendation.createMany({
        data: rankedRecommendations.map((vehicle) => ({
          resultId: result.id,
          vehicleId: vehicle.vehicleId,
          rank: vehicle.rank,
          score: vehicle.score,
          reason: vehicle.reason,
        })),
      });
    }

    await db.assessmentSession.update({
      where: {
        id: sessionId,
      },
      data: {
        status: "COMPLETED",
        currentQuestionId: null,
        completedAt: new Date(),
      },
    });

    return {
      sessionId: result.sessionId,
      personality: this.buildPersonalityPresentation(aggregatedTraits),
      recommendationEntry: {
        label: "查看适合你人格的车型方向",
        href: `/result/${result.sessionId}/recommendations`,
      },
      personalityProfile: {
        ...this.buildDisplayPersonalityProfile(aggregatedTraits),
        archetypeCode: selectedProfile.code,
      },
      recommendations: rankedRecommendations.map((vehicle) => ({
        slug: vehicle.slug,
        brand: vehicle.brand,
        series: vehicle.series,
        rank: vehicle.rank,
        score: vehicle.score,
        reason: vehicle.reason,
      })),
    };
  }

  private async withAssessmentTransaction<T>(operation: (db: AssessmentDbClient) => Promise<T>) {
    const prismaWithTransaction = this.prisma as AssessmentDbClient & {
      $transaction?: <R>(callback: (db: AssessmentDbClient) => Promise<R>) => Promise<R>;
    };

    if (typeof prismaWithTransaction.$transaction === "function") {
      return prismaWithTransaction.$transaction((db) => operation(db));
    }

    return operation(this.prisma);
  }

  async getCurrentSession(sessionId: string): Promise<{
    sessionId: string;
    status: "in_progress" | "completed";
    mode: "quick" | "standard";
    targetQuestionCount: number;
    stepIndex: number;
    nextQuestion: {
      id: string;
      slug: string;
      title: string;
      description: string | null;
      branchKey: string | null;
      type: string;
      options: Array<{
        id: string;
        label: string;
        order: number;
      }>;
    } | null;
  }> {
    const session = await this.prisma.assessmentSession.findUnique({
      where: {
        id: sessionId,
      },
      select: {
        id: true,
        status: true,
        mode: true,
        targetQuestionCount: true,
        stepIndex: true,
        currentQuestionId: true,
      },
    });

    if (!session) {
      throw new NotFoundException("Assessment session not found");
    }

    const currentQuestion = session.currentQuestionId
      ? await this.prisma.question.findUnique({
          where: {
            id: session.currentQuestionId,
          },
          select: {
            id: true,
            slug: true,
            title: true,
            description: true,
            branchKey: true,
            type: true,
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
        })
      : null;

    return {
      sessionId: session.id,
      status: session.status === "COMPLETED" ? "completed" : "in_progress",
      mode: session.mode === "QUICK" ? "quick" : "standard",
      targetQuestionCount:
        session.targetQuestionCount ?? (session.mode === "QUICK" ? 24 : 56),
      stepIndex: session.stepIndex,
      nextQuestion: currentQuestion,
    };
  }

  async getSessionResult(sessionId: string): Promise<CompleteSessionResponseDto> {
    const aggregatedTraits = await this.getAggregatedTraitsWithDb(this.prisma, sessionId);
    const session = await this.prisma.assessmentSession.findUnique({
      where: {
        id: sessionId,
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

    if (!session?.result) {
      throw new NotFoundException("Completed assessment result not found");
    }

    return {
      sessionId: session.result.sessionId,
      personality: this.buildPersonalityPresentation(aggregatedTraits),
      recommendationEntry: {
        label: "查看适合你人格的车型方向",
        href: `/result/${session.result.sessionId}/recommendations`,
      },
      personalityProfile: {
        ...this.buildDisplayPersonalityProfile(aggregatedTraits),
        archetypeCode: session.result.personalityProfile.code,
      },
      recommendations: session.result.recommendations.map((item) => ({
        slug: item.vehicle.slug,
        brand: item.vehicle.brand,
        series: item.vehicle.series,
        rank: item.rank,
        score: Number(item.score),
        reason: item.reason,
      })),
    };
  }

  private buildPersonalityPresentation(aggregatedTraits: AggregatedTraits) {
    const dimensionSnapshot = this.buildDimensionSnapshot(aggregatedTraits);
    const displayProfile = this.buildDisplayPersonalityProfile(aggregatedTraits);
    const strongestDimensions = [...dimensionSnapshot]
      .sort((left, right) => right.value - left.value)
      .slice(0, 2);
    const primary =
      PERSONALITY_DIRECTION_CONTENT[strongestDimensions[0]?.directionLabel] ?? null;
    const secondary =
      PERSONALITY_DIRECTION_CONTENT[strongestDimensions[1]?.directionLabel] ?? primary;
    const subtitleSegments = strongestDimensions
      .map((dimension) => dimension.directionLabel.replace(/^更偏/, ""))
      .filter(Boolean);

    return {
      code: displayProfile.code.toLowerCase(),
      name: displayProfile.name,
      subtitle:
        subtitleSegments.length >= 2
          ? `你当前更偏${subtitleSegments[0]}，同时也明显偏向${subtitleSegments[1]}。`
          : "你已经形成了相对稳定的汽车人格倾向。",
      summary: displayProfile.summary,
      decisionStyle: [primary?.decision, secondary?.decision].filter(Boolean).join(" "),
      lifeScenes: [primary?.scene, secondary?.scene].filter(Boolean),
      usageHabits: [primary?.habit, secondary?.habit].filter(Boolean),
      strengths: [primary?.strength, secondary?.strength].filter(Boolean),
      cautions: [primary?.caution, secondary?.caution].filter(Boolean),
      matchScore: this.calculateMatchScore(dimensionSnapshot),
      dimensionSnapshot,
      imageUrl: null,
    };
  }

  private shouldAutoComplete(
    nextStepIndex: number,
    nextQuestion: { id: string } | null,
    targetQuestionCount: number | null | undefined,
  ) {
    return nextStepIndex >= (targetQuestionCount ?? 10) || !nextQuestion;
  }

  private async getAggregatedTraits(sessionId: string) {
    return this.getAggregatedTraitsWithDb(this.prisma, sessionId);
  }

  private async getAggregatedTraitsWithDb(
    db: Pick<PrismaService, "sessionTraitSnapshot">,
    sessionId: string,
  ) {
    const traitSnapshots = await db.sessionTraitSnapshot.findMany({
      where: {
        sessionId,
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

    return this.aggregateTraitSnapshots(traitSnapshots);
  }

  private selectPersonalityProfile<
    T extends {
      id: string;
      code: string;
      name: string;
      summary: string;
      detail: string;
      rules: Array<{
        targetKey: string;
        traitOperator: "EQ" | "NEQ" | "GT" | "GTE" | "LT" | "LTE" | null;
        traitThreshold: number | { toString(): string } | null;
        weight: number | { toString(): string };
      }>;
    },
  >(profiles: T[], aggregatedTraits: AggregatedTraits) {
    if (profiles.length === 0) {
      return null;
    }

    const rankedProfiles = profiles
      .map((profile) => ({
        profile,
        score: profile.rules.reduce((total, rule) => {
          const traitValue = this.getTraitValue(aggregatedTraits, rule.targetKey);
          const matched = this.matchesBranchRule(
            traitValue,
            rule.traitOperator,
            rule.traitThreshold === null ? null : Number(rule.traitThreshold),
          );

          if (!matched) {
            return total;
          }

          return total + Number(rule.weight);
        }, 0),
      }))
      .sort((left, right) => right.score - left.score);

    return rankedProfiles[0]?.profile ?? profiles[0];
  }

  private buildRecommendationReason(
    aggregatedTraits: AggregatedTraits,
    vehicle: VehicleScoreSource,
  ) {
    const vector = this.buildUserPreferenceVector(aggregatedTraits);
    const vehicleScores = this.getVehicleCoreScores(vehicle);
    const topDimensions = this.getTopCorePreferenceDimensions(vector, 3);

    if (topDimensions.length === 0) {
      return "这台车和你的主要用车偏好整体比较接近。";
    }

    const labels = topDimensions.map(({ key }) => CORE_PREFERENCE_LABELS[key]);
    const matchedDimensions = topDimensions.filter(
      ({ key, value }) => vehicleScores[key] >= Math.max(60, value - 12),
    );
    const topAverage =
      topDimensions.reduce((total, { key }) => total + vehicleScores[key], 0) / topDimensions.length;

    if (matchedDimensions.length === 0 || topAverage < 55) {
      return `你当前更看重${labels.join("、")}，但这台车在这些维度上的匹配度偏低。`;
    }

    const matchedLabels = matchedDimensions.map(({ key }) => CORE_PREFERENCE_LABELS[key]);

    if (matchedDimensions.length === topDimensions.length) {
      return `你当前更看重${labels.join("、")}，这台车在这些核心维度上更贴合你的选择。`;
    }

    return `你当前更看重${labels.join("、")}，这台车在${matchedLabels.join("、")}上更贴合你的选择。`;
  }

  private matchesVehicleConstraints(
    constraintRules: Array<{
      targetType: TraitTargetType;
      targetKey: string;
      traitOperator: "EQ" | "NEQ" | "GT" | "GTE" | "LT" | "LTE";
      traitThreshold: number | { toString(): string };
    }>,
    aggregatedTraits: AggregatedTraits,
  ) {
    if (constraintRules.length === 0) {
      return true;
    }

    return constraintRules.every((rule) => {
      const traitValue = this.getTraitValue(aggregatedTraits, rule.targetKey, rule.targetType);

      return this.matchesBranchRule(
        traitValue,
        rule.traitOperator,
        Number(rule.traitThreshold),
      );
    });
  }

  private scoreVehicle(vehicle: VehicleScoreSource, aggregatedTraits: AggregatedTraits) {
    const preferenceAlignment = this.getAlignmentScore(
      aggregatedTraits,
      vehicle.traitWeights,
      "VEHICLE_PREFERENCE",
      3,
    );
    const personalityAlignment = this.getAlignmentScore(
      aggregatedTraits,
      vehicle.traitWeights,
      "PERSONALITY_TRAIT",
      2,
    );
    const constraintFit = this.getConstraintFitScore(vehicle.constraintRules, aggregatedTraits);
    const vectorFit = this.getCoreVectorFitScore(aggregatedTraits, vehicle);
    const energyFit = this.getEnergyAlignmentScore(aggregatedTraits, vehicle);
    const corePenalty = this.getCoreMismatchPenalty(aggregatedTraits, vehicle);

    return Math.max(
      0,
      Math.round(
        vectorFit * 0.62 +
          energyFit * 0.18 +
          constraintFit * 0.12 +
          preferenceAlignment * 0.05 +
          personalityAlignment * 0.03 -
          corePenalty,
      ),
    );
  }

  private getAlignmentScore(
    aggregatedTraits: AggregatedTraits,
    traitWeights: Array<{
      targetType: TraitTargetType;
      targetKey: string;
      weight: number | { toString(): string };
    }>,
    targetType: "VEHICLE_PREFERENCE" | "PERSONALITY_TRAIT",
    limit: number,
  ) {
    const prioritizedTraits = Object.entries(aggregatedTraits.byTargetType[targetType] ?? {})
      .filter(([, value]) => value > 0)
      .sort((left, right) => right[1] - left[1])
      .slice(0, limit);

    if (prioritizedTraits.length === 0) {
      return 60;
    }

    const totalImportance = prioritizedTraits.reduce((total, [, value]) => total + value * value, 0);

    if (totalImportance === 0) {
      return 60;
    }

    const matchedImportance = prioritizedTraits.reduce((total, [traitKey, value]) => {
      const matchedWeight = traitWeights.find(
        (weight) => weight.targetType === targetType && weight.targetKey === traitKey,
      );
      const normalizedWeight = Math.min(1, Number(matchedWeight?.weight ?? 0) / 10);

      return total + value * value * normalizedWeight;
    }, 0);

    return Math.round((matchedImportance / totalImportance) * 100);
  }

  private getConstraintFitScore(
    constraintRules: Array<{
      targetType: TraitTargetType;
      targetKey: string;
      traitOperator: "EQ" | "NEQ" | "GT" | "GTE" | "LT" | "LTE";
      traitThreshold: number | { toString(): string };
    }>,
    aggregatedTraits: AggregatedTraits,
  ) {
    if (constraintRules.length === 0) {
      return 100;
    }

    const matchedCount = constraintRules.reduce((count, rule) => {
      const traitValue = this.getTraitValue(aggregatedTraits, rule.targetKey, rule.targetType);
      const threshold = Number(rule.traitThreshold);

      if (this.matchesBranchRule(traitValue, rule.traitOperator, threshold)) {
        return count + 1;
      }

      return count;
    }, 0);

    return Math.round((matchedCount / constraintRules.length) * 100);
  }

  private getCoreVectorFitScore(aggregatedTraits: AggregatedTraits, vehicle: VehicleScoreSource) {
    const vector = this.buildUserPreferenceVector(aggregatedTraits);
    const vehicleScores = this.getVehicleCoreScores(vehicle);
    const weightedDimensions = this.getTopCorePreferenceDimensions(vector, 6);

    if (weightedDimensions.length === 0) {
      const allScores = Object.values(vehicleScores);
      return Math.round(allScores.reduce((total, value) => total + value, 0) / allScores.length);
    }

    const totalWeight = weightedDimensions.reduce((total, { value }) => total + value, 0);

    if (totalWeight <= 0) {
      return 60;
    }

    const totalScore = weightedDimensions.reduce(
      (total, { key, value }) => total + vehicleScores[key] * value,
      0,
    );

    return Math.round(totalScore / totalWeight);
  }

  private getCoreMismatchPenalty(aggregatedTraits: AggregatedTraits, vehicle: VehicleScoreSource) {
    const vector = this.buildUserPreferenceVector(aggregatedTraits);
    const vehicleScores = this.getVehicleCoreScores(vehicle);
    const strongestDimensions = this.getTopCorePreferenceDimensions(vector, 3);

    return strongestDimensions.reduce((penalty, { key, value }) => {
      if (value < 45) {
        return penalty;
      }

      const miss = Math.max(0, value - vehicleScores[key] - 8);

      if (miss <= 0) {
        return penalty;
      }

      return penalty + Math.min(14, miss * 0.18);
    }, 0);
  }

  private getEnergyAlignmentScore(aggregatedTraits: AggregatedTraits, vehicle: VehicleScoreSource) {
    const energyType = (vehicle.energyType ?? "").toUpperCase();
    const chargingAccess = this.getTraitValue(aggregatedTraits, "charging_access", "HARD_CONSTRAINT");
    const evAcceptance = this.getTraitValue(
      aggregatedTraits,
      "energy_acceptance_ev",
      "HARD_CONSTRAINT",
    );
    const phevAcceptance = this.getTraitValue(
      aggregatedTraits,
      "energy_acceptance_phev",
      "HARD_CONSTRAINT",
    );
    const iceAcceptance = this.getTraitValue(
      aggregatedTraits,
      "energy_acceptance_ice",
      "HARD_CONSTRAINT",
    );
    const longDistance = this.getTraitValue(
      aggregatedTraits,
      "long_distance_frequency",
      "HARD_CONSTRAINT",
    );
    const highwayUsage = this.getTraitValue(
      aggregatedTraits,
      "intercity_highway_usage",
      "HARD_CONSTRAINT",
    );
    const scale = (value: number, max: number) =>
      Math.max(0, Math.min(100, Math.round((value / max) * 100)));

    if (energyType === "EV") {
      return scale(evAcceptance * 16 + chargingAccess * 9 + this.getTraitValue(aggregatedTraits, "smart_features", "VEHICLE_PREFERENCE") * 2, 130);
    }

    if (energyType === "PHEV" || energyType === "EREV") {
      return scale(
        phevAcceptance * 15 +
          chargingAccess * 5 +
          longDistance * 4 +
          highwayUsage * 3,
        135,
      );
    }

    if (energyType === "HEV") {
      return scale(
        iceAcceptance * 10 +
          phevAcceptance * 4 +
          longDistance * 4 +
          highwayUsage * 4 +
          this.getTraitValue(aggregatedTraits, "running_cost", "VEHICLE_PREFERENCE") * 2,
        110,
      );
    }

    if (energyType === "ICE") {
      let score = scale(
        iceAcceptance * 16 + longDistance * 5 + highwayUsage * 4 + this.getTraitValue(aggregatedTraits, "simplicity_reliability", "VEHICLE_PREFERENCE") * 2,
        130,
      );

      if (chargingAccess >= 4 && evAcceptance >= 4 && iceAcceptance <= 2) {
        score = Math.max(0, score - 35);
      } else if (chargingAccess >= 3 && evAcceptance >= 4 && iceAcceptance <= 3) {
        score = Math.max(0, score - 20);
      }

      return score;
    }

    return 60;
  }

  private aggregateTraitSnapshots(
    traitSnapshots: Array<{
      targetType: TraitTargetType;
      traitKey: string;
      traitValue: number | { toString(): string };
    }>,
  ): AggregatedTraits {
    return traitSnapshots.reduce<AggregatedTraits>(
      (totals, snapshot) => {
        const numericValue = Number(snapshot.traitValue);
        totals.byKey[snapshot.traitKey] = (totals.byKey[snapshot.traitKey] ?? 0) + numericValue;
        const scopedTotals = totals.byTargetType[snapshot.targetType] ?? {};
        scopedTotals[snapshot.traitKey] = (scopedTotals[snapshot.traitKey] ?? 0) + numericValue;
        totals.byTargetType[snapshot.targetType] = scopedTotals;
        return totals;
      },
      {
        byKey: {},
        byTargetType: {},
      },
    );
  }

  private buildUserPreferenceVector(aggregatedTraits: AggregatedTraits): CorePreferenceVector {
    const getPreference = (key: string) =>
      this.getTraitValue(aggregatedTraits, key, "VEHICLE_PREFERENCE");
    const getPersonality = (key: string) =>
      this.getTraitValue(aggregatedTraits, key, "PERSONALITY_TRAIT");
    const getConstraint = (key: string) =>
      this.getTraitValue(aggregatedTraits, key, "HARD_CONSTRAINT");
    const scale = (value: number, max: number) => Math.max(0, Math.min(100, Math.round((value / max) * 100)));

    return {
      handling: scale(
        getPreference("driving_engagement") * 12 +
          getPersonality("control_preference") * 10 +
          getPersonality("expression_drive") * 4 +
          getConstraint("weekend_trip_frequency") * 2,
        140,
      ),
      comfort: scale(
        getPreference("comfort_space") * 12 +
          getPreference("daily_reliability") * 3 +
          getPersonality("stability_preference") * 6 +
          getConstraint("has_elder_passengers") * 5 +
          getConstraint("long_distance_frequency") * 4,
        140,
      ),
      space: scale(
        getPreference("family_fit") * 12 +
          getPreference("comfort_space") * 5 +
          getConstraint("family_size") * 7 +
          getConstraint("cargo_space_need") * 6 +
          getConstraint("full_load_frequency") * 5 +
          getConstraint("suburban_family_usage") * 4,
        180,
      ),
      smart: scale(
        getPreference("smart_features") * 14 +
          getPreference("brand_expression") * 2 +
          getPersonality("novelty_seeking") * 6 +
          getConstraint("charging_access") * 2,
        120,
      ),
      power: scale(
        getPreference("driving_engagement") * 11 +
          getPersonality("control_preference") * 8 +
          getPersonality("expression_drive") * 4 +
          getConstraint("budget_level") * 2,
        120,
      ),
      economy: scale(
        getPreference("running_cost") * 14 +
          getPreference("simplicity_reliability") * 4 +
          getPreference("daily_reliability") * 4 +
          getPersonality("cost_control") * 6 +
          getConstraint("monthly_payment_sensitivity") * 7,
        170,
      ),
      brand: scale(
        getPreference("brand_expression") * 14 +
          getPreference("design_presence") * 3 +
          getPersonality("expression_drive") * 5 +
          getPersonality("social_confidence") * 4 +
          getConstraint("budget_level") * 3,
        140,
      ),
      design: scale(
        getPreference("design_presence") * 15 +
          getPreference("brand_expression") * 4 +
          getPersonality("expression_drive") * 5 +
          getPersonality("novelty_seeking") * 5,
        150,
      ),
      reliability: scale(
        getPreference("daily_reliability") * 13 +
          getPreference("simplicity_reliability") * 8 +
          getPreference("running_cost") * 3 +
          getPersonality("stability_preference") * 5 +
          getPersonality("planning_bias") * 5 +
          getConstraint("ownership_horizon") * 4 +
          getConstraint("resale_sensitivity") * 3,
        190,
      ),
      family: scale(
        getPreference("family_fit") * 13 +
          getPreference("comfort_space") * 4 +
          getConstraint("family_size") * 8 +
          getConstraint("has_children") * 7 +
          getConstraint("has_elder_passengers") * 4 +
          getConstraint("suburban_family_usage") * 4 +
          getConstraint("full_load_frequency") * 4,
        190,
      ),
    };
  }

  private getTopCorePreferenceDimensions(vector: CorePreferenceVector, limit: number) {
    return (Object.entries(vector) as Array<[CorePreferenceKey, number]>)
      .filter(([, value]) => value > 0)
      .sort((left, right) => right[1] - left[1])
      .slice(0, limit)
      .map(([key, value]) => ({ key, value }));
  }

  private buildDimensionSnapshot(aggregatedTraits: AggregatedTraits): PersonalityDimension[] {
    const practicalScore =
      this.getTraitValue(aggregatedTraits, "stability_preference") +
      this.getTraitValue(aggregatedTraits, "planning_bias") +
      this.getTraitValue(aggregatedTraits, "cost_control");
    const expressiveScore =
      this.getTraitValue(aggregatedTraits, "expression_drive") +
      this.getTraitValue(aggregatedTraits, "social_confidence") +
      this.getTraitValue(aggregatedTraits, "novelty_seeking");
    const costScore =
      this.getTraitValue(aggregatedTraits, "running_cost", "VEHICLE_PREFERENCE") +
      this.getTraitValue(aggregatedTraits, "monthly_payment_sensitivity", "HARD_CONSTRAINT");
    const qualityScore =
      this.getTraitValue(aggregatedTraits, "smart_features", "VEHICLE_PREFERENCE") +
      this.getTraitValue(aggregatedTraits, "design_presence", "VEHICLE_PREFERENCE") +
      this.getTraitValue(aggregatedTraits, "brand_expression", "VEHICLE_PREFERENCE");
    const comfortScore =
      this.getTraitValue(aggregatedTraits, "family_fit", "VEHICLE_PREFERENCE") +
      this.getTraitValue(aggregatedTraits, "comfort_space", "VEHICLE_PREFERENCE") +
      this.getTraitValue(aggregatedTraits, "family_size", "HARD_CONSTRAINT");
    const drivingScore =
      this.getTraitValue(aggregatedTraits, "driving_engagement", "VEHICLE_PREFERENCE") +
      this.getTraitValue(aggregatedTraits, "control_preference") +
      this.getTraitValue(aggregatedTraits, "expression_drive");
    const steadyScore =
      this.getTraitValue(aggregatedTraits, "stability_preference") +
      this.getTraitValue(aggregatedTraits, "planning_bias") +
      this.getTraitValue(aggregatedTraits, "ownership_horizon", "HARD_CONSTRAINT");
    const techScore =
      this.getTraitValue(aggregatedTraits, "novelty_seeking") +
      this.getTraitValue(aggregatedTraits, "smart_features", "VEHICLE_PREFERENCE") +
      this.getTraitValue(aggregatedTraits, "charging_access", "HARD_CONSTRAINT");

    return [
      this.createDimension("practicality", "务实 vs 表达", practicalScore, expressiveScore, "更偏务实", "更偏表达"),
      this.createDimension("ownership", "成本 vs 品质", costScore, qualityScore, "更偏成本敏感", "更偏品质体验"),
      this.createDimension("comfort", "舒适 vs 驾控", comfortScore, drivingScore, "更偏舒适家庭", "更偏驾驶掌控"),
      this.createDimension("innovation", "稳定 vs 科技", steadyScore, techScore, "更偏稳定保守", "更偏尝鲜科技"),
    ];
  }

  private createDimension(
    key: string,
    label: string,
    leftScore: number,
    rightScore: number,
    leftLabel: string,
    rightLabel: string,
  ): PersonalityDimension {
    const total = leftScore + rightScore;
    if (total <= 0) {
      return {
        key,
        label,
        value: 50,
        directionLabel: leftLabel,
      };
    }

    const isLeftDominant = leftScore >= rightScore;
    const dominantScore = isLeftDominant ? leftScore : rightScore;

    return {
      key,
      label,
      value: Math.max(8, Math.min(100, Math.round((dominantScore / total) * 100))),
      directionLabel: isLeftDominant ? leftLabel : rightLabel,
    };
  }

  private calculateMatchScore(dimensionSnapshot: PersonalityDimension[]) {
    if (dimensionSnapshot.length === 0) {
      return 72;
    }

    const average = dimensionSnapshot.reduce((total, item) => total + item.value, 0) / dimensionSnapshot.length;
    return Math.max(60, Math.min(96, Math.round(average)));
  }

  private getVehicleCoreScores(vehicle: VehicleScoreSource): CorePreferenceVector {
    const explicitScores: CorePreferenceVector = {
      handling: vehicle.handlingScore ?? 0,
      comfort: vehicle.comfortScore ?? 0,
      space: vehicle.spaceScore ?? 0,
      smart: vehicle.smartScore ?? 0,
      power: vehicle.powerScore ?? 0,
      economy: vehicle.economyScore ?? 0,
      brand: vehicle.brandScore ?? 0,
      design: vehicle.designScore ?? 0,
      reliability: vehicle.reliabilityScore ?? 0,
      family: vehicle.familyScore ?? 0,
    };

    if (Object.values(explicitScores).some((score) => score > 0)) {
      return explicitScores;
    }

    return this.deriveVehicleCoreScoresFromTraits(vehicle.traitWeights);
  }

  private deriveVehicleCoreScoresFromTraits(
    traitWeights: Array<{
      targetType: TraitTargetType;
      targetKey: string;
      weight: number | { toString(): string };
    }>,
  ): CorePreferenceVector {
    const getWeight = (targetKey: string) =>
      Number(
        traitWeights.find(
          (weight) =>
            weight.targetType === "VEHICLE_PREFERENCE" && weight.targetKey === targetKey,
        )?.weight ?? 0,
      );
    const clamp = (value: number) => Math.max(0, Math.min(100, Math.round(value)));
    const driving = getWeight("driving_engagement");
    const comfort = getWeight("comfort_space");
    const family = getWeight("family_fit");
    const smart = getWeight("smart_features");
    const runningCost = getWeight("running_cost");
    const brand = getWeight("brand_expression");
    const design = getWeight("design_presence");
    const reliability = getWeight("daily_reliability");
    const simplicity = getWeight("simplicity_reliability");

    return {
      handling: clamp(20 + driving * 8),
      comfort: clamp(20 + comfort * 8),
      space: clamp(18 + comfort * 4 + family * 4),
      smart: clamp(18 + smart * 8),
      power: clamp(18 + driving * 7 + design * 2),
      economy: clamp(18 + runningCost * 7 + simplicity * 2),
      brand: clamp(18 + brand * 8),
      design: clamp(18 + design * 7 + brand * 2),
      reliability: clamp(18 + reliability * 7 + simplicity * 2),
      family: clamp(18 + family * 7 + comfort * 2),
    };
  }

  private buildDisplayPersonalityCode(aggregatedTraits: AggregatedTraits) {
    const practicalScore =
      this.getTraitValue(aggregatedTraits, "stability_preference") +
      this.getTraitValue(aggregatedTraits, "planning_bias") +
      this.getTraitValue(aggregatedTraits, "cost_control");
    const emotionalScore =
      this.getTraitValue(aggregatedTraits, "expression_drive") +
      this.getTraitValue(aggregatedTraits, "social_confidence") +
      this.getTraitValue(aggregatedTraits, "novelty_seeking");

    const savingScore =
      this.getTraitValue(aggregatedTraits, "running_cost", "VEHICLE_PREFERENCE") +
      this.getTraitValue(aggregatedTraits, "monthly_payment_sensitivity", "HARD_CONSTRAINT") +
      this.getTraitValue(aggregatedTraits, "daily_reliability", "VEHICLE_PREFERENCE");
    const qualityScore =
      this.getTraitValue(aggregatedTraits, "smart_features", "VEHICLE_PREFERENCE") +
      this.getTraitValue(aggregatedTraits, "daily_reliability", "VEHICLE_PREFERENCE") +
      this.getTraitValue(aggregatedTraits, "simplicity_reliability", "VEHICLE_PREFERENCE") +
      this.getTraitValue(aggregatedTraits, "design_presence", "VEHICLE_PREFERENCE");

    const comfortScore =
      this.getTraitValue(aggregatedTraits, "family_fit", "VEHICLE_PREFERENCE") +
      this.getTraitValue(aggregatedTraits, "comfort_space", "VEHICLE_PREFERENCE") +
      this.getTraitValue(aggregatedTraits, "cargo_space_need", "HARD_CONSTRAINT");
    const drivingScore =
      this.getTraitValue(aggregatedTraits, "driving_engagement", "VEHICLE_PREFERENCE") +
      this.getTraitValue(aggregatedTraits, "control_preference") +
      this.getTraitValue(aggregatedTraits, "expression_drive");

    const valueScore =
      this.getTraitValue(aggregatedTraits, "running_cost", "VEHICLE_PREFERENCE") +
      this.getTraitValue(aggregatedTraits, "daily_reliability", "VEHICLE_PREFERENCE") +
      this.getTraitValue(aggregatedTraits, "monthly_payment_sensitivity", "HARD_CONSTRAINT");
    const brandScore =
      this.getTraitValue(aggregatedTraits, "brand_expression", "VEHICLE_PREFERENCE") +
      this.getTraitValue(aggregatedTraits, "design_presence", "VEHICLE_PREFERENCE");
      
    const letter1 = practicalScore >= emotionalScore ? "P" : "E";
    const letter2 = savingScore >= qualityScore ? "S" : "Q";
    const letter3 = comfortScore >= drivingScore ? "C" : "D";
    const letter4 = brandScore > valueScore ? "B" : "V";

    return `${letter1}${letter2}${letter3}${letter4}`;
  }

  private buildDisplayPersonalityProfile(aggregatedTraits: AggregatedTraits) {
    const code = this.buildDisplayPersonalityCode(aggregatedTraits);
    const profile = DISPLAY_PERSONALITY_PROFILES[code] ?? {
      name: "购车人格",
      summary: "你的购车选择有稳定偏好，建议结合预算、场景和体验重点继续细看车型。",
    };

    return {
      code,
      name: profile.name,
      summary: profile.summary,
    };
  }

  private getTraitValue(
    aggregatedTraits: AggregatedTraits,
    traitKey: string,
    targetType?: TraitTargetType,
  ) {
    if (targetType) {
      return aggregatedTraits.byTargetType[targetType]?.[traitKey] ?? 0;
    }

    return aggregatedTraits.byKey[traitKey] ?? 0;
  }

  private matchesBranchRule(
    traitValue: number,
    operator: "EQ" | "NEQ" | "GT" | "GTE" | "LT" | "LTE" | null,
    threshold: number | null,
  ) {
    if (!operator || threshold === null) {
      return true;
    }

    switch (operator) {
      case "EQ":
        return traitValue === threshold;
      case "NEQ":
        return traitValue !== threshold;
      case "GT":
        return traitValue > threshold;
      case "GTE":
        return traitValue >= threshold;
      case "LT":
        return traitValue < threshold;
      case "LTE":
        return traitValue <= threshold;
      default:
        return false;
    }
  }
}
