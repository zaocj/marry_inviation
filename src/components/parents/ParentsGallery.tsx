import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { Pause, Play } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperInstance } from 'swiper'
import { A11y } from 'swiper/modules'
import { invitation } from '@/config/invitation'
import 'swiper/css'

const AUTOPLAY_DELAY = 2000

/** 手机相册：横向滑动翻页，纵向手势留给页面滚动。 */
export default function ParentsGallery({ opened }: { opened: boolean }) {
  const mediaRef = useRef<HTMLDivElement>(null)
  const inView = useInView(mediaRef, { amount: 0.25 })
  const reducedMotion = useReducedMotion()
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null)
  const [index, setIndex] = useState(0)
  const [autoPlaying, setAutoPlaying] = useState(true)
  const [touching, setTouching] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)
  const photos = invitation.gallery

  useEffect(() => {
    const syncVisibility = () => setPageVisible(!document.hidden)
    syncVisibility()
    document.addEventListener('visibilitychange', syncVisibility)
    return () => document.removeEventListener('visibilitychange', syncVisibility)
  }, [])

  // 离开屏幕或切到后台时暂停；松手后重新计时，避免自动翻页打断手势。
  useEffect(() => {
    if (!opened || !inView || !pageVisible || !autoPlaying || touching || !swiper || swiper.destroyed || photos.length < 2) return
    const timer = window.setTimeout(() => swiper.slideNext(), AUTOPLAY_DELAY)
    return () => window.clearTimeout(timer)
  }, [opened, inView, pageVisible, autoPlaying, touching, swiper, index, photos.length])

  if (!photos.length) return null

  return (
    <section className="parents-gallery" aria-label="新人婚纱相册">
      <div className="parents-gallery-copy">
        <h2>良缘天定<br />佳偶天成</h2>
        <p>从此，良辰与共<br />往后，美景同看</p>
      </div>
      <div className="parents-gallery-media" ref={mediaRef}>
        <div className="parents-gallery-photo">
          <Swiper
            modules={[A11y]}
            onSwiper={setSwiper}
            onSlideChange={(instance) => setIndex(instance.realIndex)}
            onTouchStart={() => setTouching(true)}
            onTouchEnd={() => setTouching(false)}
            loop={photos.length > 1}
            speed={reducedMotion ? 0 : 350}
            simulateTouch={false}
            lazyPreloadPrevNext={1}
            a11y={{ wrapperLiveRegion: false, containerMessage: '婚纱相册，可左右滑动查看' }}
            className="parents-gallery-swiper"
          >
            {photos.map((src, photoIndex) => (
              <SwiperSlide key={src}>
                <img src={src} alt={`${invitation.groom.name}与${invitation.bride.name}的婚纱照，第${photoIndex + 1}张`} loading="lazy" width="1599" height="2133" draggable={false} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="parents-gallery-status">
          <span className="parents-gallery-hint">{photos.length > 1 ? '左右滑动' : '婚纱相册'}</span>
          <span aria-live={autoPlaying ? 'off' : 'polite'}>{String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}</span>
          {photos.length > 1 && <button type="button" aria-label={autoPlaying ? '暂停相册自动播放' : '继续相册自动播放'} onClick={() => setAutoPlaying((playing) => !playing)}>
            {autoPlaying ? <Pause size={18} aria-hidden="true" /> : <Play size={18} aria-hidden="true" />}
          </button>}
        </div>
      </div>
    </section>
  )
}
