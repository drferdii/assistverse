'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import useReducedMotionSSR from './useReducedMotionSSR'

type ParallaxProps = {
  children: ReactNode
  className?: string
  speed?: number
}

export default function Parallax({ children, className, speed = 0.2 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotionSSR()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const range = speed * 40
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : range, reduce ? 0 : -range])
  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  )
}
