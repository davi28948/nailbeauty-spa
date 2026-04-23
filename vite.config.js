import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Desactiva source maps en producción
    minify: 'terser',
    target: 'es2020', // Mejor compresión
    cssCodeSplit: true, // Divide CSS por página
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: {
          // Separa librerías grandes en chunks independientes
          vendor: ['react', 'react-dom', 'react-router-dom'],
          framer: ['framer-motion'],
          lucide: ['lucide-react'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore']
        }
      }
    },
    terserOptions: {
      compress: {
        drop_console: true, // Elimina console.log en producción
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'] // Elimina funciones específicas
      },
      mangle: true, // Ofusca nombres de variables
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