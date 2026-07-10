export const dynamic = 'force-dynamic'

import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { createClient } from '@libsql/client'

const db = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN,
})

// Extension polls ini setiap 3 detik setelah request magic link.
// Mengembalikan session token bila user sudah klik magic link di browser.
export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get('email')

  if (!email?.trim()) {
    return NextResponse.json({ active: false }, { status: 400 })
  }

  try {
    const result = await db.execute({
      sql: `
        SELECT s.token, s.expiresAt, u.name, u.profesi
        FROM session s
        JOIN user u ON s.userId = u.id
        WHERE u.email = ?
          AND s.expiresAt > ?
        ORDER BY s.createdAt DESC
        LIMIT 1
      `,
      args: [email.trim().toLowerCase(), Date.now()],
    })

    if (result.rows.length === 0) {
      return NextResponse.json({ active: false })
    }

    const row = result.rows[0]
    return NextResponse.json({
      active: true,
      token: String(row.token),
      expiresAt: Number(row.expiresAt),
      user: {
        name: String(row.name),
        profesi: row.profesi ? String(row.profesi) : undefined,
      },
    })
  } catch {
    return NextResponse.json({ active: false }, { status: 500 })
  }
}
