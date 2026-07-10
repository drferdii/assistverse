import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import SiteFooter from '@/components/SiteFooter'
import PilotApp from '@/components/pilot/PilotApp'
import { auth } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'Assist Pilot — Logbook Klinis',
  description: 'Logbook encounter klinis untuk pilot Sentra Assist.',
  robots: { index: false },
}

export default async function PilotPage() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) {
    redirect('/login')
  }

  const { user } = session
  const profesi = (user as { profesi?: string }).profesi

  return (
    <>
      <header className="pilot-auth-header">
        <span className="pilot-auth-wordmark">SENTRA ASSIST</span>
        <span className="pilot-auth-user">
          {user.name}
          {profesi ? ` — ${profesi}` : ''}
        </span>
        <a href="/api/auth/sign-out" className="pilot-auth-signout">
          Keluar
        </a>
      </header>
      <main
        id="main"
        className="max-w-[1440px] mx-auto px-[var(--gutter)] py-[clamp(28px,4vw,56px)]"
      >
        <PilotApp />
      </main>
      <SiteFooter />
    </>
  )
}
