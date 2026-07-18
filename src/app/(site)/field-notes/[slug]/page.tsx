import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { VisualEditing } from 'next-sanity/visual-editing'

import { DisableDraftMode } from '@/components/disable-draft-mode'
import { MetaLine } from '@/components/meta-line'
import { Plate } from '@/components/plate'
import { PortableProse } from '@/components/portable-prose'
import { RelatedEntries } from '@/components/related-entries'
import { clean, formatDate, yearOf } from '@/lib/entry-meta'
import { archiveFetch } from '@/sanity/lib/fetch'
import { SanityLive } from '@/sanity/lib/live'
import {
  ENTRY_META_QUERY,
  FIELD_NOTE_DETAIL_QUERY,
  type FieldNoteDetailPayload,
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
    params: { type: 'fieldNote', slug },
  })
  const meta = data as WorkMetaPayload | null
  if (!meta) return { title: 'Field Notes' }
  const title = clean(meta.seo?.seoTitle) ?? clean(meta.title) ?? 'Field Notes'
  const description = clean(meta.seo?.seoDescription) ?? clean(meta.summary) ?? undefined
  return {
    title,
    description,
    alternates: { canonical: `/field-notes/${slug}` },
    openGraph: { title, description, url: `/field-notes/${slug}`, type: 'article' },
  }
}

// A field note — evidence from a place. The distilled observation sits
// in the margin as the strongest extract; photographs are numbered
// plates; coordinates stay restrained metadata.
export default async function FieldNoteDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { data } = await archiveFetch({ query: FIELD_NOTE_DETAIL_QUERY, params: { slug } })
  const fieldNote = data as FieldNoteDetailPayload | null
  const isDraftMode = (await draftMode()).isEnabled

  if (!fieldNote) notFound()

  const gallery = (fieldNote.photoGallery ?? []).filter((image) => image?.asset?._ref)
  const related = fieldNote.relatedEntries ?? []
  const coverFigure = fieldNote.coverMedia?.asset?._ref ? 1 : 0
  const lat = fieldNote.coordinates?.lat
  const lng = fieldNote.coordinates?.lng
  const coordinatesLine =
    typeof lat === 'number' && typeof lng === 'number'
      ? `${lat.toFixed(4)}° · ${lng.toFixed(4)}°`
      : null

  return (
    <div className="mx-auto max-w-7xl px-6">
      <article className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-8">
          <MetaLine
            parts={['FN', yearOf(fieldNote.dateVisited ?? fieldNote.date), formatDate(fieldNote.dateVisited)]}
          />
          <h1 className="mt-4 max-w-[24ch] font-serif text-display text-ink">
            {fieldNote.title}
          </h1>
          {(fieldNote.locationName || fieldNote.country) && (
            <p className="mt-3 font-serif text-lede text-graphite">
              {fieldNote.locationName}
              {fieldNote.locationName && fieldNote.country && ', '}
              {fieldNote.country}
            </p>
          )}
          {fieldNote.summary && (
            <p className="mt-5 max-w-[58ch] font-serif text-lede text-ink">{fieldNote.summary}</p>
          )}
          <Plate
            image={fieldNote.coverMedia}
            width={800}
            height={533}
            sizes="(min-width: 1024px) 800px, 100vw"
            figure={coverFigure || undefined}
            className="mt-10"
          />
          {Array.isArray(fieldNote.body) && fieldNote.body.length > 0 && (
            <div className="mt-10">
              <PortableProse value={fieldNote.body} />
            </div>
          )}
          {gallery.length > 0 && (
            <section aria-labelledby="field-note-plates" className="mt-14">
              <h2 id="field-note-plates" className="font-serif text-h2 text-ink">
                Plates
              </h2>
              <div className="mt-2 space-y-10">
                {gallery.map((image, index) => (
                  <Plate
                    key={index}
                    image={image}
                    width={800}
                    height={533}
                    sizes="(min-width: 1024px) 800px, 100vw"
                    intrinsic={image.dims ?? null}
                    figure={coverFigure + index + 1}
                  />
                ))}
              </div>
            </section>
          )}
        </div>

        <aside aria-label="In the margin" className="flex flex-col gap-10 lg:col-span-3 lg:col-start-10">
          {fieldNote.observation && (
            <div className="border-t border-rule pt-4">
              <h2 className="font-mono text-meta uppercase text-annotation">Observation</h2>
              <p className="mt-3 font-serif text-lede italic leading-relaxed text-ink">
                {fieldNote.observation}
              </p>
            </div>
          )}
          {(coordinatesLine || fieldNote.mapLabel) && (
            <div className="border-t border-rule pt-4">
              <h2 className="font-mono text-meta uppercase text-graphite">Position</h2>
              {fieldNote.mapLabel && (
                <p className="mt-3 font-serif text-caption text-ink">{fieldNote.mapLabel}</p>
              )}
              {coordinatesLine && (
                <p className="mt-1 font-mono text-meta text-graphite">{coordinatesLine}</p>
              )}
            </div>
          )}
          {related.length > 0 && (
            <div className="border-t border-rule pt-4">
              <RelatedEntries entries={related} />
            </div>
          )}
        </aside>
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
