import type { Metadata } from 'next'
import Link from 'next/link'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { VisualEditing } from 'next-sanity/visual-editing'
import type { PortableTextBlock } from '@portabletext/react'

import { DisableDraftMode } from '@/components/disable-draft-mode'
import { FileList } from '@/components/file-list'
import { MetaLine } from '@/components/meta-line'
import { Plate } from '@/components/plate'
import { PortableProse } from '@/components/portable-prose'
import { RelatedEntries } from '@/components/related-entries'
import {
  catalogLabel,
  clean,
  experienceTypeLabel,
  formatDateRange,
  phaseLabel,
  yearOf,
} from '@/lib/entry-meta'
import { archiveFetch } from '@/sanity/lib/fetch'
import { SanityLive } from '@/sanity/lib/live'
import {
  EXPERIENCE_DETAIL_QUERY,
  EXPERIENCE_META_QUERY,
  type ArchiveFragment,
  type ExperienceDetailPayload,
  type ExperienceMetaPayload,
} from '@/sanity/lib/queries'

const hasBlocks = (blocks: PortableTextBlock[] | null | undefined): blocks is PortableTextBlock[] =>
  Array.isArray(blocks) && blocks.length > 0

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const { data } = await archiveFetch({ query: EXPERIENCE_META_QUERY, params: { slug } })
  const meta = data as ExperienceMetaPayload | null
  if (!meta) return { title: 'Experience' }

  const title = clean(meta.title) ?? clean(meta.roleTitle) ?? 'Experience'
  const derived = [clean(meta.roleTitle), clean(meta.organisation)].filter(Boolean).join(' · ')
  const description = clean(meta.summary) ?? (derived || undefined)
  return {
    title,
    description,
    alternates: { canonical: `/experience/${slug}` },
    openGraph: { title, description, url: `/experience/${slug}`, type: 'article' },
  }
}

// The Experience detail record — an archival page in the same annotated
// library as Work, Notes and Field Notes. Reached from Story annotations
// and Archive records; never from a top-level index (there is none). Every
// field rendered is real experience schema; anything absent simply does
// not appear — no empty frames, no fabricated context.
export default async function ExperienceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { data } = await archiveFetch({ query: EXPERIENCE_DETAIL_QUERY, params: { slug } })
  const experience = data as ExperienceDetailPayload | null
  const isDraftMode = (await draftMode()).isEnabled

  if (!experience) notFound()

  const verifiedFacts = (experience.verifiedFacts ?? []).filter((fact) => clean(fact))
  const metrics = (experience.metrics ?? []).filter((metric) => clean(metric?.value))
  const externalLinks = (experience.externalLinks ?? []).filter((link) => clean(link.url))
  const evidenceFiles = (experience.evidenceFiles ?? []).filter((file) => clean(file.url))
  const relatedWork = (experience.relatedWork ?? []).filter((work) => clean(work.slug))
  const websiteUrl = clean(experience.websiteUrl)
  const hasElsewhere = Boolean(websiteUrl) || externalLinks.length > 0

  return (
    <div className="mx-auto max-w-7xl px-6">
      <article className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-8">
          {/* Record identity */}
          <MetaLine
            parts={[
              'X',
              yearOf(experience.dateRange?.startDate),
              experienceTypeLabel(experience.experienceType),
              formatDateRange(experience.dateRange),
              phaseLabel(experience.phase),
            ]}
          />
          <h1 className="mt-4 max-w-[24ch] font-serif text-display text-ink">
            {experience.title || experience.roleTitle}
          </h1>
          {experience.roleTitle && (
            <p className="mt-4 max-w-[52ch] font-serif text-h3 text-ink">{experience.roleTitle}</p>
          )}
          {(experience.organisation || experience.location) && (
            <p className="mt-2 font-serif text-body text-graphite">
              {experience.organisation}
              {experience.organisation && experience.location && ' · '}
              {experience.location}
            </p>
          )}
          {experience.summary && (
            <p className="mt-6 max-w-[58ch] font-serif text-lede text-ink">{experience.summary}</p>
          )}

          <Plate
            image={experience.coverMedia}
            width={800}
            height={533}
            sizes="(min-width: 1024px) 800px, 100vw"
            figure={experience.coverMedia?.asset?._ref ? 1 : undefined}
            className="mt-10"
          />

          {/* The central narrative */}
          {hasBlocks(experience.narrativeBody) && (
            <div className="mt-12">
              <PortableProse value={experience.narrativeBody} />
            </div>
          )}

          {/* Documented facts — a quiet record, not badges */}
          {verifiedFacts.length > 0 && (
            <section aria-labelledby="exp-record" className="mt-14">
              <h2 id="exp-record" className="font-serif text-h2 text-ink">
                On the record
              </h2>
              <ul className="mt-4 max-w-[62ch]">
                {verifiedFacts.map((fact, index) => (
                  <li
                    key={index}
                    className="border-t border-rule py-3 font-serif text-body text-ink first:border-t-0"
                  >
                    {fact}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Metrics — restrained, editorial figures */}
          {metrics.length > 0 && (
            <section aria-labelledby="exp-numbers" className="mt-14">
              <h2 id="exp-numbers" className="font-serif text-h2 text-ink">
                In numbers
              </h2>
              <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3">
                {metrics.map((metric, index) => (
                  <div key={index}>
                    <p className="font-serif text-h1 text-ink">{metric.value}</p>
                    {metric.label && (
                      <p className="mt-1 font-mono text-meta uppercase text-graphite">
                        {metric.label}
                      </p>
                    )}
                    {metric.note && (
                      <p className="mt-1 max-w-[24ch] font-serif text-caption italic leading-relaxed text-graphite">
                        {metric.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Margin rail — references only; the header already carries identity */}
        <aside
          aria-label="About this record"
          className="flex flex-col gap-10 lg:col-span-3 lg:col-start-10"
        >
          {hasElsewhere && (
            <div className="border-t border-rule pt-4">
              <h2 className="font-mono text-meta uppercase text-graphite">Elsewhere</h2>
              <ul className="mt-3 space-y-2">
                {websiteUrl && (
                  <li>
                    <a
                      href={websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-words font-sans text-caption text-ink underline decoration-1 underline-offset-4 transition-colors hover:text-annotation"
                    >
                      Official page
                    </a>
                  </li>
                )}
                {externalLinks.map((link, index) => {
                  const href = clean(link.url) as string
                  return (
                    <li key={index}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="break-words font-sans text-caption text-ink underline decoration-1 underline-offset-4 transition-colors hover:text-annotation"
                      >
                        {link.label || href}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

          {evidenceFiles.length > 0 && (
            <div className="border-t border-rule pt-4">
              <h2 className="font-mono text-meta uppercase text-graphite">Evidence</h2>
              <FileList files={evidenceFiles} />
            </div>
          )}

          {relatedWork.length > 0 && (
            <div className="border-t border-rule pt-4">
              <h2 className="font-mono text-meta uppercase text-graphite">Related work</h2>
              <ul className="mt-3 space-y-3">
                {relatedWork.map((work) => (
                  <li key={work._id}>
                    <Link href={`/work/${clean(work.slug)}`} className="group block">
                      <p className="font-serif text-caption text-ink transition-colors group-hover:text-annotation">
                        {work.title}
                      </p>
                      <p className="mt-1 font-mono text-meta uppercase text-graphite">
                        {catalogLabel(work as unknown as ArchiveFragment)}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(experience.relatedEntries ?? []).length > 0 && (
            <div className="border-t border-rule pt-4">
              <RelatedEntries entries={experience.relatedEntries} />
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
