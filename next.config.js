const { withFaust, getWpHostname } = require('@faustwp/core');
const fetchWordPressRedirects = require('./utils/fetchWordPressRedirects')

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust({
  async redirects() {
    const wordPressRedirects = await fetchWordPressRedirects();
    return wordPressRedirects;
  },
  async rewrites() {
    return [
      {
        source: '/about',
        destination: '/',
      },
    ]
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "CDN-Cache-Control",
            value: `public, max-age=86400, stale-while-revalidate=60, stale-if-error=2592000`,
          },
        ]
      },
    ];
  },
  reactStrictMode: true,
  poweredByHeader: false,
  sassOptions: {
    includePaths: ['node_modules'],
  },
  images: {
    domains: [getWpHostname()],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
});
