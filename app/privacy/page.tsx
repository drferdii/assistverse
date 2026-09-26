import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import SideRail from '@/components/SideRail'
import SplitText from '@/components/motion/SplitText'
import Reveal from '@/components/motion/Reveal'
import MaskWipe from '@/components/motion/MaskWipe'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { siteUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privacy',
  description:
    'Bagaimana Sentra Assist menangani data klinis: apa yang dikumpulkan, apa yang tidak, bagaimana consent dan otoritas klinisi dijaga, dan hak subjek data sesuai UU PDP.',
  alternates: { canonical: siteUrl('/privacy') },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Privacy — Sentra Assist',
    description: 'Bagaimana Sentra Assist menangani data klinis.',
    url: siteUrl('/privacy'),
    type: 'article',
    images: [
      { url: siteUrl('/og-image.png'), width: 1200, height: 630, alt: 'Privacy Sentra Assist' },
    ],
  },
  twitter: {
    title: 'Privacy — Sentra Assist',
    description: 'Bagaimana Sentra Assist menangani data klinis.',
    images: [siteUrl('/og-image.png')],
  },
}

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader current="privacy" />
      <main id="main">
        <article className="page">
          <SideRail />
          <Link href="/" className="back-link">
            &larr; Sentra
          </Link>
          <MaskWipe as="p" className="page-eyebrow" from="up" delay={0.08}>
            Privacy
          </MaskWipe>
          <SplitText
            as="h1"
            className="page-title"
            text="Bagaimana Sentra Assist menangani data klinis."
            delay={0.2}
          />
          <Reveal as="p" className="lede-paragraph" delay={0.32}>
            Efektif 1 Juni 2026. Placeholder notice menunggu review hukum final; versi mengikat
            selalu berada di URL di atas.
          </Reveal>

          <MaskWipe as="div" from="left" duration={1.1} delay={0.1}>
            <hr className="thin" />
          </MaskWipe>

          <Stagger as="div" stagger={0.1}>
            <StaggerItem as="h2" className="page-section-title">
              Apa yang kami kumpulkan
            </StaggerItem>
            <StaggerItem as="p" className="prose">
              Sentra Assist memproses data klinis yang sudah berada di dalam ePuskesmas tempat
              dokter bekerja. Data yang kami proses terbatas pada apa yang dibutuhkan untuk
              assistensi di titik kerja: anamnesa, tanda vital, alergi, discharge summary, hasil lab
              yang dipublikasikan oleh sistem, dan konteks workflow seperti flag triage atau status
              kunjungan. Kami tidak menambahkan pengumpulan data baru di luar apa yang sudah ada
              dalam sistem asal.
            </StaggerItem>
          </Stagger>

          <Stagger as="div" stagger={0.1}>
            <StaggerItem as="h2" className="page-section-title">
              Apa yang TIDAK kami kumpulkan
            </StaggerItem>
            <StaggerItem as="p" className="prose">
              Kami tidak menarik data subjek tanpa adanya <em>active clinical session</em>. Kami
              tidak membuat profil komposit tunggal dari seorang individu. Kami tidak menjual,
              melisensikan, atau mengalihkan data pasien untuk tujuan pemodelan pihak ketiga &mdash;
              kami menyediakan layanan yang mengembalikan hasil turunan, bukan record subjek
              mentahnya.
            </StaggerItem>
          </Stagger>

          <Stagger as="div" stagger={0.1}>
            <StaggerItem as="h2" className="page-section-title">
              Consent & otoritas klinisi
            </StaggerItem>
            <StaggerItem as="p" className="prose">
              Assistensi hanya terjadi pada saat dokter yang merawat sedang membuka sistem dan
              secara aktif menggunakan sesi. Sentra Assist tidak pernah beroperasi di luar sesi
              tersebut. Tenaga medis adalah otoritas tertinggi atas pasien mereka &mdash; Sentra
              Assist tidak meng-override input manual, tidak menggantikannya dengan saran otomatis,
              dan tidak pernah membuat keputusan klinis atas nama dokter.
            </StaggerItem>
          </Stagger>

          <Stagger as="div" stagger={0.1}>
            <StaggerItem as="h2" className="page-section-title">
              Audit & retention
            </StaggerItem>
            <StaggerItem as="p" className="prose">
              Setiap output assistensi meninggalkan jejak audit yang mengikatnya ke sesi klinis
              tempat output tersebut muncul. Retention mengikuti kebijakan fasilitas dan regulasi
              yang berlaku &mdash; Sentra Assist tidak menyimpan catatan klinis lebih lama daripada
              yang diizinkan oleh sistem asal dan regulasi yang dirujuk di bawah ini.
            </StaggerItem>
          </Stagger>

          <Stagger as="div" stagger={0.1}>
            <StaggerItem as="h2" className="page-section-title">
              Hak subjek data
            </StaggerItem>
            <StaggerItem as="p" className="prose">
              Pasien memiliki hak untuk meminta akses, koreksi, atau penjelasan atas data klinis
              mereka. Karena Sentra Assist tidak menyimpan data pasien sendiri melainkan memproses
              data yang sudah ada di sistem asal, permintaan subjek data dialihkan ke fasilitas
              kesehatan dan sistem ePuskesmas yang memegang otoritas data.
            </StaggerItem>
          </Stagger>

          <Stagger as="div" stagger={0.1}>
            <StaggerItem as="h2" className="page-section-title">
              Regulasi yang dirujuk
            </StaggerItem>
            <StaggerItem as="p" className="prose">
              Sentra Assist dirancang遵守 dengan: Undang-Undang Republik Indonesia Nomor 27 Tahun
              2022 tentang Perlindungan Data Pribadi (UU PDP), Peraturan Menteri Kesehatan Nomor 24
              Tahun 2022 tentang Rekam Medis Elektronik, serta pedoman konsil dan asosiasi medis
              terkait yang relevan. Untuk mitra internasional, kami menyediakan dokumentasi pemetaan
              regulasi tambahan atas permintaan.
            </StaggerItem>
          </Stagger>

          <Stagger as="div" stagger={0.1}>
            <StaggerItem as="h2" className="page-section-title">
              Kontak
            </StaggerItem>
            <StaggerItem as="p" className="prose">
              Untuk pertanyaan terkait privasi dan data klinis, hubungi{' '}
              <Link className="emphasis" href="mailto:drferdiiskandar@sentrahai.com">
                drferdiiskandar@sentrahai.com
              </Link>
              . Untuk hal lainnya,{' '}
              <Link className="emphasis" href="/contact">
                hubungi kami di sini
              </Link>
              .
            </StaggerItem>
          </Stagger>
        </article>
      </main>
      <SiteFooter />
    </>
  )
}
