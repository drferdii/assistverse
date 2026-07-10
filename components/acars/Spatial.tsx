import Reveal from '@/components/motion/Reveal'
import AcarsMap from './AcarsMap'
import type { User } from './data'

export default function Spatial({ users }: { users: User[] }) {
  return (
    <div className="py-32" id="spatial">
      <div className="flex justify-between items-end mb-20">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft block mb-6 font-bold">
            Intelijen Spasial
          </span>
          <h2 className="font-display text-[clamp(48px,6vw,96px)] leading-[0.85] tracking-tighter font-medium mb-8">
            Intelijensi <br />
            ACARS.
          </h2>
          <div className="font-mono text-sm uppercase tracking-[0.3em] font-bold text-ink-soft mb-12 border-b border-line pb-4 inline-block">
            Sistem Komunikasi & Koordinasi Klinis
          </div>
          <p className="max-w-[620px] text-xl text-ink-soft leading-relaxed">
            Sentra menggunakan protokol ACARS (Automated Clinical Alert and Routing System) sebagai
            jaringan komunikasi spasial antar-pengguna. Sistem ini secara mulus menjembatani
            pelaporan, triase, dan audit klinis antara dokter, perawat, bidan, dan tenaga medis
            lainnya di lapangan secara real-time.
          </p>
        </div>
      </div>
      <Reveal
        as="div"
        className="border border-ink/10 bg-paper-pure p-1 shadow-2xl relative group"
        y={24}
      >
        <div className="h-[650px] w-full bg-paper-pure/50 relative overflow-hidden rounded-sm border border-ink/5">
          <AcarsMap users={users} />
          <div className="absolute bottom-10 left-10 z-20 bg-paper/95 backdrop-blur-md p-8 border border-ink shadow-2xl">
            <div className="font-mono text-[10px] uppercase font-bold mb-6 border-b border-line pb-4 tracking-[0.3em]">
              Legenda Operasional
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 bg-ink rotate-45 border border-paper" />
                <span className="font-mono text-[10px] uppercase font-bold tracking-widest">
                  Pusat ACARS
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-ink" />
                <span className="font-mono text-[10px] uppercase font-bold tracking-widest">
                  Auditor Utama
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-ink-soft" />
                <span className="font-mono text-[10px] uppercase font-bold tracking-widest">
                  Staf Lapangan
                </span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  )
}
