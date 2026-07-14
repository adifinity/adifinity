import CogIcon from '@sanity/icons/Cog'
import {defineField, defineType} from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  icon: CogIcon,
  // Enforced as a true singleton via the fixed document ID in structure.ts
  // and the newDocumentOptions/document actions filters in sanity.config.ts.
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'shortBio', title: 'Short bio', type: 'text', rows: 3}),
    defineField({name: 'longBio', title: 'Long bio', type: 'blockContent'}),
    defineField({name: 'heroCopy', title: 'Hero copy', type: 'blockContent'}),

    defineField({
      name: 'featuredCurrentEntry',
      title: 'Featured current entry',
      type: 'reference',
      to: [{type: 'workItem'}, {type: 'experience'}, {type: 'currentUpdate'}],
      description:
        'Manually selected — what the homepage highlights as "what I\'m known for right now". Distinct from Latest Update, which is computed automatically. Never merge these two concepts.',
    }),
    defineField({
      name: 'featuredWork',
      title: 'Featured work',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'workItem'}]}],
      description: 'Ordered — drag to reorder. This order is the display order.',
    }),

    defineField({
      name: 'contactLinks',
      title: 'Contact links',
      type: 'array',
      of: [{type: 'externalLink'}],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      type: 'array',
      of: [{type: 'externalLink'}],
    }),
    defineField({name: 'cvFile', title: 'CV file', type: 'fileDownload'}),
    defineField({name: 'profileImage', title: 'Profile image', type: 'imageWithMetadata'}),
    defineField({name: 'siteLogoOrWordmark', title: 'Site logo or wordmark', type: 'imageWithMetadata'}),

    defineField({name: 'defaultSeoTitle', title: 'Default SEO title', type: 'string'}),
    defineField({name: 'defaultSeoDescription', title: 'Default SEO description', type: 'text', rows: 3}),
    defineField({
      name: 'defaultSocialPreviewImage',
      title: 'Default social preview image',
      type: 'imageWithMetadata',
    }),
  ],
  preview: {
    select: {title: 'siteTitle'},
    prepare({title}) {
      return {title: 'Site settings', subtitle: title}
    },
  },
})
