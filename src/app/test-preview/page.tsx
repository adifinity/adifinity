import { draftMode } from 'next/headers'
import { defineQuery } from 'next-sanity'
import { VisualEditing } from 'next-sanity/visual-editing'

import { DisableDraftMode } from '@/components/disable-draft-mode'
import { sanityFetch, SanityLive } from '@/sanity/lib/live'

const TEST_DOC_QUERY = defineQuery(`*[_type == "test"][0]{ _id, title }`)

type TestDoc = { _id: string; title: string | null }

export default async function TestPreviewPage() {
  const { data } = await sanityFetch({ query: TEST_DOC_QUERY })
  const doc = data as TestDoc | null
  const isDraftMode = (await draftMode()).isEnabled

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-16">
      <p className="text-sm uppercase tracking-wide text-zinc-500">
        Sanity visual editing test
      </p>
      <h1 className="text-3xl font-semibold">
        {doc?.title ?? 'No test document found'}
      </h1>
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
