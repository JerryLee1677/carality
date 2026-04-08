export type NextQuestionInput = {
  answeredQuestionIds: string[];
  currentBranchKey: string | null;
  lifeQuestionCount: number;
  carQuestionCount: number;
};
