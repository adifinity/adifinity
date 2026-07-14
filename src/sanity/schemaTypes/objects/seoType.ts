import {defineField, defineType} from 'sanity'

export const seoType = defineType({
  name: 'seo',
  title: 'SEO & sharing',
  type: 'object',
  options: {collapsible: true, collapsed: true},
  fields: [
    defineField({
      name: 'seoTitle',
      title: 'SEO title',
      type: 'string',
      validation: (Rule) =>
        Rule.max(70).warning('Search engines typically truncate titles beyond ~70 characters.'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO description',
      type: 'text',
      rows: 3,
      validation: (Rule) =>
        Rule.max(160).warning('Search engines typically truncate descriptions beyond ~160 characters.'),
    }),
    defineField({
      name: 'socialPreviewImage',
      title: 'Social preview image',
      type: 'imageWithMetadata',
      description: 'Shown when this page is shared on social media. Falls back to the site default if left blank.',
    }),
  ],
})
