import Link from 'next/link'

import {SiteShell} from '@/components/site-shell'

// Root 404 — covers unmatched URLs and notFound() calls anywhere in the
// app. It renders outside the (site) route group, so it composes the
// archive chrome itself via SiteShell. Sections of the archive that
// have not been built yet land here until their stage opens them.
export default function NotFound() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-6 py-24">
        <p className="font-mono text-meta uppercase text-graphite">404 · Unfiled</p>
        <h1 className="mt-6 font-serif text-h1 text-ink">This entry is not yet filed.</h1>
        <p className="mt-4 max-w-[52ch] font-serif text-body text-graphite">
          The page you asked for does not exist in the archive — or its section has not opened
          yet.
        </p>
        <Link
          href="/"
          className="mt-10 inline-block font-sans text-caption text-ink underline decoration-1 underline-offset-4 transition-colors hover:text-annotation"
        >
          Return to the archive
        </Link>
      </div>
    </SiteShell>
  )
}
