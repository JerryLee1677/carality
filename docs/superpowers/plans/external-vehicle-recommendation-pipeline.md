# External Vehicle Recommendation Pipeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Import audited Dongchedi passenger-vehicle candidates into the recommendation pool, calibrate their scores, and rank them with hard constraints, explicit preferences, budget fit, and diversity controls.

**Architecture:** `ExternalVehicleCandidate` remains the external ingestion and audit table. A deterministic importer promotes eligible passenger vehicles into `Vehicle`, adds provenance and audit fields, and reuses the existing trait and constraint relation tables. Recommendation remains driven by `Vehicle`, but only approved rows enter ranking.

**Tech Stack:** NestJS, Prisma/PostgreSQL, TypeScript, Vitest.

**Spec:** Approved conversation design: filter passenger vehicles, add recommendation audit states, calibrate external scores, use hard constraints before scoring, and enforce series/brand/energy diversity.

## Global Constraints

- Do not import commercial body types: 微卡, 货车, 轻卡, 客车, 轻客, 微面, 房车.
- Imported candidates must be `PENDING`, priced, and have `dataConfidence >= 0.75`.
- Existing 120 vehicles remain `ACTIVE`; imported vehicles start `PENDING`.
- Preserve the current external candidate table and raw parsed data.
- Do not delete or replace existing recommendation history.

---

### Task 1: Passenger Candidate Filter and Import

**Files:**
- Modify: `apps/api/prisma/schema.prisma`
- Create: `apps/api/prisma/migrations/202610091000_vehicle_recommendation_audit/migration.sql`
- Create: `apps/api/src/modules/vehicles/vehicle-candidate-importer.ts`
- Create: `apps/api/src/modules/vehicles/vehicle-candidate-importer.spec.ts`
- Create: `apps/api/scripts/import-dongchedi-candidates.ts`
- Modify: `apps/api/package.json`

**Interfaces:**
- Produces `isImportablePassengerCandidate(candidate): boolean`
- Produces `buildVehicleFromCandidate(candidate): VehicleCreateInput`
- Produces `importVehicleCandidates(db, options): Promise<ImportSummary>`

- [ ] Write failing tests for commercial-body exclusion, confidence threshold, missing price rejection, and successful mapping to `Vehicle`.
- [ ] Add `source`, `sourceSeriesId`, `sourceCarId`, `dataConfidence`, and `recommendationStatus` to `Vehicle`.
- [ ] Add migration and regenerate Prisma client.
- [ ] Implement importer and script with dry-run, limit, and source filters.
- [ ] Verify importer unit tests.

### Task 2: Recommendation Pool Selection

**Files:**
- Modify: `apps/api/src/modules/vehicles/vehicles.service.ts`
- Modify: `apps/api/src/modules/vehicles/vehicles.service.spec.ts`
- Modify: `apps/api/src/modules/assessment/assessment.service.spec.ts`

**Interfaces:**
- Consumes `Vehicle.recommendationStatus`.
- Produces `findActiveRecommendationVehicles(db)` returning only `status=active` and `recommendationStatus=ACTIVE`.

- [ ] Write failing service test proving pending imported vehicles are excluded.
- [ ] Update query and Prisma mock types.
- [ ] Verify existing assessment tests with seeded vehicles updated to active audit state.

### Task 3: Score Calibration

**Files:**
- Create: `apps/api/src/modules/vehicles/vehicle-score-calibrator.ts`
- Create: `apps/api/src/modules/vehicles/vehicle-score-calibrator.spec.ts`
- Modify: `apps/api/scripts/import-dongchedi-candidates.ts`

**Interfaces:**
- Produces `buildScoreCalibration(referenceVehicles, candidateVehicles): ScoreCalibration`
- Produces `calibrateCoreScores(scores, calibration, grouping): CoreScores`

- [ ] Write failing tests for same-distribution scaling, per-energy adjustment, and 35-92 clamping.
- [ ] Implement quantile alignment grouped by energy type and body category.
- [ ] Pass calibrated scores into imported vehicles.
- [ ] Verify calibrator tests.

### Task 4: Recommendation Ranking and Diversity

**Files:**
- Modify: `apps/api/src/modules/assessment/assessment.service.ts`
- Modify: `apps/api/src/modules/assessment/assessment.service.spec.ts`

**Interfaces:**
- Consumes `Vehicle.recommendationStatus`.
- Produces `selectDiverseRecommendations(scored, limit): ScoredVehicle[]`

- [ ] Write failing tests for hard-constraint filtering, budget fit, data-quality weighting, one-per-series, two-per-brand, and energy diversity.
- [ ] Implement hard-constraint gate before soft scoring.
- [ ] Rebalance scoring weights to vector 30%, preference 18%, price 15%, energy 13%, practical 10%, data quality 7%, diversity 7%.
- [ ] Implement deterministic diverse selection.
- [ ] Verify all assessment tests.

### Task 5: End-to-End Validation

**Files:**
- Modify: `apps/api/src/modules/assessment/assessment.service.spec.ts`

**Interfaces:**
- Consumes Tasks 1-4.

- [ ] Add profile scenarios for family EV, budget commuter, comfort PHEV, performance, and seven-seat family use.
- [ ] Assert budget, energy, seat, body, and diversity expectations.
- [ ] Run vehicle and assessment suites, API build, and migration check.
