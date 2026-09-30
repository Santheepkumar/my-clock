'use client'
import { useState, useEffect, useRef } from 'react'

/**
 * AnalogClock — pure SVG analog clock with smooth sweeping second hand.
 * Uses requestAnimationFrame for 60fps second hand, setInterval(60s) for
 * minute/hour accuracy. Styled in Straw Hat Devs brand colors.
 */
export default function AnalogClock({ timezone }) {
  const [angles, setAngles] = useState({ h: 0, m: 0, s: 0 })
  const rafRef = useRef(null)

  const computeAngles = () => {
    const now = new Date()
    // Get local time in the target tz
    const tzString = now.toLocaleTimeString('en-US', {
      timeZone: timezone,
      hour:     '2-digit',
      minute:   '2-digit',
      second:   '2-digit',
      hour12:   false,
    })
    const parts  = tzString.split(':').map(Number)
    const hours  = parts[0] % 12
    const mins   = parts[1]
    const secs   = parts[2]
    const ms     = now.getMilliseconds()

    // Smooth: include sub-unit fractions
    const s = secs + ms / 1000
    const m = mins + s / 60
    const h = hours + m / 60

    return {
      h: h * 30,          // 360 / 12
      m: m * 6,           // 360 / 60
      s: s * 6,           // 360 / 60
    }
  }

  useEffect(() => {
    let mounted = true

    const tick = () => {
      if (!mounted) return
      setAngles(computeAngles())
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      mounted = false
      cancelAnimationFrame(rafRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timezone])

  const SIZE   = 160
  const CX     = SIZE / 2   // 80
  const CY     = SIZE / 2   // 80
  const RADIUS = SIZE / 2 - 6

  /** Convert polar angle to x,y on the clock face */
  const polar = (angleDeg, r) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180
    return {
      x: CX + r * Math.cos(rad),
      y: CY + r * Math.sin(rad),
    }
  }

  const hourTip   = polar(angles.h, RADIUS * 0.54)
  const minuteTip = polar(angles.m, RADIUS * 0.78)
  const secondTip = polar(angles.s, RADIUS * 0.84)
  // Counter-tip tails
  const hourTail   = polar(angles.h + 180, RADIUS * 0.14)
  const minuteTail = polar(angles.m + 180, RADIUS * 0.16)
  const secondTail = polar(angles.s + 180, RADIUS * 0.20)

  // Hour markers (12 dots)
  const markers = Array.from({ length: 12 }, (_, i) => {
    const a   = i * 30
    const big = i % 3 === 0
    const out = polar(a, RADIUS * 0.88)
    return { x: out.x, y: out.y, big }
  })

  return (
    <svg
      width={SIZE}
      height={SIZE}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      role="img"
      aria-label="Analog clock"
    >
      <defs>
        <radialGradient id="faceBg" cx="35%" cy="28%" r="80%">
          <stop offset="0"   stopColor="#112D44"/>
          <stop offset="1"   stopColor="#06131F"/>
        </radialGradient>
        <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="1.5" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="secondGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="1" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Face */}
      <circle cx={CX} cy={CY} r={RADIUS} fill="url(#faceBg)"/>
      {/* Outer ring */}
      <circle cx={CX} cy={CY} r={RADIUS} fill="none" stroke="#19D7C1" strokeWidth="1.5" opacity="0.35"/>
      {/* Inner track ring */}
      <circle cx={CX} cy={CY} r={RADIUS * 0.88} fill="none" stroke="#19D7C1" strokeWidth="0.5" opacity="0.1"/>

      {/* Hour markers */}
      {markers.map((m, i) => (
        <circle
          key={i}
          cx={m.x}
          cy={m.y}
          r={m.big ? 2.5 : 1.4}
          fill={m.big ? '#F7C648' : '#19D7C1'}
          opacity={m.big ? 0.9 : 0.5}
        />
      ))}

      {/* Hour hand */}
      <line
        x1={hourTail.x}  y1={hourTail.y}
        x2={hourTip.x}   y2={hourTip.y}
        stroke="#F8FDFF"
        strokeWidth="4.5"
        strokeLinecap="round"
        filter="url(#glow)"
      />

      {/* Minute hand */}
      <line
        x1={minuteTail.x} y1={minuteTail.y}
        x2={minuteTip.x}  y2={minuteTip.y}
        stroke="#F8FDFF"
        strokeWidth="2.8"
        strokeLinecap="round"
        filter="url(#glow)"
      />

      {/* Second hand */}
      <line
        x1={secondTail.x} y1={secondTail.y}
        x2={secondTip.x}  y2={secondTip.y}
        stroke="#F7C648"
        strokeWidth="1.4"
        strokeLinecap="round"
        filter="url(#secondGlow)"
      />

      {/* Center cap */}
      <circle cx={CX} cy={CY} r="4"   fill="#19D7C1"/>
      <circle cx={CX} cy={CY} r="1.8" fill="#06131F"/>
    </svg>
  )
}
