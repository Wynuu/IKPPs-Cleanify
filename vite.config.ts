import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: './', 
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias @ diarahkan ke folder src
    },
  },

  define: {
    __DFINES__: {},
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
  },
});