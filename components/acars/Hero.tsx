import Link from 'next/link'
import SplitText from '@/components/motion/SplitText'
import Reveal from '@/components/motion/Reveal'
import CountUp from '@/components/motion/CountUp'
import Magnetic from '@/components/motion/Magnetic'

export default function Hero() {
  return (
    <section className="pt-32 pb-48 border-b border-ink relative overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-end gap-12 relative z-10">
        <div className="max-w-[800px]">
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase font-bold text-ink-soft mb-16 border-b border-ink inline-block pb-4">
            Automated Clinical Alert & Routing System
          </div>
          <h1 className="font-display text-[clamp(48px,8vw,120px)] leading-[0.85] tracking-tighter font-medium mb-12">
            <SplitText
              as="span"
              className="block"
              text="Sentra"
              trigger="inview"
              delay={0.1}
              stagger={0.08}
            />
            <SplitText
              as="span"
              className="block"
              text="ACARS."
              trigger="inview"
              delay={0.24}
              stagger={0.08}
            />
          </h1>
          <Reveal
            as="p"
            className="text-2xl text-ink-soft leading-relaxed max-w-[32ch]"
            delay={0.4}
          >
            Bukan sekadar dasbor pelaporan. ACARS adalah radar klinis yang mendeteksi anomali
            diagnosis dan mengamankan keputusan puskesmas secara real-time.
          </Reveal>

          <Reveal
            as="div"
            className="mt-8 flex gap-12 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft"
            delay={0.45}
          >
            <div>
              <CountUp
                value={4000}
                suffix="+"
                className="block text-4xl font-display text-ink mb-1 font-medium"
              />
              Ghost Trial Kasus Anonim
            </div>
            <div>
              <CountUp
                value={96}
                suffix="%"
                className="block text-4xl font-display text-ink mb-1 font-medium"
              />
              Akurasi Diagnosis
            </div>
          </Reveal>

          <Reveal as="div" className="mt-12 flex flex-wrap gap-4" delay={0.5}>
            <Magnetic strength={6}>
              <Link
                href="/"
                className="inline-flex items-center justify-center border border-ink bg-ink px-6 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-paper transition-all duration-300 hover:bg-transparent hover:text-ink"
              >
                Buka Landing Sentra
              </Link>
            </Magnetic>
            <Magnetic strength={6}>
              <Link
                href="#spatial"
                className="inline-flex items-center justify-center border border-line px-6 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-ink transition-all duration-300 hover:border-ink hover:bg-paper-pure"
              >
                Lihat Node Spasial
              </Link>
            </Magnetic>
          </Reveal>
        </div>
        <div className="text-right hidden md:block">
          <div
            className="opacity-10 font-display text-[80px] font-bold uppercase tracking-[0.4em] -translate-y-12"
            style={{ writingMode: 'vertical-rl' }}
          >
            SENTRA
          </div>
        </div>
      </div>
    </section>
  )
}
