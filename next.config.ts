import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Reverse proxy Umami to bypass ad blockers & privacy browsers
  async rewrites() {
    return [
      {
        source: "/cdn/v1.js",
        destination: "https://cloud.umami.is/script.js",
      },
      {
        source: "/cdn/api/send",
        destination: "https://cloud.umami.is/api/send",
      },
    ];
  },
};

export default nextConfig;
