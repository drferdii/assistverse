'use client'

import { createAuthClient } from 'better-auth/react'
import { magicLinkClient } from 'better-auth/client/plugins'
import { ensureBasePathUrl, SITE_URL } from '@/lib/site'

export const authClient = createAuthClient({
  baseURL: ensureBasePathUrl(process.env.NEXT_PUBLIC_BETTER_AUTH_URL ?? SITE_URL),
  plugins: [magicLinkClient()],
})
