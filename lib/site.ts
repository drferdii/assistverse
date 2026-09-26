export const SITE_ORIGIN = 'https://sentrahai.com'
export const SITE_BASE_PATH = '/asisten-medis'
export const SITE_URL = `${SITE_ORIGIN}${SITE_BASE_PATH}`

const normalizePath = (path: string) => {
  if (!path || path === '/') {
    return ''
  }

  return path.startsWith('/') ? path : `/${path}`
}

export const assetPath = (path: string) => `${SITE_BASE_PATH}${normalizePath(path) || '/'}`

export const siteUrl = (path = '/') => `${SITE_URL}${normalizePath(path)}`

export const ensureBasePathUrl = (url: string) => {
  const trimmed = url.endsWith('/') ? url.slice(0, -1) : url

  if (trimmed.endsWith(SITE_BASE_PATH)) {
    return trimmed
  }

  return `${trimmed}${SITE_BASE_PATH}`
}
