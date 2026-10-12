import { useEffect, useRef, useState } from 'react'
import AMapLoader from '@amap/amap-jsapi-loader'
import { invitation } from '@/config/invitation'

declare global {
  interface Window {
    _AMapSecurityConfig?: { securityJsCode: string }
  }
}

/** 高德地图内嵌卡片：填了 key 显示真实地图，未填显示占位卡；按钮均可跳转高德 APP */
export default function VenueMap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [failed, setFailed] = useState(false)
  const { key, securityCode, keyword, city } = invitation.amap

  useEffect(() => {
    if (!key || !containerRef.current) return
    // 高德 SDK 为运行时注入，类型按 any 处理
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let map: any = null
    let cancelled = false

    window._AMapSecurityConfig = { securityJsCode: securityCode }
    AMapLoader.load({ key, version: '2.0' })
      .then((AMap) => {
        if (cancelled || !containerRef.current) return
        map = new AMap.Map(containerRef.current, { zoom: 16, viewMode: '2D' })
        AMap.plugin('AMap.Geocoder', () => {
          const geocoder = new AMap.Geocoder({ city })
          geocoder.getLocation(keyword, (status: string, result: { geocodes?: { location: unknown }[] }) => {
            if (status === 'complete' && result.geocodes?.length) {
              const location = result.geocodes[0].location
              map?.setCenter(location)
              new AMap.Marker({ position: location, map, title: keyword })
            }
          })
        })
      })
      .catch(() => setFailed(true))

    return () => {
      cancelled = true
      map?.destroy?.()
    }
  }, [key, securityCode, keyword, city])

  const showMap = Boolean(key) && !failed

  return (
    <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-champagne/70 sm:h-72">
      {showMap ? (
        <div ref={containerRef} className="h-full w-full" />
      ) : (
        <div className="paper-texture flex h-full w-full flex-col items-center justify-center gap-3 bg-blush">
          <img src="/assets/line-decoration.webp" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-multiply" />
          <span className="relative font-calligraphy text-2xl text-primary">{keyword}</span>
          {!key && (
            <span className="relative text-xs text-sand">
              在 src/config/invitation.ts 填入高德 key 后此处显示真实地图
            </span>
          )}
        </div>
      )}
    </div>
  )
}
