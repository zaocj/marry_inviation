import { useState, type RefObject } from 'react'
import { Music, Pause } from 'lucide-react'
import { invitation } from '@/config/invitation'
import { cn } from '@/lib/utils'

interface MusicToggleProps {
  audioRef: RefObject<HTMLAudioElement | null>
}

/** 右下角悬浮音乐开关；musicUrl 为空时不渲染 */
export default function MusicToggle({ audioRef }: MusicToggleProps) {
  const [playing, setPlaying] = useState(false)

  if (!invitation.musicUrl) return null

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
    } else {
      void audio.play()
    }
    setPlaying(!playing)
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
