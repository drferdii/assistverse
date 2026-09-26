import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { siteUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: '404 — Halaman tidak ditemukan',
  description: 'Halaman yang Anda cari tidak ditemukan di Sentra Assist.',
  alternates: { canonical: siteUrl('/404') },
  robots: { index: false, follow: true },
  openGraph: {
    title: '404 — Sentra Assist',
    description: 'Halaman yang Anda cari tidak ditemukan.',
    url: siteUrl('/404'),
    type: 'website',
    images: [{ url: siteUrl('/og-image.png'), width: 1200, height: 630, alt: '404 Sentra Assist' }],
  },
  twitter: {
    title: '404 — Sentra Assist',
    description: 'Halaman yang Anda cari tidak ditemukan.',
    images: [siteUrl('/og-image.png')],
  },
}

export default function NotFound() {
  return (
    <>
      <SiteHeader dark />
      <main id="main">
        <section className="error-page">
          <Stagger as="div" stagger={0.12} trigger="mount">
            <StaggerItem as="span" className="page-eyebrow">
              Error / 404
            </StaggerItem>
            <StaggerItem as="h1" className="err-code">
              404
            </StaggerItem>
            <StaggerItem as="p" className="err-tagline">
              Halaman ini tidak ditemukan.
            </StaggerItem>
            <StaggerItem as="p" className="err-line">
              Tautan mungkin rusak, atau halaman mungkin telah dipindahkan saat kami menata ulang
              situs. Jika Anda tiba di sini dari bookmark, URL mungkin sudah berubah.
            </StaggerItem>
            <StaggerItem as="span">
              <Link className="err-cta" href="/">
                &larr; Kembali ke Sentra
              </Link>
            </StaggerItem>
          </Stagger>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
