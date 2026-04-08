# Carality Assessment Business Upgrade Design

## Goal

把当前“可运行的演示版问卷”升级为“业务上更可信的购车测评 MVP”。核心变化不是继续补技术链路，而是补足真实购车决策所需的题目维度、trait 体系和车型匹配逻辑，让推荐结果同时具备约束合理性与偏好解释力。

## Current Gaps

当前版本已经具备真实前端、真实后端、真实数据库、自适应下一题选择和数据库化人格规则，但业务上仍有明显缺口：

1. 题量太少
- 当前题库只有 12 题，无法稳定刻画用户购车需求。

2. 维度偏软
- 现有题目更偏生活方式、表达倾向、智能偏好。
- 对预算、家庭结构、能源补能条件、使用年限等硬变量覆盖不足。

3. 推荐逻辑偏“加权排序”
- 当前后端做法是累计 trait 后与车型权重相乘。
- 这种方法适合偏好匹配，但不适合真实购车的“先过滤、再排序”逻辑。

4. 画像解释强于车型约束
- 目前画像和推荐理由已经能生成，但车型适配的客观边界还不够强。

## Design Principles

1. 先满足约束，再表达偏好
- 推荐逻辑必须先判断“是否适合”，再判断“是否喜欢”。

2. 题库要覆盖真实购车链路
- 问卷必须同时包含预算能力、家庭场景、使用环境、能源接受度、驾驶风格、品牌偏好等维度。

3. 单次问卷不必问完全部题库
- 题库总量要明显扩大，但每位用户仍然走自适应路径。

4. trait 必须分层
- 把影响推荐的 trait 分成硬约束 trait、场景 trait、偏好 trait、人格 trait。

## Target Trait Model

### 1. Hard Constraint Traits

用于过滤车型，不满足则直接排除或大幅惩罚：

- `budget_level`
- `monthly_payment_sensitivity`
- `family_size`
- `has_children`
- `has_elder_passengers`
- `cargo_space_need`
- `charging_access`
- `long_distance_frequency`
- `parking_constraint`
- `ownership_horizon`
- `resale_sensitivity`
- `energy_acceptance_ev`
- `energy_acceptance_phev`
- `energy_acceptance_ice`

### 2. Scenario Traits

用于判断真实用车重心：

- `urban_commute_density`
- `suburban_family_usage`
- `intercity_highway_usage`
- `weekend_trip_frequency`
- `full_load_frequency`
- `daily_reliability`
- `comfort_space`
- `family_fit`
- `running_cost`
- `simplicity_reliability`

### 3. Preference Traits

用于剩余车型排序：

- `smart_features`
- `driving_engagement`
- `brand_expression`
- `design_presence`
- `control_preference`
- `cost_control`
- `novelty_seeking`
- `expression_drive`
- `stability_preference`
- `planning_bias`

### 4. Persona Traits

用于人格画像命中、推荐理由生成与视觉表达：

- `social_confidence`
- `novelty_seeking`
- `expression_drive`
- `stability_preference`
- `planning_bias`
- `control_preference`
- `cost_control`

## Question Bank Blueprint

目标不是把所有题都问给所有用户，而是先把题库扩到至少 40 到 50 题。

### Module A: Budget And Purchase Constraints

建议 8 到 10 题：

- 收入区间
- 可接受裸车预算
- 是否接受贷款/月供
- 对后期维护成本敏感度
- 是否在意保值率
- 购车身份：首购、增购、换购
- 车辆预期使用年限
- 是否优先“稳定不折腾”

这些题主要写入：
- `budget_level`
- `monthly_payment_sensitivity`
- `cost_control`
- `ownership_horizon`
- `resale_sensitivity`

### Module B: Family Structure

建议 6 到 8 题：

- 家庭成员数量
- 是否经常满载
- 是否有儿童座椅需求
- 是否有老人同乘
- 是否需要大后备厢
- 周末是否以家庭出行为主

这些题主要写入：
- `family_size`
- `has_children`
- `has_elder_passengers`
- `cargo_space_need`
- `family_fit`
- `comfort_space`

### Module C: Daily Usage Environment

建议 8 到 10 题：

- 通勤距离
- 城市拥堵程度
- 停车难度
- 是否常走高速
- 是否常跑长途
- 是否经常跨城
- 日常使用是否以市区短途为主
- 居住环境是否方便安装充电桩

这些题主要写入：
- `urban_commute_density`
- `intercity_highway_usage`
- `parking_constraint`
- `long_distance_frequency`
- `charging_access`

### Module D: Energy Acceptance

建议 4 到 6 题：

- 能否接受纯电
- 是否接受增程/插混
- 是否担心补能时间
- 是否经常无固定停车位
- 是否能接受冬季续航波动

这些题主要写入：
- `energy_acceptance_ev`
- `energy_acceptance_phev`
- `energy_acceptance_ice`
- `charging_access`

### Module E: Driving Style

建议 5 到 7 题：

- 喜欢稳还是喜欢快响应
- 更在意操控还是省心
- 是否喜欢主动驾驶
- 是否偏佛系驾驶
- 是否愿意适应新驾驶辅助

这些题主要写入：
- `driving_engagement`
- `control_preference`
- `stability_preference`
- `smart_features`

### Module F: Brand And Emotional Value

建议 5 到 7 题：

- 是否在意品牌认知
- 是否在意车的设计表达
- 是否偏新势力
- 是否接受小众品牌
- 如果配置相近，会不会为颜值和质感多付费

这些题主要写入：
- `brand_expression`
- `design_presence`
- `expression_drive`
- `novelty_seeking`

### Module G: Life Decision Style

建议 8 到 10 题：

- 聚会中的社交方式
- 旅行中的角色分工
- 大额消费时的决策方式
- 遇到新技术时的态度
- 对风险和变化的接受程度

这些题主要写入：
- `planning_bias`
- `social_confidence`
- `novelty_seeking`
- `stability_preference`
- `expression_drive`

## Adaptive Question Flow

单次问卷建议答 10 到 14 题，不再固定死问全部题。

推荐流程：

1. 前 4 题必须覆盖关键硬约束
- 预算
- 家庭
- 用车环境
- 能源接受度

2. 中间 4 到 6 题覆盖核心场景和驾驶风格
- 通勤
- 家庭出行
- 停车环境
- 长途使用
- 驾驶倾向

3. 最后 2 到 4 题用于个性补充
- 品牌
- 智能偏好
- 设计表达
- 人格补充题

4. 分支规则继续保留
- 但不再只围绕“稳健务实 vs 表达探索”
- 分支会更多围绕场景方向，例如：
  - 家庭导向
  - 通勤导向
  - 长途导向
  - 科技导向
  - 驾驶导向

## Recommendation Algorithm Upgrade

### Current Algorithm

当前算法是：

1. 选项写入 trait snapshot
2. 累计所有 trait
3. 画像规则打分
4. 每台车按 traitWeights 求和排序

这是可工作的，但不够业务化。

### Target Algorithm

升级为两阶段：

#### Phase 1: Hard Filtering

先根据硬约束 trait 过滤车型：

- 预算明显不匹配
- 家庭人数与空间需求不匹配
- 无充电条件但纯电接受度低
- 高频长途但能源方案不匹配
- 停车环境极差但车身/使用属性不匹配
- 预计使用周期很长但用户容忍度与车型特征不匹配

这些规则进入数据库，建议新增或复用规则表表达：

- `vehicle_constraint_rule`
- 或将 `VehicleTraitWeight` 扩展为同时支持 `FILTER` 与 `SCORE`

#### Phase 2: Weighted Ranking

对过滤后的车型再按偏好 trait 打分：

- `comfort_space`
- `family_fit`
- `running_cost`
- `smart_features`
- `driving_engagement`
- `brand_expression`
- `design_presence`
- `stability_preference`
- `novelty_seeking`

#### Phase 3: Explanation Assembly

推荐理由要分成三类：

1. 约束匹配理由
- “预算和家庭场景更匹配”

2. 使用场景理由
- “适合高频通勤 / 周末家庭出行 / 长途补能节奏”

3. 偏好画像理由
- “更符合你对智能体验 / 驾驶参与感 / 稳定省心的偏好”

## Database Impact

下一阶段数据库需要补的不是一次性大迁移，而是业务字段和规则能力：

1. 问题和选项数据继续放数据库
- 已具备

2. 题目规则需要扩展
- 支持更多分支
- 支持模块优先级
- 支持“硬约束优先抽题”

3. 车型侧需要扩展
- 增加车型硬约束标签或规则
- 增加能源、空间、预算段、家庭适配、通勤适配等结构化属性

4. 推荐规则需要分层
- 过滤规则
- 排序权重
- 解释模板

## MVP Scope

这次业务升级的 MVP 目标不是一次性做到“完整购车顾问系统”，而是先做到以下标准：

1. 题库扩到 40 到 50 题
2. 单次测评问 10 到 14 题
3. 题目覆盖预算、家庭、环境、能源、驾驶、品牌、人格 7 大模块
4. 车型库扩到至少 20 台
5. 推荐逻辑升级为“硬过滤 + 偏好排序”
6. 推荐理由能同时解释：
- 为什么适合
- 适合什么场景
- 为什么比其他车更靠前

## Non-Goals

当前阶段不做：

1. 机器学习训练
2. 用户行为学习闭环
3. 后台配置系统
4. 动态题目运营平台
5. 真实销量/外部行情联动

这些都可以在后续版本再接。

## Execution Order

建议按下面顺序进入实现：

1. 先重构 trait 体系和车型匹配模型
2. 再扩 question seed 与 vehicle seed
3. 再把推荐逻辑升级为两阶段
4. 最后优化前端结果解释与展示

这样可以确保题库扩容不会建立在错误的业务模型上。
