export type BuyingGuideSeed = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  relatedVehicleSlugs: string[];
};

export const buyingGuides: BuyingGuideSeed[] = [
  {
    slug: "pscv-buying-guide",
    title: "PSCV 人格怎么买车：先看舒适和长期成本",
    excerpt: "如果你偏向实用、省钱、舒适、性价比，选车时最该优先确认什么。",
    body: "PSCV 用户更适合先看空间、油耗、保养成本和家庭乘坐体验，再判断配置是否够用。",
    relatedVehicleSlugs: ["byd-song-plus-dmi", "toyota-corolla", "nissan-sylphy"],
  },
  {
    slug: "eqdb-buying-guide",
    title: "EQDB 人格怎么买车：别让参数掩盖驾驶体验",
    excerpt: "如果你偏向情绪、品质、驾控、品牌，选车时更应该关注哪些关键点。",
    body: "EQDB 用户更适合优先试驾，重点比较动力响应、底盘反馈、内饰质感和品牌认可度。",
    relatedVehicleSlugs: ["tesla-model-3", "mazda-cx5", "mg7"],
  },
];
