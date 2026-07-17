import { formatDate, updateLabel } from '@/lib/entry-meta'
import type { LatestUpdatePayload } from '@/sanity/lib/queries'

// The Latest Update margin module — computed by LATEST_UPDATE_QUERY,
// never merged with the manually chosen Featured Current Entry, and
// never used as its fallback. Non-navigational for now: the /now route
// opens in a later stage, so this renders as a dated marginal note with
// no link at all.
export function LatestUpdate({ update }: { update: LatestUpdatePayload }) {
  return (
    <div data-ledger="now" className="border-t border-rule pt-4">
      <h2 className="font-mono text-meta uppercase text-annotation">Now</h2>
      {update ? (
        <>
          <p className="mt-3 font-mono text-meta uppercase text-graphite">
            {[updateLabel(update.label), formatDate(update.date)].filter(Boolean).join(' — ')}
          </p>
          <p className="mt-2 font-serif text-caption text-ink">{update.title}</p>
          {update.description && (
            <p className="mt-2 font-serif text-caption italic leading-relaxed text-graphite">
              {update.description}
            </p>
          )}
        </>
      ) : (
        <p className="mt-3 font-serif text-caption italic text-graphite">
          No update recorded yet.
        </p>
      )}
    </div>
  )
}
