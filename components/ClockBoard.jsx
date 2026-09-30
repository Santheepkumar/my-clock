'use client'
import { useState } from 'react'
import AppHeader      from './AppHeader'
import ClockWidget    from './ClockWidget'
import EmptyState     from './EmptyState'
import AddWidgetModal from './AddWidgetModal'
import { useWidgets } from '@/hooks/useWidgets'

/**
 * ClockBoard — the main page shell.
 * Composes header, hero, widget grid, empty state, and modal.
 */
export default function ClockBoard() {
  const { widgets, addWidget, removeWidget, toggleMode, loaded } = useWidgets()
  const [showModal, setShowModal] = useState(false)

  const openModal  = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  const handleAdd = (tzEntry, mode) => {
    addWidget(tzEntry, mode)
  }

  return (
    <div className="flex min-h-screen flex-col bg-midnight">

      {/* ── App Header ──────────────────────────────────────────────── */}
      <AppHeader />

      {/* ── Main Content ────────────────────────────────────────────── */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">

        {/* Hero section */}
        <section className="mb-10 text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-shd-white sm:text-5xl">
            Your World Clocks
          </h1>
          <p className="mt-3 font-body text-base text-shd-white/50 sm:text-lg">
            Track time across the globe — digital or analog, your way.
          </p>

          {/* CTA button */}
          <div className="mt-8">
            <button
              onClick={openModal}
              className={[
                'inline-flex items-center gap-2.5 rounded-full px-7 py-3.5',
                'font-display text-base font-bold text-midnight',
                'bg-teal shadow-teal-glow transition-all duration-300',
                'hover:brightness-110 hover:shadow-[0_0_40px_6px_rgba(25,215,193,0.35)]',
                'active:scale-95',
                'animate-teal-pulse focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-midnight',
              ].join(' ')}
              aria-label="Create a new clock widget"
            >
              {/* + icon */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M9 1v16M1 9h16"/>
              </svg>
              Create Clock Widget
            </button>
          </div>

          {/* Widget count badge */}
          {loaded && widgets.length > 0 && (
            <p className="mt-4 font-body text-xs text-shd-white/30">
              {widgets.length} widget{widgets.length !== 1 ? 's' : ''} — saved locally
            </p>
          )}
        </section>

        {/* ── Widget Grid or Empty State ─────────────────────────────── */}
        {!loaded ? (
          /* Skeleton shimmer while hydrating from localStorage */
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2].map(i => (
              <div
                key={i}
                className="h-52 animate-pulse rounded-brand-md border border-teal/10 bg-ocean/50"
              />
            ))}
          </div>
        ) : widgets.length === 0 ? (
          <EmptyState onAdd={openModal} />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {widgets.map(w => (
              <ClockWidget
                key={w.id}
                id={w.id}
                flag={w.flag}
                country={w.country}
                city={w.city}
                tz={w.tz}
                mode={w.mode}
                onRemove={removeWidget}
                onToggle={toggleMode}
              />
            ))}

            {/* "Add another" ghost card — always visible when widgets exist */}
            <button
              onClick={openModal}
              aria-label="Add another clock widget"
              className={[
                'group flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-brand-md',
                'border border-dashed border-teal/20 bg-transparent text-shd-white/30',
                'transition-all duration-200 hover:border-teal/50 hover:bg-teal/5 hover:text-teal/70',
              ].join(' ')}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-current transition-all duration-200 group-hover:bg-teal/10">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M8 1v14M1 8h14"/>
                </svg>
              </div>
              <span className="font-display text-xs font-semibold uppercase tracking-widest">
                Add Clock
              </span>
            </button>
          </div>
        )}
      </main>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <footer className="border-t border-teal/8 py-6 text-center">
        <p className="font-body text-xs text-shd-white/25">
          Open source · built with ♥ by{' '}
          <a
            href="https://strawhatdevs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-shd-white/40 underline-offset-2 hover:text-teal hover:underline"
          >
            Straw Hat Devs
          </a>
        </p>
      </footer>

      {/* ── Modal (portal-style conditional render) ──────────────────── */}
      {showModal && (
        <AddWidgetModal onAdd={handleAdd} onClose={closeModal} />
      )}
    </div>
  )
}
