/**
 * 滚动入场的公共参数，所有区块共用，想调快慢只改这个文件。
 *
 * margin：提前多少像素开始播。正值 = 元素还没进视口就开始（越大越"到得早、看不到动画"），
 *         0 = 元素刚进视口才开始播，能完整看到淡入。
 * duration：单个元素淡入时长。
 * REVEAL_FROM / REVEAL_TO：从下方 26px 处淡入。
 */
export const REVEAL_VIEWPORT = { once: true, margin: '0px' } as const

export const REVEAL_TRANSITION = {
  duration: 0.7,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
}

export const REVEAL_FROM = { opacity: 0, y: 26 }
export const REVEAL_TO = { opacity: 1, y: 0 }
