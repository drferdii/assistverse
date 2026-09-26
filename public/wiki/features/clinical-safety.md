# Keamanan klinis

Sentra Assist memperlakukan keamanan klinis sebagai arsitektur multi-lapisan.
Data yang dimasukkan oleh klinisi atau di-scrape dari ePuskesmas melewati
beberapa gerbang validasi sebelum digunakan untuk saran diagnosis, analisis
trajektori, atau transfer RME. Setiap gerbang memiliki waktu respons dan tingkat
keparahan yang berbeda, sehingga klinisi hanya terganggu ketika diperlukan.

## Tujuan

Lapisan keamanan ada untuk menangkap empat kategori risiko:

1. **Nilai yang mustahil secara fisiologis** — typo seperti tekanan sistolik 300
   mmHg atau suhu 450 C.
2. **Nilai yang mengancam jiwa** — nilai yang mungkin tetapi berbahaya, seperti
   glukosa di bawah 50 mg/dL atau SpO2 di bawah 90%.
3. **Ketidakcocokan konteks** — flag kehamilan pada pasien laki-laki, atau skor
   nyeri yang dimasukkan untuk pasien yang tidak sadar.
4. **Bendera merah gejala** — frasa bebas teks seperti "tidak sadar" atau "nyeri
   dada" yang memicu eskalasi segera terlepas dari tanda vital.

Lapisan ini deterministik. Setiap keputusan dapat dilacak ke aturan spesifik,
bukan tebakan jaringan saraf. Ini cocok dengan filosofi desain Iskandar
Diagnosis Engine: klinisi harus dapat menjelaskan mengapa flag muncul.

## Tata letak direktori

```
lib/clinical/
├── vital-guardrails.ts          # Mesin validasi utama (822 baris)
├── patient-context-profile.ts   # Klasifikasi pita usia dan kesadaran
├── anamnesa-composer.ts         # Generasi draf berbasis template
lib/iskandar-diagnosis-engine/
├── trajectory-safety-bridge.ts  # Pemetaan trajektori-ke-peringatan (SYMPHONY)
```

## Abstraksi kunci

### `VitalGuardrailState`

Input ke sistem guardrail. Berisi tujuh bidang vital (sbp, dbp, hr, rr, temp,
spo2, glucose) plus teks gejala opsional, status kehamilan, skor nyeri, tipe
disabilitas, konfirmasi obesitas, dan preset autosen.

### `VitalGuardrailAssessment`

Outputnya. Berisi:

- `fieldStatus` — label tingkat keparahan (normal, peringatan, kritis, diblokir)
  untuk setiap bidang vital
- `hardStops` — masalah yang memblokir pengiriman formulir
- `softFlags` — masalah yang memperingatkan tetapi tidak memblokir
- `codeRedCues` — pemicu eskalasi kritis
- `contextNotes` — pengingat informasi (mis., "gunakan manset besar untuk pasien
  obesitas")
- `uiLocks` dan `uiRequired` — direktif yang mengubah UI (mis., kunci skor nyeri
  untuk pasien tidak sadar, wajibkan glukosa untuk kesadaran menurun)
- `hasHardStop` — true jika ada hard stop apa pun

### `PatientContextProfile`

Dibangun dari usia dan gender. Mengklasifikasikan pasien ke dalam pita usia
(bayi, anak, rematau_atau_dewasa, geriatrik) dan menetapkan flag seperti
`isReproductiveFemale` dan `usesFlaccPainScale`. Flag-flag ini mengubah ambang
batas yang digunakan oleh guardrails.

### `TrajectorySafetyAlert`

Objek jembatan yang dibuat oleh `extractSafetyAlertsFromTrajectory`. Memetakan
bendera merah trajektori ke format peringatan yang sama yang digunakan oleh
mesin diagnosis, sehingga panel samping dapat menampilkannya secara seragam.

## Cara kerja

### Langkah 1: Normalisasi input

Sebelum aturan apa pun berjalan, `normalizeVitalInput` memperbaiki kesalahan
entri umum. Suhu "375" dibagi 10 menjadi "37.5". Koma desimal diganti dengan
titik. Ini menjaga aturan hilir tetap sederhana karena mereka hanya melihat
angka yang dinormalisasi.

### Langkah 2: Hard stops (nilai mustahil)

Blok aturan pertama memeriksa hal yang mustahil secara fisiologis:

- Sistolik > 300 atau < 40 mmHg
- Diastolik > 200 atau < 20 mmHg
- Sistolik <= diastolik (manset terbalik)
- Nadi > 300 atau < 10 bpm
- Suhu > 45 atau < 25 C
- Glukosa > 1500 atau < 10 mg/dL
- Pernapasan > 100 atau < 5 /menit
- SpO2 > 100% atau < 30%
- Kehamilan pada pasien laki-laki
- Skor nyeri tidak valid (non-integer atau di luar 0-10)

Setiap hard stop menambahkan tingkat keparahan `blocked` ke status bidang dan
mendorong masalah ke `hardStops`. UI menggunakan `hasHardStop` untuk
menonaktifkan tombol KIRIM KE DOKTER.

### Langkah 3: Hard stops yang didorong konteks

Setelah pemeriksaan universal, hard stops spesifik konteks berjalan:

- Jika pasien memiliki kesadaran menurun (terdeteksi dari teks gejala), glukosa
  menjadi wajib. Glukosa yang hilang memicu hard stop.
- Jika pasien adalah perempuan usia reproduksi dan teks gejala mengandung frasa
  seperti "nyeri perut bawah" atau "telat haid", status kehamilan harus secara
  eksplisit diatur ke hamil atau tidak hamil.
- Nadi bayi di luar 60-220 bpm atau frekuensi pernapasan di atas 80 /menit
  memicu hard stops spesifik bayi.

### Langkah 4: Soft flags (peringatan)

Soft flags mencakup nilai yang mungkin tetapi signifikan secara klinis:

- Hipotensi (SBP < 90 atau DBP < 60) pada dewasa umum
- Krisis hipertensi (SBP >= 180 atau DBP >= 120)
- Bradikardia (< 60 bpm) atau takikardia ekstrem (> 130 bpm) pada dewasa
- Hipotermia (< 35 C) atau hiperpireksia (> 40 C)
- Hipoglikemia (< 60 mg/dL) atau hiperglikemia ekstrem (> 400 mg/dL)
- Bradipnea (< 12 /menit) atau takipnea berat (> 30 /menit) pada dewasa
- SpO2 di bawah 95% (atau 93% jika obesitas dikonfirmasi)
- Peringatan yang terstratifikasi berdasarkan usia untuk bayi dan anak

### Langkah 5: Code-red cues

Code-red cues adalah peringatan paling terlihat. Mereka memicu ketika:

- SBP < 80 atau > 200 mmHg pada dewasa
- Nadi dewasa < 50 atau > 140 bpm
- Glukosa < 50 mg/dL
- SpO2 < 90%
- Teks gejala mengandung frasa kritis ("nyeri dada", "tidak sadar", "kejang",
  "sesak berat", dll.)

Cues ini tidak memblokir pengiriman, tetapi mereka mengubah warna UI dan
menambahkan banner yang menonjol.

### Langkah 6: Context notes

Context notes adalah pengingat non-blokir:

- Pasien obesitas: validasikan ukuran manset dan catat risiko sleep-apnea
- Pasien tuli/bisu: rekomendasikan heteroanamnesa
- Disabilitas fisik: catat keterbatasan antropometri
- Pasien geriatrik tanpa preset autosen: default ke preset ADL

### Langkah 7: Jembatan SYMPHONY

Ketika trajectory analyzer mendeteksi tingkat keparahan tinggi atau kritis,
`extractSafetyAlertsFromTrajectory` mengkonversi bendera merah trajektori ke
objek `TrajectorySafetyAlert`. Peringatan ini menggunakan tipe yang sama
(`CDSSAlert`) seperti peringatan mesin diagnosis, sehingga panel samping
merendernya tanpa kode UI tambahan.

Jika ada beberapa flag kritis, SYMPHONY menambahkan peringatan ringkasan di atas
daftar: "Trajectory analysis mendeteksi N sinyal bahaya. Review segera
diperlukan."

### Langkah 8: Anamnesa composer

Anamnesa Composer (`lib/clinical/anamnesa-composer.ts`) mengambil teks gejala,
konteks pasien, penyakit kronis, alergi, status kehamilan, dan tanda vital, lalu
menghasilkan draf terstruktur:

- `chiefComplaint` — keluhan utama dalam bahasa klinis
- `presentIllness` — narasi penyakit saat ini
- `payload` — objek yang dapat dibaca mesin siap untuk transfer RME
  (`lama_sakit`, `riwayat_penyakit`, dll.)
- `metadata` — frasa gejala yang diekstrak, label durasi, dan fakta yang hilang

Composer menggunakan regex pola durasi untuk mengurai frasa seperti "3 hari"
atau "2 minggu" ke objek `lama_sakit` terstruktur. Ia juga memilih template
klaster dari `anamnesa-cluster-templates.json` berdasarkan kata kunci gejala.
Draf selalu ditampilkan kepada klinisi untuk ditinjau; tidak pernah dikirimkan
otomatis.

## Titik integrasi

| Konsumen            | Apa yang diterima          | Bagaimana digunakan                                                                                          |
| ------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------ |
| TTVInferenceUI      | `VitalGuardrailAssessment` | Menonaktifkan KIRIM KE DOKTER pada hard stops, merender warna tingkat keparahan, menampilkan banner code-red |
| Mesin diagnosis     | `PatientContextProfile`    | Menyesuaikan prior penyakit berdasarkan pita usia dan gender                                                 |
| Trajectory analyzer | `VitalGuardrailState`      | Menyertakan tanda vital saat ini dalam analisis tren                                                         |
| Jembatan SYMPHONY   | `HybridTrajectoryResult`   | Menghasilkan peringatan ketika tingkat keparahan trajektori tinggi/kritis                                    |
| Transfer RME        | `ComposedAnamnesaDraft`    | Mengisi bidang formulir anamnesa di ePuskesmas                                                               |

## Titik masuk untuk modifikasi

### Menambahkan bidang vital baru

1. Tambahkan bidang ke `VitalFieldKey` dan `VitalGuardrailState` dalam
   `lib/clinical/vital-guardrails.ts`.
2. Tambahkan ke array `VITAL_FIELDS`.
3. Tambahkan logika normalisasi dalam `normalizeVitalInput` jika bidang memiliki
   kesalahan entri umum.
4. Tambahkan aturan hard-stop, soft-flag, dan code-red dalam
   `assessVitalGuardrails`.
5. Perbarui `buildInitialFieldStatus` untuk menyertakan bidang baru.

### Mengubah ambang batas pita usia

Edit `buildPatientContextProfile` dalam
`lib/clinical/patient-context-profile.ts`. Ambang batas saat ini adalah:

- Bayi: < 1 tahun
- Anak: 1-12 tahun
- Geriatrik: > 65 tahun
- Perempuan reproduksi: 15-45 tahun, gender P

### Menambahkan frasa bendera merah gejala baru

Tambahkan frasa (huruf kecil) ke `CODE_RED_SYMPTOM_PHRASES` dalam
`lib/clinical/vital-guardrails.ts`. Pencocokan adalah berbasis substring,
sehingga "tidak sadar" juga akan cocok dengan "pasien tidak sadar sejak tadi
pagi."

### Menambahkan pemetaan trajektori-ke-peringatan baru

Edit `extractSafetyAlertsFromTrajectory` dalam
`lib/iskandar-diagnosis-engine/trajectory-safety-bridge.ts`. Fungsi saat ini
menjembatani hanya ketika tingkat keparahan adalah `high` atau `critical`. Anda
dapat menambahkan tipe peringatan baru dengan memetakan bidang bendera merah
trajektori ke tipe `CDSSAlert` dan nilai tingkat keparahan.

### Memodifikasi template anamnesa

Template klaster berada di `src/data/anamnesa-cluster-templates.json`. Composer
memilih template berdasarkan kata kunci gejala. Untuk menambahkan klaster baru,
tambahkan entri baru ke file JSON dengan `symptomKeywords`,
`chiefComplaintTemplate`, dan `presentIllnessTemplate`. Tidak diperlukan
perubahan kode TypeScript kecuali Anda memerlukan bidang payload baru.

## Halaman terkait

- [Keamanan obat](drug-safety.md) — Pemeriksaan keamanan resep yang berjalan
  paralel dengan vital guardrails
- [Trajektori klinis](clinical-trajectory.md) — Analisis longitudinal yang
  memberi makan jembatan SYMPHONY
- [Transfer RME](rme-transfer.md) — Orchestrator yang menerima draf anamnesa
  yang disusun
- [Ikhtisar sistem](../systems/index.md) — Dokumentasi arsitektur untuk mesin
  diagnosis dan lapisan keamanan
