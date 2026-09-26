import type { NextConfig } from 'next'
import { SITE_BASE_PATH } from './lib/site'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  basePath: SITE_BASE_PATH,
  turbopack: {
    root: __dirname,
  },
}

export default nextConfig
