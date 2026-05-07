import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: { '@': resolve(__dirname, 'src') },
  },

  server: {
    port: 5173,
    host: true,
    open: false,
    strictPort: false,
  },

  preview: {
    port: 4173,
    strictPort: false,
  },

  build: {
    target: 'es2020',
    minify: 'esbuild',
    sourcemap: false,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
        },
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
})
