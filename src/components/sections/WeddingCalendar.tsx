import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { invitation } from '@/config/invitation'
import { cn } from '@/lib/utils'
import { eventTextSummary } from '@/lib/weddingIcs'
import {
  addToCalendarHref,
  copyEventText,
  detectCalendarEnv,
} from '@/lib/addToCalendar'

/** 周一起始的星期表头（与参考站一致） */
const WEEKDAYS = ['一', '二', '三', '四', '五', '六', '日']

/** 直接截取 ISO 字符串的日期部分，避免访客所在时区把婚期算到前一天 */
function weddingDateParts(iso: string) {
  const [year, month, day] = iso.slice(0, 10).split('-').map(Number)
  return { year, month, day }
}

function HeartMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 22"
      fill="currentColor"
      aria-hidden
      className={cn('drop-shadow-sm', className)}
    >
      <path d="M12 21C12 21 1.5 13.5 1.5 7.5C1.5 4.46 3.96 2 7 2C8.76 2 10.35 2.81 11.4 4.09L12 4.8L12.6 4.09C13.65 2.81 15.24 2 17 2C20.04 2 22.5 4.46 22.5 7.5C22.5 13.5 12 21 12 21Z" />
    </svg>
  )
}

/** 婚期所在月份的日历：婚期当天用红心标记，下方可一键加入日历 */
export default function WeddingCalendar() {
  const { year, month, day } = weddingDateParts(invitation.date)
  // 只在挂载时判断一次，避免每次渲染都读 UA
  const env = useMemo(() => detectCalendarEnv(), [])
  const [showHint, setShowHint] = useState(false)
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle')

  // 1 号是周几（周一为一周之首）、当月天数，全部用 UTC 计算避免时区偏移
  const firstWeekday = (new Date(Date.UTC(year, month - 1, 1)).getUTCDay() + 6) % 7
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate()
  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  return (
    <motion.div
      className="mt-12 flex flex-col items-center"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="w-full max-w-[304px] overflow-hidden rounded-[19px] border border-champagne/35 bg-cream/5 px-3 pb-4 pt-2 backdrop-blur-sm sm:max-w-[414px]">
        <div className="mx-auto w-full max-w-[280px] sm:max-w-[310px]">
          <p className="border-b border-champagne/25 py-2.5 text-center font-script text-[26px] text-champagne sm:text-[32px]">
            {year}年{month}月
          </p>

          <div className="grid grid-cols-7 border-b-2 border-champagne/40">
            {WEEKDAYS.map((weekday) => (
              <span
                key={weekday}
                className="py-1.5 text-center text-[10px] font-medium text-cream/60 sm:text-[11px]"
              >
                {weekday}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-0.5 px-1 py-2">
            {cells.map((date, index) => (
              <span
                key={index}
                className="flex h-[30px] items-center justify-center sm:h-[34px]"
              >
                {date === null ? null : date === day ? (
                  <span className="relative flex h-[24px] w-[26px] items-center justify-center sm:h-[28px] sm:w-[30px]">
                    <HeartMark className="absolute inset-0 h-full w-full text-champagne" />
                    <span className="relative z-10 text-[11px] font-bold text-primary-dark sm:text-[12px]">
                      {date}
                    </span>
                  </span>
                ) : (
                  <span className="text-[12px] text-cream/85 sm:text-[13px]">{date}</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      <a
        href={addToCalendarHref(env)}
        // 桌面端直接下载 ics；iOS 必须同页打开，Safari 才会弹出系统日历
        download={env === 'other' ? 'wedding.ics' : undefined}
        onClick={() => {
          // 内置浏览器里 ics 通常打不开（Android 微信有时能下载后交给日历），提示只作为兼底
          if (env === 'inapp') setShowHint(true)
        }}
        className="mt-3 text-[14px] text-champagne underline underline-offset-4 transition-opacity hover:opacity-80 sm:text-[16px]"
      >
        添加到日历
      </a>

      {showHint && (
        <div className="mt-3 w-full max-w-[304px] rounded-xl border border-champagne/30 bg-cream/10 px-4 py-3 text-center text-[12px] leading-relaxed text-cream/75 sm:max-w-[414px] sm:text-[13px]">
          若没有打开日历，请点右上角「···」→「在浏览器打开」，再点一次「添加到日历」。
          <button
            type="button"
            className="mt-2 block w-full text-champagne underline underline-offset-4"
            onClick={async () => setCopyState((await copyEventText()) ? 'copied' : 'failed')}
          >
            {copyState === 'copied' ? '日程信息已复制' : '或复制日程信息，手动添加'}
          </button>
          {copyState === 'failed' && (
            <p className="mt-2 select-all whitespace-pre-line text-left text-cream/70">
              {eventTextSummary()}
            </p>
          )}
        </div>
      )}
    </motion.div>
  )
}
