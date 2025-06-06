import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 9002, // Change this to any available port
    strictPort: true, // Ensures Vite fails if the port is already in use
    hmr: {
      host: 'localhost',
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss()]
    }
  },
  base: '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    chunkSizeWarningLimit: 3000,
    outDir: '../../public/',
    emptyOutDir: false,
    rollupOptions: {
      output: {
        entryFileNames: 'build/admin-bundle.js', // Custom filename for entry files
        chunkFileNames: 'build/admin-bundle-[hash].js', // Custom filename for chunks
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'build/admin-bundle.css'; // Custom CSS filename
          }
          
          return 'build/admin-bundle-[hash][extname]'; // Default for other assets
        }
      }
    }
  }
});
