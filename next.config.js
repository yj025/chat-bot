/** @type {import('next').NextConfig} */
const CopyPlugin = require('copy-webpack-plugin')

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      perf_hooks: false,
      worker_threads: false,
    }
    config.plugins = [
      ...config.plugins,
      new CopyPlugin({
        patterns: [
          {
            from: './lib',
            to: './static/chunks',
          },
        ],
      }),
    ]

    return config
  },
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
        ],
      },
      {
        source: '/:all*(svg|jpg|png|js|wasm)',
        locale: false,
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
