import Link from 'next/link'
import { stegaClean } from 'next-sanity'

import { catalogLabel, clean } from '@/lib/entry-meta'
import type { ArchiveFragment, RelatedEntry } from '@/sanity/lib/queries'

// Related entries as authored marginalia — cross-references in the
// margin's voice, not a "related posts" grid. Each reference carries an
// editorial lead-in chosen by type, the entry's title, and its catalog
// context. Only workItem currently has a public route; every other type
// renders as a non-clickable contextual reference until its section of
// the archive opens. Capability stays connective: a restrained label
// with its honest Current/Emerging state, never a destination.

const LEAD_INS: Record<RelatedEntry['_type'], string> = {
  workItem: 'this connects to—',
  note: 'read alongside—',
  fieldNote: 'from the field—',
  readingEntry: 'read alongside—',
  experience: 'the institution behind this—',
  capability: 'capability exercised—',
}

function contextLine(entry: RelatedEntry): string {
  const type = stegaClean(entry._type)
  if (type === 'capability') {
    const phase = clean(entry.capabilityPhase)
    return ['Capability', phase === 'emerging' ? 'Emerging' : phase === 'current' ? 'Current' : null]
      .filter(Boolean)
      .join(' · ')
  }
  return catalogLabel(entry as unknown as ArchiveFragment)
}

export function RelatedEntries({ entries }: { entries: RelatedEntry[] | null | undefined }) {
  const usable = (entries ?? []).filter(
    (entry) => entry.title || entry.capabilityName,
  )
  if (usable.length === 0) return null

  return (
    <div>
      <h2 className="font-mono text-meta uppercase text-graphite">In the margin</h2>
      <ul className="mt-1">
        {usable.map((entry) => {
          const type = stegaClean(entry._type)
          const slug = clean(entry.slug)
          const href = type === 'workItem' && slug ? `/work/${slug}` : null
          const title = type === 'capability' ? entry.capabilityName : entry.title
          const body = (
            <>
              <p className="font-mono text-meta text-annotation">{LEAD_INS[type as RelatedEntry['_type']] ?? 'see also—'}</p>
              <p className="mt-1 font-serif text-caption text-ink">{title}</p>
              <p className="mt-1 font-mono text-meta uppercase text-graphite">{contextLine(entry)}</p>
              {type !== 'capability' && (entry.summary || entry.description) && (
                <p className="mt-1 font-serif text-caption italic leading-relaxed text-graphite">
                  {entry.summary ?? entry.description}
                </p>
              )}
            </>
          )
          return (
            <li key={entry._id} className="border-b border-rule py-3 last:border-b-0">
              {href ? (
                <Link href={href} className="group block">
                  {body}
                </Link>
              ) : (
                body
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
