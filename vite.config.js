import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig ({
  server: {
    proxy: {
      '/api': {
        target: 'https://malker-backend.onrender.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    host: true,
    strictPort: true,
  },
  base: "/malker",
  plugins: [react()],
})
