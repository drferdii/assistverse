'use client'
import { motion } from 'motion/react'

export default function HeroStructuralGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {/* 
        These lines are positioned to align with the text block.
        The animation creates a drawing effect, and by placing this in a Parallax 
        with a different speed than the text, they will drift asymmetrically.
      */}

      {/* Left bounding line (matches typical text padding) */}
      <motion.div
        className="absolute top-[-20vh] bottom-[-20vh] left-[24px] w-[1px] bg-black/10 origin-top"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      />

      {/* Top horizontal line (above the text) */}
      <motion.div
        className="absolute left-[-10vw] right-[-10vw] top-[30px] h-[1px] bg-black/10 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      />

      {/* Baseline horizontal line (under the first text block) */}
      <motion.div
        className="absolute left-[-10vw] right-[-10vw] top-[140px] h-[1px] bg-black/10 origin-right"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
      />

      {/* Crossing architectural line (far right edge for asymmetry) */}
      <motion.div
        className="absolute top-[-20vh] bottom-[-20vh] right-[clamp(16px,5vw,80px)] w-[1px] bg-black/[0.05] origin-top"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
      />
    </div>
  )
}
