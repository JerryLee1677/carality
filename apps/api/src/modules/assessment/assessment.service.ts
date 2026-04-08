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
        const score = this.scoreVehicle(
          vehicle.traitWeights,
          aggregatedTraits,
          vehicle.constraintRules,
        );
        const reason = this.buildRecommendationReason(aggregatedTraits, vehicle.traitWeights);

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
      personalityProfile: {
        code: this.buildDisplayPersonalityCode(aggregatedTraits),
        archetypeCode: selectedProfile.code,
        name: selectedProfile.name,
        summary: selectedProfile.summary,
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
      personalityProfile: {
        code: this.buildDisplayPersonalityCode(aggregatedTraits),
        archetypeCode: session.result.personalityProfile.code,
        name: session.result.personalityProfile.name,
        summary: session.result.personalityProfile.summary,
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
    traitWeights: Array<{
      targetType: TraitTargetType;
      targetKey: string;
      weight: number | { toString(): string };
    }>,
  ) {
    const traitLabels: Record<string, string> = {
      family_fit: "家庭适配",
      stability_preference: "稳定性",
      running_cost: "长期使用成本",
      smart_features: "智能体验",
      driving_engagement: "驾驶乐趣",
      novelty_seeking: "新鲜感",
      expression_drive: "表达欲",
    };

    const topTraits = (Object.entries(aggregatedTraits.byTargetType) as Array<
      [TraitTargetType, Record<string, number>]
    >)
      .filter(([targetType]) =>
        targetType === "PERSONALITY_TRAIT" || targetType === "VEHICLE_PREFERENCE",
      )
      .flatMap(([targetType, traits]) =>
        Object.entries(traits).map(([key, value]) => ({
          targetType,
          key,
          label: traitLabels[key] ?? key,
          value,
        })),
      )
      .filter((trait) => trait.value > 0)
      .sort((left, right) => right.value - left.value)
      .slice(0, 3);

    const matchedTraits = topTraits.filter((trait) =>
      traitWeights.some(
        (weight) =>
          weight.targetType === trait.targetType &&
          weight.targetKey === trait.key &&
          Number(weight.weight) > 0,
      ),
    );
    const labels = topTraits.map((trait) => trait.label);

    if (this.getCorePreferencePenalty(aggregatedTraits, traitWeights) > 0) {
      return `你当前更看重${labels.join("、")}，但这台车与这些优先项的重合度较低。`;
    }

    if (matchedTraits.length > 0) {
      return `你当前更看重${labels.join("、")}，这台车在这些维度上最贴合你的选择。`;
    }

    return `你当前更看重${labels.join("、")}，但这台车与这些优先项的重合度较低。`;
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

  private scoreVehicle(
    traitWeights: Array<{
      targetType: TraitTargetType;
      targetKey: string;
      weight: number | { toString(): string };
    }>,
    aggregatedTraits: AggregatedTraits,
    constraintRules: Array<{
      targetType: TraitTargetType;
      targetKey: string;
      traitOperator: "EQ" | "NEQ" | "GT" | "GTE" | "LT" | "LTE";
      traitThreshold: number | { toString(): string };
    }> = [],
  ) {
    const baseScore = traitWeights.reduce((total, weight) => {
      const traitValue = this.getTraitValue(aggregatedTraits, weight.targetKey, weight.targetType);
      return total + traitValue * Number(weight.weight);
    }, 0);

    return Math.max(
      0,
      baseScore -
        this.getCorePreferencePenalty(aggregatedTraits, traitWeights) -
        this.getConstraintPenalty(constraintRules, aggregatedTraits),
    );
  }

  private getConstraintPenalty(
    constraintRules: Array<{
      targetType: TraitTargetType;
      targetKey: string;
      traitOperator: "EQ" | "NEQ" | "GT" | "GTE" | "LT" | "LTE";
      traitThreshold: number | { toString(): string };
    }>,
    aggregatedTraits: AggregatedTraits,
  ) {
    if (constraintRules.length === 0) {
      return 0;
    }

    return constraintRules.reduce((penalty, rule) => {
      const traitValue = this.getTraitValue(aggregatedTraits, rule.targetKey, rule.targetType);
      const threshold = Number(rule.traitThreshold);

      if (this.matchesBranchRule(traitValue, rule.traitOperator, threshold)) {
        return penalty;
      }

      const distance = Math.abs(traitValue - threshold);
      return penalty + 60 + distance * 12;
    }, 0);
  }

  private getCorePreferencePenalty(
    aggregatedTraits: AggregatedTraits,
    traitWeights: Array<{
      targetType: TraitTargetType;
      targetKey: string;
      weight: number | { toString(): string };
    }>,
  ) {
    const strongestPreferences = Object.entries(
      aggregatedTraits.byTargetType.VEHICLE_PREFERENCE ?? {},
    )
      .filter(([, value]) => value >= 4)
      .sort((left, right) => right[1] - left[1])
      .slice(0, 2);

    if (strongestPreferences.length < 2) {
      return 0;
    }

    return strongestPreferences.reduce((penalty, [traitKey, traitValue]) => {
      const matchedWeight = traitWeights.find(
        (weight) => weight.targetType === "VEHICLE_PREFERENCE" && weight.targetKey === traitKey,
      );

      if (matchedWeight && Number(matchedWeight.weight) >= 6) {
        return penalty;
      }

      return penalty + traitValue * 8;
    }, 0);
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
