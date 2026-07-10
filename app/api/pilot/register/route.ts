export const dynamic = 'force-dynamic'

import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getDatabaseClient } from '@/lib/server-db'
import { getMissingServerEnv } from '@/lib/server-env'
import { assetPath, ensureBasePathUrl, SITE_BASE_PATH } from '@/lib/site'

const ALLOWED_PROFESI = ['Dokter', 'Perawat', 'Bidan'] as const
const REQUIRED_ENV = ['DATABASE_URL', 'RESEND_API_KEY'] as const

export async function POST(request: NextRequest) {
  const missingEnv = getMissingServerEnv(REQUIRED_ENV)
  if (missingEnv.length > 0) {
    return NextResponse.json(
      { error: `Server belum dikonfigurasi: ${missingEnv.join(', ')}` },
      { status: 503 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Request tidak valid' }, { status: 400 })
  }

  const { name, email, profesi } = body as Record<string, string>

  if (!name?.trim() || !email?.trim() || !profesi?.trim()) {
    return NextResponse.json({ error: 'Semua field wajib diisi' }, { status: 400 })
  }

  if (!ALLOWED_PROFESI.includes(profesi as (typeof ALLOWED_PROFESI)[number])) {
    return NextResponse.json({ error: 'Profesi tidak valid' }, { status: 400 })
  }

  const normalizedEmail = email.trim().toLowerCase()
  const db = getDatabaseClient()

  // Cek apakah user sudah ada
  const existing = await db.execute({
    sql: 'SELECT id FROM user WHERE email = ?',
    args: [normalizedEmail],
  })

  if (existing.rows.length === 0) {
    const id = crypto.randomUUID()
    const now = Date.now()
    await db.execute({
      sql: `INSERT INTO user (id, name, email, emailVerified, profesi, createdAt, updatedAt)
            VALUES (?, ?, ?, 0, ?, ?, ?)`,
      args: [id, name.trim(), normalizedEmail, profesi, now, now],
    })
  }

  // Trigger magic link via Better Auth
  const baseUrl = ensureBasePathUrl(
    process.env.BETTER_AUTH_URL?.trim() || request.nextUrl.origin || `http://localhost:3000${SITE_BASE_PATH}`
  )
  const mlRes = await fetch(`${baseUrl}/api/auth/sign-in/magic-link`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: normalizedEmail, callbackURL: assetPath('/pilot') }),
  })

  if (!mlRes.ok) {
    return NextResponse.json({ error: 'Gagal mengirim tautan. Coba lagi.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
