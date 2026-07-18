import type { Metadata } from 'next'
import Link from 'next/link'
import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity/visual-editing'

import { DisableDraftMode } from '@/components/disable-draft-mode'
import { EmptyNote } from '@/components/empty-note'
import { clean, formatDate, noteTypeLabel } from '@/lib/entry-meta'
import { archiveFetch } from '@/sanity/lib/fetch'
import { SanityLive } from '@/sanity/lib/live'
import { NOTES_INDEX_QUERY, type NoteListItem } from '@/sanity/lib/queries'

export const metadata: Metadata = {
  title: 'Notes',
  description:
    'Working notes from the archive — reflections, observations, arguments and fragments, lighter and more immediate than Work.',
  alternates: { canonical: '/notes' },
}

// Notes — the light, immediate layer: a chronological editorial ledger,
// not a blog.
export default async function NotesIndexPage() {
  const { data } = await archiveFetch({ query: NOTES_INDEX_QUERY })
  const notes = (data as NoteListItem[] | null) ?? []
  const isDraftMode = (await draftMode()).isEnabled

  return (
    <div className="mx-auto max-w-7xl px-6">
      <section className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-8">
          <p className="font-mono text-meta uppercase text-graphite">Notes · Working layer</p>
          <h1 className="mt-6 font-serif text-display text-ink">Notes</h1>
          <p className="mt-6 max-w-[58ch] font-serif text-lede text-ink">
            The lighter layer of the archive — reflections, observations,
            arguments and working fragments, filed as they are written.
          </p>
        </div>
      </section>

      <section aria-label="All notes" className="pb-24">
        {notes.length > 0 ? (
          <ul>
            {notes.map((note) => {
              const slug = clean(note.slug)
              const inner = (
                <div className="py-6">
                  <p className="font-mono text-meta uppercase text-graphite">
                    {[
                      'N',
                      noteTypeLabel(note.noteType),
                      formatDate(note.date),
                      note.estimatedReadingTime ? `${note.estimatedReadingTime} min` : null,
                    ]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                  <p className="mt-2 font-serif text-h2 text-ink transition-colors group-hover:text-annotation">
                    {note.title}
                  </p>
                  {note.summary && (
                    <p className="mt-2 max-w-[62ch] font-serif text-body text-graphite">
                      {note.summary}
                    </p>
                  )}
                </div>
              )
              return (
                <li key={note._id} className="border-t border-rule">
                  {slug ? (
                    <Link href={`/notes/${slug}`} className="group block">
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
            No notes are on public display yet. They will be filed here as
            they are written and published.
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
