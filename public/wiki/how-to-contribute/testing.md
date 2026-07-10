# Pengujian

## Pelaksana pengujian

| Konfigurasi                 | Lingkungan                      | Cakupan                                                                       |
| --------------------------- | ------------------------------- | ----------------------------------------------------------------------------- |
| `vitest.config.ts`          | jsdom                           | Unit + integrasi (tidak termasuk `tests/e2e/`)                                |
| `vitest.unit.config.ts`     | node                            | `lib/**/*.test.ts`, `tests/**/*.test.ts`                                      |
| `vitest.clinical.config.ts` | jsdom (dengan alias jalur pnpm) | `components/clinical/**/*.test.ts{,x}`, `entrypoints/sidepanel/**/*.test.tsx` |
| `playwright.config.ts`      | Chromium (headed)               | Pengujian E2E dengan pemuatan ekstensi                                        |

## Menjalankan pengujian

```bash
# Semua pengujian Vitest
npm run test

# Pengujian kontrak API jembatan
npm run test:contract

# Pengujian E2E (Playwright)
npm run test:e2e

# Vitest dengan UI
npm run test:ui
```

## Pola pengujian

- **Penamaan:** `[modul].[deskripsi].test.ts` atau `[modul].[sub-fitur].test.ts`
- **Contoh:** `ClinicalDifferential.autoselect.test.tsx`,
  `get-suggestions-flow.error.test.ts`,
  `EcgDiagnosticAssist.patient-safety.test.tsx`
- **Setup:** `tests/setup.ts` mengkonfigurasi
  `@testing-library/jest-dom/vitest` + pembersihan otomatis
- **Mock Server:** `tests/mock-crew-server.ts` untuk pemockingan API
- **Fixtures:** `tests/medlens-local/fixtures/` untuk data pengujian ECG

## Kategori pengujian

1. **Pengujian unit** — Fungsi individual, logika murni
2. **Pengujian integrasi** — Klien API, komunikasi jembatan
3. **Pengujian klinis** — Komponen UI dengan jsdom + React Testing Library
4. **Pengujian E2E** — Playwright dengan pemuatan ekstensi Chrome nyata
5. **Pengujian keamanan** — Jalur kritis keselamatan pasien (mis.,
   `ecg-patient-safety.test.ts`)
6. **Pengujian kontrak** — Paritas pesan, kontrak API

## Menulis pengujian

- Gunakan `@testing-library/react` untuk pengujian komponen
- Mock API `chrome.*` melalui mock vitest
- Gunakan `tests/mock-crew-server.ts` untuk pemockingan API
- Pengujian keamanan harus mencakup kasus tepi (vital tidak valid, data hilang,
  kegagalan jaringan)

## Halaman terkait

- [Cara berkontribusi](index.md)
- [Alur kerja pengembangan](development-workflow.md)
- [Debugging](debugging.md)
- [Pola dan konvensi](patterns-and-conventions.md)
- [Peralatan](tooling.md)
