/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.experiments = { 
      asyncWebAssembly: true,
      topLevelAwait: true,
      layers: true 
    };

    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        maxSize: 250000
      }
    };

    if (!isServer) {
      config.performance = {
        maxEntrypointSize: 1024000,
        maxAssetSize: 1024000
      };

      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false
      };
    }

    return config;
  },
  images: {
    domains: [
      'gateway.lighthouse.storage',
      'ipfs.io',
      // Add any other image hostnames you might use
    ],
  },
  // Disable strict mode to reduce potential worker conflicts
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/api/:path*', // Proxy to Flask backend
      },
    ];
  },
};

module.exports = nextConfig;