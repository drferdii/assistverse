# Debugging

## Log

Sentra Assist menggunakan logger berlingkup (`utils/logger.ts`) dengan saluran
debug:

- `global` — Peristiwa ekstensi umum
- `riwayat` — Riwayat pasien / operasi DAS
- `background` — Peristiwa skrip latar belakang
- `content` — Peristiwa skrip konten
- `filler` — Operasi pengisian formulir otomatis

Aktifkan saluran debug melalui variabel lingkungan `VITE_DEBUG_*`.

## Kesalahan umum

| Kesalahan                        | Penyebab                                | Perbaikan                                  |
| -------------------------------- | --------------------------------------- | ------------------------------------------ |
| Ekstensi tidak memuat            | Mode pengembang tidak diaktifkan        | Aktifkan di `chrome://extensions/`         |
| `npm install` gagal              | Versi Node.js terlalu lama              | Tingkatkan ke Node.js >= 22                |
| Kesalahan autentikasi Dashboard  | Sesi magic-link tidak valid             | Autentikasi ulang melalui Pengaturan       |
| Panel samping "Login diperlukan" | URL dasar Dashboard salah               | Periksa Pengaturan → Crew URL              |
| Formulir tidak terisi otomatis   | Pemetaan DAS basi                       | Klik **Inisialisasi** di header            |
| Kesalahan batas kata             | Batas bidang ePuskesmas adalah 225 kata | Sentra membatasi keluhan pada 220 kata     |
| Kesalahan TypeScript             | Ketidakcocokan tipe atau impor hilang   | Jalankan `npm run typecheck`               |
| LLM tidak berfungsi              | Kunci API hilang                        | Periksa `SENTRA_OPENAI_API_KEY`            |
| Peringatan SYMPHONY hilang       | Jembatan dinonaktifkan                  | Periksa `SENTRA_DISABLE_TRAJECTORY_BRIDGE` |

## Buku panduan pemecahan masalah

1. Periksa konsol skrip latar belakang (Chrome DevTools → Service Worker)
2. Periksa konsol panel samping (klik kanan di panel samping → Periksa)
3. Verifikasi state `chrome.storage.local` melalui DevTools → Aplikasi →
   Penyimpanan
4. Periksa permintaan jaringan di DevTools skrip latar belakang
5. Tinjau log audit (`lib/iskandar-diagnosis-engine/audit-logger.ts`) untuk
   masalah alur diagnosis

## Halaman terkait

- [Cara berkontribusi](index.md)
- [Alur kerja pengembangan](development-workflow.md)
- [Pengujian](testing.md)
- [Pola dan konvensi](patterns-and-conventions.md)
- [Peralatan](tooling.md)
