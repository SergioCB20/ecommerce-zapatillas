import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "static.vecteezy.com",
      },
      {
        protocol: "https",
        hostname: "oechsle.vteximg.com.br",
      },
      {
        protocol: "https",
        hostname: "png.pngtree.com",
      },
      {
        protocol: "https",
        hostname: "www.blogdelfotografo.com",
      },
      {
        protocol: "https",
        hostname: "previews.123rf.com",
      },
      {
        protocol: "https",
        hostname: "s3.sa-east-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;