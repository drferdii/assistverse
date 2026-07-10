'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import type { ClinicalCase, TerminalBlock } from './cases'

type TypewriterState = 'idle' | 'typing' | 'case-done' | 'fading'

interface UseTypewriterOptions {
  cases: ClinicalCase[]
  baseSpeed?: number
  loopDelay?: number
  pauseOnHidden?: boolean
}

interface UseTypewriterReturn {
  visibleBlocks: { block: TerminalBlock; text: string; isCurrent: boolean }[]
  currentCaseIndex: number
  isFading: boolean
  cursorVisible: boolean
  containerRef: React.RefObject<HTMLDivElement | null>
}

function getCharDelay(char: string, baseSpeed: number): number {
  if (char === '.' || char === '…' || char === '!' || char === '?') {
    return baseSpeed * 5
  }
  if (char === ',' || char === ';' || char === ':') {
    return baseSpeed * 2.5
  }
  if (char === ' ') {
    return baseSpeed * 0.6
  }
  // Natural jitter: 0.6x to 1.4x base speed
  return baseSpeed * (0.6 + Math.random() * 0.8)
}

export function useTypewriter({
  cases,
  baseSpeed = 22,
  loopDelay = 3000,
  pauseOnHidden = true,
}: UseTypewriterOptions): UseTypewriterReturn {
  const [state, setState] = useState<TypewriterState>('idle')
  const [caseIndex, setCaseIndex] = useState(0)
  const [blockIndex, setBlockIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [visibleBlocks, setVisibleBlocks] = useState<
    { block: TerminalBlock; text: string; isCurrent: boolean }[]
  >([])
  const [isFading, setIsFading] = useState(false)
  const [cursorVisible, setCursorVisible] = useState(true)
  const [isVisible, setIsVisible] = useState(true)
  const [reduceMotion, setReduceMotion] = useState(false)

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Check reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // IntersectionObserver for pause/resume
  useEffect(() => {
    if (!pauseOnHidden || !containerRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [pauseOnHidden])

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  const currentCase = cases[caseIndex]
  const currentBlock = currentCase?.blocks[blockIndex]

  // Clear timer helper
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  // Start typing a new case
  const startCase = useCallback(() => {
    setVisibleBlocks([])
    setBlockIndex(0)
    setCharIndex(0)
    setIsFading(false)
    setState('typing')
  }, [])

  // Handle typing logic
  useEffect(() => {
    if (reduceMotion) {
      // Show all blocks immediately
      const allBlocks = currentCase.blocks.map((block) => ({
        block,
        text: block.text,
        isCurrent: false,
      }))
      setVisibleBlocks(allBlocks)
      setState('case-done')
      return
    }

    if (state !== 'typing' || !isVisible) return

    if (!currentBlock) {
      // All blocks in case done
      setState('case-done')
      return
    }

    const fullText = currentBlock.text

    if (charIndex >= fullText.length) {
      // Block complete, move to next
      setVisibleBlocks((prev) => {
        const updated = [...prev]
        if (updated[blockIndex]) {
          updated[blockIndex] = { ...updated[blockIndex], isCurrent: false }
        }
        return updated
      })

      const nextBlockIdx = blockIndex + 1
      if (nextBlockIdx < currentCase.blocks.length) {
        clearTimer()
        timerRef.current = setTimeout(() => {
          setBlockIndex(nextBlockIdx)
          setCharIndex(0)
        }, 180)
      } else {
        setState('case-done')
      }
      return
    }

    // Type next character
    const char = fullText[charIndex]
    const delay = getCharDelay(char, baseSpeed)

    clearTimer()
    timerRef.current = setTimeout(() => {
      setCharIndex((prev) => prev + 1)
      setVisibleBlocks((prev) => {
        const updated = [...prev]
        if (updated[blockIndex]) {
          updated[blockIndex] = {
            ...updated[blockIndex],
            text: fullText.slice(0, charIndex + 1),
            isCurrent: true,
          }
        } else {
          updated.push({
            block: currentBlock,
            text: fullText.slice(0, charIndex + 1),
            isCurrent: true,
          })
        }
        return updated
      })
    }, delay)

    return () => clearTimer()
  }, [
    state,
    charIndex,
    blockIndex,
    currentBlock,
    currentCase,
    isVisible,
    baseSpeed,
    reduceMotion,
    clearTimer,
  ])

  // Handle case-done → fade → next case
  useEffect(() => {
    if (state !== 'case-done') return

    clearTimer()
    timerRef.current = setTimeout(() => {
      setIsFading(true)

      clearTimer()
      timerRef.current = setTimeout(() => {
        setCaseIndex((prev) => (prev + 1) % cases.length)
        setIsFading(false)
        startCase()
      }, 600) // fade-out duration
    }, loopDelay)

    return () => clearTimer()
  }, [state, loopDelay, cases.length, startCase, clearTimer])

  // Initial start
  useEffect(() => {
    if (state === 'idle') {
      const timer = setTimeout(() => startCase(), 400)
      return () => clearTimeout(timer)
    }
  }, [state, startCase])

  return {
    visibleBlocks,
    currentCaseIndex: caseIndex,
    isFading,
    cursorVisible,
    containerRef,
  }
}

export type { UseTypewriterOptions, UseTypewriterReturn }
