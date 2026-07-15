import Link from 'next/link'

import {Wordmark} from './wordmark'

// Utility links stay plainly visible from 1024px (lg) up so a visitor
// can reach Work, Story, Contact, or the CV without opening the Index.
// Below lg, the static Index trigger is the way in: it points at the
// full site index in the footer until the interactive overlay exists.
const UTILITY_LINKS = [
  {href: '/work', label: 'Work'},
  {href: '/story', label: 'Story'},
  {href: '/contact', label: 'Contact'},
  {href: '/cv', label: 'CV'},
]

export function SiteHeader() {
  return (
    <header className="border-b border-rule">
      <div className="mx-auto flex max-w-7xl items-baseline justify-between gap-6 px-6 py-5">
        <Wordmark />
        <nav aria-label="Primary" className="flex items-baseline gap-7">
          <ul className="hidden items-baseline gap-7 lg:flex">
            {UTILITY_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-sans text-caption text-graphite underline-offset-4 transition-colors hover:text-ink hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/#site-index"
            className="font-mono text-meta uppercase text-ink transition-colors hover:text-annotation"
          >
            Index
          </Link>
        </nav>
      </div>
    </header>
  )
}
