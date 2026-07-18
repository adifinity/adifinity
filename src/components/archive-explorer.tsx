'use client'

import Link from 'next/link'
import { useMemo, useSyncExternalStore } from 'react'

// The Archive's filterable catalogue. The complete gated result set is
// fetched server-side and arrives as serializable props — this island
// never talks to Sanity. Filter state lives entirely in the URL
// (shareable, back/forward-safe) through useSyncExternalStore, so
// server HTML and hydration always agree: the full list renders first,
// and any deep-linked filters apply the moment the island wakes.

export type ArchiveDisplayEntry = {
  id: string
  /** Raw CMS strings — stega-encoded, render directly. */
  title: string | null
  summary: string | null
  context: string | null
  /** Derived, stega-clean. */
  label: string
  href: string | null
  typeLabel: string
  keys: {
    type: string
    category: string | null
    year: string | null
    themes: string[]
    haystack: string
  }
}

export type ArchiveFacets = {
  types: { value: string; label: string }[]
  categories: { value: string; label: string }[]
  years: string[]
  themes: string[]
}

const PARAM_KEYS = ['q', 'type', 'category', 'year', 'theme'] as const

const subscribe = (callback: () => void) => {
  window.addEventListener('popstate', callback)
  window.addEventListener('archive:params', callback)
  return () => {
    window.removeEventListener('popstate', callback)
    window.removeEventListener('archive:params', callback)
  }
}
const getSnapshot = () => window.location.search
const getServerSnapshot = () => ''

function setParam(key: string, value: string | null) {
  const params = new URLSearchParams(window.location.search)
  if (value) params.set(key, value)
  else params.delete(key)
  const query = params.toString()
  window.history.replaceState(null, '', query ? `?${query}` : window.location.pathname)
  window.dispatchEvent(new Event('archive:params'))
}

function FilterGroup({
  label,
  options,
  active,
  onSelect,
}: {
  label: string
  options: { value: string; label: string }[]
  active: string | null
  onSelect: (value: string | null) => void
}) {
  if (options.length === 0) return null
  return (
    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
      <span className="font-mono text-meta uppercase text-graphite">{label}</span>
      {options.map((option) => {
        const isActive = active === option.value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(isActive ? null : option.value)}
            className={`font-mono text-meta uppercase transition-colors ${
              isActive ? 'text-annotation underline underline-offset-4' : 'text-ink hover:text-annotation'
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

export function ArchiveExplorer({
  entries,
  facets,
}: {
  entries: ArchiveDisplayEntry[]
  facets: ArchiveFacets
}) {
  const search = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const params = useMemo(() => new URLSearchParams(search), [search])
  const q = params.get('q') ?? ''
  const type = params.get('type')
  const category = params.get('category')
  const year = params.get('year')
  const theme = params.get('theme')
  const anyFilter = PARAM_KEYS.some((key) => params.get(key))

  const visible = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return entries.filter((entry) => {
      if (type && entry.keys.type !== type) return false
      if (category && entry.keys.category !== category) return false
      if (year && entry.keys.year !== year) return false
      if (theme && !entry.keys.themes.includes(theme)) return false
      if (needle && !entry.keys.haystack.includes(needle)) return false
      return true
    })
  }, [entries, q, type, category, year, theme])

  return (
    <div>
      <div role="search" aria-label="Search the archive" className="border-t border-rule pt-6">
        <label className="block">
          <span className="font-mono text-meta uppercase text-graphite">Search the catalogue</span>
          <input
            type="search"
            value={q}
            onChange={(event) => setParam('q', event.target.value || null)}
            placeholder="title, place, theme…"
            className="mt-2 w-full max-w-[36ch] border-b border-rule bg-transparent pb-1 font-serif text-body text-ink placeholder:italic placeholder:text-graphite focus:border-annotation focus:outline-none"
          />
        </label>
        <div className="mt-5 space-y-2">
          <FilterGroup
            label="Type"
            options={facets.types}
            active={type}
            onSelect={(value) => setParam('type', value)}
          />
          <FilterGroup
            label="Category"
            options={facets.categories}
            active={category}
            onSelect={(value) => setParam('category', value)}
          />
          <FilterGroup
            label="Year"
            options={facets.years.map((value) => ({ value, label: value }))}
            active={year}
            onSelect={(value) => setParam('year', value)}
          />
          <FilterGroup
            label="Themes & methods"
            options={facets.themes.map((value) => ({ value, label: value }))}
            active={theme}
            onSelect={(value) => setParam('theme', value)}
          />
        </div>
        <p aria-live="polite" className="mt-5 font-mono text-meta uppercase text-graphite">
          {visible.length} of {entries.length} entries
          {anyFilter && (
            <>
              {' · '}
              <button
                type="button"
                onClick={() => {
                  window.history.replaceState(null, '', window.location.pathname)
                  window.dispatchEvent(new Event('archive:params'))
                }}
                className="uppercase text-ink underline underline-offset-4 transition-colors hover:text-annotation"
              >
                Reset
              </button>
            </>
          )}
        </p>
      </div>

      {visible.length > 0 ? (
        <ul className="mt-6">
          {visible.map((entry) => {
            const inner = (
              <>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <p className="font-serif text-h3 text-ink transition-colors group-hover:text-annotation">
                    {entry.title}
                  </p>
                  <p className="shrink-0 font-mono text-meta uppercase text-graphite">
                    {entry.label}
                  </p>
                </div>
                {entry.summary && (
                  <p className="mt-1 max-w-[62ch] font-serif text-caption text-graphite">
                    {entry.summary}
                  </p>
                )}
                {entry.context && (
                  <p className="mt-1 font-mono text-meta uppercase text-graphite">{entry.context}</p>
                )}
              </>
            )
            return (
              <li key={entry.id} className="border-b border-rule py-5">
                {entry.href ? (
                  <Link href={entry.href} className="group block">
                    {inner}
                  </Link>
                ) : (
                  inner
                )}
              </li>
            )
          })}
        </ul>
      ) : (
        <p className="mt-10 font-serif text-body italic text-graphite">
          Nothing in the catalogue matches. Loosen the filters, or reset them.
        </p>
      )}
    </div>
  )
}
