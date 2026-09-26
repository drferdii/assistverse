'use client'

import { animate, useInView } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import useReducedMotionSSR from './useReducedMotionSSR'

type CountUpProps = {
  value: number
  className?: string
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  /** Locale used for thousands separators. Defaults to Indonesian formatting. */
  locale?: string
}

export default function CountUp({
  value,
  className,
  duration = 1.6,
  decimals = 0,
  prefix = '',
  suffix = '',
  locale = 'id-ID',
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })
  const reduce = useReducedMotionSSR()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setDisplay(value)
      return
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    })
    return () => controls.stop()
  }, [inView, reduce, value, duration])

  const formatted = display.toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
