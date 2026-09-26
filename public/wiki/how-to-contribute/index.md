# Cara berkontribusi

Sentra Assist dikelola oleh Sentra Artificial Intelligence. Kontribusi mengikuti
panduan rekayasa Codieverse yang didokumentasikan dalam `AGENTS.md`.

## Pengambilan pekerjaan

Sebelum memulai pekerjaan apa pun, baca protokol memori wajib:

1. `.agent/CONTEXT.md` — Arsitektur dan tumpukan
2. `.agent/PROGRESS.md` — Status pekerjaan saat ini
3. `.agent/HANDOFF.md` — Rencana dan instruksi untuk sesi ini
4. `.agent/LESSONS.md` — Kesalahan yang pernah dibuat sebelumnya untuk dihindari
5. `.agent/DECISIONS.md` — Keputusan arsitektural sebelumnya

## Proses PR

1. Buat cabang fitur dari `main`
2. Lakukan perubahan bedah — sentuh hanya apa yang diperlukan
3. Jalankan gerbang kualitas sebelum mengirimkan:
   ```bash
   npm run quality
   ```
4. Pastikan pengujian lulus dan typecheck bersih
5. Buka PR dengan deskripsi yang jelas tentang perubahan dan bukti verifikasi

## Ekspektasi peninjauan

- Semua PR harus lulus `npm run quality` (typecheck + lint + test)
- Pengujian kontrak (`npm run test:contract`) diperlukan saat autentikasi atau
  kontrak jembatan berubah
- Pengujian E2E (`npm run test:e2e`) harus dijalankan untuk perubahan UI
- Perubahan pada logika klinis harus mencakup cakupan pengujian keamanan

## Definisi selesai

- [ ] Kode dikompilasi tanpa kesalahan (`npm run typecheck`)
- [ ] Lint lulus (`npm run lint`)
- [ ] Pengujian lulus (`npm run test`)
- [ ] Pengujian kontrak lulus jika API berubah (`npm run test:contract`)
- [ ] Pengujian E2E lulus jika UI berubah (`npm run test:e2e`)
- [ ] Tidak ada rahasia atau kredensial dalam kode
- [ ] Penanganan PII mengikuti pola yang ada (`lib/api/pii-guard.ts`)
- [ ] Feature flags ditambahkan untuk modul opsional baru

## Halaman terkait

- [Alur kerja pengembangan](development-workflow.md) — Siklus branch, kode, uji,
  PR, merge
- [Pengujian](testing.md) — Kerangka kerja, pola, cara menjalankan
- [Debugging](debugging.md) — Log, kesalahan umum, pemecahan masalah
- [Pola dan konvensi](patterns-and-conventions.md) — Gaya pengkodean dan
  konvensi
- [Peralatan](tooling.md) — Sistem build dan alat pengembangan
