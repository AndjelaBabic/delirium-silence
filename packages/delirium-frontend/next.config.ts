import type { NextConfig } from "next";

/**
 * disableStaticImages + custom webpack rule:
 * Makes image imports (png/jpg/jpeg) return a URL string,
 * identical to Vite's behaviour. This means zero changes
 * to existing component files that import images.
 */
const nextConfig: NextConfig = {
  images: {
    disableStaticImages: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif|webp)$/i,
      type: "asset/resource",
      generator: {
        filename: "static/media/[name].[hash][ext]",
      },
    });
    return config;
  },
};

export default nextConfig;
