import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

console.log('Vite config loaded');

export default defineConfig({
  base: './', 
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias @ diarahkan ke folder src
    },
  },

  // define: {},
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  },
});

console.log('Build configuration:', {
  base: './',
  plugins: ['react'],
  alias: '@ -> ./src',
  outDir: 'dist',
  chunkSizeWarningLimit: 1000
});