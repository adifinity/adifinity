import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity/visual-editing'

import { DisableDraftMode } from '@/components/disable-draft-mode'
import { EmptyNote } from '@/components/empty-note'
import { PortableProse } from '@/components/portable-prose'
import { SectionHeading } from '@/components/section-heading'
import { clean, formatDateRange, phaseLabel } from '@/lib/entry-meta'
import { TRANSFORMATION_ARC } from '@/lib/site-copy'
import { archiveFetch } from '@/sanity/lib/fetch'
import { SanityLive } from '@/sanity/lib/live'
import { STORY_QUERY, type StoryPayload } from '@/sanity/lib/queries'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Story',
  description:
    'The story behind the archive — from private reader to public debater, institutional builder, business student, and emerging finance and strategy professional.',
  alternates: { canonical: '/story' },
}

// Story: editorial, not chronological. The narrative prose is
// CMS-driven; the chronology lives in the margins as dated experience
// annotations; capabilities appear as the Apparatus — never a service
// list, never standalone pages.
export default async function StoryPage() {
  const { data } = await archiveFetch({ query: STORY_QUERY })
  const story = data as StoryPayload
  const isDraftMode = (await draftMode()).isEnabled

  const experiences = story?.experiences ?? []
  const capabilities = story?.capabilities ?? []
  const current = capabilities.filter((c) => clean(c.capabilityPhase) === 'current')
  const emerging = capabilities.filter((c) => clean(c.capabilityPhase) === 'emerging')
  const prose = story?.settings?.longBio?.length
    ? story.settings.longBio
    : story?.settings?.heroCopy?.length
      ? story.settings.heroCopy
      : null

  return (
    <div className="mx-auto max-w-7xl px-6">
      <section className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-8">
          <p className="font-mono text-meta uppercase text-graphite">Story · The shape so far</p>
          <h1 className="mt-6 font-serif text-display text-ink">Story</h1>
          <ol className="mt-8 max-w-[62ch] list-none font-serif text-lede text-ink">
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

          {prose ? (
            <div className="mt-12">
              <PortableProse value={prose} />
            </div>
          ) : (
            <EmptyNote className="mt-12">
              The long version is still being written. It will be filed here,
              in the archive&rsquo;s own words.
            </EmptyNote>
          )}
        </div>

        {/* The chronology lives in the margin: dated experience
            annotations rather than a timeline. */}
        <aside aria-label="In the margin" className="flex flex-col gap-10 lg:col-span-3 lg:col-start-10">
          <div className="border-t border-rule pt-4">
            <h2 className="font-mono text-meta uppercase text-graphite">Annotations</h2>
            {experiences.length > 0 ? (
              <ul className="mt-1">
                {experiences.map((experience) => (
                  <li key={experience._id} className="border-b border-rule py-3 last:border-b-0">
                    <p className="font-mono text-meta uppercase text-graphite">
                      {[formatDateRange(experience.dateRange), phaseLabel(experience.phase)]
                        .filter(Boolean)
                        .join(' · ')}
                    </p>
                    <p className="mt-1 font-serif text-caption text-ink">{experience.title}</p>
                    {(experience.roleTitle || experience.organisation) && (
                      <p className="mt-1 font-serif text-caption italic text-graphite">
                        {experience.roleTitle}
                        {experience.roleTitle && experience.organisation && ' — '}
                        {experience.organisation}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 font-serif text-caption italic text-graphite">
                Experience records will be annotated here as they are filed.
              </p>
            )}
          </div>
        </aside>
      </section>

      {/* The Apparatus — what the archive is built with. Connective
          data, honestly divided; never a service list. */}
      <section aria-labelledby="apparatus-heading" className="border-t border-rule py-16">
        <SectionHeading id="apparatus-heading">Apparatus</SectionHeading>
        <p className="mt-4 max-w-[58ch] font-serif text-body text-graphite">
          What this archive is built with — stated plainly, split between what
          is in working use and what is still being built up.
        </p>
        {capabilities.length > 0 ? (
          <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-8">
            {[
              { label: 'Current', items: current },
              { label: 'Emerging', items: emerging },
            ]
              .filter((group) => group.items.length > 0)
              .map((group) => (
                <div key={group.label} className="lg:col-span-6">
                  <h3 className="font-mono text-meta uppercase text-annotation">{group.label}</h3>
                  <ul className="mt-2">
                    {group.items.map((capability) => (
                      <li key={capability._id} className="border-b border-rule py-4">
                        <p className="font-serif text-lede text-ink">{capability.name}</p>
                        {capability.description && (
                          <p className="mt-1 max-w-[52ch] font-serif text-caption text-graphite">
                            {capability.description}
                          </p>
                        )}
                        {(capability.examples ?? []).some((example) => clean(example.slug)) && (
                          <p className="mt-2 font-mono text-meta uppercase text-graphite">
                            Exercised in{' '}
                            {(capability.examples ?? [])
                              .filter((example) => clean(example.slug))
                              .map((example, index) => (
                                <span key={index}>
                                  {index > 0 && ' · '}
                                  <Link
                                    href={`/work/${clean(example.slug)}`}
                                    className="text-ink underline underline-offset-4 transition-colors hover:text-annotation"
                                  >
                                    {example.title}
                                  </Link>
                                </span>
                              ))}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        ) : (
          <EmptyNote className="mt-8">
            The apparatus is being catalogued. It will be filed here, honestly
            divided between current and emerging.
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
