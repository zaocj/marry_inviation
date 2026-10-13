import { motion } from 'framer-motion'
import { invitation } from '@/config/invitation'
import { cn } from '@/lib/utils'
import { REVEAL_FROM, REVEAL_TO, REVEAL_TRANSITION, REVEAL_VIEWPORT } from '@/lib/motion'

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

/** 婚期所在月份的日历：婚期当天用红心标记 */
export default function WeddingCalendar() {
  const { year, month, day } = weddingDateParts(invitation.date)

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
      initial={REVEAL_FROM}
      whileInView={REVEAL_TO}
      viewport={REVEAL_VIEWPORT}
      transition={REVEAL_TRANSITION}
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
    </motion.div>
  )
}
