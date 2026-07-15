import {SiteFooter} from './site-footer'
import {SiteHeader} from './site-header'

// The public-page chrome: skip link, header, main landmark, footer.
// Used by the (site) route-group layout and by the root not-found page
// (which renders outside the group) so the 404 keeps the full chrome.
export function SiteShell({children}: {children: React.ReactNode}) {
  return (
    <div className="flex min-h-dvh flex-col font-serif">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:px-4 focus:py-2 focus:font-sans focus:text-caption focus:text-ink"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="content" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}
