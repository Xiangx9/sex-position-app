import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // GitHub Pages 部署在子路径下，必须设置 base
  base: '/sex-position-app/',
  plugins: [react()],
})
