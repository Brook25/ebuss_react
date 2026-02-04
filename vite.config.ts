import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  root: '.',
  plugins: [react()],
  server: {
    port: 8000,
    host: true, // listen on 0.0.0.0 so VM host/guest can access
    strictPort: false,
  },
  build: {
    rollupOptions: {
      input: './index.html',
    },
  },
})
