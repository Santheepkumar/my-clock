'use client'

/**
 * AppHeader — slim utility header for the WorldClock tool.
 * Brand-aware but NOT the main Straw Hat Devs hero bar.
 * Left: hat icon + "WorldClock" in teal
 * Right: "a Straw Hat Devs tool" attribution
 */
export default function AppHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-teal/10 bg-ocean/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">

        {/* ── Left: icon + tool name ─────────────────────────────────── */}
        <div className="flex items-center gap-2.5">
          {/* Inline brand icon (hat) — 32px, minimum digital icon size */}
          <span className="inline-flex shrink-0" aria-hidden="true">
            <svg
              width="32"
              height="32"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Straw Hat Devs icon"
            >
              <defs>
                <linearGradient id="hgold" x1="0" y1="0" x2="1" y2="1">
                  <stop stopColor="#FFF2A8"/>
                  <stop offset=".48" stopColor="#F7C648"/>
                  <stop offset="1" stopColor="#D8871D"/>
                </linearGradient>
                <linearGradient id="hteal" x1="0" y1="0" x2="1" y2="0">
                  <stop stopColor="#00666F"/>
                  <stop offset=".5" stopColor="#19D7C1"/>
                  <stop offset="1" stopColor="#079D9B"/>
                </linearGradient>
              </defs>
              <circle cx="512" cy="512" r="480" fill="#0B2236"/>
              <circle cx="512" cy="512" r="451" fill="none" stroke="#19D7C1" strokeWidth="5" opacity=".38"/>
              <g transform="rotate(-7 512 600)">
                <path d="M512 571C706 571 848 624 875 702C841 787 699 838 512 838C325 838 183 787 149 702C176 624 318 571 512 571Z" fill="url(#hgold)" stroke="#8E420E" strokeWidth="24"/>
                <path d="M321 603C331 493 348 376 393 297C420 249 461 224 512 224C563 224 604 249 631 297C676 376 693 493 703 603Z" fill="url(#hgold)" stroke="#8E420E" strokeWidth="24"/>
                <path d="M315 515C430 546 594 546 709 515L721 636C592 669 432 669 303 636Z" fill="url(#hteal)" stroke="#053846" strokeWidth="20"/>
                <g fill="none" stroke="#F8FDFF" strokeWidth="36" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M448 566L397 600L448 634M576 566L627 600L576 634M548 548L476 651"/>
                </g>
              </g>
            </svg>
          </span>

          <span className="font-display text-lg font-bold tracking-tight text-teal">
            WorldClock
          </span>

          {/* Beta badge */}
          <span className="hidden rounded-full border border-teal/30 px-2 py-0.5 font-code text-[10px] font-medium uppercase tracking-widest text-teal/70 sm:inline-block">
            beta
          </span>
        </div>

        {/* ── Right: attribution ────────────────────────────────────── */}
        <a
          href="https://strawhatdevs.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 font-body text-xs text-shd-white/40 transition-colors duration-200 hover:text-shd-white/70"
          title="Visit Straw Hat Devs"
        >
          <span className="hidden sm:inline">a</span>
          <span className="font-semibold text-shd-white/55">Straw Hat Devs</span>
          <span className="hidden sm:inline">tool</span>
          {/* external link icon */}
          <svg
            width="10"
            height="10"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 2H2a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1V7"/>
            <path d="M8 1h3m0 0v3m0-3L5.5 6.5"/>
          </svg>
        </a>
      </div>
    </header>
  )
}
