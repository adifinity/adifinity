import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity/visual-editing'

import {
  ArchiveExplorer,
  type ArchiveDisplayEntry,
  type ArchiveFacets,
} from '@/components/archive-explorer'
import { DisableDraftMode } from '@/components/disable-draft-mode'
import { EmptyNote } from '@/components/empty-note'
import { catalogLabel, categoryLabel, clean, noteTypeLabel } from '@/lib/entry-meta'
import { archiveFetch } from '@/sanity/lib/fetch'
import { SanityLive } from '@/sanity/lib/live'
import {
  ARCHIVE_QUERY,
  type ArchiveEntry,
  type ArchiveFragment,
} from '@/sanity/lib/queries'
import { PRIMARY_CATEGORY_OPTIONS } from '@/sanity/schemaTypes/lib/options'

export const metadata: Metadata = {
  title: 'Archive',
  description:
    'The complete catalogue of the archive — every filed entry across work, notes, field notes, experience and reading.',
  alternates: { canonical: '/archive' },
}

const TYPE_LABELS: Record<ArchiveEntry['_type'], string> = {
  workItem: 'Work',
  note: 'Note',
  fieldNote: 'Field note',
  experience: 'Experience',
  readingEntry: 'Reading',
}

const ROUTE_BASE: Partial<Record<ArchiveEntry['_type'], string>> = {
  workItem: '/work',
  note: '/notes',
  fieldNote: '/field-notes',
}

// Archive — the complete catalogue. The full gated result set is
// assembled here on the server (facets included); the client island
// only filters what it was given. Experience and reading entries are
// deliberately non-clickable records: neither carries enough standalone
// body to justify a destination page, and neither is in the approved
// sitemap.
export default async function ArchivePage() {
  const { data } = await archiveFetch({ query: ARCHIVE_QUERY })
  const raw = (data as ArchiveEntry[] | null) ?? []
  const isDraftMode = (await draftMode()).isEnabled

  const entries: ArchiveDisplayEntry[] = raw.map((entry) => {
    const slug = clean(entry.slug)
    const base = ROUTE_BASE[entry._type]
    const themes = [
      ...(entry.secondaryThemes ?? []),
      ...(entry.methods ?? []),
      ...(entry.genreOrTheme ?? []),
    ]
      .map((theme) => clean(theme))
      .filter((theme): theme is string => Boolean(theme))
    const summary =
      entry.summary ?? (entry._type === 'readingEntry' ? entry.highlightOrIdea : null)
    const context =
      entry._type === 'experience'
        ? [entry.organisation, entry.roleTitle].filter(Boolean).join(' — ') || null
        : entry._type === 'readingEntry'
          ? entry.author
          : null
    const haystack = [
      clean(entry.title),
      clean(entry.summary),
      clean(entry.highlightOrIdea),
      clean(entry.author),
      clean(entry.locationName),
      clean(entry.country),
      clean(entry.organisation),
      clean(entry.roleTitle),
      categoryLabel(entry.primaryCategory),
      noteTypeLabel(entry.noteType),
      TYPE_LABELS[entry._type],
      ...themes,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

    return {
      id: entry._id,
      title: entry.title,
      summary,
      context,
      label: catalogLabel(entry as unknown as ArchiveFragment),
      href: base && slug ? `${base}/${slug}` : null,
      typeLabel: TYPE_LABELS[entry._type],
      keys: {
        type: entry._type,
        category: clean(entry.primaryCategory),
        year: clean(entry.sortDate)?.slice(0, 4) ?? null,
        themes,
        haystack,
      },
    }
  })

  const facets: ArchiveFacets = {
    types: (Object.keys(TYPE_LABELS) as ArchiveEntry['_type'][])
      .filter((type) => entries.some((entry) => entry.keys.type === type))
      .map((type) => ({ value: type, label: TYPE_LABELS[type] })),
    categories: PRIMARY_CATEGORY_OPTIONS.filter((option) =>
      entries.some((entry) => entry.keys.category === option.value),
    ).map((option) => ({ value: option.value, label: option.title })),
    years: [...new Set(entries.map((entry) => entry.keys.year).filter(Boolean) as string[])].sort(
      (a, b) => b.localeCompare(a),
    ),
    themes: [...new Set(entries.flatMap((entry) => entry.keys.themes))].sort((a, b) =>
      a.localeCompare(b),
    ),
  }

  return (
    <div className="mx-auto max-w-7xl px-6">
      <section className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-8">
          <p className="font-mono text-meta uppercase text-graphite">Archive · Complete catalogue</p>
          <h1 className="mt-6 font-serif text-display text-ink">Archive</h1>
          <p className="mt-6 max-w-[58ch] font-serif text-lede text-ink">
            Every filed entry, in one place — the record behind the curated
            pages.
          </p>
        </div>
      </section>

      <section aria-label="The catalogue" className="pb-24">
        {entries.length > 0 ? (
          <ArchiveExplorer entries={entries} facets={facets} />
        ) : (
          <EmptyNote className="mt-4">
            The catalogue is empty for now. Entries are filed here as they are
            published — work, notes, field notes, experience and reading.
          </EmptyNote>
        )}
      </section>

      <SanityLive />
      {isDraftMode && (
        <>
          <VisualEditing />
          <DisableDraftMode />
        </>
      )}
    </div>
  )
}
