'use client'

import { motion } from 'motion/react'
import useReducedMotionSSR from '@/components/motion/useReducedMotionSSR'

const EASE = [0.22, 1, 0.36, 1] as const

// Deterministic "random" placement — sparse, uneven, architectural.
const V_LINES = [
  { left: '7%', drift: 30, duration: 26, delay: 0.1, opacity: 0.09 },
  { left: '22%', drift: -44, duration: 34, delay: 0.4, opacity: 0.06 },
  { left: '43%', drift: 24, duration: 22, delay: 0.2, opacity: 0.05 },
  { left: '68%', drift: -34, duration: 30, delay: 0.6, opacity: 0.08 },
  { left: '88%', drift: 40, duration: 38, delay: 0.3, opacity: 0.06 },
]

const H_LINES = [
  { top: '10%', drift: 36, duration: 30, delay: 0.5, opacity: 0.08 },
  { top: '37%', drift: -28, duration: 24, delay: 0.2, opacity: 0.05 },
  { top: '64%', drift: 42, duration: 36, delay: 0.7, opacity: 0.06 },
  { top: '89%', drift: -32, duration: 28, delay: 0.4, opacity: 0.05 },
]

export default function DashboardGridLines() {
  const reduce = useReducedMotionSSR()

  if (reduce) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {V_LINES.map((line) => (
          <div
            key={`v-${line.left}`}
            className="absolute top-0 bottom-0 w-px bg-ink"
            style={{ left: line.left, opacity: line.opacity }}
          />
        ))}
        {H_LINES.map((line) => (
          <div
            key={`h-${line.top}`}
            className="absolute left-0 right-0 h-px bg-ink"
            style={{ top: line.top, opacity: line.opacity }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {V_LINES.map((line) => (
        <motion.div
          key={`v-${line.left}`}
          className="absolute top-0 bottom-0 w-px bg-ink origin-top"
          style={{ left: line.left, opacity: line.opacity }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1, x: [0, line.drift, 0] }}
          transition={{
            scaleY: { duration: 1.8, ease: EASE, delay: line.delay },
            x: { duration: line.duration, ease: 'easeInOut', repeat: Infinity, delay: line.delay },
          }}
        />
      ))}
      {H_LINES.map((line) => (
        <motion.div
          key={`h-${line.top}`}
          className="absolute left-0 right-0 h-px bg-ink origin-left"
          style={{ top: line.top, opacity: line.opacity }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1, y: [0, line.drift, 0] }}
          transition={{
            scaleX: { duration: 1.8, ease: EASE, delay: line.delay },
            y: { duration: line.duration, ease: 'easeInOut', repeat: Infinity, delay: line.delay },
          }}
        />
      ))}
    </div>
  )
}
