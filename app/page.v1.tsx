import type { Metadata } from 'next'
import Link from 'next/link'
import SiteFooter from '@/components/SiteFooter'
import SplitText from '@/components/motion/SplitText'
import Reveal from '@/components/motion/Reveal'
import Parallax from '@/components/motion/Parallax'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'

export const metadata: Metadata = {
  title: 'Sentra Assist — Clinical intelligence untuk layanan primer Indonesia',
  description:
    'Lapisan clinical decision support yang menempel pada workflow ePuskesmas untuk membantu triage, dokumentasi, dan keselamatan klinis — tanpa memaksa fasilitas mengganti sistem existing.',
  alternates: { canonical: 'https://sentraassist.id/' },
  openGraph: {
    title: 'Sentra Assist — Clinical intelligence untuk layanan primer Indonesia',
    description: 'Lapisan clinical decision support untuk ePuskesmas tanpa migrasi.',
    url: 'https://sentraassist.id/',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SENTRA ASSIST — Clinical intelligence untuk layanan primer Indonesia',
      },
    ],
  },
  twitter: {
    title: 'Sentra Assist — Clinical intelligence untuk layanan primer Indonesia',
    description: 'Lapisan clinical decision support untuk ePuskesmas tanpa migrasi.',
    images: ['/og-image.png'],
  },
}

const ORG_JSONLD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://sentraassist.id/#org',
      name: 'Sentra Assist',
      url: 'https://sentraassist.id/',
      logo: 'https://sentraassist.id/og-image.png',
      email: 'halo@sentraassist.id',
      sameAs: [],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://sentraassist.id/#site',
      url: 'https://sentraassist.id/',
      name: 'Sentra Assist',
      publisher: { '@id': 'https://sentraassist.id/#org' },
      inLanguage: 'id-ID',
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
      />
      <main id="main">
        <section id="hero" className="section">
          <header className="top">
            <Link className="wordmark" href="#hero" aria-label="Sentra Assist">
              SENTRA
            </Link>
            <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <Link className="utility" href="/sentrapedia">
                Sentrapedia
              </Link>
              <Link className="utility" href="/wiki">
                Wiki
              </Link>
              <Link className="utility" href="/acars">
                ACARS
              </Link>
              <Link className="utility" href="/manifesto">
                Manifesto
              </Link>
            </nav>
          </header>

          <div className="center">
            <Parallax speed={0.15}>
              <h1 className="tagline">
                <SplitText
                  as="span"
                  className="tagline-line"
                  text="Clinical intelligence"
                  trigger="mount"
                  delay={0.2}
                  stagger={0.08}
                  direction="left"
                />
                <SplitText
                  as="span"
                  className="tagline-line"
                  text="untuk layanan primer Indonesia"
                  trigger="mount"
                  delay={0.38}
                  stagger={0.08}
                  direction="left"
                >
                  <span className="dot-inline" aria-hidden="true" />
                </SplitText>
              </h1>
            </Parallax>
            <Parallax speed={0.1}>
              <Reveal as="p" className="uses" delay={1.1} y={6}>
                <span>Triage</span>
                <span className="sep">&middot;</span>
                <span>Dokumentasi</span>
                <span className="sep">&middot;</span>
                <span>Keputusan&nbsp;klinis</span>
              </Reveal>
            </Parallax>
          </div>

          <footer className="bottom">
            <Link href="mailto:halo@sentraassist.id">halo@sentraassist.id</Link>
            <span>&copy; 2026 Sentra&nbsp;Assist</span>
          </footer>

          <Link className="scroll-cue" href="#mission" aria-label="Scroll ke misi">
            <span>Misi</span>
            <span className="arrow" aria-hidden="true" />
          </Link>
        </section>

        <section id="mission" className="section">
          <header className="top">
            <Link className="small-mark" href="#hero" aria-label="Sentra Assist home">
              SENTRA&nbsp;ASSIST
            </Link>
            <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <Link className="utility" href="/sentrapedia">
                Sentrapedia
              </Link>
              <Link className="utility" href="/wiki">
                Wiki
              </Link>
              <Link className="utility" href="/acars">
                ACARS
              </Link>
              <Link className="utility" href="/manifesto">
                Manifesto
              </Link>
            </nav>
          </header>

          <div className="center">
            <Reveal delay={0.1} y={10}>
              <p className="mission-line">
                Misi kami sederhana: menjadi lapisan clinical decision support yang menempel pada
                workflow ePuskesmas &mdash; membantu dokter, perawat, dan triage officer bekerja
                lebih aman, lebih lengkap, dan lebih tajam &mdash; tanpa memaksa fasilitas mengganti
                sistem yang sudah mereka pakai, dan tanpa mengambil keputusan akhir yang tetap
                berada di tangan tenaga medis.
              </p>
            </Reveal>
          </div>

          <Parallax speed={0.12}>
            <div className="mark-foot" aria-label="SENTRA ASSIST">
              <span className="letters">SENTRA</span>
              <span className="dot" aria-hidden="true" />
            </div>
          </Parallax>

          <Reveal as="p" className="backronym" delay={0.4}>
            <span className="k">S</span>afety-first&nbsp;<span className="k">E</span>mbedded&nbsp;
            <span className="k">N</span>ursing-aware&nbsp;
            <span className="k">T</span>riage-aware&nbsp;
            <span className="k">R</span>eliable&nbsp;
            <span className="k">A</span>uditable
          </Reveal>

          <footer className="bottom">
            <Link href="mailto:halo@sentraassist.id">halo@sentraassist.id</Link>
            <span>&copy; 2026 Sentra&nbsp;Assist</span>
          </footer>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
