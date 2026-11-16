import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'invitation-page-entries',
      generateBundle: {
        order: 'post',
        handler(_options, bundle) {
          const entry = bundle['index.html']
          if (!entry || entry.type !== 'asset') {
            throw new Error('未生成请柬首页，无法生成父母版入口')
          }
          // 为静态托管生成真实的目录入口，直接访问、刷新均不依赖 SPA 重写规则。
          for (const route of ['groom-parents', 'bride-parents']) {
            this.emitFile({ type: 'asset', fileName: `${route}/index.html`, source: entry.source })
          }
        },
      },
    },
  ],
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, 'src') },
  },
})
