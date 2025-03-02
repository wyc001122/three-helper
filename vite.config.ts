import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'
import { defineConfig } from 'vite'
import { codeInspectorPlugin } from 'code-inspector-plugin';
// https://vite.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [vue(), codeInspectorPlugin({
    bundler: 'vite',
  }),],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    terserOptions: {
      format: {
        comments: false,
      },
    },
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'ThreeHelper',
      fileName: 'ThreeHelper',
    },
    rollupOptions: {
    },

  },
  define: {
    'process.env': {},
  }
})