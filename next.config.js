/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.pexels.com', 'flagcdn.com'],
  },
  eslint: { ignoreDuringBuilds: true },
};
module.exports = nextConfig;