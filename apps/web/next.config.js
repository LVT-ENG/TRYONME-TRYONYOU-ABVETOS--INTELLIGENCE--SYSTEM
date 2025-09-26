/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.vercel.app' },
      { protocol: 'https', hostname: 'tryonyou.app' }
    ]
  },
  experimental: { optimizePackageImports: ['react', 'react-dom'] }
};
module.exports = nextConfig;
