import { defineQuery } from 'next-sanity'

// The single most recent active "now" update. Distinct from
// siteSettings.featuredCurrentEntry, which is manually chosen — the
// homepage must show both as separate concepts, never merged into one.
export const LATEST_UPDATE_QUERY = defineQuery(
  `*[_type == "currentUpdate" && active == true] | order(date desc) [0]`
)
