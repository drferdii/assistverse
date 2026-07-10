'use client'

import { useMotionValue, useSpring, useTransform, type Variants } from 'motion/react'
import type { PointerEvent, ReactNode } from 'react'
import { motionTags, type MotionTag } from './tags'
import useReducedMotionSSR from './useReducedMotionSSR'

const EASE = [0.16, 1, 0.3, 1] as const

type TiltCardProps = {
  as?: MotionTag
  children: ReactNode
  className?: string
  y?: number
  /** Max tilt in degrees. Kept small to preserve the flat, minimal surface language. */
  maxTilt?: number
}

/**
 * Drop-in replacement for StaggerItem (same entrance variants, works inside
 * a Stagger container) that adds a pointer-tracked 3D tilt and a soft depth
 * shadow on hover. Transform/box-shadow only, GPU-composited.
 */
export default function TiltCard({
  as = 'article',
  children,
  className,
  y = 12,
  maxTilt = 2.5,
}: TiltCardProps) {
  const reduce = useReducedMotionSSR()
  const Tag = motionTags[as]
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), {
    stiffness: 180,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), {
    stiffness: 180,
    damping: 20,
  })

  const variants: Variants = reduce
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
      }

  function onPointerMove(e: PointerEvent<HTMLElement>) {
    if (reduce || e.pointerType !== 'mouse') return
    const rect = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }

  function onPointerLeave() {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <Tag
      className={className}
      variants={variants}
      style={
        reduce
          ? undefined
          : { rotateX, rotateY, transformPerspective: 900, willChange: 'transform' }
      }
      whileHover={
        reduce ? undefined : { boxShadow: '0 18px 44px rgba(26, 26, 24, 0.09)', zIndex: 1 }
      }
      transition={{ boxShadow: { duration: 0.35, ease: 'easeOut' } }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </Tag>
  )
}
