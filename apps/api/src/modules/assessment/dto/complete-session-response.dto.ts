export type CompleteSessionResponseDto = {
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
