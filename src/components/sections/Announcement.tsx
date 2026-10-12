import { motion } from 'framer-motion'
import { invitation } from '@/config/invitation'

/** 喜讯：引言 + 装饰曲线与花 */
export default function Announcement() {
  return (
    <section id="announcement" className="relative overflow-hidden bg-cream py-24 sm:py-32">
      <img
        src="/assets/qj_flower-decoration.webp"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -left-16 top-1/2 w-56 -translate-y-1/2 opacity-70 mix-blend-multiply sm:w-72"
      />
      <img
        src="/assets/line-decoration.webp"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-20 top-0 h-full w-auto opacity-40 mix-blend-multiply"
      />

      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <motion.p
          className="font-script text-2xl text-gold"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Good News
        </motion.p>

        {invitation.announcement.map((line, i) => (
          <motion.h2
            key={line}
            className="mt-6 text-3xl font-bold tracking-[0.3em] text-primary sm:text-4xl"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] }}
          >
            {line}
          </motion.h2>
        ))}

        <motion.div
          className="mx-auto mt-10 h-px w-24 bg-primary/25"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />

        <motion.p
          className="mt-10 leading-loose text-ink/70"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          我们诚挚地邀请您
          <br />
          见证 {invitation.groom.fullName} 与 {invitation.bride.fullName} 的幸福时刻
          <br />
          与我们一同分享这份喜悦
        </motion.p>
      </div>
    </section>
  )
}
