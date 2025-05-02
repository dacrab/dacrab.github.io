import type { NextConfig } from "next";

const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  // Enable static exports for GitHub Pages
  output: isGitHubActions ? 'export' : undefined,
  
  // For username.github.io repositories, no basePath is needed
  // as the site is served from the root domain
  basePath: '',
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    formats: ['image/webp'],
    // Add unoptimized option for GitHub Pages compatibility
    unoptimized: isGitHubActions,
  },
  
  reactStrictMode: true,
  
  // Only apply headers in development or production mode, not for static export
  ...(isGitHubActions ? {} : {
    async headers() {
      return [
        {
          source: '/:path*',
          headers: [
            {
              key: 'X-DNS-Prefetch-Control',
              value: 'on',
            },
            {
              key: 'Link',
              value: [
                '<https://cdn.jsdelivr.net>; rel=preconnect; crossorigin=anonymous',
                '<https://fonts.googleapis.com>; rel=preconnect',
                '<https://fonts.gstatic.com>; rel=preconnect; crossorigin=anonymous',
              ].join(', '),
            },
            {
              // Enable HTTP/2 Server Push if supported
              key: 'X-HTTP2-Push',
              value: '*',
            },
            {
              // Instruct browsers to eagerly fetch critical resources
              key: 'X-Early-Data',
              value: '1',
            },
            {
              // Allow cross-origin for critical resources
              key: 'Cross-Origin-Resource-Policy',
              value: 'cross-origin',
            }
          ],
        },
      ];
    }
  }),
  
  productionBrowserSourceMaps: true,
  
  webpack: (config, { dev, isServer }) => {
    if (!dev) {
      config.devtool = isServer ? false : 'source-map';
    }
    
    if (!dev && !isServer) {
      config.devtool = 'source-map';
      
      if (config.optimization && config.optimization.splitChunks) {
        config.optimization.splitChunks = {
          ...config.optimization.splitChunks,
          cacheGroups: {
            ...(config.optimization.splitChunks as any).cacheGroups,
            framework: {
              name: 'framework',
              test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
              priority: 40,
              chunks: 'all',
              enforce: true,
            },
            lib: {
              test: /[\\/]node_modules[\\/](framer-motion)[\\/]/,
              name(module: any) {
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                return `lib.${packageName.replace('@', '')}`;
              },
              priority: 30,
              minChunks: 1,
              reuseExistingChunk: true,
              chunks: 'async',
            },
            commons: {
              name: 'commons',
              minChunks: 2,
              priority: 20,
              chunks: 'async',
            },
          },
        };
      }
      
      // Enable progressive loading optimization
      if (config.output) {
        config.output.chunkLoadingGlobal = 'webpackJsonp';
        config.output.chunkLoading = 'jsonp';
      }
    }

    return config;
  },
  
  // Improve first load by including only minimal JS
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  compress: true,
  
  poweredByHeader: false,
};

export default nextConfig;
