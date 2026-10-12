import { motion } from 'framer-motion'
import { invitation } from '@/config/invitation'
import { useCountdown } from '@/hooks/useCountdown'
import SectionHeading from '@/components/sections/SectionHeading'
import FallingPetals from '@/components/effects/FallingPetals'

function TimeCell({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-champagne/30 bg-cream/10 backdrop-blur-sm sm:h-24 sm:w-24">
        <span className="font-script text-4xl text-cream sm:text-5xl">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-xs tracking-[0.3em] text-champagne/80">{label}</span>
    </div>
  )
}

/** 婚礼倒计时（深红区块） */
export default function Countdown() {
  const { days, hours, minutes, seconds, past } = useCountdown(invitation.date)

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-dark via-primary to-primary-dark py-24 sm:py-28">
      <FallingPetals count={10} />
      <img
        src="/assets/double-happiness-bg.webp"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 w-96 opacity-[0.06] brightness-0 invert"
      />

      <div className="relative mx-auto max-w-3xl px-6">
        <SectionHeading eyebrow="Countdown" title="婚礼倒计时" dark />

        {past ? (
          <motion.p
            className="text-center text-2xl tracking-[0.3em] text-cream"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            我们已喜结连理 ❦
          </motion.p>
        ) : (
          <motion.div
            className="flex items-start justify-center gap-4 sm:gap-8"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <TimeCell value={days} label="天" />
            <TimeCell value={hours} label="时" />
            <TimeCell value={minutes} label="分" />
            <TimeCell value={seconds} label="秒" />
          </motion.div>
        )}

        <p className="mt-10 text-center text-sm tracking-[0.3em] text-champagne/70">
          距离我们的婚礼 {past ? '' : '还有'}
        </p>
      </div>
    </section>
  )
}
