import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 部署在子路径 /sex-position-app/ 下，必须设置 base
export default defineConfig({
  plugins: [react()],
  base: '/sex-position-app/',
})
