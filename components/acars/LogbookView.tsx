'use client'

import { userLogs } from './data'
import type { User } from './data'

export default function LogbookView({ user, onBack }: { user: User; onBack: () => void }) {
  return (
    <div className="py-24">
      <button
        onClick={onBack}
        className="flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-widest mb-16 hover:opacity-60 transition-opacity"
      >
        <span>&larr;</span> Kembali ke Dashboard
      </button>

      <div className="flex justify-between items-end mb-16">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft block mb-4 font-bold">
            Buku Audit / {user.role}
          </span>
          <h1 className="font-display text-[clamp(40px,6vw,80px)] leading-[0.95] tracking-tight font-medium">
            {user.name} <br />
            <span className="text-ink-soft/40">{user.degree || '\u00A0'}</span>
          </h1>
        </div>
        <div className="text-right hidden md:block">
          <div className="font-mono text-[11px] font-bold text-ink-soft uppercase tracking-widest mb-2">
            Status Sinkronisasi
          </div>
          <div className="flex items-center gap-2 justify-end">
            <div className="w-2 h-2 bg-signal rounded-full animate-dot-pulse" />
            <span className="font-mono text-[11px] font-bold">NORMAL</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto mb-24">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-ink">
              <th className="text-left font-mono text-[11px] uppercase text-ink-soft py-8 font-bold tracking-widest">
                Waktu
              </th>
              <th className="text-left font-mono text-[11px] uppercase text-ink-soft py-8 font-bold tracking-widest">
                ID Permintaan
              </th>
              <th className="text-left font-mono text-[11px] uppercase text-ink-soft py-8 font-bold tracking-widest">
                Interpretasi / Peristiwa
              </th>
              <th className="text-left font-mono text-[11px] uppercase text-ink-soft py-8 font-bold tracking-widest">
                Agent
              </th>
              <th className="text-right font-mono text-[11px] uppercase text-ink-soft py-8 font-bold tracking-widest">
                Konf.
              </th>
            </tr>
          </thead>
          <tbody>
            {userLogs.map((log) => (
              <tr
                key={log.id}
                className="border-b border-line group hover:bg-paper-pure transition-colors"
              >
                <td className="py-10 font-mono text-xs text-ink-soft font-bold">{log.time}</td>
                <td className="py-10 font-mono text-xs font-bold">{log.id}</td>
                <td className="py-10 pr-12">
                  <div className="font-display font-medium text-xl tracking-tight leading-snug mb-3">
                    {log.event}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {log.status && (
                      <span className="bg-ink text-paper font-mono text-[9px] font-bold px-3 py-1 rounded-sm uppercase tracking-wider">
                        {log.status}
                      </span>
                    )}
                    {log.location && (
                      <span className="border border-line font-mono text-[9px] font-bold px-3 py-1 rounded-sm uppercase tracking-wider text-ink-soft">
                        {log.location}
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-10 font-mono text-[10px] font-bold uppercase tracking-widest">
                  {log.agent}
                </td>
                <td className="py-10 font-mono text-xs font-bold text-right tabular-nums">
                  {log.confidence}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="bg-ink text-paper p-16 relative overflow-hidden">
        <div
          className="absolute top-0 right-0 p-12 opacity-10 font-display text-[60px] font-bold uppercase tracking-[0.4em] pointer-events-none"
          style={{ writingMode: 'vertical-rl', transform: 'translateY(64px)' }}
        >
          SENTRA ACARS
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center relative">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-signal block mb-6 font-bold">
              Integritas Data
            </span>
            <h2 className="font-display text-5xl font-medium mb-8 leading-tight tracking-tight">
              Terbuka untuk ditinjau. Aman untuk privasi.
            </h2>
            <p className="text-paper/60 text-xl leading-relaxed max-w-[48ch]">
              Seluruh data medis dianonimisasi sebelum masuk ke logbook. Kami menggunakan enkripsi
              end-to-end untuk proses verifikasi, memastikan transparansi tidak pernah mengorbankan
              kerahasiaan pasien.
            </p>
          </div>
          <div className="flex flex-col gap-6 max-w-sm md:ml-auto w-full">
            <button className="bg-paper text-ink font-mono text-[11px] font-bold px-10 py-6 uppercase tracking-widest hover:bg-signal hover:text-paper transition-all duration-300">
              Ajukan Akses Audit Penuh
            </button>
            <button className="bg-transparent text-paper border border-paper/40 font-mono text-[11px] font-bold px-10 py-6 uppercase tracking-widest hover:border-paper transition-all">
              Unduh Laporan Privasi
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
