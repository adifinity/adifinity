import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { VisualEditing } from 'next-sanity/visual-editing'

import { DisableDraftMode } from '@/components/disable-draft-mode'
import { MetaLine } from '@/components/meta-line'
import { Plate } from '@/components/plate'
import { PortableProse } from '@/components/portable-prose'
import { RelatedEntries } from '@/components/related-entries'
import { clean, formatDate, noteTypeLabel, yearOf } from '@/lib/entry-meta'
import { archiveFetch } from '@/sanity/lib/fetch'
import { SanityLive } from '@/sanity/lib/live'
import {
  ENTRY_META_QUERY,
  NOTE_DETAIL_QUERY,
  type NoteDetailPayload,
  type WorkMetaPayload,
} from '@/sanity/lib/queries'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const { data } = await archiveFetch({
    query: ENTRY_META_QUERY,
    params: { type: 'note', slug },
  })
  const meta = data as WorkMetaPayload | null
  if (!meta) return { title: 'Notes' }
  const title = clean(meta.seo?.seoTitle) ?? clean(meta.title) ?? 'Notes'
  const description = clean(meta.seo?.seoDescription) ?? clean(meta.summary) ?? undefined
  return {
    title,
    description,
    alternates: { canonical: `/notes/${slug}` },
    openGraph: { title, description, url: `/notes/${slug}`, type: 'article' },
  }
}

// A note — lighter and more immediate than a Work entry: metadata,
// title, the prose itself, and its marginalia.
export default async function NoteDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { data } = await archiveFetch({ query: NOTE_DETAIL_QUERY, params: { slug } })
  const note = data as NoteDetailPayload | null
  const isDraftMode = (await draftMode()).isEnabled

  if (!note) notFound()

  const related = note.relatedEntries ?? []

  return (
    <div className="mx-auto max-w-7xl px-6">
      <article className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-8">
          <MetaLine
            parts={[
              'N',
              yearOf(note.date),
              noteTypeLabel(note.noteType),
              formatDate(note.date),
              note.estimatedReadingTime ? `${note.estimatedReadingTime} min` : null,
            ]}
          />
          <h1 className="mt-4 max-w-[24ch] font-serif text-display text-ink">{note.title}</h1>
          {note.summary && (
            <p className="mt-6 max-w-[58ch] font-serif text-lede text-ink">{note.summary}</p>
          )}
          <Plate
            image={note.coverMedia}
            width={800}
            height={533}
            sizes="(min-width: 1024px) 800px, 100vw"
            className="mt-10"
          />
          {Array.isArray(note.body) && note.body.length > 0 && (
            <div className="mt-10">
              <PortableProse value={note.body} />
            </div>
          )}
        </div>

        {related.length > 0 && (
          <aside aria-label="In the margin" className="lg:col-span-3 lg:col-start-10">
            <div className="border-t border-rule pt-4">
              <RelatedEntries entries={related} />
            </div>
          </aside>
        )}
      </article>

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
