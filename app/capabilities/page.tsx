import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import SideRail from '@/components/SideRail'
import SplitText from '@/components/motion/SplitText'
import Reveal from '@/components/motion/Reveal'
import MaskWipe from '@/components/motion/MaskWipe'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import TiltCard from '@/components/motion/TiltCard'
import { siteUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Capabilities',
  description:
    'Enam kapabilitas Sentra Assist: workflow-native assist, non-disruptive integration, Indonesian primary care calibration, safety-first decision logic, adaptive document extraction, dan clinician authority layer.',
  alternates: { canonical: siteUrl('/capabilities') },
  openGraph: {
    title: 'Capabilities — Sentra Assist',
    description: 'Enam kapabilitas yang menyusun assist intelligence Sentra.',
    url: siteUrl('/capabilities'),
    type: 'article',
    images: [
      {
        url: siteUrl('/og-image.png'),
        width: 1200,
        height: 630,
        alt: 'Capabilities Sentra Assist',
      },
    ],
  },
  twitter: {
    title: 'Capabilities — Sentra Assist',
    description: 'Enam kapabilitas yang menyusun assist intelligence Sentra.',
    images: [siteUrl('/og-image.png')],
  },
}

const CAPS = [
  {
    id: '01 / In-context',
    name: 'Workflow-Native Assist',
    body: 'Sentra Assist menempel sebagai sidepanel saat dokter membuka ePuskesmas. Tidak minta pindah kerja, tidak minta buka tab kedua, tidak mengurangi perhatian dari pasien.',
    items: ['Sidepanel in-context', 'Single-keystroke invoke', 'Zero switching cost'],
  },
  {
    id: '02 / Integration',
    name: 'Non-Disruptive Integration',
    body: 'Tidak menuntut fasilitas mengganti ePuskesmas, membangun RME baru, atau menjalankan migrasi besar sebelum trial. Sentra Assist adaptif terhadap sistem yang sudah berjalan.',
    items: ['Tanpa migrasi RME', 'Adaptif terhadap form', 'Fast trial setup'],
  },
  {
    id: '03 / Localization',
    name: 'Indonesian Primary Care Calibration',
    body: 'Bukan terjemahan global. Dikalibrasi dengan prior penyakit konteks Indonesia, formulary dan obat yang relevan, serta pola kerja puskesmas dan poli umum.',
    items: ['Local prior', 'Local formulary', 'Pola puskesmas'],
  },
  {
    id: '04 / Safety',
    name: 'Safety-First Decision Logic',
    body: 'Gate klinis bertingkat, confidence layer, explainability, dan pemisahan jelas antara hasil ukur, saran, dan yang butuh konfirmasi. Bukan AI yang cepat terlihat pintar — AI yang dapat dipertanggungjawabkan.',
    items: ['Clinical gates', 'Confidence layer', 'Explained output'],
  },
  {
    id: '05 / Extraction',
    name: 'Adaptive Document Extraction',
    body: 'OCR, deteksi field adaptif, pemetaan form, dan autofill terkontrol. Bukan hanya &ldquo;membaca&rdquo; dokumen — menurunkan friksi entri tanpa menambah beban verifikasi manual.',
    items: ['Adaptive OCR', 'Field detection', 'Controlled autofill'],
  },
  {
    id: '06 / Authority',
    name: 'Clinician Authority Layer',
    body: 'Tenaga medis tetap final decision maker. Input manual diperlakukan sebagai otoritas tertinggi. Sistem tidak boleh override tanda vital manual. Sistem assists, never overrides.',
    items: ['Manual input final', 'No auto-override', 'Auditable chain'],
  },
]

export default function CapabilitiesPage() {
  return (
    <>
      <SiteHeader current="capabilities" />
      <main id="main">
        <article className="page">
          <SideRail />
          <Link href="/" className="back-link">
            &larr; Sentra
          </Link>
          <MaskWipe as="p" className="page-eyebrow" from="up" delay={0.08}>
            Capabilities
          </MaskWipe>

          <SplitText
            as="h1"
            className="page-title"
            text="Enam lapisan, satu assist intelligence."
            delay={0.2}
          />
          <Reveal as="p" className="lede-paragraph" delay={0.32}>
            Setiap kapabilitas berdiri sendiri. Digunakan bersama, mereka menyusun assist
            intelligence yang aman, lokal, dan terbukti di titik kerja dokter Indonesia.
          </Reveal>

          <Stagger as="div" className="cap-grid" stagger={0.08}>
            {CAPS.map((cap) => (
              <TiltCard as="article" key={cap.name} className="cap-cell">
                <p className="cap-id">{cap.id}</p>
                <h3 className="card-title" style={{ margin: 0 }}>
                  {cap.name}
                </h3>
                <p className="cap-body">{cap.body}</p>
                <ul className="cap-list">
                  {cap.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </TiltCard>
            ))}
          </Stagger>

          <Stagger as="div" stagger={0.1}>
            <StaggerItem as="h2" className="page-section-title">
              Mengapa mereka compose
            </StaggerItem>
            <StaggerItem as="p" className="prose">
              Safety-first tanpa local-fit adalah AI yang aman di dokumen tetapi berbahaya di
              puskesmas. Workflow-native tanpa clinician-authority adalah efisiensi yang melecehkan
              dokter. Adaptive extraction tanpa safety layer adalah otomasi yang tidak bisa diaudit.
              Keenam kapabilitas ini bukan fitur terpisah &mdash; mereka saling mengunci agar
              assistensi menjadi benar-benar aman dipakai di lapangan.
            </StaggerItem>
            <StaggerItem as="p" className="prose">
              Ambil satu lapisan pergi, dan yang tersisa menurun menjadi sesuatu yang tidak akan
              kami ship. Ambil keenamnya, dan Sentra Assist menjadi assist intelligence yang dapat
              dipertanggungjawabkan.
            </StaggerItem>
            <StaggerItem as="p" className="prose emphasis-p">
              <Link className="emphasis" href="/contact">
                Minta spesifikasi teknis &rarr;
              </Link>
            </StaggerItem>
          </Stagger>
        </article>
      </main>
      <SiteFooter />
    </>
  )
}
