# Fakta menarik

Beberapa hal yang mungkin tidak Anda ketahui tentang basis kode Sentra Assist.

## File terpanjang adalah antarmuka TTV

`components/clinical/TTVInferenceUI.tsx` mencapai sekitar 3.300 baris. File ini
menangani segala hal mulai dari input tanda vital dan penilaian triase hingga
pembuatan peringatan, format status BPJS, dan verifikasi kehamilan. File ini
sengaja besar: ini adalah antarmuka klinis utama tempat dokter menghabiskan
sebagian besar waktu mereka, dan membaginya akan memecahkan kopling ketat antara
validasi input dan pembuatan peringatan real-time. Setiap baris dapat dilacak ke
persyaratan klinis spesifik.

## Vital guardrails tepat 822 baris

`lib/clinical/vital-guardrails.ts` adalah 822 baris validasi input murni. Ini
menegakkan hard stop dan soft flag pada setiap bidang tanda vital sebelum data
mencapai tumpukan mesin. Jumlah baris bukan target; ini adalah efek samping dari
mencakup setiap kasus tepi yang dapat dipikirkan oleh pendiri, dr. Ferdi
Iskandar: nilai yang mustahil, kombinasi yang tidak masuk akal secara
fisiologis, bidang yang hilang, dan ambang batas spesifik kehamilan. Jika nilai
diblokir di sini, nilai tersebut tidak pernah mencapai mesin diagnosis.

## Nama pendiri ada di mesin

Pipa diagnosis inti disebut **Iskandar Diagnosis Engine**. Ini bukan label
kesombongan. Dr. Ferdi Iskandar menegaskan penalaran deterministik yang dapat
dilacak: setiap saran harus memetakan ke aturan klinis spesifik dalam basis
pengetahuan 159 penyakit, bukan tebakan AI kotak hitam. Ketika mesin mencatat
peringatan, ia menambahkan awalan `[Iskandar Engine]` sehingga Anda tahu persis
subsistem mana yang berbicara.

## 45.030 kasus klinis Indonesia nyata membentuk prior

Lapisan bobot epidemiologi
(`lib/iskandar-diagnosis-engine/epidemiology-weights.ts`) menggunakan prior
Bayesian yang berasal dari 45.030 kasus klinis Indonesia nyata di 1.930 kode
ICD-10. Ini bukan nilai statis dari buku teks asing. Ini adalah data beban
penyakit lokal, diperbarui tahunan, yang menggeser peringkat saran berdasarkan
apa yang sebenarnya datang ke Puskesmas di Indonesia.

## 173.071 interaksi obat, offline

Pemeriksa DDI (`lib/iskandar-diagnosis-engine/ddi-checker.ts`) memuat database
DDInter 2.0 dengan 173.071 interaksi obat-obat klinis. Ini berjalan sepenuhnya
di peramban. Tidak ada panggilan cloud, tidak ada latensi, tidak ada dependensi
pada API eksternal. Seorang dokter di klinik pedesaan dengan internet yang tidak
stabil mendapat pemeriksaan keamanan yang sama dengan yang ada di rumah sakit
kota.

## 159 penyakit, satu pipa deterministik

Basis pengetahuan di balik Iskandar Diagnosis Engine mencakup 159 penyakit.
Setiap penyakit memiliki bendera merah terstruktur, kriteria rujukan,
klasifikasi sistem tubuh, dan pemetaan ICD-10. Pencocok gejala menggunakan
skoring deterministik IDF + cakupan + Jaccard terhadap KB ini. Tidak ada
jaringan saraf yang terlibat dalam lulusan pertama. Penataan ulang LLM opsional
hanya berjalan setelah KB telah menghasilkan daftar berperingkat, dan dibatasi
untuk menata ulang, bukan menemukan.
