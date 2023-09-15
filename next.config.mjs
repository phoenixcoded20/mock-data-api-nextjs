/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    DEV_API: 'http://localhost:3000',
    PRODUCTION_API: ''
  }
};

export default nextConfig;
