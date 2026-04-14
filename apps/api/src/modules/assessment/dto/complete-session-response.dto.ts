export type CompleteSessionResponseDto = {
  sessionId: string;
  personality: {
    code: string;
    name: string;
    subtitle: string;
    summary: string;
    decisionStyle: string;
    lifeScenes: string[];
    usageHabits: string[];
    strengths: string[];
    cautions: string[];
    matchScore: number;
    dimensionSnapshot: Array<{
      key: string;
      label: string;
      value: number;
      directionLabel: string;
    }>;
    imageUrl: string | null;
  };
  recommendationEntry: {
    label: string;
    href: string;
  } | null;
  personalityProfile: {
    code: string;
    archetypeCode: string;
    name: string;
    summary: string;
  } | null;
  recommendations: Array<{
    slug: string;
    brand: string;
    series: string;
    rank: number;
    score: number;
    reason: string;
  }>;
};
