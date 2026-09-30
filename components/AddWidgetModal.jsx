'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { TIMEZONES } from '@/lib/timezones'

/**
 * AddWidgetModal — full-screen overlay for creating a new clock widget.
 *
 * Sections:
 *  1. Clock style picker (Digital / Analog) with live mini-preview
 *  2. Timezone search + scrollable list
 *
 * UX: Escape closes, Enter submits, body scroll locked, autofocus on search.
 */
export default function AddWidgetModal({ onAdd, onClose }) {
  const [mode,     setMode]     = useState('digital')
  const [query,    setQuery]    = useState('')
  const [selected, setSelected] = useState(null)
  const searchRef  = useRef(null)
  const modalRef   = useRef(null)

  // ── Body scroll lock ──────────────────────────────────────────────────
  useEffect(() => {
    document.body.classList.add('modal-open')
    return () => document.body.classList.remove('modal-open')
  }, [])

  // ── Auto-focus search ─────────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => searchRef.current?.focus(), 80)
    return () => clearTimeout(t)
  }, [])

  // ── Keyboard shortcuts ────────────────────────────────────────────────
  useEffect(() => {
    const handle = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Enter' && selected) handleAdd()
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, mode])

  // ── Filtered list ─────────────────────────────────────────────────────
  const filtered = TIMEZONES.filter(({ country, city, tz }) => {
    const q = query.toLowerCase()
    return (
      country.toLowerCase().includes(q) ||
      city.toLowerCase().includes(q)    ||
      tz.toLowerCase().includes(q)
    )
  })

  const handleAdd = useCallback(() => {
    if (!selected) return
    onAdd(selected, mode)
    onClose()
  }, [selected, mode, onAdd, onClose])

  // ── Mini digital preview time (static display) ────────────────────────
  const previewTime = new Date().toLocaleTimeString('en-US', {
    hour:   '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  })

  return (
    /* ── Backdrop ─────────────────────────────────────────────────────── */
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-midnight/80 backdrop-blur-sm sm:items-center"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      role="dialog"
      aria-modal="true"
      aria-label="Add Clock Widget"
    >
      {/* ── Modal panel ──────────────────────────────────────────────── */}
      <div
        ref={modalRef}
        className="animate-modal-in w-full max-w-md rounded-t-2xl border border-teal/20 bg-ocean shadow-teal-glow sm:rounded-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-teal/10 px-5 py-4">
          <h2 className="font-display text-base font-bold text-shd-white flex items-center gap-2">
            <span aria-hidden="true">🕐</span>
            Add Clock Widget
          </h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="flex h-7 w-7 items-center justify-center rounded-full text-shd-white/40 transition-colors hover:bg-teal/10 hover:text-teal"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M1.5 1.5l11 11M12.5 1.5l-11 11"/>
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto p-5" style={{ maxHeight: 'calc(100vh - 180px)' }}>

          {/* ── Section 1: Clock Style ──────────────────────────────── */}
          <fieldset>
            <legend className="mb-3 font-display text-xs font-semibold uppercase tracking-widest text-shd-white/50">
              Clock Style
            </legend>
            <div className="grid grid-cols-2 gap-3">

              {/* Digital option */}
              <button
                onClick={() => setMode('digital')}
                className={[
                  'flex flex-col items-center gap-2.5 rounded-brand-sm border py-4 px-3 transition-all duration-200',
                  mode === 'digital'
                    ? 'border-teal bg-teal/10 shadow-teal-glow-sm'
                    : 'border-teal/15 bg-midnight/40 hover:border-teal/35 hover:bg-teal/5',
                ].join(' ')}
              >
                <span className="font-body text-xs text-shd-white/50">Digital</span>
                {/* Mini preview */}
                <span
                  className="font-code text-lg font-medium tabular-nums text-teal"
                  style={{ textShadow: mode === 'digital' ? '0 0 12px rgba(25,215,193,0.6)' : undefined }}
                >
                  {previewTime.split(' ')[0]}
                </span>
                <span className="font-code text-[10px] text-gold">
                  {previewTime.split(' ')[1]}
                </span>
                {/* Selected indicator */}
                {mode === 'digital' && (
                  <span className="mt-0.5 h-1 w-6 rounded-full bg-teal"/>
                )}
              </button>

              {/* Analog option */}
              <button
                onClick={() => setMode('analog')}
                className={[
                  'flex flex-col items-center gap-2.5 rounded-brand-sm border py-4 px-3 transition-all duration-200',
                  mode === 'analog'
                    ? 'border-teal bg-teal/10 shadow-teal-glow-sm'
                    : 'border-teal/15 bg-midnight/40 hover:border-teal/35 hover:bg-teal/5',
                ].join(' ')}
              >
                <span className="font-body text-xs text-shd-white/50">Analog</span>
                {/* Mini analog preview */}
                <MiniAnalog active={mode === 'analog'}/>
                {mode === 'analog' && (
                  <span className="mt-0.5 h-1 w-6 rounded-full bg-teal"/>
                )}
              </button>
            </div>
          </fieldset>

          {/* ── Section 2: Timezone picker ──────────────────────────── */}
          <div className="mt-5">
            <label htmlFor="tz-search" className="mb-3 block font-display text-xs font-semibold uppercase tracking-widest text-shd-white/50">
              Select Timezone
            </label>

            {/* Search */}
            <div className="relative mb-2">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-shd-white/30"
                width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
                aria-hidden="true"
              >
                <circle cx="6" cy="6" r="4.5"/>
                <path d="M12 12l-2.5-2.5"/>
              </svg>
              <input
                ref={searchRef}
                id="tz-search"
                type="search"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelected(null) }}
                placeholder="Search country or city…"
                className="w-full rounded-brand-sm border border-teal/20 bg-midnight/60 py-2.5 pl-9 pr-3 font-body text-sm text-shd-white placeholder-shd-white/30 outline-none transition-colors focus:border-teal/60"
              />
            </div>

            {/* List */}
            <ul
              className="max-h-52 overflow-y-auto rounded-brand-sm border border-teal/10 bg-midnight/40"
              role="listbox"
              aria-label="Timezone list"
            >
              {filtered.length === 0 ? (
                <li className="px-4 py-8 text-center font-body text-sm text-shd-white/30">
                  No matches for &ldquo;{query}&rdquo;
                </li>
              ) : (
                filtered.map((tz) => {
                  const key  = tz.tz + tz.city
                  const isSel = selected?.tz === tz.tz && selected?.city === tz.city
                  return (
                    <li key={key} role="option" aria-selected={isSel}>
                      <button
                        onClick={() => setSelected(tz)}
                        className={[
                          'flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors duration-150',
                          isSel
                            ? 'border-l-2 border-teal bg-teal/12 text-shd-white'
                            : 'border-l-2 border-transparent text-shd-white/70 hover:bg-teal/8 hover:text-shd-white',
                        ].join(' ')}
                      >
                        <span className="text-base leading-none" aria-hidden="true">{tz.flag}</span>
                        <div className="min-w-0 flex-1">
                          <span className="block truncate font-body text-sm font-medium">
                            {tz.country}
                          </span>
                          <span className="block truncate font-body text-[11px] text-shd-white/45">
                            {tz.city} · {tz.tz}
                          </span>
                        </div>
                        {isSel && (
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#19D7C1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M2 7l4 4 6-6"/>
                          </svg>
                        )}
                      </button>
                    </li>
                  )
                })
              )}
            </ul>

            {/* Selection preview */}
            {selected && (
              <div className="mt-2 flex items-center gap-2 rounded-brand-sm border border-teal/25 bg-teal/8 px-3 py-2 animate-fade-in-up">
                <span className="text-base" aria-hidden="true">{selected.flag}</span>
                <span className="font-body text-sm text-teal">
                  {selected.country} — {selected.city}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-3 border-t border-teal/10 px-5 py-4">
          <button
            onClick={onClose}
            className="rounded-full px-4 py-2 font-display text-sm text-shd-white/50 transition-colors hover:text-shd-white"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            disabled={!selected}
            className={[
              'rounded-full px-5 py-2 font-display text-sm font-bold transition-all duration-200',
              selected
                ? 'bg-teal text-midnight shadow-teal-glow-sm hover:shadow-teal-glow hover:brightness-110'
                : 'cursor-not-allowed bg-teal/20 text-teal/40',
            ].join(' ')}
          >
            Add Widget
          </button>
        </div>
      </div>
    </div>
  )
}

/** Tiny inline analog clock preview for the style picker */
function MiniAnalog({ active }) {
  const size = 52, cx = 26, cy = 26, r = 22

  const hr  = { x: cx + r * 0.45 * Math.cos((315 - 90) * Math.PI / 180), y: cy + r * 0.45 * Math.sin((315 - 90) * Math.PI / 180) }
  const min = { x: cx + r * 0.65 * Math.cos((60  - 90) * Math.PI / 180), y: cy + r * 0.65 * Math.sin((60  - 90) * Math.PI / 180) }
  const sec = { x: cx + r * 0.75 * Math.cos((150 - 90) * Math.PI / 180), y: cy + r * 0.75 * Math.sin((150 - 90) * Math.PI / 180) }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <circle cx={cx} cy={cy} r={r} fill="#06131F" stroke={active ? '#19D7C1' : '#19D7C1'} strokeWidth="1.5" opacity={active ? 0.9 : 0.4}/>
      {[0,3,6,9].map(i => {
        const a = (i * 30 - 90) * Math.PI / 180
        return <circle key={i} cx={cx + r * 0.8 * Math.cos(a)} cy={cy + r * 0.8 * Math.sin(a)} r="1.5" fill="#F7C648" opacity={active ? 0.8 : 0.35}/>
      })}
      <line x1={cx} y1={cy} x2={hr.x}  y2={hr.y}  stroke="#F8FDFF" strokeWidth="2.2" strokeLinecap="round" opacity={active ? 1 : 0.5}/>
      <line x1={cx} y1={cy} x2={min.x} y2={min.y} stroke="#F8FDFF" strokeWidth="1.5" strokeLinecap="round" opacity={active ? 1 : 0.5}/>
      <line x1={cx} y1={cy} x2={sec.x} y2={sec.y} stroke="#F7C648" strokeWidth="0.9" strokeLinecap="round" opacity={active ? 0.9 : 0.4}/>
      <circle cx={cx} cy={cy} r="2" fill="#19D7C1" opacity={active ? 1 : 0.5}/>
    </svg>
  )
}
