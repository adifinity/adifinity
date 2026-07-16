import Image from 'next/image'
import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity/visual-editing'

import { DisableDraftMode } from '@/components/disable-draft-mode'
import { ArchiveFragments } from '@/components/archive-fragments'
import { EmptyNote } from '@/components/empty-note'
import { FeaturedEntry } from '@/components/featured-entry'
import { LatestUpdate } from '@/components/latest-update'
import { SectionHeading } from '@/components/section-heading'
import { WorkRow } from '@/components/work-row'
import { clean, formatDate, noteTypeLabel, yearOf } from '@/lib/entry-meta'
import { IDENTITY_LINE, SITE_NAME, TRANSFORMATION_ARC } from '@/lib/site-copy'
import { archiveFetch } from '@/sanity/lib/fetch'
import { urlFor } from '@/sanity/lib/image'
import { SanityLive } from '@/sanity/lib/live'
import {
  ARCHIVE_FRAGMENTS_QUERY,
  LATEST_UPDATE_QUERY,
  RECENT_FIELD_NOTES_QUERY,
  RECENT_NOTES_QUERY,
  RECENT_READING_QUERY,
  SITE_SETTINGS_QUERY,
  type ArchiveFragment,
  type FieldNoteListItem,
  type LatestUpdatePayload,
  type NoteListItem,
  type ReadingListItem,
  type SiteSettingsPayload,
} from '@/sanity/lib/queries'

// The static settled homepage — the composition the Ledger Sort will
// later resolve into. Everything is CMS-driven through the preview-aware
// archiveFetch gatekeeper; every section carries an honest empty state.
export default async function Home() {
  const [settingsRes, latestRes, notesRes, fieldNotesRes, readingRes, fragmentsRes] =
    await Promise.all([
      archiveFetch({ query: SITE_SETTINGS_QUERY }),
      archiveFetch({ query: LATEST_UPDATE_QUERY }),
      archiveFetch({ query: RECENT_NOTES_QUERY }),
      archiveFetch({ query: RECENT_FIELD_NOTES_QUERY }),
      archiveFetch({ query: RECENT_READING_QUERY }),
      archiveFetch({ query: ARCHIVE_FRAGMENTS_QUERY }),
    ])

  const settings = settingsRes.data as SiteSettingsPayload | null
  const latestUpdate = latestRes.data as LatestUpdatePayload
  const notes = (notesRes.data as NoteListItem[] | null) ?? []
  const fieldNotes = (fieldNotesRes.data as FieldNoteListItem[] | null) ?? []
  const reading = (readingRes.data as ReadingListItem[] | null) ?? []

  const featured = settings?.featuredCurrentEntry ?? null
  // Display dedupe only: the featured entry shouldn't also appear as a
  // margin fragment. Visibility itself is decided inside the queries.
  const fragments = ((fragmentsRes.data as ArchiveFragment[] | null) ?? [])
    .filter((fragment) => fragment._id !== featured?._id)
    .slice(0, 5)

  const featuredWork = settings?.featuredWork ?? []
  const contactLinks = [...(settings?.contactLinks ?? []), ...(settings?.socialLinks ?? [])]
  const isDraftMode = (await draftMode()).isEnabled

  return (
    <div className="mx-auto max-w-7xl px-6">
      {/* Opening — identity, Featured Current Entry, margin rail */}
      <section
        aria-labelledby="identity-line"
        className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20"
      >
        <div className="lg:col-span-8">
          <p className="font-mono text-meta uppercase text-graphite">
            {settings?.siteTitle ?? SITE_NAME}
          </p>
          <h1
            id="identity-line"
            className="mt-6 max-w-[52ch] font-serif text-lede text-ink"
          >
            {settings?.shortBio ?? IDENTITY_LINE}
          </h1>
          <FeaturedEntry entry={featured} />
        </div>
        <aside aria-label="In the margin" className="flex flex-col gap-10 lg:col-span-3 lg:col-start-10">
          <LatestUpdate update={latestUpdate} />
          <ArchiveFragments fragments={fragments} />
        </aside>
      </section>

      {/* Featured Work — ordered in the Studio, rendered as catalog rows */}
      <section aria-labelledby="selected-work" className="border-t border-rule py-16">
        <SectionHeading id="selected-work">Selected work</SectionHeading>
        {featuredWork.length > 0 ? (
          <ul className="mt-8">
            {featuredWork.map((item) => (
              <WorkRow key={item._id} item={item} />
            ))}
          </ul>
        ) : (
          <EmptyNote className="mt-8">
            No work has been selected for the front of the archive yet.
          </EmptyNote>
        )}
      </section>

      {/* Recent notes and field notes — distinct identities, one section */}
      <section aria-labelledby="notes-heading" className="border-t border-rule py-16">
        <SectionHeading id="notes-heading">Notes &amp; field notes</SectionHeading>
        <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <h3 className="font-mono text-meta uppercase text-annotation">Notes</h3>
            {notes.length > 0 ? (
              <ul className="mt-2">
                {notes.map((note) => (
                  <li key={note._id} className="border-b border-rule py-4">
                    <p className="font-serif text-h3 text-ink">{note.title}</p>
                    <p className="mt-1 font-mono text-meta uppercase text-graphite">
                      {[
                        'N',
                        noteTypeLabel(note.noteType),
                        formatDate(note.date),
                        note.estimatedReadingTime ? `${note.estimatedReadingTime} min` : null,
                      ]
                        .filter(Boolean)
                        .join(' · ')}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 font-serif text-body italic text-graphite">
                Notes will be filed as they are written.
              </p>
            )}
          </div>
          <div className="lg:col-span-6">
            <h3 className="font-mono text-meta uppercase text-annotation">Field notes</h3>
            {fieldNotes.length > 0 ? (
              <ul className="mt-2">
                {fieldNotes.map((fieldNote) => (
                  <li key={fieldNote._id} className="border-b border-rule py-4">
                    <p className="font-serif text-h3 text-ink">{fieldNote.title}</p>
                    <p className="mt-1 font-mono text-meta uppercase text-graphite">
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
                    {fieldNote.observation && (
                      <p className="mt-2 max-w-[52ch] font-serif text-caption italic leading-relaxed text-graphite">
                        {fieldNote.observation}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 font-serif text-body italic text-graphite">
                Field notes will be filed as places are visited.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Reading — a selective record, not reviews */}
      <section aria-labelledby="reading-heading" className="border-t border-rule py-16">
        <SectionHeading id="reading-heading">Reading</SectionHeading>
        {reading.length > 0 ? (
          <div
            role="region"
            aria-label="Recent reading"
            tabIndex={0}
            className="mt-8 flex gap-8 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:overflow-visible md:pb-0 lg:grid-cols-6"
          >
            {reading.map((entry) => (
              <div key={entry._id} className="w-40 shrink-0 md:w-auto">
                {entry.coverImage?.asset?._ref && (
                  <Image
                    src={urlFor(entry.coverImage).width(320).height(480).fit('crop').auto('format').url()}
                    alt={clean(entry.coverImage.alt) ?? ''}
                    width={160}
                    height={240}
                    sizes="160px"
                    className="h-auto w-full rounded-[2px] border border-rule"
                  />
                )}
                <p className="mt-3 font-serif text-caption text-ink">{entry.title}</p>
                <p className="mt-1 font-mono text-meta uppercase text-graphite">
                  {entry.author}
                  {entry.author && yearOf(entry.dateRead) && ' · '}
                  {yearOf(entry.dateRead)}
                </p>
                {entry.highlightOrIdea && (
                  <p className="mt-2 font-serif text-caption italic leading-relaxed text-graphite">
                    {entry.highlightOrIdea}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <EmptyNote className="mt-8">The reading record opens soon.</EmptyNote>
        )}
      </section>

      {/* Story transition — the arc, not a timeline */}
      <section aria-labelledby="story-heading" className="border-t border-rule py-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <SectionHeading id="story-heading">The story so far</SectionHeading>
            <p className="mt-6 max-w-[62ch] font-serif text-body text-ink">
              The long version is still being written. The shape of it, so far:
            </p>
            <ol className="mt-6 max-w-[62ch] list-none font-serif text-lede text-ink">
              {TRANSFORMATION_ARC.map((step, index) => (
                <li key={step} className="inline">
                  {index > 0 && (
                    <span aria-hidden="true" className="text-annotation">
                      {' '}
                      →{' '}
                    </span>
                  )}
                  {step}
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-3 lg:col-start-10">
            <p className="border-t border-rule pt-4 font-mono text-meta uppercase text-graphite">
              Story · In preparation
            </p>
          </div>
        </div>
      </section>

      {/* Correspondence — understated continuation */}
      <section aria-labelledby="contact-heading" className="border-t border-rule py-16">
        <SectionHeading id="contact-heading">Correspondence</SectionHeading>
        {contactLinks.length > 0 ? (
          <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-3">
            {contactLinks.map((link) => {
              const href = clean(link.url)
              if (!href) return null
              return (
                <li key={href}>
                  <a
                    href={href}
                    rel="noopener noreferrer"
                    className="font-sans text-caption text-ink underline decoration-1 underline-offset-4 transition-colors hover:text-annotation"
                  >
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>
        ) : (
          <p className="mt-6 max-w-[52ch] font-serif text-body italic text-graphite">
            Correspondence details will be filed here in time.
          </p>
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
