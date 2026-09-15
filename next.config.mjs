import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/images\.unsplash\.com\/.*$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "unsplash-images",
        expiration: {
          maxEntries: 80,
          maxAgeSeconds: 60 * 60 * 24 * 30,
        },
      },
    },
    {
      urlPattern: /^https:\/\/.*$/i,
      handler: "NetworkFirst",
      options: {
        cacheName: "general-cache",
      },
    },
  ],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
};

export default withPWA(nextConfig);
