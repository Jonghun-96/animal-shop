import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/animal-shop/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})