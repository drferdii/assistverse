export type Disease = {
  id: number
  nama: string
  kategori: string
  kode: string
  definisi: string
  gejala: string[]
  diagnosis: string
  terapi: string
  rujukan: string
}

export type Category = {
  id: string
  name: string
  kode: string
  desc: string
}

export { DISEASES } from './diseases-data'

export const CATEGORIES: Category[] = [
  {
    id: 'ISPA',
    name: 'ISPA (Infeksi Saluran Pernapasan Akut)',
    kode: 'J00-J22,J32',
    desc: 'Common cold, faringitis, sinusitis, otitis media, bronchitis, pneumonia, dan influenza.',
  },
  {
    id: 'Pencernaan',
    name: 'Penyakit Sistem Pencernaan',
    kode: 'K00-K93',
    desc: 'Dispepsia, gastritis, GERD, diare akut, tifoid, helmintiasis, konstipasi, hemorrhoid, dan hepatitis.',
  },
  {
    id: 'Kulit',
    name: 'Penyakit Kulit dan Jaringan Subkutan',
    kode: 'B00-B99,L00-L99',
    desc: 'Dermatitis, tinea, impetigo, selulitis, furunkel, herpes, zoster, scabies.',
  },
  {
    id: 'PTM Kardiovaskular',
    name: 'PTM - Kardiovaskular & Hematologi',
    kode: 'I00-I99,D50-D89',
    desc: 'Hipertensi, penyakit jantung koroner, gagal jantung, stroke, demam rematik, aritmia, varises, DVT, anemia.',
  },
  {
    id: 'PTM Metabolik',
    name: 'PTM - Metabolik & Endokrin',
    kode: 'E00-E90',
    desc: 'Diabetes melitus tipe 2, dislipidemia, obesitas, hipotiroidisme, hipertiroidisme, gout, osteoporosis.',
  },
  {
    id: 'Tropis & Infeksi',
    name: 'Penyakit Tropis & Infeksi Menular',
    kode: 'A00-A99',
    desc: 'Malaria, demam berdarah dengue, tifoid, leptospirosis, filariasis, kecacingan, campak, tetanus, rabies.',
  },
  {
    id: 'Neurologi',
    name: 'Gangguan Neurologis',
    kode: 'G00-G99',
    desc: 'Sakit kepala migrain, vertigo, epilepsi, neuropati perifer, stroke, demensia, Parkinson.',
  },
  {
    id: 'Jiwa & Perilaku',
    name: 'Gangguan Jiwa & Perilaku',
    kode: 'F00-F99',
    desc: 'Gangguan cemas, depresi, insomnia, PTSD, skizofrenia, bipolar, ADHD.',
  },
  {
    id: 'THT & Mata',
    name: 'Gangguan THT & Mata',
    kode: 'H00-H95',
    desc: 'Konjungtivitis, katarak, glaukoma, kelainan refraksi, otitis media kronik, sinusitis kronik.',
  },
  {
    id: 'Musculoskeletal',
    name: 'Gangguan Muskuloskeletal',
    kode: 'M00-M99',
    desc: 'Osteoarthritis, rheumatoid arthritis, low back pain, myalgia, gout, fraktur.',
  },
  {
    id: 'Ginjal & Saluran Kemih',
    name: 'Ginjal & Saluran Kemih',
    kode: 'N00-N99',
    desc: 'ISK, batu ginjal, CKD, BPH, gagal ginjal akut, sindrom nefrotik.',
  },
  {
    id: 'Gizi & Tumbuh Kembang',
    name: 'Gizi & Tumbuh Kembang Anak',
    kode: 'E40-E46',
    desc: 'Stunting, wasting, marasmus, kwashiorkor, anemia gizi besi.',
  },
  {
    id: 'Reproduksi',
    name: 'Kesehatan Reproduksi & IMS',
    kode: 'N70-N98,A50-A64',
    desc: 'Vaginitis, gonore, sifilis, preeklamsia, anemia kehamilan, hiperemesis gravidarum.',
  },
  {
    id: 'Kesehatan Anak',
    name: 'Kesehatan Anak',
    kode: 'P00-P96,Q00-Q99',
    desc: 'ISPA anak, diare akut anak, campak, cacar air, penyakit kuning neonatorum, sindrom Kawasaki.',
  },
]

export const stats = [
  { val: '144', label: 'Kondisi Klinis' },
  { val: '14', label: 'Kategori Spesialis' },
  { val: '5', label: 'Dimensi Referensi' },
]

export const nationalSources = [
  'Permenkes No. 5/2014 - Standar Kompetensi Dokter Layanan Primer',
  'SK Menkes 1186/2022 - Penyelenggaraan Pelayanan Kesehatan',
  'PNPK Kemenkes 2020 - Pedoman Nasional Pelayanan Klinis',
]

export const professionalSources = [
  'PAPDI - Penyakit Dalam',
  'PERKI - Kardiovaskular',
  'PDPI - Paru',
  'PERDOSSI - Saraf',
  'PERHATI-KL - THT',
  'IDAI - Anak',
  'PERKENI - Endokrin',
]

export const internationalSources = [
  'WHO Guidelines 2023-2026',
  'IDSA 2023-2024',
  'AHA/ACC 2023-2024',
  'ESC/ESH 2023',
  'GOLD 2024',
  'GINA 2024',
  'ADA 2024',
  'KDIGO 2022-2024',
]

export const methodologySteps = [
  {
    step: '01',
    title: 'Identifikasi Penyakit',
    desc: 'Daftar 144 penyakit diambil dari Permenkes No. 5/2014 dan SK Menkes 1186/2022.',
  },
  {
    step: '02',
    title: 'Pemetaan Referensi',
    desc: 'Setiap penyakit dipetakan ke pedoman nasional dan internasional terkini.',
  },
  {
    step: '03',
    title: 'Cross-Validation',
    desc: 'Referensi nasional dan internasional dicek silang untuk konsistensi.',
  },
  {
    step: '04',
    title: 'Ringkasan Klinis',
    desc: 'Poin kunci diagnosis dan tatalaksana diringkas berbasis evidence-based medicine.',
  },
]
