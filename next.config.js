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
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'max-age=10, stale-while-revalidate',
          },
        ],
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
