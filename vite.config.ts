import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ vue(), vueJsx(), dts() ],
  build: {
    lib: {
      entry: path.resolve(__dirname, './lib/index.ts'),
      name: 'QmwUiNaive',
      fileName: 'index',
    },
    rollupOptions: {
      external: [ 'vue' ],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue'
        },
      }
    }
  }
})
