import type { UserConditions } from "./user-conditions";
import type { SelectionAnswer } from "./question-selection-metadata";

export type NextQuestionInput = {
  answeredQuestionIds: string[];
  currentBranchKey: string | null;
  lifeQuestionCount: number;
  carQuestionCount: number;
  coveredTraitKeys: string[];
  userConditions?: UserConditions;
  answerHistory?: SelectionAnswer[];
  selectionSeed?: string;
  targetQuestionCount?: number;
};
