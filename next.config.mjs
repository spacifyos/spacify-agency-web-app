const nextConfig = {
  reactStrictMode: false,
  // i18n (uncomment and configure if needed),
  env: {
    DOMAIN: process.env.DOMAIN,
    API_DOMAIN: process.env.API_DOMAIN,
    CLOUDFLARE_RECAPTCHA_SITE: process.env.CLOUDFLARE_RECAPTCHA_SITE,
    SENTRY_DSN: process.env.SENTRY_DSN,
    PRODUCTION: process.env.PRODUCTION,
    PROJECT_NAME: process.env.PROJECT_NAME,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["staging-tms.spacify.asia", "tms.spacify.asia"],
  },
};

export default nextConfig;
