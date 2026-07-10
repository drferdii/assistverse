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
  title: 'Terms',
  description:
    'Ketentuan penggunaan situs Sentra Assist dan ringkasan bagaimana layanan Sentra Assist diakses oleh fasilitas kesehatan.',
  alternates: { canonical: 'https://sentraassist.id/terms' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Terms — Sentra Assist',
    description: 'Ketentuan penggunaan situs dan ringkasan layanan Sentra Assist.',
    url: 'https://sentraassist.id/terms',
    type: 'article',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Terms Sentra Assist' }],
  },
  twitter: {
    title: 'Terms — Sentra Assist',
    description: 'Ketentuan penggunaan situs dan ringkasan layanan Sentra Assist.',
    images: ['/og-image.png'],
  },
}

export default function TermsPage() {
  return (
    <>
      <SiteHeader current="terms" />
      <main id="main">
        <article className="page">
          <SideRail />
          <Link href="/" className="back-link">
            &larr; Sentra
          </Link>
          <MaskWipe as="p" className="page-eyebrow" from="up" delay={0.08}>
            Terms
          </MaskWipe>
          <SplitText as="h1" className="page-title" text="Ketentuan penggunaan." delay={0.2} />
          <Reveal as="p" className="lede-paragraph" delay={0.32}>
            Efektif 1 Juni 2026. Placeholder text menunggu review hukum final; versi mengikat selalu
            berada di URL di atas.
          </Reveal>

          <MaskWipe as="div" from="left" duration={1.1} delay={0.1}>
            <hr className="thin" />
          </MaskWipe>

          <Stagger as="div" stagger={0.1}>
            <StaggerItem as="h2" className="page-section-title">
              Penerimaan
            </StaggerItem>
            <StaggerItem as="p" className="prose">
              Dengan mengakses situs ini, Anda setuju dengan ketentuan ini. Jika Anda tidak setuju,
              jangan gunakan situs ini. Kami dapat mengubah ketentuan ini; versi terkini selalu
              berada di URL di atas.
            </StaggerItem>
          </Stagger>

          <Stagger as="div" stagger={0.1}>
            <StaggerItem as="h2" className="page-section-title">
              Eligible use
            </StaggerItem>
            <StaggerItem as="p" className="prose">
              Anda dapat menjelajahi situs ini untuk tujuan informasional. Anda tidak boleh
              melakukan scraping, mirroring, atau systematic retrieval terhadap kontennya. Anda
              tidak boleh berupaya mengidentifikasi atau menghubungi subjek data klinis yang dirujuk
              dalam konten penjelasan apa pun. Anda tidak boleh menampilkan konten Sentra Assist di
              luar konteks dengan cara yang memutarbalikkan praktik atau posisi perusahaan.
            </StaggerItem>
          </Stagger>

          <Stagger as="div" stagger={0.1}>
            <StaggerItem as="h2" className="page-section-title">
              Scope of service
            </StaggerItem>
            <StaggerItem as="p" className="prose">
              Situs ini mendeskripsikan Sentra Assist sebagai lapisan clinical decision support yang
              beroperasi dalam konteks ePuskesmas. Ia bukan produk yang berdiri sendiri untuk
              penggunaan pasien umum. Akses layanan diatur di bawah perjanjian terpisah dengan
              fasilitas kesehatan pengguna dan tunduk pada regulasi yang berlaku termasuk UU PDP dan
              Permenkes Nomor 24 Tahun 2022 tentang Rekam Medis Elektronik.
            </StaggerItem>
          </Stagger>

          <Stagger as="div" stagger={0.1}>
            <StaggerItem as="h2" className="page-section-title">
              Otoritas dan tanggung jawab klinis
            </StaggerItem>
            <StaggerItem as="p" className="prose">
              Sentra Assist adalah alat assistensi. Semua keputusan klinis tetap berada pada tenaga
              medis yang merawat. Sentra Assist tidak bertanggung jawab atas keputusan klinis apa
              pun. Fasilitas kesehatan pengguna bertanggung jawab penuh atas evaluasi, persetujuan,
              dan supervisi terhadap penggunaan produk.
            </StaggerItem>
          </Stagger>

          <Stagger as="div" stagger={0.1}>
            <StaggerItem as="h2" className="page-section-title">
              Data handling
            </StaggerItem>
            <StaggerItem as="p" className="prose">
              Penanganan data klinis tunduk pada{' '}
              <Link className="emphasis" href="/privacy">
                Privacy Notice
              </Link>{' '}
              kami dan perjanjian pemrosesan data yang dinegosiasikan dengan fasilitas kesehatan
              pengguna. Sentra Assist tidak menyimpan data pasien sendiri &mdash; data tetap berada
              dalam sistem asal.
            </StaggerItem>
          </Stagger>

          <Stagger as="div" stagger={0.1}>
            <StaggerItem as="h2" className="page-section-title">
              Konten
            </StaggerItem>
            <StaggerItem as="p" className="prose">
              Konten pada situs ini disediakan &ldquo;sebagaimana adanya&rdquo;. Konten ini bersifat
              deskriptif terhadap praktik dan niat, bukan spesifikasi mengikat atas layanan apa pun.
              Pernyataan forward-looking tentang kapabilitas masa depan tidak mengikat dan dapat
              berubah.
            </StaggerItem>
          </Stagger>

          <Stagger as="div" stagger={0.1}>
            <StaggerItem as="h2" className="page-section-title">
              Ketersediaan layanan
            </StaggerItem>
            <StaggerItem as="p" className="prose">
              Situs ini disediakan tanpa jaminan ketersediaan. Kami dapat memutuskan untuk mematikan
              situs, mengalihkan trafik, atau mengubah struktur URL kapan saja. Kami tidak menjamin
              bahwa sumber daya eksternal yang ditautkan selalu dapat dijangkau.
            </StaggerItem>
          </Stagger>

          <Stagger as="div" stagger={0.1}>
            <StaggerItem as="h2" className="page-section-title">
              Hak kekayaan intelektual
            </StaggerItem>
            <StaggerItem as="p" className="prose">
              Wordmark, logotype, dan identitas visual Sentra Assist adalah merek dagang dari Sentra
              Assist. Konten tertulis di situs ini adalah hak cipta dan tidak dapat dipublikasikan
              ulang tanpa atribusi. Untuk permintaan penggunaan ulang, hubungi{' '}
              <Link className="emphasis" href="mailto:press@sentraassist.id">
                press@sentraassist.id
              </Link>
              .
            </StaggerItem>
          </Stagger>

          <Stagger as="div" stagger={0.1}>
            <StaggerItem as="h2" className="page-section-title">
              Batas tanggung jawab
            </StaggerItem>
            <StaggerItem as="p" className="prose">
              Sejauh diizinkan oleh hukum, Sentra Assist tidak bertanggung jawab atas kerugian tidak
              langsung, insidental, atau konsekuensial yang timbul dari penggunaan situs ini. Total
              tanggung jawab kami untuk klaim apa pun yang timbul dari situs ini terbatas pada biaya
              (jika ada) yang telah Anda bayarkan kepada Sentra Assist dalam dua belas bulan sebelum
              klaim tersebut.
            </StaggerItem>
          </Stagger>

          <Stagger as="div" stagger={0.1}>
            <StaggerItem as="h2" className="page-section-title">
              Hukum yang berlaku
            </StaggerItem>
            <StaggerItem as="p" className="prose">
              Ketentuan ini diatur oleh hukum Republik Indonesia, tanpa memperhatikan ketentuan
              conflict-of-laws. Sengketa diajukan ke yurisdiksi eksklusif pengadilan yang berwenang
              di Jakarta, Indonesia.
            </StaggerItem>
          </Stagger>

          <Stagger as="div" stagger={0.1}>
            <StaggerItem as="h2" className="page-section-title">
              Kontak
            </StaggerItem>
            <StaggerItem as="p" className="prose">
              Untuk pertanyaan terkait ketentuan, hubungi{' '}
              <Link className="emphasis" href="mailto:legal@sentraassist.id">
                legal@sentraassist.id
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
