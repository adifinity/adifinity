import {defineField} from 'sanity'

import {isUniqueSlugForType} from './slug'
import {CONTENT_PHASE_OPTIONS, STATUS_OPTIONS, VISIBILITY_OPTIONS} from './options'

// Factory functions for the field groups shared across the substantial
// editorial content types (workItem, note, fieldNote, experience). Each
// document type spreads in only the ones it actually needs — see the
// "SHARED FIELD GROUPS" section of CLAUDE.md. Keeping these as flat fields
// (rather than nesting them in a shared object) keeps each document's Studio
// form flat and easy to scan.

export const titleField = (description?: string) =>
  defineField({
    name: 'title',
    title: 'Title',
    type: 'string',
    description,
    validation: (Rule) => Rule.required().max(120),
  })

export const slugField = (documentType: string, source: string = 'title') =>
  defineField({
    name: 'slug',
    title: 'Slug',
    type: 'slug',
    options: {
      source,
      maxLength: 96,
      isUnique: isUniqueSlugForType(documentType),
    },
    validation: (Rule) => Rule.required(),
  })

export const summaryField = (description?: string) =>
  defineField({
    name: 'summary',
    title: 'Summary',
    type: 'text',
    rows: 3,
    description: description ?? 'A short standalone description used in listings and previews.',
    validation: (Rule) => Rule.max(280),
  })

export const bodyField = (title: string = 'Body', description?: string) =>
  defineField({name: 'body', title, type: 'blockContent', description})

export const statusField = () =>
  defineField({
    name: 'status',
    title: 'Status',
    type: 'string',
    options: {list: STATUS_OPTIONS, layout: 'radio'},
    initialValue: 'draft',
    validation: (Rule) => Rule.required(),
  })

export const visibilityField = () =>
  defineField({
    name: 'visibility',
    title: 'Visibility',
    type: 'string',
    options: {list: VISIBILITY_OPTIONS, layout: 'radio'},
    initialValue: 'private',
    validation: (Rule) => Rule.required(),
  })

export const phaseField = (description?: string) =>
  defineField({
    name: 'phase',
    title: 'Phase',
    type: 'string',
    description:
      description ??
      'Which of the four content categories this belongs to. Never blur these — see the Adifinity content principle.',
    options: {list: CONTENT_PHASE_OPTIONS},
    validation: (Rule) => Rule.required(),
  })

export const publishedAtField = () =>
  defineField({name: 'publishedAt', title: 'Published at', type: 'datetime'})

export const updatedAtField = () =>
  defineField({name: 'updatedAt', title: 'Updated at', type: 'datetime'})

export const coverMediaField = (description?: string) =>
  defineField({name: 'coverMedia', title: 'Cover media', type: 'imageWithMetadata', description})

export const seoField = () => defineField({name: 'seo', title: 'SEO & sharing', type: 'seo'})

export const featuredOrderField = () =>
  defineField({
    name: 'featuredOrder',
    title: 'Featured order',
    type: 'number',
    description: 'Lower numbers surface first when featured. Leave blank if not featured.',
  })

export const creditsField = () =>
  defineField({
    name: 'credits',
    title: 'Credits',
    type: 'text',
    rows: 2,
    description: 'Acknowledge collaborators, sources, or contributors.',
  })

export const relatedEntriesField = (to: {type: string}[], description?: string) =>
  defineField({
    name: 'relatedEntries',
    title: 'Related entries',
    type: 'array',
    of: [{type: 'reference', to}],
    description,
  })

// Free-form tags (methods, themes, genres). Sanity tags are short strings,
// not documents in their own right, so the "reusable object type" for tags
// from CLAUDE.md's section 9 is implemented as this shared field factory
// rather than a per-tag object — wrapping each tag in an object would only
// add friction when typing without any real benefit.
export const tagsField = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    type: 'array',
    of: [{type: 'string'}],
    options: {layout: 'tags'},
    description,
  })

// The set of "major" content types eligible as relatedEntries targets.
// currentUpdate is intentionally excluded as a target since it's ephemeral
// "now" content, not meant for long-term cross-referencing.
export const MAJOR_CONTENT_TYPES = [
  {type: 'workItem'},
  {type: 'note'},
  {type: 'fieldNote'},
  {type: 'experience'},
  {type: 'readingEntry'},
  {type: 'capability'},
]
