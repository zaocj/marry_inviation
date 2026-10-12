import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

const STORAGE_KEY = 'wedding-rsvp'

interface RsvpForm {
  name: string
  attending: 'yes' | 'no'
  guests: number
  message: string
}

/** 回复出席：按钮 + 弹窗表单。静态站无后端，提交结果存 localStorage 作为演示 */
export default function Rsvp() {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState<RsvpForm>({ name: '', attending: 'yes', guests: 1, message: '' })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const list = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as RsvpForm[]
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...list, { ...form, at: Date.now() }]))
    setSubmitted(true)
  }

  return (
    <section className="relative overflow-hidden bg-blush py-24 sm:py-28">
      <img
        src="/assets/qj_flower-decoration.webp"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-14 top-6 w-52 opacity-60 mix-blend-multiply"
      />

      <div className="relative mx-auto max-w-xl px-6 text-center">
        <motion.h2
          className="font-calligraphy text-4xl text-primary sm:text-5xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          敬请回复出席
        </motion.h2>
        <motion.p
          className="mt-5 leading-loose text-ink/70"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          您的莅临是我们全家的荣幸
          <br />
          敬请回复，以便我们周到准备
        </motion.p>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <motion.button
              type="button"
              className="mt-8 rounded-full bg-primary px-12 py-3.5 text-sm tracking-[0.4em] text-cream shadow-lg shadow-primary/30 transition-transform hover:scale-105 active:scale-95"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              回复出席
            </motion.button>
          </DialogTrigger>

          <DialogContent>
            {submitted ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <CheckCircle2 className="h-14 w-14 text-primary" />
                <DialogTitle>感谢您！</DialogTitle>
                <DialogDescription>
                  我们已收到您的确认，期待在大喜之日与您相见！
                </DialogDescription>
              </div>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle>确认出席</DialogTitle>
                  <DialogDescription>
                    您的莅临是我们家族的荣幸，敬请回复出席，以便我们周到准备。
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <label className="block">
                    <span className="mb-1.5 block text-sm text-ink/80">您的姓名</span>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="请输入您的姓名"
                      className="w-full rounded-lg border border-champagne bg-white/80 px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-sand/60 focus:border-primary"
                    />
                  </label>

                  <div>
                    <span className="mb-1.5 block text-sm text-ink/80">您会前来吗？</span>
                    <div className="grid grid-cols-2 gap-3">
                      {(
                        [
                          { value: 'yes', label: '我会出席' },
                          { value: 'no', label: '无法出席' },
                        ] as const
                      ).map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setForm({ ...form, attending: opt.value })}
                          className={cn(
                            'rounded-lg border px-4 py-2.5 text-sm transition-colors',
                            form.attending === opt.value
                              ? 'border-primary bg-primary text-cream'
                              : 'border-champagne bg-white/80 text-ink/70 hover:border-primary/50',
                          )}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {form.attending === 'yes' && (
                    <label className="block">
                      <span className="mb-1.5 block text-sm text-ink/80">宾客人数（包含您本人）</span>
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={form.guests}
                        onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })}
                        className="w-full rounded-lg border border-champagne bg-white/80 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                      />
                    </label>
                  )}

                  <label className="block">
                    <span className="mb-1.5 block text-sm text-ink/80">给新人的祝福（选填）</span>
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="恭喜你们！期待一同庆祝。"
                      className="w-full resize-none rounded-lg border border-champagne bg-white/80 px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-sand/60 focus:border-primary"
                    />
                  </label>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-primary py-3 text-sm tracking-[0.3em] text-cream transition-transform hover:scale-[1.02] active:scale-95"
                  >
                    送出确认
                  </button>
                </form>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
