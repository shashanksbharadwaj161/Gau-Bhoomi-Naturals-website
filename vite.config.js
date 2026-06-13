import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('react-router')) return 'vendor-react'
          if (id.includes('react-dom') || /node_modules\/react\//.test(id) || /node_modules\/scheduler\//.test(id)) return 'vendor-react'
          if (id.includes('framer-motion') || id.includes('motion-dom') || id.includes('motion-utils')) return 'vendor-motion'
          if (id.includes('gsap')) return 'vendor-gsap'
          if (id.includes('three')) return 'vendor-three'
          if (id.includes('embla-carousel')) return 'vendor-embla'
          if (id.includes('lucide-react') || id.includes('@headlessui') || id.includes('react-hot-toast') || id.includes('axios')) return 'vendor-ui'
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 5173,
    open: true,
    cors: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'gsap', 'three', 'lenis'],
  },
})
