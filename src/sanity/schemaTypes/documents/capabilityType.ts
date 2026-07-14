import BulbOutlineIcon from '@sanity/icons/BulbOutline'
import {defineField, defineType} from 'sanity'

import {isUniqueSlugForType} from '../lib/slug'
import {tagsField} from '../lib/sharedFields'

const CAPABILITY_PHASE_OPTIONS = [
  {title: 'Current', value: 'current'},
  {title: 'Emerging', value: 'emerging'},
]

export const capabilityType = defineType({
  name: 'capability',
  title: 'Capability',
  type: 'document',
  icon: BulbOutlineIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
        isUnique: isUniqueSlugForType('capability'),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Keep this grounded — this is not a commercial capabilities claim.',
    }),
    defineField({
      name: 'phase',
      title: 'Phase',
      type: 'string',
      options: {list: CAPABILITY_PHASE_OPTIONS},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'linkedExamples',
      title: 'Linked examples',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'workItem'}]}],
    }),
    tagsField('methods', 'Methods'),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display order',
      type: 'number',
    }),
  ],
  preview: {
    select: {title: 'name', phase: 'phase', active: 'active'},
    prepare({title, phase, active}) {
      const phaseLabel = CAPABILITY_PHASE_OPTIONS.find((o) => o.value === phase)?.title
      return {title, subtitle: [phaseLabel, active ? undefined : 'Inactive'].filter(Boolean).join(' · ')}
    },
  },
})
