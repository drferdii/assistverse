import { useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

function subscribe(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {}
  const mq = window.matchMedia(QUERY)
  mq.addEventListener('change', callback)
  return () => mq.removeEventListener('change', callback)
}

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches
}

function getServerSnapshot(): boolean {
  return false
}

/**
 * SSR-safe replacement for motion/react's `useReducedMotion`.
 *
 * The original hook returns `null` on the server but `true`/`false` on the
 * client, which causes hydration mismatches when the user has reduced motion
 * enabled (server renders the animated variant, client renders the reduced
 * variant). This hook uses `useSyncExternalStore` with a `getServerSnapshot`
 * that always returns `false`, so the server and the first client render
 * match. React then updates to the real value after hydration.
 */
export default function useReducedMotionSSR(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
