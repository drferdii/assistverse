# Sentra Assist

Active contributors: dr. Ferdi Iskandar (ferdiiskandar)

Sentra Assist adalah ekstensi peramban yang menyematkan clinical decision
support langsung ke dalam alur kerja ePuskesmas. Ekstensi ini berjalan sebagai
sidepanel Chrome/Firefox yang menghubungkan data pasien dari sesi EMR aktif dan
menyajikan triase real-time, bantuan diagnosis, pemeriksaan keselamatan obat,
serta otomasi formulir secara langsung di titik kerja klinisi.

Ekstensi ini ditujukan untuk dokter umum dan perawat di fasilitas layanan primer
Indonesia (puskesmas). Sentra Assist tidak menggantikan EMR — ia bekerja di
sampingnya: membaca halaman melalui adaptive DOM scanning dan menulis kembali
lewat content-script bridge ketika klinisi mengonfirmasi.

## Kemampuan utama

Pada tingkat tinggi, Sentra Assist menyediakan empat kapabilitas:

1. **Deteksi darurat** — empat gerbang keselamatan (inferensi TTV, krisis
   hipertensi, krisis glukosa, deteksi syok okultisme) yang berjalan sebelum
   logika diagnosis apa pun.
2. **Diagnosis berbantuan AI** — Iskandar Diagnosis Engine mencocokkan gejala
   dengan basis pengetahuan 159 penyakit, menerapkan bobot epidemiologi dari
   45.030 kasus Indonesia, dan secara opsional melakukan reranking dengan LLM
   terbatas (DeepSeek atau Ollama lokal).
3. **Keselamatan obat** — pemeriksaan DDI real-time terhadap lebih dari 173.071
   interaksi (DDInter 2.0), kalkulasi dosis pediatric/geriatri, dan auto-fill
   formulir resep.
4. **Otomasi formulir** — DAS (Data Ascension System) mengekstrak data pasien
   dari halaman ePuskesmas melalui pemindaian adaptif dan pemetaan semantik,
   kemudian mengisi otomatis kolom anamnesa, diagnosa, dan resep.

## Arsitektur ekstensi

Ekstensi ini dibangun dengan WXT (Web Extension Toolkit) bersama React dan
TypeScript. Menggunakan Manifest V3 dan terdiri dari tiga lapis runtime:

- **Sidepanel** (`entrypoints/sidepanel/`) — antarmuka React yang digunakan
  klinisi untuk berinteraksi.
- **Background script** (`entrypoints/background.ts`) — service worker yang
  menangani autentikasi, polling bridge, perutean pesan, dan orkestrasi CDSS.
- **Content scripts** (`entrypoints/content.ts`,
  `entrypoints/inject.content.ts`) — bridge DOM untuk scraping data ePuskesmas
  dan auto-fill formulir.

## Keputusan desain utama

- **KB-first, LLM-opsional** — Mesin diagnosis selalu memiliki fallback ke
  penalaran knowledge base deterministik. Reranking LLM digate oleh
  `SENTRA_OPENAI_API_KEY` dan tidak pernah memblokir jalur kritis.
- **Privasi-pertama** — Data pasien di-hash dengan SHA-256 sebelum keluar dari
  ekstensi. PII di-mask atau dianonimkan sebelum panggilan API apa pun.
- **Mampu berjalan offline** — Logika keselamatan inti (gerbang darurat, DDI,
  kalkulasi dosis) berjalan sepenuhnya di peramban tanpa akses jaringan.
- **Dikelola feature flag** — Setiap modul opsional dapat dinonaktifkan melalui
  variabel lingkungan, memungkinkan ekstensi diterapkan secara bertahap dengan
  aman.

## Tumpukan teknologi

| Lapis              | Teknologi                                       |
| ------------------ | ----------------------------------------------- |
| Framework ekstensi | WXT (Manifest V3)                               |
| UI                 | React 18 + Tailwind CSS                         |
| State              | Zustand dengan persistensi chrome.storage.local |
| Messaging          | @webext-core/messaging                          |
| Testing            | Vitest + Playwright                             |
| Charts             | Recharts + ApexCharts                           |
| OCR                | Tesseract.js                                    |
| Build              | Vite                                            |

## Tautan cepat

- [Gambaran arsitektur](architecture.md)
- [Panduan memulai](getting-started.md)
- [Glosarium](glossary.md)
- [Iskandar Diagnosis Engine](../systems/iskandar-diagnosis-engine.md)
- [Deteksi darurat](../systems/emergency-detector.md)
- [Otomasi formulir DAS](../systems/das-form-automation.md)
