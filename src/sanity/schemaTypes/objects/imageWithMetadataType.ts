import {defineField, defineType} from 'sanity'

export const imageWithMetadataType = defineType({
  name: 'imageWithMetadata',
  title: 'Image',
  type: 'image',
  options: {hotspot: true},
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative text',
      type: 'string',
      description:
        'Describes the image for screen readers and search engines. Required before the containing document can be published.',
      validation: (Rule) =>
        Rule.custom((alt, context) => {
          const doc = context.document as {status?: string} | undefined
          if (doc?.status === 'published' && !alt) {
            return 'Alt text is required before this can be published.'
          }
          return true
        }),
    }),
    defineField({name: 'caption', title: 'Caption', type: 'string'}),
    defineField({
      name: 'credit',
      title: 'Credit',
      type: 'string',
      description: 'Photographer, source, or attribution, if applicable.',
    }),
  ],
})
