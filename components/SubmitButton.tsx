'use client'

import { motion, useMotionValue, useSpring } from 'motion/react'
import type { CSSProperties, PointerEvent } from 'react'
import useReducedMotionSSR from '@/components/motion/useReducedMotionSSR'

const MAGNET_STRENGTH = 6

export default function SubmitButton({
  children,
  style,
}: {
  children: React.ReactNode
  style?: CSSProperties
}) {
  const reduce = useReducedMotionSSR()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.5 })

  function onPointerMove(e: PointerEvent<HTMLButtonElement>) {
    if (reduce || e.pointerType !== 'mouse') return
    const rect = e.currentTarget.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    x.set((dx / (rect.width / 2)) * MAGNET_STRENGTH)
    y.set((dy / (rect.height / 2)) * MAGNET_STRENGTH)
  }

  function onPointerLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      type="submit"
      style={{ ...style, x: sx, y: sy }}
      whileHover={{ backgroundColor: 'var(--signal-deep)', borderColor: 'var(--signal-deep)' }}
      whileTap={{ scale: 0.98 }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </motion.button>
  )
}
