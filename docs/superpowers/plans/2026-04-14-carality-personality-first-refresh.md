# Carality Personality-First Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework Carality so the homepage becomes a minimal single-screen hero and assessment completion returns a personality-first result instead of direct vehicle recommendations.

**Architecture:** Split the delivery into two visible product surfaces. The homepage becomes a lean marketing entrypoint with minimal content. The assessment result contract becomes personality-centric and the UI consumes only the unified personality payload plus a weak next-step entry. Existing vehicle scoring code may remain temporarily, but it must no longer drive the primary result response.

**Tech Stack:** Next.js App Router, React 19, Tailwind CSS, Vitest, NestJS, Prisma

---

### Task 1: Lock The New Homepage Behavior With Tests

**Files:**
- Modify: `src/app/page.test.tsx`
- Test: `tests/e2e/homepage.spec.ts`

- [ ] **Step 1: Write the failing unit test**

```tsx
it("renders a minimal hero without legacy homepage cards", () => {
  render(<HomePage />);

  expect(
    screen.getByRole("heading", {
      name: /识别你的汽车人格/i,
    }),
  ).toBeInTheDocument();

  expect(screen.getByRole("link", { name: /开始测试/i })).toHaveAttribute("href", "/quiz");
  expect(screen.queryByText(/比亚迪/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/12 Questions/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/移动端/i)).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test src/app/page.test.tsx`
Expected: FAIL because the homepage still renders the old heading and legacy cards.

- [ ] **Step 3: Write the failing e2e assertion update**

```ts
await expect(
  page.getByRole("heading", {
    name: "识别你的汽车人格",
  }),
).toBeVisible();

await expect(page.getByText("比亚迪 宋 PLUS DM-i")).toHaveCount(0);
```

- [ ] **Step 4: Run the e2e spec to verify it fails**

Run: `pnpm test:e2e tests/e2e/homepage.spec.ts`
Expected: FAIL because the old homepage copy and recommendation sample are still visible.

- [ ] **Step 5: Commit**

```bash
git add src/app/page.test.tsx tests/e2e/homepage.spec.ts
git commit -m "test: capture minimal homepage hero behavior"
```

### Task 2: Lock The Personality-First Result Contract With Tests

**Files:**
- Modify: `apps/api/src/modules/assessment/assessment.service.spec.ts`
- Modify: `apps/api/src/modules/assessment/dto/complete-session-response.dto.ts`
- Modify: `src/app/result/[sessionId]/page.test.tsx`
- Modify: `src/lib/assessment-session.ts`

- [ ] **Step 1: Write the failing backend contract test**

```ts
await expect(service.completeSession("session_1")).resolves.toEqual({
  sessionId: "session_1",
  personality: {
    code: "steady-pragmatist",
    name: "务实省心型",
    subtitle: "你更在意确定性、成本压力和长期省心。",
    summary: expect.any(String),
    decisionStyle: expect.any(String),
    lifeScenes: expect.any(Array),
    usageHabits: expect.any(Array),
    strengths: expect.any(Array),
    cautions: expect.any(Array),
    matchScore: expect.any(Number),
    dimensionSnapshot: expect.any(Array),
    imageUrl: null,
  },
  recommendationEntry: {
    label: "查看适合你人格的车型方向",
    href: "/result/session_1/recommendations",
  },
});
```

- [ ] **Step 2: Run the backend spec to verify it fails**

Run: `pnpm --dir apps/api test apps/api/src/modules/assessment/assessment.service.spec.ts`
Expected: FAIL because the service still returns `personalityProfile` and `recommendations`.

- [ ] **Step 3: Write the failing result page test**

```tsx
expect(screen.getByText("务实省心型")).toBeInTheDocument();
expect(screen.getByText("你的优势")).toBeInTheDocument();
expect(screen.getByText("你的注意点")).toBeInTheDocument();
expect(screen.getByRole("link", { name: /查看适合你人格的车型方向/i })).toBeInTheDocument();
expect(screen.queryByText("Top Recommendation")).not.toBeInTheDocument();
```

- [ ] **Step 4: Run the result page test to verify it fails**

Run: `pnpm test 'src/app/result/[sessionId]/page.test.tsx'`
Expected: FAIL because the page still renders the top recommendation layout.

- [ ] **Step 5: Commit**

```bash
git add apps/api/src/modules/assessment/assessment.service.spec.ts apps/api/src/modules/assessment/dto/complete-session-response.dto.ts src/app/result/[sessionId]/page.test.tsx src/lib/assessment-session.ts
git commit -m "test: define personality-first result contract"
```

### Task 3: Implement The Minimal Homepage

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace the homepage layout with a single-screen hero**

```tsx
<main className="hero-home">
  <section className="shell hero-home__section">
    <p className="hero-home__eyebrow">Carality</p>
    <h1 className="hero-home__title">识别你的汽车人格</h1>
    <p className="hero-home__body">
      通过一组连续问题，先看清你真正重视的购车偏好，再理解适合你的选车方向。
    </p>
    <div className="hero-home__actions">
      <Button as={Link} href="/quiz" className="race-button race-button-primary">
        开始测试
      </Button>
      <Button as={Link} href="/guides" className="race-button race-button-ghost">
        浏览购车指南
      </Button>
    </div>
  </section>
</main>
```

- [ ] **Step 2: Add minimal homepage styles**

```css
.hero-home {
  min-height: calc(100vh - 88px);
  display: flex;
  align-items: center;
}

.hero-home__section {
  max-width: 56rem;
  padding-top: 3rem;
  padding-bottom: 4rem;
}
```

- [ ] **Step 3: Run the homepage unit test**

Run: `pnpm test src/app/page.test.tsx`
Expected: PASS

- [ ] **Step 4: Run the homepage e2e spec**

Run: `pnpm test:e2e tests/e2e/homepage.spec.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx src/app/globals.css src/app/page.test.tsx tests/e2e/homepage.spec.ts
git commit -m "feat: simplify homepage to a personality-first hero"
```

### Task 4: Implement The Personality-First Backend Response

**Files:**
- Modify: `apps/api/src/modules/assessment/assessment.service.ts`
- Modify: `apps/api/src/modules/assessment/dto/complete-session-response.dto.ts`
- Modify: `src/lib/assessment-session.ts`

- [ ] **Step 1: Introduce the new result DTO shape**

```ts
export type CompleteSessionResponseDto = {
  sessionId: string;
  personality: {
    code: string;
    name: string;
    subtitle: string;
    summary: string;
    decisionStyle: string;
    lifeScenes: string[];
    usageHabits: string[];
    strengths: string[];
    cautions: string[];
    matchScore: number;
    dimensionSnapshot: Array<{
      key: string;
      label: string;
      value: number;
      directionLabel: string;
    }>;
    imageUrl: string | null;
  };
  recommendationEntry: {
    label: string;
    href: string;
  } | null;
};
```

- [ ] **Step 2: Build a unified personality presenter in the service**

```ts
private buildPersonalityResult(
  sessionId: string,
  aggregatedTraits: AggregatedTraits,
  selectedProfile: { code: string },
) {
  const dimensionSnapshot = this.buildDimensionSnapshot(aggregatedTraits);
  const archetype = this.resolvePersonalityArchetype(selectedProfile.code, dimensionSnapshot);

  return {
    sessionId,
    personality: {
      ...archetype,
      matchScore: this.calculateMatchScore(dimensionSnapshot),
      dimensionSnapshot,
      imageUrl: null,
    },
    recommendationEntry: {
      label: "查看适合你人格的车型方向",
      href: `/result/${sessionId}/recommendations`,
    },
  };
}
```

- [ ] **Step 3: Make `completeSession` and `getSessionResult` return the personality-first payload**

```ts
return this.buildPersonalityResult(result.sessionId, aggregatedTraits, selectedProfile);
```

- [ ] **Step 4: Run the backend assessment spec**

Run: `pnpm --dir apps/api test apps/api/src/modules/assessment/assessment.service.spec.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add apps/api/src/modules/assessment/assessment.service.ts apps/api/src/modules/assessment/dto/complete-session-response.dto.ts src/lib/assessment-session.ts apps/api/src/modules/assessment/assessment.service.spec.ts
git commit -m "feat: return personality-first assessment results"
```

### Task 5: Implement The New Result Page

**Files:**
- Modify: `src/app/result/[sessionId]/page.tsx`
- Modify: `src/app/result/[sessionId]/page.test.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace recommendation-first UI with personality-first layout**

```tsx
<section className="personality-result">
  <div className="personality-result__poster">
    <div className="personality-result__image-placeholder" />
    <p className="personality-result__score">{result.personality.matchScore}%</p>
  </div>

  <div className="personality-result__content">
    <h1>{result.personality.name}</h1>
    <p>{result.personality.subtitle}</p>
    <p>{result.personality.summary}</p>
    <section aria-label="你的优势">...</section>
    <section aria-label="你的注意点">...</section>
    <Link href={result.recommendationEntry.href}>{result.recommendationEntry.label}</Link>
  </div>
</section>
```

- [ ] **Step 2: Add matching styles for the new result page**

```css
.personality-result {
  display: grid;
  gap: 1.5rem;
}

.personality-result__image-placeholder {
  min-height: 18rem;
  border: 1px dashed var(--color-line-strong);
  border-radius: 1.75rem;
}
```

- [ ] **Step 3: Run the result page test**

Run: `pnpm test 'src/app/result/[sessionId]/page.test.tsx'`
Expected: PASS

- [ ] **Step 4: Run the homepage and result UI tests together**

Run: `pnpm test src/app/page.test.tsx 'src/app/result/[sessionId]/page.test.tsx'`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/app/result/[sessionId]/page.tsx src/app/result/[sessionId]/page.test.tsx src/app/globals.css
git commit -m "feat: show personality-first assessment result page"
```

### Task 6: Final Verification

**Files:**
- Verify only

- [ ] **Step 1: Run frontend tests**

Run: `pnpm test src/app/page.test.tsx 'src/app/result/[sessionId]/page.test.tsx'`
Expected: PASS

- [ ] **Step 2: Run backend assessment tests**

Run: `pnpm --dir apps/api test apps/api/src/modules/assessment/assessment.service.spec.ts`
Expected: PASS

- [ ] **Step 3: Run a production build for the web app**

Run: `pnpm build`
Expected: PASS

- [ ] **Step 4: Run the API build**

Run: `pnpm build:api`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: deliver personality-first product refresh"
```
