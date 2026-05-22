# API Prisma Schema

后端测评服务使用的 PostgreSQL 数据模型，路径：`apps/api/prisma/schema.prisma`。

## 模型分组

- `Question`, `QuestionOption`, `OptionEffect`, `QuestionBranchRule` — 题库与分支规则
- `AssessmentSession`, `AssessmentAnswer`, `SessionTraitSnapshot`, `SessionQuestionCandidate` — 测评运行时状态
- `PersonalityProfile`, `SessionResult`, `SessionVehicleRecommendation` — 结果与人格画像
- `Vehicle`, `VehicleTraitWeight`, `VehicleTag`, `VehicleTagMapping`, `VehicleConstraintRule` — 推荐车型目录
- `User`, `AuthSession` — 账号与登录会话

## 常用命令

在仓库根目录执行（会代理到 `apps/api`）：

```bash
pnpm db:migrate
pnpm db:seed
pnpm db:studio
```

或在 `apps/api` 目录下直接执行 `pnpm prisma:migrate:dev` 等脚本。

环境变量：`apps/api/.env` 中的 `DATABASE_URL`（参考 `apps/api/.env.example`）。
