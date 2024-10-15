import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev'

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  transpilePackages: [
    '@atm0s-media-sdk/ui',
    '@atm0s-media-sdk/core',
    '@atm0s-media-sdk/react-hooks',
    '@atm0s-media-sdk/react-ui',
  ],
}

if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform()
}

export default nextConfig
