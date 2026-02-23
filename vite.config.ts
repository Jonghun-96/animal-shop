import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // 경로 설정을 위한 path 모듈


export default defineConfig({
  plugins: [react()],
  base: '/pet-bit/',
  resolve: {
    alias: {
      // "@"를 입력하면 자동으로 "src" 폴더를 가리키게 설정
      "@": path.resolve(__dirname, "./src"),
    },
  },
})