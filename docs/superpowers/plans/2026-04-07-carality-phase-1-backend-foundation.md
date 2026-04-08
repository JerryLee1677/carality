# Carality Phase 1 Backend Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create the first dedicated backend foundation for Carality with a new API app workspace, a database schema for adaptive assessments, and the initial NestJS module skeleton.

**Architecture:** Keep the current Next.js frontend intact at the repository root and introduce a separate `apps/api` service for all future assessment logic. Store the new adaptive assessment schema under the API app so the backend can evolve independently before the frontend is migrated to the new flow.

**Tech Stack:** Next.js, NestJS, Prisma, PostgreSQL, pnpm workspace, TypeScript

---

### Task 1: Add Workspace And API App Boundaries

**Files:**
- Create: `pnpm-workspace.yaml`
- Create: `apps/api/package.json`
- Create: `apps/api/tsconfig.json`
- Create: `apps/api/tsconfig.build.json`
- Create: `apps/api/nest-cli.json`
- Create: `apps/api/.env.example`
- Modify: `package.json`

- [ ] Define the workspace packages and root helper scripts for API development.
- [ ] Add the initial API package manifest with NestJS, Prisma, and dev scripts.
- [ ] Add TypeScript and Nest CLI config files for the backend app.
- [ ] Add a backend environment example with `DATABASE_URL` and service port placeholders.

### Task 2: Add Adaptive Assessment Prisma Schema

**Files:**
- Create: `apps/api/prisma/schema.prisma`
- Create: `apps/api/prisma/README.md`

- [ ] Define models for questions, options, option effects, question branch rules, session state, answers, snapshots, personality profiles, vehicles, vehicle weights, and result tables.
- [ ] Keep the schema isolated under `apps/api/prisma` so current frontend Prisma usage is not broken.
- [ ] Add a short schema README describing the model groups and intended ownership.

### Task 3: Add API Application Skeleton

**Files:**
- Create: `apps/api/src/main.ts`
- Create: `apps/api/src/app.module.ts`
- Create: `apps/api/src/common/health/health.controller.ts`
- Create: `apps/api/src/common/prisma/prisma.module.ts`
- Create: `apps/api/src/common/prisma/prisma.service.ts`
- Create: `apps/api/src/modules/assessment/assessment.module.ts`
- Create: `apps/api/src/modules/assessment/assessment.controller.ts`
- Create: `apps/api/src/modules/assessment/assessment.service.ts`
- Create: `apps/api/src/modules/questions/questions.module.ts`
- Create: `apps/api/src/modules/questions/questions.service.ts`
- Create: `apps/api/src/modules/engine/engine.module.ts`
- Create: `apps/api/src/modules/engine/engine.service.ts`
- Create: `apps/api/src/modules/personality/personality.module.ts`
- Create: `apps/api/src/modules/personality/personality.service.ts`
- Create: `apps/api/src/modules/recommendation/recommendation.module.ts`
- Create: `apps/api/src/modules/recommendation/recommendation.service.ts`
- Create: `apps/api/src/modules/vehicles/vehicles.module.ts`
- Create: `apps/api/src/modules/vehicles/vehicles.service.ts`

- [ ] Add the Nest bootstrap entrypoint and root app module.
- [ ] Add a minimal health endpoint for service verification.
- [ ] Add a Prisma service/module that future repositories can reuse.
- [ ] Add empty but named domain modules for assessment, questions, engine, personality, recommendation, and vehicles.

### Task 4: Add First API Contract Stubs

**Files:**
- Create: `apps/api/src/modules/assessment/dto/create-session-response.dto.ts`
- Create: `apps/api/src/modules/assessment/dto/submit-answer.dto.ts`
- Create: `apps/api/src/modules/assessment/dto/submit-answer-response.dto.ts`
- Modify: `apps/api/src/modules/assessment/assessment.controller.ts`
- Modify: `apps/api/src/modules/assessment/assessment.service.ts`

- [ ] Add DTOs for session creation and answer submission responses.
- [ ] Stub `POST /assessment/sessions` and `POST /assessment/sessions/:sessionId/answers`.
- [ ] Return explicit placeholder payloads that match the future backend-driven assessment flow.

### Task 5: Verify Scaffolding Integrity

**Files:**
- Modify: `README.md`

- [ ] Document the new `apps/api` service and note that dependencies are scaffolded but not yet installed or migrated in this phase.
- [ ] Run file-level verification commands to confirm the new structure exists and root workspace metadata is wired correctly.
