import Link from 'next/link'

import { SiteIndex } from './site-index'
import { Wordmark } from './wordmark'
import type { IndexPayload } from '@/sanity/lib/queries'

// Utility links stay plainly visible from 1024px (lg) up so a visitor
// can reach Work, Story, Contact, or the CV without opening the Index —
// the Index supplements this navigation, it does not replace it. The CV
// link points at the real Site Settings CV file when one exists.
const UTILITY_LINK_CLASSES =
  'font-sans text-caption text-graphite underline-offset-4 transition-colors hover:text-ink hover:underline'

export function SiteHeader({
  indexData,
  cvHref,
}: {
  indexData: IndexPayload
  cvHref: string
}) {
  const utilityLinks = [
    { href: '/work', label: 'Work' },
    { href: '/story', label: 'Story' },
    { href: '/contact', label: 'Contact' },
  ]
  const cvIsFile = cvHref.startsWith('http')

  return (
    <header className="border-b border-rule">
      <div className="mx-auto flex max-w-7xl items-baseline justify-between gap-6 px-6 py-5">
        <Wordmark />
        <nav aria-label="Primary" className="flex items-baseline gap-7">
          <ul className="hidden items-baseline gap-7 lg:flex">
            {utilityLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={UTILITY_LINK_CLASSES}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              {cvIsFile ? (
                <a
                  href={cvHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={UTILITY_LINK_CLASSES}
                >
                  CV
                </a>
              ) : (
                <Link href={cvHref} className={UTILITY_LINK_CLASSES}>
                  CV
                </Link>
              )}
            </li>
          </ul>
          <SiteIndex data={indexData} />
        </nav>
      </div>
    </header>
  )
}
