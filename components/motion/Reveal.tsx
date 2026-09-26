'use client'

import { motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'
import { motionTags, type MotionTag } from './tags'
import useReducedMotionSSR from './useReducedMotionSSR'

type RevealProps = {
  as?: MotionTag
  children: ReactNode
  className?: string
  id?: string
  x?: number
  y?: number
  delay?: number
  duration?: number
  once?: boolean
  /** Optional entrance scale (e.g. 0.96) for a cinematic settle. Defaults to no scaling. */
  scale?: number
}

export default function Reveal({
  as = 'div',
  children,
  className,
  id,
  x = 0,
  y = 16,
  delay = 0,
  duration = 0.7,
  once = true,
  scale,
}: RevealProps) {
  const reduce = useReducedMotionSSR()
  const Tag = motionTags[as]
  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: reduce ? 0 : x,
      y: reduce ? 0 : y,
      scale: reduce || scale === undefined ? 1 : scale,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration, delay, ease: [0.16, 1, 0.3, 1] },
    },
  }
  return (
    <Tag
      className={className}
      id={id}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '0px 0px -40px 0px' }}
    >
      {children}
    </Tag>
  )
}
