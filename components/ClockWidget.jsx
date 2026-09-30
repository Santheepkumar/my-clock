'use client'
import { useState } from 'react'
import DigitalClock from './DigitalClock'
import AnalogClock  from './AnalogClock'

/**
 * ClockWidget — a single draggable clock card.
 * Renders either a DigitalClock or AnalogClock based on `mode`.
 * Shows country/city label, tz badge, and a mode toggle.
 */
export default function ClockWidget({ id, flag, country, city, tz, mode, onRemove, onToggle }) {
  const [removing, setRemoving] = useState(false)

  const handleRemove = () => {
    setRemoving(true)
    // Wait for CSS animation before actually removing from DOM
    setTimeout(() => onRemove(id), 250)
  }

  return (
    <article
      className={[
        'group relative flex flex-col rounded-brand-md border border-teal/20 bg-ocean p-4 shadow-card',
        'transition-all duration-300 hover:border-teal/45 hover:shadow-teal-glow',
        removing ? 'scale-95 opacity-0' : 'animate-fade-in-up opacity-100',
      ].join(' ')}
      style={{ transition: removing ? 'opacity 0.25s, transform 0.25s' : undefined }}
    >
      {/* ── Remove button ─────────────────────────────────────────────── */}
      <button
        onClick={handleRemove}
        aria-label={`Remove ${country} ${city} clock`}
        className={[
          'absolute right-3 top-3 z-10 flex h-6 w-6 items-center justify-center rounded-full',
          'bg-midnight/60 text-shd-white/30 opacity-0 transition-all duration-200',
          'hover:bg-red-900/60 hover:text-red-400',
          'group-hover:opacity-100 focus-visible:opacity-100',
        ].join(' ')}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <path d="M1.5 1.5l7 7M8.5 1.5l-7 7"/>
        </svg>
      </button>

      {/* ── Header: flag + location ───────────────────────────────────── */}
      <div className="mb-3 flex items-center gap-2 pr-6">
        <span className="text-xl leading-none" aria-hidden="true">{flag}</span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-sm font-semibold leading-tight text-shd-white">
            {country}
          </p>
          <p className="truncate font-body text-xs text-shd-white/50">
            {city}
          </p>
        </div>
      </div>

      {/* ── Clock face ───────────────────────────────────────────────── */}
      <div className="flex flex-1 items-center justify-center py-2">
        {mode === 'digital'
          ? <DigitalClock timezone={tz} />
          : <AnalogClock  timezone={tz} />
        }
      </div>

      {/* ── Footer: tz badge + mode toggle ───────────────────────────── */}
      <div className="mt-3 flex items-center justify-between">
        {/* TZ badge */}
        <span className="inline-flex items-center rounded-full border border-gold/20 bg-gold/10 px-2 py-0.5 font-code text-[10px] text-gold/80">
          {tz}
        </span>

        {/* Digital / Analog toggle */}
        <button
          onClick={() => onToggle(id)}
          aria-label={`Switch to ${mode === 'digital' ? 'analog' : 'digital'} clock`}
          title={`Switch to ${mode === 'digital' ? 'analog' : 'digital'}`}
          className={[
            'flex items-center gap-1.5 rounded-full px-2.5 py-1',
            'border border-teal/20 bg-midnight/50 font-body text-[11px] transition-all duration-200',
            'hover:border-teal/50 hover:bg-teal/10 hover:text-teal',
            'text-shd-white/40',
          ].join(' ')}
        >
          {mode === 'digital' ? (
            <>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <circle cx="6" cy="6" r="5"/>
                <path d="M6 3.5v2.5l2 1.5"/>
              </svg>
              Analog
            </>
          ) : (
            <>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <rect x="1" y="3" width="10" height="6" rx="1"/>
                <path d="M4 6h4M4 7.5h2"/>
              </svg>
              Digital
            </>
          )}
        </button>
      </div>
    </article>
  )
}
