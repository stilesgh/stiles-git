
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
 
import { fileURLToPath, URL } from 'url'

export default defineConfig({
  plugins: [
    vue(),
    // 自动按需引入 API (如 ref, computed)
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    // 自动按需引入组件 (如 ElButton)
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      // '@': resolve(__dirname, 'src'),
      // 新写法：使用 fileURLToPath 转换路径
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 后端地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
