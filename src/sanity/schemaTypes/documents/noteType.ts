import EditIcon from '@sanity/icons/Edit'
import {defineField, defineType} from 'sanity'

import {
  bodyField,
  coverMediaField,
  MAJOR_CONTENT_TYPES,
  publishedAtField,
  relatedEntriesField,
  seoField,
  slugField,
  statusField,
  summaryField,
  titleField,
  updatedAtField,
  visibilityField,
} from '../lib/sharedFields'

const NOTE_TYPE_OPTIONS = [
  {title: 'Reflection', value: 'reflection'},
  {title: 'Observation', value: 'observation'},
  {title: 'Argument', value: 'argument'},
  {title: 'Working note', value: 'workingNote'},
  {title: 'Fragment', value: 'fragment'},
]

export const noteType = defineType({
  name: 'note',
  title: 'Note',
  type: 'document',
  icon: EditIcon,
  fields: [
    titleField(),
    slugField('note'),
    summaryField(),
    bodyField(),
    statusField(),
    visibilityField(),
    publishedAtField(),
    updatedAtField(),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      description: 'The date this note belongs to in the archive.',
      validation: (Rule) => Rule.required(),
    }),
    coverMediaField('Optional — most notes don’t need one.'),
    relatedEntriesField(MAJOR_CONTENT_TYPES),
    seoField(),
    defineField({
      name: 'noteType',
      title: 'Note type',
      type: 'string',
      options: {list: NOTE_TYPE_OPTIONS},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'estimatedReadingTime',
      title: 'Estimated reading time (minutes)',
      type: 'number',
      validation: (Rule) => Rule.positive().integer(),
    }),
  ],
  preview: {
    select: {title: 'title', noteType: 'noteType', date: 'date', media: 'coverMedia'},
    prepare({title, noteType, date, media}) {
      const typeLabel = NOTE_TYPE_OPTIONS.find((o) => o.value === noteType)?.title
      return {title, subtitle: [typeLabel, date].filter(Boolean).join(' · '), media}
    },
  },
})
