const isBrowser = typeof window !== 'undefined';

module.exports = {
  i18n: {
    debug: true,
    defaultLocale: 'en',
    locales: ['en', 'ko', 'ja'],
    localeDetection: false,
  },
};
