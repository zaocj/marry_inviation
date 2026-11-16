import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { renderShareHtml } from './src/lib/share-html.ts'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'invitation-page-entries',
      transformIndexHtml: {
        order: 'post',
        handler(html, context) {
          const pathname = new URL(context.originalUrl ?? context.path, 'https://minvitation.site').pathname
          return renderShareHtml(html, pathname)
        },
      },
      generateBundle: {
        order: 'post',
        handler(_options, bundle) {
          const entry = bundle['index.html']
          if (!entry || entry.type !== 'asset') {
            throw new Error('未生成请柬首页，无法生成父母版入口')
          }
          const html = typeof entry.source === 'string' ? entry.source : new TextDecoder().decode(entry.source)
          // 每个入口携带自己的静态标题、描述与地址，抓取时无需执行 JavaScript。
          for (const route of ['groom-parents', 'bride-parents']) {
            this.emitFile({ type: 'asset', fileName: `${route}/index.html`, source: renderShareHtml(html, `/${route}`) })
          }
        },
      },
    },
  ],
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, 'src') },
  },
})
