import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity/visual-editing'

import { DisableDraftMode } from '@/components/disable-draft-mode'
import { FileList } from '@/components/file-list'
import { clean } from '@/lib/entry-meta'
import { archiveFetch } from '@/sanity/lib/fetch'
import { SanityLive } from '@/sanity/lib/live'
import { CONTACT_QUERY, type ContactPayload } from '@/sanity/lib/queries'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Correspondence details for Raiyan Sadi Aditya and the Adifinity archive.',
  alternates: { canonical: '/contact' },
}

// Contact — direct and calm. Real correspondence details from Site
// Settings, the CV only when a file actually exists, and nothing that
// sells.
export default async function ContactPage() {
  const { data } = await archiveFetch({ query: CONTACT_QUERY })
  const contact = data as ContactPayload
  const isDraftMode = (await draftMode()).isEnabled

  const contactLinks = (contact?.contactLinks ?? []).filter((link) => clean(link.url))
  const socialLinks = (contact?.socialLinks ?? []).filter((link) => clean(link.url))
  const cv = contact?.cvFile && clean(contact.cvFile.url) ? contact.cvFile : null

  const linkGroups = [
    { label: 'Correspondence', links: contactLinks },
    { label: 'Elsewhere', links: socialLinks },
  ].filter((group) => group.links.length > 0)

  return (
    <div className="mx-auto max-w-7xl px-6">
      <section className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-8">
          <p className="font-mono text-meta uppercase text-graphite">Contact</p>
          <h1 className="mt-6 font-serif text-display text-ink">Contact</h1>
          <p className="mt-6 max-w-[58ch] font-serif text-lede text-ink">
            The archive is open to correspondence about the work in it.
          </p>

          {linkGroups.length > 0 ? (
            <div className="mt-12 space-y-10">
              {linkGroups.map((group) => (
                <div key={group.label} className="border-t border-rule pt-4">
                  <h2 className="font-mono text-meta uppercase text-graphite">{group.label}</h2>
                  <ul className="mt-3 space-y-2">
                    {group.links.map((link, index) => {
                      const href = clean(link.url) as string
                      const external = href.startsWith('http')
                      return (
                        <li key={index}>
                          <a
                            href={href}
                            {...(external
                              ? { target: '_blank', rel: 'noopener noreferrer' }
                              : {})}
                            className="font-serif text-lede text-ink underline decoration-1 underline-offset-4 transition-colors hover:text-annotation"
                          >
                            {link.label || href}
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-12 max-w-[52ch] border-t border-rule pt-6 font-serif text-body italic text-graphite">
              Correspondence details will be filed here in time. Until then,
              the archive speaks for itself.
            </p>
          )}
        </div>

        <aside aria-label="Curriculum vitae" className="lg:col-span-3 lg:col-start-10">
          {cv && (
            <div className="border-t border-rule pt-4">
              <h2 className="font-mono text-meta uppercase text-graphite">CV</h2>
              <FileList files={[cv]} />
            </div>
          )}
        </aside>
      </section>

      <SanityLive />
      {isDraftMode && (
        <>
          <VisualEditing />
          <DisableDraftMode />
        </>
      )}
    </div>
  )
}
