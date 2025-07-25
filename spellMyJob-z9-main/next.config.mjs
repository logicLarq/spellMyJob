import pkg from '@netlify/next'
const { withNetlify } = pkg

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: true,
  },
}

export default withNetlify(nextConfig)
