import { defineConfig, loadEnv  } from 'vite'
import path from "path";
import { fileURLToPath } from "url"; 

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 

import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd(), 'VITE');

  const API_BASE_URL = env.VITE_ENVIRONMENT === 'production'
    ? env.VITE_PROD_BASE_URL
    : env.VITE_DEV_BASE_URL;

  return {
    plugins: [react()],
    envDir: ".",
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
          target: API_BASE_URL,
          changeOrigin: true,
          secure: false,
        },
      },
      hmr: true,
      base: './',
    },
    define: {
      'process.env': env,
    },
  };
});