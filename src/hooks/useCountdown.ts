import { useState, useEffect } from 'react'

export interface CountdownResult {
  days: number
  hours: number
  minutes: number
  seconds: number
  isPassed: boolean
}

export function useCountdown(targetDate: string): CountdownResult {
  const calculateTimeLeft = (): CountdownResult => {
    try {
      const targetTime = new Date(targetDate).getTime()
      const now = new Date().getTime()
      const difference = targetTime - now

      if (isNaN(targetTime) || difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPassed: true,
        }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isPassed: false,
      }
    } catch {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isPassed: false,
      }
    }
  }

  const [timeLeft, setTimeLeft] = useState<CountdownResult>(calculateTimeLeft)

  useEffect(() => {
    // Initial calculate
    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return timeLeft
}
