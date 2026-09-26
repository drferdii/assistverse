# CONTEXT

Capsule identity. Change it rarely, and state only facts that the capsule's own `README.md`,
`AGENTS.md`, or `project.contract.json` also state.

- Purpose: Public Sentra Assist website under `sentrahai.com/asisten-medis` (prototype).
- Human owner: Chief (dr. Ferdi Iskandar)
- Default risk: R1
- Stack: Next.js 16 (Turbopack build), Better Auth, libSQL/Turso, Resend, AI SDK with Gemini;
  Node 24, pnpm 11.21.0, own lockfile
- Contract and commands: `project.contract.json` and `AGENTS.md` "Commands"
- Protected areas: `lib/auth.ts`, `proxy.ts` (guards `/pilot`), `scripts/migrate-turso.mjs`

This folder is tracked and publishes with the capsule. Treat it as public: no secrets,
credentials, tokens, phone numbers, messaging identifiers, personal data, or database dumps.
Name environment variables, never their values.
