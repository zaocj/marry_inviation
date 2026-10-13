import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { buildWeddingIcs } from './src/lib/weddingIcs'

/**
 * 把婚礼日程以 /wedding.ics 对外提供（内容由 config/invitation.ts 生成）。
 * 必须是 text/calendar 且不能带 Content-Disposition: attachment，否则 iOS Safari 不会弹出系统日历。
 */
function weddingIcsPlugin(): Plugin {
  return {
    name: 'wedding-ics',
    configureServer(server) {
      server.middlewares.use('/wedding.ics', (_req, res) => {
        res.setHeader('Content-Type', 'text/calendar; charset=utf-8')
        res.end(buildWeddingIcs())
      })
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'wedding.ics', source: buildWeddingIcs() })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), weddingIcsPlugin()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
})
