export type VehiclePoolTier = "PRIMARY" | "SUPPLEMENTAL" | "EXCLUDED";

export type VehiclePoolPolicy = {
  tier: VehiclePoolTier;
  source: string;
  reviewedAt: string;
};

export const VEHICLE_POOL_VERSION = "2026-10-16.1";
const source = "Carality 中国乘用车主流车系编辑清单 v1（非实时销量排名）";
const reviewedAt = "2026-10-16";

const brandAliases: Record<string, string> = {
  "AITO问界": "问界", "吉利汽车": "吉利", "吉利银河": "吉利", "五菱汽车": "五菱",
  "零跑汽车": "零跑", "理想汽车": "理想", "小鹏汽车": "小鹏", "小米汽车": "小米",
  "长安汽车": "长安", "奇瑞汽车": "奇瑞", "ARCFOX极狐": "极狐",
  "深蓝汽车": "深蓝", "广汽传祺": "传祺", "广汽埃安": "埃安",
};

function normalizeText(value: string) {
  return value.normalize("NFKC").toLowerCase().replace(/[\s·•_–—-]/g, "");
}

export function normalizeVehicleBrand(brand: string) {
  return normalizeText(brandAliases[brand] ?? brand);
}

export function normalizeVehicleSeries(vehicle: { brand: string; series: string }) {
  const brand = normalizeVehicleBrand(vehicle.brand);
  let series = normalizeText(vehicle.series);
  for (const alias of [vehicle.brand, brandAliases[vehicle.brand] ?? vehicle.brand]) {
    const prefix = normalizeText(alias);
    if (series.startsWith(prefix)) series = series.slice(prefix.length);
  }
  if (brand === normalizeText("问界")) series = series.replace(/^问界/, "");
  if (brand === normalizeText("吉利")) series = series.replace(/^(吉利)?银河/, "");
  if (brand === normalizeText("丰田")) series = series.replace(/双擎$/, "");
  const aliases: Record<string, string> = {
    rav4荣放: "rav4", "宋plusdmi": "宋plus", "宋plusev": "宋plus", "别克gl8": "gl8",
    "秦plusdmi": "秦plus", "秦plusev": "秦plus", "秦ldmi": "秦l", "秦lev": "秦l",
    汉dmi: "汉", 汉dm: "汉", 汉ev: "汉", 唐dmi: "唐", 唐dm: "唐", 唐ev: "唐",
    宋prodm: "宋prodmi", 宋l: "宋lev", 海狮07: "海狮07ev", 海豹06: "海豹06dmi",
    d9dm: "d9", d9dmi: "d9", d9ev: "d9", 帕萨特pro: "帕萨特", 途观lpro: "途观l",
    银河a7: "a7em", a7: "a7em",
  };
  return `${brand}:${aliases[series] ?? series}`;
}

const primary: Record<string, string[]> = {
  比亚迪: ["秦PLUS", "秦PLUS DM-i", "秦PLUS EV", "秦L", "秦L DM-i", "秦L EV", "海鸥", "海豚", "元PLUS", "元UP", "宋PLUS", "宋PLUS DM-i", "宋PLUS EV", "宋Pro DM-i", "宋L DM-i", "汉", "汉DM-i", "汉EV", "唐DM-i", "海豹06 DM-i", "海狮07 EV", "海狮05 EV", "海狮06"],
  丰田: ["凯美瑞", "卡罗拉", "雷凌", "RAV4", "RAV4荣放", "锋兰达", "卡罗拉锐放", "威兰达", "汉兰达", "赛那", "格瑞维亚", "亚洲龙", "铂智3X"],
  大众: ["朗逸", "宝来", "速腾", "帕萨特", "迈腾", "途观L", "途岳", "探岳", "ID.3", "ID.4 CROZZ", "ID.4 X", "高尔夫"],
  本田: ["雅阁", "思域", "CR-V", "皓影", "型格", "飞度", "奥德赛", "缤智", "XR-V"],
  日产: ["轩逸", "天籁", "逍客"],
  吉利: ["星瑞", "星越L", "博越L", "帝豪", "缤越", "星愿", "E5", "银河E5", "L7", "银河L7", "银河L6", "银河A7 EM", "银河A7", "星舰7"],
  长安: ["长安CS75 PLUS", "长安UNI-V", "长安UNI-Z PHEV", "逸动"],
  奇瑞: ["瑞虎8", "瑞虎8 PLUS", "瑞虎9", "艾瑞泽8"],
  哈弗: ["哈弗H6", "哈弗大狗", "哈弗猛龙PHEV", "猛龙"],
  五菱: ["五菱宏光MINIEV", "五菱缤果", "缤果 Plus", "五菱星光PHEV", "五菱星光EV"],
  特斯拉: ["Model 3", "Model Y"],
  理想: ["L6", "L7", "L8", "L9"],
  问界: ["M5", "M7", "M9"],
  小米: ["SU7", "YU7"],
  小鹏: ["MONA M03", "P7+", "G6", "G9", "X9"],
  零跑: ["C10", "C11", "C16", "B10", "B01"],
  蔚来: ["ES6", "ES8", "ET5", "ET5T"],
  乐道: ["L60"],
  极氪: ["001", "007", "7X"],
  深蓝: ["深蓝S07", "深蓝S7", "深蓝SL03", "深蓝L07", "S05"],
  领克: ["03", "08 EM-P", "07 EM-P", "900"],
  腾势: ["D9", "D9 DM-i"],
  魏牌: ["蓝山", "高山 PHEV"],
  坦克: ["坦克300", "坦克500 Hi4-T"],
  别克: ["GL8", "昂科威", "昂科威S"],
  奥迪: ["A3", "A4L", "A6L", "Q3", "Q5L"],
  宝马: ["3系", "5系", "X1", "X3", "i3"],
  奔驰: ["C级", "E级", "GLC", "GLB"],
  红旗: ["红旗H5", "红旗HS5"],
  广汽埃安: ["AION Y", "AION S", "AION RT", "AION V"],
  埃安: ["AION Y", "AION S", "AION RT", "AION V"],
};

const supplemental: Record<string, string[]> = {
  大众: ["揽巡", "途昂", "途昂Pro", "威然", "途安L", "大众CC", "凌渡", "朗逸新锐", "ID.7 VIZZION"],
  奔驰: ["GLA", "A级", "GLE(进口)", "S级", "EQE", "V级"],
  宝马: ["X5", "4系", "7系", "i5", "iX1"],
  奥迪: ["A5", "A7", "A7L", "Q7", "A8", "Q4 e-tron"],
  丰田: ["普拉多", "威飒", "丰田bZ3", "铂智4X"],
  日产: ["奇骏", "探陆"], 本田: ["冠道", "UR-V", "ZR-V致在", "致在", "艾力绅", "英仕派", "HR-V"],
  比亚迪: ["海豹", "海豹07 DM-i", "护卫舰07", "宋L EV", "驱逐舰05"],
  马自达: ["CX-5", "马自达CX-50行也", "马自达3 昂克赛拉", "马自达EZ-6"],
  领克: ["01", "03+", "06", "06 EM-P", "09 EM-P", "Z20"],
  吉利: ["银河E8", "豪越L", "吉利ICON"],
  极氪: ["009", "X"], 小鹏: ["P7"], 蔚来: ["ET7", "EC6", "EC7"],
  阿维塔: ["07", "11", "12"], 岚图: ["岚图FREE", "岚图梦想家", "梦想家"],
  智己: ["智己LS6", "智己L6"], 智界: ["S7", "R7"], 享界: ["S9"],
  广汽传祺: ["传祺M8", "传祺M6", "传祺GS8", "传祺E8 PHEV"],
  传祺: ["M8", "M6", "GS8", "E8"],
  捷途: ["旅行者", "捷途旅行者", "山海T2", "捷途X70 PLUS"],
  奇瑞: ["瑞虎7", "瑞虎7 PLUS", "风云T9", "风云A8"],
  长安启源: ["长安启源A07", "长安启源Q05"],
  荣威: ["荣威i5", "荣威RX5", "荣威D7"], MG: ["MG7", "MG4", "MG5"],
  现代: ["伊兰特", "途胜", "索纳塔"], 起亚: ["狮铂拓界", "起亚EV5"],
  福特: ["蒙迪欧", "锐界", "锐界L", "探险者"],
  雪佛兰: ["迈锐宝XL", "探界者", "探界者Plus"],
  别克: ["君越", "君威", "别克E5", "世纪"],
  凯迪拉克: ["CT5", "XT5", "凯迪拉克CT5", "凯迪拉克XT5"],
  雷克萨斯: ["雷克萨斯ES", "雷克萨斯NX", "雷克萨斯RX"],
  沃尔沃: ["S60", "S90", "XC60", "XC90"],
  smart: ["smart精灵#1", "smart精灵#3"], MINI: ["MINI"],
  极狐: ["极狐 阿尔法T5", "极狐 阿尔法S5"],
  东风奕派: ["奕派007", "纳米01"],
  深蓝: ["G318"], 理想: ["MEGA"], 腾势: ["N7"],
  坦克: ["坦克500", "坦克400", "坦克300 Hi4-T"],
  长安: ["长安UNI-T", "长安CS35 PLUS", "长安X5 PLUS", "长安X7 PLUS", "长安UNI-K"],
};

function buildKeys(groups: Record<string, string[]>) {
  return new Set(Object.entries(groups).flatMap(([brand, series]) =>
    series.map((name) => normalizeVehicleSeries({ brand, series: name }))));
}

const primaryKeys = buildKeys(primary);
const supplementalKeys = buildKeys(supplemental);

export function resolveVehiclePoolPolicy(vehicle: { brand: string; series: string }): VehiclePoolPolicy {
  const key = normalizeVehicleSeries(vehicle);
  return { tier: primaryKeys.has(key) ? "PRIMARY" : supplementalKeys.has(key) ? "SUPPLEMENTAL" : "EXCLUDED", source, reviewedAt };
}

export function getVehiclePoolPriority(tier: VehiclePoolTier) {
  return tier === "PRIMARY" ? 0 : tier === "SUPPLEMENTAL" ? 1 : 2;
}
