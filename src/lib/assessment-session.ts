export type AssessmentQuestionOption = {
  id: string;
  label: string;
  order: number;
};

export type AssessmentQuestion = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  branchKey: string | null;
  type: string;
  options: AssessmentQuestionOption[];
};

export type AssessmentSessionSnapshot = {
  sessionId: string;
  status: string;
  mode: "quick" | "standard";
  targetQuestionCount: number;
  stepIndex: number;
  nextQuestion: AssessmentQuestion | null;
};

export type AssessmentResult = {
  sessionId: string;
  personalityProfile: {
    code: string;
    archetypeCode: string;
    name: string;
    summary: string;
  };
  recommendations: Array<{
    slug: string;
    brand: string;
    series: string;
    rank: number;
    score: number;
    reason: string;
  }>;
};

export function getAssessmentSessionStorageKey(sessionId: string) {
  return `assessment-session:${sessionId}`;
}
