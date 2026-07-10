# Panduan memulai

## Prasyarat

| Kebutuhan             | Versi   | Catatan                                                               |
| --------------------- | ------- | --------------------------------------------------------------------- |
| Node.js               | >= 22.x | Diperlukan untuk WXT, Vitest, dan tooling lokal                       |
| npm                   | >= 10.x | Package manager utama dalam repositori ini                            |
| Chrome atau Firefox   | Terbaru | Untuk memuat ekstensi secara unpacked                                 |
| Akun Sentra Dashboard | —       | Diperlukan untuk autentikasi, polling bridge, dan sinkronisasi pasien |

## Instalasi

Clone repositori dan pasang dependensi:

```bash
npm install
cp .env.example .env.local
```

Sunting `.env.local` dengan konfigurasi Anda. Setidaknya isi:

```env
VITE_SENTRA_API_URL=https://api.sentra.local
VITE_SENTRA_API_KEY=sk_dev_your_api_key_here
VITE_FACILITY_ID=PUSKESMAS_BALOWERTI
```

## Pengembangan

Jalankan server pengembangan WXT:

```bash
# Chrome (hot reload)
npm run dev

# Firefox
npm run dev:firefox
```

Muat ekstensi secara unpacked:

- **Chrome:** buka `chrome://extensions` → aktifkan Developer Mode → Load
  Unpacked → pilih `.output/chrome-mv3-dev/`
- **Firefox:** buka `about:debugging` → Load Temporary Add-on → pilih
  `.output/firefox-mv2-dev/manifest.json`

## Build produksi

```bash
# Chrome MV3
npm run build

# Firefox MV2
npm run build:firefox

# Buat ZIP untuk Chrome Web Store
npm run zip

# Buat ZIP untuk Firefox Add-ons
npm run zip:firefox
```

## Menjalankan pengujian

```bash
# Unit dan integration tests (Vitest)
npm run test

# Bridge API contract tests
npm run test:contract

# E2E tests (Playwright)
npm run test:e2e

# Type checking
npm run typecheck

# Linting
npm run lint

# Full quality gate
npm run quality
```

## Perintah proyek

| Perintah                | Deskripsi                                  |
| ----------------------- | ------------------------------------------ |
| `npm run dev`           | Jalankan server pengembangan WXT (Chrome)  |
| `npm run dev:firefox`   | Jalankan server pengembangan WXT (Firefox) |
| `npm run build`         | Build produksi (Chrome)                    |
| `npm run build:firefox` | Build produksi (Firefox)                   |
| `npm run zip`           | Buat ZIP untuk Chrome Web Store            |
| `npm run zip:firefox`   | Buat ZIP untuk Firefox Add-ons             |
| `npm run test`          | Jalankan semua test Vitest                 |
| `npm run test:contract` | Bridge client contract tests               |
| `npm run test:e2e`      | Playwright E2E tests                       |
| `npm run test:ui`       | Vitest dengan UI                           |
| `npm run typecheck`     | Pemeriksaan TypeScript                     |
| `npm run lint`          | ESLint                                     |
| `npm run lint:fix`      | ESLint dengan auto-fix                     |
| `npm run format`        | Prettier format                            |
| `npm run quality`       | typecheck + lint + test                    |
| `npm run docs:generate` | Hasilkan TypeDoc                           |
| `npm run docs:auto`     | Otomatis hasilkan komentar TSDoc           |
| `npm run docs:all`      | Pipeline dokumentasi penuh                 |
| `npm run commit`        | Auto-commit pintar                         |
| `npm run commit:push`   | Auto-commit dan push                       |

## Variabel lingkungan

Variabel lingkungan utama (lihat `.env.example` untuk daftar lengkap):

| Variabel                           | Default       | Deskripsi                                   |
| ---------------------------------- | ------------- | ------------------------------------------- |
| `VITE_SENTRA_API_URL`              | —             | URL basis Sentra Dashboard API              |
| `VITE_SENTRA_API_KEY`              | —             | API key untuk dashboard bridge              |
| `VITE_FACILITY_ID`                 | —             | Identifier fasilitas puskesmas              |
| `VITE_USE_MOCK`                    | `true`        | Gunakan mock data alih-alih API live        |
| `VITE_FEATURE_DIAGNOSIS_AI`        | `true`        | Aktifkan saran diagnosis AI                 |
| `VITE_FEATURE_PRESCRIPTION_AI`     | `true`        | Aktifkan prescription AI                    |
| `VITE_FEATURE_DDI_CHECK`           | `true`        | Aktifkan pemeriksaan DDI                    |
| `VITE_FEATURE_PEDIATRIC_DOSE`      | `true`        | Aktifkan dosis pediatric                    |
| `SENTRA_OPENAI_API_KEY`            | —             | DeepSeek/OpenAI API key untuk reranking LLM |
| `SENTRA_OPENAI_MODEL`              | `gpt-4o-mini` | Nama model LLM                              |
| `SENTRA_OPENAI_TIMEOUT_MS`         | `30000`       | Timeout LLM                                 |
| `SENTRA_DISABLE_TRAJECTORY_BRIDGE` | `false`       | Nonaktifkan SYMPHONY safety bridge          |
| `SENTRA_DISABLE_THERAPY`           | `false`       | Nonaktifkan modul terapi                    |
| `SENTRA_DIAGNOSIS_V2_SHADOW`       | `false`       | Aktifkan V2 shadow mode                     |

## Pemecahan masalah

| Masalah                                | Solusi                                                                                                              |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Ekstensi tidak termuat                 | Aktifkan Developer Mode di `chrome://extensions/`, muat unpacked dari `.output/chrome-mv3-dev/`                     |
| `npm install` gagal                    | Verifikasi Node.js >=22 dan npm >=10 dengan `node -v` dan `npm -v`                                                  |
| Error autentikasi dashboard            | Periksa URL dasar Crew/Dashboard di Settings, sesi magic-link yang valid                                            |
| Sidepanel menampilkan "Login required" | Periksa URL dasar Dashboard di Settings                                                                             |
| Formulir tidak auto-fill               | DAS mungkin perlu re-scan — klik **Inisialisasi** di header                                                         |
| Error batas kata saat submit           | Batas kolom ePuskesmas adalah 225 kata — Sentra memotong keluhan otomatis di 220 kata                               |
| Error TypeScript                       | Jalankan `npm run typecheck` untuk keluaran lengkap                                                                 |
| LLM tidak berfungsi                    | Periksa `SENTRA_OPENAI_API_KEY` sudah di-set; fallback ke mode KB-only jika kosong                                  |
| Alert SYMPHONY tidak muncul            | Pastikan `SENTRA_DISABLE_TRAJECTORY_BRIDGE=false`; pastikan analisis trajectory memiliki severity `high`/`critical` |

## Halaman terkait

- [Gambaran umum](index.md) — pengantar proyek
- [Arsitektur](architecture.md) — arsitektur sistem
- [Pengujian](../how-to-contribute/testing.md) — panduan pengujian rinci
- [Tooling](../how-to-contribute/tooling.md) — sistem build dan tooling
  pengembangan
