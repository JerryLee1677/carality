export type PreferenceDimension = "handling" | "comfort" | "space" | "smart" | "power" | "economy" | "brand" | "design" | "reliability" | "family" | "decision";
export type QuestionCondition = "all" | "ev" | "plugin" | "passengers";

function scenario(slug: string, dimension: PreferenceDimension, topic: string, title: string,
  englishTitle: string, agree: string, disagree: string, condition: QuestionCondition = "all") {
  return { slug, dimension, topic, title, englishTitle, agree, disagree, condition };
}

export const questionBankExtension = [
  scenario("steering-feedback", "handling", "steering-feedback", "试驾转弯时，我希望方向盘能清楚传递路面的变化。", "On a test drive, I want clear road feedback through the steering wheel.", "driving_engagement", "comfort_space"),
  scenario("body-roll-control", "handling", "body-roll", "经过连续弯道时，我更在意车身跟随是否干脆，而不是悬架有多软。", "On winding roads, I value precise body control more than soft suspension.", "driving_engagement", "comfort_space"),
  scenario("brake-pedal-feel", "handling", "brake-control", "堵车时频繁刹停，我很在意制动踏板是否容易精细控制。", "In stop-and-go traffic, precise brake-pedal control matters to me.", "driving_engagement", "smart_features"),
  scenario("compact-city-body", "handling", "city-size", "在狭窄街巷开车时，我宁愿少一点车内空间，也想要更灵活的车身。", "In narrow streets, I would trade some cabin space for an agile, compact car.", "driving_engagement", "comfort_space"),
  scenario("weekend-driving-route", "handling", "driving-route", "周末有空时，我会为了驾驶体验专门选择一条好开的路线。", "On free weekends, I sometimes choose a route for the pleasure of driving.", "driving_engagement", "running_cost"),
  scenario("driving-mode-adjustment", "handling", "driving-settings", "即使默认设置够用，我也愿意花时间调节驾驶模式和转向手感。", "I enjoy adjusting drive modes and steering feel even when the default settings work.", "driving_engagement", "simplicity_reliability"),

  scenario("rough-road-comfort", "comfort", "suspension-comfort", "每天经过减速带或破损路面时，我希望颠簸尽可能被过滤掉。", "On speed bumps and rough roads, I want the suspension to absorb as much impact as possible.", "comfort_space", "driving_engagement"),
  scenario("highway-cabin-noise", "comfort", "cabin-noise", "高速行驶时，较低的风噪和胎噪比更强的加速更能打动我。", "At highway speeds, low wind and tire noise matter more to me than stronger acceleration.", "comfort_space", "driving_engagement"),
  scenario("seat-support-long-drive", "comfort", "seat-support", "连续开车两小时后腰背是否舒服，是我试驾时会认真考虑的事。", "I pay close attention to how my back would feel after two hours in the driver's seat.", "comfort_space", "design_presence"),
  scenario("air-conditioning-ease", "comfort", "climate-controls", "开车时，我希望能直接、轻松地调节空调，而不用反复操作屏幕。", "While driving, I want simple climate controls without navigating through screens.", "simplicity_reliability", "smart_features"),
  scenario("summer-seat-ventilation", "comfort", "seat-climate", "夏天长时间用车，我愿意优先选择座椅通风和空调体验更好的车型。", "For long summer drives, I prioritize effective seat ventilation and air conditioning.", "comfort_space", "running_cost"),
  scenario("passenger-motion-comfort", "comfort", "motion-comfort", "家人容易晕车时，我会优先考虑起步、刹车和悬架都平顺的车。", "If my family gets carsick, I prioritize smooth starts, braking, and suspension.", "comfort_space", "driving_engagement", "passengers"),

  scenario("stroller-loading", "space", "stroller-loading", "如果要放婴儿车或大件行李，我希望后备厢开口宽、装卸方便。", "For a stroller or bulky luggage, I want a wide trunk opening and easy loading.", "comfort_space", "design_presence", "passengers"),
  scenario("rear-seat-folding", "space", "seat-folding", "搬运大件物品时，我希望后排放倒后能形成规整、实用的空间。", "For bulky items, I want folded rear seats to create a flat, useful cargo area.", "comfort_space", "design_presence"),
  scenario("small-item-storage", "space", "cabin-storage", "水杯、手机和随身物品都有顺手的收纳位置，会明显提高我对车的好感。", "Convenient storage for cups, phones, and everyday items makes a car more appealing to me.", "comfort_space", "design_presence"),
  scenario("rear-headroom", "space", "rear-headroom", "即使车顶线条不够运动，我也希望后排头部空间更宽裕。", "I would accept a less sporty roofline for more rear-seat headroom.", "comfort_space", "design_presence", "passengers"),
  scenario("luggage-for-travel", "space", "travel-luggage", "多人出行时，我希望坐满人以后仍能装下大家的行李。", "When traveling with others, I want enough luggage room even with every seat occupied.", "comfort_space", "driving_engagement", "passengers"),
  scenario("wide-door-opening", "space", "door-access", "上下车是否方便，比车门造型是否特别更影响我的选择。", "Easy entry and exit matter more to me than unusual door styling.", "comfort_space", "design_presence"),

  scenario("voice-control-use", "smart", "voice-controls", "行驶中，我愿意通过语音完成导航、空调和音乐操作。", "While driving, I am comfortable using voice commands for navigation, climate, and music.", "smart_features", "simplicity_reliability"),
  scenario("parking-camera-value", "smart", "parking-assist", "在复杂车位停车时，清晰的全景影像会明显降低我的压力。", "Clear surround-view cameras noticeably reduce my stress in difficult parking spaces.", "smart_features", "driving_engagement"),
  scenario("lane-assist-long-trip", "smart", "highway-assist", "跑高速时，我愿意在保持注意力的前提下使用车道居中和自适应巡航。", "On highways, I would use lane centering and adaptive cruise while remaining attentive.", "smart_features", "simplicity_reliability"),
  scenario("phone-car-integration", "smart", "phone-integration", "上车后手机导航、音乐能否无缝衔接，是我经常使用的功能。", "Seamless access to my phone's navigation and music is a feature I use frequently.", "smart_features", "design_presence"),
  scenario("software-update-interest", "smart", "software-updates", "如果后续软件升级能带来实用功能，我会愿意了解并尝试。", "I am willing to explore software updates that add useful features.", "smart_features", "daily_reliability"),
  scenario("screen-interaction-learning", "smart", "screen-learning", "只要功能有用，我可以接受花时间学习车机里的新操作。", "I am willing to learn new infotainment controls when the features are useful.", "smart_features", "simplicity_reliability"),

  scenario("highway-merging-power", "power", "merging-power", "高速入口汇入车流时，我希望动力储备充足，不必把油门或电门踩得很深。", "When merging onto a highway, I want ample power without pressing the pedal hard.", "driving_engagement", "running_cost"),
  scenario("loaded-uphill-power", "power", "loaded-power", "满载上坡时，车辆还能轻松提速对我很重要。", "Easy acceleration uphill with a full load matters to me.", "driving_engagement", "running_cost", "passengers"),
  scenario("power-reserve-over-specs", "power", "power-reserve", "即使日常很少用到，我仍希望车辆保留比较充足的动力。", "Even if I rarely use it, I want substantial power in reserve.", "driving_engagement", "running_cost"),
  scenario("acceleration-smoothness", "power", "power-delivery", "相比突然的推背感，我更喜欢加速过程线性、容易预判。", "I prefer smooth, predictable acceleration over a sudden surge of power.", "comfort_space", "driving_engagement"),
  scenario("urban-start-response", "power", "low-speed-response", "市区起步和低速跟车时，我希望车辆响应及时、没有明显迟滞。", "In city starts and low-speed traffic, I want prompt response without noticeable delay.", "driving_engagement", "running_cost"),
  scenario("power-upgrade-premium", "power", "power-premium", "同一款车里，我愿意为明显更好的动力多花一些购车预算。", "Within the same model range, I would spend more for noticeably better performance.", "driving_engagement", "running_cost"),

  scenario("insurance-cost-check", "economy", "insurance-cost", "决定买哪款车之前，我会比较真实的保险报价和续保成本。", "Before choosing a car, I compare real insurance quotes and renewal costs.", "running_cost", "brand_expression"),
  scenario("maintenance-price-check", "economy", "maintenance-cost", "保养项目的频率和价格，会明显影响我的购车决定。", "Maintenance frequency and pricing strongly influence my purchase decision.", "running_cost", "design_presence"),
  scenario("tire-replacement-cost", "economy", "consumable-cost", "轮胎等耗材是否便宜、容易更换，比大尺寸轮毂的外观更重要。", "Affordable, readily available tires matter more to me than the look of large wheels.", "running_cost", "design_presence"),
  scenario("energy-bill-recording", "economy", "energy-cost-tracking", "用车以后，我会关注每月油费或电费，并用实际开销比较车辆。", "I would track monthly fuel or electricity spending and compare cars by real costs.", "running_cost", "brand_expression"),
  scenario("public-charge-cost", "economy", "public-charge-cost", "如果主要在外面充电，我会仔细比较电价、停车费和服务费。", "If I rely on public charging, I would compare electricity, parking, and service fees.", "running_cost", "smart_features", "plugin"),
  scenario("home-charge-schedule", "economy", "charging-schedule", "如果选择插电车型，我愿意根据日程安排补能，以减少日常使用成本。", "With a plug-in car, I would plan charging around my schedule to reduce running costs.", "running_cost", "simplicity_reliability", "plugin"),

  scenario("brand-service-network", "brand", "service-network", "品牌在常住城市有没有成熟的服务网点，会影响我的购买信心。", "A brand's established local service network affects my confidence in buying it.", "daily_reliability", "design_presence"),
  scenario("brand-social-image", "brand", "brand-image", "在商务接待等场合，车辆品牌传递的形象对我比较重要。", "In business settings, the image conveyed by a car's brand matters to me.", "brand_expression", "running_cost"),
  scenario("brand-familiarity", "brand", "brand-familiarity", "面对配置相近的车，我更愿意选择自己长期熟悉的品牌。", "Between similarly equipped cars, I prefer a brand I have known for a long time.", "brand_expression", "smart_features"),
  scenario("badge-premium-limit", "brand", "brand-premium", "即使配置没有增加，我也愿意为喜欢的品牌支付一定溢价。", "I would pay a premium for a brand I like even without additional features.", "brand_expression", "running_cost"),
  scenario("brand-owner-community", "brand", "owner-community", "一个品牌的车主文化和交流氛围，会增加我选择它的意愿。", "A brand's owner community and culture make it more appealing to me.", "brand_expression", "simplicity_reliability"),

  scenario("exterior-color-choice", "design", "color-expression", "即使等车更久，我也希望选到真正喜欢的车身颜色。", "I would wait longer to get a body color I really like.", "design_presence", "running_cost"),
  scenario("cabin-material-detail", "design", "cabin-materials", "内饰材质和细节是否协调，会明显影响我每天上车时的心情。", "Harmonious cabin materials and details affect how I feel when getting in every day.", "design_presence", "running_cost"),
  scenario("distinctive-silhouette", "design", "exterior-identity", "停在一排车里时，我希望自己的车有容易辨认的外形。", "In a row of parked cars, I want mine to have a recognizable silhouette.", "design_presence", "simplicity_reliability"),
  scenario("coupe-roof-tradeoff", "design", "roofline-tradeoff", "只要日常够用，我可以为了喜欢的车身线条接受少一点空间。", "If daily needs are met, I would accept less space for a body shape I love.", "design_presence", "comfort_space"),
  scenario("wheel-style-tradeoff", "design", "wheel-design", "在舒适性相近时，轮毂和灯组的设计会成为我决定车型的理由。", "With similar comfort, wheel and lighting design can decide which car I choose.", "design_presence", "running_cost"),

  scenario("service-downtime", "reliability", "repair-downtime", "车辆如果需要频繁进店，即使有很多新功能我也很难接受。", "I would struggle to accept frequent workshop visits even in a feature-rich car.", "daily_reliability", "smart_features"),
  scenario("mature-powertrain", "reliability", "mature-technology", "动力系统是否经过长期使用验证，比参数是否领先更重要。", "A powertrain's proven long-term record matters more to me than leading specifications.", "daily_reliability", "driving_engagement"),
  scenario("warranty-detail-check", "reliability", "warranty-coverage", "买车前，我会关注质保范围、限制条件以及保外维修费用。", "Before buying, I check warranty coverage, exclusions, and out-of-warranty repair costs.", "daily_reliability", "design_presence"),
  scenario("parts-availability", "reliability", "parts-supply", "常用配件是否容易买到、维修是否方便，是我选择车型的重要因素。", "Readily available parts and convenient repairs are important factors in my choice.", "daily_reliability", "brand_expression"),
  scenario("simple-controls-reliability", "reliability", "control-complexity", "我更喜欢操作直接、故障点较少的配置，而不是复杂但少用的功能。", "I prefer simple controls and fewer potential faults over complex features I rarely use.", "simplicity_reliability", "smart_features"),

  scenario("child-seat-installation", "family", "child-seat", "有儿童乘坐时，我希望安全座椅安装方便，装好后大人仍有足够空间。", "With children on board, I want easy child-seat installation and enough room for adults.", "family_fit", "design_presence", "passengers"),
  scenario("elder-entry-comfort", "family", "elder-access", "长辈经常乘坐时，我会优先考虑上下车省力、坐姿自然的车型。", "When older relatives ride often, I prioritize easy entry and a natural seating position.", "family_fit", "driving_engagement", "passengers"),
  scenario("family-opinion-weight", "family", "shared-decision", "即使车主要由我驾驶，家人的乘坐感受也会明显影响最终选择。", "Even if I am the main driver, my family's comfort strongly influences the final choice.", "family_fit", "driving_engagement", "passengers"),
  scenario("shared-car-adjustment", "family", "shared-car", "家里多人轮流开车时，我希望座椅和常用设置能够方便地切换。", "When family members share a car, I want easy switching of seat positions and daily settings.", "family_fit", "simplicity_reliability"),
  scenario("future-household-plans", "family", "future-household", "如果未来几年家庭用车需求增加，我愿意现在就预留一定空间。", "If household transport needs may grow, I would reserve some extra space now.", "family_fit", "running_cost"),

  scenario("test-drive-comparison-notes", "decision", "comparison-notes", "连续试驾几款车后，我会记录差异，再做决定。", "After test-driving several cars, I record the differences before deciding.", "p:planning_bias", "p:novelty_seeking"),
  scenario("owner-feedback-verification", "decision", "evidence-checking", "看到特别吸引人的宣传时，我会找真实车主的长期反馈来核对。", "When an advertisement is appealing, I check it against long-term owner feedback.", "p:cost_control", "p:expression_drive"),
  scenario("test-drive-extra-scenario", "decision", "test-drive-exploration", "试驾时遇到没体验过的路况，我愿意多试一段再判断。", "On a test drive, I am willing to explore unfamiliar road conditions before judging.", "p:novelty_seeking", "p:stability_preference"),
  scenario("purchase-tradeoff-ranking", "decision", "tradeoff-ranking", "选车标准冲突时，我会先排出最不能妥协的几项，再缩小范围。", "When priorities conflict, I rank my non-negotiable needs before narrowing the choices.", "p:planning_bias", "p:expression_drive"),
] as const;
