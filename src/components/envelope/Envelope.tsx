import { useState } from 'react'
import { motion } from 'framer-motion'
import { invitation } from '@/config/invitation'
import FallingPetals from '@/components/effects/FallingPetals'

interface EnvelopeProps {
  onOpen: () => void
}

/** 信封开启页：火漆印章 + 翻盖动画，参考 silk-ribbon-dark-red 模板 */
export default function Envelope({ onOpen }: EnvelopeProps) {
  const [opening, setOpening] = useState(false)

  const handleOpen = () => {
    if (opening) return
    setOpening(true)
    window.setTimeout(onOpen, 1500)
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(to bottom right, #ffffff, #f8eef1, #efd9df)' }}
      exit={{ opacity: 0, transition: { duration: 0.7 } }}
    >
      <FallingPetals />

      <div className="relative z-10 flex flex-col items-center gap-10 px-6">
        <div className="relative w-[320px] sm:w-[420px] md:w-[520px]" style={{ perspective: 1400 }}>
          {/* 信纸 */}
          <motion.div
            className="paper-texture relative z-10 rounded-lg border border-champagne/60 bg-cream px-8 py-12 text-center shadow-xl"
            animate={opening ? { y: -130 } : { y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src="/assets/double-happiness-bg.webp"
              alt="囍"
              className="mx-auto mb-6 h-16 w-auto opacity-90"
            />
            <p className="font-calligraphy text-4xl text-primary sm:text-5xl">
              {invitation.groom.name}
              <span className="mx-3 font-script text-3xl text-gold sm:text-4xl">&</span>
              {invitation.bride.name}
            </p>
            <p className="mt-4 text-lg tracking-[0.3em] text-sand">❦</p>
            <p className="mt-2 text-sm tracking-[0.25em] text-ink/70">{invitation.dateText}</p>
            <p className="mt-6 text-base tracking-[0.5em] text-wine">敬请光临</p>
          </motion.div>

          {/* 信封前袋 */}
          <div
            className="pointer-events-none absolute inset-0 z-20 rounded-lg shadow-[inset_0_-8px_24px_rgba(147,20,52,0.08)]"
            style={{
              background: 'linear-gradient(to bottom, #f4e4e9, #efd9df)',
              clipPath: 'polygon(0 0, 50% 46%, 100% 0, 100% 100%, 0 100%)',
            }}
          />

          {/* 信封翻盖 */}
          <motion.div
            className="absolute inset-x-0 top-0 h-[55%] rounded-t-lg"
            style={{
              background: 'linear-gradient(to bottom, #faf0f3, #f0dce2)',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              transformOrigin: 'top center',
              backfaceVisibility: 'visible',
              boxShadow: '0 6px 18px rgba(147,20,52,0.12)',
            }}
            animate={opening ? { rotateX: 180, zIndex: 5 } : { rotateX: 0, zIndex: 30 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          />

          {/* 火漆印章 */}
          <motion.button
            type="button"
            onClick={handleOpen}
            aria-label="开启喜帖"
            className="absolute left-1/2 top-[46%] z-40 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #931434, rgb(117, 0, 22))',
              animation: 'seal-pulse 2s ease-in-out infinite',
            }}
            animate={opening ? { opacity: 0, scale: 0.4 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
          >
            <svg viewBox="0 0 24 24" className="h-7 w-7 fill-cream">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.button>
        </div>

        <motion.button
          type="button"
          onClick={handleOpen}
          className="rounded-full bg-primary px-10 py-3 text-sm tracking-[0.4em] text-cream shadow-lg shadow-primary/30 transition-transform hover:scale-105 active:scale-95"
          animate={opening ? { opacity: 0, y: 12 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          开启喜帖
        </motion.button>
      </div>
    </motion.div>
  )
}
