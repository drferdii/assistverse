import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import SideRail from '@/components/SideRail'
import SplitText from '@/components/motion/SplitText'
import Reveal from '@/components/motion/Reveal'
import MaskWipe from '@/components/motion/MaskWipe'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import SubmitButton from '@/components/SubmitButton'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Hubungi Sentra Assist untuk pilot trial puskesmas, riset kolaboratif, atau partnership institusional. Kami menjawab dalam lima hari kerja.',
  alternates: { canonical: 'https://sentraassist.id/contact' },
  openGraph: {
    title: 'Contact — Sentra Assist',
    description: 'Pilot trial, riset, atau partnership untuk layanan primer Indonesia.',
    url: 'https://sentraassist.id/contact',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Contact Sentra Assist' }],
  },
  twitter: {
    title: 'Contact — Sentra Assist',
    description: 'Pilot trial, riset, atau partnership untuk layanan primer Indonesia.',
    images: ['/og-image.png'],
  },
}

const INTENTS = [
  { value: '', label: 'Pilih salah satu', disabled: true },
  { value: 'pilot', label: 'Pilot trial puskesmas / klinik' },
  { value: 'research', label: 'Riset kolaboratif' },
  { value: 'partnership', label: 'Partnership institusional' },
  { value: 'spec', label: 'Permintaan spesifikasi teknis' },
  { value: 'press', label: 'Press / media' },
  { value: 'other', label: 'Lainnya' },
]

export default function ContactPage() {
  return (
    <>
      <SiteHeader current="contact" />
      <main id="main">
        <article className="page">
          <SideRail />
          <Link href="/" className="back-link">
            &larr; Sentra
          </Link>
          <MaskWipe as="p" className="page-eyebrow" from="up" delay={0.08}>
            Contact
          </MaskWipe>
          <SplitText
            as="h1"
            className="page-title"
            text="Bicara dengan Sentra Assist."
            delay={0.2}
          />
          <Reveal as="p" className="lede-paragraph" delay={0.32}>
            Untuk pilot trial dengan puskesmas atau klinik pratama, kemitraan riset, atau diskusi
            arsitektur platform intelligence klinis &mdash; kami ingin mendengar dari Anda.
          </Reveal>

          <form
            className="contact-form"
            action="https://formspree.io/f/sentraassist-placeholder"
            method="POST"
            noValidate
          >
            <Stagger as="div" stagger={0.08}>
              <StaggerItem as="div" className="row">
                <label htmlFor="contact-name">Nama</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Nama lengkap Anda"
                />
              </StaggerItem>
              <StaggerItem as="div" className="row">
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="anda@instansi.go.id"
                />
              </StaggerItem>
              <StaggerItem as="div" className="row">
                <label htmlFor="contact-org">Instansi</label>
                <input
                  id="contact-org"
                  name="organization"
                  type="text"
                  autoComplete="organization"
                  placeholder="Puskesmas / klinik / fakultas / perusahaan"
                />
              </StaggerItem>
              <StaggerItem as="div" className="row">
                <label htmlFor="contact-intent">Tujuan</label>
                <select id="contact-intent" name="intent" required defaultValue="">
                  {INTENTS.map((opt) => (
                    <option
                      key={opt.value || 'placeholder'}
                      value={opt.value}
                      disabled={opt.disabled}
                    >
                      {opt.label}
                    </option>
                  ))}
                </select>
              </StaggerItem>
              <StaggerItem as="div" className="row">
                <label htmlFor="contact-message">Brief singkat</label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  placeholder="Satu paragraf cukup. Kami akan membalas dalam lima hari kerja."
                />
              </StaggerItem>
              <div className="honey" aria-hidden="true">
                <label htmlFor="contact-fax">Fax</label>
                <input id="contact-fax" name="fax" type="text" tabIndex={-1} autoComplete="off" />
              </div>
              <SubmitButton>Kirim brief</SubmitButton>
              <StaggerItem as="p" className="form-note">
                Atau tulis langsung ke{' '}
                <Link href="mailto:drferdiiskandar@sentrahai.com" className="emphasis">
                  drferdiiskandar@sentrahai.com
                </Link>
                . Kami menjawab semua brief yang qualified dalam lima hari kerja.
              </StaggerItem>
            </Stagger>
          </form>

          <MaskWipe as="div" from="left" duration={1.1} delay={0.1}>
            <hr className="thin" />
          </MaskWipe>

          <Stagger as="div" stagger={0.1}>
            <StaggerItem as="h2" className="page-section-title">
              Apa yang terjadi setelah Anda kirim
            </StaggerItem>
            <StaggerItem as="p" className="prose">
              Pembaca manusia akan membaca brief Anda dan memberikan balasan substantif &mdash; baik
              untuk menjadwalkan exploratory call, maupun untuk menjelaskan mengapa ini belum tentu
              kecocokan yang tepat, dan merujuk Anda ke pihak yang mungkin lebih sesuai.
            </StaggerItem>
            <StaggerItem as="p" className="prose">
              Jika Anda belum yakin apakah Sentra Assist tepat untuk masalah Anda, kirim saja. Kami
              pernah menjadi bukan-kecocokan untuk masalah dengan skala yang mengesankan &mdash;
              kami senang mengatakannya.
            </StaggerItem>
          </Stagger>
        </article>
      </main>
      <SiteFooter />
    </>
  )
}
