export const personalityProfiles = [
  {
    code: "STEADY_PRAGMATIST",
    name: "稳健务实型",
    summary: "做决定偏稳，重视长期成本、确定性和日常便利。",
    detail:
      "这类用户通常不追求夸张表达，更重视可预期的长期体验，适合优先推荐稳定、舒适、维护成本可控的车型。",
    rules: [
      {
        targetKey: "stability_preference",
        traitOperator: "GTE",
        traitThreshold: 2,
        weight: 5,
      },
      {
        targetKey: "family_fit",
        traitOperator: "GTE",
        traitThreshold: 3,
        weight: 4,
      },
      {
        targetKey: "running_cost",
        traitOperator: "GTE",
        traitThreshold: 2,
        weight: 3,
      },
    ],
  },
  {
    code: "EXPRESSIVE_EXPLORER",
    name: "表达探索型",
    summary: "重视新鲜感、表达欲和技术体验。",
    detail:
      "这类用户在生活中更愿意主动尝试新事物，对品牌表达、智能体验和驾驶情绪价值更敏感。",
    rules: [
      {
        targetKey: "novelty_seeking",
        traitOperator: "GTE",
        traitThreshold: 2,
        weight: 5,
      },
      {
        targetKey: "expression_drive",
        traitOperator: "GTE",
        traitThreshold: 2,
        weight: 4,
      },
      {
        targetKey: "smart_features",
        traitOperator: "GTE",
        traitThreshold: 2,
        weight: 3,
      },
    ],
  },
] as const;
