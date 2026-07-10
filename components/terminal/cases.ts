export type TerminalBlock = {
  type:
    | 'header'
    | 'input-label'
    | 'input-text'
    | 'step'
    | 'case'
    | 'label'
    | 'chain-name'
    | 'chain-sx'
    | 'chain-px'
    | 'list-item'
    | 'dx-status'
    | 'dx-text'
    | 'footer'
  text: string
}

export type ClinicalCase = {
  id: string
  patient: string
  blocks: TerminalBlock[]
}

export const clinicalCases: ClinicalCase[] = [
  {
    id: 'nyeri-panggul',
    patient: 'Ny. S, 30 th',
    blocks: [
      { type: 'header', text: 'SIDELAB · Clinical Intelligence · Sentra SideLab Project' },
      { type: 'input-label', text: 'INPUT DOKTER >' },
      {
        type: 'input-text',
        text: '1 pasien usia 30 tahun datang dengan nyeri pada panggul kanan yang menjalar hingga lutut. Nyeri dirasakan terus menerus. Nyeri sejak 1 hari yang lalu. BAK :Dysuria (-) Demam (-), Batuk (-) sesak (-) mual (-) muntah (-). Riw. Dm (-) riw. Ht (-) riw. Trauma (-)',
      },
      { type: 'step', text: '✓ Menganalisis keluhan…' },
      { type: 'step', text: '✓ Clinical chains aktif: Nyeri Panggul' },
      { type: 'step', text: '✓ Mengambil referensi klinis (RAG)…' },
      { type: 'step', text: '✓ Memproses dengan Sentra Voss 1.7 — mohon tunggu…' },
      {
        type: 'case',
        text: 'Pasien usia 30 tahun dengan nyeri panggul kanan menjalar ke lutut sejak 1 hari, tanpa disuria, demam, riwayat trauma.',
      },
      { type: 'label', text: 'Clinical Chains' },
      { type: 'chain-name', text: 'Nyeri Panggul' },
      { type: 'chain-sx', text: '→ Demam, Sesak napas, Nyeri dada, Rhinorhea atau pilek' },
      { type: 'chain-px', text: 'Px: Auskultasi Pulmo, Inspeksi Faring' },
      { type: 'chain-name', text: 'Radikulopati' },
      { type: 'chain-sx', text: '→ Muntah, Anoreksia, Pusing, Keringat dingin' },
      { type: 'chain-px', text: 'Px: Palpasi Abdomen, Tanda Vital' },
      { type: 'label', text: 'Klarifikasi' },
      { type: 'list-item', text: 'Karakter nyeri (tajam/tumpul/ seperti tertusuk)?' },
      { type: 'list-item', text: 'Apakah nyeri bertambah saat batuk/bersin/mengejan?' },
      { type: 'list-item', text: 'Apakah ada kelemahan otot atau mati rasa pada tungkai?' },
      { type: 'label', text: 'Diagnosis Kerja' },
      { type: 'dx-status', text: '● DATA KURANG' },
      { type: 'dx-text', text: 'Low back pain (Lumbago) dengan radikulopati' },
      { type: 'footer', text: 'ketik keluhan atau /help untuk daftar perintah' },
    ],
  },
  {
    id: 'batuk-kronis',
    patient: 'Tn. A, 45 th',
    blocks: [
      { type: 'header', text: 'SIDELAB · Clinical Intelligence · Sentra SideLab Project' },
      { type: 'input-label', text: 'INPUT DOKTER >' },
      {
        type: 'input-text',
        text: 'Pasien pria 45 tahun datang dengan batuk > 8 minggu. Batuk kering, tidak berdahak. Tidak ada hemoptoe. Nyeri dada tidak ada. BB turun 3 kg dalam 2 bulan. Riwayat merokok 20 pack-year. Demam malam (+), keringat malam (+).',
      },
      { type: 'step', text: '✓ Menganalisis keluhan…' },
      { type: 'step', text: '✓ Clinical chains aktif: Batuk Kronis, Penurunan BB' },
      { type: 'step', text: '✓ Mengambil referensi klinis (RAG)…' },
      { type: 'step', text: '✓ Memproses dengan Sentra Voss 1.7 — mohon tunggu…' },
      {
        type: 'case',
        text: 'Pria 45 tahun, perokok berat, batuk kronis > 8 minggu dengan demam malam dan penurunan berat badan.',
      },
      { type: 'label', text: 'Clinical Chains' },
      { type: 'chain-name', text: 'Batuk Kronis' },
      { type: 'chain-sx', text: '→ TB Paru, Ca Bronchogenik, Asma, Bronkiektasis, PPOK' },
      { type: 'chain-px', text: 'Px: Foto Thoraks, Sputum BTA, Spirometri' },
      { type: 'chain-name', text: 'Penurunan BB' },
      { type: 'chain-sx', text: '→ DM, Hipertiroid, TB, Malignansi, Malnutrisi' },
      { type: 'chain-px', text: 'Px: HbA1c, TSH, Foto Thoraks, Albumin' },
      { type: 'label', text: 'Klarifikasi' },
      { type: 'list-item', text: 'Apakah ada riwayat kontak TB dalam 2 tahun terakhir?' },
      { type: 'list-item', text: 'Apakah batuk pernah berdahak atau berdarah?' },
      { type: 'list-item', text: 'Apakah ada sesak napas atau wheezing?' },
      { type: 'label', text: 'Diagnosis Kerja' },
      { type: 'dx-status', text: '● PRIORITAS TINGGI' },
      { type: 'dx-text', text: 'Tuberkulosis Paru (DD: Ca Bronchogenik)' },
      { type: 'footer', text: 'ketik keluhan atau /help untuk daftar perintah' },
    ],
  },
  {
    id: 'demam-tifoid',
    patient: 'An. B, 8 th',
    blocks: [
      { type: 'header', text: 'SIDELAB · Clinical Intelligence · Sentra SideLab Project' },
      { type: 'input-label', text: 'INPUT DOKTER >' },
      {
        type: 'input-text',
        text: 'Anak perempuan 8 tahun demam 5 hari. Demam naik turun, lebih tinggi di sore/malam. Sakit kepala (+). Mual (+), muntah 2x. Diare cair 3x/hari. Tidak ada ruam. Tidak ada batuk atau pilek. Nafsu makan turun.',
      },
      { type: 'step', text: '✓ Menganalisis keluhan…' },
      { type: 'step', text: '✓ Clinical chains aktif: Demam Prolonged, GE Akut' },
      { type: 'step', text: '✓ Mengambil referensi klinis (RAG)…' },
      { type: 'step', text: '✓ Memproses dengan Sentra Voss 1.7 — mohon tunggu…' },
      {
        type: 'case',
        text: 'Anak 8 tahun dengan demam prolonged 5 hari, pola step-ladder, mual-muntah, diare, tanpa batuk pilek.',
      },
      { type: 'label', text: 'Clinical Chains' },
      { type: 'chain-name', text: 'Demam Prolonged' },
      { type: 'chain-sx', text: '→ Tifoid, Malaria, DBD, Leptospirosis, Infeksi Saluran Kemih' },
      { type: 'chain-px', text: 'Px: Widal, Tes Darah Malaria, NS1, Urinalisis' },
      { type: 'chain-name', text: 'GE Akut' },
      { type: 'chain-sx', text: '→ Gastroenteritis, Tifoid, Keracunan Makanan, Disentri' },
      { type: 'chain-px', text: 'Px: Feses Mikroskopis, Kultur Darah, Elektrolit' },
      { type: 'label', text: 'Klarifikasi' },
      {
        type: 'list-item',
        text: 'Apakah ada riwayat makan di luar atau makanan yang tidak dimasak?',
      },
      { type: 'list-item', text: 'Apakah ada ruam rose spot di perut atau dada?' },
      { type: 'list-item', text: 'Apakah ada riwayat perjalanan ke daerah endemis malaria?' },
      { type: 'label', text: 'Diagnosis Kerja' },
      { type: 'dx-status', text: '● SUSPEK TIFOID' },
      { type: 'dx-text', text: 'Demam tifoid (Typhoid fever) — perlu konfirmasi kultur darah' },
      { type: 'footer', text: 'ketik keluhan atau /help untuk daftar perintah' },
    ],
  },
]
