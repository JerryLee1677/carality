import type { QuestionSummary } from "../../questions/question-summary.type";

export type CreateSessionResponseDto = {
  sessionId: string;
  status: "draft" | "in_progress";
  mode: "quick" | "standard";
  targetQuestionCount: number;
  nextQuestion: QuestionSummary;
};
