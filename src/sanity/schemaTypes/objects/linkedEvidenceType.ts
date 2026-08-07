import {defineField, defineType} from 'sanity'

// Linked visual evidence: a screenshot/preview of a specific external post
// whose IMAGE and CITATION both open the original source. Not gallery
// media, not a downloadable file, not a social embed — a visual citation
// with an authoritative external destination. The local image survives
// even if the external URL later rots.
export const linkedEvidenceType = defineType({
  name: 'linkedEvidence',
  title: 'Linked evidence',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Preview image',
      type: 'imageWithMetadata',
      description:
        'A screenshot of the original post. Its alt text should describe what the screenshot shows (not the destination).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Short label for the evidence, e.g. "President appointment".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      description: 'Who published the original — e.g. "DRMC Model United Nations Association".',
    }),
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      description: 'Optional label only — e.g. Facebook, Instagram, a website. The URL is authoritative.',
    }),
    defineField({
      name: 'url',
      title: 'Original source URL',
      type: 'url',
      description: 'The authoritative external post. The image and the citation both open this in a new tab.',
      validation: (Rule) => Rule.required().uri({scheme: ['http', 'https']}),
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'url', media: 'image'},
  },
})
