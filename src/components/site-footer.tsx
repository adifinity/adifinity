import Link from 'next/link'

import {PERSON_NAME} from '@/lib/site-copy'
import {AccessionStamp} from './wordmark'

// The full sitemap, in archive order. Sections whose routes have not
// been built yet resolve to the designed "unfiled" 404 until their
// stage lands — the index is the map of the whole archive, not only
// the rooms that have opened.
const INDEX_SECTIONS = [
  {href: '/', label: 'Home'},
  {href: '/story', label: 'Story'},
  {href: '/work', label: 'Work'},
  {href: '/now', label: 'Now'},
  {href: '/notes', label: 'Notes'},
  {href: '/field-notes', label: 'Field Notes'},
  {href: '/archive', label: 'Archive'},
  {href: '/contact', label: 'Contact'},
]

export function SiteFooter() {
  return (
    <footer id="site-index" className="border-t border-rule">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-12 lg:gap-8">
        <nav aria-label="Site index" className="lg:col-span-8">
          <h2 className="font-mono text-meta uppercase text-graphite">Index</h2>
          <ul className="mt-6 grid grid-cols-2 gap-x-8 sm:grid-cols-4">
            {INDEX_SECTIONS.map((section) => (
              <li key={section.href} className="border-t border-rule">
                <Link
                  href={section.href}
                  className="block py-3 font-serif text-lede text-ink transition-colors hover:text-annotation"
                >
                  {section.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="lg:col-span-3 lg:col-start-10">
          <AccessionStamp />
          <p className="mt-10 font-sans text-caption text-graphite">
            © {new Date().getFullYear()} {PERSON_NAME} · Dhaka
          </p>
          <p className="mt-1 font-sans text-caption text-graphite">Set in Newsreader and Geist.</p>
        </div>
      </div>
    </footer>
  )
}
