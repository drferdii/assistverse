'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const rafRef = useRef(0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      const lenis = new Lenis({
        duration: 0.6,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
        infinite: false,
      })

      lenisRef.current = lenis
      document.documentElement.classList.add('lenis', 'lenis-smooth')

      function raf(time: number) {
        lenis.raf(time)
        rafRef.current = requestAnimationFrame(raf)
      }
      rafRef.current = requestAnimationFrame(raf)

      console.log('[SmoothScroll] ✅ Lenis initialized')
    } catch (e) {
      console.error('[SmoothScroll] ❌ init failed:', e)
    }

    return () => {
      cancelAnimationFrame(rafRef.current)
      if (lenisRef.current) {
        lenisRef.current.destroy()
        lenisRef.current = null
      }
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
    }
  }, [])

  return <>{children}</>
}
