import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "fonts.gstatic.com"
    ],
  },
};

export default nextConfig;
