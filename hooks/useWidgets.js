'use client'
import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'worldclock-widgets'

/**
 * Manages the list of clock widgets with localStorage persistence.
 * Returns widgets array + CRUD actions + a `loaded` flag to prevent SSR flash.
 */
export function useWidgets() {
  const [widgets, setWidgets] = useState([])
  const [loaded, setLoaded] = useState(false)

  // Hydrate from localStorage on mount (client only)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setWidgets(JSON.parse(raw))
    } catch {
      // corrupted data — start fresh
    }
    setLoaded(true)
  }, [])

  // Persist to localStorage whenever widgets change (after hydration)
  useEffect(() => {
    if (!loaded) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(widgets))
    } catch {
      // storage full or blocked — fail silently
    }
  }, [widgets, loaded])

  /** Add a new widget. tzEntry: { flag, country, city, tz } */
  const addWidget = useCallback((tzEntry, mode = 'digital') => {
    setWidgets(prev => [
      ...prev,
      {
        id:      `wc-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        flag:    tzEntry.flag,
        country: tzEntry.country,
        city:    tzEntry.city,
        tz:      tzEntry.tz,
        mode,
      },
    ])
  }, [])

  /** Remove a widget by id */
  const removeWidget = useCallback((id) => {
    setWidgets(prev => prev.filter(w => w.id !== id))
  }, [])

  /** Toggle a single widget between 'digital' and 'analog' */
  const toggleMode = useCallback((id) => {
    setWidgets(prev =>
      prev.map(w =>
        w.id === id
          ? { ...w, mode: w.mode === 'digital' ? 'analog' : 'digital' }
          : w
      )
    )
  }, [])

  return { widgets, addWidget, removeWidget, toggleMode, loaded }
}
