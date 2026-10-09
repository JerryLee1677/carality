type PersonalityRule = {
  targetKey: string;
  traitOperator: "GTE";
  traitThreshold: number;
  weight: number;
};

const personalityContent = {
  PSCV: {
    word: "Guardian",
    name: "务实省心型",
    epithet: "守序顾家者",
    summary: "你买车时优先考虑省钱、舒适、耐用和值得买，核心诉求是稳定满足通勤和家庭需要。",
  },
  PSCB: {
    word: "Steward",
    name: "体面务实型",
    epithet: "稳妥掌舵者",
    summary: "你希望一台车既省心舒适，也有成熟品牌带来的体面感和安心感。",
  },
  PSDV: {
    word: "Driver",
    name: "理性驾趣型",
    epithet: "克制驾驶者",
    summary: "你在意驾驶乐趣和车辆反应，但前提仍是成本可控、选择划算，不会为情绪感完全失去理性。",
  },
  PSDB: {
    word: "Commander",
    name: "克制性能型",
    epithet: "分寸掌控者",
    summary: "你想要驾控和品牌带来的满足感，但依然会把理性和实际价值放在前面。",
  },
  PQCV: {
    word: "Keeper",
    name: "品质实用型",
    epithet: "品质守护者",
    summary: "你愿意为更完整的品质体验付费，但核心仍是舒适、稳定和长期使用价值。",
  },
  PQCB: {
    word: "Curator",
    name: "成熟品质型",
    epithet: "品位经营者",
    summary: "你看重舒适、质感和品牌成熟度，希望整台车在体验和体面感上都比较均衡。",
  },
  PQDV: {
    word: "Performer",
    name: "精致驾控型",
    epithet: "质感驾驭者",
    summary: "你追求更完整的驾驶质感和配置体验，同时仍会认真衡量一台车是否值得入手。",
  },
  PQDB: {
    word: "Signature",
    name: "格调性能型",
    epithet: "格调表达者",
    summary: "你偏爱更高级的驾控体验和品牌质感，买车时很看重整体格调和完成度。",
  },
  ESCV: {
    word: "Companion",
    name: "感受家用型",
    epithet: "温和陪伴者",
    summary: "你容易被顺手、舒服和整体感受打动，但最终仍偏向舒适、省心和高性价比。",
  },
  ESCB: {
    word: "Charmer",
    name: "感性体面型",
    epithet: "氛围魅力者",
    summary: "你喜欢顺眼、舒服、有面子的车，不一定追求极致参数，但很重视感受是否到位。",
  },
  ESDV: {
    word: "Explorer",
    name: "玩乐超值型",
    epithet: "乐趣探索者",
    summary: "你重视驾驶乐趣和新鲜感，但不想为品牌溢价多花钱，更希望把钱花在体验本身上。",
  },
  ESDB: {
    word: "Maverick",
    name: "外放驾趣型",
    epithet: "个性冒险者",
    summary: "你希望车有个性、有乐趣、有存在感，最好还能兼顾足够鲜明的品牌表达。",
  },
  EQCV: {
    word: "Planner",
    name: "高配舒享型",
    epithet: "舒享规划者",
    summary: "你更在意座舱体验、配置完整度和舒适感，偏好长期使用中持续让人满意的车。",
  },
  EQCB: {
    word: "Executive",
    name: "豪华舒享型",
    epithet: "从容主理者",
    summary: "你注重品牌、品质、舒适和体面，买车时会优先考虑整体体验是否足够高级。",
  },
  EQDV: {
    word: "Visionary",
    name: "科技驾趣型",
    epithet: "先锋驾控者",
    summary: "你看重科技、性能和品质完成度，希望一台车本身就能持续提供兴奋感和新鲜感。",
  },
  EQDB: {
    word: "Iconic",
    name: "旗舰表达型",
    epithet: "旗舰风格者",
    summary: "你追求品牌、科技、驾控和辨识度，买车同时也在买表达和气场。",
  },
} as const;

const ruleByKey: Record<string, PersonalityRule> = {
  stability_preference: {
    targetKey: "stability_preference",
    traitOperator: "GTE",
    traitThreshold: 2,
    weight: 5,
  },
  novelty_seeking: {
    targetKey: "novelty_seeking",
    traitOperator: "GTE",
    traitThreshold: 2,
    weight: 5,
  },
  running_cost: {
    targetKey: "running_cost",
    traitOperator: "GTE",
    traitThreshold: 2,
    weight: 4,
  },
  smart_features: {
    targetKey: "smart_features",
    traitOperator: "GTE",
    traitThreshold: 2,
    weight: 4,
  },
  family_fit: {
    targetKey: "family_fit",
    traitOperator: "GTE",
    traitThreshold: 2,
    weight: 4,
  },
  driving_engagement: {
    targetKey: "driving_engagement",
    traitOperator: "GTE",
    traitThreshold: 2,
    weight: 4,
  },
  brand_expression: {
    targetKey: "brand_expression",
    traitOperator: "GTE",
    traitThreshold: 2,
    weight: 4,
  },
  daily_reliability: {
    targetKey: "daily_reliability",
    traitOperator: "GTE",
    traitThreshold: 2,
    weight: 4,
  },
};

function buildRules(code: string): PersonalityRule[] {
  const [practicality, quality, comfort, brandValue] = code.split("");
  const selectedKeys = [
    practicality === "P" ? "stability_preference" : "novelty_seeking",
    quality === "S" ? "running_cost" : "smart_features",
    comfort === "C" ? "family_fit" : "driving_engagement",
    brandValue === "B" ? "brand_expression" : "daily_reliability",
  ];

  return selectedKeys.map((key) => ruleByKey[key]);
}

export const personalityProfiles = Object.entries(personalityContent).map(([code, content]) => ({
  code,
  name: content.name,
  summary: content.summary,
  detail: `${content.epithet}画像：${content.summary}`,
  rules: buildRules(code),
}));
