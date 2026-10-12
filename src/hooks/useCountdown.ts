import { useEffect, useState } from 'react'

export interface CountdownParts {
  days: number
  hours: number
  minutes: number
  seconds: number
  past: boolean
}

function diff(target: number): CountdownParts {
  const ms = target - Date.now()
  if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, past: true }
  const s = Math.floor(ms / 1000)
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
    past: false,
  }
}

export function useCountdown(targetIso: string): CountdownParts {
  const target = new Date(targetIso).getTime()
  const [parts, setParts] = useState<CountdownParts>(() => diff(target))

  useEffect(() => {
    const timer = setInterval(() => setParts(diff(target)), 1000)
    return () => clearInterval(timer)
  }, [target])

  return parts
}
