import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity/visual-editing'

import { DisableDraftMode } from '@/components/disable-draft-mode'
import { EmptyNote } from '@/components/empty-note'
import { WorkRow } from '@/components/work-row'
import { archiveFetch } from '@/sanity/lib/fetch'
import { SanityLive } from '@/sanity/lib/live'
import { WORK_INDEX_QUERY, type FeaturedWorkItem } from '@/sanity/lib/queries'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'The curated gallery of the archive — selected work with the evidence behind it, from research and institutions toward finance and strategy.',
  alternates: { canonical: '/work' },
}

// The curated Work index. Inclusion and order are editorial decisions
// made in the Studio through workItem.featuredOrder; the complete body
// of work belongs to the future Archive.
export default async function WorkIndexPage() {
  const { data } = await archiveFetch({ query: WORK_INDEX_QUERY })
  const items = (data as FeaturedWorkItem[] | null) ?? []
  const isDraftMode = (await draftMode()).isEnabled

  return (
    <div className="mx-auto max-w-7xl px-6">
      <section className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-8">
          <p className="font-mono text-meta uppercase text-graphite">Work · Curated</p>
          <h1 className="mt-6 font-serif text-display text-ink">Work</h1>
          <p className="mt-6 max-w-[58ch] font-serif text-lede text-ink">
            The curated gallery of the archive — selected pieces with the
            evidence behind them, ordered by hand.
          </p>
        </div>
        <aside aria-label="Marginal note" className="lg:col-span-3 lg:col-start-10">
          <div className="border-t border-rule pt-4">
            <p className="font-mono text-meta uppercase text-graphite">The wider archive</p>
            <p className="mt-3 font-serif text-caption italic leading-relaxed text-graphite">
              This page is the selection, not the record. The complete
              catalogue — every filed entry, in every category — opens with
              the Archive.
            </p>
          </div>
        </aside>
      </section>

      {/* Rows carry their own top rules — the ledger structure. */}
      <section aria-label="Selected work" className="pb-24">
        {items.length > 0 ? (
          <ul>
            {items.map((item) => (
              <WorkRow key={item._id} item={item} />
            ))}
          </ul>
        ) : (
          <EmptyNote className="mt-10">
            Nothing is on public display yet. Work is being prepared for the
            archive — entries appear here as they are published and filed.
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
