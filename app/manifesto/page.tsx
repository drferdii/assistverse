import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import SideRail from '@/components/SideRail'
import SplitText from '@/components/motion/SplitText'
import Reveal from '@/components/motion/Reveal'
import MaskWipe from '@/components/motion/MaskWipe'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'

export const metadata: Metadata = {
  title: 'Manifesto',
  description:
    'Mengapa Sentra Assist dibangun: lapisan kecerdasan klinis yang hidup di titik kerja dokter Indonesia, bukan AI terpisah yang meminta dokter pindah kerja.',
  alternates: { canonical: 'https://sentraassist.id/manifesto' },
  openGraph: {
    title: 'Manifesto — Sentra Assist',
    description: 'Mengapa Sentra Assist dibangun.',
    url: 'https://sentraassist.id/manifesto',
    type: 'article',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Manifesto Sentra Assist' }],
  },
  twitter: {
    title: 'Manifesto — Sentra Assist',
    description: 'Mengapa Sentra Assist dibangun.',
    images: ['/og-image.png'],
  },
}

const ARTICLE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Kecerdasan klinis yang tidak menggantikan dokter',
  datePublished: '2026-01-01',
  dateModified: '2026-06-01',
  inLanguage: 'id-ID',
  url: 'https://sentraassist.id/manifesto',
  author: { '@type': 'Organization', name: 'Sentra Assist', url: 'https://sentraassist.id/' },
  publisher: { '@type': 'Organization', name: 'Sentra Assist', url: 'https://sentraassist.id/' },
}

export default function ManifestoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_JSONLD) }}
      />
      <SiteHeader current="manifesto" />
      <main id="main">
        <article className="page">
          <SideRail />
          <Link href="/" className="back-link">
            &larr; Sentra
          </Link>
          <MaskWipe as="p" className="page-eyebrow" from="up" delay={0.08}>
            Manifesto
          </MaskWipe>

          <SplitText
            as="h1"
            className="page-title"
            text="Kecerdasan klinis yang tidak menggantikan dokter."
            delay={0.2}
          />
          <Reveal as="p" className="lede-paragraph" delay={0.32}>
            Kita tidak butuh aplikasi AI baru. Layanan primer sudah cukup lelah dengan sistem yang
            menuntut dokter berpindah-pindah tab. Sentra Assist beroperasi di belakang layar
            ePuskesmas—membersihkan beban administratif Anda dengan pagar klinis ketat, agar Anda
            bisa kembali fokus menatap pasien.
          </Reveal>

          <MaskWipe as="div" from="left" duration={1.1} delay={0.1}>
            <hr className="thin" />
          </MaskWipe>

          <Stagger as="div" stagger={0.1}>
            <StaggerItem as="h2" className="page-section-title">
              Premis
            </StaggerItem>
            <StaggerItem as="p" className="prose">
              Dokter Indonesia tidak butuh mainan teknologi baru. Pasar sudah penuh dengan solusi AI
              kesehatan yang congkak—yang dirancang untuk terlihat pintar di ruang presentasi tapi
              gagal total di poli puskesmas yang riuh. Sentra Assist dibangun atas satu kesadaran:
              teknologi terbaik adalah yang tidak terlihat. Ia hidup tepat di antara anamnesa dan
              rujukan, mengamankan keputusan Anda tanpa memutus kontak mata Anda dengan pasien.
            </StaggerItem>
          </Stagger>

          <Stagger as="div" stagger={0.1}>
            <StaggerItem as="h2" className="page-section-title">
              Mengapa kami membangun ini
            </StaggerItem>
            <StaggerItem as="p" className="prose">
              Pertama, beban dokumentasi sudah tidak rasional. Anamnesa, tanda vital, resep, dan
              rujukan diketik berulang-ulang di form yang berbeda. Ini membuang waktu klinis yang
              berharga. Sentra Assist menggunakan OCR dan ekstraksi data untuk membereskan friksi
              itu secara otomatis.
            </StaggerItem>
            <StaggerItem as="p" className="prose">
              Kedua, kualitas layanan sering kali bergantung pada siapa dokter yang berjaga.
              Menyusun <em>differential diagnosis</em> di tengah tekanan 50 pasien per hari itu
              berat. Sentra Assist bertindak sebagai <em>clinical safety net</em>—bukan untuk
              menggurui, tapi memastikan tidak ada diagnosis krusial yang terlewat oleh kelelahan.
            </StaggerItem>
            <StaggerItem as="p" className="prose">
              Ketiga, produk AI generik terlalu nekat. Mereka berani memberi saran medis tanpa dasar
              keamanan yang jelas. Kami sebaliknya. Setiap angka, teks, dan rekomendasi dari Sentra
              Assist dikawal oleh <em>clinical gates</em> berlapis. Kami tahu batas antara alat
              bantu dan pengambil keputusan.
            </StaggerItem>
          </Stagger>

          <Stagger as="div" stagger={0.1}>
            <StaggerItem as="h2" className="page-section-title">
              Posisi unik
            </StaggerItem>
            <StaggerItem as="p" className="prose">
              Ini bukan sistem EMR baru yang harus Anda pelajari berbulan-bulan. Ini bukan chatbot
              generik yang sok tahu. Sentra Assist adalah <em>embedded intelligence</em>—ia hidup di
              dalam ePuskesmas yang sudah Anda pakai. Ia memotong entri data ganda, mempercepat
              dokumentasi, dan membiarkan ketukan palu terakhir tetap di tangan Anda.
            </StaggerItem>
          </Stagger>

          <Stagger as="div" stagger={0.1}>
            <StaggerItem as="h2" className="page-section-title">
              Tiga pilar pendekatan
            </StaggerItem>
            <StaggerItem as="p" className="prose">
              <strong>Workflow-native.</strong> Sentra Assist tidak meminta dokter membuka platform
              baru. Ia bekerja di titik kerja nyata, sehingga adopsi lebih mudah, resistensi lebih
              rendah, dan waktu belajar lebih singkat. Untuk pemegang keputusan dan investor, ini
              berarti time-to-value lebih cepat dan risiko kegagalan adopsi lebih kecil.
            </StaggerItem>
            <StaggerItem as="p" className="prose">
              <strong>Non-disruptive.</strong> Tidak menuntut fasilitas mengganti ePuskesmas atau
              melakukan migrasi besar sebelum trial. Ini penting di Indonesia, di mana implementasi
              digital kesehatan sering terkendala anggaran, kesiapan SDM, kesiapan infrastruktur,
              dan birokrasi. Sentra Assist menempel, tidak menggantikan.
            </StaggerItem>
            <StaggerItem as="p" className="prose">
              <strong>Local-fit.</strong> Bukan mesin generik yang ditempel begitu saja. Sentra
              Assist dikalibrasi untuk konteks layanan primer Indonesia: prior penyakit berbasis
              kasus klinis lokal, formulary dan konteks obat yang relevan, pola kerja puskesmas dan
              poli umum, serta realitas peran dokter, perawat, triage officer, dan admin.
            </StaggerItem>
          </Stagger>

          <Stagger as="div" stagger={0.1}>
            <StaggerItem as="h2" className="page-section-title">
              Keselamatan klinis bukan fitur tambahan
            </StaggerItem>
            <StaggerItem as="p" className="prose">
              Sentra Assist tidak mengejar AI yang impresif melainkan AI yang dapat
              dipertanggungjawabkan. Prinsip ini bukan slogan: gate klinis aktif secara default,
              input manual tenaga medis diperlakukan sebagai otoritas tertinggi, sistem tidak boleh
              override tanda vital manual, dan setiap bantuan dijelaskan &mdash; mana hasil ukur,
              mana saran, mana yang butuh konfirmasi.
            </StaggerItem>

            <StaggerItem as="p" className="prose emphasis-p">
              <Link className="emphasis" href="/contact">
                Untuk pilot trial atau diskusi riset &rarr;
              </Link>
            </StaggerItem>
          </Stagger>
        </article>
      </main>
      <SiteFooter />
    </>
  )
}
