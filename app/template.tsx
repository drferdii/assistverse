'use client'

import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import useReducedMotionSSR from '@/components/motion/useReducedMotionSSR'

export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotionSSR()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
