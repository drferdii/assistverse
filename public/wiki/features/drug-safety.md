# Keamanan obat

Modul keamanan obat memeriksa setiap baris resep sebelum mencapai rekam pasien.
Menjalankan empat subsistem paralel: pemeriksaan interaksi, penalaran terapi,
perhitungan dosis, dan pengisian formulir otomatis. Keempatnya deterministik dan
bekerja offline setelah muatan database awal.

## Tujuan

Kesalahan medikasi di layanan primer sering jatuh ke dalam tiga kategori:
kombinasi obat berbahaya, dosis tidak tepat untuk usia atau berat badan, dan
terapi yang tidak cocok dengan diagnosis. Modul keamanan obat mengatasi
ketiganya. Dirancang untuk terasa seperti apoteker yang duduk di samping
klinisi, bukan seperti titik pemeriksaan birokratis.

## Tata letak direktori

```
lib/iskandar-diagnosis-engine/
├── ddi-checker.ts              # Database interaksi DDInter 2.0
├── pharmacotherapy-reasoner.ts # Rekomendasi terapi berbasis sindrom
lib/clinical/
├── dosage-database.ts          # Aturan dosis berbasis berat (IDAI/PAPDI/PIONAS)
components/clinical/
├── ResepForm.tsx               # UI formulir resep dan pembangun payload auto-fill
├── DosageCalculator.tsx        # UI kalkulator dosis berbasis berat
```

## Abstraksi kunci

### `DDICheckResult`

Dikembalikan oleh `checkDrugInteractions`. Berisi:

- `interactions` — array objek `DrugInteraction` dengan tingkat keparahan,
  deskripsi, dan rekomendasi
- `hasBlocking` — true jika ada interaksi yang kontraindikasi atau mayor
- `stats` — jumlah interaksi mayor, sedang, dan total

### `DrugInteraction`

Satu catatan interaksi:

- `drug_a` dan `drug_b` — nama asli yang dimasukkan oleh klinisi
- `severity` — `contraindicated`, `major`, `moderate`, atau `minor`
- `description` dan `recommendation` — panduan yang dapat dibaca manusia dalam
  bahasa Indonesia
- `source` — selalu "DDInter 2.0"

### `PharmacotherapyPlan`

Dikembalikan oleh reasoner. Berisi:

- `medications` — daftar berperingkat objek `MedicationRecommendation`
- `alerts` — peringatan CDSS untuk sindrom (mis., "Suspek ACS: Stabilkan dan
  Rujuk")
- `guidelines` — string kutipan
- `confidence` — skor kepercayaan rencana (0-1)
- `drivers` — alasan yang dapat dibaca manusia untuk setiap rekomendasi
- `missingData` — bidang yang akan meningkatkan rencana jika tersedia
- `riskTier` dan `reviewWindow` — klasifikasi urgensi

### `DosageRule`

Aturan dosis per-obat, per-kelompok usia:

- `dosePerKg` — mg per kilogram berat badan
- `minDose` dan `maxDose` — lantai dan plafon per-dosis
- `maxDailyDose` — plafon harian total
- `frequency` — mis., `q8h`, `q12h`, `daily`
- `route` — oral, iv, im, topical, rectal
- `renalAdjustment` dan `hepaticAdjustment` — catatan populasi khusus
- `contraindications` — daftar string kontraindikasi

## Cara kerja

### DDI checker

DDI checker menggunakan database DDInter 2.0, yang berisi 173.071+ interaksi
klinis yang dikurasi. Database dimuat sekali saat startup via impor dinamis
`src/data/ddi-clinical.json`. Setelah dimuat, indeks bidireksional di-memori
(`interactionIndex`) dibangun sehingga setiap pencarian pasangan adalah O(1).

API publik minimal:

- `loadDDIDatabase()` — memuat JSON dan membangun indeks
- `checkDrugInteractions(drugs: string[])` — mengembalikan semua interaksi di
  antara daftar obat
- `hasBlockingInteractions(drugs: string[])` — pemeriksaan yes/no ringan
- `getDDIStatus()` — mengembalikan flag dimuat, jumlah obat, jumlah interaksi,
  dan versi

Pencocokan nama obat bekerja dalam tiga tahap:

1. **Pencocokan langsung** — nama input yang dinormalisasi ada dalam database.
2. **Pencocokan alias** — input cocok dengan alias yang dikenal (mis.,
   "parasetamol" → "paracetamol"). Tabel alias mencakup nama merek dan generik
   umum Indonesia.
3. **Pencocokan parsial** — input adalah substring dari nama database atau
   sebaliknya. Ini menangani variasi ejaan minor.

Tingkat keparahan dipetakan dari kode DDInter:

| Kode DDInter | Tingkat keparahan yang dipetakan | Memblokir? |
| ------------ | -------------------------------- | ---------- |
| 3            | mayor                            | Ya         |
| 2            | sedang                           | Tidak      |
| (lainnya)    | sedang (fallback)                | Tidak      |

Hasil diurutkan berdasarkan tingkat keparahan (kontraindikasi pertama, lalu
mayor, sedang, minor). UI merender setiap tingkat keparahan dengan warna tetap:
merah untuk kontraindikasi, oranye untuk mayor, kuning untuk sedang, hijau untuk
minor.

### Pharmacotherapy reasoner

Reasoner adalah berbasis sindrom, bukan berbasis obat. Memetakan diagnosis
ICD-10 saat ini ke `SyndromeId` (ischemic_cardiac, hypertension, diabetes,
respiratory_infection, atau generic), lalu memilih aturan intent dalam sindrom
tersebut.

Setiap aturan intent mendefinisikan:

- `intent` — tujuan terapeutik (mis., `antianginal`, `bp_primary`,
  `glycemic_primary`)
- `required` — apakah intent wajib untuk sindrom
- `priority` — peringkat dalam sindrom
- `stockKeywords` — nama obat yang memenuhi intent jika ada dalam stok lokal
- `clinicalGate` — fungsi opsional yang memutuskan apakah intent berlaku untuk
  pasien saat ini
- `externalFallback` — rekomendasi default jika tidak ada obat stok yang cocok

Reasoner juga memeriksa kontraindikasi. Misalnya, sindrom iskemik-kardial
menandai alergi aspirin dan risiko perdarahan aktif. Sindrom hipertensi menandai
kehamilan dan cedera ginjal akut untuk ACE inhibitor.

Ketersediaan stok diperiksa terhadap `src/public/data/stok_obat.json`. Jika obat
yang cocok tersedia dalam stok, ia diprioritaskan. Jika tidak, fallback
eksternal digunakan. Hasilnya adalah `PharmacotherapyPlan` yang dapat ditinjau
klinisi sebelum ditransfer ke ePuskesmas.

### Dosage calculator

Database dosis (`lib/clinical/dosage-database.ts`) berisi aturan berbasis berat
untuk obat layanan primer umum. Setiap obat memiliki satu `DosageRule` per
kelompok usia (neonatus, bayi, anak, remaja, dewasa, lansia).

Alur perhitungan:

1. `getAgeGroup(patientAge)` memetakan usia dalam tahun ke `AgeGroup`.
2. UI menyaring database ke obat yang memiliki aturan untuk kelompok usia
   tersebut.
3. Ketika klinisi memilih obat dan memasukkan berat,
   `calculateDosage(drugId, weightKg, ageGroup)` berjalan:
   - `calculatedDose = dosePerKg * weightKg`
   - Terapkan lantai `minDose` dan plafon `maxDose`
   - Hitung `dailyTotal = dose * dosesPerDay`
   - Periksa `maxDailyDose` dan keluarkan peringatan bahaya jika terlampaui
   - Tambahkan penyesuaian renal/hepatik dan kontraindikasi ke daftar peringatan

Hasil ditampilkan dengan batas berwarna: merah jika ada peringatan yang
mengandung "BAHAYA", kuning jika dosis mencapai plafon maksimum, hijau jika
tidak. Banner disclaimer selalu ditampilkan di bagian bawah.

### Prescription form auto-fill (ResepForm)

`ResepForm.tsx` adalah komponen React yang menangkap metadata resep dan baris
medikasi. Memelihara state lokal untuk:

- Ruangan, dokter, perawat, dan catatan alergi
- Array dinamis objek `MedicationRow`
- Prioritas (0-3)

Setiap baris medikasi memiliki bidang untuk racikan, jumlah_permintaan,
nama_obat, jumlah, signa, aturan_pakai, dan keterangan. Komponen memvalidasi
bahwa setidaknya satu baris memiliki nama obat yang tidak kosong sebelum
mengaktifkan tindakan pengisian.

Ketika klinisi mengklik tombol isi, komponen membangun `ResepFillPayload` dan
mengirimkannya via `sendMessage('fillResep', payload)` ke service worker latar
belakang. Worker meneruskannya ke orchestrator transfer RME, yang menargetkan
tab resep ePuskesmas.

Bidang `aturan_pakai` menggunakan enum numerik yang dipetakan ke frasa
Indonesia:

| Nilai | Arti            |
| ----- | --------------- |
| 1     | Sebelum Makan   |
| 2     | Sesudah Makan   |
| 3     | Pemakaian Luar  |
| 4     | Jika Diperlukan |
| 5     | Saat Makan      |

## Titik integrasi

| Konsumen         | Apa yang diterima         | Bagaimana digunakan                                                          |
| ---------------- | ------------------------- | ---------------------------------------------------------------------------- |
| Mesin diagnosis  | `PharmacotherapyPlan`     | Menambahkan rekomendasi terapi ke panel diferensial                          |
| TTVInferenceUI   | `DDICheckResult`          | Merender peringatan interaksi di bawah pratinjau resep                       |
| ResepForm        | `DosageCalculator`        | Ditanamkan sebagai modal untuk dosis berbasis berat sebelum menambahkan obat |
| Transfer RME     | `ResepFillPayload`        | Mengisi formulir resep ePuskesmas via orchestrator transfer                  |
| Vital guardrails | `hasBlockingInteractions` | Memblokir transfer jika ada interaksi yang memblokir                         |

## Titik masuk untuk modifikasi

### Menambahkan obat baru ke database DDI

Database DDInter adalah file JSON yang dikompilasi
(`src/data/ddi-clinical.json`). Tidak diedit tangan. Jika Anda perlu menambahkan
interaksi kustom, tambahkan ke array `interactions` dalam data sumber dan
rebuild. Tabel alias dalam `ddi-checker.ts` dapat diperluas untuk nama merek
baru tanpa menyentuh database.

### Menambahkan alias obat baru

Edit `DRUG_ALIASES` dalam `lib/iskandar-diagnosis-engine/ddi-checker.ts`.
Tambahkan nama kanonik (harus ada dalam database) dan array alias. Tidak
diperlukan perubahan kode lain.

### Menambahkan sindrom atau intent baru

Edit `RULES` dalam `lib/iskandar-diagnosis-engine/pharmacotherapy-reasoner.ts`.
Aturan sindrom memerlukan:

- `syndrome` — nilai `SyndromeId`
- `riskTier` — `routine`, `urgent`, atau `emergency`
- `reviewWindow` — `6h`, `24h`, atau `48h`
- `intents` — array objek `IntentRule`
- `baseAlerts` — peringatan CDSS opsional untuk sindrom

Jika Anda menambahkan `SyndromeId` baru, perluas definisi tipe di bagian atas
file.

### Menambahkan aturan dosis baru

Edit `DOSAGE_DATABASE` dalam `lib/clinical/dosage-database.ts`. Tambahkan objek
`Drug` baru dengan:

- `id`, `name`, `genericName`, `category`, `indication`
- `rules` — satu `DosageRule` per kelompok usia yang berlaku
- `warnings` — string yang ditampilkan dalam UI kalkulator
- `notes` — konteks tambahan opsional

Fungsi `calculateDosage` akan secara otomatis mengambil obat baru. Tidak
diperlukan perubahan UI kecuali Anda ingin mengubah tata letak kalkulator.

### Mengubah payload ResepForm

Jika ePuskesmas mengubah nama bidang formulirnya, perbarui antarmuka
`ResepFillPayload` dalam `src/utils/types.ts` dan pemetaan dalam
`lib/rme/payload-mapper.ts`. Komponen React itu sendiri hanya membangun payload;
penargetan DOM aktual berada dalam lapisan transfer RME.

## Halaman terkait

- [Keamanan klinis](clinical-safety.md) — Vital guardrails yang memblokir nilai
  berbahaya sebelum keamanan obat berjalan
- [Transfer RME](rme-transfer.md) — Orchestrator yang mendorong data ResepForm
  ke ePuskesmas
- [Trajektori klinis](clinical-trajectory.md) — Analisis longitudinal yang dapat
  mempengaruhi rekomendasi terapi
- [Ikhtisar sistem](../systems/index.md) — Dokumentasi arsitektur
