# Architecture

- Next.js 16 App Router site with `basePath` `/asisten-medis` (`lib/site.ts`), served behind
  the Sentraverse rewrite on sentrahai.com.
- Static pages: home, manifesto, principles, capabilities, contact, privacy, terms, Sentrapedia,
  and the wiki rendered from `public/wiki/*.md` (`lib/wiki.ts`).
- Dynamic parts:
  - `app/api/auth/[...all]` — Better Auth (`lib/auth.ts`) on libSQL/Turso, email through Resend.
  - `app/api/pilot/*` — pilot sign-up and session check on libSQL.
  - `app/api/chat` — AI chat demo through the AI SDK and Gemini.
  - `proxy.ts` — redirects `/pilot` to `/login` without a session.
  - `/acars` — map view using maplibre-gl.
- Failure modes: without `DATABASE_URL` or `RESEND_API_KEY` the auth and pilot routes fail at
  module load; `scripts/with-local-env.mjs` covers local build and run.
