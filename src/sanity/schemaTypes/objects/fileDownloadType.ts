import {defineField, defineType} from 'sanity'

export const fileDownloadType = defineType({
  name: 'fileDownload',
  title: 'File download',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'file',
      title: 'File',
      type: 'file',
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'description', title: 'Description', type: 'string'}),
  ],
  preview: {
    select: {title: 'title'},
  },
})
