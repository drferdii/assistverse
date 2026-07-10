'use client'

import { useState } from 'react'

type State = 'idle' | 'loading' | 'sent' | 'error'

const PROFESI_OPTIONS = ['Dokter', 'Perawat', 'Bidan'] as const

export default function RegisterForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [profesi, setProfesi] = useState('')
  const [state, setState] = useState<State>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !profesi) return
    setState('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/pilot/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), profesi }),
      })

      if (!res.ok) {
        const data = (await res.json()) as { error?: string }
        throw new Error(data.error ?? 'Terjadi kesalahan')
      }

      setState('sent')
    } catch (err) {
      setState('error')
      setErrorMsg(err instanceof Error ? err.message : 'Terjadi kesalahan. Coba lagi.')
    }
  }

  if (state === 'sent') {
    return (
      <div className="auth-sent">
        <div className="auth-sent-dot" />
        <p className="auth-sent-title">Cek inbox Anda</p>
        <p className="auth-sent-sub">
          Tautan aktivasi dikirim ke <strong>{email}</strong>.
          <br />
          Klik tautan untuk mulai menggunakan Sentra Assist.
        </p>
        <button type="button" className="auth-resend" onClick={() => setState('idle')}>
          Coba email lain
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="auth-field">
        <label htmlFor="reg-name" className="auth-label">
          Nama lengkap
        </label>
        <input
          id="reg-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="dr. Budi Santoso"
          className="auth-input"
          required
          autoFocus
        />
      </div>

      <div className="auth-field">
        <label htmlFor="reg-email" className="auth-label">
          Email
        </label>
        <input
          id="reg-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="budi@fasilitas.com"
          className="auth-input"
          required
        />
      </div>

      <div className="auth-field">
        <label htmlFor="reg-profesi" className="auth-label">
          Profesi
        </label>
        <select
          id="reg-profesi"
          value={profesi}
          onChange={(e) => setProfesi(e.target.value)}
          className="auth-input auth-select"
          required
        >
          <option value="" disabled>
            Pilih profesi
          </option>
          {PROFESI_OPTIONS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {state === 'error' && (
        <p className="auth-error" role="alert">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        className="auth-submit"
        disabled={state === 'loading' || !name.trim() || !email.trim() || !profesi}
      >
        {state === 'loading' ? <span className="auth-spinner" /> : 'Daftar sebagai Pilot →'}
      </button>
    </form>
  )
}
