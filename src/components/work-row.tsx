import Link from 'next/link'

import { MetaLine } from './meta-line'
import { Plate } from './plate'
import { categoryLabel, clean, formatDateRange, phaseLabel, yearOf } from '@/lib/entry-meta'
import type { FeaturedWorkItem } from '@/sanity/lib/queries'

// One editorial catalog row for the Featured Work section: rules, not
// boxes; the whole row is the link when a destination exists.
export function WorkRow({ item }: { item: FeaturedWorkItem }) {
  const slug = clean(item.slug)

  const inner = (
    <div className="grid gap-6 py-8 sm:grid-cols-12 sm:gap-8">
      <div className={item.coverMedia?.asset ? 'sm:col-span-8' : 'sm:col-span-10'}>
        <MetaLine
          parts={[
            'W',
            yearOf(item.dateRange?.startDate),
            categoryLabel(item.primaryCategory),
            formatDateRange(item.dateRange),
            phaseLabel(item.phase),
          ]}
        />
        <h3 className="mt-3 max-w-[24ch] font-serif text-h2 text-ink transition-colors group-hover:text-annotation">
          {item.title}
        </h3>
        {item.summary && (
          <p className="mt-3 max-w-[58ch] font-serif text-body text-graphite">{item.summary}</p>
        )}
        {slug && (
          <p className="mt-4 font-sans text-caption text-graphite transition-colors group-hover:text-annotation">
            Read the entry<span aria-hidden="true"> →</span>
          </p>
        )}
      </div>
      {item.coverMedia?.asset && (
        <div className="sm:col-span-4">
          <Plate
            image={item.coverMedia}
            width={420}
            height={280}
            sizes="(min-width: 640px) 33vw, 100vw"
          />
        </div>
      )}
    </div>
  )

  return (
    <li className="border-t border-rule">
      {slug ? (
        <Link href={`/work/${slug}`} className="group block">
          {inner}
        </Link>
      ) : (
        inner
      )}
    </li>
  )
}
