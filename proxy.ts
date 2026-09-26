import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getAuth } from '@/lib/auth'
import { assetPath } from '@/lib/site'

export async function proxy(request: NextRequest) {
  try {
    const session = await getAuth().api.getSession({
      headers: request.headers,
    })

    if (!session) {
      return NextResponse.redirect(new URL(assetPath('/login'), request.url))
    }

    return NextResponse.next()
  } catch (error) {
    console.error('Pilot proxy auth check failed:', error)
    return new NextResponse('Server auth belum dikonfigurasi.', { status: 503 })
  }
}

export const config = {
  matcher: ['/pilot'],
}
