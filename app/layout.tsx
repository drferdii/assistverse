import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import MotionProvider from '@/components/motion/MotionProvider'
import SmoothScroll from '@/components/SmoothScroll'
import './globals.css'

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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com/" />
        <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500;600;800&amp;family=Newsreader:ital,wght@1,400&amp;family=IBM+Plex+Mono:wght@400;500&amp;display=swap"
        />
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html: '[style*="opacity:0"]{opacity:1!important;transform:none!important}',
            }}
          />
        </noscript>
      </head>
      <body suppressHydrationWarning>
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
