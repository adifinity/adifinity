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

// Everything the interactive Index needs in one round trip: per-section
// entry counts, a small recent-entries preview (same shape as the
// archive fragments so the catalog-label helpers apply), and the
// correspondence fields from Site Settings. All gated exactly like the
// rest of the layer; currentUpdate counts on its own `active` flag.
export const INDEX_QUERY = defineQuery(`{
  "counts": {
    "work": count(*[_type == "workItem" && ${PUBLIC_ENTRY_FILTER}]),
    "notes": count(*[_type == "note" && ${PUBLIC_ENTRY_FILTER}]),
    "fieldNotes": count(*[_type == "fieldNote" && ${PUBLIC_ENTRY_FILTER}]),
    "reading": count(*[_type == "readingEntry" && ${PUBLIC_ENTRY_FILTER}]),
    "experiences": count(*[_type == "experience" && ${PUBLIC_ENTRY_FILTER}]),
    "updates": count(*[_type == "currentUpdate" && ($preview || active == true)])
  },
  "recent": *[_type in ["workItem", "note", "fieldNote", "experience", "readingEntry"] && ${PUBLIC_ENTRY_FILTER}]
    | order(coalesce(publishedAt, _createdAt) desc) [0...5] {
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
  },
  "settings": *[_type == "siteSettings"][0]{
    contactLinks,
    socialLinks,
    cvFile{title, "url": file.asset->url}
  }
}`)

// ─────────────────────────────────────────────────────────────────────
// Work — the curated gallery of the archive.
//
// Curation rule: siteSettings.featuredWork drives the homepage
// selection; workItem.featuredOrder drives inclusion and order on the
// public /work page; the future Archive will hold the complete body of
// work. Entries need a defined featuredOrder AND must pass the shared
// editorial gate. Order: editorial priority, then most recent start
// date, then title as a deterministic tie-break.
// ─────────────────────────────────────────────────────────────────────
export const WORK_INDEX_QUERY = defineQuery(`
  *[_type == "workItem" && defined(featuredOrder) && ${PUBLIC_ENTRY_FILTER}]
    | order(featuredOrder asc, coalesce(dateRange.startDate, publishedAt, _createdAt) desc, title asc) {
    _id,
    title,
    "slug": slug.current,
    summary,
    status,
    visibility,
    phase,
    primaryCategory,
    secondaryThemes,
    dateRange,
    coverMedia,
    featuredOrder,
    role,
    institutionOrClient
  }
`)

// Portable-text image blocks are enriched with their intrinsic
// dimensions so diagrams and document pages can render uncropped.
const PROSE_PROJECTION = /* groq */ `[]{
    ...,
    _type == "imageWithMetadata" => {
      ...,
      "dims": asset->metadata.dimensions{width, height}
    }
  }`

const FILE_PROJECTION = /* groq */ `{
    title,
    description,
    "url": file.asset->url,
    "extension": file.asset->extension,
    "size": file.asset->size
  }`

// The definitive Work entry. Every field is real schema; related
// entries are dereferenced through the same editorial gate (capability
// has no status/visibility — its gate is its own active flag).
export const WORK_DETAIL_QUERY = defineQuery(`
  *[_type == "workItem" && slug.current == $slug && ${PUBLIC_ENTRY_FILTER}][0]{
    _id,
    title,
    "slug": slug.current,
    summary,
    status,
    visibility,
    phase,
    publishedAt,
    updatedAt,
    dateRange,
    primaryCategory,
    secondaryThemes,
    role,
    collaborators,
    institutionOrClient,
    confidentialityNote,
    credits,
    methods,
    "body": body${PROSE_PROJECTION},
    "problem": problem${PROSE_PROJECTION},
    "approach": approach${PROSE_PROJECTION},
    "outcome": outcome${PROSE_PROJECTION},
    "evidence": evidence{
      "narrative": narrative${PROSE_PROJECTION},
      "files": files[]${FILE_PROJECTION}
    },
    coverMedia,
    "gallery": gallery[]{
      ...,
      "dims": asset->metadata.dimensions{width, height}
    },
    "externalLinks": externalLinks[]{label, url},
    "downloadableFiles": downloadableFiles[]${FILE_PROJECTION},
    "relatedEntries": relatedEntries[]->{
      _id,
      _type,
      title,
      "slug": slug.current,
      summary,
      description,
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
      roleTitle,
      "experienceType": type,
      "capabilityName": name,
      "capabilityPhase": phase
    }[defined(_id) && ($preview || (_type == "capability" && active == true) || (status == "published" && visibility == "public"))]
  }
`)

// Route metadata only — kept separate so generateMetadata stays light.
export const WORK_META_QUERY = defineQuery(`
  *[_type == "workItem" && slug.current == $slug && ${PUBLIC_ENTRY_FILTER}][0]{
    title,
    summary,
    seo{seoTitle, seoDescription, socialPreviewImage}
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

export type FileAssetInfo = {
  title: string | null
  description: string | null
  url: string | null
  extension: string | null
  size: number | null
}

export type ProseImageDims = { width: number; height: number }

export type GalleryImage = SanityImageValue & {
  dims: ProseImageDims | null
}

export type RelatedEntry = {
  _id: string
  _type: 'workItem' | 'note' | 'fieldNote' | 'experience' | 'readingEntry' | 'capability'
  title: string | null
  slug: string | null
  summary: string | null
  description: string | null
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
  roleTitle: string | null
  experienceType: string | null
  capabilityName: string | null
  capabilityPhase: string | null
}

export type WorkDetailPayload = {
  _id: string
  title: string | null
  slug: string | null
  summary: string | null
  status: string | null
  visibility: string | null
  phase: string | null
  publishedAt: string | null
  updatedAt: string | null
  dateRange: DateRangeValue | null
  primaryCategory: string | null
  secondaryThemes: string[] | null
  role: string | null
  collaborators: string[] | null
  institutionOrClient: string | null
  confidentialityNote: string | null
  credits: string | null
  methods: string[] | null
  body: PortableTextBlock[] | null
  problem: PortableTextBlock[] | null
  approach: PortableTextBlock[] | null
  outcome: PortableTextBlock[] | null
  evidence: {
    narrative: PortableTextBlock[] | null
    files: FileAssetInfo[] | null
  } | null
  coverMedia: SanityImageValue | null
  gallery: GalleryImage[] | null
  externalLinks: ExternalLinkValue[] | null
  downloadableFiles: FileAssetInfo[] | null
  relatedEntries: RelatedEntry[] | null
}

export type WorkMetaPayload = {
  title: string | null
  summary: string | null
  seo: {
    seoTitle: string | null
    seoDescription: string | null
    socialPreviewImage: SanityImageValue | null
  } | null
}

export type IndexCounts = {
  work: number
  notes: number
  fieldNotes: number
  reading: number
  experiences: number
  updates: number
}

export type IndexPayload = {
  counts: IndexCounts
  recent: ArchiveFragment[]
  settings: {
    contactLinks: ExternalLinkValue[] | null
    socialLinks: ExternalLinkValue[] | null
    cvFile: { title: string | null; url: string | null } | null
  } | null
} | null
