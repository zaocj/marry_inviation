import { useEffect } from 'react'

/** 自动滚动速度（px/秒），想让请柬翻得更快就调大这个值 */
const SPEED = 60
/** 开启后延迟启动，等信封淡出、封面入场动画结束 */
const DELAY_MS = 900
/** 起步加速时间：速度从 0 缓到全速，避免刚开始就突然滑动 */
const RAMP_MS = 1500
/** 滚动位置偏离预期超过这个像素数，就认为不是我们滚的（用户在拖滚动条） */
const DRIFT_PX = 3

const SCROLL_KEYS = new Set([
  'ArrowDown',
  'ArrowUp',
  'PageDown',
  'PageUp',
  'Home',
  'End',
  ' ',
  'Spacebar',
])

/**
 * 开启后缓慢自动向下滚动，滚到页尾自动停止。
 * 用户主动滚动（滚轮 / 触摸 / 滚动按键 / 拖动滚动条）会立即取消，不再恢复。
 */
export function useAutoScroll(enabled: boolean, speed = SPEED) {
  useEffect(() => {
    if (!enabled) return

    const html = document.documentElement
    const prevBehavior = html.style.scrollBehavior
    let raf = 0
    let timer = 0
    let stopped = false
    /** 我们自己维护的滚动位置（浮点累加，避免每帧取整后低速时卡住不动） */
    let y = 0
    let last = 0
    let start = 0

    const stop = () => {
      if (stopped) return
      stopped = true
      cancelAnimationFrame(raf)
      window.clearTimeout(timer)
      html.style.scrollBehavior = prevBehavior
      window.removeEventListener('wheel', stop)
      window.removeEventListener('touchstart', stop)
      window.removeEventListener('touchmove', stop)
      window.removeEventListener('keydown', onKeyDown)
    }

    function onKeyDown(e: KeyboardEvent) {
      if (SCROLL_KEYS.has(e.key)) stop()
    }

    const frame = (now: number) => {
      if (!start) {
        start = now
        last = now
        y = window.scrollY
      } else if (Math.abs(window.scrollY - y) > DRIFT_PX) {
        // 位置被外部改动（拖动滚动条 / 点击锚点）→ 当作主动滚动
        stop()
        return
      }

      // 切到后台再切回来会有一大段空档，跳过这一帧，避免瞬间跳很远
      const gap = now - last
      last = now
      if (gap > 500) {
        raf = requestAnimationFrame(frame)
        return
      }
      y += speed * Math.min(1, (now - start) / RAMP_MS) * (gap / 1000)

      const max = html.scrollHeight - window.innerHeight
      if (y >= max) {
        window.scrollTo(0, max)
        stop()
        return
      }

      window.scrollTo(0, y)
      raf = requestAnimationFrame(frame)
    }

    // index.css 里 html{scroll-behavior:smooth} 会让每帧的 scrollTo 各自变成一段平滑动画，
    // 所以自动滚动期间临时改成 auto，停止时还原
    html.style.scrollBehavior = 'auto'
    window.addEventListener('wheel', stop, { passive: true })
    window.addEventListener('touchstart', stop, { passive: true })
    window.addEventListener('touchmove', stop, { passive: true })
    window.addEventListener('keydown', onKeyDown)
    timer = window.setTimeout(() => {
      raf = requestAnimationFrame(frame)
    }, DELAY_MS)

    return stop
  }, [enabled, speed])
}
