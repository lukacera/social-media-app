import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "https://social-media-app-9qzn-47u5s2io6-ceraa04s-projects.vercel.app"
    }
  },
  plugins: [react()],
})
