import { motion } from 'framer-motion'
import { invitation } from '@/config/invitation'
import { REVEAL_FROM, REVEAL_TO, REVEAL_TRANSITION, REVEAL_VIEWPORT } from '@/lib/motion'

/** 结尾感谢词 + 页脚 */
export default function Thanks() {
  return (
    <footer className="relative overflow-hidden bg-cream pb-16 pt-24 sm:pt-28">
      <img
        src="/assets/ribbon-decoration.webp"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -top-8 left-1/2 w-[130%] max-w-none -translate-x-1/2 opacity-30 mix-blend-multiply"
      />

      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <motion.h2
          className="font-calligraphy text-4xl leading-snug text-primary sm:text-5xl"
          initial={REVEAL_FROM}
          whileInView={REVEAL_TO}
          viewport={REVEAL_VIEWPORT}
          transition={REVEAL_TRANSITION}
        >
          {invitation.thanks.title}
        </motion.h2>

        <motion.p
          className="mt-6 leading-loose text-ink/70"
          initial={REVEAL_FROM}
          whileInView={REVEAL_TO}
          viewport={REVEAL_VIEWPORT}
          transition={{ ...REVEAL_TRANSITION, delay: 0.08 }}
        >
          {invitation.thanks.message}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={REVEAL_VIEWPORT}
          transition={{ ...REVEAL_TRANSITION, delay: 0.16 }}
        >
          <img src="/assets/double-happiness-bg.webp" alt="囍" className="h-14 w-auto" />
          <p className="font-calligraphy text-2xl text-ink/80">
            {invitation.groom.fullName} & {invitation.bride.fullName}
          </p>
          <p className="text-xs tracking-[0.4em] text-sand">{invitation.dateText}</p>
        </motion.div>

        <p className="mt-16 border-t border-champagne/60 pt-6 text-[11px] tracking-[0.3em] text-sand/70">
          © {invitation.date.slice(0, 4)} {invitation.groom.name} & {invitation.bride.name} · 婚礼请柬
        </p>

        {/* 备案信息：个人备案需展示主办者姓名，金色细描边 + 菱形坠饰呼应印章质感 */}
        <motion.div
          className="mt-5 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={REVEAL_VIEWPORT}
          transition={{ ...REVEAL_TRANSITION, delay: 0.24 }}
        >
          <a
            href={invitation.icp.href}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="group inline-flex items-center gap-2.5 rounded-full border border-gold/25 bg-white/40 px-4 py-1.5 text-[11px] tracking-[0.16em] text-sand transition-colors duration-300 hover:border-gold/60 hover:text-primary"
          >
            <span
              aria-hidden
              className="h-1 w-1 rotate-45 bg-gold/70 transition-colors duration-300 group-hover:bg-primary/70"
            />
            <span className="text-ink/50 transition-colors duration-300 group-hover:text-primary/80">
              {invitation.icp.owner}
            </span>
            <span aria-hidden className="h-2.5 w-px bg-gold/30" />
            {invitation.icp.number}
          </a>
        </motion.div>
      </div>
    </footer>
  )
}
