import MarkerIcon from '@sanity/icons/Marker'
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

export const fieldNoteType = defineType({
  name: 'fieldNote',
  title: 'Field note',
  type: 'document',
  icon: MarkerIcon,
  fields: [
    titleField(),
    slugField('fieldNote'),
    summaryField(),
    bodyField('Body', 'The full field note.'),
    statusField(),
    visibilityField(),
    publishedAtField(),
    updatedAtField(),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      description: 'The editorial date for this entry — when it was written up, which may differ from the visit date below.',
      validation: (Rule) => Rule.required(),
    }),
    coverMediaField(),
    relatedEntriesField(MAJOR_CONTENT_TYPES),
    seoField(),

    defineField({
      name: 'locationName',
      title: 'Location name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'country', title: 'Country', type: 'string'}),
    defineField({
      name: 'coordinates',
      title: 'Coordinates',
      type: 'geopoint',
      description: 'Optional — for placing this entry on a map later.',
    }),
    defineField({
      name: 'dateVisited',
      title: 'Date visited',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photoGallery',
      title: 'Photo gallery',
      type: 'array',
      of: [{type: 'imageWithMetadata'}],
    }),
    defineField({
      name: 'observation',
      title: 'Observation',
      type: 'text',
      rows: 4,
      description: 'A single distilled observation from this place, separate from the full body above.',
    }),
    defineField({
      name: 'mapLabel',
      title: 'Map label',
      type: 'string',
      description: 'Optional short label to show if this entry appears on a map.',
    }),
  ],
  preview: {
    select: {title: 'title', location: 'locationName', country: 'country', date: 'dateVisited', media: 'coverMedia'},
    prepare({title, location, country, date, media}) {
      const place = [location, country].filter(Boolean).join(', ')
      return {title, subtitle: [place, date].filter(Boolean).join(' · '), media}
    },
  },
})
