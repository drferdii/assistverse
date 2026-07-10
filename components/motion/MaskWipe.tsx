'use client'

import { motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'
import { motionTags, type MotionTag } from './tags'
import useReducedMotionSSR from './useReducedMotionSSR'

type Direction = 'up' | 'down' | 'left' | 'right'

const INSETS: Record<Direction, string> = {
  up: 'inset(0 0 100% 0)',
  down: 'inset(100% 0 0 0)',
  left: 'inset(0 100% 0 0)',
  right: 'inset(0 0 0 100%)',
}

type MaskWipeProps = {
  as?: MotionTag
  children: ReactNode
  className?: string
  from?: Direction
  delay?: number
  duration?: number
}

export default function MaskWipe({
  as = 'p',
  children,
  className,
  from = 'up',
  delay = 0,
  duration = 0.8,
}: MaskWipeProps) {
  const reduce = useReducedMotionSSR()
  const Tag = motionTags[as]
  const variants: Variants = {
    hidden: { clipPath: reduce ? 'inset(0% 0 0 0)' : INSETS[from], opacity: reduce ? 1 : 0.01 },
    visible: {
      clipPath: 'inset(0% 0 0 0)',
      opacity: 1,
      transition: { duration, delay, ease: [0.16, 1, 0.3, 1] },
    },
  }
  return (
    <Tag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -40px 0px' }}
    >
      {children}
    </Tag>
  )
}
