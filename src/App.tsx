import { useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { invitation } from '@/config/invitation'
import Envelope from '@/components/envelope/Envelope'
import MusicToggle from '@/components/effects/MusicToggle'
import Hero from '@/components/sections/Hero'
import Announcement from '@/components/sections/Announcement'
import Couple from '@/components/sections/Couple'
import Gallery from '@/components/sections/Gallery'
import Events from '@/components/sections/Events'
import Countdown from '@/components/sections/Countdown'
import Rsvp from '@/components/sections/Rsvp'
import Thanks from '@/components/sections/Thanks'

export default function App() {
  const [opened, setOpened] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // 信封页显示期间锁定滚动，开启后回到页面顶部
  useEffect(() => {
    document.body.style.overflow = opened ? '' : 'hidden'
    if (opened) window.scrollTo(0, 0)
    return () => {
      document.body.style.overflow = ''
    }
  }, [opened])

  const handleOpen = () => {
    setOpened(true)
    // 开启请柬时尝试播放背景音乐（有用户手势，浏览器允许）
    if (invitation.musicUrl) void audioRef.current?.play().catch(() => {})
  }

  return (
    <div className="min-h-screen bg-cream font-serif-sc text-ink">
      <AnimatePresence>{!opened && <Envelope onOpen={handleOpen} />}</AnimatePresence>

      <main>
        <Hero opened={opened} />
        <Announcement />
        <Couple />
        <Gallery />
        <Events />
        <Countdown />
        <Rsvp />
        <Thanks />
      </main>

      {invitation.musicUrl && (
        <audio ref={audioRef} src={invitation.musicUrl} loop preload="auto" />
      )}
      <MusicToggle audioRef={audioRef} />
    </div>
  )
}
