// hooks/useFlights.ts

'use client'

import { useEffect, useState } from 'react'
import type { Encounter } from '@/types/pilot'
import { encounters as mockEncounters } from '@/components/pilot/data'

interface EncounterState {
  data: Encounter[]
  status: 'idle' | 'loading' | 'success' | 'error'
  error: string | null
}

interface EncounterResult {
  state: EncounterState
  refetch: () => void
}

export function useEncounters(): EncounterResult {
  const [state, setState] = useState<EncounterState>({
    data: [],
    status: 'loading',
    error: null,
  })

  const loadEncounters = () => {
    setState({ data: [], status: 'loading', error: null })
    return window.setTimeout(() => {
      try {
        if (!Array.isArray(mockEncounters)) {
          throw new Error('Malformed response: missing encounters array')
        }
        setState({ data: mockEncounters, status: 'success', error: null })
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error'
        setState({ data: [], status: 'error', error: message })
      }
    }, 400)
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        if (!Array.isArray(mockEncounters)) {
          throw new Error('Malformed response: missing encounters array')
        }
        setState({ data: mockEncounters, status: 'success', error: null })
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error'
        setState({ data: [], status: 'error', error: message })
      }
    }, 400)

    return () => window.clearTimeout(timer)
  }, [])

  return {
    state,
    refetch: () => {
      loadEncounters()
    },
  }
}
