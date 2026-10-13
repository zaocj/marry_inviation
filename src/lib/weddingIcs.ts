/**
 * 婚礼日程的 iCalendar(.ics) 生成 —— 网页端与构建脚本共用，改文案只需改 config/invitation.ts。
 * 时间统一按 UTC 写入（Z 结尾），任何系统的日历都会换算成当地时间显示。
 */
import { invitation } from '../config/invitation'

/** 事件所在时区：只用于展示文案，时间按 UTC 写入，任何设备都会换算成本地时间 */
const TIMEZONE = 'Asia/Shanghai'

/** 事件信息：优先用 calendarEvent 配置，未配置则取婚期起 2 小时 */
export function calendarEvent() {
  const start = new Date(invitation.calendarEvent?.start ?? invitation.date)
  const end = new Date(
    invitation.calendarEvent?.end ?? start.getTime() + 2 * 60 * 60 * 1000,
  )

  const title = `${invitation.groom.name} & ${invitation.bride.name} 婚礼`
  const location = `${invitation.banquet.venue}（${invitation.banquet.address}）`
  const description = [
    `诚挚邀请您莅临 ${invitation.groom.name} 与 ${invitation.bride.name} 的婚礼。`,
    `${invitation.banquet.reception}，${invitation.banquet.time} 开席。`,
    `地点：${location}`,
  ].join('\n')

  return { title, location, description, start, end }
}

/** 复制给宾客手动添加时用的纯文本 */
export function eventTextSummary() {
  const { title, location, start, end } = calendarEvent()
  const dateFmt = new Intl.DateTimeFormat('zh-CN', {
    timeZone: TIMEZONE,
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  })
  const timeFmt = new Intl.DateTimeFormat('zh-CN', {
    timeZone: TIMEZONE,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
  const range =
    dateFmt.format(start) === dateFmt.format(end)
      ? `${dateFmt.format(start)} ${timeFmt.format(start)}-${timeFmt.format(end)}`
      : `${dateFmt.format(start)} ${timeFmt.format(start)} 至 ${dateFmt.format(end)} ${timeFmt.format(end)}`
  return `${title}\n${range}\n${location}`
}

/** 20270101T020000Z */
function toIcsUtc(date: Date) {
  return date.toISOString().replace(/[-:]|\.\d{3}/g, '')
}

/** 转义 RFC 5545 的保留字符 */
function escapeText(text: string) {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n')
}

/** 超过 75 字节的长行按规范折行（续行以空格开头），按码点切分避免截断中文 */
function foldLine(line: string) {
  const encoder = new TextEncoder()
  if (encoder.encode(line).length <= 75) return line

  const folded: string[] = []
  let current = ''
  let bytes = 0
  for (const char of line) {
    const size = encoder.encode(char).length
    if (bytes + size > 74) {
      folded.push(current)
      current = ' '
      bytes = 1
    }
    current += char
    bytes += size
  }
  folded.push(current)
  return folded.join('\r\n')
}

export function buildWeddingIcs() {
  const { title, location, description, start, end } = calendarEvent()
  const reminder = invitation.calendarEvent?.reminderMinutes ?? 0

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//wedding-invitation//zh-CN//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${escapeText(title)}`,
    'X-WR-TIMEZONE:Asia/Shanghai',
    'BEGIN:VEVENT',
    // UID 固定，宾客重复添加时日历可识别为同一事件
    `UID:wedding-${start.toISOString().slice(0, 10)}@invitation`,
    `DTSTAMP:${toIcsUtc(new Date())}`,
    `DTSTART:${toIcsUtc(start)}`,
    `DTEND:${toIcsUtc(end)}`,
    `SUMMARY:${escapeText(title)}`,
    `LOCATION:${escapeText(location)}`,
    `DESCRIPTION:${escapeText(description)}`,
    'STATUS:CONFIRMED',
    'TRANSP:OPAQUE',
    ...(reminder > 0
      ? [
          'BEGIN:VALARM',
          `TRIGGER:-PT${reminder}M`,
          'ACTION:DISPLAY',
          `DESCRIPTION:${escapeText(title)}`,
          'END:VALARM',
        ]
      : []),
    'END:VEVENT',
    'END:VCALENDAR',
  ]

  return `${lines.map(foldLine).join('\r\n')}\r\n`
}
