import { defineConfig } from '@playwright/test';

/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ['@repo/ui'],
};

export default defineConfig({
  plugins: [],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});