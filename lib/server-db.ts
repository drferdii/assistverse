import { createClient, type Client } from '@libsql/client'
import { requireServerEnv } from '@/lib/server-env'

let db: Client | null = null

export function getDatabaseClient() {
  if (db) return db

  db = createClient({
    url: requireServerEnv('DATABASE_URL'),
    authToken: process.env.DATABASE_AUTH_TOKEN,
  })

  return db
}
