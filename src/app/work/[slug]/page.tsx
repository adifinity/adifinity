import type {SanityImageSource} from '@sanity/image-url'
import {PortableText, type PortableTextBlock, type PortableTextComponents} from '@portabletext/react'
import {draftMode} from 'next/headers'
import {defineQuery} from 'next-sanity'
import {VisualEditing} from 'next-sanity/visual-editing'
import {notFound} from 'next/navigation'

import {DisableDraftMode} from '@/components/disable-draft-mode'
import {sanityFetch, SanityLive} from '@/sanity/lib/live'
import {urlFor} from '@/sanity/lib/image'

type ImageWithMetadata = SanityImageSource & {asset?: {_ref: string}; alt?: string}

type WorkItemPreviewDoc = {
  _id: string
  title: string | null
  summary: string | null
  body: PortableTextBlock[] | null
  status: string | null
  phase: string | null
  primaryCategory: string | null
  dateRange: {startDate?: string; endDate?: string; isOngoing?: boolean} | null
  coverMedia: ImageWithMetadata | null
}

const WORK_ITEM_QUERY = defineQuery(`
  *[_type == "workItem" && slug.current == $slug][0]{
    _id,
    title,
    summary,
    body,
    status,
    phase,
    primaryCategory,
    dateRange,
    coverMedia
  }
`)

const portableTextComponents: PortableTextComponents = {
  types: {
    imageWithMetadata: ({value}: {value: ImageWithMetadata}) => {
      const url = value?.asset ? urlFor(value).width(1200).url() : null
      if (!url) return null
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={url} alt={value.alt ?? ''} className="my-6 w-full rounded" />
    },
  },
}

export default async function WorkItemPreviewPage({
  params,
}: {
  params: Promise<{slug: string}>
}) {
  const {slug} = await params
  const {data: rawData} = await sanityFetch({query: WORK_ITEM_QUERY, params: {slug}})
  const data = rawData as WorkItemPreviewDoc | null
  const isDraftMode = (await draftMode()).isEnabled

  if (!data) {
    if (!isDraftMode) notFound()
  }

  const coverUrl = data?.coverMedia?.asset ? urlFor(data.coverMedia).width(1600).url() : null

  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-6 p-16">
      <p className="text-sm uppercase tracking-wide text-zinc-500">
        {[data?.primaryCategory, data?.phase, data?.status].filter(Boolean).join(' · ') || 'Work item'}
      </p>
      <h1 className="text-3xl font-semibold">{data?.title ?? 'Untitled work item'}</h1>
      {data?.dateRange?.startDate && (
        <p className="text-sm text-zinc-500">
          {data.dateRange.startDate} → {data.dateRange.isOngoing ? 'Present' : data.dateRange.endDate ?? '—'}
        </p>
      )}
      {coverUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={coverUrl} alt={data?.coverMedia?.alt ?? ''} className="w-full rounded" />
      )}
      {data?.summary && <p className="text-lg text-zinc-700">{data.summary}</p>}
      {data?.body && (
        <div className="prose max-w-none">
          <PortableText value={data.body} components={portableTextComponents} />
        </div>
      )}
      <SanityLive />
      {isDraftMode && (
        <>
          <VisualEditing />
          <DisableDraftMode />
        </>
      )}
    </main>
  )
}
