import {defineField, defineType} from 'sanity'

export const dateRangeType = defineType({
  name: 'dateRange',
  title: 'Date range',
  type: 'object',
  fields: [
    defineField({
      name: 'startDate',
      title: 'Start date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End date',
      type: 'date',
      description: 'Leave blank if ongoing.',
    }),
    defineField({
      name: 'isOngoing',
      title: 'Ongoing',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  validation: (Rule) =>
    Rule.custom((value: {startDate?: string; endDate?: string; isOngoing?: boolean} | undefined) => {
      if (!value) return true
      if (value.endDate && value.isOngoing) {
        return 'Mark as ongoing OR set an end date, not both.'
      }
      if (value.startDate && value.endDate && value.endDate < value.startDate) {
        return 'End date cannot be before the start date.'
      }
      return true
    }),
  preview: {
    select: {start: 'startDate', end: 'endDate', ongoing: 'isOngoing'},
    prepare({start, end, ongoing}) {
      const startLabel = start || '—'
      const endLabel = ongoing ? 'Present' : end || '—'
      return {title: `${startLabel} → ${endLabel}`}
    },
  },
})
