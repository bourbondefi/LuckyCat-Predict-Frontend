/* eslint-disable @typescript-eslint/no-var-requires */
const { withSentryConfig } = require('@sentry/nextjs')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withTM = require('next-transpile-modules')(['@pancakeswap/uikit'])

const sentryWebpackPluginOptions =
  process.env.VERCEL_ENV === 'production'
    ? {
        // Additional config options for the Sentry Webpack plugin. Keep in mind that
        // the following options are set automatically, and overriding them is not
        // recommended:
        //   release, url, org, project, authToken, configFile, stripPrefix,
        //   urlPrefix, include, ignore
        silent: false, // Logging when deploying to check if there is any problem
        validate: true,
        // Mark the release as Production
        // https://github.com/getsentry/sentry-webpack-plugin/blob/master/src/index.js#L522
        deploy: {
          env: process.env.VERCEL_ENV,
        },
        // For all available options, see:
        // https://github.com/getsentry/sentry-webpack-plugin#options.
      }
    : {
        silent: true, // Suppresses all logs
        dryRun: !process.env.SENTRY_AUTH_TOKEN,
      }

/** @type {import('next').NextConfig} */
const config = {
  compiler: {
    styledComponents: true,
  },
  experimental: {
    scrollRestoration: true,
  },
  reactStrictMode: true,
  images: {
    domains: ['static-nft.pancakeswap.com'],
  },
  async rewrites() {
    return [
      {
        source: '/info/token/:address',
        destination: '/info/tokens/:address',
      },
      {
        source: '/info/pool/:address',
        destination: '/info/pools/:address',
      },
      {
        source: '/info/pair/:address',
        destination: '/info/pools/:address',
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/logo.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, immutable, max-age=31536000',
          },
        ],
      },
      {
        source: '/images/:all*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, immutable, max-age=31536000',
          },
        ],
      },
      {
        source: '/images/tokens/:all*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, immutable, max-age=604800',
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/send',
        destination: '/prediction',
        permanent: true,
      },
      {
        source: '/swap/:outputCurrency',
        destination: '/prediction',
        permanent: true,
      },
      {
        source: '/create/:currency*',
        destination: '/prediction',
        permanent: true,
      },
      {
        source: '/farms/archived',
        destination: '/prediction',
        permanent: true,
      },
      {
        source: '/pool',
        destination: '/prediction',
        permanent: true,
      },
      {
        source: '/staking',
        destination: '/prediction',
        permanent: true,
      },
      {
        source: '/syrup',
        destination: '/prediction',
        permanent: true,
      },
      {
        source: '/collectibles',
        destination: '/prediction',
        permanent: true,
      },
      {
        source: '/',
        destination: '/prediction',
        permanent: true,
      },
      {
        source: '/swap',
        destination: '/prediction',
        permanent: true,
      },
      {
        source: '/liquidity',
        destination: '/prediction',
        permanent: true,
      },
      {
        source: '/limit-orders',
        destination: '/prediction',
        permanent: true,
      },
      {
        source: '/nfts',
        destination: '/prediction',
        permanent: true,
      },
      {
        source: '/farms',
        destination: '/prediction',
        permanent: true,
      },
      {
        source: '/lottery',
        destination: '/prediction',
        permanent: true,
      },
      {
        source: '/pools',
        destination: '/prediction',
        permanent: true,
      },
      {
        source: '/info',
        destination: '/prediction',
        permanent: true,
      },
      {
        source: '/voting',
        destination: '/prediction',
        permanent: true,
      },
      {
        source: '/info/pools',
        destination: '/prediction',
        permanent: true,
      },
      {
        source: '/info/tokens',
        destination: '/prediction',
        permanent: true,
      },
      {
        source: '/ifo',
        destination: '/prediction',
        permanent: true,
      },
      {
        source: '/nfts/collection',
        destination: '/prediction',
        permanent: true,
      },
      {
        source: '/nfts/activity',
        destination: '/prediction',
        permanent: true,
      },
      {
        source: '/teams',
        destination: '/prediction',
        permanent: true,
      },
      {
        source: '/create-profile',
        destination: '/prediction',
        permanent: true,
      },
      {
        source: '/competition',
        destination: '/prediction',
        permanent: true,
      },
    ]
  },
}

module.exports = withBundleAnalyzer(withSentryConfig(withTM(config), sentryWebpackPluginOptions))
