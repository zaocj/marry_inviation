import { useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { invitation } from '@/config/invitation'
import FallingPetals from '@/components/effects/FallingPetals'

interface EnvelopeProps {
  onOpen: () => void
}

const FLOWER_SRC = '/assets/qj_flower-decoration.webp'

/** 两枝花贴在卡片对角，伸出卡片的部分被卡片的 overflow-hidden 裁掉 */
const FLOWER_TOP_LEFT =
  'pointer-events-none absolute w-[39%] max-w-none top-[-5%] left-[-15%] -translate-x-[6%] -scale-x-100 rotate-[40deg]'
const FLOWER_BOTTOM_RIGHT =
  'pointer-events-none absolute w-[39%] max-w-none bottom-[-10%] right-[-15%] translate-x-[6%] rotate-[-40deg]'
const FLOWERS = [FLOWER_TOP_LEFT, FLOWER_BOTTOM_RIGHT]

/** 展开副本：镜像交给动画的 scaleX，位置与静态花保持一致（同参考站做法） */
function flyingFlowerClasses(classes: string) {
  return classes.replace('-scale-x-100', '').replace(/\s+/g, ' ').trim()
}

/** 展开的花枝：原地放大 3 倍并虚化淡出 */
function flyVariants(mirrored: boolean): Variants {
  const sx = mirrored ? -1 : 1
  return {
    start: { scaleX: sx, scaleY: 1, opacity: 0.7, filter: 'blur(0px)' },
    fly: {
      scaleX: [sx, sx * 1.6, sx * 3],
      scaleY: [1, 1.6, 3],
      opacity: [0.7, 0.5, 0],
      filter: ['blur(0px)', 'blur(2px)', 'blur(10px)'],
      transition: { duration: 1.2, times: [0, 0.4, 1], ease: 'easeIn' },
    },
  }
}
/** 与 FLOWERS 一一对应（第一枝是镜像的） */
const FLY_VARIANTS = [flyVariants(true), flyVariants(false)]

/** 火漆印章的常态阴影 / 呼吸到最亮时的阴影 */
const SEAL_SHADOW = '0 4px 20px rgba(147, 20, 52, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.3)'
const SEAL_GLOW = '0 4px 32px rgba(147, 20, 52, 0.75), inset 0 2px 4px rgba(255, 255, 255, 0.3)'

/** 火漆印章：常态呼吸光晕，开启时放大旋转后消失 */
const SEAL_VARIANTS: Variants = {
  idle: {
    boxShadow: [SEAL_SHADOW, SEAL_GLOW, SEAL_SHADOW],
    transition: { duration: 2, ease: 'easeInOut', repeat: Infinity },
  },
  broken: {
    boxShadow: SEAL_SHADOW,
    scale: [1, 1.15, 1.05, 0],
    rotate: [0, 5, -3, 15],
    opacity: [1, 0.9, 0.5, 0],
    filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1.5)', 'brightness(2)'],
    transition: {
      duration: 0.5,
      times: [0, 0.3, 0.6, 1],
      ease: [0.4, 0, 0.2, 1],
      boxShadow: { duration: 0.2 },
    },
  },
}

/** 印章外扩散的圆环 */
const RING_VARIANTS: Variants = {
  start: { scale: 0.8, opacity: 0.8 },
  ring: { scale: 2.5, opacity: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

/** 按钮扫光：3s 一轮，前一半扫过、后一半停在右侧 */
const SHINE_VARIANTS: Variants = {
  off: { left: '-100%' },
  sweep: {
    left: ['-100%', '100%', '100%'],
    transition: { duration: 3, times: [0, 0.5, 1], ease: 'easeInOut', repeat: Infinity },
  },
}

/** 整页飞出：distance 是视口高度的 1.2 倍（对应原来的 -120vh，换算成 px 避免单位混用） */
const COVER_VARIANTS: Variants = {
  rest: { y: 0, rotate: 0, opacity: 1 },
  away: (distance: number) => ({
    y: [0, 10, distance],
    rotate: [0, 0.5, -2],
    opacity: [1, 1, 0],
    transition: { duration: 0.8, times: [0, 0.15, 1], ease: 'easeIn' },
  }),
}

type Phase = 'idle' | 'opening' | 'away'

/** 封面页：裁切的花枝 + 新人姓名，点击后印章裂开、花枝放大展开、整页飞出 */
export default function Envelope({ onOpen }: EnvelopeProps) {
  const [phase, setPhase] = useState<Phase>('idle')
  /** 整页飞出的距离，点击时按当前视口高度算一次 */
  const [flyDistance, setFlyDistance] = useState(0)
  const opening = phase !== 'idle'

  function handleOpen() {
    if (opening) return
    setFlyDistance(-window.innerHeight * 1.2)
    setPhase('opening')
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(to bottom right, #ffffff, #f8eef1, #efd9df)' }}
      exit={{ opacity: 0, transition: { duration: 0.7 } }}
    >
      <FallingPetals />

      <motion.div
        className="relative z-10 w-[310px] sm:w-[340px] md:w-[520px]"
        variants={COVER_VARIANTS}
        custom={flyDistance}
        initial="rest"
        animate={phase === 'away' ? 'away' : 'rest'}
        onAnimationComplete={() => {
          if (phase === 'away') onOpen()
        }}
      >
        {/* 卡片：overflow-hidden 负责把两枝花裁在卡片内 */}
        <div
          className="relative overflow-hidden rounded-lg border border-primary/15 bg-cream/95"
          style={{
            boxShadow:
              '0 25px 60px -12px rgba(0,0,0,0.45), 0 8px 24px rgba(0,0,0,0.2), 0 0 40px rgba(147,20,52,0.15)',
          }}
        >
          {FLOWERS.map((classes) => (
            <img key={classes} src={FLOWER_SRC} alt="" aria-hidden className={classes} />
          ))}

          {opening && (
            <div
              className="pointer-events-none absolute inset-0 transition-opacity duration-300"
              style={{
                background:
                  'radial-gradient(ellipse at center top, rgba(147,20,52,0.2) 0%, transparent 70%)',
              }}
            />
          )}

          <div className="relative z-10 px-6 pb-12 pt-24 text-center">
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

            <button
              type="button"
              onClick={handleOpen}
              className="relative mx-auto mt-8 flex items-center justify-center overflow-hidden rounded-full bg-primary px-10 py-3 text-sm tracking-[0.4em] text-cream shadow-lg shadow-primary/30 transition-transform hover:scale-105 active:scale-95"
            >
              开启喜帖
              <motion.span
                aria-hidden
                className="pointer-events-none absolute top-0 h-full w-8"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                }}
                variants={SHINE_VARIANTS}
                initial="off"
                animate="sweep"
              />
            </button>
          </div>
        </div>

        {/* 火漆印章：点击开启，开启时裂开 */}
        <motion.button
          type="button"
          onClick={handleOpen}
          aria-label="开启喜帖"
          className="absolute left-1/2 top-[50px] z-30 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
          style={{ background: 'radial-gradient(circle at 30% 30%, #931434, rgb(117, 0, 22))' }}
          variants={SEAL_VARIANTS}
          initial={{ boxShadow: SEAL_SHADOW, scale: 1, rotate: 0, opacity: 1, filter: 'brightness(1)' }}
          animate={phase === 'idle' ? 'idle' : 'broken'}
          onAnimationComplete={() => {
            if (phase === 'opening') setPhase('away')
          }}
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-cream">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.button>

        {opening && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[50px] z-20 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-primary"
            variants={RING_VARIANTS}
            initial="start"
            animate="ring"
          />
        )}

        {/* 展开的花枝：不被卡片裁切，原地放大到 3 倍并淡出 */}
        {opening &&
          FLOWERS.map((classes, i) => (
            <motion.img
              key={`fly-${classes}`}
              src={FLOWER_SRC}
              alt=""
              aria-hidden
              className={flyingFlowerClasses(classes)}
              variants={FLY_VARIANTS[i]}
              initial="start"
              animate="fly"
            />
          ))}
      </motion.div>
    </motion.div>
  )
}
