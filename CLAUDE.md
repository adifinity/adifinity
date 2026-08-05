# Adifinity

Adifinity is the personal site and living archive of **Raiyan Sadi Aditya**,
also known as **Adi**.

It is not a conventional résumé site and not an agency landing page. Treat
every design and content decision as building an evolving personal archive,
not a static marketing brochure.

## Stack

- **Next.js** 16 (App Router) with **TypeScript**
- **Tailwind CSS v4** (CSS-first; all design tokens live in
  `src/app/globals.css` via `@theme` — there is no `tailwind.config`)
- **Sanity** (with Visual Editing) as the content backend
- **Motion** (`motion` package) for animation — the **single** animation
  library. **GSAP is not used and must not be added.**
- Fonts via `next/font/google`: **Newsreader** (serif), **Geist Sans**,
  **Geist Mono** — no font packages
- **Vercel** for hosting, **GitHub** for source control

Sanity is fully wired up: embedded Studio at `/studio`, dataset `production`,
draft mode + the Presentation tool for click-to-edit visual editing. The real
content model is **built and in use** — document types `workItem`, `note`,
`fieldNote`, `experience`, `currentUpdate`, `readingEntry`, `capability`, and
the `siteSettings` singleton (plus reusable object types). Current documents
are **draft placeholders** awaiting real content.

## Current state (Phase 4 complete)

The full public experience is built in the **Marginalia** design system:
routes `/`, `/work`, `/work/[slug]`, `/story`, `/now`, `/notes`,
`/notes/[slug]`, `/field-notes`, `/field-notes/[slug]`, `/archive`,
`/contact` (+ protected `/studio`, `/test-preview`). The homepage carries the
"Ledger Sort" signature interaction; there is an accessible full-screen Index
overlay; all CMS reads go through the preview-aware `archiveFetch` gate.
Phase 4 lives on branch `phase-4-marginalia` and is **not merged to `main`**.

**Before doing any design or content work, read the two handoff documents —
they are authoritative:**

- `docs/MARGINALIA_DESIGN_HANDOFF.md` — the design system, invariants, patterns
  to reuse, and anti-patterns to avoid. Do not redesign approved systems.
- `docs/CONTENT_POPULATION_GUIDE.md` — how to fill each Sanity content type and
  what appears where publicly.

## Design direction: Marginalia

The guiding metaphor is **Marginalia** — an annotated personal library and
an evolving working archive, not a polished portfolio. Layouts, typography,
and interaction design should feel like notes in the margins of an ongoing
body of work: dated, annotated, revisable, alive. The system is implemented
and approved; see `docs/MARGINALIA_DESIGN_HANDOFF.md`.

## Sitemap

- Home
- Story
- Work
- Now
- Notes
- Field Notes
- Archive
- Contact

## Content principle

Professional/work content must always distinguish between:

1. **Demonstrated work** — things actually shipped or completed
2. **Current work** — things actively in progress right now
3. **Developing capabilities** — skills being actively built up
4. **Future aspirations** — direction and intent, not yet real

Never blur these categories together. Be explicit about which one any given
piece of content belongs to.

## Working agreements

- **Ask before installing any package** that hasn't been previously approved
  by Adi, including the Sanity/GSAP/Motion packages listed above when the
  time comes to add them.
- **Never commit secrets, API tokens, or `.env.local` files.** Environment
  files are already excluded via `.gitignore` — keep it that way.
- **Preserve accessibility, responsive design, reduced-motion support, and
  performance** in every change. This is a non-negotiable baseline, not a
  later pass.
