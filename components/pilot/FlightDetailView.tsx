'use client'

import type { Encounter } from '@/types/pilot'

interface Props {
  encounter: Encounter
  onBack: () => void
}

export default function FlightDetailView({ encounter, onBack }: Props) {
  return (
    <section className="py-[clamp(28px,4vw,56px)]">
      {/* Back button */}
      <button
        onClick={onBack}
        className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft
                   hover:text-signal transition-colors duration-[180ms] mb-8"
      >
        ← Kembali ke Logbook
      </button>

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">
            {encounter.id}
          </span>
          <h1 className="font-display text-[clamp(28px,3.4vw,42px)] font-medium tracking-[-0.02em] mt-2 max-w-[26ch] leading-tight">
            {encounter.description}
          </h1>
          <p className="font-display text-[15px] text-ink-soft mt-3">
            {encounter.date} · {encounter.time} · {encounter.practitioner}
          </p>
        </div>
        <span
          className={`font-mono text-[9px] font-bold px-4 py-2 rounded-sm uppercase whitespace-nowrap ${
            encounter.verified ? 'bg-ink text-paper' : 'border border-line text-ink-soft'
          }`}
        >
          {encounter.verified ? 'Terverifikasi' : 'Tertunda'}
        </span>
      </div>

      {/* Primary metrics */}
      <div className="mt-[clamp(28px,3.2vw,48px)] grid grid-cols-2 md:grid-cols-4 gap-px bg-line border border-line">
        <div className="bg-paper p-8">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">
            Keyakinan
          </span>
          <div className="mt-3 font-display text-4xl font-medium tabular-nums leading-none">
            {(encounter.confidence * 100).toFixed(1)}%
          </div>
        </div>
        <div className="bg-paper p-8">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">
            ICD-10
          </span>
          <div className="mt-3 font-display text-4xl font-medium leading-none">
            {encounter.icd10}
          </div>
        </div>
        <div className="bg-paper p-8">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">
            Agent
          </span>
          <div className="mt-3 font-mono text-lg">{encounter.agent}</div>
        </div>
        <div className="bg-paper p-8">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">
            Sumber
          </span>
          <div className="mt-3 font-mono text-lg">{encounter.source}</div>
        </div>
      </div>

      {/* Details grid */}
      <div className="mt-[clamp(28px,3.2vw,48px)] grid grid-cols-1 md:grid-cols-2 gap-px bg-line border border-line">
        <div className="bg-paper p-8">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft block mb-6">
            Detail Encounter
          </span>
          <dl className="space-y-4">
            <div className="flex justify-between border-b border-line pb-3">
              <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
                Tipe
              </dt>
              <dd className="font-mono text-[12px]">{encounter.encounterType}</dd>
            </div>
            <div className="flex justify-between border-b border-line pb-3">
              <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
                Petugas
              </dt>
              <dd className="font-mono text-[12px]">{encounter.practitioner}</dd>
            </div>
            <div className="flex justify-between border-b border-line pb-3">
              <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
                Peran
              </dt>
              <dd className="font-mono text-[12px]">{encounter.role}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
                Lokasi
              </dt>
              <dd className="font-mono text-[12px]">{encounter.location}</dd>
            </div>
          </dl>
        </div>

        <div className="bg-paper p-8">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft block mb-6">
            Integritas Data
          </span>
          <dl className="space-y-4">
            <div className="flex justify-between border-b border-line pb-3">
              <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
                Status
              </dt>
              <dd className="font-mono text-[12px]">
                {encounter.verified ? 'Terverifikasi' : 'Menunggu Review'}
              </dd>
            </div>
            {encounter.verifiedBy && (
              <div className="flex justify-between border-b border-line pb-3">
                <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
                  Diverifikasi oleh
                </dt>
                <dd className="font-mono text-[12px]">{encounter.verifiedBy}</dd>
              </div>
            )}
            <div className="flex justify-between border-b border-line pb-3">
              <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
                Sumber Data
              </dt>
              <dd className="font-mono text-[12px]">
                {encounter.source === 'Assist' ? 'Sentra Assist' : 'Sidelab TUI'}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
                Hash Audit
              </dt>
              <dd className="font-mono text-[10px] text-ink-soft truncate ml-4">
                sha256:
                {encounter.id
                  .replace(/[^0-9]/g, '')
                  .padEnd(8, '0')
                  .slice(0, 8)}
                ...
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Description */}
      <div className="mt-[clamp(28px,3.2vw,48px)] border border-line p-8 bg-paper">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft block mb-4">
          Catatan Klinis
        </span>
        <p className="font-display text-[15px] leading-relaxed max-w-[60ch]">
          {encounter.description}
        </p>
        {encounter.remarks && (
          <p className="font-display text-[14px] text-ink-soft leading-relaxed mt-4 max-w-[60ch]">
            {encounter.remarks}
          </p>
        )}
      </div>
    </section>
  )
}
