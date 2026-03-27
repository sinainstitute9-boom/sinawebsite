/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    // allow Sanity CDN for next/image
    domains: ['cdn.sanity.io'],
    // or use remotePatterns if you need more flexibility
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'cdn.sanity.io',
    //   },
    // ],
  },
};

export default nextConfig;
