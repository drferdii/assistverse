# Alur kerja pengembangan

## Strategi cabang

- `main` adalah cabang default dan harus selalu lulus `npm run quality`
- Cabang fitur: `feat/<deskripsi>` atau `fix/<deskripsi>`
- Tidak ada push langsung ke `main`; semua perubahan melalui PR

## Siklus kode

1. **Ambil pekerjaan** — Baca folder `.agent/` sesuai protokol memori wajib
2. **Cabang** — `git checkout -b feat/deskripsi`
3. **Kode** — Lakukan perubahan bedah; sentuh hanya apa yang diperlukan
4. **Uji** — Jalankan `npm run quality` secara lokal
5. **PR** — Buka PR dengan deskripsi yang jelas dan bukti verifikasi
6. **Peninjauan** — Tangani masukan; jalankan ulang gerbang kualitas
7. **Merge** — Squash merge ke `main`

## Konvensi commit

Proyek menggunakan skrip auto-commit cerdas (`scripts/dev/auto-commit.js`) yang
mengkategorikan perubahan:

```bash
npm run commit       # Auto-commit dengan pesan yang dikategorikan
npm run commit:push  # Auto-commit dan push
npm run commit:watch # Mode watch auto-commit
```

Commit manual harus mengikuti konvensi:

- `feat(scope): deskripsi`
- `fix(scope): deskripsi`
- `chore(scope): deskripsi`
- `test(scope): deskripsi`
- `docs(scope): deskripsi`

## Halaman terkait

- [Cara berkontribusi](index.md)
- [Pengujian](testing.md)
- [Debugging](debugging.md)
- [Pola dan konvensi](patterns-and-conventions.md)
- [Peralatan](tooling.md)
