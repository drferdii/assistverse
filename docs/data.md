# Data

- Store: Turso (libSQL) via `DATABASE_URL` and `DATABASE_AUTH_TOKEN`. Tables are created by
  `scripts/migrate-turso.mjs` (auth tables and pilot tables) and documented in
  `docs/db-schema.sql`.
- Personal data: pilot registrants' names, emails, and profession. No patient data.
- Local builds use `.data/local.db` (gitignored); it never holds real data.
- Running `scripts/migrate-turso.mjs` against the real Turso database is a production data
  change and needs Chief's approval.
- Reference content (`sentrapedia/`, `public/wiki/`) is public clinical reference text, not
  patient data.
