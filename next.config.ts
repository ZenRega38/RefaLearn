import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // "News" was renamed to "Stories". Keep old links and search results working.
  async redirects() {
    return [
      { source: "/news", destination: "/stories", permanent: true },
      { source: "/news/:slug", destination: "/stories/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
