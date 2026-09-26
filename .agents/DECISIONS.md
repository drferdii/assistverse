# DECISIONS

Append-only, newest first. Record only durable decisions that concern this capsule. Each entry
has a dated heading, the decision, a short rationale, and its evidence.

## 2026-09-27 — Standalone-repo hardening brought into the capsule

- Decision (Chief, option A, R2): commit `8d5f21cb` from `drferdi/Assistverse` `master` ("harden
  build env handling and ci checks") never reached abyss-monorepo, so the capsule lacked it. Its
  files now come from `master`: `lib/auth.ts`, `lib/server-env.ts`, `lib/server-db.ts`, the auth
  and pilot API routes, `proxy.ts`, layout and motion components, `eslint.config.mjs`, and
  `.github/workflows/ci.yml` (adjusted to pnpm 11.21.0 and Node 24 to match `packageManager`
  and `engines`). Every replaced file was unchanged since legacy, so nothing from the migration
  was overwritten.
- Dependency ranges follow `master`: `better-auth ^1.6.22`, `next ^16.2.11`, `postcss ^8.5.24`,
  `eslint ^9.16.0`, `eslint-config-next ^16.0.0`; `maplibre-gl ^6.11.2` stays (newer than
  `master`). Fresh lockfile resolves better-auth 1.7.6, next 16.3.6, postcss 8.5.28, nanoid 3.3.19.
- The `.env.example` part of `8d5f21cb` is not applied here (agents cannot edit `.env*`).
- ESLint now runs and reports 4 `react-hooks/set-state-in-effect` errors in capsule-only
  components; lint stays out of the contract until they are fixed.
- Evidence: `pnpm project:verify healthcare/assistverse` PASS on 2026-09-27.

## 2026-09-26 — Migrated from abyss-monorepo into SAFRS

- Decision: The legacy folder `abyss-monorepo/apps/healthcare/assistverse` was copied as it is
  to `projects/healthcare/assistverse`. Source: legacy commit
  `762e48cb4bb1967e2132e7b530e8f2a7f4231c59`.
- Not copied: `sentrapedia/Referensi_Klinis_144_Penyakit_Puskesmas_2026.xlsx` (spreadsheets are
  never copied; the `.md` version of the same reference is kept), `graphify-out/`, `.env.local`,
  `node_modules/`, `.next/`.
- The legacy `.agents/AGENTS.md` (image style rules) was merged into `AGENTS.md`.
- Toolchain: fresh pnpm 11.21.0 lockfile with `nodeLinker: hoisted`, Node 24. `pnpm audit`
  on 2026-09-26 flagged a critical XSS advisory in `maplibre-gl` 5.x, fixed only in 6.4.1;
  upgraded to `^6.11.2` and changed its import in `components/acars/AcarsMap.tsx` to a
  namespace import (version 6 has no default export). Audit then reported no known vulnerabilities.
- Lint is N/A: no ESLint configuration existed and `next lint` was removed in Next.js 16.
- The legacy project had no tests. Added `tests/site.test.mjs` and `tests/wiki.test.mjs`
  (node:test) for the base-path URL helpers and the wiki loader.
- The build needs `DATABASE_URL` and `RESEND_API_KEY` at module load (on Vercel they are set).
  `scripts/with-local-env.mjs` supplies a local file database and a placeholder key only when
  they are unset, so the capsule builds and runs without credentials.

## 2026-09-27 — Environment example restored

- The legacy `.env.local.example` was missed by the first copy (the legacy root `.gitignore`
  hid it from Git). It is now at `.env.example`, the only env-file name the enclosing
  repository tracks; every value in it is an empty placeholder or a public URL.
