# Sejarah

Sejarah Sentra Assist melacak evolusi alat dukungan keputusan klinis dari
ekstensi peramban sederhana menjadi platform CDSS komprehensif untuk layanan
kesehatan primer Indonesia.

## Era

### Prototipe awal (2024)

Versi pertama Sentra Assist adalah ekstensi peramban dasar yang menyediakan
pencarian ICD-10 sederhana dan pemeriksaan interaksi obat. Dibangun sebagai
bukti konsep untuk menyematkan alat klinis langsung ke dalam alur kerja
ePuskesmas.

Peristiwa kunci:

- Commit pertama: ekstensi Chrome dasar dengan antarmuka popup
- Menambahkan pemeriksa DDI dengan database DDInter
- Mengimplementasikan pencocokan gejala-ke-penyakit sederhana

### Iskandar Engine (awal 2025)

Mesin diagnosis dibangun kembali dari nol dengan pendekatan deterministik-first.
Pendiri, dr. Ferdi Iskandar, menegaskan bahwa setiap saran diagnosis harus dapat
dilacak ke aturan klinis spesifik, bukan tebakan AI kotak hitam.

Peristiwa kunci:

- Memperkenalkan basis pengetahuan 159 penyakit dengan bobot epidemiologi
  Indonesia
- Membangun protokol deteksi darurat 4-gerbang (TTV, HTN, glukosa, syok okult)
- Menambahkan visualisasi keamanan lampu lalu lintas
- Mengimplementasikan mode fallback KB-only (tanpa dependensi LLM)

### DAS dan otomatisasi formulir (pertengahan 2025)

Data Ascension System diperkenalkan untuk memecahkan masalah entri ganda.
Alih-alih menyalin data pasien dari ePuskesmas ke ekstensi secara manual, DAS
secara otomatis mengambil dan memetakan bidang formulir.

Peristiwa kunci:

- Pemindai DOM adaptif dengan penilaian kepercayaan
- Pemeta semantik lokal untuk klasifikasi bidang
- Penyimpanan pembelajaran untuk persistensi pemetaan per-fasilitas
- Auto-fill untuk halaman anamnesa, diagnosa, dan resep

### Arsitektur keamanan (akhir 2025)

Fokus utama pada keamanan klinis mengarah pada pengenalan beberapa sistem
pengaman.

Peristiwa kunci:

- Vital Guardrails: modul validasi 822 baris dengan hard stop dan soft flag
- SYMPHONY Safety Bridge: pemetaan trajektori-ke-peringatan
- PII Guard: hashing SHA-256 sebelum transmisi jaringan
- Audit logger: logging bayangan untuk semua keputusan diagnosis
- Feature flags: penggatingan modul berbasis variabel lingkungan

### Integrasi LLM dan analisis trajektori (2026)

Penataan ulang LLM opsional ditambahkan, bersama dengan analisis trajektori
klinis untuk pemantauan pasien longitudinal.

Peristiwa kunci:

- Integrasi API DeepSeek untuk penataan ulang terbatas
- Fallback LLM lokal Ollama untuk penggunaan offline
- Analisis trajektori klinis: analisis tren 5 kunjungan
- Trajectory V2 dengan kurva risiko dan cakupan sinyal
- Mode bayangan Diagnosis V2 untuk evaluasi non-blokir
- Chronic preservation untuk ekstraksi dosis historis

## Fitur tertua

| Fitur                      | Pertama kali diperkenalkan | Masih aktif? |
| -------------------------- | -------------------------- | ------------ |
| Pemeriksa DDI              | 2024                       | Ya           |
| Pencocok gejala            | awal 2025                  | Ya           |
| Keamanan lampu lalu lintas | awal 2025                  | Ya           |
| Fallback KB-only           | awal 2025                  | Ya           |
| Scraper DAS                | pertengahan 2025           | Ya           |
| Gerbang darurat            | awal 2025                  | Ya           |

## Penulisan ulang utama

| Penulisan ulang      | Kapan            | Apa yang berubah                                                  |
| -------------------- | ---------------- | ----------------------------------------------------------------- |
| Mesin diagnosis v2   | 2026             | Evaluasi mode bayangan, integrasi trajektori, modul terapi        |
| Sistem trajektori    | 2026             | V2 dengan kurva risiko, cakupan sinyal, analisis delta kunjungan  |
| Pemindai adaptif DAS | pertengahan 2025 | Menggantikan selektor tetap dengan pemetaan semantik adaptif      |
| Arsitektur keamanan  | akhir 2025       | Mengonsolidasikan pemeriksaan tersebar ke sistem pengaman terpadu |

## Kurva pertumbuhan

Basis kode telah tumbuh dari ekstensi popup sederhana (~5.000 baris) menjadi
platform CDSS komprehensif (~60.000+ baris di TypeScript, JSON, dan CSS). Area
pertumbuhan paling signifikan adalah:

1. Komponen klinis (visualisasi trajektori, antarmuka workbench)
2. Sistem keamanan (pengaman, logging audit, perlindungan PII)
3. Lapisan integrasi (jembatan dashboard, autentikasi, transfer RME)

## Halaman terkait

- [Ikhtisar](overview/index.md) — Pengenalan proyek
- [Angka-angka](by-the-numbers.md) — Statistik basis kode
