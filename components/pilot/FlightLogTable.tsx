'use client'

import { useMemo } from 'react'
import Reveal from '@/components/motion/Reveal'
import type { Encounter, TableState, TableAction, TableSortKey } from '@/types/pilot'

interface Props {
  encounters: Encounter[]
  state: TableState
  dispatch: React.Dispatch<TableAction>
  onSelect: (encounter: Encounter) => void
}

const COLUMNS: { key: TableSortKey; label: string }[] = [
  { key: 'date', label: 'Tanggal' },
  { key: 'practitioner', label: 'Petugas' },
  { key: 'encounterType', label: 'Tipe' },
  { key: 'location', label: 'Lokasi' },
]

export default function FlightLogTable({ encounters, state, dispatch, onSelect }: Props) {
  const sorted = useMemo(() => {
    const filtered = state.filter
      ? encounters.filter(
          (e) =>
            e.practitioner.toLowerCase().includes(state.filter.toLowerCase()) ||
            e.encounterType.toLowerCase().includes(state.filter.toLowerCase()) ||
            e.location.toLowerCase().includes(state.filter.toLowerCase()) ||
            e.agent.toLowerCase().includes(state.filter.toLowerCase()) ||
            e.icd10.toLowerCase().includes(state.filter.toLowerCase()) ||
            e.id.toLowerCase().includes(state.filter.toLowerCase())
        )
      : encounters

    return [...filtered].sort((a, b) => {
      const dir = state.sortDir === 'asc' ? 1 : -1
      const va = a[state.sortKey]
      const vb = b[state.sortKey]
      if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * dir
      return String(va).localeCompare(String(vb)) * dir
    })
  }, [encounters, state.sortKey, state.sortDir, state.filter])

  const paged = sorted.slice(state.page * state.pageSize, (state.page + 1) * state.pageSize)
  const totalPages = Math.ceil(sorted.length / state.pageSize)

  return (
    <section aria-label="Logbook encounter klinis" className="mt-[clamp(28px,3.2vw,48px)]">
      {/* Section header */}
      <Reveal
        as="div"
        x={-20}
        y={0}
        className="flex items-baseline justify-between mb-[clamp(16px,1.6vw,22px)]"
      >
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft block">
            Logbook
          </span>
          <h2 className="font-display text-[clamp(20px,1.6vw,26px)] font-medium tracking-[-0.005em] mt-2">
            Rekaman Encounter Klinis
          </h2>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-soft">
          {sorted.length} rekaman
        </span>
      </Reveal>

      <Reveal as="div" y={12} delay={0.1} className="border border-line">
        {/* Filter bar */}
        <div className="border-b border-line px-8 py-4 flex items-center gap-4">
          <input
            type="text"
            placeholder="Cari petugas, tipe, lokasi, ICD-10..."
            value={state.filter}
            onChange={(e) => dispatch({ type: 'FILTER', value: e.target.value })}
            className="font-display text-[15px] bg-transparent border border-line px-4 py-2
                       focus:border-signal outline-none w-72 transition-colors duration-[180ms]"
          />
          {state.filter && (
            <button
              onClick={() => dispatch({ type: 'RESET' })}
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-soft
                         hover:text-signal transition-colors duration-[180ms]"
            >
              Hapus
            </button>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b-2 border-ink">
                <th
                  scope="col"
                  className="font-mono text-[11px] uppercase tracking-widest py-8 px-6 text-left"
                >
                  Waktu
                </th>
                {COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    scope="col"
                    aria-sort={
                      state.sortKey === col.key
                        ? state.sortDir === 'asc'
                          ? 'ascending'
                          : 'descending'
                        : 'none'
                    }
                    onClick={() => dispatch({ type: 'SORT', key: col.key })}
                    className="font-mono text-[11px] uppercase tracking-widest py-8 px-6
                               text-left cursor-pointer hover:text-signal transition-colors duration-[180ms]"
                  >
                    {col.label}
                    {state.sortKey === col.key && (
                      <span className="ml-1">{state.sortDir === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                ))}
                <th
                  scope="col"
                  className="font-mono text-[11px] uppercase tracking-widest py-8 px-6 text-left"
                >
                  Agent
                </th>
                <th
                  scope="col"
                  className="font-mono text-[11px] uppercase tracking-widest py-8 px-6 text-left"
                >
                  ICD-10
                </th>
                <th
                  scope="col"
                  className="font-mono text-[11px] uppercase tracking-widest py-8 px-6 text-right"
                >
                  Keyakinan
                </th>
                <th
                  scope="col"
                  className="font-mono text-[11px] uppercase tracking-widest py-8 px-6 text-right"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-16 px-6 text-center">
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">
                      Tidak ada rekaman yang cocok
                    </span>
                  </td>
                </tr>
              ) : (
                paged.map((enc) => (
                  <tr
                    key={enc.id}
                    onClick={() => onSelect(enc)}
                    className="border-b border-line hover:bg-paper-pure cursor-pointer transition-colors duration-[180ms] animate-fade-in motion-reduce:animate-none"
                  >
                    <td className="py-10 px-6 font-mono text-[11px] text-ink-soft whitespace-nowrap">
                      {enc.time}
                    </td>
                    <td className="py-10 px-6 font-mono text-[12px]">{enc.date}</td>
                    <td className="py-10 px-6">
                      <span className="font-display text-[13px]">{enc.practitioner}</span>
                      <span className="font-mono text-[10px] text-ink-soft block mt-0.5">
                        {enc.role}
                      </span>
                    </td>
                    <td className="py-10 px-6 font-mono text-[11px] uppercase tracking-[0.08em]">
                      {enc.encounterType}
                    </td>
                    <td className="py-10 px-6 font-display text-[13px]">{enc.location}</td>
                    <td className="py-10 px-6 font-mono text-[11px]">{enc.agent}</td>
                    <td className="py-10 px-6 font-mono text-[12px] font-medium">{enc.icd10}</td>
                    <td className="py-10 px-6 text-right font-mono text-[12px] tabular-nums">
                      {(enc.confidence * 100).toFixed(1)}%
                    </td>
                    <td className="py-10 px-6 text-right">
                      <span
                        className={`font-mono text-[9px] font-bold px-3 py-1.5 rounded-sm uppercase inline-block ${
                          enc.verified ? 'bg-ink text-paper' : 'border border-line text-ink-soft'
                        }`}
                      >
                        {enc.verified ? 'Terverifikasi' : 'Tertunda'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-8 py-4 border-t border-line">
            <button
              onClick={() => dispatch({ type: 'PAGE', page: state.page - 1 })}
              disabled={state.page === 0}
              className="font-mono text-[11px] uppercase tracking-[0.22em] px-4 py-2
                         border border-line hover:border-ink disabled:opacity-30
                         transition-colors duration-[180ms]"
            >
              Sebelumnya
            </button>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-soft">
              Halaman {state.page + 1} dari {totalPages}
            </span>
            <button
              onClick={() => dispatch({ type: 'PAGE', page: state.page + 1 })}
              disabled={state.page >= totalPages - 1}
              className="font-mono text-[11px] uppercase tracking-[0.22em] px-4 py-2
                         border border-line hover:border-ink disabled:opacity-30
                         transition-colors duration-[180ms]"
            >
              Berikutnya
            </button>
          </div>
        )}
      </Reveal>
    </section>
  )
}
