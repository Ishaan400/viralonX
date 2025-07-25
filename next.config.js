/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  serverExternalPackages: ['mongoose'],
  experimental: {
    // add more flags here if needed
  },
};

export default nextConfig;

