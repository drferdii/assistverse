'use client'

import Reveal from '@/components/motion/Reveal'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'

interface CertificationItem {
  label: string
  expiry: string
  daysRemaining: number
}

interface Props {
  items: CertificationItem[]
}

function getUrgencyClass(days: number): string {
  if (days <= 7) return 'text-signal'
  if (days <= 30) return 'text-[#C98A1A]'
  if (days <= 90) return 'text-[#C98A1A]/80'
  return 'text-ink'
}

function getBarClass(days: number): string {
  if (days <= 7) return 'bg-signal'
  if (days <= 30) return 'bg-[#C98A1A]'
  if (days <= 90) return 'bg-[#C98A1A]/60'
  return 'bg-ink'
}

export default function CurrencyTracker({ items }: Props) {
  return (
    <section aria-label="Sertifikasi klinis" className="mt-[clamp(28px,3.2vw,48px)]">
      <Reveal
        as="span"
        x={-20}
        y={0}
        className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft block"
      >
        Sertifikasi
      </Reveal>
      <Reveal
        as="h2"
        x={-20}
        y={0}
        delay={0.08}
        className="font-display text-[clamp(20px,1.6vw,26px)] font-medium tracking-[-0.005em] mt-2 mb-[clamp(16px,1.6vw,22px)]"
      >
        STR, SIP & Sertifikat Kompetensi
      </Reveal>
      <Stagger
        stagger={0.12}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line"
      >
        {items.map((item) => (
          <StaggerItem
            key={item.label}
            lift
            className="bg-paper p-8 hover:bg-paper-pure transition-colors duration-300"
          >
            <div className="flex items-start justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em]">
                {item.label}
              </span>
              <span
                className={`font-mono text-[9px] font-bold px-3 py-1.5 rounded-sm uppercase ${
                  item.daysRemaining <= 30 ? 'bg-signal/10 text-signal' : 'bg-ink/5 text-ink-soft'
                }`}
              >
                {item.daysRemaining <= 30 ? 'Perhatian' : 'Aktif'}
              </span>
            </div>
            <div className="mt-4 flex items-baseline gap-3">
              <span
                className={`font-display text-4xl font-medium tabular-nums leading-none ${getUrgencyClass(item.daysRemaining)}`}
              >
                {item.daysRemaining}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
                hari
              </span>
            </div>
            {/* Progress bar */}
            <div className="mt-4 h-1 bg-line rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${getBarClass(item.daysRemaining)}`}
                style={{ width: `${Math.min(100, (item.daysRemaining / 365) * 100)}%` }}
              />
            </div>
            <span className="font-mono text-[10px] text-ink-soft mt-3 block">
              Berlaku hingga {item.expiry}
            </span>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}
