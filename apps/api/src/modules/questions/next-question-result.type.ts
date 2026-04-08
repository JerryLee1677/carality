import type { QuestionSummary } from "./question-summary.type";

export type RankedQuestionCandidate = {
  questionId: string;
  branchFit: number;
  infoGain: number;
  rankingScore: number;
  wasSelected: boolean;
};

export type NextQuestionResult = {
  nextQuestion: QuestionSummary | null;
  candidates: RankedQuestionCandidate[];
};
