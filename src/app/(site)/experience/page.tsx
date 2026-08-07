import type { Metadata } from 'next'
import Link from 'next/link'
import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity/visual-editing'

import { DisableDraftMode } from '@/components/disable-draft-mode'
import { EmptyNote } from '@/components/empty-note'
import { MetaLine } from '@/components/meta-line'
import { clean, experienceTypeLabel, formatDateRange, phaseLabel } from '@/lib/entry-meta'
import { archiveFetch } from '@/sanity/lib/fetch'
import { SanityLive } from '@/sanity/lib/live'
import { EXPERIENCE_INDEX_QUERY, type ExperienceListItem } from '@/sanity/lib/queries'

export const metadata: Metadata = {
  title: 'Experience',
  description:
    'A chronological register of institutions, roles and education — where time has been spent learning, building, representing and changing direction.',
  alternates: { canonical: '/experience' },
}

// The Experience register — a chronological index of institutions, roles
// and transitions, read earliest → current so it tells a formation rather
// than a résumé. Each row is a preview into the full archival record at
// /experience/[slug]; the narrative, evidence and documents live there.
// One of three doorways into Experience, alongside Story annotations and
// the Archive catalog. CMS-driven and gated: public sees published+public
// records, preview (Draft Mode) sees the drafts.
export default async function ExperienceIndexPage() {
  const { data } = await archiveFetch({ query: EXPERIENCE_INDEX_QUERY })
  const experiences = (data as ExperienceListItem[] | null) ?? []
  const isDraftMode = (await draftMode()).isEnabled

  return (
    <div className="mx-auto max-w-7xl px-6">
      <section className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-8">
          <p className="font-mono text-meta uppercase text-graphite">Experience · Chronological</p>
          <h1 className="mt-6 font-serif text-display text-ink">Experience</h1>
          <p className="mt-6 max-w-[58ch] font-serif text-lede text-ink">
            A register of the institutions, roles and transitions this archive
            was formed in — read from earliest to current, not ranked. Each
            entry opens onto its full record.
          </p>
        </div>
        <aside aria-label="Marginal note" className="lg:col-span-3 lg:col-start-10">
          <div className="border-t border-rule pt-4">
            <p className="font-mono text-meta uppercase text-graphite">Where this sits</p>
            <p className="mt-3 font-serif text-caption italic leading-relaxed text-graphite">
              The register is the chronology. The narrative behind it is the
              Story; every filed entry, in every category, opens with the
              Archive.
            </p>
          </div>
        </aside>
      </section>

      {/* Rows carry their own top rules — the ledger structure, chronological. */}
      <section aria-label="Experience register" className="pb-24">
        {experiences.length > 0 ? (
          <ul>
            {experiences.map((experience) => {
              const slug = clean(experience.slug)
              const inner = (
                <div className="py-6">
                  <MetaLine
                    parts={[
                      'X',
                      experienceTypeLabel(experience.experienceType),
                      formatDateRange(experience.dateRange),
                      phaseLabel(experience.phase),
                    ]}
                  />
                  <h2 className="mt-2 max-w-[28ch] font-serif text-h2 text-ink transition-colors group-hover:text-annotation">
                    {experience.title || experience.roleTitle}
                  </h2>
                  {(experience.roleTitle || experience.organisation) && (
                    <p className="mt-2 max-w-[62ch] font-serif text-body italic text-graphite">
                      {experience.roleTitle}
                      {experience.roleTitle && experience.organisation && ' — '}
                      {experience.organisation}
                    </p>
                  )}
                  {experience.summary && (
                    <p className="mt-2 max-w-[62ch] font-serif text-body text-graphite">
                      {experience.summary}
                    </p>
                  )}
                  <p className="mt-3 font-mono text-meta uppercase text-graphite transition-colors group-hover:text-annotation">
                    View record <span aria-hidden="true">→</span>
                  </p>
                </div>
              )
              return (
                <li key={experience._id} className="border-t border-rule">
                  {slug ? (
                    <Link href={`/experience/${slug}`} className="group block">
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
            No experience records are on public display yet. Institutions, roles
            and transitions will be filed here as they are published.
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
