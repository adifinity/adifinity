import {defineField, defineType} from 'sanity'

export const metricType = defineType({
  name: 'metric',
  title: 'Metric',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'Kept as text so it can hold units or qualifiers, e.g. "40%", "$2.1M", "3 markets".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'note',
      title: 'Note',
      type: 'string',
      description: 'Optional context or caveat for this figure.',
    }),
  ],
  preview: {
    select: {title: 'label', subtitle: 'value'},
  },
})
