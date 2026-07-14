import ClockIcon from '@sanity/icons/Clock'
import {defineField, defineType} from 'sanity'

import {MAJOR_CONTENT_TYPES, relatedEntriesField} from '../lib/sharedFields'

const LABEL_OPTIONS = [
  {title: 'Studying', value: 'studying'},
  {title: 'Reading', value: 'reading'},
  {title: 'Researching', value: 'researching'},
  {title: 'Building', value: 'building'},
  {title: 'Practising', value: 'practising'},
  {title: 'Preparing', value: 'preparing'},
  {title: 'Thinking about', value: 'thinkingAbout'},
]

// Deliberately lightweight — this is the living "Now" section. It does not
// get full article-level SEO, gallery, credits, cover media, or Portable
// Text; those would be clutter for a field that's meant to be updated often
// and read at a glance.
export const currentUpdateType = defineType({
  name: 'currentUpdate',
  title: 'Current update',
  type: 'document',
  icon: ClockIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      options: {list: LABEL_OPTIONS},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Only active updates are eligible to be shown as the latest update.',
      initialValue: true,
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'number',
      description: 'Optional — lower numbers surface first if more than one active update is shown at once.',
    }),
    relatedEntriesField(MAJOR_CONTENT_TYPES, 'Optional.'),
  ],
  preview: {
    select: {title: 'title', label: 'label', date: 'date', active: 'active'},
    prepare({title, label, date, active}) {
      const labelText = LABEL_OPTIONS.find((o) => o.value === label)?.title
      return {
        title,
        subtitle: [labelText, date, active ? undefined : 'Inactive'].filter(Boolean).join(' · '),
      }
    },
  },
})
