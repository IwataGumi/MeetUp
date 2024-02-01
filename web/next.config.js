/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  websocket: true,
  async rewrites() {
    return {
      fallback: [
        {
          source: '/api/:path*',
          destination: `${process.env.API_URL}/api/:path*`,
        },
        {
          source: '/static/:path*',
          destination: `${process.env.API_URL}/static/:path*`,
        }
      ],
    };
  },
}

module.exports = nextConfig
