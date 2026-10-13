import { motion } from 'framer-motion'
import { CalendarDays, Clock, MapPin, Navigation } from 'lucide-react'
import { invitation } from '@/config/invitation'
import SectionHeading from '@/components/sections/SectionHeading'
import VenueMap from '@/components/sections/VenueMap'
import { REVEAL_FROM, REVEAL_TO, REVEAL_TRANSITION, REVEAL_VIEWPORT } from '@/lib/motion'

interface EventCardProps {
  title: string
  time: string
  extraTime?: string
  venue: string
  address: string
  delay: number
}

function EventCard({ title, time, extraTime, venue, address, delay }: EventCardProps) {
  return (
    <motion.div
      className="flex-1 rounded-2xl border border-champagne/70 bg-white/70 p-8 shadow-lg shadow-primary/5"
      initial={REVEAL_FROM}
      whileInView={REVEAL_TO}
      viewport={REVEAL_VIEWPORT}
      transition={{ ...REVEAL_TRANSITION, delay }}
    >
      <h3 className="text-center font-calligraphy text-3xl text-primary">{title}</h3>
      <div className="mx-auto mt-4 h-px w-14 bg-primary/20" />

      <ul className="mt-6 space-y-4 text-sm">
        <li className="flex items-start gap-3">
          <CalendarDays className="mt-0.5 h-4 w-4 flex-none text-gold" />
          <span className="text-ink/80">
            {invitation.dateText}
            {invitation.lunarText && `（${invitation.lunarText}）`}
          </span>
        </li>
        <li className="flex items-start gap-3">
          <Clock className="mt-0.5 h-4 w-4 flex-none text-gold" />
          <span className="text-ink/80">
            {time}
            {extraTime && <span className="ml-2 text-sand">{extraTime}</span>}
          </span>
        </li>
        <li className="flex items-start gap-3">
          <MapPin className="mt-0.5 h-4 w-4 flex-none text-gold" />
          <span className="text-ink/80">
            <span className="font-semibold text-ink">{venue}</span>
            <br />
            {address}
          </span>
        </li>
      </ul>
    </motion.div>
  )
}

/** 婚宴信息（地图导航后续再加） */
export default function Events() {
  return (
    <section className="relative overflow-hidden bg-blush py-24 sm:py-28">
      <img
        src="/assets/ribbon-decoration.webp"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -bottom-10 left-1/2 w-[120%] max-w-none -translate-x-1/2 opacity-25 mix-blend-multiply"
      />

      <div className="relative mx-auto max-w-4xl px-6">
        <SectionHeading eyebrow="When & Where" title="典礼与婚宴" />

        <EventCard
          title={invitation.banquet.title}
          time={invitation.banquet.time}
          extraTime={invitation.banquet.reception}
          venue={invitation.banquet.venue}
          address={invitation.banquet.address}
          delay={0}
        />

        {/* 地图：callnative=1 在手机上会唤起高德 APP，未安装则打开网页版 */}
        <motion.div
          className="mt-10"
          initial={REVEAL_FROM}
          whileInView={REVEAL_TO}
          viewport={REVEAL_VIEWPORT}
          transition={REVEAL_TRANSITION}
        >
          <VenueMap />
          <div className="mt-5 text-center">
            <a
              href={`https://uri.amap.com/search?keyword=${encodeURIComponent(invitation.amap.keyword)}&city=${encodeURIComponent(invitation.amap.city)}&callnative=1`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-10 py-3 text-sm tracking-[0.3em] text-cream shadow-lg shadow-primary/30 transition-transform hover:scale-105 active:scale-95"
            >
              <Navigation className="h-4 w-4" />
              高德地图导航
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
