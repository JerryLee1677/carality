# Auth (RSA Password + Cookie Session) Design

**Date:** 2026-05-22  
**Scope:** Add user registration + login using RSA-encrypted password from browser, and cookie-based sessions via Next.js BFF. Logged-in users can view historical assessment results. Anonymous users can still take the quiz and view the current result, but anonymous results are not retroactively “claimed”.

## Goals

- Allow users to register and login with `email + password`.
- Browser encrypts password with RSA public key (RSA-OAEP + SHA-256) before sending.
- API server decrypts password with RSA private key, then verifies/stores password using a strong password hash.
- Use **HttpOnly cookie** session (`SameSite=Lax`) with a server-side `AuthSession` table (revocable sessions).
- Logged-in users can list their past completed assessment results.

## Non-goals (for now)

- Email verification, password reset, admin features.
- “Claiming” anonymous sessions after login.
- Multi-factor auth.

## Architecture Overview

**Browser → Next.js (BFF) → Nest (apps/api) → Postgres**

- Browser only calls **same-origin** Next Route Handlers under `src/app/api/*`.
- Next Route Handlers forward requests to Nest (`http://127.0.0.1:4010`) using `assessmentApiFetch`, and manage HttpOnly cookies.
- Nest owns DB access, user/session tables, and authorization logic.

## Data Model (Prisma: `apps/api/prisma/schema.prisma`)

### `User`

- `id: String @id @default(cuid())`
- `email: String @unique`
- `passwordHash: String` (scrypt-derived, includes params + salt)
- `emailVerified: Boolean @default(false)`
- `createdAt/updatedAt`

### `AuthSession`

- `id: String @id @default(cuid())`
- `userId: String`
- `tokenHash: String @unique` (hash of session token, never store raw token)
- `expiresAt: DateTime`
- `revokedAt: DateTime?`
- `lastSeenAt: DateTime?`
- `createdAt`

### Link assessment sessions to users

- Add optional `userId` on `AssessmentSession`:
  - Anonymous quiz: `userId = null`
  - Logged-in quiz: `userId = currentUserId`

## Crypto Details

### RSA password encryption

- Algorithm: `RSA-OAEP` + `SHA-256`
- Public key distribution: Nest exposes `GET /auth/public-key` returning PEM (`spki`).
- Browser:
  - Fetch public key PEM via Next BFF (`GET /api/auth/public-key`).
  - Import PEM into WebCrypto (`subtle.importKey` with `spki`).
  - Encrypt UTF-8 password bytes → `ArrayBuffer`.
  - Encode ciphertext as base64 and send as `encryptedPassword`.

### RSA password decryption

- Nest decrypts base64 ciphertext using server private key PEM with OAEP SHA-256.
- Private key storage:
  - `AUTH_RSA_PRIVATE_KEY_B64` (base64-encoded PEM) in `apps/api` environment.
  - Nest decodes to PEM string at runtime.
- The private key is never sent to Next or browser.

### Password hashing

- Use Node `crypto.scrypt` with random salt.
- Store as a single string including parameters for future migration, e.g.:
  - `scrypt$N=16384$r=8$p=1$salt=<b64>$hash=<b64>`
- Compare using `timingSafeEqual`.

## Sessions & Cookies

### Session token format

- Generate `sessionToken` as 32 random bytes base64url (or hex).
- Store **hash(sessionToken)** in `AuthSession.tokenHash`.
- Set **raw `sessionToken`** in HttpOnly cookie:
  - Name: `carality_session`
  - `HttpOnly: true`
  - `SameSite: Lax`
  - `Path: /`
  - `Secure: true` in production only
  - `Max-Age: 7 days` (configurable)

### Authentication on API calls

- Next BFF reads cookie and forwards the raw token to Nest as header:
  - `x-session-token: <sessionToken>`
- Nest:
  - Hashes token
  - Loads `AuthSession` + `User`
  - Validates not revoked and not expired

## API Surface

### Nest (internal API used by BFF)

- `GET /auth/public-key`
  - Response: `{ publicKeyPem: string }`
- `POST /auth/register`
  - Body: `{ email: string, encryptedPassword: string }`
  - Response: `{ userId: string }`
- `POST /auth/login`
  - Body: `{ email: string, encryptedPassword: string }`
  - Response: `{ sessionToken: string, user: { id: string, email: string } }`
- `POST /auth/logout`
  - Header: `x-session-token`
  - Response: `{ ok: true }`
- `GET /auth/me`
  - Header: `x-session-token`
  - Response: `{ user: { id: string, email: string } }`
- `GET /history`
  - Header: `x-session-token`
  - Response: array of completed session summaries (new DTO)

### Next BFF (browser-facing, same-origin)

- `GET /api/auth/public-key` → forwards to Nest
- `POST /api/auth/register` → forwards to Nest
- `POST /api/auth/login` → forwards to Nest, then sets cookie
- `POST /api/auth/logout` → forwards to Nest, clears cookie
- `GET /api/auth/me` → forwards to Nest
- `GET /api/history` → forwards to Nest with `x-session-token`

## UI/Pages

- `/register`: email + password form, encrypt password, call `/api/auth/register`
- `/login`: email + password form, encrypt password, call `/api/auth/login`
- `/account/history`: shows user’s completed assessment results (requires login)

Header updates (optional in first pass):
- Add “登录/注册” entry when logged out, “历史记录/退出” when logged in.

## Error Handling

- Register:
  - Duplicate email → 409
  - Invalid email/password length → 400
- Login:
  - Invalid credentials → 401
- History:
  - No session → 401

## Security Notes

- RSA encryption does not replace TLS/HTTPS; it only satisfies the requirement that the password is encrypted at the application layer before transit.
- Use rate limiting / lockout later (out of scope for now).
- Keep `SameSite=Lax` and avoid state-changing `GET` endpoints.

