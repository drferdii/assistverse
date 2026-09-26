# Testing

- Type check: `node scripts/pnpm.mjs run typecheck` (`tsc --noEmit`).
- Unit tests: `node scripts/pnpm.mjs run test` runs the node:test files in `tests/`:
  `site.test.mjs` (base-path URL helpers) and `wiki.test.mjs` (every wiki page in the metadata
  resolves). Node 24 loads the TypeScript modules directly.
- Build: `node scripts/with-local-env.mjs run build`.
- Deploy dry-run: `node scripts/pnpm.mjs run deploy:dry-run` checks the build artifact and that
  no server-only variable name appears in the client bundle.
- Lint: none (see `AGENTS.md`).
- Known limitation: there are no browser tests; the auth and pilot flows are untested.
