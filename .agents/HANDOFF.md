# HANDOFF

Last updated: 2026-09-26

Overwrite this file at the end of every capsule-scoped session; never append. Keep it under about
1k tokens. Durable decisions go to `DECISIONS.md`.

## Current state

Migrated from abyss-monorepo on 2026-09-26; the standalone repo's hardening commit `8d5f21cb`
and its dependency ranges were brought in on 2026-09-27 (see `DECISIONS.md`). Typecheck, test,
build and deploy dry-run pass from the capsule root with pnpm 11.21.0 and Node 24.

## Work in flight

None.

## Blockers

None.

## Next action

1. Fix the 4 `react-hooks/set-state-in-effect` lint errors (CommandPrompt,
   TerminalTypewriterSimple, useTypewriter), then add `lint` to the contract; the standalone CI
   runs `pnpm run check`, which includes lint.
2. Chief: add the `.env.example` lines from `8d5f21cb`.
3. Chief: merge `safrs/standalone-capsule` into `master` of `drferdi/Assistverse` (PNG files must
   go in as real images, not Git LFS pointers).
