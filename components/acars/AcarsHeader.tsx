'use client'

import Link from 'next/link'
import { siteUrl } from '@/lib/site'

type View = 'dashboard' | 'logbook' | 'report'

type Props = {
  view: View
  onView: (v: View) => void
}

export default function AcarsHeader({ view, onView }: Props) {
  return (
    <header className="sticky top-0 z-50 border-b border-ink bg-paper/90 backdrop-blur-md h-24 flex items-center px-[var(--gutter)]">
      <div className="max-w-[1440px] mx-auto w-full flex justify-between items-center">
        <div className="flex items-baseline gap-4">
          <span className="font-display font-bold text-3xl tracking-tighter uppercase">
            SENTRA ACARS
          </span>
          <span className="font-mono text-[10px] opacity-60 font-bold tracking-widest uppercase hidden sm:inline">
            Inti Protokol
          </span>
        </div>
        <div className="flex items-center gap-4 md:gap-10">
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center border border-ink px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:bg-ink hover:text-paper"
            >
              &larr; Sentra
            </Link>
            <button
              onClick={() => onView('report')}
              className={`inline-flex items-center justify-center border px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.22em] transition-all duration-300 ${
                view === 'report'
                  ? 'border-ink bg-ink text-paper'
                  : 'border-line text-ink-soft hover:border-ink hover:text-ink'
              }`}
            >
              Laporan Performa
            </button>
            <a
              href={siteUrl('/acars#spatial')}
              className="inline-flex items-center justify-center border border-line px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-ink-soft transition-all duration-300 hover:border-ink hover:text-ink"
            >
              Node Spasial
            </a>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-signal rounded-full animate-dot-pulse" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest">
              Sistem Normal
            </span>
            <span className="hidden lg:block opacity-20">|</span>
            <span className="hidden lg:block font-mono text-[11px] font-bold uppercase tracking-widest text-ink-soft">
              Node Kediri / Balowerti
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
