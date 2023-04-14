/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin({
      emitCssInSsr: true,
    }),
  ],
  server: {
    port: 3000,
  },
  test: {
    css: false,
    globals: true,
    environment: 'happy-dom',
    setupFiles: './vitest/setupTests.ts',
  },
  resolve: {
    alias: {
      'node-fetch': 'isomorphic-fetch',
    },
  },
  define: {
    global: {},
  },
});
