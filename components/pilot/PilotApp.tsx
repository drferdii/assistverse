'use client'

import { useState } from 'react'
import { useEncounters } from '@/hooks/useFlights'
import { useTableState } from '@/hooks/useTableState'
import FlightSummaryBar from './FlightSummaryBar'
import FlightLogTable from './FlightLogTable'
import CurrencyTracker from './CurrencyTracker'
import FlightDetailView from './FlightDetailView'
import DataErrorBoundary from './DataErrorBoundary'
import DashboardGridLines from './DashboardGridLines'
import { kpis, certifications } from './data'
import type { Encounter } from '@/types/pilot'

type View = 'dashboard' | 'detail'

export default function PilotApp() {
  const { state, refetch } = useEncounters()
  const [tableState, tableDispatch] = useTableState()
  const [view, setView] = useState<View>('dashboard')
  const [selectedEncounter, setSelectedEncounter] = useState<Encounter | null>(null)

  const handleSelect = (encounter: Encounter) => {
    setSelectedEncounter(encounter)
    setView('detail')
    if (typeof window !== 'undefined') window.scrollTo(0, 0)
  }

  const handleBack = () => {
    setView('dashboard')
    setSelectedEncounter(null)
    if (typeof window !== 'undefined') window.scrollTo(0, 0)
  }

  // Loading state
  if (state.status === 'loading') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-2 h-2 rounded-full bg-signal animate-[pulse_1600ms_cubic-bezier(0.4,0,0.2,1)_infinite] mx-auto" />
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft mt-6 block">
            Memuat logbook
          </span>
        </div>
      </div>
    )
  }

  // Error state
  if (state.status === 'error') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-8">
        <div className="text-center max-w-md">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-signal block">
            Gagal Memuat Data
          </span>
          <p className="font-display text-[17px] mt-4 text-ink leading-relaxed">{state.error}</p>
          <button
            onClick={refetch}
            className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em]
                       px-6 py-3 bg-ink text-paper hover:bg-signal-deep
                       transition-colors duration-300"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    )
  }

  // Detail view
  if (view === 'detail' && selectedEncounter) {
    return <FlightDetailView encounter={selectedEncounter} onBack={handleBack} />
  }

  // Dashboard view
  return (
    <DataErrorBoundary>
      <div className="relative">
        <DashboardGridLines />
        <div className="relative">
          <FlightSummaryBar kpis={kpis} />
          <FlightLogTable
            encounters={state.data}
            state={tableState}
            dispatch={tableDispatch}
            onSelect={handleSelect}
          />
          <CurrencyTracker items={certifications} />
        </div>
      </div>
    </DataErrorBoundary>
  )
}
