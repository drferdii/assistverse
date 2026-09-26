'use client'

import { motion, useMotionValue, useSpring } from 'motion/react'
import type { CSSProperties, PointerEvent, ReactNode } from 'react'
import useReducedMotionSSR from './useReducedMotionSSR'

type MagneticProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  strength?: number
}

export default function Magnetic({ children, className, style, strength = 8 }: MagneticProps) {
  const reduce = useReducedMotionSSR()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.5 })

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== 'mouse') return
    const rect = e.currentTarget.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    x.set((dx / (rect.width / 2)) * strength)
    y.set((dy / (rect.height / 2)) * strength)
  }

  function onPointerLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      className={className}
      style={{ display: 'inline-flex', willChange: 'transform', x: sx, y: sy, ...style }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </motion.div>
  )
}
