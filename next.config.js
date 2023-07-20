/** @type {import('next').NextConfig} */

// Allow images from https://avatars.githubusercontent.com/u/ to be loaded
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/u/**',
      }
    ],
  },
  experimental: {
    serverActions: true,
  },
}


module.exports = nextConfig
