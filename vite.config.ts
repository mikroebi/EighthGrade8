import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base URL is required for GitHub Pages (repository name)
  base: '/EighthGrade8/',
  
  define: {
    // Polyfill process.env for browser environment to prevent crashes
    'process.env': {
      API_KEY: process.env.API_KEY || ''
    }
  }
});