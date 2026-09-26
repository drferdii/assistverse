# Configuration

Sentra Assist reads its runtime configuration from environment variables. All
variables are defined in `apps/healthcare/sentra-assistv1/.env.example`. Copy
that file to `.env.local` and fill in your values. Never commit `.env.local` to
git.

Variables fall into six categories: backend API, development options, feature
flags, OpenAI LLM settings, safety toggles, and debug channels.

---

## Backend API

These three variables are required for any environment that talks to the Sentra
backend.

| Variable              | Default                    | Description                                                                                                |
| --------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `VITE_SENTRA_API_URL` | `https://api.sentra.local` | Base URL for the Sentra API. HTTPS is enforced in production.                                              |
| `VITE_SENTRA_API_KEY` | `sk_dev_your_api_key_here` | API key for authenticating with the Sentra backend. Get this from a Sentra admin.                          |
| `VITE_FACILITY_ID`    | `PUSKESMAS_BALOWERTI`      | Facility identifier for multi-tenant setups. Used to scope data and configuration to a specific Puskesmas. |

---

## Development options

These variables control local development behavior, mock data, timeouts, and
debug logging.

| Variable                | Default | Description                                                                                                          |
| ----------------------- | ------- | -------------------------------------------------------------------------------------------------------------------- |
| `VITE_USE_MOCK`         | `true`  | When `true`, the extension uses local mock data instead of calling the real API. Keep this on during UI development. |
| `VITE_API_TIMEOUT`      | `10000` | Global API request timeout in milliseconds.                                                                          |
| `VITE_DEBUG`            | `false` | Master switch for debug logging across the extension.                                                                |
| `VITE_DEBUG_RIWAYAT`    | `false` | Focused debug logging for the visit history scraper and bridge.                                                      |
| `VITE_DEBUG_BACKGROUND` | `false` | Debug logging for the background service worker. Falls back to `VITE_DEBUG` when omitted.                            |
| `VITE_DEBUG_CONTENT`    | `false` | Debug logging for the content script that runs inside ePuskesmas pages. Falls back to `VITE_DEBUG` when omitted.     |
| `VITE_DEBUG_FILLER`     | `false` | Debug logging for the form auto-fill engine. Falls back to `VITE_DEBUG` when omitted.                                |

### Message timeout tuning

These values control how long the extension waits for a response from different
subsystems. All values are clamped at runtime to the range `[1000, 60000]`.

| Variable                           | Default | Description                                         |
| ---------------------------------- | ------- | --------------------------------------------------- |
| `VITE_MESSAGE_TIMEOUT_DEFAULT`     | `10000` | Default message timeout in milliseconds.            |
| `VITE_MESSAGE_TIMEOUT_FILL`        | `8000`  | Timeout for form-fill operations.                   |
| `VITE_MESSAGE_TIMEOUT_SCRAPE`      | `5000`  | Timeout for page scraping operations.               |
| `VITE_MESSAGE_TIMEOUT_VISIT_FETCH` | `15000` | Timeout for fetching visit history.                 |
| `VITE_MESSAGE_TIMEOUT_AI`          | `30000` | Timeout for AI diagnosis and prescription requests. |

---

## Feature flags

Feature flags are boolean toggles that enable or disable major modules. They let
you turn off an entire subsystem without touching code.

| Variable                       | Default | Description                                                                        |
| ------------------------------ | ------- | ---------------------------------------------------------------------------------- |
| `VITE_FEATURE_DIAGNOSIS_AI`    | `true`  | Enables AI diagnosis suggestions from the Iskandar Diagnosis Engine.               |
| `VITE_FEATURE_PRESCRIPTION_AI` | `true`  | Enables AI prescription recommendations.                                           |
| `VITE_FEATURE_DDI_CHECK`       | `true`  | Enables real-time drug-drug interaction checking against the DDInter 2.0 database. |
| `VITE_FEATURE_PEDIATRIC_DOSE`  | `true`  | Enables the pediatric dosing calculator.                                           |

---

## OpenAI LLM settings

The Iskandar Diagnosis Engine can optionally use an LLM for constrained
reranking. These variables configure that layer.

| Variable                   | Default       | Description                                                                           |
| -------------------------- | ------------- | ------------------------------------------------------------------------------------- |
| `SENTRA_OPENAI_API_KEY`    | (none)        | OpenAI API key. Without this, the engine falls back to knowledge-base-only reasoning. |
| `SENTRA_OPENAI_MODEL`      | `gpt-4o-mini` | Model to use. Alternatives: `gpt-4o`, `gpt-4-turbo`.                                  |
| `SENTRA_OPENAI_TIMEOUT_MS` | `30000`       | Timeout for OpenAI requests in milliseconds.                                          |

---

## Safety toggles

These variables disable specific safety layers. They are commented out by
default because disabling them reduces clinical safety. Only change them if you
know exactly what you are doing.

| Variable                           | Default         | Description                                                               |
| ---------------------------------- | --------------- | ------------------------------------------------------------------------- |
| `SENTRA_DISABLE_TRAJECTORY_BRIDGE` | (commented out) | When set to `true`, disables the SYMPHONY trajectory bridge safety layer. |
| `SENTRA_DISABLE_THERAPY`           | (commented out) | When set to `true`, disables pharmacotherapy recommendations entirely.    |

---

## Diagnosis V2 shadow mode

| Variable                     | Default | Description                                                                                                                                    |
| ---------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `SENTRA_DIAGNOSIS_V2_SHADOW` | `false` | When `true`, runs the new Diagnosis V2 pipeline in parallel with the production V1 engine and logs the comparison. Does not replace V1 output. |

---

## Naming conventions

- Variables prefixed with `VITE_` are exposed to the browser extension frontend
  via Vite's `import.meta.env`.
- Variables prefixed with `SENTRA_` are server-side or background-script only.
- Boolean flags use string values (`"true"` or `"false"`) because environment
  variables are always strings at the OS level. The codebase normalizes them
  with `toFlagBool` helpers.

If you add a new variable, follow the existing prefix and keep the description
comment directly above the declaration so `.env.example` stays self-documenting.
