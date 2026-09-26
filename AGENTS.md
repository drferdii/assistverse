# Assistverse — Capsule Router

## Inheritance

This file is sufficient capsule-local guidance after extraction. When nested in a governed
repository, its contribution rules may add review or security requirements; those requirements
must not become lifecycle or standalone-verification dependencies.

## Objective and ownership

- Project: Assistverse (domain: `healthcare`), package `sentra-assist`
- Objective: Public Sentra Assist website served under `sentrahai.com/asisten-medis`, with a
  pilot sign-up, wiki, Sentrapedia reference, and an AI chat demo.
- Human owner: Chief (dr. Ferdi Iskandar)
- Default risk: `R1`. It is an active prototype and never a clinical system.

## Standalone contract

This capsule owns its runtime: its own pnpm workspace, lockfile, scripts, and build
configuration. It never depends on an enclosing workspace, catalog, lockfile, configuration,
script, tool, package, or another capsule. External services are declared in
`project.contract.json` by environment-variable name only.

## Required context

Read `.agents/HANDOFF.md` first, then `.agents/CONTEXT.md`.

1. `README.md`
2. `docs/architecture.md`
3. `docs/data.md`
4. `docs/testing.md`

## Commands

All commands run from this capsule root as argv; see `project.contract.json`.

- `install`: `node scripts/pnpm.mjs install --frozen-lockfile`
- `lint`: N/A (no ESLint configuration; `next lint` no longer exists in Next.js 16)
- `typecheck`: `node scripts/pnpm.mjs run typecheck`
- `test`: `node scripts/pnpm.mjs run test` (node:test suite in `tests/`)
- `build`: `node scripts/with-local-env.mjs run build`
- `run`: `node scripts/with-local-env.mjs run start` (127.0.0.1:4341, base path `/asisten-medis`)
- `deployDryRun`: `node scripts/pnpm.mjs run deploy:dry-run`

`scripts/with-local-env.mjs` fills `DATABASE_URL` with a local file database and
`RESEND_API_KEY` with a placeholder only when they are unset, so builds never need credentials.

## Visual assets and illustration guidelines

Chief prefers images in this exact style. Use this prompt and style when generating or selecting
images for this project:

**Prompt style:** "A high-end, premium minimalist architectural wireframe sketch, monochrome,
pencil on pure white background, NO vignette, NO borders, NO drop shadow. Clean, Swiss-design
inspired, lots of negative space."

- Never generate 3D renders, vector art, colorful illustrations, or generic AI imagery.
- Images must have a pure white background so they blend into the centre or hero sections.
- Never add drop shadows, thick borders, or vignettes to images.

## Prohibited actions

- Never store patient data; pilot sign-up holds only professional contact details.
- Do not run `scripts/migrate-turso.mjs` against a real database without Chief's approval.
- Do not use production credentials or production data.
