import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'child_process'

const currentBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: currentBranch !== 'main' ? 'http://127.0.0.1:5000' : 'https://malker-backend.onrender.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    host: true,
    strictPort: true,
  },
  //base: currentBranch === 'main' ? '/malker' : '/',
  mode: currentBranch === 'main' ? 'production' : 'development',
  plugins: [react()],
})
