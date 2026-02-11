// Vitest types are optional; remove reference to fix missing types error
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';

// https://vite.dev/config/
// import path from 'node:path';
// import { fileURLToPath } from 'node:url';
// const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), mdx({
    // MDX options
    providerImportSource: '@mdx-js/react'
  })],
  build: {
    chunkSizeWarningLimit: 1000
  },
  server: {
    port: 5174,
    proxy: {
      '/items': {
        target: 'https://directus-cms.sliplane.app',
        changeOrigin: true,
        secure: false,
      },
      '/assets': {
        target: 'https://directus-cms.sliplane.app',
        changeOrigin: true,
        secure: false,
      },
    },
    headers: {
      'Cache-Control': 'no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  },
  preview: {
    headers: {
      'Cache-Control': 'no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  },
  optimizeDeps: {
    include: ['@mdx-js/react']
  }
});