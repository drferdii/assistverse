import type { Metadata } from 'next'
import Link from 'next/link'
import SiteFooter from '@/components/SiteFooter'
import { AIPromptBox } from '@/components/ui/ai-prompt-box'
import SplitText from '@/components/motion/SplitText'
import Reveal from '@/components/motion/Reveal'
import Parallax from '@/components/motion/Parallax'
import MouseParallax from '@/components/motion/MouseParallax'
import Magnetic from '@/components/motion/Magnetic'
import HeroStructuralGrid from '@/components/motion/HeroStructuralGrid'

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
      email: 'drferdiiskandar@sentrahai.com',
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

const SOCIALS = [
  { label: 'Website', href: 'https://ferdiiskandar.com', icon: '/social/globe.svg' },
  { label: 'Medium', href: 'https://medium.com/@codieverse', icon: '/social/medium.svg' },
  {
    label: 'ORCID',
    href: 'https://orcid.org/my-orcid?orcid=0009-0003-3788-1307',
    icon: '/social/orcid.svg',
  },
  { label: 'X', href: 'https://x.com/ClaudesyI81047', icon: '/social/x.svg' },
  {
    label: 'Substack',
    href: 'https://substack.com/@drferdiiskandar',
    icon: '/social/substack.svg',
  },
  { label: 'Kaggle', href: 'https://www.kaggle.com/drferdiiskandar', icon: '/social/kaggle.svg' },
  {
    label: 'Reddit',
    href: 'https://www.reddit.com/user/SixCupaCoffee/',
    icon: '/social/reddit.svg',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/dr-ferdi-iskandar-1b620a3b5',
    icon: '/social/linkedin.svg',
  },
  {
    label: 'Hugging Face',
    href: 'https://huggingface.co/dr-Ferdi',
    icon: '/social/huggingface.svg',
  },
]

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
      />
      <main id="main">
        <section id="hero" className="section relative overflow-hidden">
          <MouseParallax className="absolute inset-0 z-0 pointer-events-none" strength={10}>
            <HeroStructuralGrid />
          </MouseParallax>

          <header className="top relative z-10">
            <Link
              className="wordmark flex items-center gap-3"
              href="#hero"
              aria-label="Sentra Artificial Intelligence"
            >
              <img src="/sentralogo.png" alt="" className="w-8 h-8" />
              <span>SENTRA ARTIFICIAL INTELLIGENCE</span>
            </Link>
            <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <Link className="utility" href="/acars">
                ACARS
              </Link>
              <Link className="utility" href="/capabilities">
                Capabilities
              </Link>
              <Link className="utility" href="/contact">
                Contact
              </Link>
              <Link className="utility" href="/manifesto">
                Manifesto
              </Link>
              <Link className="utility" href="/principles">
                Principles
              </Link>
              <Link className="utility" href="/sentrapedia">
                Sentrapedia
              </Link>
              <Link className="utility" href="/wiki">
                Wiki
              </Link>
            </nav>
          </header>

          <div className="center relative mt-8 pt-8">
            <div className="w-full grid grid-cols-1 md:grid-cols-[0.85fr_1.15fr] relative z-10">
              <div className="section-copy flex flex-col justify-center h-full md:pr-12 lg:pr-16 pb-12 md:pb-0">
                <Parallax speed={0.15}>
                  <h1 className="tagline relative z-10">
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
                  <Reveal
                    as="div"
                    delay={1.2}
                    y={6}
                    className="mt-8 flex items-center gap-5 pt-8 w-full"
                  >
                    {SOCIALS.map((s) => (
                      <Magnetic key={s.label} strength={5}>
                        <Link
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.label}
                          className="hover:opacity-100 opacity-50 transition-opacity"
                        >
                          <img
                            src={s.icon}
                            alt={s.label}
                            className="w-[20px] h-[20px] object-contain"
                            style={{ filter: 'brightness(0) opacity(0.8)' }}
                          />
                        </Link>
                      </Magnetic>
                    ))}
                  </Reveal>
                  <Reveal as="div" delay={1.3} y={6} className="mt-10 text-left pt-8 w-full">
                    <Link
                      href="https://melinda.co.id/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 hover:opacity-80 transition-opacity group"
                    >
                      <span className="text-[10px] uppercase tracking-widest font-bold text-ink-soft opacity-60 group-hover:opacity-100 transition-opacity">
                        Assist dikembangkan di lab technology Melinda DHAI 2025-2026
                      </span>
                      <img
                        src="/melinda.avif"
                        alt="RSIA Melinda"
                        className="h-10 w-auto object-contain"
                        style={{ filter: 'grayscale(1) brightness(0) opacity(0.4)' }}
                      />
                    </Link>
                  </Reveal>
                </Parallax>
              </div>
              <div className="section-port flex items-center justify-center p-4 lg:p-12 w-full h-full min-h-[400px]">
                <Reveal
                  as="div"
                  delay={1.4}
                  y={10}
                  scale={0.97}
                  className="w-full max-w-xl mx-auto relative z-20 mt-40"
                >
                  <MouseParallax strength={-6}>
                    <AIPromptBox />
                  </MouseParallax>
                </Reveal>
              </div>
            </div>
          </div>

          <footer
            className="bottom flex-wrap relative z-10"
            style={{ alignItems: 'flex-end', width: '100%' }}
          >
            <div className="flex flex-col items-start gap-1">
              <Link href="mailto:drferdiiskandar@sentrahai.com">drferdiiskandar@sentrahai.com</Link>
              <div className="flex flex-col text-[10px] text-ink-soft opacity-60 leading-tight mt-1 max-w-[600px]">
                <span>&copy; 2026 Sentra Artificial intelligence. All Rights Reserved.</span>
                <span>
                  Seluruh konten yang terdapat dalam situs ini dilindungi oleh hak cipta. Dilarang
                  menyalin, menyebarluaskan, atau menggunakan sebagian atau seluruh isi tanpa izin
                  tertulis dari pemilik hak cipta.
                </span>
              </div>
            </div>
          </footer>

          <Link className="scroll-cue" href="#mission" aria-label="Scroll ke misi">
            <span>Misi</span>
            <span className="arrow" aria-hidden="true" />
          </Link>
        </section>

        <section id="mission" className="section">
          <header className="top">
            <Link
              className="small-mark flex items-center gap-2"
              href="#hero"
              aria-label="Sentra Artificial Intelligence home"
            >
              <img src="/sentralogo.png" alt="" className="w-6 h-6" />
              <span>SENTRA ARTIFICIAL INTELLIGENCE</span>
            </Link>
            <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <Link className="utility" href="/acars">
                ACARS
              </Link>
              <Link className="utility" href="/capabilities">
                Capabilities
              </Link>
              <Link className="utility" href="/contact">
                Contact
              </Link>
              <Link className="utility" href="/manifesto">
                Manifesto
              </Link>
              <Link className="utility" href="/principles">
                Principles
              </Link>
              <Link className="utility" href="/sentrapedia">
                Sentrapedia
              </Link>
              <Link className="utility" href="/wiki">
                Wiki
              </Link>
            </nav>
          </header>

          <div className="center">
            <Reveal delay={0.1} y={10} scale={0.96}>
              <p className="mission-line">
                Kita tidak butuh aplikasi kesehatan baru. Layanan primer sudah kelelahan menatap
                layar. Sentra Assist tidak datang untuk memonopoli meja kerja Anda. Ia beroperasi
                sunyi di latar belakang ePuskesmas &mdash; membereskan dokumentasi, mengamankan
                keputusan klinis, lalu segera minggir agar Anda bisa kembali menatap pasien.
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
            <span className="k">S</span>mart&nbsp;
            <span className="k">E</span>ngine for&nbsp;
            <span className="k">N</span>ext-gen&nbsp;
            <span className="k">T</span>echnology,&nbsp;
            <span className="k">R</span>esearch, and&nbsp;
            <span className="k">A</span>nalytics
          </Reveal>

          <footer className="bottom">
            <Link href="mailto:drferdiiskandar@sentrahai.com">drferdiiskandar@sentrahai.com</Link>
            <span>&copy; 2026 Sentra&nbsp;Assist</span>
          </footer>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
