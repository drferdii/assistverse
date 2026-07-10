# Pola dan konvensi

## Gaya pengkodean

- TypeScript strict mode diaktifkan
- Komponen fungsional React dengan hooks
- Tailwind CSS untuk styling; tidak ada gaya inline kecuali untuk nilai dinamis
- Kepatuhan token visual: gunakan `--sentra-bg` (#050505), `--text-main`
  (#fdfbf5), `--text-muted` (#737373), `--sentra-green` (#6b9b8a) untuk medis,
  dan `--brand-accent` (#eb5939) untuk CTA. Jangan gunakan hex/rgb ad-hoc atau
  kelas Tailwind yang tidak dipetakan seperti `bg-green-500`.

## Penanganan kesalahan

- Gunakan kesalahan terketik dengan discriminated unions jika memungkinkan
- Semua panggilan API memiliki logika batas waktu dan percobaan ulang
- Jalur fallback harus selalu ada untuk operasi kritis klinis
- Jangan pernah melempar pengecualian yang tidak tertangani di skrip konten
  (dapat membuat ekstensi crash)

## Manajemen state

- Store Zustand (`lib/store.ts`) adalah sumber kebenaran tunggal
- Persistensi `chrome.storage.local` dengan TTL 24 jam
- Hindari prop drilling; gunakan store selectors

## Feature flags

Semua modul opsional dikendalikan oleh variabel lingkungan:

- Flag `VITE_FEATURE_*` untuk fitur UI
- Flag `SENTRA_*` untuk fitur mesin
- Default ke aman/mati saat flag hilang
- `fallbackToKBOnly` selalu `true` (hardcoded)

## Konvensi penamaan

| Pola            | Contoh                                                         |
| --------------- | -------------------------------------------------------------- |
| Komponen React  | PascalCase: `TTVInferenceUI.tsx`                               |
| Fungsi utilitas | camelCase: `getSuggestionsFlow.ts`                             |
| Konstanta       | UPPER_SNAKE_CASE: `VITAL_GUARD_RAILS`                          |
| Definisi tipe   | PascalCase dengan akhiran: `DiagnosisResult`, `PatientContext` |
| File pengujian  | `[modul].[deskripsi].test.ts`                                  |

## Pola pengujian

- Pengujian unit untuk fungsi murni (Vitest, lingkungan node)
- Pengujian integrasi untuk klien API (Vitest, lingkungan jsdom)
- Pengujian klinis untuk komponen UI (Vitest, jsdom + React Testing Library)
- Pengujian E2E untuk alur peramban (Playwright)
- Pengujian keamanan untuk jalur kritis pasien (file pengujian khusus)

## Penanganan PII

- Hash pengenal pasien dengan SHA-256 sebelum panggilan jaringan
  (`lib/api/pii-guard.ts`)
- Tutupi nama dalam log dan UI (`utils/name-masking.ts`)
- Jangan pernah mencatat data pasien lengkap
- Simpan data pasien hanya di `chrome.storage.local` dengan TTL

## Halaman terkait

- [Alur kerja pengembangan](development-workflow.md)
- [Pengujian](testing.md)
- [Debugging](debugging.md)
- [Peralatan](tooling.md)
