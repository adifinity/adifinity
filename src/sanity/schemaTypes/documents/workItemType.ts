import CaseIcon from '@sanity/icons/Case'
import {defineField, defineType} from 'sanity'

import {
  bodyField,
  coverMediaField,
  creditsField,
  featuredOrderField,
  MAJOR_CONTENT_TYPES,
  phaseField,
  publishedAtField,
  relatedEntriesField,
  seoField,
  slugField,
  statusField,
  summaryField,
  tagsField,
  titleField,
  updatedAtField,
  visibilityField,
} from '../lib/sharedFields'
import {PRIMARY_CATEGORY_OPTIONS} from '../lib/options'

export const workItemType = defineType({
  name: 'workItem',
  title: 'Work item',
  type: 'document',
  icon: CaseIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'caseStudy', title: 'Case study'},
    {name: 'media', title: 'Media & links'},
    {name: 'meta', title: 'Meta'},
  ],
  fields: [
    titleField(),
    slugField('workItem'),
    summaryField(),
    bodyField('Body', 'The main write-up. For a structured case study, use Problem / Approach / Outcome below instead or in addition.'),
    statusField(),
    visibilityField(),
    phaseField(),
    publishedAtField(),
    updatedAtField(),
    defineField({
      name: 'dateRange',
      title: 'Date range',
      type: 'dateRange',
      description: 'When this work happened. For a single-day piece, set the same start and end date.',
      validation: (Rule) => Rule.required(),
    }),
    coverMediaField(),
    seoField(),
    featuredOrderField(),
    creditsField(),
    relatedEntriesField(MAJOR_CONTENT_TYPES),

    defineField({
      name: 'primaryCategory',
      title: 'Primary category',
      type: 'string',
      options: {list: PRIMARY_CATEGORY_OPTIONS},
      validation: (Rule) => Rule.required(),
    }),
    tagsField(
      'secondaryThemes',
      'Secondary themes',
      'Use the same four categories where relevant, plus any free-form tags.',
    ),
    defineField({name: 'role', title: 'Role', type: 'string'}),
    defineField({
      name: 'collaborators',
      title: 'Collaborators',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({name: 'institutionOrClient', title: 'Institution or client', type: 'string'}),

    defineField({name: 'problem', title: 'Problem', type: 'blockContent', group: 'caseStudy'}),
    defineField({name: 'approach', title: 'Approach', type: 'blockContent', group: 'caseStudy'}),
    defineField({name: 'outcome', title: 'Outcome', type: 'blockContent', group: 'caseStudy'}),
    tagsField('methods', 'Methods'),
    defineField({
      name: 'evidence',
      title: 'Evidence',
      type: 'object',
      group: 'caseStudy',
      fields: [
        defineField({name: 'narrative', title: 'Narrative', type: 'blockContent'}),
        defineField({
          name: 'files',
          title: 'Supporting files',
          type: 'array',
          of: [{type: 'fileDownload'}],
        }),
      ],
    }),

    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [{type: 'imageWithMetadata'}],
      group: 'media',
    }),
    defineField({
      name: 'externalLinks',
      title: 'External links',
      type: 'array',
      of: [{type: 'externalLink'}],
      group: 'media',
    }),
    defineField({
      name: 'downloadableFiles',
      title: 'Downloadable files',
      type: 'array',
      of: [{type: 'fileDownload'}],
      group: 'media',
    }),
    defineField({
      name: 'confidentialityNote',
      title: 'Confidentiality note',
      type: 'text',
      rows: 2,
      description: 'Explain what had to stay out of the public write-up, if applicable.',
      group: 'meta',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
      group: 'meta',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      status: 'status',
      category: 'primaryCategory',
      media: 'coverMedia',
    },
    prepare({title, status, category, media}) {
      const categoryLabel = PRIMARY_CATEGORY_OPTIONS.find((o) => o.value === category)?.title
      return {
        title,
        subtitle: [categoryLabel, status].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
