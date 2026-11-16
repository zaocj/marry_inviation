import { useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { invitation } from '@/config/invitation'
import Envelope from '@/components/envelope/Envelope'
import MusicToggle from '@/components/effects/MusicToggle'
import Hero from '@/components/sections/Hero'
import Announcement from '@/components/sections/Announcement'
import Gallery from '@/components/sections/Gallery'
import Events from '@/components/sections/Events'
import Countdown from '@/components/sections/Countdown'
import Thanks from '@/components/sections/Thanks'
import { useAutoScroll } from '@/hooks/useAutoScroll'
import ParentsEnvelope from '@/components/parents/ParentsEnvelope'
import ParentsInvitation from '@/components/parents/ParentsInvitation'

export default function App() {
  const [opened, setOpened] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const isParents = invitation.audience !== 'couple'

  // 父母版与新人版的浏览器标题不同，index.html 里写的是新人版
  useEffect(() => {
    document.title = invitation.pageTitle
  }, [])

  // 信封页显示期间锁定滚动，开启后回到页面顶部
  useEffect(() => {
    document.body.style.overflow = opened ? '' : 'hidden'
    if (opened) window.scrollTo(0, 0)
    return () => {
      document.body.style.overflow = ''
    }
  }, [opened])

  // 打开网页就尝试播放背景音乐。浏览器会拦截「无用户操作的有声自动播放」，
  // 被拦下时退回到「第一次点击/按键时补播」，播放成功后就不再监听。
  useEffect(() => {
    if (!audioRef.current || !invitation.musicUrl) return

    const gestures = ['pointerdown', 'touchstart', 'keydown', 'click'] as const
    function retry() {
      const audio = audioRef.current
      if (!audio) return
      void audio.play().then(detach, () => {})
    }
    function detach() {
      // 播放成功即撤掉监听，避免用户之后主动暂停又被自动唤醒
      gestures.forEach((e) => window.removeEventListener(e, retry))
    }

    gestures.forEach((e) => window.addEventListener(e, retry, { passive: true }))
    retry()

    return detach
  }, [])

  // 所有版本开启后缓慢自动滚动；宾客触摸或主动滚动时停止。
  useAutoScroll(opened)

  const handleOpen = () => setOpened(true)

  return (
    <div className={isParents ? 'parents-theme' : 'min-h-screen bg-cream font-serif-sc text-ink'}>
      <AnimatePresence>
        {!opened && (isParents ? <ParentsEnvelope onOpen={handleOpen} /> : <Envelope onOpen={handleOpen} />)}
      </AnimatePresence>

      <main inert={!opened} aria-hidden={!opened}>
        {isParents ? <ParentsInvitation opened={opened} /> : (
          <>
            <Hero opened={opened} />
            <Announcement />
            <Gallery />
            <Events />
            <Countdown />
            <Thanks />
          </>
        )}
      </main>

      {invitation.musicUrl && (
        <audio ref={audioRef} src={invitation.musicUrl} loop preload="auto" />
      )}
      <MusicToggle audioRef={audioRef} />
    </div>
  )
}
