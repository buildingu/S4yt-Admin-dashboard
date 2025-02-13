import { defineConfig } from 'vite'
import path from "path";
import { fileURLToPath } from "url"; // ✅ Import this

const __filename = fileURLToPath(import.meta.url); // ✅ Define __filename
const __dirname = path.dirname(__filename); // ✅ Define __dirname

import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
      },
    },
    hmr: false,
    base: '/',
    
  },
})
