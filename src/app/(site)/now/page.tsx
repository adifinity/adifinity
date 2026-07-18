import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity/visual-editing'

import { DisableDraftMode } from '@/components/disable-draft-mode'
import { EmptyNote } from '@/components/empty-note'
import { formatDate, updateLabel } from '@/lib/entry-meta'
import { archiveFetch } from '@/sanity/lib/fetch'
import { SanityLive } from '@/sanity/lib/live'
import { NOW_QUERY, type NowUpdate } from '@/sanity/lib/queries'

export const metadata: Metadata = {
  title: 'Now',
  description:
    'The living page of the archive — what is being studied, read, researched, built and practised at the moment.',
  alternates: { canonical: '/now' },
}

// Now — the working ledger of the present. Deliberately lightweight,
// like the currentUpdate schema itself: dated lines with labels, read
// at a glance. The homepage's Latest Update is the single most recent
// line from this ledger; the Featured Current Entry is a separate,
// manually chosen concept. Neither is merged here.
export default async function NowPage() {
  const { data } = await archiveFetch({ query: NOW_QUERY })
  const updates = (data as NowUpdate[] | null) ?? []
  const isDraftMode = (await draftMode()).isEnabled

  return (
    <div className="mx-auto max-w-7xl px-6">
      <section className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-8">
          <p className="font-mono text-meta uppercase text-graphite">Now · Working ledger</p>
          <h1 className="mt-6 font-serif text-display text-ink">Now</h1>
          <p className="mt-6 max-w-[58ch] font-serif text-lede text-ink">
            What the archive is organised around at the moment. This page
            changes as the work does.
          </p>

          {updates.length > 0 ? (
            <ul className="mt-12">
              {updates.map((update) => (
                <li key={update._id} className="border-t border-rule py-5">
                  <p className="font-mono text-meta uppercase text-annotation">
                    {[updateLabel(update.label), formatDate(update.date)]
                      .filter(Boolean)
                      .join(' — ')}
                  </p>
                  <p className="mt-2 font-serif text-h3 text-ink">{update.title}</p>
                  {update.description && (
                    <p className="mt-2 max-w-[58ch] font-serif text-body text-graphite">
                      {update.description}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <EmptyNote className="mt-12">
              No current updates are recorded. The ledger fills as the work
              moves.
            </EmptyNote>
          )}
        </div>
        <aside aria-label="Marginal note" className="lg:col-span-3 lg:col-start-10">
          <div className="border-t border-rule pt-4">
            <p className="font-mono text-meta uppercase text-graphite">About this page</p>
            <p className="mt-3 font-serif text-caption italic leading-relaxed text-graphite">
              A running record, not a promise. The homepage carries the single
              most recent line from this ledger.
            </p>
          </div>
        </aside>
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
