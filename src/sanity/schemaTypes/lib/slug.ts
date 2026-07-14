import type {SlugValidationContext} from 'sanity'

// Sanity's default slug uniqueness check ignores document type, which would
// wrongly flag e.g. a note and a workItem sharing a slug as a conflict even
// though they live at different URLs. Scoping the check to `type` keeps
// uniqueness meaningful per content type.
export function isUniqueSlugForType(type: string) {
  return async (slug: string, context: SlugValidationContext) => {
    const {document, getClient} = context
    if (!document?._id) return true

    const client = getClient({apiVersion: '2025-01-01'})
    const id = document._id.replace(/^drafts\./, '')
    const params = {
      draft: `drafts.${id}`,
      published: id,
      slug,
      type,
    }
    const query = `!defined(*[_type == $type && !(_id in [$draft, $published]) && slug.current == $slug][0]._id)`

    return await client.fetch(query, params)
  }
}
