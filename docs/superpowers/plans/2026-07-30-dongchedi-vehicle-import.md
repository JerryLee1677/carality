# Dongchedi Vehicle Import Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an external Dongchedi vehicle-series table and a paginated sync script that imports raw series data safely.

**Architecture:** Keep external source data separate from the recommendation `Vehicle` model. Put parsing and pagination helpers in a small testable script module, then expose a CLI entrypoint for real sync runs.

**Tech Stack:** NestJS workspace, Prisma/PostgreSQL, TypeScript, Vitest, tsx.

---

### Task 1: Add External Series Persistence

**Files:**
- Modify: `apps/api/prisma/schema.prisma`
- Create: `apps/api/prisma/migrations/202607300900_external_vehicle_series/migration.sql`

- [x] Add the `ExternalVehicleSeries` model with a compound unique key on `source` and `sourceSeriesId`.
- [x] Add SQL migration for the new table and index.

### Task 2: Add Parsing And Pagination Helpers

**Files:**
- Create: `apps/api/src/modules/vehicles/dongchedi-series-importer.spec.ts`
- Create: `apps/api/src/modules/vehicles/dongchedi-series-importer.ts`

- [x] Write failing tests for response parsing, failed payload rejection, request construction, and final-page stopping.
- [x] Implement parser and importer helpers until tests pass.

### Task 3: Add CLI Sync Entrypoint

**Files:**
- Create: `apps/api/scripts/sync-dongchedi-series.ts`
- Modify: `apps/api/package.json`
- Modify: `apps/api/.env.example`
- Modify: `README.md`

- [x] Add script entrypoint that loads environment config, supports page range and dry-run arguments, and prints a safe summary.
- [x] Add package script and environment documentation.

### Task 4: Verify

**Files:**
- Test: `apps/api/src/modules/vehicles/dongchedi-series-importer.spec.ts`

- [x] Run targeted Vitest tests.
- [x] Run API TypeScript build.
- [x] Do not run real network sync until credentials are provided through local environment variables.
