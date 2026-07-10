# Dependencies

Sentra Assist is a single-package project built on WXT + React + TypeScript.
This page lists the major dependencies and what they do. All versions are from
`apps/healthcare/sentra-assistv1/package.json`.

---

## Production dependencies

These are bundled into the extension and ship to users.

| Package                        | Version    | Role                                                                                                                      |
| ------------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------- |
| `react`                        | `^18.3.1`  | UI framework. All components are React function components with hooks.                                                    |
| `react-dom`                    | `^18.3.1`  | React DOM renderer for the side panel and popup entry points.                                                             |
| `zustand`                      | `^4.5.0`   | Lightweight state management. The encounter store (`lib/store.ts`) uses Zustand with `browser.storage.local` persistence. |
| `framer-motion`                | `^12.38.0` | Animation library for transitions, alert banners, and trajectory chart entrance effects.                                  |
| `recharts`                     | `^3.8.1`   | React charting library. Used for trajectory trend visualizations and vital sign history charts.                           |
| `react-apexcharts`             | `^1.9.0`   | React wrapper for ApexCharts. Powers the more complex clinical trajectory and comparison charts.                          |
| `apexcharts`                   | `^5.3.6`   | Underlying charting engine for `react-apexcharts`.                                                                        |
| `tesseract.js`                 | `^7.0.0`   | OCR engine for reading text from images and scanned documents inside the extension.                                       |
| `lucide-react`                 | `^0.468.0` | Icon set. All UI icons (alert triangles, medical symbols, navigation) come from this library.                             |
| `@pieces.app/pieces-os-client` | `^4.1.0`   | Pieces OS client for local AI-assisted code and context management during development.                                    |

---

## Development dependencies

These are used during build, test, and local development. They do not ship to
users.

| Package                     | Version    | Role                                                                                                       |
| --------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------- |
| `wxt`                       | `^0.20.13` | Browser extension framework. Handles manifest generation, HMR, and cross-browser builds (Chrome, Firefox). |
| `@wxt-dev/module-react`     | `1.1.5`    | WXT React integration module.                                                                              |
| `@wxt-dev/storage`          | `^1.2.6`   | WXT storage helpers for `browser.storage.local` and `browser.storage.sync`.                                |
| `vite`                      | `^6.0.7`   | Build tool. WXT uses Vite under the hood for bundling and HMR.                                             |
| `typescript`                | `^5.8.3`   | Type checker and compiler.                                                                                 |
| `typescript-eslint`         | `^8.0.0`   | ESLint parser and plugin for TypeScript.                                                                   |
| `vitest`                    | `^2.0.0`   | Unit and integration test runner.                                                                          |
| `@vitest/ui`                | `^2.0.0`   | Vitest UI for browsing test results in a browser.                                                          |
| `@testing-library/react`    | `^16.0.0`  | React component testing utilities.                                                                         |
| `@testing-library/jest-dom` | `^6.6.0`   | Custom DOM matchers for Vitest.                                                                            |
| `playwright`                | `^1.48.0`  | End-to-end browser testing.                                                                                |
| `@playwright/test`          | `^1.48.0`  | Playwright test runner package.                                                                            |
| `eslint`                    | `^9.0.0`   | Linter with flat config (`eslint.config.mjs`).                                                             |
| `eslint-plugin-react`       | `^7.37.0`  | React-specific lint rules.                                                                                 |
| `prettier`                  | `^3.3.0`   | Code formatter.                                                                                            |
| `tailwindcss`               | `^3.4.0`   | Utility-first CSS framework. All component styling uses Tailwind classes.                                  |
| `autoprefixer`              | `^10.4.16` | PostCSS plugin for adding vendor prefixes.                                                                 |
| `postcss`                   | `^8.4.32`  | CSS processor used by Tailwind.                                                                            |
| `typedoc`                   | `^0.28.16` | TypeScript documentation generator.                                                                        |
| `jsdom`                     | `^25.0.0`  | DOM environment for Vitest unit tests.                                                                     |
| `sharp`                     | `^0.34.5`  | Image optimization utility.                                                                                |

---

## Notable absences

Sentra Assist intentionally avoids some common dependencies:

- **No Redux or MobX.** Zustand is sufficient for a single-store extension.
- **No Axios or Fetch wrapper.** The bridge client (`lib/api/bridge-client.ts`)
  uses the native `fetch` API.
- **No UI component library (MUI, Chakra, etc.).** All components are
  custom-built with Tailwind CSS for precise control over the clinical UI.
- **No bundler besides Vite.** WXT wraps Vite, so there is no separate Webpack
  or Rollup config.

---

## Adding a new dependency

Before adding a package, check whether an existing dependency already covers the
use case. The extension bundle size matters because it ships to every user's
browser. If you do add something, update both `package.json` and this reference
page, and run `npm run quality` to verify the build still passes.
