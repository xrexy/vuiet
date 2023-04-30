import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import {resolve} from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    'process.env': {}
  },
  resolve: {
    dedupe: ['vue', '@mysten/sui.js'],
  },
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'vuiet',
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
    }
  }
})
