import TimelineIcon from '@sanity/icons/Timeline'
import {defineField, defineType} from 'sanity'

import {
  coverMediaField,
  MAJOR_CONTENT_TYPES,
  phaseField,
  publishedAtField,
  relatedEntriesField,
  slugField,
  statusField,
  summaryField,
  titleField,
  updatedAtField,
  visibilityField,
} from '../lib/sharedFields'

const EXPERIENCE_TYPE_OPTIONS = [
  {title: 'Institution', value: 'institution'},
  {title: 'Leadership', value: 'leadership'},
  {title: 'Education', value: 'education'},
  {title: 'Practice', value: 'practice'},
]

export const experienceType = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  icon: TimelineIcon,
  fields: [
    titleField('A display title for this entry, e.g. "Analyst, Central Bank Research Wing".'),
    slugField('experience'),
    summaryField(),
    statusField(),
    visibilityField(),
    phaseField(),
    publishedAtField(),
    updatedAtField(),
    relatedEntriesField(MAJOR_CONTENT_TYPES),
    coverMediaField('Optional.'),

    defineField({
      name: 'organisation',
      title: 'Organisation',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'roleTitle',
      title: 'Role title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dateRange',
      title: 'Date range',
      type: 'dateRange',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'narrativeBody',
      title: 'Narrative',
      type: 'blockContent',
      description: 'Write this as prose, not a bullet-only résumé entry.',
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {list: EXPERIENCE_TYPE_OPTIONS},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'verifiedFacts',
      title: 'Verified facts',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Short, factual, checkable statements — dates, titles, scope.',
    }),
    defineField({
      name: 'metrics',
      title: 'Metrics',
      type: 'array',
      of: [{type: 'metric'}],
    }),
    defineField({
      name: 'relatedWork',
      title: 'Related work',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'workItem'}]}],
    }),
    defineField({name: 'location', title: 'Location', type: 'string'}),
    defineField({name: 'organisationLogo', title: 'Organisation logo', type: 'imageWithMetadata'}),
    defineField({
      name: 'websiteUrl',
      title: 'Website URL',
      type: 'url',
      validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
    }),
  ],
  preview: {
    select: {title: 'title', org: 'organisation', role: 'roleTitle', media: 'organisationLogo'},
    prepare({title, org, role, media}) {
      return {title: title || role, subtitle: [org, role].filter(Boolean).join(' · '), media}
    },
  },
})
