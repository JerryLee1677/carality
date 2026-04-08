import type { CompleteSessionResponseDto } from "./complete-session-response.dto";
import type { QuestionSummary } from "../../questions/question-summary.type";

export type SubmitAnswerResponseDto = {
  accepted: boolean;
  lockedQuestionId: string;
  nextQuestion: QuestionSummary | null;
  completed?: boolean;
  result?: CompleteSessionResponseDto;
};
