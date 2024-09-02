import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      'react-dom/client': path.resolve(__dirname, 'node_modules/react-dom/client.js'),
    },
  },
  server: {
    open: true, // Automatically open the browser on server start
    watch: {
      usePolling: true, // Use polling for file changes (useful for certain environments)
    },
    hmr: {
      overlay: true, // Show overlay with errors in the browser
    },
  },
});