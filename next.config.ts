/** @type {import('next').NextConfig} */
import withPWA from "next-pwa";

const nextConfig = {
  reactStrictMode: true,
};

export default withPWA({
  dest: "public", // Where to put the service worker
  register: true, // Register it automatically
  skipWaiting: true, // Update the app instantly
  disable: process.env.NODE_ENV === "development", // Don't run in dev mode
})(nextConfig);
