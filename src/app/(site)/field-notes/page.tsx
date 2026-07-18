import type { Metadata } from 'next'
import Link from 'next/link'
import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity/visual-editing'

import { DisableDraftMode } from '@/components/disable-draft-mode'
import { EmptyNote } from '@/components/empty-note'
import { clean, formatDate } from '@/lib/entry-meta'
import { archiveFetch } from '@/sanity/lib/fetch'
import { SanityLive } from '@/sanity/lib/live'
import { FIELD_NOTES_INDEX_QUERY, type FieldNoteListItem } from '@/sanity/lib/queries'

export const metadata: Metadata = {
  title: 'Field Notes',
  description:
    'Field notes from the archive — observations collected from places, dated and filed as evidence.',
  alternates: { canonical: '/field-notes' },
}

// Field Notes — evidence collected from places. Place-led rows with the
// distilled observation as the extract.
export default async function FieldNotesIndexPage() {
  const { data } = await archiveFetch({ query: FIELD_NOTES_INDEX_QUERY })
  const fieldNotes = (data as FieldNoteListItem[] | null) ?? []
  const isDraftMode = (await draftMode()).isEnabled

  return (
    <div className="mx-auto max-w-7xl px-6">
      <section className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-8">
          <p className="font-mono text-meta uppercase text-graphite">Field Notes · Evidence</p>
          <h1 className="mt-6 font-serif text-display text-ink">Field Notes</h1>
          <p className="mt-6 max-w-[58ch] font-serif text-lede text-ink">
            Observations collected from places — dated, located, and filed as
            evidence rather than itinerary.
          </p>
        </div>
      </section>

      <section aria-label="All field notes" className="pb-24">
        {fieldNotes.length > 0 ? (
          <ul>
            {fieldNotes.map((fieldNote) => {
              const slug = clean(fieldNote.slug)
              const inner = (
                <div className="py-6">
                  <p className="font-mono text-meta uppercase text-graphite">
                    {['FN', formatDate(fieldNote.dateVisited ?? fieldNote.date)]
                      .filter(Boolean)
                      .join(' · ')}
                    {fieldNote.locationName && (
                      <>
                        {' · '}
                        <span>{fieldNote.locationName}</span>
                      </>
                    )}
                    {fieldNote.country && (
                      <>
                        {', '}
                        <span>{fieldNote.country}</span>
                      </>
                    )}
                  </p>
                  <p className="mt-2 font-serif text-h2 text-ink transition-colors group-hover:text-annotation">
                    {fieldNote.title}
                  </p>
                  {fieldNote.observation ? (
                    <p className="mt-2 max-w-[62ch] font-serif text-body italic text-graphite">
                      {fieldNote.observation}
                    </p>
                  ) : (
                    fieldNote.summary && (
                      <p className="mt-2 max-w-[62ch] font-serif text-body text-graphite">
                        {fieldNote.summary}
                      </p>
                    )
                  )}
                </div>
              )
              return (
                <li key={fieldNote._id} className="border-t border-rule">
                  {slug ? (
                    <Link href={`/field-notes/${slug}`} className="group block">
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
          <EmptyNote className="mt-4">
            No field notes are on public display yet. They will be filed here
            as places are visited and written up.
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
