'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {presentationTool, defineLocations} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './src/sanity/env'
import {schema} from './src/sanity/schemaTypes'
import {SINGLETON_TYPES, structure} from './src/sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  // Site Settings is a true singleton: block it from the global "create
  // new document" menu and from the "Duplicate" action so a second copy
  // can never be created. The only way in is the fixed-id link in the
  // Structure Tool (see structure.ts).
  document: {
    newDocumentOptions: (prev, {creationContext}) => {
      if (creationContext.type === 'global') {
        return prev.filter((templateItem) => !SINGLETON_TYPES.has(templateItem.templateId))
      }
      return prev
    },
    actions: (prev, {schemaType}) =>
      SINGLETON_TYPES.has(schemaType) ? prev.filter(({action}) => action !== 'duplicate') : prev,
  },
  plugins: [
    structureTool({structure}),
    presentationTool({
      previewUrl: {
        // The real homepage is the default editing surface as of Phase 4
        // Stage 3. /test-preview remains available as the regression route.
        initial: '/',
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
      resolve: {
        locations: {
          siteSettings: defineLocations({
            select: {title: 'siteTitle'},
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || 'Site settings',
                  href: '/',
                },
              ],
            }),
          }),
          test: defineLocations({
            select: {title: 'title'},
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || 'Untitled test document',
                  href: '/test-preview',
                },
              ],
            }),
          }),
          workItem: defineLocations({
            select: {title: 'title', slug: 'slug.current'},
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || 'Untitled work item',
                  href: doc?.slug ? `/work/${doc.slug}` : '/work',
                },
                {title: 'Work index', href: '/work'},
              ],
            }),
          }),
          note: defineLocations({
            select: {title: 'title', slug: 'slug.current'},
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || 'Untitled note',
                  href: doc?.slug ? `/notes/${doc.slug}` : '/notes',
                },
                {title: 'Notes index', href: '/notes'},
              ],
            }),
          }),
          fieldNote: defineLocations({
            select: {title: 'title', slug: 'slug.current'},
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || 'Untitled field note',
                  href: doc?.slug ? `/field-notes/${doc.slug}` : '/field-notes',
                },
                {title: 'Field Notes index', href: '/field-notes'},
              ],
            }),
          }),
          currentUpdate: defineLocations({
            select: {title: 'title'},
            resolve: (doc) => ({
              locations: [
                {title: doc?.title || 'Current update', href: '/now'},
                {title: 'Homepage (latest update)', href: '/'},
              ],
            }),
          }),
          experience: defineLocations({
            select: {title: 'title'},
            resolve: (doc) => ({
              locations: [
                {title: doc?.title || 'Experience', href: '/story'},
                {title: 'Archive', href: '/archive'},
              ],
            }),
          }),
          readingEntry: defineLocations({
            select: {title: 'title'},
            resolve: (doc) => ({
              locations: [
                {title: doc?.title || 'Reading entry', href: '/archive'},
              ],
            }),
          }),
          capability: defineLocations({
            select: {name: 'name'},
            resolve: (doc) => ({
              locations: [
                {title: doc?.name || 'Capability', href: '/story'},
              ],
            }),
          }),
        },
      },
    }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
