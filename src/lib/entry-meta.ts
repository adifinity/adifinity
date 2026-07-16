import { stegaClean } from 'next-sanity'

import { CONTENT_PHASE_OPTIONS, PRIMARY_CATEGORY_OPTIONS } from '@/sanity/schemaTypes/lib/options'
import type { ArchiveFragment, DateRangeValue } from '@/sanity/lib/queries'

// Derived metadata for the Marginalia annotation layer: catalog labels,
// date formatting, and value→label maps for the schemas' select fields.
//
// Everything here produces DERIVED strings (labels, dates, codes) that
// are safe to compose and transform. Editorial prose (titles, summaries,
// observations…) must never pass through these helpers — it renders
// directly in JSX so Sanity's stega click-to-edit encoding survives.

// stegaClean strips the invisible Visual Editing markers so values can
// be compared, parsed, or used in attributes (hrefs, date parsing).
export function clean(value: string | null | undefined): string | null {
  if (typeof value !== 'string') return null
  const cleaned = stegaClean(value)
  return typeof cleaned === 'string' && cleaned.length > 0 ? cleaned : null
}

// The following maps mirror non-exported option lists defined in the
// protected schema files (noteType.ts, currentUpdateType.ts,
// experienceType.ts). Values are stable schema data; duplicating the
// labels here avoids touching protected files just to add exports.
const NOTE_TYPE_LABELS: Record<string, string> = {
  reflection: 'Reflection',
  observation: 'Observation',
  argument: 'Argument',
  workingNote: 'Working note',
  fragment: 'Fragment',
}

const UPDATE_LABELS: Record<string, string> = {
  studying: 'Studying',
  reading: 'Reading',
  researching: 'Researching',
  building: 'Building',
  practising: 'Practising',
  preparing: 'Preparing',
  thinkingAbout: 'Thinking about',
}

const EXPERIENCE_TYPE_LABELS: Record<string, string> = {
  institution: 'Institution',
  leadership: 'Leadership',
  education: 'Education',
  practice: 'Practice',
}

export function noteTypeLabel(value: string | null | undefined): string | null {
  const v = clean(value)
  return v ? (NOTE_TYPE_LABELS[v] ?? v) : null
}

export function updateLabel(value: string | null | undefined): string | null {
  const v = clean(value)
  return v ? (UPDATE_LABELS[v] ?? v) : null
}

export function experienceTypeLabel(value: string | null | undefined): string | null {
  const v = clean(value)
  return v ? (EXPERIENCE_TYPE_LABELS[v] ?? v) : null
}

export function categoryLabel(value: string | null | undefined): string | null {
  const v = clean(value)
  if (!v) return null
  return PRIMARY_CATEGORY_OPTIONS.find((o) => o.value === v)?.title ?? v
}

// Short phase word ("Demonstrated", "Current", …) from the canonical
// option titles, e.g. "Demonstrated — shipped or completed".
export function phaseLabel(value: string | null | undefined): string | null {
  const v = clean(value)
  if (!v) return null
  const title = CONTENT_PHASE_OPTIONS.find((o) => o.value === v)?.title
  return title ? title.split(' — ')[0] : v
}

export function yearOf(date: string | null | undefined): string | null {
  const v = clean(date)
  if (!v) return null
  const match = v.match(/^(\d{4})/)
  return match ? match[1] : null
}

const DAY_FORMAT = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

const MONTH_FORMAT = new Intl.DateTimeFormat('en-GB', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

function parseDate(date: string | null | undefined): Date | null {
  const v = clean(date)
  if (!v) return null
  const parsed = new Date(`${v.slice(0, 10)}T00:00:00Z`)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

// "14 Jul 2026"
export function formatDate(date: string | null | undefined): string | null {
  const d = parseDate(date)
  return d ? DAY_FORMAT.format(d) : null
}

// "Jul 2026"
export function formatMonth(date: string | null | undefined): string | null {
  const d = parseDate(date)
  return d ? MONTH_FORMAT.format(d) : null
}

// "Mar 2026 — Jul 2026", "Jan 2024 — present", or just the start.
export function formatDateRange(range: DateRangeValue | null | undefined): string | null {
  if (!range) return null
  const start = formatMonth(range.startDate)
  if (!start) return null
  if (range.isOngoing) return `${start} — present`
  const end = formatMonth(range.endDate)
  return end ? `${start} — ${end}` : start
}

// The approved stable, non-sequential catalog label: TYPE · YEAR ·
// CATEGORY, built only from deterministic entry data. Missing segments
// are omitted rather than faked.
export function catalogLabel(fragment: ArchiveFragment): string {
  const parts: (string | null)[] = []
  switch (stegaClean(fragment._type)) {
    case 'workItem':
      parts.push('W', yearOf(fragment.dateRange?.startDate), categoryLabel(fragment.primaryCategory))
      break
    case 'note':
      parts.push('N', yearOf(fragment.date), noteTypeLabel(fragment.noteType))
      break
    case 'fieldNote':
      parts.push(
        'FN',
        yearOf(fragment.dateVisited ?? fragment.date),
        clean(fragment.country) ?? clean(fragment.locationName),
      )
      break
    case 'experience':
      parts.push('X', yearOf(fragment.dateRange?.startDate), experienceTypeLabel(fragment.experienceType))
      break
    case 'readingEntry':
      parts.push('R', yearOf(fragment.dateRead), 'Reading')
      break
  }
  return parts.filter(Boolean).join(' · ')
}
