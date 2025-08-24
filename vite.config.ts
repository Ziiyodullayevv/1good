import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://1good-backend.uz',
        changeOrigin: true,
        secure: false, // agar HTTPS sertifikati self-signed bo‘lsa
        rewrite: (path) => path.replace(/^\/api/, '/api/v1'),
      },
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
