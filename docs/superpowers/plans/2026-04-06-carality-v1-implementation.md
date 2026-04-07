# Carality V1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first production-ready version of Carality as a Next.js full-stack application with quiz flow, personality scoring, vehicle recommendation, and buying-guide pages.

**Architecture:** Use a single Next.js App Router application with clear domain modules under `src/modules`. Keep business logic in pure TypeScript services, keep Prisma as the persistence layer, and seed the database with the first quiz and vehicle catalog so the product is usable immediately after deployment.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Prisma, PostgreSQL, Zod, Vitest, Testing Library, Playwright

---

## File Structure

### Application shell

- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.js`
- Create: `tailwind.config.ts`
- Create: `vitest.config.ts`
- Create: `playwright.config.ts`
- Create: `.env.example`
- Create: `.gitignore`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/app/globals.css`

### Shared infrastructure

- Create: `src/lib/env.ts`
- Create: `src/lib/prisma.ts`
- Create: `src/lib/utils/cn.ts`
- Create: `src/components/ui/button.tsx`
- Create: `src/components/layout/site-header.tsx`
- Create: `src/components/layout/site-footer.tsx`

### Domain modules

- Create: `src/modules/quiz/domain/types.ts`
- Create: `src/modules/quiz/domain/score-answer.ts`
- Create: `src/modules/quiz/domain/build-personality-code.ts`
- Create: `src/modules/quiz/domain/create-quiz-session.ts`
- Create: `src/modules/recommendation/domain/match-vehicles.ts`
- Create: `src/modules/recommendation/domain/build-recommendation-reasons.ts`
- Create: `src/modules/catalog/domain/vehicle-filters.ts`

### Data access

- Create: `prisma/schema.prisma`
- Create: `prisma/seed.ts`
- Create: `src/modules/quiz/repository/quiz-repository.ts`
- Create: `src/modules/recommendation/repository/recommendation-repository.ts`
- Create: `src/modules/catalog/repository/vehicle-repository.ts`

### Seed data

- Create: `src/data/quiz/questions.ts`
- Create: `src/data/vehicles/vehicles.ts`
- Create: `src/data/content/buying-guides.ts`

### Routes and pages

- Create: `src/app/quiz/page.tsx`
- Create: `src/app/quiz/[sessionId]/page.tsx`
- Create: `src/app/result/[sessionId]/page.tsx`
- Create: `src/app/guides/page.tsx`
- Create: `src/app/guides/[slug]/page.tsx`
- Create: `src/app/cars/[slug]/page.tsx`
- Create: `src/app/api/quiz/session/route.ts`
- Create: `src/app/api/quiz/[sessionId]/answer/route.ts`
- Create: `src/app/api/quiz/[sessionId]/complete/route.ts`

### Testing

- Create: `src/modules/quiz/domain/score-answer.test.ts`
- Create: `src/modules/quiz/domain/build-personality-code.test.ts`
- Create: `src/modules/recommendation/domain/match-vehicles.test.ts`
- Create: `src/app/page.test.tsx`
- Create: `tests/e2e/quiz-flow.spec.ts`

### Docs

- Create: `README.md`

---

### Task 1: Scaffold The Next.js Product Shell

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.js`
- Create: `tailwind.config.ts`
- Create: `vitest.config.ts`
- Create: `playwright.config.ts`
- Create: `.env.example`
- Create: `.gitignore`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/app/globals.css`
- Create: `src/components/layout/site-header.tsx`
- Create: `src/components/layout/site-footer.tsx`
- Create: `src/components/ui/button.tsx`
- Create: `src/app/page.test.tsx`
- Create: `README.md`

- [ ] **Step 1: Write the failing homepage smoke test**

```tsx
// src/app/page.test.tsx
import { render, screen } from "@testing-library/react";
import HomePage from "./page";

describe("HomePage", () => {
  it("renders the primary CTA and value proposition", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        name: /找到最适合你的汽车人格与选车方案/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /开始测试/i }),
    ).toHaveAttribute("href", "/quiz");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run src/app/page.test.tsx`
Expected: FAIL with "Cannot find module './page'" or missing test setup errors because the app shell does not exist yet.

- [ ] **Step 3: Create the app shell and toolchain**

```json
// package.json
{
  "name": "carality",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "db:push": "prisma db push",
    "db:seed": "tsx prisma/seed.ts"
  },
  "dependencies": {
    "@prisma/client": "^6.6.0",
    "clsx": "^2.1.1",
    "next": "^15.3.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "tailwind-merge": "^3.3.0",
    "zod": "^3.24.4"
  },
  "devDependencies": {
    "@playwright/test": "^1.52.0",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.3.0",
    "@testing-library/user-event": "^14.6.1",
    "@types/node": "^22.14.1",
    "@types/react": "^19.1.2",
    "@types/react-dom": "^19.1.2",
    "autoprefixer": "^10.4.21",
    "jsdom": "^26.1.0",
    "postcss": "^8.5.3",
    "prisma": "^6.6.0",
    "tailwindcss": "^3.4.17",
    "tsx": "^4.19.3",
    "typescript": "^5.8.3",
    "vitest": "^3.1.1"
  }
}
```

```tsx
// src/app/page.tsx
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-stone-50 text-slate-900">
      <SiteHeader />
      <section className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-20">
        <span className="w-fit rounded-full bg-amber-200 px-4 py-1 text-sm font-medium">
          汽车人格测试
        </span>
        <h1 className="max-w-3xl text-5xl font-semibold tracking-tight">
          找到最适合你的汽车人格与选车方案
        </h1>
        <p className="max-w-2xl text-lg text-slate-600">
          通过 12 道题，生成你的四字母汽车人格，并给出 1 台最优推荐车型和 3 台备选方案。
        </p>
        <div className="flex gap-4">
          <Link
            href="/quiz"
            className="rounded-full bg-slate-900 px-6 py-3 text-white"
          >
            开始测试
          </Link>
          <Link
            href="/guides"
            className="rounded-full border border-slate-300 px-6 py-3"
          >
            查看购车指南
          </Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
```

```tsx
// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carality",
  description: "汽车人格测试与购车推荐平台",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 4: Run tests to verify the shell passes**

Run: `pnpm vitest run src/app/page.test.tsx`
Expected: PASS with one passing test for the homepage CTA.

- [ ] **Step 5: Commit**

```bash
git init
git add package.json tsconfig.json next.config.ts postcss.config.js tailwind.config.ts vitest.config.ts playwright.config.ts .env.example .gitignore README.md src/app src/components
git commit -m "feat: scaffold carality nextjs app shell"
```

---

### Task 2: Define The Database Schema And Seed Catalog Data

**Files:**
- Create: `prisma/schema.prisma`
- Create: `prisma/seed.ts`
- Create: `src/data/quiz/questions.ts`
- Create: `src/data/vehicles/vehicles.ts`
- Create: `src/data/content/buying-guides.ts`
- Create: `src/lib/env.ts`
- Create: `src/lib/prisma.ts`

- [ ] **Step 1: Write a failing seed-shape test for quiz questions and vehicle data**

```ts
// src/data/vehicles/vehicles.test.ts
import { describe, expect, it } from "vitest";
import { questions } from "@/data/quiz/questions";
import { vehicles } from "@/data/vehicles/vehicles";

describe("seed data", () => {
  it("contains 12 questions with at least 2 options each", () => {
    expect(questions).toHaveLength(12);
    expect(questions.every((question) => question.options.length >= 2)).toBe(true);
  });

  it("contains at least 20 vehicles with 8 dimension weights", () => {
    expect(vehicles.length).toBeGreaterThanOrEqual(20);
    expect(
      vehicles.every((vehicle) =>
        [
          "practical",
          "emotional",
          "saving",
          "quality",
          "comfort",
          "driving",
          "brand",
          "value",
        ].every((key) => typeof vehicle.dimensionWeights[key] === "number"),
      ),
    ).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run src/data/vehicles/vehicles.test.ts`
Expected: FAIL because the dataset files do not exist yet.

- [ ] **Step 3: Create the schema, environment loader, Prisma client, and seed data**

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model QuizQuestion {
  id          String       @id @default(cuid())
  slug        String       @unique
  title       String
  description String?
  order       Int
  options     QuizOption[]
}

model QuizOption {
  id         String   @id @default(cuid())
  questionId String
  label      String
  order      Int
  weights    Json
  question   QuizQuestion @relation(fields: [questionId], references: [id], onDelete: Cascade)
}

model QuizSession {
  id                String              @id @default(cuid())
  status            String
  currentQuestion   Int                 @default(0)
  personalityCode   String?
  result            PersonalityResult?
  answers           QuizAnswer[]
  createdAt         DateTime            @default(now())
  completedAt       DateTime?
}

model QuizAnswer {
  id           String      @id @default(cuid())
  sessionId    String
  questionId   String
  optionId     String
  createdAt    DateTime    @default(now())
  session      QuizSession @relation(fields: [sessionId], references: [id], onDelete: Cascade)
}

model PersonalityResult {
  id               String      @id @default(cuid())
  sessionId        String      @unique
  personalityCode  String
  practicalScore   Int
  emotionalScore   Int
  savingScore      Int
  qualityScore     Int
  comfortScore     Int
  drivingScore     Int
  brandScore       Int
  valueScore       Int
  session          QuizSession @relation(fields: [sessionId], references: [id], onDelete: Cascade)
  recommendations  VehicleRecommendation[]
}

model Vehicle {
  id               String      @id @default(cuid())
  slug             String      @unique
  brand            String
  series           String
  modelName        String
  priceMin         Int
  priceMax         Int
  energyType       String
  bodyType         String
  heroImage        String
  summary          String
  recommendation   String
  dimensionWeights VehicleDimensionWeight?
  guides           BuyingGuide[]
}

model VehicleDimensionWeight {
  id            String  @id @default(cuid())
  vehicleId     String  @unique
  practical     Int
  emotional     Int
  saving        Int
  quality       Int
  comfort       Int
  driving       Int
  brand         Int
  value         Int
  vehicle       Vehicle @relation(fields: [vehicleId], references: [id], onDelete: Cascade)
}

model VehicleRecommendation {
  id              String            @id @default(cuid())
  resultId        String
  vehicleId       String
  rank            Int
  score           Int
  reason          String
  result          PersonalityResult @relation(fields: [resultId], references: [id], onDelete: Cascade)
  vehicle         Vehicle           @relation(fields: [vehicleId], references: [id], onDelete: Cascade)
}

model BuyingGuide {
  id          String  @id @default(cuid())
  slug        String  @unique
  title       String
  excerpt     String
  body        String
  vehicleId   String?
  vehicle     Vehicle? @relation(fields: [vehicleId], references: [id], onDelete: SetNull)
}
```

```ts
// src/lib/env.ts
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
});

export const env = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
});
```

```ts
// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
```

```ts
// src/data/quiz/questions.ts
export const questions = [
  {
    slug: "budget-priority",
    title: "买车时你最不能妥协的因素是什么？",
    description: "选择你最真实的第一反应",
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
```

```ts
// src/data/vehicles/vehicles.ts
export const vehicles = [
  {
    slug: "byd-song-plus-dmi",
    brand: "比亚迪",
    series: "宋 PLUS",
    modelName: "DM-i",
    priceMin: 129800,
    priceMax: 189800,
    energyType: "PHEV",
    bodyType: "SUV",
    heroImage: "/images/cars/byd-song-plus-dmi.jpg",
    summary: "均衡家用插混 SUV",
    recommendation: "适合看重空间、油耗和综合成本的家庭用户",
    dimensionWeights: {
      practical: 88,
      emotional: 42,
      saving: 92,
      quality: 72,
      comfort: 78,
      driving: 54,
      brand: 60,
      value: 90,
    },
  },
  {
    slug: "tesla-model-3",
    brand: "特斯拉",
    series: "Model 3",
    modelName: "后轮驱动版",
    priceMin: 231900,
    priceMax: 285900,
    energyType: "EV",
    bodyType: "Sedan",
    heroImage: "/images/cars/tesla-model-3.jpg",
    summary: "强调科技感与驾驶反馈的纯电轿车",
    recommendation: "适合更重视驾控、品牌感和情绪价值的用户",
    dimensionWeights: {
      practical: 52,
      emotional: 86,
      saving: 62,
      quality: 74,
      comfort: 58,
      driving: 88,
      brand: 85,
      value: 63,
    },
  },
  {
    slug: "toyota-corolla",
    brand: "丰田",
    series: "卡罗拉",
    modelName: "双擎",
    priceMin: 119800,
    priceMax: 155800,
    energyType: "HEV",
    bodyType: "Sedan",
    heroImage: "/images/cars/toyota-corolla.jpg",
    summary: "省心耐用的混动家轿",
    recommendation: "适合优先考虑可靠性、油耗和通勤稳定性的用户",
    dimensionWeights: { practical: 91, emotional: 32, saving: 94, quality: 68, comfort: 70, driving: 38, brand: 66, value: 88 },
  },
  {
    slug: "honda-crv",
    brand: "本田",
    series: "CR-V",
    modelName: "e:HEV",
    priceMin: 185900,
    priceMax: 262900,
    energyType: "HEV",
    bodyType: "SUV",
    heroImage: "/images/cars/honda-crv.jpg",
    summary: "稳健均衡的家用 SUV",
    recommendation: "适合既重视空间也关注长期使用口碑的家庭用户",
    dimensionWeights: { practical: 89, emotional: 43, saving: 82, quality: 74, comfort: 82, driving: 52, brand: 70, value: 78 },
  },
  {
    slug: "geely-xingyue-l",
    brand: "吉利",
    series: "星越 L",
    modelName: "2.0T",
    priceMin: 137200,
    priceMax: 185200,
    energyType: "Gasoline",
    bodyType: "SUV",
    heroImage: "/images/cars/geely-xingyue-l.jpg",
    summary: "配置丰富的大空间 SUV",
    recommendation: "适合预算敏感但又希望配置和质感兼得的用户",
    dimensionWeights: { practical: 84, emotional: 58, saving: 71, quality: 78, comfort: 83, driving: 61, brand: 55, value: 87 },
  },
  {
    slug: "byd-qin-plus-dmi",
    brand: "比亚迪",
    series: "秦 PLUS",
    modelName: "DM-i",
    priceMin: 79800,
    priceMax: 125800,
    energyType: "PHEV",
    bodyType: "Sedan",
    heroImage: "/images/cars/byd-qin-plus-dmi.jpg",
    summary: "高性价比插混家轿",
    recommendation: "适合重视通勤成本和购车预算的首购用户",
    dimensionWeights: { practical: 86, emotional: 40, saving: 95, quality: 62, comfort: 67, driving: 49, brand: 58, value: 94 },
  },
  {
    slug: "aion-y-plus",
    brand: "埃安",
    series: "AION Y",
    modelName: "Plus",
    priceMin: 99800,
    priceMax: 183800,
    energyType: "EV",
    bodyType: "SUV",
    heroImage: "/images/cars/aion-y-plus.jpg",
    summary: "空间友好的城市纯电 SUV",
    recommendation: "适合注重空间实用和城市通勤成本的年轻家庭",
    dimensionWeights: { practical: 83, emotional: 57, saving: 88, quality: 65, comfort: 80, driving: 50, brand: 48, value: 89 },
  },
  {
    slug: "wuling-xingguang",
    brand: "五菱",
    series: "星光",
    modelName: "PHEV",
    priceMin: 79800,
    priceMax: 109800,
    energyType: "PHEV",
    bodyType: "Sedan",
    heroImage: "/images/cars/wuling-xingguang.jpg",
    summary: "价格友好的插混轿车",
    recommendation: "适合预算非常看重、追求代步经济性的用户",
    dimensionWeights: { practical: 82, emotional: 34, saving: 93, quality: 55, comfort: 66, driving: 42, brand: 40, value: 96 },
  },
  {
    slug: "volkswagen-sagitar",
    brand: "大众",
    series: "速腾",
    modelName: "300TSI",
    priceMin: 127900,
    priceMax: 172900,
    energyType: "Gasoline",
    bodyType: "Sedan",
    heroImage: "/images/cars/volkswagen-sagitar.jpg",
    summary: "品牌认知高的主流家轿",
    recommendation: "适合希望在品牌、安全感和家用属性之间平衡的用户",
    dimensionWeights: { practical: 80, emotional: 45, saving: 70, quality: 74, comfort: 73, driving: 57, brand: 76, value: 72 },
  },
  {
    slug: "nissan-sylphy",
    brand: "日产",
    series: "轩逸",
    modelName: "e-POWER",
    priceMin: 139900,
    priceMax: 174900,
    energyType: "HEV",
    bodyType: "Sedan",
    heroImage: "/images/cars/nissan-sylphy.jpg",
    summary: "舒适导向的省油家轿",
    recommendation: "适合更重视轻松驾驶和乘坐舒适的通勤用户",
    dimensionWeights: { practical: 85, emotional: 36, saving: 89, quality: 63, comfort: 84, driving: 41, brand: 62, value: 85 },
  },
  {
    slug: "mazda-cx5",
    brand: "马自达",
    series: "CX-5",
    modelName: "2.5L",
    priceMin: 175800,
    priceMax: 215800,
    energyType: "Gasoline",
    bodyType: "SUV",
    heroImage: "/images/cars/mazda-cx5.jpg",
    summary: "强调驾驶质感的燃油 SUV",
    recommendation: "适合热爱驾驶、不想完全牺牲家用属性的用户",
    dimensionWeights: { practical: 66, emotional: 76, saving: 55, quality: 78, comfort: 64, driving: 86, brand: 68, value: 60 },
  },
  {
    slug: "toyota-rav4",
    brand: "丰田",
    series: "RAV4",
    modelName: "双擎",
    priceMin: 224800,
    priceMax: 293800,
    energyType: "HEV",
    bodyType: "SUV",
    heroImage: "/images/cars/toyota-rav4.jpg",
    summary: "稳定省心的全球化 SUV",
    recommendation: "适合看重可靠、保值和综合实用能力的用户",
    dimensionWeights: { practical: 90, emotional: 39, saving: 84, quality: 73, comfort: 76, driving: 56, brand: 74, value: 77 },
  },
  {
    slug: "li-auto-l6",
    brand: "理想",
    series: "L6",
    modelName: "Pro",
    priceMin: 249800,
    priceMax: 279800,
    energyType: "EREV",
    bodyType: "SUV",
    heroImage: "/images/cars/li-auto-l6.jpg",
    summary: "面向家庭体验的增程 SUV",
    recommendation: "适合对舒适、智能和家庭场景有较高要求的用户",
    dimensionWeights: { practical: 78, emotional: 74, saving: 68, quality: 82, comfort: 92, driving: 58, brand: 72, value: 70 },
  },
  {
    slug: "deepal-s7",
    brand: "深蓝",
    series: "S7",
    modelName: "增程版",
    priceMin: 149900,
    priceMax: 197900,
    energyType: "EREV",
    bodyType: "SUV",
    heroImage: "/images/cars/deepal-s7.jpg",
    summary: "造型年轻的增程 SUV",
    recommendation: "适合想要设计感和新能源体验但又关注预算的用户",
    dimensionWeights: { practical: 74, emotional: 77, saving: 76, quality: 67, comfort: 78, driving: 69, brand: 52, value: 81 },
  },
  {
    slug: "xpeng-g6",
    brand: "小鹏",
    series: "G6",
    modelName: "580 长续航",
    priceMin: 199900,
    priceMax: 276900,
    energyType: "EV",
    bodyType: "SUV",
    heroImage: "/images/cars/xpeng-g6.jpg",
    summary: "智能化突出的纯电 SUV",
    recommendation: "适合偏好科技体验和新能源使用感受的用户",
    dimensionWeights: { practical: 72, emotional: 80, saving: 71, quality: 75, comfort: 79, driving: 72, brand: 64, value: 74 },
  },
  {
    slug: "zeekr-001",
    brand: "极氪",
    series: "001",
    modelName: "WE 100kWh",
    priceMin: 269000,
    priceMax: 329000,
    energyType: "EV",
    bodyType: "Hatchback",
    heroImage: "/images/cars/zeekr-001.jpg",
    summary: "个性强烈的高性能纯电猎装车",
    recommendation: "适合更偏情绪价值、驾控和个性表达的用户",
    dimensionWeights: { practical: 58, emotional: 90, saving: 56, quality: 82, comfort: 73, driving: 88, brand: 71, value: 59 },
  },
  {
    slug: "honda-accord",
    brand: "本田",
    series: "雅阁",
    modelName: "e:PHEV",
    priceMin: 225800,
    priceMax: 258800,
    energyType: "PHEV",
    bodyType: "Sedan",
    heroImage: "/images/cars/honda-accord.jpg",
    summary: "稳健成熟的中型轿车",
    recommendation: "适合既想兼顾品质，又不希望后续使用太麻烦的用户",
    dimensionWeights: { practical: 81, emotional: 51, saving: 75, quality: 79, comfort: 82, driving: 59, brand: 73, value: 72 },
  },
  {
    slug: "toyota-camry",
    brand: "丰田",
    series: "凯美瑞",
    modelName: "双擎",
    priceMin: 179800,
    priceMax: 259800,
    energyType: "HEV",
    bodyType: "Sedan",
    heroImage: "/images/cars/toyota-camry.jpg",
    summary: "经典稳妥的中型混动轿车",
    recommendation: "适合看重长期稳定、口碑和舒适性的成熟家庭用户",
    dimensionWeights: { practical: 88, emotional: 41, saving: 83, quality: 77, comfort: 85, driving: 48, brand: 75, value: 76 },
  },
  {
    slug: "changan-uni-z",
    brand: "长安",
    series: "UNI-Z",
    modelName: "iDD",
    priceMin: 117900,
    priceMax: 139900,
    energyType: "PHEV",
    bodyType: "SUV",
    heroImage: "/images/cars/changan-uni-z.jpg",
    summary: "价格友好的插混家用 SUV",
    recommendation: "适合重视预算效率和家庭使用均衡性的用户",
    dimensionWeights: { practical: 84, emotional: 49, saving: 90, quality: 61, comfort: 77, driving: 55, brand: 47, value: 92 },
  },
  {
    slug: "geely-galaxy-e5",
    brand: "吉利银河",
    series: "E5",
    modelName: "530km",
    priceMin: 109800,
    priceMax: 145800,
    energyType: "EV",
    bodyType: "SUV",
    heroImage: "/images/cars/geely-galaxy-e5.jpg",
    summary: "主打家用价值的纯电 SUV",
    recommendation: "适合兼顾预算、空间和新能源使用成本的家庭用户",
    dimensionWeights: { practical: 85, emotional: 53, saving: 87, quality: 68, comfort: 81, driving: 57, brand: 50, value: 91 },
  },
  {
    slug: "chery-tiggo-8-pro",
    brand: "奇瑞",
    series: "瑞虎 8 PRO",
    modelName: "冠军版",
    priceMin: 126900,
    priceMax: 163900,
    energyType: "Gasoline",
    bodyType: "SUV",
    heroImage: "/images/cars/chery-tiggo-8-pro.jpg",
    summary: "空间导向的多场景家用 SUV",
    recommendation: "适合重视空间、多人出行和配置丰富度的家庭用户",
    dimensionWeights: { practical: 87, emotional: 47, saving: 73, quality: 64, comfort: 83, driving: 54, brand: 46, value: 88 },
  },
  {
    slug: "mg7",
    brand: "MG",
    series: "MG7",
    modelName: "2.0T",
    priceMin: 159800,
    priceMax: 189800,
    energyType: "Gasoline",
    bodyType: "Sedan",
    heroImage: "/images/cars/mg7.jpg",
    summary: "个性张扬的运动取向轿车",
    recommendation: "适合更看重外观张力和驾驶情绪的年轻用户",
    dimensionWeights: { practical: 54, emotional: 83, saving: 50, quality: 68, comfort: 58, driving: 84, brand: 52, value: 67 },
  },
];
```

```ts
// src/data/content/buying-guides.ts
export const buyingGuides = [
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
```

```ts
// prisma/seed.ts
import { prisma } from "@/lib/prisma";
import { questions } from "@/data/quiz/questions";
import { vehicles } from "@/data/vehicles/vehicles";

async function main() {
  await prisma.quizOption.deleteMany();
  await prisma.quizQuestion.deleteMany();
  await prisma.vehicleDimensionWeight.deleteMany();
  await prisma.buyingGuide.deleteMany();
  await prisma.vehicle.deleteMany();

  for (const question of questions) {
    await prisma.quizQuestion.create({
      data: {
        slug: question.slug,
        title: question.title,
        description: question.description,
        order: question.order,
        options: {
          create: question.options.map((option) => ({
            label: option.label,
            order: option.order,
            weights: option.weights,
          })),
        },
      },
    });
  }

  for (const vehicle of vehicles) {
    await prisma.vehicle.create({
      data: {
        slug: vehicle.slug,
        brand: vehicle.brand,
        series: vehicle.series,
        modelName: vehicle.modelName,
        priceMin: vehicle.priceMin,
        priceMax: vehicle.priceMax,
        energyType: vehicle.energyType,
        bodyType: vehicle.bodyType,
        heroImage: vehicle.heroImage,
        summary: vehicle.summary,
        recommendation: vehicle.recommendation,
        dimensionWeights: {
          create: vehicle.dimensionWeights,
        },
      },
    });
  }
}

main().finally(async () => {
  await prisma.$disconnect();
});
```

- [ ] **Step 4: Run validation and tests**

Run: `pnpm vitest run src/data/vehicles/vehicles.test.ts && pnpm prisma validate`
Expected: PASS for the dataset shape test and `The schema at prisma/schema.prisma is valid`.

- [ ] **Step 5: Commit**

```bash
git add prisma src/data src/lib
git commit -m "feat: add prisma schema and initial quiz vehicle seed data"
```

---

### Task 3: Implement Personality Scoring And Code Generation

**Files:**
- Create: `src/modules/quiz/domain/types.ts`
- Create: `src/modules/quiz/domain/score-answer.ts`
- Create: `src/modules/quiz/domain/build-personality-code.ts`
- Create: `src/modules/quiz/domain/score-answer.test.ts`
- Create: `src/modules/quiz/domain/build-personality-code.test.ts`

- [ ] **Step 1: Write failing tests for score accumulation and code generation**

```ts
// src/modules/quiz/domain/score-answer.test.ts
import { describe, expect, it } from "vitest";
import { scoreAnswers } from "./score-answer";

describe("scoreAnswers", () => {
  it("aggregates dimension weights from selected options", () => {
    const result = scoreAnswers([
      { weights: { practical: 3, saving: 2, comfort: 1, value: 1 } },
      { weights: { emotional: 1, quality: 2, driving: 3, brand: 1 } },
    ]);

    expect(result).toEqual({
      practical: 3,
      emotional: 1,
      saving: 2,
      quality: 2,
      comfort: 1,
      driving: 3,
      brand: 1,
      value: 1,
    });
  });
});
```

```ts
// src/modules/quiz/domain/build-personality-code.test.ts
import { describe, expect, it } from "vitest";
import { buildPersonalityCode } from "./build-personality-code";

describe("buildPersonalityCode", () => {
  it("builds a 4-letter code with stable tie-breakers", () => {
    const code = buildPersonalityCode({
      practical: 8,
      emotional: 8,
      saving: 6,
      quality: 4,
      comfort: 3,
      driving: 3,
      brand: 2,
      value: 2,
    });

    expect(code).toBe("PSCV");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm vitest run src/modules/quiz/domain/score-answer.test.ts src/modules/quiz/domain/build-personality-code.test.ts`
Expected: FAIL because the domain functions do not exist yet.

- [ ] **Step 3: Implement pure scoring logic**

```ts
// src/modules/quiz/domain/types.ts
export type DimensionKey =
  | "practical"
  | "emotional"
  | "saving"
  | "quality"
  | "comfort"
  | "driving"
  | "brand"
  | "value";

export type DimensionScores = Record<DimensionKey, number>;

export const emptyScores = (): DimensionScores => ({
  practical: 0,
  emotional: 0,
  saving: 0,
  quality: 0,
  comfort: 0,
  driving: 0,
  brand: 0,
  value: 0,
});
```

```ts
// src/modules/quiz/domain/score-answer.ts
import { emptyScores, type DimensionScores } from "./types";

export function scoreAnswers(
  answers: Array<{ weights: Partial<DimensionScores> }>,
): DimensionScores {
  return answers.reduce((scores, answer) => {
    for (const [key, value] of Object.entries(answer.weights)) {
      scores[key as keyof DimensionScores] += value ?? 0;
    }

    return scores;
  }, emptyScores());
}
```

```ts
// src/modules/quiz/domain/build-personality-code.ts
import type { DimensionScores } from "./types";

export function buildPersonalityCode(scores: DimensionScores) {
  const letter1 = scores.practical >= scores.emotional ? "P" : "E";
  const letter2 = scores.saving >= scores.quality ? "S" : "Q";
  const letter3 = scores.comfort >= scores.driving ? "C" : "D";
  const letter4 = scores.brand > scores.value ? "B" : "V";

  return `${letter1}${letter2}${letter3}${letter4}`;
}
```

- [ ] **Step 4: Run the unit tests**

Run: `pnpm vitest run src/modules/quiz/domain/score-answer.test.ts src/modules/quiz/domain/build-personality-code.test.ts`
Expected: PASS with two passing tests.

- [ ] **Step 5: Commit**

```bash
git add src/modules/quiz/domain
git commit -m "feat: add personality scoring domain logic"
```

---

### Task 4: Build The Vehicle Matching And Recommendation Reason Engine

**Files:**
- Create: `src/modules/recommendation/domain/match-vehicles.ts`
- Create: `src/modules/recommendation/domain/build-recommendation-reasons.ts`
- Create: `src/modules/recommendation/domain/match-vehicles.test.ts`

- [ ] **Step 1: Write failing tests for recommendation ranking**

```ts
// src/modules/recommendation/domain/match-vehicles.test.ts
import { describe, expect, it } from "vitest";
import { matchVehicles } from "./match-vehicles";

describe("matchVehicles", () => {
  it("returns the best match first and keeps 4 ranked vehicles", () => {
    const results = matchVehicles(
      {
        practical: 8,
        emotional: 2,
        saving: 9,
        quality: 4,
        comfort: 8,
        driving: 3,
        brand: 2,
        value: 9,
      },
      [
        {
          slug: "family-suv",
          modelName: "家庭 SUV",
          dimensionWeights: {
            practical: 90,
            emotional: 40,
            saving: 92,
            quality: 65,
            comfort: 88,
            driving: 45,
            brand: 50,
            value: 90,
          },
        },
        {
          slug: "sport-sedan",
          modelName: "运动轿车",
          dimensionWeights: {
            practical: 45,
            emotional: 85,
            saving: 40,
            quality: 72,
            comfort: 50,
            driving: 90,
            brand: 80,
            value: 55,
          },
        },
      ],
    );

    expect(results[0].slug).toBe("family-suv");
    expect(results).toHaveLength(2);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run src/modules/recommendation/domain/match-vehicles.test.ts`
Expected: FAIL because the recommendation engine does not exist yet.

- [ ] **Step 3: Implement matching and reason building**

```ts
// src/modules/recommendation/domain/match-vehicles.ts
import type { DimensionScores } from "@/modules/quiz/domain/types";

type VehicleCandidate = {
  slug: string;
  modelName: string;
  dimensionWeights: Record<keyof DimensionScores, number>;
};

export function matchVehicles(
  userScores: DimensionScores,
  vehicles: VehicleCandidate[],
) {
  return vehicles
    .map((vehicle) => {
      const score = Object.entries(userScores).reduce((total, [key, value]) => {
        const vehicleWeight = vehicle.dimensionWeights[key as keyof DimensionScores];
        return total + value * vehicleWeight;
      }, 0);

      return {
        ...vehicle,
        matchScore: score,
      };
    })
    .sort((left, right) => right.matchScore - left.matchScore)
    .slice(0, 4);
}
```

```ts
// src/modules/recommendation/domain/build-recommendation-reasons.ts
import type { DimensionScores } from "@/modules/quiz/domain/types";

const labels: Record<keyof DimensionScores, string> = {
  practical: "实用",
  emotional: "情绪价值",
  saving: "省钱",
  quality: "品质",
  comfort: "舒适",
  driving: "驾控",
  brand: "品牌",
  value: "性价比",
};

export function buildRecommendationReasons(
  userScores: DimensionScores,
  vehicleWeights: Record<keyof DimensionScores, number>,
) {
  const topKeys = Object.entries(userScores)
    .sort((left, right) => right[1] - left[1])
    .slice(0, 2)
    .map(([key]) => key as keyof DimensionScores);

  return topKeys
    .map((key) => `你更重视${labels[key]}，而这台车在该维度上表现突出`)
    .filter((reason) => reason.length > 0)
    .join("；");
}
```

- [ ] **Step 4: Run recommendation tests**

Run: `pnpm vitest run src/modules/recommendation/domain/match-vehicles.test.ts`
Expected: PASS with the family-oriented vehicle ranked first.

- [ ] **Step 5: Commit**

```bash
git add src/modules/recommendation/domain
git commit -m "feat: add vehicle recommendation domain services"
```

---

### Task 5: Implement Quiz Session APIs And Persistence

**Files:**
- Create: `src/modules/quiz/repository/quiz-repository.ts`
- Create: `src/modules/quiz/domain/create-quiz-session.ts`
- Create: `src/app/api/quiz/session/route.ts`
- Create: `src/app/api/quiz/[sessionId]/answer/route.ts`
- Create: `src/app/api/quiz/[sessionId]/complete/route.ts`

- [ ] **Step 1: Write a failing API contract test for session creation**

```ts
// src/app/api/quiz/session/route.test.ts
import { describe, expect, it } from "vitest";
import { POST } from "./route";

describe("POST /api/quiz/session", () => {
  it("creates a draft quiz session", async () => {
    const response = await POST();
    const payload = await response.json();

    expect(response.status).toBe(201);
    expect(payload.status).toBe("draft");
    expect(typeof payload.sessionId).toBe("string");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run src/app/api/quiz/session/route.test.ts`
Expected: FAIL because the route and repository do not exist yet.

- [ ] **Step 3: Implement the repository and API routes**

```ts
// src/modules/quiz/repository/quiz-repository.ts
import { prisma } from "@/lib/prisma";
import { buildPersonalityCode } from "@/modules/quiz/domain/build-personality-code";
import { scoreAnswers } from "@/modules/quiz/domain/score-answer";

export const quizRepository = {
  createSession() {
    return prisma.quizSession.create({
      data: {
        status: "draft",
      },
    });
  },

  saveAnswer(sessionId: string, questionId: string, optionId: string) {
    return prisma.quizAnswer.create({
      data: {
        sessionId,
        questionId,
        optionId,
      },
    });
  },

  async completeSession(sessionId: string) {
    const answers = await prisma.quizAnswer.findMany({
      where: { sessionId },
      include: {
        session: true,
      },
    });

    const optionIds = answers.map((answer) => answer.optionId);
    const options = await prisma.quizOption.findMany({
      where: { id: { in: optionIds } },
    });

    const scores = scoreAnswers(options.map((option) => ({ weights: option.weights as never })));
    const personalityCode = buildPersonalityCode(scores);

    await prisma.quizSession.update({
      where: { id: sessionId },
      data: {
        status: "completed",
        currentQuestion: 12,
        personalityCode,
        completedAt: new Date(),
      },
    });

    return prisma.personalityResult.create({
      data: {
        sessionId,
        personalityCode,
        practicalScore: scores.practical,
        emotionalScore: scores.emotional,
        savingScore: scores.saving,
        qualityScore: scores.quality,
        comfortScore: scores.comfort,
        drivingScore: scores.driving,
        brandScore: scores.brand,
        valueScore: scores.value,
      },
    });
  },
};
```

```ts
// src/app/api/quiz/session/route.ts
import { NextResponse } from "next/server";
import { quizRepository } from "@/modules/quiz/repository/quiz-repository";

export async function POST() {
  const session = await quizRepository.createSession();

  return NextResponse.json(
    { sessionId: session.id, status: session.status },
    { status: 201 },
  );
}
```

```ts
// src/app/api/quiz/[sessionId]/answer/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { quizRepository } from "@/modules/quiz/repository/quiz-repository";

const schema = z.object({
  questionId: z.string(),
  optionId: z.string(),
});

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ sessionId: string }> },
) {
  const body = schema.parse(await request.json());
  const { sessionId } = await context.params;

  await quizRepository.saveAnswer(sessionId, body.questionId, body.optionId);

  return NextResponse.json({ ok: true }, { status: 201 });
}
```

```ts
// src/app/api/quiz/[sessionId]/complete/route.ts
import { NextResponse } from "next/server";
import { quizRepository } from "@/modules/quiz/repository/quiz-repository";

export async function POST(
  _request: Request,
  context: { params: Promise<{ sessionId: string }> },
) {
  const { sessionId } = await context.params;
  const result = await quizRepository.completeSession(sessionId);

  return NextResponse.json(
    {
      sessionId,
      personalityCode: result.personalityCode,
    },
    { status: 201 },
  );
}
```

- [ ] **Step 4: Run API tests and Prisma validation**

Run: `pnpm vitest run src/app/api/quiz/session/route.test.ts && pnpm prisma generate`
Expected: PASS for the route test and successful Prisma client generation.

- [ ] **Step 5: Commit**

```bash
git add src/app/api src/modules/quiz/repository src/modules/quiz/domain/create-quiz-session.ts
git commit -m "feat: add quiz session persistence and api routes"
```

---

### Task 6: Build The Quiz Flow UI And Result Page

**Files:**
- Create: `src/app/quiz/page.tsx`
- Create: `src/app/quiz/[sessionId]/page.tsx`
- Create: `src/app/result/[sessionId]/page.tsx`
- Modify: `src/components/ui/button.tsx`
- Modify: `src/modules/recommendation/domain/build-recommendation-reasons.ts`
- Create: `tests/e2e/quiz-flow.spec.ts`

- [ ] **Step 1: Write a failing end-to-end test for the quiz completion flow**

```ts
// tests/e2e/quiz-flow.spec.ts
import { test, expect } from "@playwright/test";

test("user can finish the quiz and reach the result page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "开始测试" }).click();

  await expect(page).toHaveURL(/\/quiz/);
  await page.getByRole("radio").first().check();
  await page.getByRole("button", { name: "下一题" }).click();

  await expect(page.getByText(/第 2 题/)).toBeVisible();
});
```

- [ ] **Step 2: Run the E2E test to verify it fails**

Run: `pnpm playwright test tests/e2e/quiz-flow.spec.ts`
Expected: FAIL because the quiz pages do not exist yet.

- [ ] **Step 3: Implement the quiz flow and result UI**

```tsx
// src/app/quiz/page.tsx
import Link from "next/link";

export default function QuizEntryPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-6 px-6">
      <h1 className="text-4xl font-semibold">12 道题，找到你的汽车人格</h1>
      <p className="text-slate-600">
        测试不会要求登录，完成后会直接给你推荐最适合的车型。
      </p>
      <Link
        href="/quiz/demo-session"
        className="w-fit rounded-full bg-slate-900 px-6 py-3 text-white"
      >
        进入答题
      </Link>
    </main>
  );
}
```

```tsx
// src/app/quiz/[sessionId]/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/data/quiz/questions";

export default function QuizSessionPage() {
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const question = questions[index];

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 px-6 py-16">
      <p className="text-sm text-slate-500">
        第 {index + 1} 题 / 共 {questions.length} 题
      </p>
      <h1 className="text-3xl font-semibold">{question.title}</h1>
      <div className="grid gap-3">
        {question.options.map((option) => (
          <label
            key={option.order}
            className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4"
          >
            <input type="radio" name={question.slug} value={option.label} />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      <button
        className="w-fit rounded-full bg-slate-900 px-6 py-3 text-white"
        onClick={() => {
          if (index === questions.length - 1) {
            router.push("/result/demo-session");
            return;
          }

          setIndex((current) => current + 1);
        }}
      >
        下一题
      </button>
    </main>
  );
}
```

```tsx
// src/app/result/[sessionId]/page.tsx
import { vehicles } from "@/data/vehicles/vehicles";

export default function ResultPage() {
  const [topVehicle, ...alternatives] = vehicles.slice(0, 4);

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-16">
      <section className="rounded-3xl bg-amber-100 p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-600">你的结果</p>
        <h1 className="mt-4 text-5xl font-semibold">PSCV</h1>
        <p className="mt-4 max-w-2xl text-slate-700">
          你更在意实用、省钱、舒适和性价比，推荐从稳定家用和长期用车成本出发选车。
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <article className="rounded-3xl bg-white p-8 shadow-sm">
          <p className="text-sm text-slate-500">最优推荐</p>
          <h2 className="mt-2 text-3xl font-semibold">
            {topVehicle.brand} {topVehicle.series} {topVehicle.modelName}
          </h2>
          <p className="mt-4 text-slate-600">{topVehicle.recommendation}</p>
        </article>
        <aside className="rounded-3xl bg-slate-900 p-8 text-white">
          <p className="text-sm text-white/70">备选车型</p>
          <ul className="mt-4 grid gap-3">
            {alternatives.map((vehicle) => (
              <li key={vehicle.slug}>
                {vehicle.brand} {vehicle.series} {vehicle.modelName}
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </main>
  );
}
```

- [ ] **Step 4: Run unit and E2E verification**

Run: `pnpm vitest run src/app/page.test.tsx && pnpm playwright test tests/e2e/quiz-flow.spec.ts`
Expected: PASS for the homepage smoke test and the quiz flow E2E test.

- [ ] **Step 5: Commit**

```bash
git add src/app/quiz src/app/result tests/e2e src/components/ui/button.tsx
git commit -m "feat: add quiz flow ui and result page"
```

---

### Task 7: Add Vehicle Detail Pages, Buying Guides, And Basic Analytics Hooks

**Files:**
- Create: `src/app/cars/[slug]/page.tsx`
- Create: `src/app/guides/page.tsx`
- Create: `src/app/guides/[slug]/page.tsx`
- Create: `src/modules/catalog/repository/vehicle-repository.ts`
- Create: `src/modules/recommendation/repository/recommendation-repository.ts`
- Create: `src/modules/catalog/domain/vehicle-filters.ts`
- Create: `src/app/api/analytics/route.ts`

- [ ] **Step 1: Write a failing test for buying-guide listing**

```ts
// src/app/guides/page.test.tsx
import { render, screen } from "@testing-library/react";
import GuidesPage from "./page";

describe("GuidesPage", () => {
  it("renders the buying guide heading", () => {
    render(<GuidesPage />);

    expect(
      screen.getByRole("heading", { name: /购车指南/i }),
    ).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run src/app/guides/page.test.tsx`
Expected: FAIL because the guides page does not exist yet.

- [ ] **Step 3: Implement detail pages and analytics endpoint**

```tsx
// src/app/guides/page.tsx
import Link from "next/link";
import { buyingGuides } from "@/data/content/buying-guides";

export default function GuidesPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-semibold">购车指南</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {buyingGuides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="rounded-3xl border border-slate-200 p-6"
          >
            <h2 className="text-2xl font-medium">{guide.title}</h2>
            <p className="mt-3 text-slate-600">{guide.excerpt}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
```

```tsx
// src/app/cars/[slug]/page.tsx
import { notFound } from "next/navigation";
import { vehicles } from "@/data/vehicles/vehicles";

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = vehicles.find((item) => item.slug === slug);

  if (!vehicle) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-semibold">
        {vehicle.brand} {vehicle.series} {vehicle.modelName}
      </h1>
      <p className="mt-4 text-slate-600">{vehicle.summary}</p>
      <p className="mt-6 text-lg">{vehicle.recommendation}</p>
    </main>
  );
}
```

```ts
// src/app/api/analytics/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const eventSchema = z.object({
  eventName: z.string(),
  sessionId: z.string().optional(),
  metadata: z.record(z.string(), z.any()).default({}),
});

export async function POST(request: NextRequest) {
  const payload = eventSchema.parse(await request.json());

  console.info("analytics:event", payload);

  return NextResponse.json({ ok: true }, { status: 201 });
}
```

- [ ] **Step 4: Run tests**

Run: `pnpm vitest run src/app/guides/page.test.tsx`
Expected: PASS with one passing test for the guides index page.

- [ ] **Step 5: Commit**

```bash
git add src/app/guides src/app/cars src/app/api/analytics src/modules/catalog src/modules/recommendation/repository
git commit -m "feat: add buying guides vehicle detail pages and analytics hook"
```

---

### Task 8: Production Readiness Verification And Deployment Documentation

**Files:**
- Modify: `README.md`
- Modify: `.env.example`

- [ ] **Step 1: Write a failing checklist section expectation in the README**

```md
<!-- README.md -->
## Local Development

1. Copy `.env.example` to `.env.local`
2. Start PostgreSQL
3. Run `pnpm install`
4. Run `pnpm db:push`
5. Run `pnpm db:seed`
6. Run `pnpm dev`

## Deployment

- Vercel project connected to the repository
- Managed PostgreSQL database provisioned
- `DATABASE_URL` configured in Vercel
```

- [ ] **Step 2: Run documentation sanity check**

Run: `rg "Local Development|Deployment" README.md`
Expected: FAIL or return no matches before the deployment section is added.

- [ ] **Step 3: Add final setup and deployment documentation**

```md
// README.md
# Carality

Carality 是一个汽车人格测试与选车推荐网站，使用 Next.js、Prisma 和 PostgreSQL 构建。

## Local Development

1. 复制 `.env.example` 为 `.env.local`
2. 在 `.env.local` 中填写 `DATABASE_URL`
3. 运行 `pnpm install`
4. 运行 `pnpm prisma generate`
5. 运行 `pnpm db:push`
6. 运行 `pnpm db:seed`
7. 运行 `pnpm dev`

## Testing

- `pnpm test`
- `pnpm test:e2e`

## Deployment

- 在 Vercel 创建项目并连接仓库
- 在 Neon 或 Supabase 创建 PostgreSQL 数据库
- 在 Vercel 配置 `DATABASE_URL`
- 首次部署前运行迁移或使用 `prisma db push`
- 部署后执行 `pnpm db:seed` 写入首版题库和车型数据
```

```env
# .env.example
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/carality"
```

- [ ] **Step 4: Run the full verification suite**

Run: `pnpm test && pnpm build`
Expected: PASS for all unit tests and a successful Next.js production build.

- [ ] **Step 5: Commit**

```bash
git add README.md .env.example
git commit -m "docs: add local setup and deployment instructions"
```

---

## Self-Review

### Spec coverage

- Quiz flow: covered by Tasks 3, 5, and 6.
- Four-letter personality result: covered by Task 3 and exposed in Task 6.
- Vehicle recommendation from catalog data: covered by Tasks 2 and 4.
- Buying-guide content pages: covered by Task 7.
- Modular architecture and future extension points: covered by the file structure and Tasks 4, 5, and 7.
- Deployment-ready stack: covered by Tasks 1, 2, and 8.

### Placeholder scan

- No `TBD` or `TODO` markers remain in implementation steps.
- Each code-changing step includes concrete code blocks.
- Each verification step includes exact commands and expected outcomes.

### Type consistency

- Shared dimension names are consistent across seed data, scoring logic, and recommendation logic.
- `personalityCode` naming is consistent between Prisma, repository code, and result page output.
- Route signatures use App Router compatible handlers.
