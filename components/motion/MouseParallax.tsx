'use client'

import { motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect, type ReactNode } from 'react'
import useReducedMotionSSR from './useReducedMotionSSR'

type MouseParallaxProps = {
  children: ReactNode
  className?: string
  /** Max displacement in px at viewport edge. Negative inverts direction for depth layering. */
  strength?: number
}

export default function MouseParallax({ children, className, strength = 8 }: MouseParallaxProps) {
  const reduce = useReducedMotionSSR()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 60, damping: 22, mass: 0.9 })
  const sy = useSpring(y, { stiffness: 60, damping: 22, mass: 0.9 })

  useEffect(() => {
    if (reduce || typeof window === 'undefined') return
    if (!window.matchMedia('(pointer: fine)').matches) return

    function onPointerMove(e: globalThis.PointerEvent) {
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = (e.clientY / window.innerHeight) * 2 - 1
      x.set(nx * strength)
      y.set(ny * strength)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', onPointerMove)
  }, [reduce, strength, x, y])

  return (
    <motion.div className={className} style={{ x: sx, y: sy, willChange: 'transform' }}>
      {children}
    </motion.div>
  )
}
