# Repo Review (April 3, 2026)

## Scope
- Quick architecture and code-path review focused on transaction flow, webhook handling, and admin operations.
- Basic static quality checks via ESLint.

## What looks good
- Stripe webhook signature verification is implemented before processing events.
- Webhook route includes partial idempotency guard (`PAID` check) to avoid duplicate work.
- Transaction status transitions are partially constrained (`COMPLETED` requires `PROCESSING`).
- Prisma models are clean and reflect the MVP domain well.

## Risks found
1. **Admin API route exposure risk (fixed in this branch)**
   - `proxy.ts` only protected `/admin/*`, while status updates are performed through `/api/admin/complete`.
   - This created a gap where API access controls could be bypassed.
   - **Fix applied:** proxy matcher and route guard now include `/api/admin/*`.

2. **Client/UI warning in recipient country select (fixed in this branch)**
   - The recipient country `<select>` is controlled with `value`, but a child option also set `selected`.
   - In React this can produce warnings and non-idiomatic state control.
   - **Fix applied:** removed `selected` from placeholder option.

3. **Auth hardening opportunities (not yet implemented)**
   - Basic auth currently checks password only; username is ignored.
   - Consider requiring both expected username and password, then moving to session-based admin auth.

4. **Consistency opportunities (not yet implemented)**
   - Sender country value handling appears mixed between country codes and currency codes across forms.
   - Consider normalizing to one canonical field and deriving display/currency from mapping.

## Checks run
- `pnpm lint` (passes with one warning before fix; warning removed by username variable cleanup).

## Suggested next priorities
1. Replace Basic auth with first-party admin session auth.
2. Add automated tests for webhook idempotency and admin status transitions.
3. Add explicit validation schema (e.g., Zod) for transaction payloads.
4. Add rate limiting to public write endpoints (`/api/transactions`, `/api/webhooks/stripe`).
