'use client'

import { useState } from 'react'
import AcarsHeader from './AcarsHeader'
import Hero from './Hero'
import Transparency from './Transparency'
import AuditRoster from './AuditRoster'
import GlobalLogbook from './GlobalLogbook'
import Spatial from './Spatial'
import LogbookView from './LogbookView'
import ReportView from './ReportView'
import { users, type User } from './data'

type View = 'dashboard' | 'logbook' | 'report'

export default function AcarsApp() {
  const [view, setView] = useState<View>('dashboard')
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  const go = (v: View) => {
    setView(v)
    if (typeof window !== 'undefined') window.scrollTo(0, 0)
  }

  const selectUser = (u: User) => {
    setCurrentUser(u)
    go('logbook')
  }

  return (
    <>
      <AcarsHeader view={view} onView={go} />
      <div className="max-w-[1440px] mx-auto px-[var(--gutter)]">
        {view === 'dashboard' && (
          <>
            <Hero />
            <Transparency />
            <AuditRoster users={users} onSelect={selectUser} />
            <GlobalLogbook />
            <Spatial users={users} />
          </>
        )}
        {view === 'logbook' && currentUser && (
          <LogbookView user={currentUser} onBack={() => go('dashboard')} />
        )}
        {view === 'report' && <ReportView onBack={() => go('dashboard')} />}
      </div>
    </>
  )
}
