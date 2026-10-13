import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperClass } from 'swiper'
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { invitation } from '@/config/invitation'
import SectionHeading from '@/components/sections/SectionHeading'
import { REVEAL_FROM, REVEAL_TO, REVEAL_TRANSITION, REVEAL_VIEWPORT } from '@/lib/motion'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'

/** 婚礼相册：Swiper coverflow 3D 卡片轮播（自动播放 + 左右切换按钮） */
export default function Gallery() {
  const swiperRef = useRef<SwiperClass | null>(null)

  return (
    <section className="relative overflow-hidden bg-cream py-24 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading eyebrow="Our Moments" title="婚礼相册" />
      </div>

      <motion.div
        className="relative"
        initial={REVEAL_FROM}
        whileInView={REVEAL_TO}
        viewport={REVEAL_VIEWPORT}
        transition={REVEAL_TRANSITION}
      >
        <Swiper
          modules={[EffectCoverflow, Autoplay, Pagination]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper
          }}
          effect="coverflow"
          grabCursor
          centeredSlides
          loop
          slidesPerView="auto"
          autoplay={{ delay: 3200, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true }}
          coverflowEffect={{
            rotate: 28,
            stretch: 0,
            depth: 220,
            modifier: 1,
            slideShadows: false,
          }}
          className="gallery-swiper !pb-14"
        >
          {invitation.gallery.map((src, i) => (
            <SwiperSlide key={src} className="!w-64 sm:!w-80">
              {({ isActive }) => (
                <div
                  className={`relative aspect-[3/4] overflow-hidden rounded-2xl transition-all duration-500 ${
                    isActive
                      ? 'opacity-100 shadow-2xl shadow-primary/30'
                      : 'opacity-50 shadow-lg shadow-primary/10'
                  }`}
                >
                  <img
                    src={src}
                    alt={`婚纱照 ${i + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 左右切换按钮 */}
        <button
          type="button"
          aria-label="上一张"
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-champagne bg-cream/90 text-primary shadow-md transition-transform hover:scale-110 active:scale-95 sm:left-[8%]"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="下一张"
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-champagne bg-cream/90 text-primary shadow-md transition-transform hover:scale-110 active:scale-95 sm:right-[8%]"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </motion.div>
    </section>
  )
}
