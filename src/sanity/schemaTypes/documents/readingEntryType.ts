import BookIcon from '@sanity/icons/Book'
import {defineField, defineType} from 'sanity'

import {
  MAJOR_CONTENT_TYPES,
  relatedEntriesField,
  slugField,
  statusField,
  tagsField,
  titleField,
  visibilityField,
} from '../lib/sharedFields'

export const readingEntryType = defineType({
  name: 'readingEntry',
  title: 'Reading entry',
  type: 'document',
  icon: BookIcon,
  fields: [
    titleField(),
    slugField('readingEntry'),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dateRead',
      title: 'Date read',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    statusField(),
    visibilityField(),
    defineField({name: 'coverImage', title: 'Cover image', type: 'imageWithMetadata'}),
    defineField({
      name: 'shortReflection',
      title: 'Short reflection',
      type: 'blockContent',
      description: 'Keep this tight — a paragraph, not an essay. This is a selective reading record, not a review site.',
    }),
    defineField({
      name: 'highlightOrIdea',
      title: 'Highlight or idea',
      type: 'string',
      description: 'The one idea worth remembering from this book.',
    }),
    defineField({
      name: 'relatedWork',
      title: 'Related work',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'workItem'}]}],
    }),
    defineField({
      name: 'relatedNotes',
      title: 'Related notes',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'note'}]}],
    }),
    tagsField('genreOrTheme', 'Genre or theme'),
    relatedEntriesField(MAJOR_CONTENT_TYPES, 'Optional.'),
  ],
  preview: {
    select: {title: 'title', author: 'author', date: 'dateRead', media: 'coverImage'},
    prepare({title, author, date, media}) {
      return {title, subtitle: [author, date].filter(Boolean).join(' · '), media}
    },
  },
})
