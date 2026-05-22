# Auth (RSA Password + Cookie Session) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add email/password registration and login where the browser RSA-encrypts the password, the API decrypts it, and login state is stored in an HttpOnly cookie backed by a DB session table; logged-in users can view completed assessment history.

**Architecture:** Browser calls Next.js BFF routes under `src/app/api/*`. BFF sets/clears HttpOnly cookie and forwards `x-session-token` to Nest (`apps/api`). Nest owns Prisma models (`User`, `AuthSession`, and `AssessmentSession.userId`) and authorization.

**Tech Stack:** Next.js App Router, NestJS, Prisma (Postgres), WebCrypto (RSA-OAEP), Node `crypto` (scrypt + privateDecrypt).

---

## File Structure / Units

- Backend (Nest, `apps/api`)
  - `apps/api/prisma/schema.prisma`: add `User`, `AuthSession`, `AssessmentSession.userId`.
  - `apps/api/src/modules/auth/*`: RSA key handling, register/login/logout/me.
  - `apps/api/src/modules/history/*`: history listing for current user.
  - `apps/api/src/common/auth/*`: session validation helper/guard.
- Frontend / BFF (Next, repo root)
  - `src/app/api/auth/*/route.ts`: BFF endpoints (public-key/register/login/logout/me).
  - `src/app/api/history/route.ts`: BFF history proxy.
  - `src/lib/rsa-client.ts`: browser RSA encryption helper (PEM → key → encrypt).
  - Pages:
    - `src/app/login/page.tsx`
    - `src/app/register/page.tsx`
    - `src/app/account/history/page.tsx`

## Tasks

### Task 1: Prisma models for auth + session ownership

**Files:**
- Modify: `apps/api/prisma/schema.prisma`

- [ ] **Step 1: Add `User` + `AuthSession` models**
- [ ] **Step 2: Add `userId` nullable relation on `AssessmentSession`**
- [ ] **Step 3: Run Prisma generate/migration (local)**
  - Run: `pnpm --dir apps/api prisma:generate`
  - Run: `pnpm --dir apps/api prisma:migrate:dev`

### Task 2: Nest auth module (RSA decrypt + scrypt hash + sessions)

**Files:**
- Create: `apps/api/src/modules/auth/auth.module.ts`
- Create: `apps/api/src/modules/auth/auth.controller.ts`
- Create: `apps/api/src/modules/auth/auth.service.ts`
- Create: `apps/api/src/modules/auth/dto/*.ts`
- Create: `apps/api/src/common/auth/session-auth.service.ts`

- [ ] **Step 1: Implement RSA private key loader**
  - Env: `AUTH_RSA_PRIVATE_KEY_B64`, `AUTH_RSA_PUBLIC_KEY_PEM`
- [ ] **Step 2: Implement password decrypt + scrypt hash/verify**
- [ ] **Step 3: Implement register/login**
  - `register`: create user
  - `login`: create `AuthSession`, return `sessionToken`
- [ ] **Step 4: Implement `me` + `logout` using `x-session-token`**

### Task 3: Nest history endpoint

**Files:**
- Create: `apps/api/src/modules/history/history.module.ts`
- Create: `apps/api/src/modules/history/history.controller.ts`
- Create: `apps/api/src/modules/history/history.service.ts`

- [ ] **Step 1: Define response shape**
  - Include: session id, createdAt, completedAt, personality profile name/code (as available), summary fields
- [ ] **Step 2: Query Prisma for current user’s sessions**
  - Filter: `AssessmentSession.userId = currentUser.id` and `status = COMPLETED`

### Task 4: Bind assessment session creation to logged-in user

**Files:**
- Modify: `apps/api/src/modules/assessment/assessment.controller.ts`
- Modify: `apps/api/src/modules/assessment/assessment.service.ts`

- [ ] **Step 1: Allow `createSession` to accept optional auth context**
  - If session token present, set `AssessmentSession.userId`

### Task 5: Next.js BFF routes (cookie set/clear + proxy)

**Files:**
- Create: `src/app/api/auth/public-key/route.ts`
- Create: `src/app/api/auth/register/route.ts`
- Create: `src/app/api/auth/login/route.ts`
- Create: `src/app/api/auth/logout/route.ts`
- Create: `src/app/api/auth/me/route.ts`
- Create: `src/app/api/history/route.ts`

- [ ] **Step 1: Implement proxy to Nest**
- [ ] **Step 2: In login route, set HttpOnly cookie**
- [ ] **Step 3: In logout route, clear cookie**
- [ ] **Step 4: Ensure proxy adds `x-session-token` from cookie**

### Task 6: Frontend pages (register/login/history)

**Files:**
- Create: `src/lib/rsa-client.ts`
- Create: `src/app/login/page.tsx`
- Create: `src/app/register/page.tsx`
- Create: `src/app/account/history/page.tsx`

- [ ] **Step 1: Implement RSA encryption helper using WebCrypto**
- [ ] **Step 2: Build register + login forms**
- [ ] **Step 3: Build history page (fetch `/api/history`)**

### Task 7: Tests & verification

**Files:**
- Add tests where adjacent patterns exist (`vitest` in both apps)

- [ ] **Step 1: Add API unit tests for auth service (hash/verify/decrypt)**
- [ ] **Step 2: Add BFF route tests for cookie set/clear**
- [ ] **Step 3: Run tests**
  - Run: `pnpm test`
  - Run: `pnpm --dir apps/api test`

