# Dashboard Bridge

Dashboard Bridge menghubungkan Sentra Assist ke backend Sentra Dashboard.
Menangani autentikasi, sinkronisasi data pasien, polling jembatan untuk transfer
yang tertunda, dan integrasi dengan mesin klinis kanonik.

## Tujuan

Assist berjalan sebagai ekstensi peramban di dalam ePuskesmas. Dashboard
berjalan sebagai aplikasi web terpisah. Jembatan memungkinkan mereka
berkomunikasi: Assist mengirim data pasien yang di-scrape ke Dashboard, menerima
output mesin klinis kanonik, dan mengambil transfer RME yang tertunda yang
memerlukan auto-fill.

## Tata letak direktori

```
lib/api/
├── auth-client.ts          # Autentikasi magic-link dengan polling
├── bridge-client.ts        # Klien API Dashboard (konsultasi, sinkronisasi pasien, mesin kanonik)
├── bridge-poller.ts        # Polling berbasis Chrome Alarms untuk transfer yang tertunda
├── pii-guard.ts            # Fail-closed PII tripwire untuk panggilan keluar
├── audit-service.ts        # Log audit yang di-rantai secara kriptografis
├── authed-fetch.ts         # Wrapper fetch terautentikasi
├── auth-store.ts           # Penyimpanan sesi terpadu
├── patient-sync-payload.ts # Pembangun payload untuk sinkronisasi pasien
└── platform-api-client.ts  # Klien API platform legacy
```

## Abstraksi kunci

### `AuthSession`

Identitas pengguna, token, dan URL server dasar. Disimpan di
`browser.storage.local` via `auth-store.ts`. Sesi berbasis cookie menggunakan
`cookie-session` sebagai nilai token dan mengandalkan cookie jar peramban untuk
sesi aktual.

### `BridgeEntry`

Transfer RME yang tertunda dari Dashboard: ID, status, pelayananId, nama pasien,
dan flag untuk ketersediaan anamnesa/diagnosa/resep.

### `CanonicalClinicalEngineOutput`

Respons mesin klinis kanonik sisi server: skor NEWS2, interpretasi MAP, risiko
syok okult, peringatan, pola peringatan dini, konteks trajektori, dan
rekomendasi. Dikendalikan oleh kontrak skema yang ketat.

### `ConsultPayload`

Konsultasi keluar dari Assist ke Dashboard: demografi pasien, TTV, keluhan,
faktor risiko, antropometri, penyakit kronis, alergi, dan ID dokter target.

## Cara kerja

### Autentikasi

`lib/api/auth-client.ts` mengimplementasikan autentikasi magic-link:

1. Pengguna memasukkan email dan klik login
2. `login()` mengirimkan permintaan magic-link ke `/api/auth/sign-in/magic-link`
3. Pengguna mengklik tautan di email mereka
4. `pollForSession()` mengambil `/api/pilot/session-check` hingga sesi menjadi
   aktif
5. Sesi disimpan dengan token, info pengguna, dan URL server dasar

Sesi diperbarui secara otomatis. Sesi berbasis cookie melewati verifikasi ulang
karena peramban menangani penerusan cookie.

### Klien jembatan

`lib/api/bridge-client.ts` menyediakan permukaan API utama:

- **`fetchPendingEntries()`** — GET `/api/emr/bridge?status=pending`.
  Mengembalikan hingga 5 transfer yang tertunda.
- **`fetchEntryDetail(id)`** — GET `/api/emr/bridge/{id}`. Mengembalikan payload
  transfer RME lengkap.
- **`claimEntry(id)`** — PATCH dengan `action: claim`. Mencegah pemrosesan
  duplikat.
- **`reportProcessing(id)`** — PATCH dengan `action: processing`. Menandakan
  pekerjaan aktif.
- **`reportComplete(id, result)`** — PATCH dengan `action: complete`. Termasuk
  hasil transfer.
- **`reportFailed(id, error)`** — PATCH dengan `action: fail`. Termasuk pesan
  kesalahan.
- **`getOnlineDoctors()`** — GET `/api/doctors/online`. Mengembalikan daftar
  terfilter dokter yang tersedia.
- **`sendConsultToDoctor(payload)`** — POST `/api/consult`. Mengirim data pasien
  ke dokter tertentu.
- **`evaluateCanonicalClinicalEngine(payload)`** — POST
  `/api/clinical/engine/evaluate`. Menjalankan mesin klinis kanonik sisi server.
- **`evaluateCanonicalDifferential(payload)`** — POST
  `/api/clinical/differential/evaluate`. Mendapatkan diagnosis diferensial dari
  mesin kanonik.
- **`extractClinicalAnamnesis(text)`** — POST `/api/clinical/anamnesis/extract`.
  Ekstraksi anamnesis terstruktur dari teks bebas.
- **`syncPatientToDashboard(payload)`** — POST `/api/emr/patient-sync`. Mengirim
  data pasien yang di-scrape ke halaman EMR Dashboard.

Semua panggilan melewati `authed-fetch.ts`, yang membaca sesi saat ini dari
`auth-store.ts` dan menambahkan header otorisasi yang sesuai.

### Bridge poller

`lib/api/bridge-poller.ts` menggunakan Chrome Alarms API untuk mengambil
transfer yang tertunda setiap 30 detik (dapat dikonfigurasi). Alurnya:

1. Periksa apakah jembatan siap (terautentikasi dan diaktifkan)
2. Ambil entri yang tertunda
3. Klaim entri pertama
4. Ambil payload lengkap
5. Laporkan pemrosesan
6. Eksekusi transfer via executor terdaftar (dari `background.ts`)
7. Laporkan selesai atau gagal

Poller menangani kesalahan autentikasi dengan menghentikan, kesalahan jaringan
dengan backoff eksponensial (maks 5 menit), dan flag polling basi dengan reset
paksa setelah 60 detik.

### PII guard

`lib/api/pii-guard.ts` adalah garis pertahanan terakhir. Setiap panggilan HTTP
keluar melewati `assertNoPII()` sebelum permintaan meninggalkan ekstensi. Jika
payload serial berisi pola PII apa pun, panggilan melempar `PIILeakError` dan
permintaan jaringan tidak pernah dicoba.

`hashPatientRef()` menyediakan digest SHA-256 deterministik dari pengenal pasien
untuk segmen jalur URL. Pengenal mentah tidak pernah meninggalkan ekstensi.

### Audit service

`lib/api/audit-service.ts` memelihara log audit append-only yang di-rantai
secara kriptografis. Setiap entri mencakup:

- ID, timestamp, aktor, tindakan, konteks, hasil
- `previousHash` — hash dari entri sebelumnya
- `hash` — SHA-256 dari data entri ini

Saat memuat, layanan memverifikasi integritas rantai. Jika pemalsuan terdeteksi,
mencatat peristiwa `INTEGRITY_CHECK_FAILED`. Log disimpan di
`browser.storage.local` dengan batas rolling 1000 entri.

## Titik integrasi

### Iskandar Diagnosis Engine

Jembatan secara opsional memperkaya diagnosis lokal dengan mesin kanonik.
`get-suggestions-flow.ts` memanggil `evaluateCanonicalDifferential()` ketika
jembatan siap. Hasil kanonik menyediakan konteks trajektori, pola peringatan
dini, dan penilaian NEWS2 yang tidak dapat diakses oleh mesin lokal.

### DAS Form Automation

Ketika entri jembatan yang tertunda diklaim, poller mengeksekusi transfer RME
via `registeredExecutor()`. Orchestrator ini mengisi halaman anamnesa, diagnosa,
dan resep secara berurutan menggunakan DAS. Hasil dilaporkan kembali ke
jembatan.

### Sinkronisasi pasien

Data pasien yang di-scrape dari ePuskesmas dikirim ke Dashboard via
`syncPatientToDashboard()`. Dashboard menerimanya via Socket.IO dan mengisi
otomatis formulir EMR-nya sendiri. Ini memungkinkan alur data dua arah antara
Assist dan Dashboard.

## Titik masuk untuk modifikasi

| Tujuan                                  | File                       | Catatan                                                                 |
| --------------------------------------- | -------------------------- | ----------------------------------------------------------------------- |
| Mengubah endpoint API jembatan          | `lib/api/bridge-client.ts` | Perbarui konstanta jalur dalam setiap metode                            |
| Mengubah interval polling               | `lib/api/bridge-poller.ts` | `DEFAULT_CONFIG.pollIntervalMinutes`                                    |
| Menambahkan panggilan API jembatan baru | `lib/api/bridge-client.ts` | Gunakan `bridgeFetch<T>()` untuk autentikasi dan penanganan kesalahan   |
| Mengubah deteksi PII                    | `lib/api/pii-guard.ts`     | Mendelegasikan ke `anonymizer.ts`; pertahankan sumber kebenaran tunggal |
| Mengubah batas log audit                | `lib/api/audit-service.ts` | `maxEntries` dalam konfigurasi                                          |
| Menambahkan metode autentikasi          | `lib/api/auth-client.ts`   | Perluas objek `AuthClient`                                              |

## File kunci

- **`lib/api/auth-client.ts`** — Autentikasi magic-link dengan polling.
  Menyimpan sesi di `auth-store.ts`. Mendukung sesi berbasis cookie dan token.
- **`lib/api/bridge-client.ts`** — Klien API Dashboard utama. Menangani
  konsultasi, sinkronisasi pasien, evaluasi mesin kanonik, dan daftar dokter
  online.
- **`lib/api/bridge-poller.ts`** — Polling berbasis Chrome Alarms untuk transfer
  RME yang tertunda. Siklus klaim → eksekusi → lapor dengan backoff dan
  penanganan kesalahan.
- **`lib/api/pii-guard.ts`** — Fail-closed PII tripwire. Hashing SHA-256 untuk
  referensi pasien. Setiap panggilan keluar harus melewati ini.
- **`lib/api/audit-service.ts`** — Log audit yang di-rantai secara kriptografis.
  Verifikasi integritas saat memuat. Batas rolling 1000 entri.

## Halaman terkait

- [Iskandar Diagnosis Engine](iskandar-diagnosis-engine.md) — CDSS lokal yang
  dapat diperkaya oleh mesin kanonik
- [DAS Form Automation](das-form-automation.md) — Pengisian formulir otomatis
  yang mengeksekusi transfer jembatan
- [Emergency Detector](emergency-detector.md) — Protokol keamanan yang berjalan
  sebelum diagnosis
