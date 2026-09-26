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
  title: 'Principles',
  description:
    'Empat prinsip yang menaungi desain Sentra Assist: keselamatan klinis mendahului performa, explainability non-negotiable, otoritas klinisi final, dan local fit beats generic abstraction.',
  alternates: { canonical: siteUrl('/principles') },
  openGraph: {
    title: 'Principles — Sentra Assist',
    description: 'Empat prinsip desain Sentra Assist.',
    url: siteUrl('/principles'),
    type: 'article',
    images: [
      { url: siteUrl('/og-image.png'), width: 1200, height: 630, alt: 'Principles Sentra Assist' },
    ],
  },
  twitter: {
    title: 'Principles — Sentra Assist',
    description: 'Empat prinsip desain Sentra Assist.',
    images: [siteUrl('/og-image.png')],
  },
}

const PRINCIPLES = [
  'Keselamatan klinis mendahului performa model.',
  'Explainability non-negotiable — setiap bantuan harus dapat dijelaskan.',
  'Otoritas klinisi adalah final — sistem assists, never overrides.',
  'Local fit beats generic — Indonesia-tuned, bukan terjemahan global.',
]

export default function PrinciplesPage() {
  return (
    <>
      <SiteHeader current="principles" dark />
      <main id="main">
        <article className="page">
          <SideRail />
          <Link href="/" className="back-link">
            &larr; Sentra
          </Link>
          <MaskWipe as="p" className="page-eyebrow" from="up" delay={0.08}>
            Principles
          </MaskWipe>

          <SplitText as="h1" className="page-title" text="Etos kerja Sentra Assist." delay={0.2} />
          <Reveal as="p" className="lede-paragraph" delay={0.32}>
            Ini bukan visi. Ini adalah constraint desain yang kami ukur sebelum sebuah fitur
            di-ship. Empat prinsip ini bukan dipasang untuk presentasi &mdash; mereka membatasi apa
            yang boleh dibuat.
          </Reveal>

          <MaskWipe as="div" from="left" duration={1.1} delay={0.1}>
            <hr className="thin" />
          </MaskWipe>

          <Stagger as="ol" className="principles-list" stagger={0.12}>
            {PRINCIPLES.map((text, i) => (
              <StaggerItem as="li" key={text}>
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <span>{text}</span>
              </StaggerItem>
            ))}
          </Stagger>

          <Stagger as="div" stagger={0.1}>
            <StaggerItem as="h2" className="page-section-title">
              Bagaimana mereka ditegakkan
            </StaggerItem>
            <StaggerItem as="p" className="prose">
              Setiap prinsip memiliki permukaan terukur. Keselamatan klinis ditegakkan lewat gate
              yang aktif secara default dan refusal-to-suggest saat konteks belum siap.
              Explainability ditegakkan lewat output yang memisahkan hasil ukur, saran, dan yang
              butuh konfirmasi manual. Otoritas klinisi ditegakkan lewat permission model yang
              menjadikan input manual sebagai sumber kebenaran tertinggi. Local fit ditegakkan lewat
              kalibrasi berkala terhadap data klinis Indonesia dan validasi dengan dokter layanan
              primer.
            </StaggerItem>
            <StaggerItem as="p" className="prose">
              Ketika seorang partner meminta sesuatu yang melanggar salah satu dari empat,
              jawabannya adalah tidak. Bukan kadang-kadang &mdash; selalu. Substrat hanya bekerja
              jika constraint-nya bertahan.
            </StaggerItem>
          </Stagger>

          <Stagger as="div" stagger={0.1}>
            <StaggerItem as="h2" className="page-section-title">
              Apa yang mereka bukan
            </StaggerItem>
            <StaggerItem as="p" className="prose">
              Mereka bukan jargon di slide. Bukan values statement yang di-update per quarter. Bukan
              &ldquo;pendekatan kami&rdquo; yang dikubur di deck. Mereka tertulis di sini karena
              kami rugi ketika dilanggar, dan karena orang-orang yang datanya kami proses percaya
              kepada kami hanya karena pelanggaran terjadi jarang.
            </StaggerItem>
            <StaggerItem as="p" className="prose emphasis-p">
              <Link className="emphasis" href="/contact">
                Berbagi prinsip yang sama? Bicara dengan kami.
              </Link>
            </StaggerItem>
          </Stagger>
        </article>
      </main>
      <SiteFooter />
    </>
  )
}
