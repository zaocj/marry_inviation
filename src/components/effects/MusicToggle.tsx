import { useEffect, useState, type RefObject } from 'react'
import { Music, Pause } from 'lucide-react'
import { invitation } from '@/config/invitation'
import { cn } from '@/lib/utils'

interface MusicToggleProps {
  audioRef: RefObject<HTMLAudioElement | null>
}

/** 右下角悬浮音乐开关；musicUrl 为空时不渲染 */
export default function MusicToggle({ audioRef }: MusicToggleProps) {
  const [playing, setPlaying] = useState(false)

  // 跟随 <audio> 的真实状态：音乐可能是自动播放或首次操作补播开始的，本地 state 跟不上
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const sync = () => setPlaying(!audio.paused)
    sync()
    audio.addEventListener('play', sync)
    audio.addEventListener('pause', sync)
    return () => {
      audio.removeEventListener('play', sync)
      audio.removeEventListener('pause', sync)
    }
  }, [audioRef])

  if (!invitation.musicUrl) return null

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) void audio.play()
    else audio.pause()
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? '暂停音乐' : '播放音乐'}
      className={cn(
        'fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full',
        'bg-primary text-cream shadow-lg shadow-primary/40 transition-transform hover:scale-105',
        playing && 'animate-[spin_6s_linear_infinite]',
      )}
    >
      {playing ? <Pause className="h-5 w-5" /> : <Music className="h-5 w-5" />}
    </button>
  )
}
