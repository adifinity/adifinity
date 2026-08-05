# Adifinity — Phase 4 Progress & Handoff

_The personal website and living archive of **Raiyan Sadi Aditya** (creative identity: **Adifinity**)._
_Public domain: https://adityaraiyan.com_

**Last updated:** end of the Phase 4 completion sprint.
**This document is a handoff.** It captures everything built so far, the exact git state, the design system, the architecture, what is verified, and what remains — so work can continue in a fresh session or a different place without re-deriving anything.

---

## 0. TL;DR — where things stand right now

- **Phase 4 is functionally complete.** Every page in the approved sitemap exists and is built in the "Marginalia" design system.
- **Working branch:** `phase-4-marginalia`
- **Current commit (HEAD):** `d6ee2b8` — _"Complete remaining Marginalia public experience"_
- **Working tree:** clean (nothing uncommitted).
- **Pushed?** Yes. Local `phase-4-marginalia` == `origin/phase-4-marginalia`. All 9 Phase 4 commits are on GitHub as backup.
- **Merged to `main`?** **No.** `main` is still at `af94ebc` (Phase 3). Phase 4 has NOT been merged. The live site at adityaraiyan.com still runs `main` (Phase 3) until someone merges.
- **What's left before it feels "finished":** it needs **real content** (the CMS still holds only draft placeholders) and a few **manual Studio configuration steps** (listed in §11). No more design/build work is strictly required to ship the structure.

---

## 1. What Adifinity is

Not a résumé site, not an agency landing page. It is an **annotated personal library and living working archive** — projects, experiences, books, notes, travel observations, and research all treated as **entries in one evolving catalog**.

The personal transformation it expresses:
> private reader → public debater → institutional builder → business student → emerging finance & strategy professional

The tone is editorial, contemporary, tactile, quiet, precise, slightly cinematic. It deliberately avoids portfolio templates, bento grids, glassmorphism, dark-academia cosplay, and agency copy.

**Content honesty principle (baked into the schema):** every piece of work is explicitly one of — **Demonstrated** (shipped), **Current** (in progress), **Developing** (a capability being built), or **Aspirational** (direction, not yet real). These are never blurred. "Aspirational" is never shown as a prominent public category.

---

## 2. Stack

- **Next.js** 16 (App Router) + **TypeScript** — bundled Next docs live in `node_modules/next/dist/docs/` (this Next version has real API differences; always check there).
- **Tailwind CSS v4** — CSS-first, **no `tailwind.config`**; all design tokens live in `src/app/globals.css` via `@theme`.
- **Sanity** (embedded Studio at `/studio`, dataset `production`) with **Presentation Tool**, **Draft Mode**, **Visual Editing**, **SanityLive**.
- **Motion** (`motion` package, v12) — the single animation library. **No GSAP.**
- Fonts via `next/font/google`: **Newsreader** (serif), **Geist Sans**, **Geist Mono** — no font packages installed.
- **Vercel** hosting, **GitHub** source control.

**Installed dependencies:** `@portabletext/react`, `@sanity/image-url`, `@sanity/vision`, `motion`, `next`, `next-sanity`, `react`, `react-dom`, `sanity`, `styled-components` (Studio-only).

---

## 3. Commit-by-commit progress (Phase 4)

`main` is at `af94ebc` (end of Phase 3). Phase 4 = the 8 commits from `ada036e` onward, all on `phase-4-marginalia`, all pushed.

| # | Commit | What it did |
|---|--------|-------------|
| — | `af94ebc` | **(Phase 3, on main)** Sanity content model — schemas, placeholder docs, `/work/[slug]` stub. |
| 1 | `ada036e` | **Marginalia visual foundation** — design tokens, fonts, header/footer/wordmark, skip link, dark mode, empty/error/404 states, removed the Next.js starter, Sanity CDN `remotePatterns`. |
| 2 | `c7deacc` | **Preview-aware query layer** — `archiveFetch` gatekeeper + editorial gate (public vs. Draft Mode filtering). |
| 3 | `265d0e3` | **Static CMS-powered homepage** — Featured Current Entry, Latest Update, archive fragments, featured work, notes/reading strips, story/contact continuation — all settled, no animation yet. |
| 4 | `796a74a` | **Motion foundation + interactive Index** — motion tokens, `Settle` primitive, the full-screen accessible Index catalog overlay. |
| 5 | `d98cfad` | **Ledger Sort signature interaction** — the "Rising from the Stack" arrival animation. |
| 6 | `714770f` | **Repair Ledger Sort pre-hydration gate** — replaced an unsupported raw `<script>` with a supported `next/script` `beforeInteractive` gate + server-rendered CSS hold. |
| 7 | `e4f85c6` | **Refine Ledger Sort timing** — slower, more editorial pacing (desktop ~1.6s / mobile ~1.4s), per-phase tuning. |
| 8 | `2e9c3b0` | **Curated Work + case-study experience** — `/work` index and the definitive `/work/[slug]` template. |
| 9 | `d6ee2b8` | **Complete remaining Marginalia public experience** — Story, Now, Notes, Field Notes, Archive, Contact (this HEAD). |

---

## 4. The pages (all routes)

All public pages live in the `(site)` route group (`src/app/(site)/`), share the global chrome (header + footer + skip link), are **Server Components**, fetch through **`archiveFetch`**, and carry the SanityLive + VisualEditing + Draft Mode pattern. Every page has an honest empty state and canonical metadata under `https://adityaraiyan.com`.

| Route | File | What it is |
|-------|------|------------|
| `/` | `(site)/page.tsx` | Homepage. Featured Current Entry (dominant), Latest Update (separate margin module), archive fragments, Selected Work, Notes & Field Notes, Reading, Story transition, Correspondence. Hosts the **Ledger Sort**. |
| `/work` | `(site)/work/page.tsx` | Curated Work index. Editorial ledger rows, ordered by `workItem.featuredOrder`. |
| `/work/[slug]` | `(site)/work/[slug]/page.tsx` | Definitive case-study template. Header, Problem/Approach/Outcome (when present) or narrative body, Evidence, Plates, margin rail (Context/Confidentiality/Methods/Links/Files/Credits/Related). |
| `/story` | `(site)/story/page.tsx` | The transformation arc + CMS bio prose + experience chronology as margin annotations + the "Apparatus" (capabilities, Current/Emerging). |
| `/now` | `(site)/now/page.tsx` | Living working ledger of `currentUpdate` docs (Studying/Reading/Building…). Not a dashboard. |
| `/notes` + `/notes/[slug]` | `(site)/notes/` | Light chronological ledger + note detail (metadata, prose, related entries). |
| `/field-notes` + `/field-notes/[slug]` | `(site)/field-notes/` | Place-led evidence records + detail (observation as margin extract, photo plates, coordinates as restrained metadata). |
| `/archive` | `(site)/archive/page.tsx` | Complete catalogue with client-side filtering (search + type/category/year/theme facets, URL-synced). |
| `/contact` | `(site)/contact/page.tsx` | Correspondence + social links + CV (only when a CV file exists). Calm, one screen. |
| `/studio` | `app/studio/` | **Protected** — embedded Sanity Studio. |
| `/test-preview` | `app/test-preview/` | **Protected** — visual-editing regression route. |
| `/api/draft-mode/{enable,disable}` | `app/api/` | **Protected** — draft mode plumbing. |

**Navigation:** Header shows Work / Story / Contact / CV (visible ≥1024px) + the Index trigger. The **Index** is a full-screen accessible catalog overlay (all sections + entry counts + recent-entry preview + correspondence). Footer carries the full site index + accession-stamp wordmark.

**Route decisions made:** `readingEntry` and `experience` get **no detail route** (schemas are deliberately tight / outside the approved sitemap). They render as rich, non-clickable records inside Archive and Story. **Capability** is never a standalone page — it's connective data (appears in Story's Apparatus and as contextual related-entry labels).

---

## 5. The signature interaction — "The Ledger Sort" (Rising from the Stack)

The homepage's one deliberately spectacular moment. On first arrival it:
1. Shows the real archive as a **readable typographic index** (holds ~0.4s so you register it as an index).
2. **Reorganises** — non-featured lines file away into their margin/fragment positions; Latest Update docks separately.
3. The featured entry's line **expands** into the full editorial composition; the oxblood mark flips to ink.
4. Details **ink in**; everything goes still. End state = the exact static homepage.

**How it works (important for anyone touching it):**
- Real-DOM **FLIP** on the actual server-rendered elements (transform + opacity only, via Motion's WAAPI `motion/mini`). **No duplicate DOM.**
- **Pre-hydration gate:** `src/lib/ledger-gate.ts` → a `next/script` `strategy="beforeInteractive"` in the **root layout** stamps `<html data-ledger="pending|reveal">`. CSS in `globals.css` (scoped to `section[data-ledger-stage]`) holds participants invisible until reveal, with a **pure-CSS 2.5s failsafe** so the settled page always appears even if JS fails. `<html suppressHydrationWarning>` covers exactly this one stamped attribute.
- **Plays once per browser-tab session** (sessionStorage, committed only when an eligible homepage takes ownership). Reduced-motion skips it entirely (no measurement). Any interaction (scroll, Index open, keypress, resize, tab-hide) settles it instantly via one idempotent `settle()` path.
- **Dev-only replay:** visit `/?ledger=replay` (compiled out of production).
- **Minimum data to play:** a Featured Current Entry + at least 2 archive fragments; otherwise the plain settled page renders.

Timing knobs live at the top of `src/components/ledger-sort.tsx` (`TIMING.desktop` / `TIMING.compact`).

---

## 6. Design system — "Marginalia" (quick reference)

All tokens in `src/app/globals.css`. Light + dark from day one (dark = `prefers-color-scheme`, no toggle).

**Palette:**
| Token | Light | Dark | Role |
|-------|-------|------|------|
| Paper | `#FAF9F6` | `#161513` | background (warm near-white) |
| Ink | `#1C1A17` | `#E9E6E0` | primary text |
| Graphite | `#5C5852` | `#A39E96` | secondary/metadata |
| Rule | `#E3E0DA` | `#2B2925` | hairlines / ledger rules |
| **Annotation** | `#7A2431` | `#C97B84` | **the single accent — oxblood.** Used sparingly. |
| Wash | `#F1EFE9` | `#1E1C19` | plates, empty states |

**Type:** Newsreader (serif, editorial/headlines) · Geist Sans (UI) · Geist Mono (the metadata/annotation layer). Fluid scale: meta 12 → caption 14 → body 17 → lede 20 → h3 25 → h2 31 → h1 39 → statement/display (clamp).

**Structure:** 12-col grid, max-width 1280px. Asymmetric split — content in cols 1–8, **margin rail** in cols 10–12 (reflows to full-width blocks below `lg`). Ledger rules (hairlines), never boxed cards. Numbered image **plates** (`Fig. N` + caption + credit). Mono metadata line format: `TYPE · YEAR · CATEGORY`. Focus = 2px oxblood outline. Motion language = "settle and ink" (transform/opacity only, no bounce/float/parallax).

**Wordmark:** "Adifinity—" (the continuing em-dash) in the header; two-line accession-stamp lockup in the footer.

---

## 7. Architecture — how data & privacy work

**The preview-aware gate (critical to understand):**
- Every public query embeds an editorial gate: `$preview || (status == "published" && visibility == "public")`. `currentUpdate` uses its own `active == true`; `capability` uses `active == true`.
- `src/sanity/lib/fetch.ts` → **`archiveFetch`** resolves `$preview` from Next's Draft Mode (a signed cookie only the Presentation enable route can set). **Every page fetches through `archiveFetch`** — never raw `sanityFetch`, never Sanity in the browser.
- Result: in **public** mode only published+public content appears; in **Draft Mode / Presentation** the placeholder drafts appear for editing. Filtering happens **inside GROQ**, so draft content never leaves Sanity on a public request. Verified repeatedly: zero draft strings in public HTML.

**All queries** live in `src/sanity/lib/queries.ts` (one shared, typed layer). `LATEST_UPDATE_QUERY` (homepage) is intentionally separate from `featuredCurrentEntry` and must never be merged with it.

**Protected infrastructure (do NOT rewrite/move):** draft-mode routes, `sanityFetch`, `SanityLive` (stays per-page, not moved to layout), `VisualEditing`, Presentation Tool, `/studio`, `/test-preview`, Sanity env structure, all schemas, Site Settings singleton, the `workItem` → `/work/[slug]` Presentation mapping.

**Presentation location mappings** (in `sanity.config.ts`) exist for: test, workItem (+ Work index), note, fieldNote, currentUpdate, experience, readingEntry, capability, siteSettings (homepage). Initial preview URL is `/`.

---

## 8. Key file map

```
src/
  app/
    layout.tsx                 # root: fonts, metadata, LEDGER GATE (beforeInteractive), suppressHydrationWarning
    globals.css                # ALL design tokens + Ledger Sort CSS hold/failsafe
    not-found.tsx              # designed 404 (with chrome)
    (site)/
      layout.tsx               # wraps public pages in SiteShell
      page.tsx                 # HOMEPAGE (+ Ledger Sort mount)
      error.tsx                # public error boundary
      work/page.tsx            # Work index
      work/[slug]/page.tsx     # Work case-study
      story/ now/ notes/ field-notes/ archive/ contact/   # sprint routes
    studio/  test-preview/  api/draft-mode/   # PROTECTED
  components/
    site-shell / site-header / site-footer / wordmark      # global chrome
    site-index.tsx             # interactive Index overlay (client)
    ledger-sort.tsx            # the signature animation (client)
    settle.tsx                 # shared motion primitive (client)
    archive-explorer.tsx       # Archive filtering island (client)
    featured-entry / latest-update / archive-fragments / work-row   # homepage/work pieces
    portable-prose / plate / file-list / related-entries            # shared editorial renderers
    meta-line / section-heading / empty-note                         # shared primitives
  lib/
    site-copy.ts               # IDENTITY_LINE + TRANSFORMATION_ARC (single source for hard-coded copy)
    entry-meta.ts              # catalog labels, date formatting, stega-safe enum→label maps
    motion-tokens.ts           # easing + durations
    ledger-gate.ts             # the pre-hydration gate script + session key
  sanity/
    lib/queries.ts             # ALL GROQ queries + TypeScript types (append-only history)
    lib/fetch.ts               # archiveFetch (the gatekeeper)
    lib/{client,live,image}.ts # PROTECTED
    schemaTypes/               # PROTECTED (documents + objects + lib/options.ts)
sanity.config.ts               # Presentation mappings, Studio config
CLAUDE.md                      # project brief (read this)
```

The 4 client components are the only client-side JS: `site-index`, `ledger-sort`, `settle`, `archive-explorer` (+ the existing `disable-draft-mode`). Everything else is server-rendered.

---

## 9. Verification status

Every commit passed: `tsc --noEmit`, `eslint`, `npm run build`, plus a browser matrix (desktop + mobile, light + dark, public + draft behavior, 404s, no draft leakage, no hydration/console errors). The final sprint verified all 12 public routes return 200 with correct titles/canonicals and zero draft leakage in production HTML.

**Adi has manually verified (in his logged-in browser):** the Ledger Sort plays and its interruptions/reduced-motion work; Presentation opens the homepage without the old script error; Visual Editing opens the correct fields; the refined animation pacing at desktop + mobile.

---

## 10. Verification environment gotchas (save yourself pain)

1. **Never run `npm run build` while the dev server is running** — both write `.next/`; the dev server then serves stale chunks. Stop dev → build → restart. If styles look stale, `rm -rf .next` and restart.
2. The embedded browser pane sometimes reports the tab as `hidden` and suspends animation clocks — frozen animations there are an automation artifact, not a bug. Verify via `getAnimations()` scrubbing + DOM state.
3. The pane can lose the Sanity Studio login (shows "Choose login provider") — draft-mode/Presentation visual checks then need Adi's own logged-in browser.
4. Dev-only Ledger Sort replay: `/?ledger=replay`.

---

## 11. ⚠️ CMS fields Adi must configure manually (in Studio)

The site is structurally complete but the CMS holds **only draft placeholders**, so most pages currently show their (correct, honest) empty states. To see everything populated and to finish testing:

**Required for Work pages to show anything:**
- Set **`featuredOrder`** on the two placeholder work items (e.g. `1` on _Trust as Collateral — Preview Template_, `2` on the _Policy & Research Sample_). Without it, `/work` shows the empty state even in Draft Mode.
- Optionally set **`siteSettings.featuredWork`** (drag-order) to control the homepage's Selected Work.

**To exercise the full case-study / detail templates:** add (on the flagship work item and/or the note/field-note) — role, institution, collaborators, methods, cover image, a gallery image, a downloadable file, an external link, credits, a confidentiality note, Problem/Approach/Outcome text, and a couple of `relatedEntries` (including a capability).

**For other pages:** `currentUpdate` docs (for `/now` — the two placeholders have null dates; set dates), a `date`/related entry on the placeholder note, Site Settings `longBio`/`heroCopy` (Story prose), `contactLinks`/`socialLinks`/`cvFile` (Contact + Index), and capability docs (Story Apparatus).

**Do not publish placeholder documents** as final content — replace them with real content.

**Note:** Featured Current Entry currently shows a Sanity warning _"Referenced document must be published"_ because it points at a draft. This is expected during Phase 4, does not block Draft Mode/Presentation, and needs no schema change.

---

## 12. What is NOT done / next steps

1. **Merge to `main`** — Phase 4 is entirely on `phase-4-marginalia`. Nothing is merged; the live site still shows Phase 3. Decide when to merge + deploy.
2. **Real content** — replace all draft placeholders with real work, notes, bio, experiences, reading, capabilities, contact links, CV.
3. **Manual CMS config** (§11) — needed before the pages look "alive."
4. **Optional future work** (explicitly deferred, not part of Phase 4): a real map for Field Notes coordinates; a persistent accession-numbering system; any `/reading/[slug]` or experience detail routes (only if content ever justifies them).
5. **Final full-content QA pass** — once real content is in, re-run the responsive/accessibility/Presentation matrix with real data.

---

## 13. How to continue (fresh session or new place)

1. `cd` into the repo, `git checkout phase-4-marginalia`, confirm HEAD is `d6ee2b8` and tree is clean.
2. `npm install` if needed, then start the dev server (via the app's preview tooling, **not** a raw build alongside it).
3. Read `CLAUDE.md` (the binding project brief) and this file.
4. **Do not redesign** the homepage, Ledger Sort, Index, Work pages, header/footer, tokens, typography, motion, schemas, or protected infra — they're approved and authoritative.
5. For any new work: prefer Server Components, fetch via `archiveFetch`, reuse existing shared components (`PortableProse`, `Plate`, `RelatedEntries`, `MetaLine`, `SectionHeading`, `EmptyNote`), keep the preview-aware gate intact, and never publish placeholder content.

---

_Repo: https://github.com/adifinity/adifinity · Branch: `phase-4-marginalia` · HEAD: `d6ee2b8` · Fully pushed, not merged to main._
