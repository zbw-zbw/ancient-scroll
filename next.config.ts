import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  transpilePackages: ["edge-tts"],
  serverExternalPackages: ["ws"],
};

export default nextConfig;
