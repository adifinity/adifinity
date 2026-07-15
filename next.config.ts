import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow Sanity CDN assets so public pages can use next/image.
    // `search` is left unset (wildcard) because Sanity image URLs carry
    // required query parameters (w, h, fit, auto=format).
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
