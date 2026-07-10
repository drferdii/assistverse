import type { Metadata, Viewport } from 'next'
import { Hanken_Grotesk, IBM_Plex_Mono, Newsreader } from 'next/font/google'
import type { ReactNode } from 'react'
import MotionProvider from '@/components/motion/MotionProvider'
import SmoothScroll from '@/components/SmoothScroll'
import './globals.css'

const fontDisplay = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const fontEditorial = Newsreader({
  subsets: ['latin'],
  variable: '--font-editorial',
  style: ['normal', 'italic'],
  display: 'swap',
})

const fontMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://sentraassist.id'),
  title: {
    default: 'Sentra Assist — Clinical intelligence untuk layanan primer Indonesia',
    template: '%s — Sentra Assist',
  },
  description:
    'Sentra Assist adalah lapisan clinical decision support yang menempel pada workflow ePuskesmas untuk membantu triage, dokumentasi, dan keselamatan klinis tanpa memaksa fasilitas mengganti sistem existing.',
  applicationName: 'Sentra Assist',
  authors: [{ name: 'Sentra Assist' }],
  generator: 'Next.js',
  referrer: 'strict-origin-when-cross-origin',
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: '/sentra.png', type: 'image/png', sizes: '1024x1024' }],
    apple: [{ url: '/sentra.png', sizes: '1024x1024' }],
    shortcut: '/sentra.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    siteName: 'Sentra Assist',
    locale: 'id_ID',
    alternateLocale: ['en_US'],
    title: 'Sentra Assist — Clinical intelligence untuk layanan primer Indonesia',
    description: 'Lapisan clinical decision support untuk ePuskesmas tanpa migrasi.',
    url: 'https://sentraassist.id/',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'SENTRA ASSIST' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sentra Assist — Clinical intelligence untuk layanan primer Indonesia',
    description: 'Lapisan clinical decision support untuk ePuskesmas tanpa migrasi.',
    images: ['/og-image.png'],
  },
  alternates: { canonical: 'https://sentraassist.id/' },
  formatDetection: { email: false, address: false, telephone: false },
}

export const viewport: Viewport = {
  themeColor: '#F4F2EC',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html: '[style*="opacity:0"]{opacity:1!important;transform:none!important}',
            }}
          />
        </noscript>
      </head>
      <body
        suppressHydrationWarning
        className={`${fontDisplay.variable} ${fontEditorial.variable} ${fontMono.variable}`}
      >
        <a className="skip-link" href="#main">
          Lewati ke konten
        </a>
        <SmoothScroll>
          <MotionProvider>{children}</MotionProvider>
        </SmoothScroll>
      </body>
    </html>
  )
}
