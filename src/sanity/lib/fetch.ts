import { draftMode } from 'next/headers'

import { sanityFetch } from './live'

/**
 * Preview-aware wrapper around the protected `sanityFetch`.
 *
 * Pages never decide visibility themselves: this resolves the queries'
 * `$preview` parameter from Next.js Draft Mode, which only the signed
 * draft-mode enable route (used by Sanity Presentation) can switch on.
 *
 *   - public request  → $preview = false → the editorial gate in each
 *     query (status/visibility, or `active` for currentUpdate) applies
 *   - Draft Mode      → $preview = true  → editors see draft-status and
 *     non-public entries for visual verification
 *
 * Queries that embed `$preview` fail closed if run without it — Sanity
 * rejects queries with unbound parameters — so bypassing this wrapper
 * produces an error, never a leak.
 */
export async function archiveFetch({
  query,
  params = {},
}: {
  query: string
  params?: Record<string, unknown>
}) {
  const preview = (await draftMode()).isEnabled
  return sanityFetch({ query, params: { ...params, preview } })
}
