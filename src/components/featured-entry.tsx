import Link from 'next/link'
import { stegaClean } from 'next-sanity'

import { EmptyNote } from './empty-note'
import { MetaLine } from './meta-line'
import { Plate } from './plate'
import {
  categoryLabel,
  clean,
  formatDate,
  formatDateRange,
  phaseLabel,
  updateLabel,
  yearOf,
} from '@/lib/entry-meta'
import type { FeaturedEntry as FeaturedEntryPayload } from '@/sanity/lib/queries'

// The homepage's dominant editorial element: the manually chosen
// Featured Current Entry. The reference is polymorphic — workItem,
// experience, or currentUpdate — and each type gets an honest
// treatment. Only a workItem has a public destination today, so only it
// carries the "Read the entry" reference; a currentUpdate is a current
// statement, never a teaser to a page that doesn't exist.
export function FeaturedEntry({ entry }: { entry: FeaturedEntryPayload | null }) {
  if (!entry) {
    return (
      <EmptyNote className="mt-10">
        The archive has not marked a current focus yet. One will be filed here.
      </EmptyNote>
    )
  }

  const type = stegaClean(entry._type)
  const slug = clean(entry.slug)

  const metaParts =
    type === 'workItem'
      ? ['W', yearOf(entry.dateRange?.startDate), categoryLabel(entry.primaryCategory), formatDateRange(entry.dateRange), phaseLabel(entry.phase)]
      : type === 'experience'
        ? ['X', yearOf(entry.dateRange?.startDate), formatDateRange(entry.dateRange), phaseLabel(entry.phase)]
        : ['U', yearOf(entry.date), updateLabel(entry.label), formatDate(entry.date)]

  const body = type === 'currentUpdate' ? entry.description : entry.summary
  const href = type === 'workItem' && slug ? `/work/${slug}` : null

  return (
    <article
      aria-labelledby="featured-title"
      data-ledger="article"
      className="mt-10 border-t border-rule pt-8"
    >
      <p className="font-mono text-meta uppercase text-annotation">Currently</p>
      <h2 id="featured-title" className="mt-4 max-w-[20ch] font-serif text-display text-ink">
        {entry.title}
      </h2>
      {type === 'experience' && (entry.roleTitle || entry.organisation) && (
        <p className="mt-3 font-serif text-lede text-graphite">
          {entry.roleTitle}
          {entry.roleTitle && entry.organisation && ' — '}
          {entry.organisation}
        </p>
      )}
      <MetaLine className="mt-4" parts={metaParts} />
      {body && <p className="mt-5 max-w-[58ch] font-serif text-lede text-ink">{body}</p>}
      {href && (
        <p className="mt-6">
          <Link
            href={href}
            className="font-sans text-caption text-ink underline decoration-1 underline-offset-4 transition-colors hover:text-annotation"
          >
            Read the entry<span aria-hidden="true"> →</span>
          </Link>
        </p>
      )}
      <Plate
        image={entry.coverMedia}
        width={640}
        height={427}
        sizes="(min-width: 1024px) 640px, 100vw"
        className="mt-8 max-w-[640px]"
      />
    </article>
  )
}
