import { defineQuery } from 'next-sanity'
import type { PortableTextBlock } from '@portabletext/react'

// The single most recent active "now" update. Distinct from
// siteSettings.featuredCurrentEntry, which is manually chosen — the
// homepage must show both as separate concepts, never merged into one.
export const LATEST_UPDATE_QUERY = defineQuery(
  `*[_type == "currentUpdate" && active == true] | order(date desc) [0]`
)

// ─────────────────────────────────────────────────────────────────────
// Preview-aware editorial gate
//
// The schemas carry editorial `status` (draft/published/archived) and
// `visibility` (public/unlisted/private) fields that Sanity itself does
// not enforce. Every public listing query below embeds this gate, with
// `$preview` resolved server-side by archiveFetch (./fetch.ts):
//
//   $preview == false  → ordinary public request: only entries that are
//                        editorially published AND publicly visible
//   $preview == true   → Next.js Draft Mode (Presentation): the gate
//                        opens so editors can verify draft-status and
//                        non-public placeholder entries
//
// This is the second of two independent layers — the protected live.ts
// draft-mode plumbing already handles Sanity-level draft documents via
// perspectives. Filtering happens inside GROQ so non-public content
// never leaves Sanity on a public request.
// ─────────────────────────────────────────────────────────────────────
const PUBLIC_ENTRY_FILTER = /* groq */ `($preview || (status == "published" && visibility == "public"))`

// currentUpdate has no status/visibility fields — its editorial gate is
// its own `active` flag. Used where a reference may be polymorphic.
const PUBLIC_FEATURED_FILTER = /* groq */ `($preview || (_type == "currentUpdate" && active == true) || (status == "published" && visibility == "public"))`

// Site Settings singleton with the homepage's two distinct concepts:
// featuredCurrentEntry (manually chosen, polymorphic — resolved via a
// subquery so the editorial gate applies to whatever it points at) and
// featuredWork (ordered array, each target individually gated).
export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0]{
    siteTitle,
    shortBio,
    heroCopy,
    defaultSeoTitle,
    defaultSeoDescription,
    contactLinks,
    socialLinks,
    cvFile{title, description, "url": file.asset->url},
    profileImage,
    "featuredCurrentEntry": *[
      _id == ^.featuredCurrentEntry._ref && ${PUBLIC_FEATURED_FILTER}
    ][0]{
      _id,
      _type,
      title,
      "slug": slug.current,
      summary,
      description,
      label,
      date,
      phase,
      status,
      dateRange,
      primaryCategory,
      organisation,
      roleTitle,
      coverMedia
    },
    "featuredWork": featuredWork[]->{
      _id,
      title,
      "slug": slug.current,
      summary,
      phase,
      status,
      visibility,
      primaryCategory,
      dateRange,
      role,
      institutionOrClient,
      coverMedia
    }[defined(_id) && ${PUBLIC_ENTRY_FILTER}]
  }
`)

export const RECENT_NOTES_QUERY = defineQuery(`
  *[_type == "note" && ${PUBLIC_ENTRY_FILTER}]
    | order(date desc, _createdAt desc) [0...3] {
    _id,
    title,
    "slug": slug.current,
    summary,
    noteType,
    date,
    estimatedReadingTime
  }
`)

export const RECENT_FIELD_NOTES_QUERY = defineQuery(`
  *[_type == "fieldNote" && ${PUBLIC_ENTRY_FILTER}]
    | order(date desc, _createdAt desc) [0...3] {
    _id,
    title,
    "slug": slug.current,
    summary,
    locationName,
    country,
    date,
    dateVisited,
    observation,
    coverMedia
  }
`)

export const RECENT_READING_QUERY = defineQuery(`
  *[_type == "readingEntry" && ${PUBLIC_ENTRY_FILTER}]
    | order(dateRead desc, _createdAt desc) [0...6] {
    _id,
    title,
    "slug": slug.current,
    author,
    dateRead,
    highlightOrIdea,
    genreOrTheme,
    coverImage
  }
`)

// Real entries from across the archive for the homepage's margin
// fragments (and later the Ledger Sort's source material). currentUpdate
// is deliberately excluded — it is ephemeral "now" content, not part of
// the long-term catalogue. Ordered deterministically by editorial
// publication date, falling back to creation time.
export const ARCHIVE_FRAGMENTS_QUERY = defineQuery(`
  *[_type in ["workItem", "note", "fieldNote", "experience", "readingEntry"] && ${PUBLIC_ENTRY_FILTER}]
    | order(coalesce(publishedAt, _createdAt) desc) [0...8] {
    _id,
    _type,
    title,
    "slug": slug.current,
    date,
    dateRead,
    dateVisited,
    dateRange,
    primaryCategory,
    noteType,
    locationName,
    country,
    author,
    organisation,
    "experienceType": type
  }
`)

// ─────────────────────────────────────────────────────────────────────
// Result types — manual, matching the pattern the /work/[slug] page
// established. Every field a query can return as missing is nullable.
// ─────────────────────────────────────────────────────────────────────

export type SanityImageValue = {
  asset?: { _ref: string }
  alt?: string | null
  caption?: string | null
  credit?: string | null
}

export type ExternalLinkValue = {
  label?: string | null
  url?: string | null
}

export type DateRangeValue = {
  startDate?: string | null
  endDate?: string | null
  isOngoing?: boolean | null
}

export type FeaturedEntry = {
  _id: string
  _type: 'workItem' | 'experience' | 'currentUpdate'
  title: string | null
  slug: string | null
  summary: string | null
  description: string | null
  label: string | null
  date: string | null
  phase: string | null
  status: string | null
  dateRange: DateRangeValue | null
  primaryCategory: string | null
  organisation: string | null
  roleTitle: string | null
  coverMedia: SanityImageValue | null
}

export type FeaturedWorkItem = {
  _id: string
  title: string | null
  slug: string | null
  summary: string | null
  phase: string | null
  status: string | null
  visibility: string | null
  primaryCategory: string | null
  dateRange: DateRangeValue | null
  role: string | null
  institutionOrClient: string | null
  coverMedia: SanityImageValue | null
}

export type SiteSettingsPayload = {
  siteTitle: string | null
  shortBio: string | null
  heroCopy: PortableTextBlock[] | null
  defaultSeoTitle: string | null
  defaultSeoDescription: string | null
  contactLinks: ExternalLinkValue[] | null
  socialLinks: ExternalLinkValue[] | null
  cvFile: { title: string | null; description: string | null; url: string | null } | null
  profileImage: SanityImageValue | null
  featuredCurrentEntry: FeaturedEntry | null
  featuredWork: FeaturedWorkItem[] | null
}

export type LatestUpdatePayload = {
  _id: string
  title: string | null
  description: string | null
  date: string | null
  label: string | null
  active: boolean | null
  priority: number | null
} | null

export type NoteListItem = {
  _id: string
  title: string | null
  slug: string | null
  summary: string | null
  noteType: string | null
  date: string | null
  estimatedReadingTime: number | null
}

export type FieldNoteListItem = {
  _id: string
  title: string | null
  slug: string | null
  summary: string | null
  locationName: string | null
  country: string | null
  date: string | null
  dateVisited: string | null
  observation: string | null
  coverMedia: SanityImageValue | null
}

export type ReadingListItem = {
  _id: string
  title: string | null
  slug: string | null
  author: string | null
  dateRead: string | null
  highlightOrIdea: string | null
  genreOrTheme: string[] | null
  coverImage: SanityImageValue | null
}

export type ArchiveFragment = {
  _id: string
  _type: 'workItem' | 'note' | 'fieldNote' | 'experience' | 'readingEntry'
  title: string | null
  slug: string | null
  date: string | null
  dateRead: string | null
  dateVisited: string | null
  dateRange: DateRangeValue | null
  primaryCategory: string | null
  noteType: string | null
  locationName: string | null
  country: string | null
  author: string | null
  organisation: string | null
  experienceType: string | null
}
