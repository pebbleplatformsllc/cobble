/** @type {import('next').NextConfig} */
const nextConfig = {
    // If you're using Next.js 13+ with the new app router, you can add the following:
    images: {
      // Option A: Using 'domains' (simpler for a few known hosts)
      domains: ["assets.aceternity.com"],
  
      // Option B: Using 'remotePatterns' (more flexible)
      // remotePatterns: [
      //   {
      //     protocol: 'https',
      //     hostname: 'assets.aceternity.com',
      //     port: '',
      //     pathname: '/**',
      //   },
      // ],
    },
    // ...other config
  };
  
  module.exports = nextConfig;