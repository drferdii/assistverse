'use client'

import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import type { User } from './data'

type Props = {
  users: User[]
  activeName?: string
  onSelect: (u: User) => void
}

export default function AuditRoster({ users, activeName, onSelect }: Props) {
  return (
    <div className="py-32 border-b border-line">
      <div className="flex justify-between items-end mb-16">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft block mb-4 font-bold">
            Personel Percontohan
          </span>
          <h2 className="font-display text-5xl leading-[0.95] tracking-tight font-medium">
            Daftar Audit.
          </h2>
        </div>
      </div>

      <Stagger
        as="div"
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 border-l border-t border-line"
        stagger={0.08}
      >
        {users.map((u) => {
          const isActive = activeName === u.name
          return (
            <StaggerItem key={u.name} as="div">
              <button
                onClick={() => onSelect(u)}
                className={`relative group w-full text-left p-8 cursor-pointer border-r border-b border-line overflow-hidden transition-all duration-500 ${
                  isActive ? 'bg-paper-pure' : 'bg-paper hover:bg-paper-pure'
                }`}
              >
                <span
                  className="absolute top-0 left-0 bottom-0 w-[3px] bg-ink transition-transform duration-700 origin-bottom scale-y-0 group-hover:scale-y-100"
                  style={isActive ? { transform: 'scaleY(1)' } : undefined}
                />
                <div className="relative mb-6 pb-6">
                  <div className="font-display text-xl font-medium leading-tight tracking-tight whitespace-nowrap truncate">
                    {u.name}
                  </div>
                  {u.degree ? (
                    <div className="font-display text-sm font-medium text-ink-soft/80 mb-2 leading-none">
                      {u.degree}
                    </div>
                  ) : (
                    <div className="h-2 mb-2" />
                  )}
                  <div className="font-mono text-[11px] text-ink-soft uppercase tracking-widest font-bold">
                    {u.role}
                  </div>
                  <span
                    className="absolute bottom-0 left-0 h-[1px] bg-ink transition-all duration-500 w-10 group-hover:w-full"
                    style={isActive ? { width: '100%' } : undefined}
                  />
                </div>
                <div className="mt-20">
                  <div className="font-display text-5xl font-medium mb-1 tabular-nums">
                    {u.stats.total}
                  </div>
                  <div className="font-mono text-[10px] text-ink-soft uppercase tracking-tighter font-bold">
                    Laporan Terverifikasi
                  </div>
                  <div className="flex gap-6 mt-6 pt-4 border-t border-line">
                    <div>
                      <div className="font-mono font-bold text-lg tabular-nums">
                        {u.stats.assist}
                      </div>
                      <div className="font-mono text-[9px] text-ink-soft uppercase font-bold">
                        Assist
                      </div>
                    </div>
                    <div>
                      <div className="font-mono font-bold text-lg tabular-nums">
                        {u.stats.sideab}
                      </div>
                      <div className="font-mono text-[9px] text-ink-soft uppercase font-bold">
                        Sideab
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </StaggerItem>
          )
        })}
        <div className="hidden md:flex p-8 border-r border-b border-line bg-paper-pure/50 items-center justify-center overflow-hidden relative">
          <div
            className="absolute inset-0 flex items-center justify-center opacity-10 font-display text-2xl font-bold uppercase tracking-[0.4em]"
            style={{ writingMode: 'vertical-rl' }}
          >
            SENTRA KERANGKA KERJA
          </div>
        </div>
      </Stagger>
    </div>
  )
}
