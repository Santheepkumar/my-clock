'use client'

/**
 * EmptyState — shown when no widgets have been added yet.
 * Animated globe+clock SVG illustration with a CTA prompt.
 */
export default function EmptyState({ onAdd }) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-20 text-center animate-fade-in-up">

      {/* Illustration */}
      <div className="relative">
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full bg-teal/10 blur-2xl" />

        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="World globe with clock"
          className="relative drop-shadow-lg"
        >
          {/* Globe circle */}
          <circle cx="60" cy="60" r="52" fill="#0B2236" stroke="#19D7C1" strokeWidth="1.5" opacity="0.9"/>

          {/* Latitude lines */}
          <ellipse cx="60" cy="60" rx="52" ry="20" fill="none" stroke="#19D7C1" strokeWidth="0.8" opacity="0.25"/>
          <ellipse cx="60" cy="60" rx="52" ry="38" fill="none" stroke="#19D7C1" strokeWidth="0.8" opacity="0.15"/>

          {/* Longitude lines */}
          <line x1="60" y1="8" x2="60" y2="112" stroke="#19D7C1" strokeWidth="0.8" opacity="0.2"/>
          <path d="M25 60 Q60 25 95 60 Q60 95 25 60Z" fill="none" stroke="#19D7C1" strokeWidth="0.8" opacity="0.2"/>

          {/* Simplified continents (abstract blobs) */}
          <ellipse cx="45" cy="52" rx="14" ry="10" fill="#19D7C1" opacity="0.18" transform="rotate(-15 45 52)"/>
          <ellipse cx="75" cy="48" rx="10" ry="8"  fill="#19D7C1" opacity="0.18" transform="rotate(10 75 48)"/>
          <ellipse cx="62" cy="70" rx="12" ry="8"  fill="#F7C648" opacity="0.14" transform="rotate(-5 62 70)"/>

          {/* Clock face overlay */}
          <circle cx="60" cy="60" r="22" fill="#06131F" stroke="#F7C648" strokeWidth="1.5" opacity="0.95"/>

          {/* Clock hour markers */}
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i * 30 - 90) * (Math.PI / 180)
            const r1 = 17, r2 = i % 3 === 0 ? 14 : 15.5
            return (
              <line
                key={i}
                x1={60 + r1 * Math.cos(a)} y1={60 + r1 * Math.sin(a)}
                x2={60 + r2 * Math.cos(a)} y2={60 + r2 * Math.sin(a)}
                stroke={i % 3 === 0 ? '#F7C648' : '#19D7C1'}
                strokeWidth={i % 3 === 0 ? 1.5 : 0.8}
                strokeLinecap="round"
              />
            )
          })}

          {/* Clock hands — static display position (10:10) */}
          {/* Hour hand — pointing ~10 o'clock */}
          <line x1="60" y1="60" x2="52" y2="51" stroke="#F8FDFF" strokeWidth="2.5" strokeLinecap="round"/>
          {/* Minute hand — pointing ~2 o'clock */}
          <line x1="60" y1="60" x2="70" y2="49" stroke="#F8FDFF" strokeWidth="1.8" strokeLinecap="round"/>
          {/* Second hand */}
          <line x1="58" y1="64" x2="65" y2="46" stroke="#F7C648" strokeWidth="1" strokeLinecap="round"/>
          {/* Center dot */}
          <circle cx="60" cy="60" r="2.5" fill="#19D7C1"/>
          <circle cx="60" cy="60" r="1"   fill="#06131F"/>

          {/* Sparkle dots */}
          <circle cx="100" cy="25" r="2"   fill="#19D7C1" opacity="0.7"/>
          <circle cx="108" cy="35" r="1.2" fill="#F7C648"  opacity="0.6"/>
          <circle cx="15"  cy="80" r="1.5" fill="#19D7C1" opacity="0.5"/>
        </svg>
      </div>

      {/* Text */}
      <div className="space-y-2">
        <h2 className="font-display text-xl font-semibold text-shd-white">
          No clocks yet
        </h2>
        <p className="max-w-xs font-body text-sm leading-relaxed text-shd-white/50">
          Add your first world clock widget — pick any country, digital or analog.
        </p>
      </div>

      {/* Inline CTA */}
      <button
        onClick={onAdd}
        className="flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-5 py-2.5 font-display text-sm font-semibold text-teal transition-all duration-200 hover:bg-teal/20 hover:border-teal/60"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M7 1v12M1 7h12"/>
        </svg>
        Add your first clock
      </button>
    </div>
  )
}
