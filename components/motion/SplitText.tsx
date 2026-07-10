'use client'

import { motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'
import { motionTags, type MotionTag } from './tags'
import useReducedMotionSSR from './useReducedMotionSSR'

type SplitTextProps = {
  as?: MotionTag
  text: string
  className?: string
  delay?: number
  stagger?: number
  trigger?: 'mount' | 'inview'
  direction?: 'up' | 'left'
  children?: ReactNode
}

const wordVariantsUp: Variants = {
  hidden: { opacity: 0, y: '0.3em' },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

const wordVariantsLeft: Variants = {
  hidden: { opacity: 0, x: '-1.2em' },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export default function SplitText({
  as = 'h1',
  text,
  className,
  delay = 0,
  stagger = 0.08,
  trigger = 'inview',
  direction = 'up',
  children,
}: SplitTextProps) {
  const reduce = useReducedMotionSSR()
  const Tag = motionTags[as]
  if (reduce) {
    return (
      <Tag className={className}>
        {text} {children}
      </Tag>
    )
  }
  const wordVariants = direction === 'left' ? wordVariantsLeft : wordVariantsUp
  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  }
  const animateProps =
    trigger === 'mount'
      ? { initial: 'hidden' as const, animate: 'visible' as const }
      : {
          initial: 'hidden' as const,
          whileInView: 'visible' as const,
          viewport: { once: true, margin: '0px 0px -40px 0px' },
        }
  const words = text.split(' ')
  return (
    <Tag className={className} variants={container} {...animateProps}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          variants={wordVariants}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {w}
          {i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
      {children}
    </Tag>
  )
}
