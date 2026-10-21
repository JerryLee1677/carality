# Code review

Found 8 urgent issues need to be fixed:

## 1 [P1] 生产依赖存在安全公告命中

FilePath: [package.json](/Users/admin/Desktop/Carality/package.json:20)

实际构建使用 Next.js 15.5.14。2026-10-13 对当前锁文件执行 `pnpm audit --prod --json --registry=https://registry.npmjs.org`，报告 48 项命中：3 critical、24 high、17 moderate、4 low，涉及 Next.js、PostCSS、Multer、Sharp、qs 等直接或间接依赖。

这表示安装版本落在公告影响范围内，不代表当前业务已被证明可利用。例如 critical 公告分别有 Windows 部署、AVIF 图片优化、代理 IP 信任配置等触发条件；这些条件没有在本次审查中进行攻击验证。默认 npmmirror registry 的 audit 接口不存在，直接使用默认 registry 无法完成审计。

### Suggested fix

优先核查生产部署条件和公告影响路径，更新到满足相关修复范围的兼容版本并更新锁文件。此次 Next.js 公告的修复范围最高要求至少 15.5.27，但仍需在升级时重新审计直接和间接依赖；不要仅修改 package.json 的版本范围。CI 中使用支持 audit 的 registry。

---

## 2 [P1] 手动完成测评缺少完成条件、幂等性和事务

FilePath: [assessment.service.ts](/Users/admin/Desktop/Carality/apps/api/src/modules/assessment/assessment.service.ts:581)

`completeSession()` 直接调用完成逻辑，没有使用已有的事务封装。完成逻辑仅判断会话是否存在，没有限制答题数量、检查已完成状态或返回已有结果，直接创建唯一 sessionId 对应的 SessionResult，再创建推荐和修改会话状态。

使用编译后的真实服务和内存数据库 mock 复现：零条答案也会生成人格结果并将会话设为 COMPLETED；模拟最后更新会话失败时，结果创建已先发生。真实数据库中重复完成还可能触发 SessionResult.sessionId 唯一约束错误。最后一题自动完成已经处于事务中，问题主要在公开的手动完成入口。

### Suggested fix

统一手动和自动完成入口，校验状态与完成条件，在同一事务中写入结果、推荐和会话状态；重复请求返回已有结果，补充并发完成、重试和中途失败的数据库集成测试。

---

## 3 [P1] 测评读取和写入只依赖 URL 中的 sessionId

FilePath: [assessment.controller.ts](/Users/admin/Desktop/Carality/apps/api/src/modules/assessment/assessment.controller.ts:23)

创建会话时查询登录身份，后续答题、完成、读取当前题和读取结果接口没有验证会话所有者或匿名会话凭据。知道一个 sessionId 的人可以读取该会话，并在会话进行中提交答案或完成它。CUID 难以猜测，但 ID 出现在 URL 中；共享链接或泄漏链接仍会把读写能力一起暴露。

### Suggested fix

登录测评校验 userId，匿名测评使用独立的随机访问凭据并安全保存。若结果允许公开分享，为分享建立独立的只读权限，不能让结果链接同时授予答题权限。

---

## 4 [P1] 答题失败和响应丢失后恢复不完整

FilePath: [quiz-session-client.tsx](/Users/admin/Desktop/Carality/src/components/quiz/quiz-session-client.tsx:81)

选项通过 radio 的 onChange 自动提交，失败后仍保留 selectedOptionId，没有独立重试按钮。再次点击已经选中的同一 radio 通常不会触发 onChange。若服务端已保存答案而客户端没有收到响应，客户端仍显示旧题，重发会与后端当前题校验冲突。

初始化读取失败时，没有缓存便显示和其他空状态相同的重新开始页面，缺少加载失败和重试状态；访问已完成会话的答题链接也不会跳转结果页。另一个入口 [start-quiz-button.tsx](/Users/admin/Desktop/Carality/src/components/quiz/start-quiz-button.tsx:16) 缺少 loading、防重复点击和用户可见的错误处理。

### Suggested fix

区分加载中、加载失败、完成和无效会话；开始按钮提交时禁用并展示错误。答题失败后提供明确的重试入口，网络异常或 409 时先读取服务端当前状态，再决定继续、重试或跳转结果。为答案写入设计幂等机制。

---

## 5 [P1] 不满足预算等约束的回退推荐没有向用户说明

FilePath: [assessment.service.ts](/Users/admin/Desktop/Carality/apps/api/src/modules/assessment/assessment.service.ts:1237)

当某个能源分组没有严格满足约束的车型时，算法返回该分组的不满足约束车型。使用真实评分函数和内存输入复现：预算等级对应 10 万元、唯一车型起售价 30 万元，车型仍进入推荐，diagnostics 为 `strictMatch: false`、`constraintMisses: ["budget"]`。

[recommendations/page.tsx](/Users/admin/Desktop/Carality/src/app/result/[sessionId]/recommendations/page.tsx:89) 没有展示这些诊断信息，用户看到的仍是普通推荐。现有单元测试明确覆盖了“不接受充电时仍回退推荐插电车型”，因此回退是当前设计；需要解决的是回退规则和用户知情的一致性。

### Suggested fix

明确哪些条件必须满足，哪些偏好可以放宽。预算、补能等硬条件不满足时优先展示无符合条件车型；若保留参考车型，应标明放宽了什么条件、超预算多少，并与可执行推荐区别呈现。

---

## 6 [P1] 后端缺少运行时输入校验和应用层限流

FilePath: [main.ts](/Users/admin/Desktop/Carality/apps/api/src/main.ts:8)

Nest 启动没有配置输入校验；登录和注册 DTO 是 TypeScript type，答题 DTO 也没有运行时字段验证。BFF 对部分请求做 Zod 校验，但后端 HTTP 接口本身仍接受直接请求。例如认证服务对 email 调用 trim，而不是先验证输入类型；畸形输入可能进入 500 异常路径。

应用代码和依赖中没有发现登录、注册、匿名会话创建的限流机制。生产网关是否另有防护，本次未验证。认证还使用同步 scrypt 运算，持续请求会增加事件循环阻塞压力。

### Suggested fix

在 Nest 边界统一进行运行时校验，限制字符串长度和请求体大小；对登录、注册和会话创建设置合理的限流与错误响应。将密码派生改为异步实现，补充认证成功、失败和畸形输入测试。

---

## 7 [P2] 构建和单元测试通过，但其他质量检查失败

FilePath: [package.json](/Users/admin/Desktop/Carality/package.json:11)

`pnpm lint` 因缺少 ESLint 配置进入交互式初始化并退出失败。前端完整 tsc 检查失败，包含 Vitest 全局类型缺失，以及 [quiz-session-client.test.tsx](/Users/admin/Desktop/Carality/src/components/quiz/quiz-session-client.test.tsx:329) 的回调类型错误。后端完整 tsc 检查也在多个 spec 文件中报告 Vitest 全局类型缺失。

唯一的 Playwright 测试失败：[homepage.spec.ts](/Users/admin/Desktop/Carality/tests/e2e/homepage.spec.ts:3) 断言中文首页，而全新浏览器下 [i18n.tsx](/Users/admin/Desktop/Carality/src/lib/i18n.tsx:149) 默认英文。端到端配置只启动 Next.js，尚未覆盖真实后端、数据库和完整测评流程。仓库未发现 GitHub Actions 工作流。

### Suggested fix

配置可非交互执行的 ESLint 和独立 typecheck 命令；正确处理 Vitest 类型及测试回调类型。E2E 明确设置语言，覆盖登录、答题、刷新恢复、结果和历史记录，并提供测试后端与隔离数据库。将这些检查接入 CI。

---

## 8 [P2] 错误状态传播不一致，车型不存在时无法正常进入 404

FilePath: [vehicle-repository.ts](/Users/admin/Desktop/Carality/src/modules/catalog/repository/vehicle-repository.ts:25)

车型 API 返回 404 时，assessmentApiFetch 会先抛异常，仓储无法返回 null，所以 [车型页面](/Users/admin/Desktop/Carality/src/app/cars/[slug]/page.tsx:10) 的 `if (!vehicle) notFound()` 无法处理这一情况。

[答题 BFF](/Users/admin/Desktop/Carality/src/app/api/quiz/[sessionId]/answer/route.ts:25) 将输入校验失败、后端 404、409 等都转为 502；其他 BFF 路由有的直接让异常外抛，有的将网络故障归为 400。结果页没有自定义错误边界。公共 API 请求封装没有明确的业务超时，外部故障时缺少可控恢复行为。

### Suggested fix

统一区分 400、401、403、404、409、502、504，保留可恢复的后端状态。车型仓储将真实 404 转为 null，让页面调用 notFound；增加错误边界、请求超时与用户可见的恢复入口。不要自动重试尚未支持幂等的写请求。

---

Found 7 suggestions for improvement:

## 1 [P2] 车型读取和飞书数据源适合加入缓存与定向查询

FilePath: [vehicles.service.ts](/Users/admin/Desktop/Carality/apps/api/src/modules/vehicles/vehicles.service.ts:52)

配置飞书数据源后，每次读取都重新获取 tenant token，再读取车型、标签、权重、约束四张表并遍历分页。车型详情接口也先读取全量车型再 find。结果页和推荐页分别请求结果，而结果读取又加载当前车型并重新评分。自动完成测评时，外部 HTTP 调用还可能发生在数据库事务内。

### Suggested fix

按有效期缓存 token，缓存或定期同步车型数据，支持更新失效和最近成功快照；Postgres 模式按 slug 定向查询。将外部网络请求和数据准备放到数据库事务之外，只在事务中做必要的本地读取和写入。测量查询次数、事务时长和结果页延迟后再调整缓存策略。

---

## 2 [P2] 明确历史结果快照与当前车型推荐的关系

FilePath: [assessment.service.ts](/Users/admin/Desktop/Carality/apps/api/src/modules/assessment/assessment.service.ts:802)

结果读取从最新车型目录重新计算推荐，而不是展示已保存的推荐；该行为有单元测试覆盖。车型数据或算法改变后，同一历史测评可能展示不同推荐。历史列表使用持久化 personalityProfile 的名字和 summary，结果页则动态生成显示人格，两处存在展示语义差异的可能。

### Suggested fix

明确产品是展示“测评当时结果”还是“基于原答案的当前推荐”。保存人格展示快照、规则版本、数据版本及生成时间；若要刷新推荐，提供明确入口和更新说明，并保证历史列表和结果页的人格名称一致。

---

## 3 [P2] 模块划分与实际业务实现需要对齐

FilePath: [assessment.service.ts](/Users/admin/Desktop/Carality/apps/api/src/modules/assessment/assessment.service.ts:325)

AssessmentService 长达 2117 行，集中了会话编排、人格、评分、约束、多样性和文案。EngineService、PersonalityService 和 RecommendationService 目前仍是空类。前后端各自维护结果类型，前端诊断类型缺少后端已有的 priceFit、strictMatch 和 constraintMisses 等字段。

### Suggested fix

先把纯计算的人格和推荐函数迁入现有对应模块，保持会话服务负责事务与流程。建立共享 API 契约或生成客户端，减少类型漂移；重构前补充接口行为与边界测试，避免一次性改写整个引擎。

---

## 4 [P2] 国际化只覆盖了部分页面

FilePath: [i18n.tsx](/Users/admin/Desktop/Carality/src/lib/i18n.tsx:148)

首页和问卷支持语言切换，登录、注册、历史、结果、推荐和车型详情仍大量使用固定中文。保存的语言在客户端 effect 中读取，初始默认英文，中文用户刷新时可能先看到英文再切换。未找到页面级语言路由或动态语言 metadata。

### Suggested fix

明确主要目标语言，补齐核心流程文案，使用服务端可读取的语言偏好或语言路由，让初始渲染语言一致。题目和选项翻译逐步迁入统一的内容结构，增加中英文端到端验证。

---

## 5 [P2] 人格图片和内容页面还有性能与呈现空间

FilePath: [result/page.tsx](/Users/admin/Desktop/Carality/src/app/result/[sessionId]/page.tsx:22)

public/images/personalities 约 43 MB，其中包含多张 2.4–3.3 MB 的生成原图；实际人格资源约 420 KB–1.2 MB。结果页直接使用 img，没有图片尺寸与响应式加载配置。整个目录大小不等于用户单次下载量，但原图会增大仓库和部署产物。

### Suggested fix

将未用于页面的原图移出 public，压缩实际展示资源并配置合适的图片尺寸与加载策略。为车型和指南页补充页面级标题、描述和分享预览；为动态页面加入恰当的 loading 状态。用实际图片请求和页面性能数据验证收益。

---

## 6 [P2] 认证部署与会话生命周期需要更明确

FilePath: [auth.service.ts](/Users/admin/Desktop/Carality/apps/api/src/modules/auth/auth.service.ts:130)

未配置 RSA 密钥时每个进程独立生成密钥。多实例部署中，如果取公钥和提交密码落在不同实例，会产生解密失败；注册成功后再次登录也会复用同一密文。Cookie 固定七天，而后端 TTL 可以配置，存在期限不一致。会话查询每次都触发 lastSeenAt 更新，未发现过期会话清理任务。

### Suggested fix

生产启动强制校验稳定密钥配置，多实例使用一致的密钥和明确的轮换策略；使用后端 expiresAt 设置 Cookie。降低 lastSeenAt 写入频率，增加过期/撤销会话清理和登录会话管理。补充密钥错误、过期和注销的集成测试。

---

## 7 [P2] 补齐用户转化、账户能力和推荐解释

FilePath: [analytics/route.ts](/Users/admin/Desktop/Carality/src/app/api/analytics/route.ts:10)

analytics 接口目前仅打印 console.info，未发现前端事件接入；难以判断用户从开始到完成的流失位置。注册页面明确暂不支持邮箱验证和找回密码，历史仅记录登录后开始的会话。推荐卡片主要显示车型名和理由，缺少价格、约束满足情况和数据更新时间。结果页面的“匹配度”是维度均值经 60–96 范围裁剪得到，未体现统计置信度。

### Suggested fix

优先记录开始、逐题耗时、退出题号、完成和推荐点击事件，并建立匿名数据保留规则。支持测评后登录认领当前结果、找回密码及邮箱验证；推荐卡片增加价格和约束说明。为匹配度说明计算含义，避免让用户把展示分数理解成经过验证的概率。

---

## Validation

审查日期：2026-10-13，环境：Node.js 20.19.6、pnpm 10.26.1。

| 检查 | 本次结果 |
| --- | --- |
| 前端单元测试 `pnpm test` | 12 文件、17 测试通过；部分答题测试有 act 警告 |
| 后端单元测试 `pnpm --dir apps/api test` | 12 文件、75 测试通过 |
| 前端构建 `pnpm build` | 通过，Next.js 15.5.14 |
| 后端构建 `pnpm build:api` | 通过，生成 Prisma Client 6.19.3 |
| 前端完整类型检查 `pnpm exec tsc --noEmit --incremental false` | 失败：测试全局类型、测试回调类型 |
| 后端完整类型检查 `pnpm --dir apps/api exec tsc --noEmit --incremental false` | 失败：多个 spec 的测试全局类型 |
| `pnpm lint` | 失败：缺少 ESLint 配置，进入交互式初始化 |
| `pnpm test:e2e` | 唯一测试失败：中文断言与默认英文不一致 |
| 生产依赖 audit（npm 官方 registry） | 48 项公告命中：3 critical、24 high、17 moderate、4 low |
| 零答题完成、完成中途失败、超预算回退 | 真实编译服务/算法 + 内存 mock 复现；未写真实数据库 |

此次没有执行真实数据库的完整测评流程、生产安全攻击验证、并发压测或移动端视觉验收；单元测试通过不替代这些验证。推荐回退和结果实时重算是已有测试明确覆盖的行为，报告将其作为产品规则与呈现问题讨论。

建议按三步推进：先修依赖安全、测评完成与权限；再修答题恢复、错误状态和 CI；最后改进数据缓存、模块结构、国际化、内容与转化。

是否要按以上 Suggested fix 先实施第一批修复？
