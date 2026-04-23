import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    target: 'es2020',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Agrupa módulos de node_modules en chunks específicos
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'react-vendor'
            }
            if (id.includes('framer-motion')) {
              return 'framer'
            }
            if (id.includes('lucide-react')) {
              return 'lucide'
            }
            if (id.includes('firebase')) {
              return 'firebase'
            }
            // El resto de dependencias van a 'vendor'
            return 'vendor'
          }
        }
      }
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      },
      mangle: true
    }
  },
  server: {
    port: 5173,
    open: false,
    hmr: {
      overlay: true
    }
  },
  preview: {
    port: 4173,
    open: false
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'lucide-react'],
    exclude: []
  }
})