import type { Metadata } from 'next'
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
import { categoryLabel, clean, formatDateRange, phaseLabel, yearOf } from '@/lib/entry-meta'
import { archiveFetch } from '@/sanity/lib/fetch'
import { urlFor } from '@/sanity/lib/image'
import { SanityLive } from '@/sanity/lib/live'
import {
  WORK_DETAIL_QUERY,
  WORK_META_QUERY,
  type WorkDetailPayload,
  type WorkMetaPayload,
} from '@/sanity/lib/queries'

const hasBlocks = (blocks: PortableTextBlock[] | null | undefined): blocks is PortableTextBlock[] =>
  Array.isArray(blocks) && blocks.length > 0

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const { data } = await archiveFetch({ query: WORK_META_QUERY, params: { slug } })
  const meta = data as WorkMetaPayload | null
  if (!meta) return { title: 'Work' }

  const title = clean(meta.seo?.seoTitle) ?? clean(meta.title) ?? 'Work'
  const description = clean(meta.seo?.seoDescription) ?? clean(meta.summary) ?? undefined
  const socialImage = meta.seo?.socialPreviewImage
  return {
    title,
    description,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title,
      description,
      url: `/work/${slug}`,
      type: 'article',
      ...(socialImage?.asset?._ref
        ? { images: [{ url: urlFor(socialImage).width(1200).height(630).fit('crop').url() }] }
        : {}),
    },
  }
}

// The definitive Marginalia case study. Every field rendered here is
// real workItem schema; anything absent simply does not appear — no
// empty headings, no fabricated context.
export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { data } = await archiveFetch({ query: WORK_DETAIL_QUERY, params: { slug } })
  const work = data as WorkDetailPayload | null
  const isDraftMode = (await draftMode()).isEnabled

  if (!work) notFound()

  const structured = hasBlocks(work.problem) || hasBlocks(work.approach) || hasBlocks(work.outcome)
  const evidenceFiles = (work.evidence?.files ?? []).filter((file) => clean(file.url))
  const hasEvidence = hasBlocks(work.evidence?.narrative) || evidenceFiles.length > 0
  const gallery = (work.gallery ?? []).filter((image) => image?.asset?._ref)
  const externalLinks = (work.externalLinks ?? []).filter((link) => clean(link.url))
  const collaborators = (work.collaborators ?? []).filter(Boolean)
  const methods = (work.methods ?? []).filter(Boolean)
  const hasContext = Boolean(work.role || work.institutionOrClient || collaborators.length > 0)
  const coverFigure = work.coverMedia?.asset?._ref ? 1 : 0

  return (
    <div className="mx-auto max-w-7xl px-6">
      <article className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-8">
          {/* Editorial header */}
          <MetaLine
            parts={[
              'W',
              yearOf(work.dateRange?.startDate),
              categoryLabel(work.primaryCategory),
              formatDateRange(work.dateRange),
              phaseLabel(work.phase),
            ]}
          />
          <h1 className="mt-4 max-w-[22ch] font-serif text-display text-ink">{work.title}</h1>
          {work.summary && (
            <p className="mt-6 max-w-[58ch] font-serif text-lede text-ink">{work.summary}</p>
          )}
          <Plate
            image={work.coverMedia}
            width={800}
            height={533}
            sizes="(min-width: 1024px) 800px, 100vw"
            figure={coverFigure || undefined}
            className="mt-10"
          />

          {/* Case-study logic: structured sections when they exist… */}
          {hasBlocks(work.problem) && (
            <section aria-labelledby="work-problem" className="mt-14">
              <h2 id="work-problem" className="font-serif text-h2 text-ink">
                Problem
              </h2>
              <PortableProse value={work.problem} />
            </section>
          )}
          {hasBlocks(work.approach) && (
            <section aria-labelledby="work-approach" className="mt-14">
              <h2 id="work-approach" className="font-serif text-h2 text-ink">
                Approach
              </h2>
              <PortableProse value={work.approach} />
            </section>
          )}
          {hasBlocks(work.outcome) && (
            <section aria-labelledby="work-outcome" className="mt-14">
              <h2 id="work-outcome" className="font-serif text-h2 text-ink">
                Outcome
              </h2>
              <PortableProse value={work.outcome} />
            </section>
          )}

          {/* …and the narrative body: primary when unstructured, deeper
              context after the case-study logic when both exist. */}
          {hasBlocks(work.body) && (
            <div className={structured ? 'mt-14 border-t border-rule pt-10' : 'mt-12'}>
              <PortableProse value={work.body} />
            </div>
          )}

          {hasEvidence && (
            <section aria-labelledby="work-evidence" className="mt-14">
              <h2 id="work-evidence" className="font-serif text-h2 text-ink">
                Evidence
              </h2>
              {hasBlocks(work.evidence?.narrative) && (
                <PortableProse value={work.evidence.narrative} />
              )}
              {evidenceFiles.length > 0 && (
                <div className="mt-6 max-w-[52ch]">
                  <h3 className="font-mono text-meta uppercase text-graphite">
                    Supporting documents
                  </h3>
                  <FileList files={evidenceFiles} />
                </div>
              )}
            </section>
          )}

          {gallery.length > 0 && (
            <section aria-labelledby="work-plates" className="mt-14">
              <h2 id="work-plates" className="font-serif text-h2 text-ink">
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

        {/* Margin rail — reflows to separated full-width blocks below lg */}
        <aside
          aria-label="About this work"
          className="flex flex-col gap-10 lg:col-span-3 lg:col-start-10"
        >
          {hasContext && (
            <div className="border-t border-rule pt-4">
              <h2 className="font-mono text-meta uppercase text-graphite">Context</h2>
              <dl className="mt-3 space-y-3">
                {work.role && (
                  <div>
                    <dt className="font-mono text-meta uppercase text-graphite">Role</dt>
                    <dd className="mt-1 font-serif text-caption text-ink">{work.role}</dd>
                  </div>
                )}
                {work.institutionOrClient && (
                  <div>
                    <dt className="font-mono text-meta uppercase text-graphite">Organisation</dt>
                    <dd className="mt-1 font-serif text-caption text-ink">
                      {work.institutionOrClient}
                    </dd>
                  </div>
                )}
                {collaborators.length > 0 && (
                  <div>
                    <dt className="font-mono text-meta uppercase text-graphite">Collaboration</dt>
                    <dd className="mt-1 font-serif text-caption text-ink">
                      {collaborators.map((name, index) => (
                        <span key={index}>
                          {index > 0 && ', '}
                          {name}
                        </span>
                      ))}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          )}

          {work.confidentialityNote && (
            <div className="border-t border-rule pt-4">
              <h2 className="font-mono text-meta uppercase text-graphite">Confidentiality</h2>
              <p className="mt-3 font-serif text-caption italic leading-relaxed text-graphite">
                {work.confidentialityNote}
              </p>
            </div>
          )}

          {methods.length > 0 && (
            <div className="border-t border-rule pt-4">
              <h2 className="font-mono text-meta uppercase text-graphite">Methods</h2>
              <ul className="mt-3 space-y-1">
                {methods.map((method, index) => (
                  <li key={index} className="font-mono text-meta uppercase text-ink">
                    {method}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {externalLinks.length > 0 && (
            <div className="border-t border-rule pt-4">
              <h2 className="font-mono text-meta uppercase text-graphite">Elsewhere</h2>
              <ul className="mt-3 space-y-2">
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

          {(work.downloadableFiles ?? []).some((file) => clean(file.url)) && (
            <div className="border-t border-rule pt-4">
              <h2 className="font-mono text-meta uppercase text-graphite">Files</h2>
              <FileList files={work.downloadableFiles} />
            </div>
          )}

          {work.credits && (
            <div className="border-t border-rule pt-4">
              <h2 className="font-mono text-meta uppercase text-graphite">Credits</h2>
              <p className="mt-3 font-serif text-caption italic leading-relaxed text-graphite">
                {work.credits}
              </p>
            </div>
          )}

          {(work.relatedEntries ?? []).length > 0 && (
            <div className="border-t border-rule pt-4">
              <RelatedEntries entries={work.relatedEntries} />
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
