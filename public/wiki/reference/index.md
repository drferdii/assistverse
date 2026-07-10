# Reference

This section holds the technical reference material for Sentra Assist. If you
need exact field names, environment variables, dependency versions, or type
definitions, you are in the right place.

## What's here

- [Configuration](configuration.md) — Every environment variable from
  `.env.example`, grouped by category, with defaults and descriptions. Use this
  when setting up a new development machine or debugging why a feature flag is
  not taking effect.
- [Data models](data-models.md) — Key TypeScript interfaces and types that move
  through the system. Covers patient context, encounters, diagnosis results,
  alerts, trajectory output, and bridge payloads. Each entry lists the source
  file so you can trace the definition.
- [Dependencies](dependencies.md) — Production and development dependencies with
  their roles. Helpful when deciding whether a new package is needed or when
  troubleshooting version conflicts.

## How to use this section

Start with the page closest to your current task. If you are wiring a new
environment variable, read the configuration page first to follow the existing
naming convention. If you are building a new component that consumes diagnosis
data, check the data models page to see which interfaces are already defined. If
you are adding a charting library, consult the dependencies page to avoid
duplicating capabilities.

These pages are generated from the live codebase. When the code changes, the
reference should be updated to match.
