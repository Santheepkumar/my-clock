/**
 * Offline fallback page — shown by the service worker when
 * the user has no internet and the page isn't cached yet.
 */
export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-midnight px-6 text-center">

      {/* Globe illustration */}
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-teal/10 blur-2xl" />
        <svg
          width="96"
          height="96"
          viewBox="0 0 96 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative"
          role="img"
          aria-label="Offline globe"
        >
          <circle cx="48" cy="48" r="42" fill="#0B2236" stroke="#19D7C1" strokeWidth="1.5" opacity="0.7"/>
          {/* Latitude lines */}
          <ellipse cx="48" cy="48" rx="42" ry="16" fill="none" stroke="#19D7C1" strokeWidth="0.8" opacity="0.2"/>
          {/* Longitude lines */}
          <line x1="48" y1="6" x2="48" y2="90" stroke="#19D7C1" strokeWidth="0.8" opacity="0.2"/>
          <path d="M20 48 Q48 20 76 48 Q48 76 20 48Z" fill="none" stroke="#19D7C1" strokeWidth="0.8" opacity="0.2"/>
          {/* Broken wifi / no-signal symbol */}
          <g fill="none" stroke="#F7C648" strokeWidth="2.5" strokeLinecap="round">
            {/* Crossed out wifi arcs */}
            <path d="M30 42 Q48 28 66 42" opacity="0.25"/>
            <path d="M35 50 Q48 40 61 50" opacity="0.25"/>
            {/* X mark */}
            <path d="M39 38 L57 56"/>
            <path d="M57 38 L39 56"/>
          </g>
          {/* Center dot */}
          <circle cx="48" cy="62" r="3" fill="#19D7C1" opacity="0.7"/>
        </svg>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <h1 className="font-display text-2xl font-bold text-shd-white">
          You&rsquo;re offline
        </h1>
        <p className="mx-auto max-w-xs font-body text-sm leading-relaxed text-shd-white/50">
          No internet connection detected. Your saved clocks are still available —
          just reconnect to add new ones.
        </p>
      </div>

      {/* Retry CTA */}
      <a
        href="/"
        className="inline-flex items-center gap-2 rounded-full bg-teal px-6 py-2.5 font-display text-sm font-bold text-midnight shadow-teal-glow transition-all hover:brightness-110 active:scale-95"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M1 7a6 6 0 1 0 6-6"/>
          <path d="M1 3v4h4"/>
        </svg>
        Try again
      </a>

      {/* Footer */}
      <p className="font-body text-[11px] text-shd-white/25">
        WorldClock — a Straw Hat Devs tool
      </p>
    </div>
  )
}
