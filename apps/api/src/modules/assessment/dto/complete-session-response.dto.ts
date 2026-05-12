export type CompleteSessionResponseDto = {
  sessionId: string;
  personality: {
    code: string;
    word: string;
    name: string;
    epithet: string;
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
    word: string;
    name: string;
    epithet: string;
    summary: string;
  } | null;
  recommendations: Array<{
    slug: string;
    brand: string;
    series: string;
    rank: number;
    score: number;
    reason: string;
    diagnostics: {
      userPreferenceVector: Array<{
        key: string;
        label: string;
        value: number;
      }>;
      vehicleScores: Array<{
        key: string;
        label: string;
        value: number;
      }>;
      scoreBreakdown: {
        vectorFit: number;
        energyFit: number;
        constraintFit: number;
        preferenceAlignment: number;
        personalityAlignment: number;
        corePenalty: number;
      };
    };
  }>;
};
