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
    // config.module.rules.push({
    //   test: /\.worker\.js$/,
    //   loader: 'worker-loader',
    //   // options: { inline: true }, // also works
    //   options: {
    //     name: 'static/[hash].worker.js',
    //     publicPath: '/_next/',
    //   },
    // })

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
