interface AMapLoader {
  load(options: { key: string; version: string }): Promise<any>
}

declare global {
  interface Window {
    AMapLoader?: AMapLoader
    _AMapSecurityConfig?: { securityJsCode: string }
  }
}

let loaderPromise: Promise<AMapLoader> | undefined

/** 使用高德官方在线 Loader，避免部署构建依赖 npm 包解析。 */
function getLoader(): Promise<AMapLoader> {
  if (window.AMapLoader) return Promise.resolve(window.AMapLoader)
  if (loaderPromise) return loaderPromise

  const pending = new Promise<AMapLoader>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://webapi.amap.com/loader.js'
    script.async = true

    const cleanup = () => {
      window.clearTimeout(timeout)
      script.onload = null
      script.onerror = null
    }
    const fail = () => {
      cleanup()
      script.remove()
      reject(new Error('高德地图加载器加载失败'))
    }
    const timeout = window.setTimeout(fail, 15000)
    script.onerror = fail
    script.onload = () => {
      if (!window.AMapLoader) {
        fail()
        return
      }
      cleanup()
      resolve(window.AMapLoader)
    }
    document.head.appendChild(script)
  })

  loaderPromise = pending.catch((error) => {
    loaderPromise = undefined
    throw error
  })
  return loaderPromise
}

export function loadAMap(key: string, securityCode: string) {
  // 安全密钥必须在 JS API 开始加载前设置。
  window._AMapSecurityConfig = { securityJsCode: securityCode }
  return getLoader().then((loader) => loader.load({ key, version: '2.0' }))
}
