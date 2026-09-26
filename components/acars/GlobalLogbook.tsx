import Reveal from '@/components/motion/Reveal'
import { globalLogs } from './data'

export default function GlobalLogbook() {
  return (
    <section className="py-32 border-b border-line">
      <div className="flex justify-between items-end mb-20">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft block mb-4 font-bold">
            Pulse Audit Langsung
          </span>
          <h2 className="font-display text-5xl leading-[0.95] tracking-tight font-medium">
            Buku Audit Global.
          </h2>
        </div>
        <div className="hidden md:block">
          <div className="text-right opacity-20 font-display text-xl font-bold uppercase tracking-[0.4em]">
            PROTOKOL ACARS
          </div>
        </div>
      </div>
      <Reveal as="div" className="overflow-x-auto" y={24}>
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
            {globalLogs.map((log) => (
              <tr
                key={log.id}
                className="border-b border-line group hover:bg-paper-pure transition-colors"
              >
                <td className="py-10 font-mono text-xs text-ink-soft font-bold">{log.time}</td>
                <td className="py-10 font-mono text-xs font-bold">{log.id}</td>
                <td className="py-10 pr-12">
                  <div className="font-display font-medium text-xl mb-3 tracking-tight">
                    {log.event}
                  </div>
                  <span
                    className={`inline-block font-mono text-[9px] font-bold px-3 py-1.5 rounded-sm uppercase tracking-wider ${
                      log.status === 'TERVERIFIKASI'
                        ? 'bg-ink text-paper'
                        : 'border border-line text-ink-soft'
                    }`}
                  >
                    {log.status}
                  </span>
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
      </Reveal>
    </section>
  )
}
