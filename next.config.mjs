import { withContentlayer } from 'next-contentlayer2'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { mdxRs: false },
}

export default withContentlayer(nextConfig)
