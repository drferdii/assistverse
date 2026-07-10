import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { transparencyStats } from './data'

export default function Transparency() {
  return (
    <div className="py-32 border-b border-line">
      <h2 className="font-display text-[clamp(32px,5vw,64px)] leading-[1] tracking-tight font-medium mb-8">
        Transparansi dari presisi.
      </h2>
      <p className="max-w-[620px] text-xl text-ink-soft leading-relaxed mb-16">
        Logbook ini menyediakan jejak audit yang komprehensif dan real-time dari seluruh
        interpretasi klinis yang diorkestrasi oleh Sentra ACARS. Dapat diakses oleh publik,
        diverifikasi oleh klinisi.
      </p>

      <Stagger
        as="div"
        className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line border border-line"
        stagger={0.1}
      >
        {transparencyStats.map((s) => (
          <StaggerItem
            key={s.label}
            as="div"
            className="bg-paper p-10 hover:bg-paper-pure transition-colors"
          >
            <div className="font-display text-5xl font-medium mb-3 tabular-nums">{s.val}</div>
            <div className="font-mono text-[10px] text-ink-soft uppercase tracking-[0.2em] font-bold">
              {s.label}
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  )
}
