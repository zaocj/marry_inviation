import { useMemo, type CSSProperties } from 'react'

const COLORS = ['#913b51', '#f3dfc3', '#e8c4ce', '#931434']

function PetalShape() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden>
      <g>
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <ellipse key={deg} cx="12" cy="5" rx="2.2" ry="4.5" transform={`rotate(${deg} 12 12)`} />
        ))}
      </g>
      <circle cx="12" cy="12" r="1.8" fillOpacity="0.45" />
    </svg>
  )
}

/** 飘落花瓣氛围层（纯 CSS 动画，position absolute 铺满父容器） */
export default function FallingPetals({ count = 14 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: Math.random() * 100,
        size: 10 + Math.random() * 14,
        color: COLORS[i % COLORS.length],
        duration: 18 + Math.random() * 9,
        delay: -Math.random() * 20,
        sway: Math.random() * 44 - 22,
      })),
    [count],
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {petals.map((p, i) => (
        <span
          key={i}
          className="absolute"
          style={
            {
              left: `${p.left}%`,
              top: '-30px',
              color: p.color,
              fontSize: p.size,
              '--sway': `${p.sway}px`,
              animation: `ambient-fall ${p.duration}s ease-in-out ${p.delay}s infinite`,
            } as CSSProperties
          }
        >
          <PetalShape />
        </span>
      ))}
    </div>
  )
}
