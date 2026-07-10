import type { Metadata } from 'next'
import MagicLinkForm from '@/components/auth/MagicLinkForm'
import { assetPath } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Masuk — Sentra Assist',
  robots: { index: false },
}

export default function LoginPage() {
  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-wordmark">SENTRA ASSIST</div>
        <h1 className="auth-heading">Masuk</h1>
        <p className="auth-sub">Kami kirim tautan ke email Anda. Tidak perlu password.</p>
        <MagicLinkForm callbackURL={assetPath('/pilot')} />
        <p className="auth-footer-link">
          Belum punya akun? <a href={assetPath('/register')}>Daftar sebagai pilot</a>
        </p>
      </div>
    </main>
  )
}
