import Link from 'next/link'

import {PERSON_NAME} from '@/lib/site-copy'

// Wordmark treatment #2, "The Continuing Entry": Adifinity ending in an
// em-dash, as if the entry is still being written. The dash carries the
// single accent colour; it is decorative, so screen readers hear only
// "Adifinity — home".
export function Wordmark() {
  return (
    <Link
      href="/"
      aria-label="Adifinity — home"
      className="font-serif text-[1.375rem] leading-none tracking-tight text-ink"
    >
      Adifinity
      <span aria-hidden="true" className="text-annotation">
        —
      </span>
    </Link>
  )
}

// Wordmark treatment #1, "The Accession Stamp": the two-line lockup that
// anchors the professional identity. Used in the footer/colophon.
export function AccessionStamp() {
  return (
    <div>
      <p className="font-mono text-meta uppercase tracking-[0.35em] text-ink">Adifinity</p>
      <div aria-hidden="true" className="my-3 w-8 border-t border-rule" />
      <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-graphite">
        {PERSON_NAME} — Working archive
      </p>
    </div>
  )
}
