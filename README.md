# Carality

Carality 是一个汽车人格测试与选车推荐网站。用户通过自适应问卷完成测评，获得人格画像与车型推荐；登录后可查看历史测评记录。

## 架构

```text
浏览器
  └── Next.js（端口 1677）— 页面 + BFF API Routes（/api/*）
        └── HTTP → NestJS API（端口 4010，apps/api）
              └── Prisma → PostgreSQL（库名通常为 carality_assessment）
```

| 层级 | 路径 | 职责 |
|------|------|------|
| 前端 | `src/app/` | 页面、登录注册、测评 UI |
| BFF | `src/app/api/` | 转发请求到 Nest API，设置登录 Cookie |
| 后端 | `apps/api/` | 测评引擎、人格计算、车型推荐、用户与会话 |
| 数据库 | `apps/api/prisma/` | Schema、迁移、种子数据 |
| 静态内容 | `src/data/` | 购车指南、部分车型展示页用的本地车型数据 |

**数据存储说明**

- **PostgreSQL**（唯一数据库）：题目、车型目录、测评会话、用户账号、登录会话、推荐结果等。
- **静态 TS 文件**：`/cars`、`/guides` 部分页面仍读取 `src/data/vehicles/vehicles.ts` 与 `src/data/content/buying-guides.ts`，不经过数据库。

## 当前功能

- **汽车人格测评**：极速版 / 标准版自适应选题，匿名可完成。
- **测评结果**：人格画像说明、车型推荐列表与推荐理由。
- **用户系统**：邮箱注册 / 登录（浏览器 RSA 加密密码，服务端 scrypt 存哈希）。
- **历史记录**：登录用户在 `/account/history` 查看已完成的测评。
- **内容浏览**：购车指南、部分车型详情页（静态数据）。

## 环境要求

- Node.js 18+
- [pnpm](https://pnpm.io/)
- PostgreSQL 16（本地示例使用 Homebrew：`brew install postgresql@16`）

## 本地开发

### 1. 安装依赖

```bash
pnpm install
```

### 2. 配置环境变量

数据库与 API 配置在 **`apps/api/.env`**（勿提交 Git）：

```bash
cp apps/api/.env.example apps/api/.env
# 按本机 Postgres 账号修改 DATABASE_URL
```

示例（见 `apps/api/.env.example`）：

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/carality_assessment"
PORT="4010"
```

前端可选覆盖 API 地址（默认 `http://127.0.0.1:4010`）：

```env
ASSESSMENT_API_BASE_URL="http://127.0.0.1:4010"
```

### 3. 启动 PostgreSQL

```bash
# Homebrew 示例
brew services start postgresql@16

# 创建数据库（若尚未创建）
createdb carality_assessment
```

停止 / 重启：

```bash
brew services stop postgresql@16
brew services start postgresql@16
```

### 4. 迁移与种子数据

```bash
pnpm db:migrate    # 应用 apps/api/prisma/migrations
pnpm db:seed       # 导入题目、人格、车型等样例数据
```

### 5. 启动应用（需要两个终端）

```bash
# 终端 1：Nest API
pnpm dev:api

# 终端 2：Next.js 前端
pnpm dev
```

访问：<http://localhost:1677>

仅启动 `pnpm dev` 时，页面可打开，但测评、登录等依赖 API 的功能会失败。

## 常用命令

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 启动 Next.js（1677） |
| `pnpm dev:api` | 启动 Nest API（4010） |
| `pnpm db:migrate` | 开发环境数据库迁移 |
| `pnpm db:seed` | 重置并导入种子数据 |
| `pnpm db:studio` | Prisma Studio 浏览数据库 |
| `pnpm test` | 单元测试 |
| `pnpm test:e2e` | Playwright E2E |

## 目录结构（精简）

```text
Carality/
├── src/                    # Next.js 前端
│   ├── app/                # 页面与 /api BFF
│   ├── components/
│   ├── data/               # 静态指南、展示用车型
│   └── lib/                # assessment-api、auth-session 等
├── apps/api/               # NestJS 后端
│   ├── prisma/             # schema、migrations、seed-data
│   └── src/modules/        # assessment、auth、history …
└── package.json
```

## 开源与安全

- 仓库中的 `apps/api/.env.example` 仅为占位符，**不含**真实数据库密码。
- 真实用户与测评数据在本地 / 生产 PostgreSQL 中，不会随代码仓库公开。
- 提交前请确认未将 `apps/api/.env`、数据库 dump 或 RSA 私钥加入 Git。
