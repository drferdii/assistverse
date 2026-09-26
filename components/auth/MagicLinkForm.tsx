'use client'

import { useState } from 'react'
import { authClient } from '@/lib/auth-client'

type State = 'idle' | 'loading' | 'sent' | 'error'

export default function MagicLinkForm({ callbackURL = '/pilot' }: { callbackURL?: string }) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<State>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setState('loading')
    setErrorMsg('')

    try {
      await authClient.signIn.magicLink({
        email: email.trim().toLowerCase(),
        callbackURL,
      })
      setState('sent')
    } catch {
      setState('error')
      setErrorMsg('Gagal mengirim tautan. Periksa email dan coba lagi.')
    }
  }

  if (state === 'sent') {
    return (
      <div className="auth-sent">
        <div className="auth-sent-dot" />
        <p className="auth-sent-title">Cek inbox Anda</p>
        <p className="auth-sent-sub">
          Tautan masuk dikirim ke <strong>{email}</strong>.
          <br />
          Berlaku 15 menit.
        </p>
        <button type="button" className="auth-resend" onClick={() => setState('idle')}>
          Kirim ulang
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="auth-field">
        <label htmlFor="email" className="auth-label">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="dokter@fasilitas.com"
          className="auth-input"
          required
          autoFocus
        />
      </div>

      {state === 'error' && (
        <p className="auth-error" role="alert">
          {errorMsg}
        </p>
      )}

      <button type="submit" className="auth-submit" disabled={state === 'loading' || !email.trim()}>
        {state === 'loading' ? <span className="auth-spinner" /> : 'Kirim Magic Link →'}
      </button>
    </form>
  )
}
