/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["assets.aceternity.com"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;