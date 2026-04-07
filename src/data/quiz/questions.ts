export type QuizQuestionSeed = {
  slug: string;
  title: string;
  description?: string;
  order: number;
  options: Array<{
    label: string;
    order: number;
    weights: Partial<Record<DimensionSeedKey, number>>;
  }>;
};

export type DimensionSeedKey =
  | "practical"
  | "emotional"
  | "saving"
  | "quality"
  | "comfort"
  | "driving"
  | "brand"
  | "value";

export const questions: QuizQuestionSeed[] = [
  {
    slug: "budget-priority",
    title: "买车时你最不能妥协的因素是什么？",
    description: "选最接近你第一反应的一项",
    order: 1,
    options: [
      { label: "后续养车成本低", order: 1, weights: { practical: 2, saving: 3, value: 1 } },
      { label: "看起来更有质感和档次", order: 2, weights: { emotional: 1, quality: 3, brand: 2 } },
      { label: "坐着舒服，全家都满意", order: 3, weights: { practical: 1, comfort: 3, value: 1 } },
    ],
  },
  {
    slug: "brand-vs-value",
    title: "预算有限时，你更愿意怎么取舍？",
    description: "品牌感和实惠感只能先保一个",
    order: 2,
    options: [
      { label: "接受品牌下调，但配置要划算", order: 1, weights: { saving: 2, value: 3 } },
      { label: "配置少一点也要选更认可的品牌", order: 2, weights: { quality: 1, brand: 3 } },
    ],
  },
  {
    slug: "comfort-vs-driving",
    title: "长时间开车时，你更在意哪种体验？",
    description: "只选更重要的一项",
    order: 3,
    options: [
      { label: "座椅舒适、隔音好、家人不累", order: 1, weights: { comfort: 3, practical: 1 } },
      { label: "方向精准、开起来更有乐趣", order: 2, weights: { emotional: 1, driving: 3 } },
    ],
  },
  {
    slug: "family-scene",
    title: "如果周末经常带家人出行，你最希望车子做到什么？",
    description: "更贴近真实使用场景",
    order: 4,
    options: [
      { label: "后排空间大，装人装物都轻松", order: 1, weights: { practical: 2, comfort: 2, value: 1 } },
      { label: "外观有面子，开出去自己喜欢", order: 2, weights: { emotional: 2, brand: 2 } },
      { label: "油耗别高，用车压力小", order: 3, weights: { saving: 3, practical: 1 } },
    ],
  },
  {
    slug: "new-energy-motive",
    title: "你考虑新能源的主要原因是什么？",
    description: "如果完全不考虑，就选最接近的原因",
    order: 5,
    options: [
      { label: "省油省钱，日常通勤更划算", order: 1, weights: { saving: 3, value: 2 } },
      { label: "科技感更强，体验更新鲜", order: 2, weights: { emotional: 2, quality: 1, brand: 1 } },
      { label: "起步快，驾驶感更直接", order: 3, weights: { emotional: 1, driving: 3 } },
    ],
  },
  {
    slug: "appearance-choice",
    title: "两台车都够用时，你更容易被什么打动？",
    description: "只选更接近自己的那项",
    order: 6,
    options: [
      { label: "设计、颜色、内饰让我更想拥有", order: 1, weights: { emotional: 3, quality: 1 } },
      { label: "配置表和价格看起来更值", order: 2, weights: { practical: 1, saving: 2, value: 3 } },
    ],
  },
  {
    slug: "daily-commute",
    title: "你的典型用车场景更接近哪一种？",
    description: "选择使用频率最高的场景",
    order: 7,
    options: [
      { label: "每天城市通勤，堵车比较多", order: 1, weights: { practical: 2, saving: 2, comfort: 1 } },
      { label: "通勤之外，也想偶尔开得更爽", order: 2, weights: { emotional: 1, driving: 3 } },
      { label: "经常接送家人，稳定省心最重要", order: 3, weights: { practical: 3, comfort: 2 } },
    ],
  },
  {
    slug: "trim-choice",
    title: "同一车型的低配和高配，你通常会怎么选？",
    description: "更符合你购买习惯的答案",
    order: 8,
    options: [
      { label: "够用就行，把预算省下来", order: 1, weights: { saving: 3, practical: 1, value: 1 } },
      { label: "更愿意上高配，体验差异值得", order: 2, weights: { quality: 3, emotional: 1 } },
    ],
  },
  {
    slug: "brand-confidence",
    title: "你对品牌的态度更接近哪一种？",
    description: "选更像你做决定时的想法",
    order: 9,
    options: [
      { label: "品牌可靠会让我更放心", order: 1, weights: { brand: 3, quality: 1 } },
      { label: "品牌不是重点，好用划算才重要", order: 2, weights: { practical: 1, value: 3 } },
    ],
  },
  {
    slug: "ride-feel",
    title: "试驾时哪个细节最容易影响你的判断？",
    description: "选择最能决定你是否下单的因素",
    order: 10,
    options: [
      { label: "底盘稳不稳、坐着舒服不舒服", order: 1, weights: { comfort: 3, quality: 1 } },
      { label: "加速和转向是不是足够有感觉", order: 2, weights: { driving: 3, emotional: 1 } },
    ],
  },
  {
    slug: "ownership-view",
    title: "你更认同哪种购车观念？",
    description: "选你平时最常说的一句",
    order: 11,
    options: [
      { label: "车就是工具，稳定好开最重要", order: 1, weights: { practical: 3, saving: 1 } },
      { label: "车也代表品味和生活状态", order: 2, weights: { emotional: 2, brand: 2, quality: 1 } },
    ],
  },
  {
    slug: "final-tradeoff",
    title: "如果只能选一个方向，你最终会更偏向哪边？",
    description: "作为最后一道取舍题",
    order: 12,
    options: [
      { label: "低成本、少后悔、长期省心", order: 1, weights: { practical: 2, saving: 2, comfort: 1, value: 2 } },
      { label: "更喜欢、更高级、开着更带劲", order: 2, weights: { emotional: 2, quality: 2, driving: 1, brand: 2 } },
    ],
  },
];
