# Carality Assessment Business Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the current assessment MVP from a lightweight demo into a business-credible vehicle matching flow with richer question dimensions, hard-constraint vehicle filtering, and stronger result explanations.

**Architecture:** Keep the current split of Next.js frontend plus NestJS API plus PostgreSQL/Prisma. Extend the backend domain model to distinguish hard constraints from preference scoring, expand seed-backed question and vehicle data, then update the frontend to surface richer recommendation reasons without changing the core request flow.

**Tech Stack:** Next.js App Router, React 19, NestJS, Prisma, PostgreSQL, Vitest

---

### Task 1: Add Constraint-Aware Vehicle Matching Model

**Files:**
- Modify: `/Users/admin/Desktop/Carality/apps/api/prisma/schema.prisma`
- Modify: `/Users/admin/Desktop/Carality/apps/api/src/modules/assessment/assessment.service.ts`
- Modify: `/Users/admin/Desktop/Carality/apps/api/src/modules/assessment/assessment.service.spec.ts`
- Test: `/Users/admin/Desktop/Carality/apps/api/src/modules/assessment/assessment.service.spec.ts`

- [ ] **Step 1: Write the failing backend test for hard filtering before ranking**

```ts
it("filters out vehicles that fail hard constraints before preference ranking", async () => {
  const prisma = {
    assessmentSession: {
      findUnique: vi.fn().mockResolvedValue({
        id: "session_filter_1",
        status: "IN_PROGRESS",
      }),
      update: vi.fn().mockResolvedValue(undefined),
      create: vi.fn(),
    },
    sessionTraitSnapshot: {
      findMany: vi.fn().mockResolvedValue([
        { targetType: "HARD_CONSTRAINT", traitKey: "budget_level", traitValue: 1 },
        { targetType: "VEHICLE_PREFERENCE", traitKey: "family_fit", traitValue: 5 },
      ]),
    },
    personalityProfile: {
      findMany: vi.fn().mockResolvedValue([
        {
          id: "profile_1",
          code: "STEADY_PRAGMATIST",
          name: "稳健务实型",
          summary: "summary",
          detail: "detail",
          rules: [],
        },
      ]),
    },
    vehicle: {
      findMany: vi.fn().mockResolvedValue([
        {
          id: "vehicle_ok",
          slug: "toyota-corolla-hybrid",
          brand: "丰田",
          series: "卡罗拉",
          modelName: "双擎",
          recommendation: "ok",
          traitWeights: [
            { targetType: "VEHICLE_PREFERENCE", targetKey: "family_fit", weight: 8 },
          ],
          constraintRules: [
            { targetKey: "budget_level", operator: "LTE", threshold: 2, mode: "REQUIRE" },
          ],
        },
        {
          id: "vehicle_fail",
          slug: "tesla-model-3",
          brand: "特斯拉",
          series: "Model 3",
          modelName: "后轮驱动版",
          recommendation: "fail",
          traitWeights: [
            { targetType: "VEHICLE_PREFERENCE", targetKey: "family_fit", weight: 10 },
          ],
          constraintRules: [
            { targetKey: "budget_level", operator: "GTE", threshold: 3, mode: "REQUIRE" },
          ],
        },
      ]),
    },
    sessionResult: {
      create: vi.fn().mockResolvedValue({ id: "result_1", sessionId: "session_filter_1" }),
    },
    sessionVehicleRecommendation: {
      createMany: vi.fn().mockResolvedValue(undefined),
    },
  };

  const service = new AssessmentService(prisma as never, {
    getInitialQuestion: vi.fn(),
    getNextQuestion: vi.fn(),
  } as never);

  await expect(service.completeSession("session_filter_1")).resolves.toEqual(
    expect.objectContaining({
      recommendations: [
        expect.objectContaining({
          slug: "toyota-corolla-hybrid",
        }),
      ],
    }),
  );
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm --dir apps/api test -- src/modules/assessment/assessment.service.spec.ts`
Expected: FAIL because `constraintRules` are ignored and the unqualified vehicle still appears in ranking.

- [ ] **Step 3: Add Prisma models for vehicle constraint rules**

```prisma
enum VehicleRuleMode {
  REQUIRE
  PENALIZE
}

model VehicleConstraintRule {
  id         String          @id @default(cuid())
  vehicleId   String
  targetKey   String
  operator    RuleOperator
  threshold   Decimal        @db.Decimal(8, 2)
  mode        VehicleRuleMode @default(REQUIRE)
  weightPenalty Decimal?     @db.Decimal(8, 2)
  vehicle     Vehicle        @relation(fields: [vehicleId], references: [id], onDelete: Cascade)

  @@index([vehicleId])
}

model Vehicle {
  // existing fields...
  constraintRules VehicleConstraintRule[]
}
```

- [ ] **Step 4: Implement minimal filtering logic in assessment service**

```ts
private passesVehicleConstraints(
  aggregatedTraits: Record<string, number>,
  rules: Array<{
    targetKey: string;
    operator: "EQ" | "NEQ" | "GT" | "GTE" | "LT" | "LTE";
    threshold: number | { toString(): string };
    mode: "REQUIRE" | "PENALIZE";
  }>,
) {
  return rules.every((rule) =>
    this.matchesBranchRule(
      aggregatedTraits[rule.targetKey] ?? 0,
      rule.operator,
      Number(rule.threshold),
    ),
  );
}
```

- [ ] **Step 5: Update ranking query to load constraint rules**

```ts
const vehicles = await this.prisma.vehicle.findMany({
  include: {
    traitWeights: true,
    constraintRules: true,
  },
  where: {
    status: "active",
  },
});

const rankedRecommendations = vehicles
  .filter((vehicle) => this.passesVehicleConstraints(aggregatedTraits, vehicle.constraintRules))
  .map(/* existing score mapping */);
```

- [ ] **Step 6: Run tests to verify backend passes**

Run: `pnpm --dir apps/api test -- src/modules/assessment/assessment.service.spec.ts`
Expected: PASS with the new filtering behavior and no regressions in previous recommendation tests.

- [ ] **Step 7: Commit**

```bash
git add apps/api/prisma/schema.prisma apps/api/src/modules/assessment/assessment.service.ts apps/api/src/modules/assessment/assessment.service.spec.ts
git commit -m "feat: add constraint-aware vehicle filtering"
```

### Task 2: Expand Assessment Seed Data To Business-Credible Dimensions

**Files:**
- Modify: `/Users/admin/Desktop/Carality/apps/api/prisma/seed-data/questions.ts`
- Modify: `/Users/admin/Desktop/Carality/apps/api/prisma/seed-data/vehicles.ts`
- Modify: `/Users/admin/Desktop/Carality/apps/api/prisma/seed.ts`
- Modify: `/Users/admin/Desktop/Carality/apps/api/src/seed-data.spec.ts`
- Test: `/Users/admin/Desktop/Carality/apps/api/src/seed-data.spec.ts`

- [ ] **Step 1: Write the failing seed-shape test for expanded business dimensions**

```ts
it("contains at least 40 questions across hard constraints, scenarios, preferences, and persona prompts", () => {
  expect(questions.length).toBeGreaterThanOrEqual(40);

  const titles = questions.map((question) => question.slug);

  expect(titles).toContain("income-range");
  expect(titles).toContain("family-size");
  expect(titles).toContain("charging-access");
  expect(titles).toContain("ownership-horizon");
});

it("contains at least 20 vehicles with both trait weights and constraint rules", () => {
  expect(vehicles.length).toBeGreaterThanOrEqual(20);
  expect(vehicles.every((vehicle) => vehicle.traitWeights.length >= 3)).toBe(true);
  expect(vehicles.every((vehicle) => vehicle.constraintRules.length >= 2)).toBe(true);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm --dir apps/api test -- src/seed-data.spec.ts`
Expected: FAIL because the current dataset is smaller and lacks the new business modules.

- [ ] **Step 3: Expand question seed modules**

```ts
export const questions = [
  {
    slug: "income-range",
    title: "你的家庭年收入更接近哪个区间？",
    type: "LIFE_STYLE",
    branchKey: "budget-constraint",
    isAnchor: true,
    priority: 130,
    discrimination: 92,
    status: "ACTIVE",
    options: [
      {
        label: "15 万以内",
        order: 1,
        effects: [
          { targetType: "HARD_CONSTRAINT", targetKey: "budget_level", weightDelta: 1 },
          { targetType: "PERSONALITY_TRAIT", targetKey: "cost_control", weightDelta: 1 },
        ],
      },
      {
        label: "15 万到 30 万",
        order: 2,
        effects: [
          { targetType: "HARD_CONSTRAINT", targetKey: "budget_level", weightDelta: 2 },
        ],
      },
    ],
  },
  // add the rest of the 40-50 question bank by module
];
```

- [ ] **Step 4: Expand vehicle seed with hard constraints**

```ts
{
  slug: "honda-odyssey",
  brand: "本田",
  series: "奥德赛",
  modelName: "锐·耀享版",
  // existing summary fields...
  traitWeights: [
    { targetType: "VEHICLE_PREFERENCE", targetKey: "family_fit", weight: 10 },
    { targetType: "VEHICLE_PREFERENCE", targetKey: "comfort_space", weight: 9 },
    { targetType: "VEHICLE_PREFERENCE", targetKey: "daily_reliability", weight: 8 },
  ],
  constraintRules: [
    { targetKey: "family_size", operator: "GTE", threshold: 4, mode: "REQUIRE" },
    { targetKey: "budget_level", operator: "GTE", threshold: 3, mode: "REQUIRE" },
  ],
}
```

- [ ] **Step 5: Update seed writer to persist new constraint rules and new target types**

```ts
constraintRules: {
  create: vehicle.constraintRules.map((rule) => ({
    targetKey: rule.targetKey,
    operator: rule.operator,
    threshold: rule.threshold,
    mode: rule.mode,
    weightPenalty: rule.weightPenalty ?? null,
  })),
},
```

- [ ] **Step 6: Run tests to verify seed data passes**

Run: `pnpm --dir apps/api test -- src/seed-data.spec.ts`
Expected: PASS with 40+ questions and 20+ vehicles represented in seed definitions.

- [ ] **Step 7: Commit**

```bash
git add apps/api/prisma/seed-data/questions.ts apps/api/prisma/seed-data/vehicles.ts apps/api/prisma/seed.ts apps/api/src/seed-data.spec.ts
git commit -m "feat: expand assessment question bank and vehicle catalog"
```

### Task 3: Upgrade Adaptive Question Selection To Cover Business Modules

**Files:**
- Modify: `/Users/admin/Desktop/Carality/apps/api/src/modules/questions/questions.service.ts`
- Modify: `/Users/admin/Desktop/Carality/apps/api/src/modules/questions/questions.service.spec.ts`
- Modify: `/Users/admin/Desktop/Carality/apps/api/prisma/seed-data/questions.ts`
- Test: `/Users/admin/Desktop/Carality/apps/api/src/modules/questions/questions.service.spec.ts`

- [ ] **Step 1: Write the failing test for module-aware question progression**

```ts
it("prioritizes unanswered hard-constraint modules early in the session", async () => {
  const findMany = vi.fn().mockResolvedValue([
    {
      id: "q_budget",
      slug: "income-range",
      title: "你的家庭年收入更接近哪个区间？",
      description: null,
      branchKey: "budget-constraint",
      type: "LIFE_STYLE",
      priority: 130,
      discrimination: 90,
      moduleKey: "budget",
      options: [],
    },
    {
      id: "q_persona",
      slug: "social-first-contact",
      title: "在一场聚会上，遇到陌生朋友，你会？",
      description: null,
      branchKey: "social-expression",
      type: "LIFE_STYLE",
      priority: 90,
      discrimination: 70,
      moduleKey: "persona",
      options: [],
    },
  ]);

  const service = new QuestionsService({ question: { findMany } } as never);

  const result = await service.getNextQuestion({
    answeredQuestionIds: [],
    currentBranchKey: "budget-constraint",
    lifeQuestionCount: 0,
    carQuestionCount: 0,
  });

  expect(result.nextQuestion?.slug).toBe("income-range");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm --dir apps/api test -- src/modules/questions/questions.service.spec.ts`
Expected: FAIL because current ranking logic does not consider module coverage.

- [ ] **Step 3: Add minimal module-priority bonus**

```ts
private getModuleCoverageBonus(
  moduleKey: string | null,
  answeredModuleKeys: string[],
  stepIndex: number,
) {
  if (!moduleKey) return 0;
  if (stepIndex < 4 && ["budget", "family", "environment", "energy"].includes(moduleKey)) {
    return answeredModuleKeys.includes(moduleKey) ? 0 : 45;
  }
  return answeredModuleKeys.includes(moduleKey) ? -10 : 10;
}
```

- [ ] **Step 4: Update query ranking to use module-aware scoring**

```ts
const rankingScore =
  (candidate.priority ?? 0) +
  branchFit +
  infoGain +
  this.getTypeBalanceBonus(candidate.type, input) +
  this.getModuleCoverageBonus(candidate.moduleKey ?? null, input.answeredModuleKeys ?? [], input.answeredQuestionIds.length);
```

- [ ] **Step 5: Run tests to verify question progression passes**

Run: `pnpm --dir apps/api test -- src/modules/questions/questions.service.spec.ts`
Expected: PASS with existing balancing behavior plus early hard-constraint prioritization.

- [ ] **Step 6: Commit**

```bash
git add apps/api/src/modules/questions/questions.service.ts apps/api/src/modules/questions/questions.service.spec.ts apps/api/prisma/seed-data/questions.ts
git commit -m "feat: prioritize hard-constraint modules in question selection"
```

### Task 4: Improve Frontend Result Explanation And Recovery Messaging

**Files:**
- Modify: `/Users/admin/Desktop/Carality/src/app/result/[sessionId]/page.tsx`
- Modify: `/Users/admin/Desktop/Carality/src/components/quiz/quiz-session-client.tsx`
- Modify: `/Users/admin/Desktop/Carality/src/lib/assessment-session.ts`
- Test: `/Users/admin/Desktop/Carality/src/components/quiz/quiz-session-client.test.tsx`
- Test: `/Users/admin/Desktop/Carality/src/app/page.test.tsx`

- [ ] **Step 1: Write the failing test for richer recovery copy when snapshot is unavailable**

```tsx
it("shows a restart CTA when neither backend snapshot nor local cache can recover the session", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({}),
    }),
  );

  render(<QuizSessionClient sessionId="missing_session" />);

  await waitFor(() => {
    expect(screen.getByText("当前答题会话没有可恢复的题目")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails if messaging regresses**

Run: `pnpm test -- 'src/components/quiz/quiz-session-client.test.tsx'`
Expected: FAIL if the component no longer handles failed recovery cleanly.

- [ ] **Step 3: Add result explanation sections for constraint fit, scenario fit, and preference fit**

```tsx
{[
  ["约束匹配", "预算、家庭结构和补能条件与推荐车型基本一致"],
  ["场景匹配", "更适合你的日常通勤与周末家庭出行场景"],
  ["偏好匹配", "同时保留你对稳定省心与空间舒适的核心偏好"],
].map(([label, value]) => (
  <div key={label} className="rounded-[1.35rem] border border-[var(--color-line)] bg-white/62 p-4">
    <p className="display-font text-xl uppercase text-[var(--color-accent-2)]">{label}</p>
    <p className="mt-2 text-sm text-[var(--color-muted)]">{value}</p>
  </div>
))}
```

- [ ] **Step 4: Keep recovery flow backend-first with local-cache fallback**

```ts
const response = await fetch(`/api/quiz/${sessionId}`, { method: "GET" });
if (!response.ok) throw new Error("Failed to load current session snapshot");
const remoteSnapshot = (await response.json()) as AssessmentSessionSnapshot;
```

- [ ] **Step 5: Run frontend tests and build**

Run: `pnpm test`
Expected: PASS with refreshed quiz recovery behavior intact.

Run: `pnpm build`
Expected: PASS with the updated result page and recovery UI.

- [ ] **Step 6: Commit**

```bash
git add src/app/result/[sessionId]/page.tsx src/components/quiz/quiz-session-client.tsx src/lib/assessment-session.ts
git commit -m "feat: improve assessment recovery and result explanations"
```

### Task 5: Apply Database Changes And Reseed Real Data

**Files:**
- Modify: `/Users/admin/Desktop/Carality/apps/api/prisma/migrations/*`
- Modify: `/Users/admin/Desktop/Carality/apps/api/.env` if needed
- Test: local PostgreSQL via Prisma migrate and seed commands

- [ ] **Step 1: Create the migration for new vehicle constraint structures**

```sql
CREATE TYPE "VehicleRuleMode" AS ENUM ('REQUIRE', 'PENALIZE');

CREATE TABLE "VehicleConstraintRule" (
  "id" TEXT NOT NULL,
  "vehicleId" TEXT NOT NULL,
  "targetKey" TEXT NOT NULL,
  "operator" "RuleOperator" NOT NULL,
  "threshold" DECIMAL(8,2) NOT NULL,
  "mode" "VehicleRuleMode" NOT NULL DEFAULT 'REQUIRE',
  "weightPenalty" DECIMAL(8,2),
  CONSTRAINT "VehicleConstraintRule_pkey" PRIMARY KEY ("id")
);
```

- [ ] **Step 2: Run Prisma generate**

Run: `pnpm --dir apps/api prisma:generate`
Expected: PASS and regenerated Prisma Client includes the new vehicle rule model.

- [ ] **Step 3: Apply migration to local PostgreSQL**

Run: `pnpm --dir apps/api exec prisma migrate deploy --schema prisma/schema.prisma`
Expected: PASS and the new migration is applied to `carality_assessment`.

- [ ] **Step 4: Reseed the expanded business dataset**

Run: `pnpm --dir apps/api db:seed`
Expected: PASS and the database contains expanded questions, branch rules, vehicles, and constraint rules.

- [ ] **Step 5: Verify data counts**

Run: `/opt/homebrew/opt/postgresql@16/bin/psql -d carality_assessment -c 'SELECT (SELECT COUNT(*) FROM "Question") AS questions, (SELECT COUNT(*) FROM "Vehicle") AS vehicles, (SELECT COUNT(*) FROM "VehicleConstraintRule") AS constraint_rules;'`
Expected: question count >= 40, vehicle count >= 20, constraint_rules > 0.

- [ ] **Step 6: Commit**

```bash
git add apps/api/prisma/migrations
git commit -m "feat: persist business upgrade database rules"
```
