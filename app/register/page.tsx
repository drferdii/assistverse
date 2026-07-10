import type { Metadata } from 'next'
import RegisterForm from '@/components/auth/RegisterForm'
import { assetPath } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Daftar Pilot — Sentra Assist',
  robots: { index: false },
}

export default function RegisterPage() {
  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-wordmark">SENTRA ASSIST — PILOT</div>
        <h1 className="auth-heading">Daftar</h1>
        <p className="auth-sub">Isi formulir di bawah. Kami kirim tautan aktivasi ke email Anda.</p>
        <RegisterForm />
        <p className="auth-footer-link">
          Sudah punya akun? <a href={assetPath('/login')}>Masuk</a>
        </p>
      </div>
    </main>
  )
}
