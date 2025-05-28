import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: `https`,
        hostname: "pixabay.com",
        // port: '',
        // pathname: '/account123/**',
        // search: '',
      },
    ],
  },
};

export default nextConfig;
