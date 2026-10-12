import { useState, type CSSProperties } from 'react'
import { motion } from 'framer-motion'
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

/** 展开副本：镜像交给动画的 --fly-scale-x，位置与静态花保持一致（同参考站做法） */
function flyingFlowerClasses(classes: string) {
  return classes.replace('-scale-x-100', '').replace(/\s+/g, ' ').trim()
}

type Phase = 'idle' | 'opening' | 'away'

/** 封面页：裁切的花枝 + 新人姓名，点击后印章裂开、花枝放大展开、整页飞出 */
export default function Envelope({ onOpen }: EnvelopeProps) {
  const [phase, setPhase] = useState<Phase>('idle')
  const opening = phase !== 'idle'

  /** 0.5s 印章裂开并开始飞出，1.3s 后交给主页面 */
  function handleOpen() {
    if (opening) return
    setPhase('opening')
    window.setTimeout(() => setPhase('away'), 500)
    window.setTimeout(onOpen, 1300)
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(to bottom right, #ffffff, #f8eef1, #efd9df)' }}
      exit={{ opacity: 0, transition: { duration: 0.7 } }}
    >
      <FallingPetals />

      <div
        className="relative z-10 w-[310px] sm:w-[340px] md:w-[520px]"
        style={phase === 'away' ? { animation: 'cover-away 0.8s ease-in forwards' } : undefined}
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
              <span
                aria-hidden
                className="pointer-events-none absolute top-0 h-full w-8"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                  animation: 'button-shine 3s ease-in-out infinite',
                }}
              />
            </button>
          </div>
        </div>

        {/* 火漆印章：点击开启，开启时裂开 */}
        <button
          type="button"
          onClick={handleOpen}
          aria-label="开启喜帖"
          className="absolute left-1/2 top-[50px] z-30 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #931434, rgb(117, 0, 22))',
            boxShadow:
              '0 4px 20px rgba(147,20,52,0.5), inset 0 2px 4px rgba(255,255,255,0.3)',
            animation: opening
              ? 'seal-break 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards'
              : 'seal-pulse 2s ease-in-out infinite',
          }}
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-cream">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>

        {opening && (
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[50px] z-20 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-primary"
            style={{ animation: 'seal-ring 0.6s ease-out forwards' }}
          />
        )}

        {/* 展开的花枝：不被卡片裁切，原地放大到 3 倍并淡出 */}
        {opening &&
          FLOWERS.map((classes) => (
            <img
              key={`fly-${classes}`}
              src={FLOWER_SRC}
              alt=""
              aria-hidden
              className={flyingFlowerClasses(classes)}
              style={
                {
                  '--fly-scale-x': classes.includes('-scale-x-100') ? -1 : 1,
                  animation: 'flower-fly-forward 1.2s ease-in forwards',
                } as CSSProperties
              }
            />
          ))}
      </div>
    </motion.div>
  )
}
