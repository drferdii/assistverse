import { motion } from 'motion/react'

export const motionTags = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  header: motion.header,
  footer: motion.footer,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
  ol: motion.ol,
  ul: motion.ul,
  li: motion.li,
} as const

export type MotionTag = keyof typeof motionTags
