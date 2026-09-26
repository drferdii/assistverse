'use client'

import { motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'
import { motionTags, type MotionTag } from './tags'
import useReducedMotionSSR from './useReducedMotionSSR'

const EASE = [0.16, 1, 0.3, 1] as const

type StaggerProps = {
  as?: MotionTag
  children: ReactNode
  className?: string
  stagger?: number
  delay?: number
  trigger?: 'mount' | 'inview'
}

export function Stagger({
  as = 'div',
  children,
  className,
  stagger = 0.08,
  delay = 0,
  trigger = 'inview',
}: StaggerProps) {
  const reduce = useReducedMotionSSR()
  const Tag = motionTags[as]
  const variants: Variants = reduce
    ? { hidden: {}, visible: {} }
    : { hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }
  const animateProps =
    trigger === 'mount'
      ? { initial: 'hidden' as const, animate: 'visible' as const }
      : {
          initial: 'hidden' as const,
          whileInView: 'visible' as const,
          viewport: { once: true, margin: '0px 0px -40px 0px' },
        }
  return (
    <Tag className={className} variants={variants} {...animateProps}>
      {children}
    </Tag>
  )
}

type StaggerItemProps = {
  as?: MotionTag
  children: ReactNode
  className?: string
  x?: number
  y?: number
  /** Gentle hover lift (translateY(-2px), 200ms). Disabled under reduced motion. */
  lift?: boolean
}

export function StaggerItem({
  as = 'div',
  children,
  className,
  x = 0,
  y = 12,
  lift = false,
}: StaggerItemProps) {
  const reduce = useReducedMotionSSR()
  const Tag = motionTags[as]
  const variants: Variants = reduce
    ? { hidden: { opacity: 1, x: 0, y: 0 }, visible: { opacity: 1, x: 0, y: 0 } }
    : {
        hidden: { opacity: 0, x, y },
        visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.6, ease: EASE } },
      }
  const hoverProps =
    lift && !reduce
      ? { whileHover: { y: -2, transition: { duration: 0.2, ease: 'easeOut' as const } } }
      : {}
  return (
    <Tag className={className} variants={variants} {...hoverProps}>
      {children}
    </Tag>
  )
}
