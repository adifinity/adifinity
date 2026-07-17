'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'

import { Settle } from './settle'
import { catalogLabel, clean } from '@/lib/entry-meta'
import { DURATION, EASE_SETTLE } from '@/lib/motion-tokens'
import type { IndexPayload } from '@/sanity/lib/queries'

// The archive's master catalog: trigger plus full-screen Index overlay.
// One isolated client island — data arrives fully fetched and gated from
// the server; nothing here talks to Sanity. Before hydration (and with
// JavaScript off) the trigger stays the Stage 1 anchor to the footer
// index, so navigation never depends on this script.
// Canonical hydration signal: false during SSR and the first client
// render, true once hydrated — without setState-in-effect.
const emptySubscribe = () => () => {}
function useHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )
}

export function SiteIndex({ data }: { data: IndexPayload }) {
  const [open, setOpen] = useState(false)
  const mounted = useHydrated()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const previousPath = useRef(pathname)

  // A chosen destination closes the catalog.
  useEffect(() => {
    if (previousPath.current !== pathname) {
      previousPath.current = pathname
      setOpen(false)
    }
  }, [pathname])

  // Body scroll lock with scrollbar compensation: no layout jump, and
  // the page keeps its scroll position for when the catalog closes.
  useEffect(() => {
    if (!open) return
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    const previousOverflow = document.body.style.overflow
    const previousPadding = document.body.style.paddingRight
    document.body.style.overflow = 'hidden'
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`
    return () => {
      document.body.style.overflow = previousOverflow
      document.body.style.paddingRight = previousPadding
    }
  }, [open])

  // Focus management: focus moves into the catalog when it opens, Tab
  // cycles inside it, Escape closes, and closing returns focus to the
  // trigger — including when closing came from choosing a destination.
  useEffect(() => {
    if (!open) return
    const panel = panelRef.current
    panel?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
        return
      }
      if (event.key !== 'Tab' || !panel) return
      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      ).filter((el) => el.getClientRects().length > 0)
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement
      if (event.shiftKey) {
        if (active === first || active === panel) {
          event.preventDefault()
          last.focus()
        }
      } else if (active === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    const trigger = triggerRef.current
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      trigger?.focus()
    }
  }, [open])

  const counts = data?.counts
  const totalArchive = counts
    ? counts.work + counts.notes + counts.fieldNotes + counts.reading + counts.experiences
    : 0
  const cvUrl = clean(data?.settings?.cvFile?.url)

  const destinations: { label: string; href: string; count?: number; external?: boolean }[] = [
    { label: 'Home', href: '/' },
    { label: 'Story', href: '/story' },
    { label: 'Work', href: '/work', count: counts?.work },
    { label: 'Now', href: '/now', count: counts?.updates },
    { label: 'Notes', href: '/notes', count: counts?.notes },
    { label: 'Field Notes', href: '/field-notes', count: counts?.fieldNotes },
    { label: 'Archive', href: '/archive', count: totalArchive || undefined },
    { label: 'Contact', href: '/contact' },
    ...(cvUrl ? [{ label: 'CV', href: cvUrl, external: true }] : []),
  ]

  const recent = data?.recent ?? []
  const correspondence = [
    ...(data?.settings?.contactLinks ?? []),
    ...(data?.settings?.socialLinks ?? []),
  ]
  const archiveIsYoung = counts !== undefined && totalArchive === 0

  return (
    <MotionConfig reducedMotion="user">
      {mounted ? (
        <button
          ref={triggerRef}
          type="button"
          aria-expanded={open}
          aria-controls="site-index-overlay"
          onClick={() => setOpen((value) => !value)}
          className="font-mono text-meta uppercase text-ink transition-colors hover:text-annotation"
        >
          Index
        </button>
      ) : (
        <Link
          href="/#site-index"
          className="font-mono text-meta uppercase text-ink transition-colors hover:text-annotation"
        >
          Index
        </Link>
      )}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id="site-index-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Site index"
            tabIndex={-1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            // pointerEvents applies instantly when the exit starts, so
            // the fading (or, in a throttled background tab, lingering)
            // layer never swallows clicks meant for the page beneath.
            exit={{ opacity: 0, pointerEvents: 'none', transition: { duration: DURATION.exit } }}
            transition={{ duration: DURATION.control, ease: EASE_SETTLE }}
            className="fixed inset-0 z-50 overflow-y-auto bg-paper"
          >
            <div className="mx-auto max-w-7xl px-6">
              <div className="flex items-baseline justify-between border-b border-rule py-5">
                <p className="font-mono text-meta uppercase text-annotation">Index</p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="py-2 pl-4 font-mono text-meta uppercase text-ink transition-colors hover:text-annotation"
                >
                  Close <span aria-hidden="true">✕</span>
                </button>
              </div>

              <div className="grid gap-12 py-10 pb-16 lg:grid-cols-12 lg:gap-8">
                <nav aria-label="Archive sections" className="lg:col-span-7">
                  <ul>
                    {destinations.map((destination, index) => (
                      <li key={destination.href} className="border-b border-rule">
                        <Settle delay={Math.min(index * 0.03, 0.2)}>
                          {destination.external ? (
                            <a
                              href={destination.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setOpen(false)}
                              className="group flex items-baseline justify-between gap-6 py-4"
                            >
                              <span className="font-serif text-h2 text-ink transition-colors group-hover:text-annotation">
                                {destination.label}
                              </span>
                              <span className="font-mono text-meta uppercase text-graphite">
                                File
                              </span>
                            </a>
                          ) : (
                            <Link
                              href={destination.href}
                              onClick={() => setOpen(false)}
                              className="group flex items-baseline justify-between gap-6 py-4"
                            >
                              <span className="font-serif text-h2 text-ink transition-colors group-hover:text-annotation">
                                {destination.label}
                              </span>
                              {destination.count != null && destination.count > 0 && (
                                <span className="font-mono text-meta uppercase text-graphite">
                                  {destination.count} filed
                                </span>
                              )}
                            </Link>
                          )}
                        </Settle>
                      </li>
                    ))}
                  </ul>
                  {archiveIsYoung && (
                    <p className="mt-6 font-serif text-caption italic text-graphite">
                      The archive is young — sections open as entries are filed.
                    </p>
                  )}
                </nav>

                <div className="hidden md:block lg:col-span-4 lg:col-start-9">
                  <Settle delay={0.1}>
                    <h3 className="border-t border-rule pt-4 font-mono text-meta uppercase text-graphite">
                      Recently filed
                    </h3>
                    {recent.length > 0 ? (
                      <ul className="mt-1">
                        {recent.map((fragment) => (
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
                        Nothing is filed here yet.
                      </p>
                    )}

                    {correspondence.length > 0 && (
                      <>
                        <h3 className="mt-10 border-t border-rule pt-4 font-mono text-meta uppercase text-graphite">
                          Correspondence
                        </h3>
                        <ul className="mt-3 space-y-2">
                          {correspondence.map((link) => {
                            const href = clean(link.url)
                            if (!href) return null
                            return (
                              <li key={href}>
                                <a
                                  href={href}
                                  rel="noopener noreferrer"
                                  className="font-sans text-caption text-ink underline decoration-1 underline-offset-4 transition-colors hover:text-annotation"
                                >
                                  {link.label}
                                </a>
                              </li>
                            )
                          })}
                        </ul>
                      </>
                    )}
                  </Settle>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  )
}
