'use client'

import Link from 'next/link'

// Error boundary for public pages — renders inside the (site) layout,
// so the archive chrome stays visible when something fails.
export default function SiteError({
  reset,
}: {
  error: Error & {digest?: string}
  reset: () => void
}) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <p className="font-mono text-meta uppercase text-annotation">Error · Retrieval</p>
      <h1 className="mt-6 font-serif text-h1 text-ink">This entry could not be retrieved.</h1>
      <p className="mt-4 max-w-[52ch] font-serif text-body text-graphite">
        Something went wrong while opening this part of the archive. You can try again, or return
        to the start.
      </p>
      <div className="mt-10 flex items-baseline gap-6 font-sans text-caption">
        <button
          type="button"
          onClick={() => reset()}
          className="border border-rule px-4 py-2 text-ink transition-colors hover:border-ink"
        >
          Try again
        </button>
        <Link
          href="/"
          className="text-graphite underline underline-offset-4 transition-colors hover:text-ink"
        >
          Return to the archive
        </Link>
      </div>
    </div>
  )
}
