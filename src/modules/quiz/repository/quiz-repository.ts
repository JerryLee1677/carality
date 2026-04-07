import { prisma } from "@/lib/prisma";
import { buildPersonalityCode } from "@/modules/quiz/domain/build-personality-code";
import { createQuizSession } from "@/modules/quiz/domain/create-quiz-session";
import { scoreAnswers } from "@/modules/quiz/domain/score-answer";
import type { DimensionScores } from "@/modules/quiz/domain/types";

export const quizRepository = {
  createSession() {
    return prisma.quizSession.create({
      data: createQuizSession(),
    });
  },

  saveAnswer(sessionId: string, questionId: string, optionId: string) {
    return prisma.quizAnswer.create({
      data: {
        sessionId,
        questionId,
        optionId,
      },
    });
  },

  async completeSession(sessionId: string) {
    const answers = await prisma.quizAnswer.findMany({
      where: { sessionId },
      orderBy: { createdAt: "asc" },
    });

    const optionIds = answers.map((answer) => answer.optionId);
    const options = await prisma.quizOption.findMany({
      where: {
        id: {
          in: optionIds,
        },
      },
    });

    const scores = scoreAnswers(
      options.map((option) => ({
        weights: option.weights as Partial<DimensionScores>,
      })),
    );
    const personalityCode = buildPersonalityCode(scores);

    await prisma.quizSession.update({
      where: { id: sessionId },
      data: {
        status: "completed",
        currentQuestion: answers.length,
        personalityCode,
        completedAt: new Date(),
      },
    });

    return prisma.personalityResult.upsert({
      where: { sessionId },
      update: {
        personalityCode,
        practicalScore: scores.practical,
        emotionalScore: scores.emotional,
        savingScore: scores.saving,
        qualityScore: scores.quality,
        comfortScore: scores.comfort,
        drivingScore: scores.driving,
        brandScore: scores.brand,
        valueScore: scores.value,
      },
      create: {
        sessionId,
        personalityCode,
        practicalScore: scores.practical,
        emotionalScore: scores.emotional,
        savingScore: scores.saving,
        qualityScore: scores.quality,
        comfortScore: scores.comfort,
        drivingScore: scores.driving,
        brandScore: scores.brand,
        valueScore: scores.value,
      },
    });
  },
};
