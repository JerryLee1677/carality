# Carality

Carality 是一个汽车人格测试与选车推荐网站。

## Local Development

1. 安装依赖：`pnpm install`
2. 启动开发环境：`pnpm dev`

## Testing

- `pnpm test`
- `pnpm test:e2e`

## Backend Foundation

- Web app 继续保留在仓库根目录。
- 新的独立后端骨架位于 `apps/api`，用于后续承接动态选题、人格计算和车型推荐。
- 后端 Prisma schema 位于 `apps/api/prisma/schema.prisma`，当前阶段只完成结构设计和服务骨架，尚未执行依赖安装、迁移和数据导入。
- API 迁移文件位于 `apps/api/prisma/migrations`。
- API 样例 seed 位于 `apps/api/prisma/seed.ts`，用于导入首批人格标签、样例题目和车型数据。

数据库模型、种子数据、环境变量和部署说明会在后续任务继续补齐。
