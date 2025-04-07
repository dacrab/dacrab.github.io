import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.simpleicons.org',
        port: '',
        pathname: '/**',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Optimize image sizes for better mobile performance
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    formats: ['image/webp'],
  },
  
  // Enable react strict mode for better development experience
  reactStrictMode: true,
  
  // Optimize for mobile performance - using correct property names
  experimental: {
    // Remove the optimizeCss line as it requires critters package
    // optimizeCss: true,
  },
  
  // External packages configuration (moved from experimental)
  serverExternalPackages: [],
  
  // Configure webpack for better performance
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle size
    if (!dev && !isServer) {
      // Split chunks more aggressively for better mobile loading
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        cacheGroups: {
          default: false,
          vendors: false,
          framework: {
            name: 'framework',
            test: /[\\/]node_modules[\\/](react|react-dom|framer-motion)[\\/]/,
            priority: 40,
            // Only use these deps once
            enforce: true,
          },
          libs: {
            test: /[\\/]node_modules[\\/](?!.*framer-motion)[\\/]/,
            name: 'common-libs',
            priority: 30,
          },
          // Separate lottie files to their own chunk
          lottie: {
            test: /[\\/]node_modules[\\/](@lottiefiles)[\\/]/,
            name: 'lottie-libs',
            priority: 50,
            // Ensure it's in its own chunk
            enforce: true,
          }
        },
      };
    }
    
    return config;
  },
  
  // Improve compression for mobile
  compress: true,
  
  // Configure runtime for better mobile performance
  poweredByHeader: false,
};

export default nextConfig;
