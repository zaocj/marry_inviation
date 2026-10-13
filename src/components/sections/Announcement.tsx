import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { invitation } from '@/config/invitation'
import { cn } from '@/lib/utils'
import { REVEAL_FROM, REVEAL_TO, REVEAL_TRANSITION, REVEAL_VIEWPORT } from '@/lib/motion'

interface PersonCardProps {
  role: string
  fullName: string
  avatar: string
  delay: number
  /** 新娘卡片镜像：头像朝外，两人对称在中间的心两侧 */
  mirrored?: boolean
}

function PersonCard({ role, fullName, avatar, delay, mirrored }: PersonCardProps) {
  return (
    <motion.div
      className={cn(
        'paper-texture relative flex flex-col items-center gap-3 overflow-hidden rounded-2xl border border-champagne/70 bg-white/70 px-3 py-6 text-center shadow-lg shadow-primary/5',
        'sm:gap-5 sm:px-6 sm:py-8 sm:text-left',
        mirrored ? 'sm:flex-row-reverse sm:text-right' : 'sm:flex-row',
      )}
      initial={REVEAL_FROM}
      whileInView={REVEAL_TO}
      viewport={REVEAL_VIEWPORT}
      transition={{ ...REVEAL_TRANSITION, delay }}
    >
      {/* 头像：人物照片裁成圆形，object-position 偏上以保住脸部 */}
      <div className="h-20 w-20 flex-none rounded-full border border-champagne/70 bg-white/60 p-1 sm:h-28 sm:w-28 sm:p-1.5">
        <div className="h-full w-full overflow-hidden rounded-full bg-blush">
          <img
            src={avatar}
            alt={fullName}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-[50%_20%]"
          />
        </div>
      </div>

      <div className="min-w-0">
        <p className="text-[10px] tracking-[0.2em] text-gold sm:text-xs sm:tracking-[0.35em]">
          {role}
        </p>
        <h3 className="mt-1.5 text-xl font-bold tracking-[0.15em] text-ink sm:mt-2 sm:text-2xl">
          {fullName}
        </h3>
      </div>
    </motion.div>
  )
}

/**
 * 喜讯 + 新人介绍：引言直接引出两位新人，合成开场区块。
 */
export default function Announcement() {
  return (
    <section id="announcement" className="relative overflow-hidden bg-blush py-24 sm:py-28">
      <div className="relative mx-auto max-w-2xl px-6 text-center">
        {/* 装饰图钉在引言区内，且尺寸不超过引言块：卡片是半透明的，装饰图压到卡片下面会透出来 */}
        <img
          src="/assets/qj_flower-decoration.webp"
          alt=""
          aria-hidden
          className="pointer-events-none absolute -left-16 top-1/2 w-48 -translate-y-1/2 opacity-70 mix-blend-multiply sm:w-56"
        />
        <img
          src="/assets/line-decoration.webp"
          alt=""
          aria-hidden
          className="pointer-events-none absolute -right-20 top-0 hidden h-full w-auto opacity-40 mix-blend-multiply sm:block"
        />

        <motion.p
          className="font-script text-2xl text-gold"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={REVEAL_VIEWPORT}
          transition={REVEAL_TRANSITION}
        >
          Good News
        </motion.p>

        {invitation.announcement.map((line, i) => (
          <motion.h2
            key={line}
            className="mt-6 text-3xl font-bold tracking-[0.3em] text-primary sm:text-4xl"
            initial={REVEAL_FROM}
            whileInView={REVEAL_TO}
            viewport={REVEAL_VIEWPORT}
            transition={{ ...REVEAL_TRANSITION, delay: 0.06 * i }}
          >
            {line}
          </motion.h2>
        ))}

        <motion.div
          className="mx-auto mt-10 h-px w-24 bg-primary/25"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={REVEAL_VIEWPORT}
          transition={{ ...REVEAL_TRANSITION, delay: 0.2 }}
        />
      </div>

      <div className="relative mx-auto mt-14 max-w-3xl px-6">
        <div className="relative grid grid-cols-2 items-stretch gap-4 sm:gap-6">
          <PersonCard
            role="新郎 GROOM"
            fullName={invitation.groom.fullName}
            avatar={invitation.groom.avatar}
            delay={0.1}
          />
          <PersonCard
            role="新娘 BRIDE"
            fullName={invitation.bride.fullName}
            avatar={invitation.bride.avatar}
            delay={0.16}
            mirrored
          />

          <div className="absolute left-1/2 top-1/2 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-cream shadow-lg shadow-primary/30 sm:h-11 sm:w-11">
            <Heart className="h-3.5 w-3.5 fill-current sm:h-5 sm:w-5" />
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-12 max-w-2xl px-6 text-center">
        <motion.p
          className="leading-loose text-ink/70"
          initial={REVEAL_FROM}
          whileInView={REVEAL_TO}
          viewport={REVEAL_VIEWPORT}
          transition={{ ...REVEAL_TRANSITION, delay: 0.28 }}
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
