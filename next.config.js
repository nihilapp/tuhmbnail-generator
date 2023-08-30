/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  eslint: {
    dirs: [],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    largePageDataBytes: 128 * 100000,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [ '@svgr/webpack', ],
    });
    return config;
  },
};

module.exports = nextConfig;
