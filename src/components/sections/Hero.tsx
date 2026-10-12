import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { invitation } from '@/config/invitation'

interface HeroProps {
  opened: boolean
}

/** 封面：深红底 + 丝带 + 婚纱照（不裁切、大图）+ 新人名 + 婚期 */
export default function Hero({ opened }: HeroProps) {
  const anim = (delay: number) => ({
    initial: { opacity: 0, y: 32 },
    animate: opened ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
  })

  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-primary via-primary-dark to-primary px-6 text-center">
      {/* 背景装饰 */}
      <img
        src="/assets/double-happiness-bg.webp"
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 w-[130%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.07] brightness-0 invert"
      />
      <motion.img
        src="/assets/ribbon-decoration.webp"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -top-6 left-1/2 w-[150%] max-w-none -translate-x-1/2 opacity-60 mix-blend-luminosity sm:w-[110%]"
        initial={{ opacity: 0, y: -40 }}
        animate={opened ? { opacity: 0.6, y: 0 } : {}}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />

      <div className="relative z-10 flex flex-col items-center">
        <motion.p {...anim(0.15)} className="font-script text-3xl text-champagne sm:text-4xl">
          Wedding Invitation
        </motion.p>

        {/* 封面婚纱照：金框大图，完整显示不裁切 */}
        <motion.div
          {...anim(0.3)}
          className="mt-6 w-[88vw] max-w-[min(400px,40.5svh)] rounded-2xl bg-gradient-to-b from-champagne via-gold to-champagne p-[3px] shadow-[0_18px_50px_rgba(0,0,0,0.4)] sm:mt-8"
        >
          <img
            src="/photos/header.webp"
            alt="我们的婚纱照"
            fetchPriority="high"
            className="aspect-[3/4] w-full rounded-[13px] bg-primary-dark object-cover"
          />
        </motion.div>

        <motion.h1
          {...anim(0.45)}
          className="mt-7 font-calligraphy text-6xl leading-tight text-cream sm:mt-8 sm:text-7xl"
        >
          {invitation.groom.name}
          <span className="text-shine mx-4 font-script text-5xl sm:text-6xl">&</span>
          {invitation.bride.name}
        </motion.h1>

        <motion.div {...anim(0.6)} className="mt-6 flex flex-col items-center gap-2 sm:mt-8">
          <p className="text-lg tracking-[0.4em] text-champagne">{invitation.dateText}</p>
          <p className="text-sm tracking-[0.3em] text-champagne/60">
            {invitation.weekdayText}
            {invitation.lunarText && ` · ${invitation.lunarText}`}
          </p>
        </motion.div>

        <motion.p {...anim(0.75)} className="mt-7 text-sm tracking-[0.5em] text-cream/70 sm:mt-10">
          我们结婚啦
        </motion.p>
      </div>

      <motion.a
        href="#announcement"
        aria-label="向下滚动"
        className="absolute bottom-8 z-10 text-champagne/70"
        initial={{ opacity: 0 }}
        animate={opened ? { opacity: 1 } : {}}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <ChevronDown className="h-7 w-7 animate-bounce" />
      </motion.a>
    </section>
  )
}
