import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    'process.env': {}
  },
  resolve: {
    dedupe: ['vue', '@mysten/sui.js'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'vuiet'
    },
    rollupOptions: {
      external: ['vue', '@vueuse/core', '@mysten/sui.js'],
      output: {
        exports: 'named',
        globals: {
          '@vueuse/core': 'VueUseCore',
          '@mysten/sui.js': 'MystenSui',
          vue: 'Vue'
        }
      }
    },
    sourcemap: true,
    minify: false
  }
})
