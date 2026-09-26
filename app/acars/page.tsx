import type { Metadata } from 'next'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import AcarsApp from '@/components/acars/AcarsApp'
import { siteUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'ACARS — Pusat Komando Intelijen',
  description:
    'Sentra ACARS (Automatic Clinical Alert and Reporting System) — logbook audit real-time, intelijen spasial, dan laporan performa produk Sentra Assist.',
  alternates: { canonical: siteUrl('/acars') },
  openGraph: {
    title: 'ACARS — Sentra Assist',
    description:
      'Pusat Komando Intelijen Sentra ACARS — jejak audit, intelijen spasial, laporan performa.',
    url: siteUrl('/acars'),
    type: 'website',
    images: [{ url: siteUrl('/og-image.png'), width: 1200, height: 630, alt: 'SENTRA ACARS' }],
  },
  twitter: {
    title: 'ACARS — Sentra Assist',
    description: 'Pusat Komando Intelijen Sentra ACARS.',
    images: [siteUrl('/og-image.png')],
  },
}

export default function AcarsPage() {
  return (
    <>
      <SiteHeader current="acars" />
      <main id="main">
        <AcarsApp />
      </main>
      <SiteFooter />
    </>
  )
}
