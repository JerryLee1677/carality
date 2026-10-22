import { questionBankExtension } from "../../src/modules/questions/question-bank-extension";

type EffectTargetType =
  | "HARD_CONSTRAINT"
  | "PERSONALITY_TRAIT"
  | "VEHICLE_PREFERENCE"
  | "BRANCH_SIGNAL";

type QuestionType = "LIFE_STYLE" | "CAR_USAGE";

type OptionEffect = {
  targetType: EffectTargetType;
  targetKey: string;
  weightDelta: number;
};

export type QuestionSeed = {
  slug: string;
  title: string;
  description: string | null;
  type: QuestionType;
  branchKey: string | null;
  isAnchor: boolean;
  priority: number;
  discrimination: number;
  status: "ACTIVE";
  options: Array<{ label: string; order: number; effects: OptionEffect[] }>;
  branchRules?: Array<{
    sourceOptionOrder: 1 | 2 | 3 | 4 | 5;
    targetBranchKey: string;
    priority: number;
  }>;
};

const SCALE_LABELS: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: "强烈不认同",
  2: "比较不认同",
  3: "中立",
  4: "比较认同",
  5: "强烈认同",
};

const SCALE_MULTIPLIERS: Record<1 | 2 | 3 | 4 | 5, number> = {
  1: 1,
  2: 0.5,
  3: 0,
  4: 0.5,
  5: 1,
};

function scaleEffects(effects: OptionEffect[], multiplier: number) {
  if (multiplier === 0) {
    return [] as OptionEffect[];
  }

  return effects.map((effect) => ({
    ...effect,
    weightDelta: Number((effect.weightDelta * multiplier).toFixed(2)),
  }));
}

function option(label: string, effects: OptionEffect[], order: 1 | 2 | 3 | 4 | 5) {
  return {
    label,
    order,
    effects,
  } as const;
}

function question(input: {
  slug: string;
  title: string;
  description?: string | null;
  type: QuestionType;
  branchKey?: string | null;
  isAnchor?: boolean;
  priority: number;
  discrimination: number;
  disagree: { label: string; effects: OptionEffect[] };
  agree: { label: string; effects: OptionEffect[] };
  branchTargets?: { disagree: string; agree: string; priority?: number };
}): QuestionSeed {
  return {
    slug: input.slug,
    title: input.title,
    description: input.description ?? "请选择你对这句话的认同程度",
    type: input.type,
    branchKey: input.branchKey ?? null,
    isAnchor: input.isAnchor ?? false,
    priority: input.priority,
    discrimination: input.discrimination,
    status: "ACTIVE",
    options: [
      option(SCALE_LABELS[1], scaleEffects(input.disagree.effects, SCALE_MULTIPLIERS[1]), 1),
      option(SCALE_LABELS[2], scaleEffects(input.disagree.effects, SCALE_MULTIPLIERS[2]), 2),
      option(SCALE_LABELS[3], scaleEffects(input.agree.effects, SCALE_MULTIPLIERS[3]), 3),
      option(SCALE_LABELS[4], scaleEffects(input.agree.effects, SCALE_MULTIPLIERS[4]), 4),
      option(SCALE_LABELS[5], scaleEffects(input.agree.effects, SCALE_MULTIPLIERS[5]), 5),
    ],
    ...(input.branchTargets
      ? {
          branchRules: [
            {
              sourceOptionOrder: 1,
              targetBranchKey: input.branchTargets.disagree,
              priority: input.branchTargets.priority ?? input.priority + 20,
            },
            {
              sourceOptionOrder: 2,
              targetBranchKey: input.branchTargets.disagree,
              priority: input.branchTargets.priority ?? input.priority + 20,
            },
            {
              sourceOptionOrder: 4,
              targetBranchKey: input.branchTargets.agree,
              priority: input.branchTargets.priority ?? input.priority + 20,
            },
            {
              sourceOptionOrder: 5,
              targetBranchKey: input.branchTargets.agree,
              priority: input.branchTargets.priority ?? input.priority + 20,
            },
          ],
        }
      : {}),
  };
}

function factQuestion(input: {
  slug: string;
  title: string;
  description: string;
  priority: number;
  isAnchor?: boolean;
  options: Array<{ label: string; effects: OptionEffect[] }>;
}): QuestionSeed {
  return {
    ...input,
    type: "CAR_USAGE",
    branchKey: null,
    isAnchor: input.isAnchor ?? false,
    discrimination: 95,
    status: "ACTIVE",
    options: input.options.map((choice, index) => ({ ...choice, order: index + 1 })),
  };
}

function constraint(targetKey: string, weightDelta: number): OptionEffect {
  return { targetType: "HARD_CONSTRAINT", targetKey, weightDelta };
}

export const questions = [
  ...questionBankExtension.map((scenario) => {
    const effect = (key: string): OptionEffect => ({
      targetType: key.startsWith("p:") ? "PERSONALITY_TRAIT" : "VEHICLE_PREFERENCE",
      targetKey: key.replace(/^p:/, ""), weightDelta: 3,
    });
    return question({ slug: scenario.slug, title: scenario.title,
      type: scenario.dimension === "decision" || scenario.dimension === "brand" || scenario.dimension === "design" ? "LIFE_STYLE" : "CAR_USAGE",
      priority: 65, discrimination: 75,
      agree: { label: "认同", effects: [effect(scenario.agree)] },
      disagree: { label: "不认同", effects: [effect(scenario.disagree)] },
    });
  }),
  factQuestion({
    slug: "budget-range",
    title: "你计划购买的车辆，裸车预算上限在哪个区间？",
    description: "选择可接受的购车价格，不包含保险和购置税；50 万元以上暂不设上限。",
    priority: 200,
    isAnchor: true,
    options: [
      { label: "10 万元以内", effects: [constraint("budget_level", 1)] },
      { label: "10–16 万元", effects: [constraint("budget_level", 2)] },
      { label: "16–22 万元", effects: [constraint("budget_level", 3)] },
      { label: "22–30 万元", effects: [constraint("budget_level", 4)] },
      { label: "30–50 万元", effects: [constraint("budget_level", 5)] },
      { label: "50 万元以上", effects: [] },
    ],
  }),
  factQuestion({
    slug: "passenger-count",
    title: "日常用车时，车内通常需要坐几个人（包括驾驶员）？",
    description: "选择常见出行人数，偶尔满载的情况会另行了解。",
    priority: 198,
    options: [
      { label: "1–2 人", effects: [constraint("family_size", 2)] },
      { label: "3–4 人", effects: [constraint("family_size", 4)] },
      { label: "5 人", effects: [constraint("family_size", 5)] },
      { label: "6–7 人", effects: [constraint("family_size", 7)] },
      { label: "暂不确定", effects: [] },
    ],
  }),
  factQuestion({
    slug: "charging-availability",
    title: "你日常实际可用的充电条件是哪一种？",
    description: "固定停车位不代表可以安装充电桩，请按实际条件选择。",
    priority: 196,
    options: [
      { label: "家里有稳定可用的充电桩", effects: [constraint("charging_access", 4)] },
      { label: "单位有稳定可用的充电桩", effects: [constraint("charging_access", 4)] },
      { label: "主要依赖公共充电站", effects: [constraint("charging_access", 2)] },
      { label: "目前没有方便的充电条件", effects: [constraint("charging_access", 1)] },
      { label: "暂不确定能否方便充电", effects: [] },
    ],
  }),
  factQuestion({
    slug: "energy-preference",
    title: "结合充电条件和补能时间，你愿意考虑哪些动力类型？",
    description: "这会直接决定后续题目和推荐范围；插混、增程可以加油行驶。",
    priority: 194,
    options: [
      { label: "只考虑燃油或不插电混动", effects: [constraint("energy_acceptance_ice", 5)] },
      { label: "不考虑纯电，插混或增程也可以", effects: [constraint("energy_acceptance_ice", 4), constraint("energy_acceptance_phev", 4)] },
      { label: "各种动力都可以考虑", effects: [constraint("energy_acceptance_ice", 3), constraint("energy_acceptance_phev", 3), constraint("energy_acceptance_ev", 3)] },
      { label: "只考虑纯电、插混或增程", effects: [constraint("energy_acceptance_phev", 4), constraint("energy_acceptance_ev", 4)] },
      { label: "只考虑纯电", effects: [constraint("energy_acceptance_ev", 5)] },
      { label: "暂不确定，先帮我比较", effects: [] },
    ],
  }),
  question({
    slug: "ownership-horizon",
    title: "我更倾向于让这台车长期陪伴我的用车生活。",
    type: "LIFE_STYLE",
    priority: 134,
    discrimination: 91,
    disagree: {
      label: "3 到 5 年，灵活换车也能接受",
      effects: [
        { targetType: "HARD_CONSTRAINT", targetKey: "ownership_horizon", weightDelta: 2 },
        { targetType: "HARD_CONSTRAINT", targetKey: "resale_sensitivity", weightDelta: 4 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "novelty_seeking", weightDelta: 1 },
      ],
    },
    agree: {
      label: "尽量长期持有，越省心越好",
      effects: [
        { targetType: "HARD_CONSTRAINT", targetKey: "ownership_horizon", weightDelta: 5 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "planning_bias", weightDelta: 2 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "stability_preference", weightDelta: 1 },
      ],
    },
  }),
  question({
    slug: "loan-pressure",
    title: "如果贷款买车，我会非常在意每月月供带来的压力。",
    type: "LIFE_STYLE",
    priority: 132,
    discrimination: 90,
    disagree: {
      label: "可接受适度压力，只要整体体验值",
      effects: [
        { targetType: "HARD_CONSTRAINT", targetKey: "monthly_payment_sensitivity", weightDelta: 2 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "brand_expression", weightDelta: 1 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "smart_features", weightDelta: 1 },
      ],
    },
    agree: {
      label: "会比较在意，每月支出最好稳一点",
      effects: [
        { targetType: "HARD_CONSTRAINT", targetKey: "monthly_payment_sensitivity", weightDelta: 5 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "cost_control", weightDelta: 2 },
      ],
    },
  }),
  question({
    slug: "resale-focus",
    title: "我买车时会把后续保值和出手难度看得很重。",
    type: "CAR_USAGE",
    priority: 130,
    discrimination: 88,
    disagree: {
      label: "一般，更看重当下使用体验",
      effects: [
        { targetType: "HARD_CONSTRAINT", targetKey: "resale_sensitivity", weightDelta: 2 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "expression_drive", weightDelta: 1 },
      ],
    },
    agree: {
      label: "会，很在意长期残值和风险",
      effects: [
        { targetType: "HARD_CONSTRAINT", targetKey: "resale_sensitivity", weightDelta: 5 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "planning_bias", weightDelta: 1 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "daily_reliability", weightDelta: 1 },
      ],
    },
  }),
  question({
    slug: "child-seat-demand",
    title: "我的家庭出行中经常存在儿童座椅或孩子乘坐需求。",
    type: "LIFE_STYLE",
    priority: 128,
    discrimination: 89,
    disagree: {
      label: "基本没有，以成人出行为主",
      effects: [
        { targetType: "HARD_CONSTRAINT", targetKey: "has_children", weightDelta: 1 },
      ],
    },
    agree: {
      label: "有，而且上下车和后排空间很重要",
      effects: [
        { targetType: "HARD_CONSTRAINT", targetKey: "has_children", weightDelta: 5 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "family_fit", weightDelta: 2 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "comfort_space", weightDelta: 1 },
      ],
    },
  }),
  question({
    slug: "elder-passenger-frequency",
    title: "我的日常出行经常需要照顾老人一起乘车。",
    type: "LIFE_STYLE",
    priority: 126,
    discrimination: 84,
    disagree: {
      label: "不太会，主要还是自己或同龄人使用",
      effects: [
        { targetType: "HARD_CONSTRAINT", targetKey: "has_elder_passengers", weightDelta: 1 },
      ],
    },
    agree: {
      label: "会，希望上下车和乘坐舒适都更友好",
      effects: [
        { targetType: "HARD_CONSTRAINT", targetKey: "has_elder_passengers", weightDelta: 4 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "comfort_space", weightDelta: 2 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "family_fit", weightDelta: 1 },
      ],
    },
  }),
  question({
    slug: "cargo-space-demand",
    title: "我的用车场景经常需要更强的后备厢和装载能力。",
    type: "CAR_USAGE",
    priority: 124,
    discrimination: 83,
    disagree: {
      label: "普通通勤代步即可，不太装大件",
      effects: [
        { targetType: "HARD_CONSTRAINT", targetKey: "cargo_space_need", weightDelta: 1 },
      ],
    },
    agree: {
      label: "经常装婴儿车、露营装备或大件行李",
      effects: [
        { targetType: "HARD_CONSTRAINT", targetKey: "cargo_space_need", weightDelta: 5 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "comfort_space", weightDelta: 1 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "family_fit", weightDelta: 2 },
      ],
    },
  }),
  question({
    slug: "daily-commute-distance",
    title: "我的日常通勤距离整体偏长。",
    type: "CAR_USAGE",
    priority: 122,
    discrimination: 90,
    disagree: {
      label: "市区中短途为主，单日里程不高",
      effects: [
        { targetType: "HARD_CONSTRAINT", targetKey: "urban_commute_density", weightDelta: 4 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "running_cost", weightDelta: 1 },
        { targetType: "BRANCH_SIGNAL", targetKey: "commute-priority", weightDelta: 1 },
      ],
    },
    agree: {
      label: "距离偏长，通勤本身就很消耗",
      effects: [
        { targetType: "HARD_CONSTRAINT", targetKey: "intercity_highway_usage", weightDelta: 3 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "daily_reliability", weightDelta: 2 },
      ],
    },
  }),
  question({
    slug: "urban-congestion",
    title: "我日常用车环境经常处于高拥堵路况。",
    type: "CAR_USAGE",
    priority: 120,
    discrimination: 82,
    disagree: {
      label: "比较一般，路况还算顺手",
      effects: [
        { targetType: "HARD_CONSTRAINT", targetKey: "urban_commute_density", weightDelta: 2 },
      ],
    },
    agree: {
      label: "很拥堵，走走停停是常态",
      effects: [
        { targetType: "HARD_CONSTRAINT", targetKey: "urban_commute_density", weightDelta: 5 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "running_cost", weightDelta: 1 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "smart_features", weightDelta: 1 },
      ],
    },
  }),
  question({
    slug: "parking-environment",
    title: "我平时面对的停车环境普遍比较紧张。",
    type: "CAR_USAGE",
    priority: 118,
    discrimination: 82,
    disagree: {
      label: "停车位还算充裕，尺寸容忍度更高",
      effects: [
        { targetType: "HARD_CONSTRAINT", targetKey: "parking_constraint", weightDelta: 1 },
      ],
    },
    agree: {
      label: "车位紧张、路边多、掉头和泊车压力大",
      effects: [
        { targetType: "HARD_CONSTRAINT", targetKey: "parking_constraint", weightDelta: 5 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "smart_features", weightDelta: 1 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "driving_engagement", weightDelta: 1 },
      ],
    },
  }),
  question({
    slug: "highway-frequency",
    title: "我开车跑高速或快速路的频率比较高。",
    type: "CAR_USAGE",
    priority: 116,
    discrimination: 81,
    disagree: {
      label: "不高，更多是城市内部使用",
      effects: [
        { targetType: "HARD_CONSTRAINT", targetKey: "intercity_highway_usage", weightDelta: 1 },
      ],
    },
    agree: {
      label: "比较高，稳定性和长途舒适很重要",
      effects: [
        { targetType: "HARD_CONSTRAINT", targetKey: "intercity_highway_usage", weightDelta: 5 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "daily_reliability", weightDelta: 2 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "comfort_space", weightDelta: 1 },
        { targetType: "BRANCH_SIGNAL", targetKey: "long-trip-priority", weightDelta: 1 },
      ],
    },
  }),
  question({
    slug: "cross-city-usage",
    title: "我经常需要跨城或临时进行长距离移动。",
    type: "CAR_USAGE",
    priority: 114,
    discrimination: 80,
    disagree: {
      label: "不太会，主要是固定半径内通勤生活",
      effects: [
        { targetType: "HARD_CONSTRAINT", targetKey: "long_distance_frequency", weightDelta: 1 },
      ],
    },
    agree: {
      label: "会，希望补能/续航和可靠性都更稳",
      effects: [
        { targetType: "HARD_CONSTRAINT", targetKey: "long_distance_frequency", weightDelta: 5 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "daily_reliability", weightDelta: 2 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "planning_bias", weightDelta: 1 },
      ],
    },
  }),
  question({
    slug: "full-load-frequency",
    title: "我的车上经常出现接近满载的情况。",
    type: "CAR_USAGE",
    priority: 112,
    discrimination: 79,
    disagree: {
      label: "很少，大多数时候两三个人以内",
      effects: [
        { targetType: "HARD_CONSTRAINT", targetKey: "full_load_frequency", weightDelta: 1 },
      ],
    },
    agree: {
      label: "经常，满载时空间和舒适都不能差",
      effects: [
        { targetType: "HARD_CONSTRAINT", targetKey: "full_load_frequency", weightDelta: 5 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "family_fit", weightDelta: 2 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "comfort_space", weightDelta: 1 },
      ],
    },
  }),
  question({
    slug: "recharge-patience",
    title: "我可以接受车辆补能时花费一些等待时间。",
    type: "CAR_USAGE",
    priority: 110,
    discrimination: 77,
    disagree: {
      label: "不太能接受，最好补能和出发都干脆利落",
      effects: [
        { targetType: "HARD_CONSTRAINT", targetKey: "energy_acceptance_ice", weightDelta: 3 },
        { targetType: "HARD_CONSTRAINT", targetKey: "energy_acceptance_phev", weightDelta: 2 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "simplicity_reliability", weightDelta: 1 },
      ],
    },
    agree: {
      label: "可以接受一些等待，前提是平时成本和体验不错",
      effects: [
        { targetType: "HARD_CONSTRAINT", targetKey: "energy_acceptance_ev", weightDelta: 3 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "running_cost", weightDelta: 1 },
      ],
    },
  }),
  question({
    slug: "winter-range-anxiety",
    title: "如果选择纯电车，我会明显担心冬天或极端天气下的续航与能耗波动。",
    type: "CAR_USAGE",
    priority: 108,
    discrimination: 75,
    disagree: {
      label: "还好，只要整体方案成熟可接受",
      effects: [
        { targetType: "HARD_CONSTRAINT", targetKey: "energy_acceptance_ev", weightDelta: 2 },
        { targetType: "HARD_CONSTRAINT", targetKey: "energy_acceptance_phev", weightDelta: 2 },
      ],
    },
    agree: {
      label: "会，最好方案稳定、预期明确",
      effects: [
        { targetType: "HARD_CONSTRAINT", targetKey: "energy_acceptance_ice", weightDelta: 3 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "stability_preference", weightDelta: 1 },
      ],
    },
  }),
  question({
    slug: "fixed-parking",
    title: "我有固定停车位或相对稳定的停车习惯。",
    type: "LIFE_STYLE",
    priority: 106,
    discrimination: 74,
    disagree: {
      label: "没有，经常临停或临时找位",
      effects: [
        { targetType: "HARD_CONSTRAINT", targetKey: "parking_constraint", weightDelta: 4 },
      ],
    },
    agree: {
      label: "有，日常停车安排比较固定",
      effects: [
        { targetType: "HARD_CONSTRAINT", targetKey: "parking_constraint", weightDelta: 1 },
      ],
    },
  }),
  question({
    slug: "driving-style",
    title: "我的驾驶风格更偏向稳妥、省心和少折腾。",
    type: "CAR_USAGE",
    branchKey: null,
    priority: 104,
    discrimination: 86,
    disagree: {
      label: "更偏有响应、有参与感、开着有乐趣",
      effects: [
        { targetType: "PERSONALITY_TRAIT", targetKey: "control_preference", weightDelta: 2 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "driving_engagement", weightDelta: 2 },
        { targetType: "BRANCH_SIGNAL", targetKey: "social-expression", weightDelta: 1 },
      ],
    },
    agree: {
      label: "更偏稳妥、省心、少折腾",
      effects: [
        { targetType: "PERSONALITY_TRAIT", targetKey: "stability_preference", weightDelta: 2 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "daily_reliability", weightDelta: 2 },
        { targetType: "BRANCH_SIGNAL", targetKey: "steady-practical", weightDelta: 1 },
      ],
    },
    branchTargets: { disagree: "social-expression", agree: "steady-practical" },
  }),
  question({
    slug: "control-vs-ease",
    title: "遇到复杂路况时，我更希望车子提供更多辅助来降低操作负担。",
    type: "CAR_USAGE",
    branchKey: null,
    priority: 100,
    discrimination: 78,
    disagree: {
      label: "保留清晰的机械反馈，我自己掌控更安心",
      effects: [
        { targetType: "VEHICLE_PREFERENCE", targetKey: "driving_engagement", weightDelta: 2 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "control_preference", weightDelta: 1 },
      ],
    },
    agree: {
      label: "给我更多辅助，降低操作负担",
      effects: [
        { targetType: "VEHICLE_PREFERENCE", targetKey: "smart_features", weightDelta: 2 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "stability_preference", weightDelta: 1 },
      ],
    },
  }),
  question({
    slug: "driver-assist-attitude",
    title: "我愿意主动使用驾驶辅助和智能功能。",
    type: "CAR_USAGE",
    branchKey: "social-expression",
    priority: 98,
    discrimination: 80,
    disagree: {
      label: "可有可无，够用且别打扰我更重要",
      effects: [
        { targetType: "VEHICLE_PREFERENCE", targetKey: "simplicity_reliability", weightDelta: 2 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "stability_preference", weightDelta: 1 },
      ],
    },
    agree: {
      label: "愿意用，功能越成熟越愿意尝试",
      effects: [
        { targetType: "VEHICLE_PREFERENCE", targetKey: "smart_features", weightDelta: 3 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "novelty_seeking", weightDelta: 1 },
      ],
    },
  }),
  question({
    slug: "speed-response",
    title: "起步和超车时，我更期待直接而有存在感的动力响应。",
    type: "CAR_USAGE",
    branchKey: "social-expression",
    priority: 96,
    discrimination: 77,
    disagree: {
      label: "顺滑稳定、线性可控",
      effects: [
        { targetType: "VEHICLE_PREFERENCE", targetKey: "daily_reliability", weightDelta: 1 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "stability_preference", weightDelta: 1 },
      ],
    },
    agree: {
      label: "响应直接、动力来得更有存在感",
      effects: [
        { targetType: "VEHICLE_PREFERENCE", targetKey: "driving_engagement", weightDelta: 3 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "expression_drive", weightDelta: 1 },
      ],
    },
  }),
  question({
    slug: "maintenance-attitude",
    title: "即使一台车维护复杂度更高，我也愿意为了更丰富的功能接受它。",
    type: "LIFE_STYLE",
    branchKey: "steady-practical",
    priority: 94,
    discrimination: 75,
    disagree: {
      label: "不太愿意，长期稳定比花样更重要",
      effects: [
        { targetType: "VEHICLE_PREFERENCE", targetKey: "simplicity_reliability", weightDelta: 2 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "planning_bias", weightDelta: 1 },
      ],
    },
    agree: {
      label: "可以接受，只要体验明显更好",
      effects: [
        { targetType: "VEHICLE_PREFERENCE", targetKey: "smart_features", weightDelta: 1 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "novelty_seeking", weightDelta: 1 },
      ],
    },
  }),
  question({
    slug: "brand-importance",
    title: "品牌对我的购车决策影响很大。",
    type: "LIFE_STYLE",
    branchKey: "social-expression",
    priority: 92,
    discrimination: 79,
    disagree: {
      label: "一般，还是更看重车本身是否合适",
      effects: [
        { targetType: "VEHICLE_PREFERENCE", targetKey: "running_cost", weightDelta: 1 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "cost_control", weightDelta: 1 },
      ],
    },
    agree: {
      label: "挺重要，品牌会影响我的选择感受",
      effects: [
        { targetType: "VEHICLE_PREFERENCE", targetKey: "brand_expression", weightDelta: 3 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "expression_drive", weightDelta: 1 },
      ],
    },
  }),
  question({
    slug: "design-pay-premium",
    title: "如果两台车都够用，我愿意为设计和质感多付一些钱。",
    type: "LIFE_STYLE",
    branchKey: "social-expression",
    priority: 90,
    discrimination: 78,
    disagree: {
      label: "不太会，核心还是使用价值",
      effects: [
        { targetType: "VEHICLE_PREFERENCE", targetKey: "running_cost", weightDelta: 1 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "cost_control", weightDelta: 1 },
      ],
    },
    agree: {
      label: "会，颜值和整体气场也很重要",
      effects: [
        { targetType: "VEHICLE_PREFERENCE", targetKey: "design_presence", weightDelta: 3 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "brand_expression", weightDelta: 1 },
      ],
    },
  }),
  question({
    slug: "new-force-brand",
    title: "只要产品力够强，我愿意接受新势力品牌。",
    type: "LIFE_STYLE",
    branchKey: "social-expression",
    priority: 88,
    discrimination: 76,
    disagree: {
      label: "会更谨慎，先看成熟度和口碑",
      effects: [
        { targetType: "PERSONALITY_TRAIT", targetKey: "stability_preference", weightDelta: 1 },
        { targetType: "HARD_CONSTRAINT", targetKey: "resale_sensitivity", weightDelta: 1 },
      ],
    },
    agree: {
      label: "愿意接受，只要产品力足够强",
      effects: [
        { targetType: "PERSONALITY_TRAIT", targetKey: "novelty_seeking", weightDelta: 2 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "smart_features", weightDelta: 1 },
      ],
    },
  }),
  question({
    slug: "niche-brand-acceptance",
    title: "如果车本身很对胃口，我也能接受相对小众的品牌。",
    type: "LIFE_STYLE",
    branchKey: "social-expression",
    priority: 86,
    discrimination: 73,
    disagree: {
      label: "不太能，还是想选更稳妥的大品牌",
      effects: [
        { targetType: "PERSONALITY_TRAIT", targetKey: "stability_preference", weightDelta: 1 },
        { targetType: "HARD_CONSTRAINT", targetKey: "resale_sensitivity", weightDelta: 1 },
      ],
    },
    agree: {
      label: "能，只要它够特别也够适合我",
      effects: [
        { targetType: "VEHICLE_PREFERENCE", targetKey: "brand_expression", weightDelta: 2 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "expression_drive", weightDelta: 1 },
      ],
    },
  }),
  question({
    slug: "cabin-tech-attitude",
    title: "坐进车里时，科技感强、联动顺手的座舱更容易打动我。",
    type: "CAR_USAGE",
    branchKey: "social-expression",
    priority: 84,
    discrimination: 74,
    disagree: {
      label: "按键和逻辑简单，越直觉越好",
      effects: [
        { targetType: "VEHICLE_PREFERENCE", targetKey: "simplicity_reliability", weightDelta: 2 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "daily_reliability", weightDelta: 1 },
      ],
    },
    agree: {
      label: "界面顺手、功能联动强、科技感明显",
      effects: [
        { targetType: "VEHICLE_PREFERENCE", targetKey: "smart_features", weightDelta: 3 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "design_presence", weightDelta: 1 },
      ],
    },
  }),
  question({
    slug: "social-first-contact",
    title: "第一次试驾一台很感兴趣的新车时，我会主动和销售沟通并快速摸清它的个性。",
    description: "选择更接近你试驾当下真实反应的答案",
    type: "CAR_USAGE",
    branchKey: "social-expression",
    priority: 82,
    discrimination: 90,
    disagree: {
      label: "先自己熟悉坐姿、视野和操作逻辑，确认顺手再深入体验",
      effects: [
        { targetType: "PERSONALITY_TRAIT", targetKey: "social_confidence", weightDelta: -1 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "stability_preference", weightDelta: 2 },
        { targetType: "BRANCH_SIGNAL", targetKey: "steady-practical", weightDelta: 1 },
      ],
    },
    agree: {
      label: "主动和销售沟通配置、路感和亮点，想尽快摸清它的个性",
      effects: [
        { targetType: "PERSONALITY_TRAIT", targetKey: "social_confidence", weightDelta: 2 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "expression_drive", weightDelta: 2 },
        { targetType: "BRANCH_SIGNAL", targetKey: "social-expression", weightDelta: 1 },
      ],
    },
    branchTargets: { disagree: "steady-practical", agree: "social-expression", priority: 112 },
  }),
  question({
    slug: "weekend-plan",
    title: "研究一台备选车时，我更愿意先把配置、口碑和落地成本梳理清楚。",
    type: "CAR_USAGE",
    branchKey: "steady-practical",
    priority: 80,
    discrimination: 88,
    disagree: {
      label: "直接去试驾或看实车，先感受有没有感觉",
      effects: [
        { targetType: "PERSONALITY_TRAIT", targetKey: "novelty_seeking", weightDelta: 2 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "expression_drive", weightDelta: 1 },
        { targetType: "BRANCH_SIGNAL", targetKey: "social-expression", weightDelta: 1 },
      ],
    },
    agree: {
      label: "把配置表、口碑、保养和落地价梳理清楚",
      effects: [
        { targetType: "PERSONALITY_TRAIT", targetKey: "planning_bias", weightDelta: 2 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "cost_control", weightDelta: 1 },
        { targetType: "BRANCH_SIGNAL", targetKey: "steady-practical", weightDelta: 1 },
      ],
    },
    branchTargets: { disagree: "social-expression", agree: "steady-practical", priority: 110 },
  }),
  question({
    slug: "purchase-decision-style",
    title: "面对两台价格都不低的备选车时，我会先看长期口碑和长期值不值。",
    type: "CAR_USAGE",
    branchKey: null,
    priority: 78,
    discrimination: 82,
    disagree: {
      label: "如果其中一台明显更打动我，会更看重试驾和当下体验",
      effects: [
        { targetType: "PERSONALITY_TRAIT", targetKey: "novelty_seeking", weightDelta: 1 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "expression_drive", weightDelta: 2 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "design_presence", weightDelta: 1 },
      ],
    },
    agree: {
      label: "先列清单，看真实口碑、故障率和长期值不值",
      effects: [
        { targetType: "PERSONALITY_TRAIT", targetKey: "planning_bias", weightDelta: 2 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "cost_control", weightDelta: 2 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "running_cost", weightDelta: 1 },
      ],
    },
  }),
  question({
    slug: "road-trip-role",
    title: "长途自驾前，我最先想到的是路线本身是否有趣和值得停留。",
    type: "LIFE_STYLE",
    branchKey: "long-trip-priority",
    priority: 76,
    discrimination: 78,
    disagree: {
      label: "补能、休息、行李和时间安排是否稳妥",
      effects: [
        { targetType: "PERSONALITY_TRAIT", targetKey: "stability_preference", weightDelta: 2 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "planning_bias", weightDelta: 1 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "daily_reliability", weightDelta: 1 },
      ],
    },
    agree: {
      label: "路线够不够有意思，沿途值不值得停留",
      effects: [
        { targetType: "PERSONALITY_TRAIT", targetKey: "novelty_seeking", weightDelta: 2 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "driving_engagement", weightDelta: 2 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "brand_expression", weightDelta: 1 },
      ],
    },
  }),
  question({
    slug: "group-trip-role",
    title: "如果和朋友一起去看车或试驾，我通常会主动安排试驾顺序和对比重点。",
    type: "CAR_USAGE",
    branchKey: "social-expression",
    priority: 74,
    discrimination: 76,
    disagree: {
      label: "通常跟随同行人的安排",
      effects: [],
    },
    agree: {
      label: "更在意对比过程是否稳妥完整，少踩坑少漏看",
      effects: [
        { targetType: "PERSONALITY_TRAIT", targetKey: "stability_preference", weightDelta: 2 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "planning_bias", weightDelta: 1 },
      ],
    },
  }),
  question({
    slug: "risk-change-attitude",
    title: "面对新改款或新平台车型时，我更愿意先观察口碑和稳定性。",
    type: "CAR_USAGE",
    branchKey: null,
    priority: 72,
    discrimination: 77,
    disagree: {
      label: "能接受一些新鲜变化，只要产品体验足够吸引我",
      effects: [
        { targetType: "PERSONALITY_TRAIT", targetKey: "novelty_seeking", weightDelta: 2 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "social_confidence", weightDelta: 1 },
      ],
    },
    agree: {
      label: "更倾向先观察口碑和稳定性，把试错风险压低",
      effects: [
        { targetType: "PERSONALITY_TRAIT", targetKey: "planning_bias", weightDelta: 2 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "stability_preference", weightDelta: 1 },
      ],
    },
  }),
  question({
    slug: "new-tech-upgrade",
    title: "遇到刚上市的新技术方案时，我愿意先尝试再判断它值不值。",
    type: "CAR_USAGE",
    branchKey: "social-expression",
    priority: 70,
    discrimination: 75,
    disagree: {
      label: "更想等成熟稳定后再考虑",
      effects: [
        { targetType: "PERSONALITY_TRAIT", targetKey: "stability_preference", weightDelta: 2 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "simplicity_reliability", weightDelta: 2 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "running_cost", weightDelta: 1 },
      ],
    },
    agree: {
      label: "愿意尝试，先体验再判断值不值",
      effects: [
        { targetType: "PERSONALITY_TRAIT", targetKey: "novelty_seeking", weightDelta: 2 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "smart_features", weightDelta: 2 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "brand_expression", weightDelta: 1 },
      ],
    },
  }),
  question({
    slug: "travel-role",
    title: "长途自驾时，我更希望车辆在超车和变道时保持积极响应。",
    type: "CAR_USAGE",
    branchKey: null,
    priority: 68,
    discrimination: 73,
    disagree: {
      label: "节奏更稳，巡航质感和长时间省心更重要",
      effects: [
        { targetType: "PERSONALITY_TRAIT", targetKey: "planning_bias", weightDelta: 1 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "stability_preference", weightDelta: 2 },
      ],
    },
    agree: {
      label: "节奏更积极，超车和变道响应要跟得上",
      effects: [
        { targetType: "VEHICLE_PREFERENCE", targetKey: "driving_engagement", weightDelta: 2 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "control_preference", weightDelta: 1 },
      ],
    },
  }),
  question({
    slug: "child-comfort-priority",
    title: "如果车里常有家人或孩子，我更担心座舱舒适和安静度不够。",
    type: "CAR_USAGE",
    branchKey: "family-priority",
    priority: 66,
    discrimination: 74,
    disagree: {
      label: "座舱舒适和安静度不是优先考虑项",
      effects: [],
    },
    agree: {
      label: "路上闹腾，座舱舒适和安静度不够",
      effects: [
        { targetType: "VEHICLE_PREFERENCE", targetKey: "comfort_space", weightDelta: 2 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "family_fit", weightDelta: 2 },
      ],
    },
  }),
  question({
    slug: "commute-priority",
    title: "日常通勤选车时，我最优先考虑长期油耗、电耗和养护成本。",
    type: "CAR_USAGE",
    branchKey: "commute-priority",
    priority: 64,
    discrimination: 78,
    disagree: {
      label: "开起来更有趣，通勤也不无聊",
      effects: [
        { targetType: "VEHICLE_PREFERENCE", targetKey: "driving_engagement", weightDelta: 3 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "brand_expression", weightDelta: 1 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "novelty_seeking", weightDelta: 1 },
      ],
    },
    agree: {
      label: "长期油耗、电耗和养护成本低",
      effects: [
        { targetType: "VEHICLE_PREFERENCE", targetKey: "running_cost", weightDelta: 3 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "daily_reliability", weightDelta: 2 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "cost_control", weightDelta: 2 },
      ],
    },
  }),
  question({
    slug: "rear-seat-priority",
    title: "如果后排经常坐人，我会更关注腿部空间和乘坐舒适性。",
    type: "CAR_USAGE",
    branchKey: "family-priority",
    priority: 62,
    discrimination: 74,
    disagree: {
      label: "后排氛围和整体设计质感",
      effects: [
        { targetType: "VEHICLE_PREFERENCE", targetKey: "design_presence", weightDelta: 2 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "brand_expression", weightDelta: 2 },
      ],
    },
    agree: {
      label: "腿部空间和乘坐舒适性",
      effects: [
        { targetType: "VEHICLE_PREFERENCE", targetKey: "comfort_space", weightDelta: 3 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "family_fit", weightDelta: 2 },
      ],
    },
  }),
  question({
    slug: "city-parking-priority",
    title: "在拥挤城市里停车不方便时，我更希望车子具备完善的辅助功能。",
    type: "CAR_USAGE",
    branchKey: null,
    priority: 60,
    discrimination: 72,
    disagree: {
      label: "车身灵活、视野顺手，自己掌控更重要",
      effects: [
        { targetType: "VEHICLE_PREFERENCE", targetKey: "driving_engagement", weightDelta: 2 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "simplicity_reliability", weightDelta: 1 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "control_preference", weightDelta: 1 },
      ],
    },
    agree: {
      label: "辅助功能到位，能少花精力最好",
      effects: [
        { targetType: "VEHICLE_PREFERENCE", targetKey: "smart_features", weightDelta: 2 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "daily_reliability", weightDelta: 1 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "stability_preference", weightDelta: 1 },
      ],
    },
  }),
  question({
    slug: "family-weekend-car",
    title: "周末带家人出行时，我更希望车子提供充足空间和乘坐舒适性。",
    type: "CAR_USAGE",
    branchKey: "family-priority",
    priority: 58,
    discrimination: 71,
    disagree: {
      label: "车看起来有质感，开出去更有感觉",
      effects: [
        { targetType: "VEHICLE_PREFERENCE", targetKey: "brand_expression", weightDelta: 2 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "design_presence", weightDelta: 3 },
      ],
    },
    agree: {
      label: "空间和乘坐舒适，大家都不累",
      effects: [
        { targetType: "VEHICLE_PREFERENCE", targetKey: "comfort_space", weightDelta: 3 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "family_fit", weightDelta: 3 },
      ],
    },
  }),
  question({
    slug: "brand-vs-value",
    title: "如果两台车功能接近，我更容易被品牌调性和设计气质打动。",
    type: "CAR_USAGE",
    branchKey: null,
    priority: 56,
    discrimination: 70,
    disagree: {
      label: "配置、成本和长期使用的划算程度",
      effects: [
        { targetType: "VEHICLE_PREFERENCE", targetKey: "running_cost", weightDelta: 2 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "daily_reliability", weightDelta: 2 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "cost_control", weightDelta: 1 },
      ],
    },
    agree: {
      label: "品牌调性、设计和开出去的感觉",
      effects: [
        { targetType: "VEHICLE_PREFERENCE", targetKey: "brand_expression", weightDelta: 3 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "design_presence", weightDelta: 2 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "expression_drive", weightDelta: 1 },
      ],
    },
  }),
  question({
    slug: "weekend-trip-frequency",
    title: "我经常会把车用于周末短途旅行。",
    type: "CAR_USAGE",
    branchKey: null,
    priority: 54,
    discrimination: 69,
    disagree: {
      label: "不算频繁，更多还是日常代步",
      effects: [
        { targetType: "HARD_CONSTRAINT", targetKey: "weekend_trip_frequency", weightDelta: 1 },
      ],
    },
    agree: {
      label: "会，经常想开车逃离城市一下",
      effects: [
        { targetType: "HARD_CONSTRAINT", targetKey: "weekend_trip_frequency", weightDelta: 4 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "driving_engagement", weightDelta: 1 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "comfort_space", weightDelta: 1 },
      ],
    },
  }),
  question({
    slug: "suburban-family-usage",
    title: "我的周末家庭出行经常是近郊或周边活动。",
    type: "CAR_USAGE",
    branchKey: "family-priority",
    priority: 52,
    discrimination: 68,
    disagree: {
      label: "一般，不是主要场景",
      effects: [
        { targetType: "HARD_CONSTRAINT", targetKey: "suburban_family_usage", weightDelta: 1 },
      ],
    },
    agree: {
      label: "是，这类场景其实挺多",
      effects: [
        { targetType: "HARD_CONSTRAINT", targetKey: "suburban_family_usage", weightDelta: 4 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "family_fit", weightDelta: 1 },
      ],
    },
  }),
  question({
    slug: "daily-reliability-priority",
    title: "车辆很少出小毛病这件事对我非常重要。",
    type: "CAR_USAGE",
    branchKey: "steady-practical",
    priority: 50,
    discrimination: 72,
    disagree: {
      label: "重要，但不是第一位",
      effects: [
        { targetType: "VEHICLE_PREFERENCE", targetKey: "design_presence", weightDelta: 1 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "smart_features", weightDelta: 1 },
      ],
    },
    agree: {
      label: "非常重要，能省很多额外心力",
      effects: [
        { targetType: "VEHICLE_PREFERENCE", targetKey: "daily_reliability", weightDelta: 3 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "stability_preference", weightDelta: 1 },
      ],
    },
  }),
  question({
    slug: "social-confidence-scene",
    title: "门店临时增加一段试驾路线时，我会主动要求多试几个场景。",
    type: "CAR_USAGE",
    branchKey: "social-expression",
    priority: 48,
    discrimination: 70,
    disagree: {
      label: "我更愿意按既定安排体验，确认核心表现就够了",
      effects: [
        { targetType: "PERSONALITY_TRAIT", targetKey: "stability_preference", weightDelta: 1 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "planning_bias", weightDelta: 1 },
      ],
    },
    agree: {
      label: "我会主动要求多试几个场景，把车的边界摸清楚",
      effects: [
        { targetType: "PERSONALITY_TRAIT", targetKey: "social_confidence", weightDelta: 2 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "expression_drive", weightDelta: 1 },
      ],
    },
  }),
  question({
    slug: "planning-bias-scene",
    title: "去看车或试驾前，我会提前看库存、路线、停车和试驾安排。",
    type: "CAR_USAGE",
    branchKey: "steady-practical",
    priority: 46,
    discrimination: 69,
    disagree: {
      label: "先到现场再说，边看边决定比较重点",
      effects: [
        { targetType: "PERSONALITY_TRAIT", targetKey: "novelty_seeking", weightDelta: 1 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "social_confidence", weightDelta: 1 },
      ],
    },
    agree: {
      label: "提前看门店库存、路线、停车和试驾安排",
      effects: [
        { targetType: "PERSONALITY_TRAIT", targetKey: "planning_bias", weightDelta: 2 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "stability_preference", weightDelta: 1 },
      ],
    },
  }),
  question({
    slug: "expression-scene",
    title: "如果试到一台很喜欢的车，我会愿意分享它打动我的地方。",
    type: "CAR_USAGE",
    branchKey: "social-expression",
    priority: 44,
    discrimination: 67,
    disagree: {
      label: "自己确认满意就行，不太需要额外表达",
      effects: [
        { targetType: "PERSONALITY_TRAIT", targetKey: "cost_control", weightDelta: 1 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "stability_preference", weightDelta: 1 },
      ],
    },
    agree: {
      label: "会愿意分享试驾感受，让别人也知道这台车哪里打动我",
      effects: [
        { targetType: "PERSONALITY_TRAIT", targetKey: "expression_drive", weightDelta: 2 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "brand_expression", weightDelta: 1 },
      ],
    },
  }),
  question({
    slug: "comfort-vs-style-home",
    title: "如果同价位两台车只能二选一，我更容易优先长期好开、省心、谁坐都舒服的那台。",
    type: "CAR_USAGE",
    branchKey: null,
    priority: 42,
    discrimination: 66,
    disagree: {
      label: "设计更有感觉，开出去更能体现自己的审美",
      effects: [
        { targetType: "VEHICLE_PREFERENCE", targetKey: "design_presence", weightDelta: 2 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "expression_drive", weightDelta: 1 },
      ],
    },
    agree: {
      label: "长期好开、省心、谁坐都舒服",
      effects: [
        { targetType: "VEHICLE_PREFERENCE", targetKey: "comfort_space", weightDelta: 1 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "stability_preference", weightDelta: 1 },
      ],
    },
  }),
  question({
    slug: "long-term-cost-view",
    title: "看待一台车的长期使用成本时，我会持续算总账并控制后续成本。",
    type: "CAR_USAGE",
    branchKey: "steady-practical",
    priority: 40,
    discrimination: 65,
    disagree: {
      label: "接受一定溢价，关键是值回当下体验",
      effects: [
        { targetType: "VEHICLE_PREFERENCE", targetKey: "brand_expression", weightDelta: 1 },
        { targetType: "VEHICLE_PREFERENCE", targetKey: "smart_features", weightDelta: 1 },
      ],
    },
    agree: {
      label: "会持续算总账，后续成本不能轻易失控",
      effects: [
        { targetType: "VEHICLE_PREFERENCE", targetKey: "running_cost", weightDelta: 2 },
        { targetType: "PERSONALITY_TRAIT", targetKey: "cost_control", weightDelta: 2 },
      ],
    },
  }),
] as const;
