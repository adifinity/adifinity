import { SiteFooter } from './site-footer'
import { SiteHeader } from './site-header'
import { clean } from '@/lib/entry-meta'
import { archiveFetch } from '@/sanity/lib/fetch'
import { INDEX_QUERY, type IndexPayload } from '@/sanity/lib/queries'

// The public-page chrome: skip link, header (with the Index catalog's
// data, fetched server-side through the preview-aware gatekeeper), main
// landmark, footer. Used by the (site) route-group layout and by the
// root not-found page so the 404 keeps the full chrome.
export async function SiteShell({ children }: { children: React.ReactNode }) {
  let indexData: IndexPayload = null
  try {
    const { data } = await archiveFetch({ query: INDEX_QUERY })
    indexData = data as IndexPayload
  } catch {
    // If the archive API is unreachable the Index degrades to plain
    // navigation without counts or previews — the site stays navigable.
  }
  const cvUrl = clean(indexData?.settings?.cvFile?.url)

  return (
    <div className="flex min-h-dvh flex-col font-serif">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:px-4 focus:py-2 focus:font-sans focus:text-caption focus:text-ink"
      >
        Skip to content
      </a>
      <SiteHeader indexData={indexData} cvHref={cvUrl ?? '/cv'} />
      <main id="content" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}
