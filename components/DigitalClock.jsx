'use client'
import { useState, useEffect, useRef } from 'react'

/**
 * DigitalClock — live ticking digital display.
 * Shows HH:MM:SS in JetBrains Mono with teal glow.
 * Uses setInterval(1000ms), cleans up on unmount.
 */
export default function DigitalClock({ timezone }) {
  const [time, setTime] = useState(null)
  const intervalRef = useRef(null)

  const getTime = () =>
    new Date().toLocaleTimeString('en-US', {
      timeZone: timezone,
      hour:     '2-digit',
      minute:   '2-digit',
      second:   '2-digit',
      hour12:   true,
    })

  useEffect(() => {
    // Set immediately to avoid flash
    setTime(getTime())
    intervalRef.current = setInterval(() => setTime(getTime()), 1000)
    return () => clearInterval(intervalRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timezone])

  if (!time) {
    return (
      <div className="flex h-[72px] items-center justify-center">
        <span className="font-code text-3xl tabular-nums text-teal/30 animate-pulse">
          --:--:--
        </span>
      </div>
    )
  }

  // Split at the space before AM/PM
  const [clock, period] = time.split(' ')

  return (
    <div className="flex flex-col items-center gap-0.5">
      {/* Time display */}
      <div className="flex items-baseline gap-2">
        <span
          className="font-code text-[2.6rem] font-medium tabular-nums leading-none text-teal"
          style={{ textShadow: '0 0 18px rgba(25,215,193,0.5)' }}
        >
          {clock}
        </span>
        {period && (
          <span className="font-code text-base font-medium tabular-nums text-gold">
            {period}
          </span>
        )}
      </div>

      {/* Date line */}
      <span className="font-body text-[11px] text-shd-white/40 tracking-wide">
        {new Date().toLocaleDateString('en-US', {
          timeZone: timezone,
          weekday: 'short',
          month:   'short',
          day:     'numeric',
        })}
      </span>
    </div>
  )
}
