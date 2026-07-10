export const dynamic = 'force-dynamic'

import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { createClient } from '@libsql/client'

const db = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN,
})

const ALLOWED_PROFESI = ['Dokter', 'Perawat', 'Bidan'] as const

export async function POST(request: NextRequest) {
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
  const baseUrl = process.env.BETTER_AUTH_URL || 'http://localhost:3000'
  const mlRes = await fetch(`${baseUrl}/api/auth/sign-in/magic-link`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: normalizedEmail, callbackURL: '/pilot' }),
  })

  if (!mlRes.ok) {
    return NextResponse.json({ error: 'Gagal mengirim tautan. Coba lagi.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
