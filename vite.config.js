import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  // กำหนด Base Path สำหรับ GitHub Pages (https://Birdie-1.github.io/via-alto/)
  base: process.env.NODE_ENV === 'production' ? '/via-alto/' : '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/php-api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/php-api/, '')
      },
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true
      }
    }
  }
});
