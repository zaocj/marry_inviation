/**
 * 「添加到日历」的落地方式：不同系统用不同入口，见 addToCalendarHref。
 * - iOS：直接打开 /wedding.ics，Safari 会弹出系统日历的「添加」面板
 * - Android：intent:// 唤起系统日历的新建日程页并预填信息（国产 ROM 自带日历也支持）
 * - 微信等内置浏览器：拦截 intent:// 与文件下载，只能提示用户改用系统浏览器
 */
import { calendarEvent, eventTextSummary } from './weddingIcs'

/** 与 vite.config.ts 里生成的静态文件对应 */
const ICS_PATH = '/wedding.ics'

export type CalendarEnv = 'inapp' | 'ios' | 'android' | 'other'

/** 内置浏览器（微信/QQ/微博…）会拦截 intent:// 与下载，需要引导到系统浏览器 */
const IN_APP_BROWSER = /MicroMessenger|Weibo|DingTalk|AlipayClient|Aweme|BytedanceWebview|Lark|QQ\//i

export function detectCalendarEnv(): CalendarEnv {
  const ua = navigator.userAgent
  if (IN_APP_BROWSER.test(ua)) return 'inapp'
  if (/iPhone|iPad|iPod/i.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1))
    return 'ios'
  if (/Android|HarmonyOS|OpenHarmony|ArkWeb/i.test(ua)) return 'android'
  return 'other'
}

export function icsUrl() {
  return new URL(ICS_PATH, window.location.href).toString()
}

/** Android 日历的 ACTION_INSERT，extra 名称见 CalendarContract */
function androidIntentUrl() {
  const { title, location, description, start, end } = calendarEvent()
  const params = [
    'action=android.intent.action.INSERT',
    'type=vnd.android.cursor.item/event',
    `S.title=${encodeURIComponent(title)}`,
    `S.description=${encodeURIComponent(description)}`,
    `S.eventLocation=${encodeURIComponent(location)}`,
    `l.beginTime=${start.getTime()}`,
    `l.endTime=${end.getTime()}`,
    // 手机上没有能处理该 intent 的日历时，Chrome 会退回这个地址下载 ics
    `S.browser_fallback_url=${encodeURIComponent(icsUrl())}`,
  ]
  return `intent://#Intent;${params.join(';')};end`
}

export function addToCalendarHref(env: CalendarEnv) {
  if (env === 'android') return androidIntentUrl()
  return ICS_PATH
}

/** 复制日程信息，供无法唤起日历时手动添加 */
export async function copyEventText() {
  const text = eventTextSummary()
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // 内置浏览器里 clipboard API 常被禁用，退回 execCommand
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(textarea)
    return ok
  }
}
