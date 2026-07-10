# Peralatan

## Sistem build

WXT (Web Extension Toolkit) adalah kerangka build. Menangani:

- Generasi Manifest V3/V2
- Hot reload selama pengembangan
- Build lintas peramban (Chrome, Firefox)
- Kompilasi TypeScript via Vite

Konfigurasi: `wxt.config.ts`

## Linter dan formatter

| Alat       | Konfigurasi         | Perintah            |
| ---------- | ------------------- | ------------------- |
| ESLint     | `eslint.config.mjs` | `npm run lint`      |
| Prettier   | `.prettierrc`       | `npm run format`    |
| TypeScript | `tsconfig.json`     | `npm run typecheck` |
| cspell     | `cspell.json`       | —                   |

## Generator kode

| Skrip                          | Tujuan                                   |
| ------------------------------ | ---------------------------------------- |
| `npm run docs:generate`        | Hasilkan HTML TypeDoc                    |
| `npm run docs:auto`            | Hasilkan komentar TSDoc secara otomatis  |
| `npm run docs:auto:lib`        | Auto-dokumentasi direktori `lib/`        |
| `npm run docs:auto:utils`      | Auto-dokumentasi direktori `utils/`      |
| `npm run docs:auto:components` | Auto-dokumentasi direktori `components/` |
| `npm run docs:all`             | Pipeline dokumentasi penuh               |
| `npm run commit`               | Commit otomatis cerdas                   |
| `npm run commit:push`          | Auto-commit + push                       |
| `npm run commit:watch`         | Mode watch auto-commit                   |

## Skrip build/data

| Skrip                                     | Tujuan                               |
| ----------------------------------------- | ------------------------------------ |
| `scripts/build/optimize-ddi-database.js`  | Filter DDI ke Mayor + Sedang saja    |
| `scripts/data/convert-ddi-csv-to-json.js` | Konversi CSV DDInter ke JSON ringkas |
| `scripts/data/remove-bg.mjs`              | Penghapusan latar belakang gambar    |
| `scripts/upgrade-penyakit.mjs`            | Peningkatan database penyakit        |
| `scripts/dev/setup.sh`                    | Setup lingkungan pengembangan        |

## Halaman terkait

- [Cara berkontribusi](index.md)
- [Alur kerja pengembangan](development-workflow.md)
- [Pengujian](testing.md)
- [Debugging](debugging.md)
- [Pola dan konvensi](patterns-and-conventions.md)
