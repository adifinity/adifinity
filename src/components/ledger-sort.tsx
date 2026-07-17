'use client'

import { useLayoutEffect } from 'react'
// The mini engine is pure WAAPI: animations run on the compositor, so
// they neither depend on requestAnimationFrame (throttled in background
// or low-power tabs) nor touch the main thread while in flight.
import { animate } from 'motion/mini'

import { LEDGER_SESSION_KEY } from '@/lib/ledger-gate'
import { EASE_SETTLE } from '@/lib/motion-tokens'

// The Ledger Sort — the homepage's one deliberately spectacular
// interaction. The real archive briefly reads as a typographic index,
// reorganises around the Featured Current Entry, and resolves into the
// exact settled Stage 3 composition.
//
// This island renders nothing. It choreographs the existing
// server-rendered elements with transform and opacity only (WAAPI via
// Motion's `animate`, so the work stays compositor-side even in
// throttled background tabs), then clears every inline style it set.
// The semantic DOM, reading order, and focus order never change.
//
// It only acts when the arrival gate (ledger-gate.tsx) stamped this
// document with data-ledger="pending" before hydration. Taking
// ownership of that arrival is what commits the once-per-tab-session
// flag — so only an eligible homepage document ever consumes it.

// Timing (seconds) — Stage 4 motion language: settle and ink.
const HOLD = 0.22 // the index is readable before anything moves
const RESOLVE_DURATION = 0.48 // fragments travel to their settled places
const RESOLVE_STAGGER = 0.035
const EXPAND_DELAY = HOLD + 0.16 // featured line opens after recognition
const EXPAND_DURATION = 0.5
const INK_DURATION = 0.3
const INK_STAGGER = 0.05
const LEDGER_GAP = 14 // px between index lines
const LEDGER_TEXT_PX = 17 // the featured line's visual size in the index

export function LedgerSort() {
  useLayoutEffect(() => {
    const html = document.documentElement
    // 'reveal' disarms the server-rendered CSS hold and its failsafe
    // clock in one move — every exit path leads here.
    const reveal = () => html.setAttribute('data-ledger', 'reveal')
    if (html.getAttribute('data-ledger') !== 'pending') {
      // Not this island's arrival: already played this session,
      // revealed by the gate, or mounted via client navigation into a
      // non-pending document. Ensure the page is visible; stand down.
      reveal()
      return
    }
    // Take ownership of the arrival — this, and only this, commits the
    // once-per-tab-session flag.
    try {
      sessionStorage.setItem(LEDGER_SESSION_KEY, '1')
    } catch {
      /* storage unavailable — the signature may simply play again */
    }

    const title = document.getElementById('featured-title')
    const article = title?.closest('article') ?? null
    const fragments = Array.from(
      document.querySelectorAll<HTMLElement>('[data-ledger="fragment"]'),
    )
    const nowModule = document.querySelector<HTMLElement>('[data-ledger="now"]')
    const fragmentsHead = document.querySelector<HTMLElement>('[data-ledger="fragments-head"]')

    // Minimum viable data, re-checked against the live DOM; plus: never
    // start when the visitor has already scrolled (back-navigation) or
    // asks for reduced motion. Failing any check means the settled page,
    // immediately.
    if (
      !title ||
      !article ||
      fragments.length < 2 ||
      window.scrollY > 40 ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      reveal()
      return
    }

    const inks: HTMLElement[] = [
      ...(Array.from(article.children).filter((el) => el !== title) as HTMLElement[]),
      ...(fragmentsHead ? [fragmentsHead] : []),
    ]
    const movers: HTMLElement[] = [title, ...fragments, ...(nowModule ? [nowModule] : [])]
    const controls: { stop: () => void }[] = []
    let settled = false

    // The one central settle/cancel path: stop everything, clear every
    // inline style this island set, reveal, detach. Idempotent.
    const settle = () => {
      if (settled) return
      settled = true
      controls.forEach((control) => {
        try {
          control.stop()
        } catch {
          /* already finished */
        }
      })
      for (const el of [...movers, ...inks]) {
        el.style.transform = ''
        el.style.transformOrigin = ''
        el.style.opacity = ''
        el.style.color = ''
        el.style.pointerEvents = ''
      }
      reveal()
      removeListeners()
    }

    const onInteract = () => settle()
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') settle()
    }
    // Interaction wins over the intro, always: any pointer, key, scroll
    // or resize settles the page instantly. Document-level capture also
    // covers the Index trigger regardless of hydration order.
    const addListeners = () => {
      window.addEventListener('scroll', onInteract, { passive: true })
      window.addEventListener('wheel', onInteract, { passive: true })
      window.addEventListener('touchmove', onInteract, { passive: true })
      window.addEventListener('keydown', onInteract)
      window.addEventListener('resize', onInteract)
      document.addEventListener('pointerdown', onInteract, { capture: true })
      document.addEventListener('visibilitychange', onVisibility)
    }
    const removeListeners = () => {
      window.removeEventListener('scroll', onInteract)
      window.removeEventListener('wheel', onInteract)
      window.removeEventListener('touchmove', onInteract)
      window.removeEventListener('keydown', onInteract)
      window.removeEventListener('resize', onInteract)
      document.removeEventListener('pointerdown', onInteract, { capture: true })
      document.removeEventListener('visibilitychange', onVisibility)
      document.removeEventListener('visibilitychange', onFirstVisible)
    }

    const run = () => {
      if (settled) return

      // Single read pass.
      const articleRect = article.getBoundingClientRect()
      const titleFontSize = parseFloat(getComputedStyle(title).fontSize) || 48
      const titleScale = Math.min(0.5, Math.max(0.24, LEDGER_TEXT_PX / titleFontSize))
      const measured = (el: HTMLElement, scale: number) => ({
        el,
        rect: el.getBoundingClientRect(),
        scale,
      })
      const fragmentItems = fragments.map((el) => measured(el, 1))
      // Index order: the featured line sits among its peers (second),
      // the latest update line last — it departs to its margin dock.
      const ordered = [
        ...fragmentItems.slice(0, 1),
        measured(title, titleScale),
        ...fragmentItems.slice(1),
        ...(nowModule ? [measured(nowModule, 1)] : []),
      ]

      // Single write pass: place everything at its ledger slot.
      let slotY = articleRect.top
      const placements = ordered.map((item) => {
        const dx = articleRect.left - item.rect.left
        const dy = slotY - item.rect.top
        slotY += item.rect.height * item.scale + LEDGER_GAP
        return { ...item, dx, dy }
      })
      for (const p of placements) {
        p.el.style.transformOrigin = 'left top'
        p.el.style.transform =
          `translate(${p.dx}px, ${p.dy}px)` + (p.scale !== 1 ? ` scale(${p.scale})` : '')
        p.el.style.opacity = '1'
      }
      // Recognition: the current entry's line carries the editor's red
      // until it opens; the ink elements wait invisibly and must not
      // catch pointers while they do.
      title.style.color = 'var(--annotation)'
      for (const el of inks) {
        el.style.opacity = '0'
        el.style.pointerEvents = 'none'
      }
      // Inline styles are now authoritative — stamping 'reveal' in the
      // same pre-paint frame disarms the CSS hold and its failsafe
      // clock, so the first visible frame is the index.
      reveal()

      const ease = EASE_SETTLE as unknown as [number, number, number, number]
      const finished: Promise<unknown>[] = []
      let fragmentIndex = 0
      for (const p of placements) {
        const isTitle = p.el === title
        const target =
          'translate(0px, 0px)' + (p.scale !== 1 ? ' scale(1)' : '')
        const control = animate(
          p.el,
          { transform: target },
          {
            duration: isTitle ? EXPAND_DURATION : RESOLVE_DURATION,
            delay: isTitle
              ? EXPAND_DELAY
              : HOLD + Math.min(fragmentIndex++ * RESOLVE_STAGGER, 0.2),
            ease,
          },
        )
        controls.push(control)
        finished.push(control.finished ?? Promise.resolve())
      }
      // The red mark becomes ink as the line opens.
      const inkFlip = window.setTimeout(
        () => {
          if (!settled) title.style.color = ''
        },
        (EXPAND_DELAY + EXPAND_DURATION * 0.5) * 1000,
      )
      controls.push({ stop: () => window.clearTimeout(inkFlip) })

      const inkStart = EXPAND_DELAY + EXPAND_DURATION * 0.75
      inks.forEach((el, i) => {
        el.style.transform = 'translateY(6px)'
        const control = animate(
          el,
          { opacity: 1, transform: 'translateY(0px)' },
          { duration: INK_DURATION, delay: inkStart + i * INK_STAGGER, ease },
        )
        controls.push(control)
        finished.push(control.finished ?? Promise.resolve())
      })

      Promise.allSettled(finished).then(settle)
      // Deterministic backstop: whatever happens to the animation
      // clock or its promises, the page is pristine and fully
      // interactive no later than total duration plus margin.
      const backstop = window.setTimeout(settle, 1800)
      controls.push({ stop: () => window.clearTimeout(backstop) })
    }

    const startWhenReady = () => {
      if (settled) return
      if (!document.fonts || document.fonts.status === 'loaded') {
        run()
      } else {
        // Measure with real metrics when possible, but never gate long:
        // whichever comes first — fonts ready or 600ms — starts the
        // sequence; participants stay held by the pending state meanwhile.
        let started = false
        const kick = () => {
          if (!started) {
            started = true
            run()
          }
        }
        document.fonts.ready.then(kick)
        window.setTimeout(kick, 600)
      }
    }

    // A tab arriving in the background has no animation clock. Its real
    // arrival is the first visible moment — play then, unless the
    // script's failsafe already revealed the settled page while hidden.
    const onFirstVisible = () => {
      if (document.visibilityState !== 'visible') return
      document.removeEventListener('visibilitychange', onFirstVisible)
      if (html.getAttribute('data-ledger') === 'pending') startWhenReady()
      else settle()
    }

    addListeners()
    if (document.visibilityState === 'hidden') {
      // A tab arriving in the background has no reliable animation
      // clock — keep the arrival pending and play on the first visible
      // moment. If the pure-CSS failsafe reveals meanwhile, it does so
      // unobserved in a hidden tab; run() stamps 'reveal', which
      // disarms that failsafe before its inline styles take over.
      document.addEventListener('visibilitychange', onFirstVisible)
    } else {
      startWhenReady()
    }

    return () => {
      document.removeEventListener('visibilitychange', onFirstVisible)
      settle()
    }
  }, [])

  return null
}
