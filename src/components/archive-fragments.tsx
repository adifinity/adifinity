import { catalogLabel } from '@/lib/entry-meta'
import type { ArchiveFragment } from '@/sanity/lib/queries'

// Real archive entries surfacing in the margin — the settled state the
// future Ledger Sort will reorganise. Deliberately non-interactive for
// now: their listing routes open in later stages, and the featured
// work section below carries the navigable rows. Plain list DOM so the
// later animation can reuse it unchanged.
export function ArchiveFragments({ fragments }: { fragments: ArchiveFragment[] }) {
  return (
    <div className="border-t border-rule pt-4">
      <h2 className="font-mono text-meta uppercase text-graphite">From the archive</h2>
      {fragments.length > 0 ? (
        <ul className="mt-1">
          {fragments.map((fragment) => (
            <li key={fragment._id} className="border-b border-rule py-3 last:border-b-0">
              <p className="font-serif text-caption text-ink">{fragment.title}</p>
              <p className="mt-1 font-mono text-meta uppercase text-graphite">
                {catalogLabel(fragment)}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 font-serif text-caption italic text-graphite">
          The catalogue is being assembled. Entries will surface here as they are filed.
        </p>
      )}
    </div>
  )
}
