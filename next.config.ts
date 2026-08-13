import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "i.ytimg.com" },
      { hostname: "images.unsplash.com" },
      { hostname: "images.pexels.com" },
    ],
  },
};

export default nextConfig;
