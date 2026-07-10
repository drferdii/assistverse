'use client'

import Reveal from '@/components/motion/Reveal'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import type { Kpi } from '@/types/pilot'

interface Props {
  kpis: Kpi[]
}

export default function FlightSummaryBar({ kpis }: Props) {
  return (
    <section aria-label="Ringkasan encounter klinis" className="mt-[clamp(36px,4vw,56px)]">
      <Reveal as="div" x={-20} y={0}>
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">
          Ringkasan Performa
        </span>
      </Reveal>
      <Stagger
        stagger={0.12}
        className="mt-[clamp(16px,1.6vw,22px)] grid grid-cols-2 md:grid-cols-4 gap-px bg-line border border-line"
      >
        {kpis.map((kpi) => (
          <StaggerItem
            key={kpi.label}
            lift
            className="bg-paper p-8 hover:bg-paper-pure transition-colors duration-300"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">
              {kpi.label}
            </span>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-5xl font-medium tabular-nums leading-none">
                {kpi.value}
              </span>
            </div>
            {kpi.delta && (
              <span
                className={`font-mono text-[10px] uppercase tracking-[0.18em] mt-2 inline-block ${
                  kpi.positive ? 'text-ink' : 'text-signal'
                }`}
              >
                {kpi.delta}
              </span>
            )}
            {/* Sparkline */}
            <svg
              className="mt-3 w-full h-6"
              viewBox="0 0 100 24"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polyline fill="none" stroke="var(--ink)" strokeWidth="1.5" points={kpi.spark} />
            </svg>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}
