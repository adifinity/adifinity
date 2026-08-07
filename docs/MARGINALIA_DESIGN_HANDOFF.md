# Marginalia — Design System Handoff

_The authoritative design reference for Adifinity, the working archive of Raiyan Sadi Aditya._
_Read this before touching any public page. The system below is **approved and implemented** — reuse it; do not reinvent it._

---

## 1. Creative thesis

Adifinity is a **working archive** that has decided to leave its door open. Every project, note, book, place, and update is an **entry** — accessioned, dated, categorised, and annotated in the margins. The site is quiet, typographic, and precise. It is **not** a résumé, an agency site, a startup, a services page, a dashboard, or a portfolio template.

The transformation it expresses: **private reader → public debater → institutional builder → business student → emerging finance & strategy professional.**

Intended impression: _"This person is still early in his career, but has unusual depth, range, taste, evidence of work, and momentum."_

Target feel: editorial · contemporary · tactile · intelligent · quiet · personal · precise · slightly cinematic · professionally credible · distinctive without being confusing.

---

## 2. Design principles

1. **Evidence before claims.** Show the work; never inflate it.
2. **Ledgers, not cards.** Hairline rules between rows — never boxed cards, bento grids, or tiles.
3. **The margin is a first-class column.** Content left (cols 1–8), annotations right (cols 10–12).
4. **Mono is the annotation layer.** All metadata, catalog codes, dates, and labels are Geist Mono, uppercase, letterspaced.
5. **One accent, used scarcely.** Oxblood. Its rarity is the identity.
6. **Whitespace is structure**, not emptiness. Generous section rhythm.
7. **Honest empty states.** A sparse page must look authored, never broken or "coming soon."
8. **Restraint in motion.** "Settle and ink." One spectacular moment (the Ledger Sort); everything else is nearly still.
9. **Every page authored by the same mind.** Shared components + shared type scale = coherence.

---

## 3. Palette (tokens in `src/app/globals.css`)

| Token | Light | Dark | Role |
|-------|-------|------|------|
| `--paper` | `#FAF9F6` | `#161513` | background (warm near-white / warm black) |
| `--ink` | `#1C1A17` | `#E9E6E0` | primary text |
| `--graphite` | `#5C5852` | `#A39E96` | secondary text, metadata |
| `--rule` | `#E3E0DA` | `#2B2925` | hairlines / ledger rules |
| `--annotation` | `#7A2431` | `#C97B84` | **the single accent — oxblood** (dark = lifted black-cherry for AA) |
| `--wash` | `#F1EFE9` | `#1E1C19` | plate & empty-state backgrounds |

Dark mode = `prefers-color-scheme` only. **No manual theme toggle**, no client theme state, no theme flash. Tailwind classes: `bg-paper text-ink text-graphite border-rule text-annotation bg-wash`. Contrast is AA-verified (see the comment block atop globals.css). The oxblood accent on text is used only at small/bold sizes or as a non-text accent.

---

## 4. Typography roles

Three families, via `next/font/google` (no font packages). **Never add a font.**

- **Newsreader (serif)** — `font-serif` — editorial voice: titles, headlines, body prose, ledes, quotes. The archive's "written" layer.
- **Geist Sans** — `font-sans` — interface chrome: nav utility links, buttons, small UI affordances ("Read the entry →").
- **Geist Mono** — `font-mono` — the **annotation/metadata layer**: catalog labels, dates, kickers, section headings, phase stamps. Always `uppercase` for labels; the `text-meta` size auto-applies 0.08em tracking.

**Type scale** (defined as tokens; use the utility, never ad-hoc sizes):

| Utility | Size | Use |
|---------|------|-----|
| `text-meta` | 12px, +0.08em | mono metadata, kickers, section headings, catalog labels |
| `text-caption` | 14px | captions, secondary notes, related-entry titles, file labels |
| `text-body` | 17px | reading prose |
| `text-lede` | 20px | page intro sentence, standfirst, key margin extracts |
| `text-h3` | 25px | sub-sections, note/field-note row titles |
| `text-h2` | 31px | case-study section headings, work-row titles |
| `text-h1` | 39px | reserved |
| `text-statement` | clamp 26–44px | homepage identity line context |
| `text-display` | clamp 34–60px | **page titles** (`/work`, `/story`, entry titles…) and the featured entry |

Prose measure is capped at `max-w-[62ch]` (body) / `~58ch` (lede) / `~24ch` (display titles). Keep these.

---

## 5. Spacing & grid

- **Container:** `mx-auto max-w-7xl px-6` (1280px, 24px gutters). Every page uses it.
- **Grid:** `grid lg:grid-cols-12 lg:gap-8`. Content = `lg:col-span-8`; margin rail = `lg:col-span-3 lg:col-start-10`.
- **Page opening rhythm:** `py-16 lg:py-20`. **Section rhythm:** `border-t border-rule py-16`. **Row rhythm:** `border-t border-rule` + `py-6`/`py-8`.
- **Vertical steps in use:** `mt-1 / mt-2 / mt-3 / mt-4 / mt-6 / mt-8 / mt-10 / mt-14`. Reuse these; do not introduce new arbitrary gaps.
- Below `lg`, the two columns stack (content then margin rail) — this is intentional reflow, handled by the grid.

---

## 6. Margin-rail rules

- Lives in cols 10–12 on desktop; **reflows to a separated full-width block below the content on tablet/mobile** (via the stacking grid) — never a squeezed narrow column.
- Each rail block: `border-t border-rule pt-4`, a mono `text-meta uppercase text-graphite` heading, then content.
- Priority order in a rail: (1) info needed to interpret the work honestly (role, organisation, confidentiality), (2) evidence & files, (3) cross-references (related entries), (4) secondary metadata.
- Do not overcrowd. A rail with one honest block beats a rail with six thin ones.
- The homepage rail carries **Latest Update** ("Now") + **archive fragments** ("From the archive") as distinct blocks.

---

## 7. Metadata & catalog-label rules

- **One mono line, one order, everywhere:** `TYPE · YEAR · CATEGORY · DATE-RANGE · PHASE` (omit any missing segment; never fake one). Built by `MetaLine` (`src/components/meta-line.tsx`) from **derived strings only** — never pass raw CMS prose through it (stega-unsafe).
- **Catalog label** = deterministic, non-sequential, from immutable data: `catalogLabel()` in `src/lib/entry-meta.ts`. Type codes: `W` work · `N` note · `FN` field note · `X` experience · `R` reading. **No mutable accession numbers.**
- **Label maps are single-source:** categories from `PRIMARY_CATEGORY_OPTIONS`; note types, update labels, experience types, phases from the maps in `entry-meta.ts`. **Never** expose raw camelCase values (`financeStrategy`) — always the human label ("Finance & Strategy"). **Never** duplicate a label map.
- Enum→label lookups must `stegaClean` the value first (helpers already do this). Editorial prose (titles, summaries) renders **raw** so Visual Editing click-to-edit survives.

---

## 8. Plate & imagery rules

- All images render through `Plate` (`src/components/plate.tsx`) — never a bare `<img>`/`<Image>` in a page.
- **Two modes:** `crop` (default; explicit width/height, hotspot-aware) for photographic covers/listing plates; `intrinsic` (pass the queried `dims`) for diagrams, charts, scanned documents, slides — scaled to fit, **never cropped**, ratio reserved (zero layout shift).
- **Caption structure:** `Fig. N` (mono uppercase label) + caption + credit (**readable serif, sentence case — never uppercased**; credit italic). The CSS provides layout only; the component sets typography. Real captions are prose, not shouted labels.
- `Plate` renders **nothing** when no asset exists — never an empty frame.
- `alt` is required in the CMS before publishing; it renders as real alt text. Captions/credits show when present.
- No filters, no grain, no device mockups, no carousels/lightbox/zoom/masonry packages. A numbered plate sequence is the gallery.
- Sanity CDN images only (whitelisted in `next.config.ts`); always `next/image` with `sizes`.

---

## 9. Cross-reference language (related entries)

`RelatedEntries` (`src/components/related-entries.tsx`) renders authored marginalia, **not** a "related posts" grid. Each reference: a lowercase mono oxblood lead-in, the title (serif), catalog context, and a one-line summary.

Lead-ins by type (authored voice — keep these):
- workItem → `this connects to—`
- note / readingEntry → `read alongside—`
- fieldNote → `from the field—`
- experience → `the institution behind this—`
- capability → `capability exercised—`

**Link resolution:** workItem→`/work/[slug]`, note→`/notes/[slug]`, fieldNote→`/field-notes/[slug]`, **experience→`/experience/[slug]`** (all get a hover affordance). readingEntry and capability remain **non-clickable contextual records** (no standalone routes by design). `currentUpdate` is never a related-entry target. **Never render a broken link.** (Experience became clickable in Phase 5I-B — see §16a.)

---

## 10. Motion rules ("settle and ink")

- Tokens in `src/lib/motion-tokens.ts`: easing `cubic-bezier(0.22,1,0.36,1)`; ~200ms controls, ~350ms editorial reveals, ~150ms exits; ≤8px travel.
- **Transform + opacity only.** No bounce, spring, overshoot, rotation, float, parallax, blur-heavy motion, or ambient movement. After anything settles, the page is **completely still**.
- The single shared reveal primitive is `Settle` (`src/components/settle.tsx`). `MotionConfig reducedMotion="user"` wraps interactive islands.
- The only animation library is **`motion`** (v12). **Never add GSAP or any other animation/UI package.**
- Reduced motion (`prefers-reduced-motion`) shows final states immediately; the global CSS collapses all transition/animation durations. Never gate content on motion.
- **Do not add page-level entrance animations** — they would compete with the Ledger Sort.

---

## 11. Ledger Sort — invariants (do not redesign)

The homepage's one spectacular moment: the archive appears as a readable index, reorganises around the Featured Current Entry, and resolves into the settled homepage.

- **Real-DOM FLIP** on the actual server-rendered elements (transform/opacity, WAAPI via `motion/mini`). **No duplicate DOM.**
- **Pre-hydration gate** = `src/lib/ledger-gate.ts` → a `next/script strategy="beforeInteractive"` in the **root layout** stamps `<html data-ledger="pending|reveal">`. Never replace this with a raw `<script>` in a component (that broke before — see commit `714770f`). `<html suppressHydrationWarning>` covers exactly this one attribute.
- **CSS hold + failsafe** in `globals.css`, scoped to `section[data-ledger-stage]` (only the eligible homepage renders that marker). A pure-CSS 2.5s `ledger-reveal` keyframe guarantees the settled page even if all JS fails. Reduced motion reveals at paint with no measurement.
- **Plays once per browser-tab session** (sessionStorage; committed only when an eligible homepage takes ownership — never by loading `/studio` or another route). Any interaction settles it instantly via one idempotent `settle()`.
- **Eligibility:** Featured Current Entry present **and** ≥2 archive fragments; otherwise the plain settled page renders.
- **Dev replay:** `/?ledger=replay` (compiled out of production). Timing lives in `TIMING.desktop`/`TIMING.compact` at the top of `src/components/ledger-sort.tsx`.
- The **settled state must equal the static Stage-3 homepage exactly** — no difference before/after.

---

## 12. Index overlay — invariants (do not redesign)

`src/components/site-index.tsx` — the accessible full-screen catalog.

- Trigger is a semantic `<button aria-expanded aria-controls>`; pre-hydration/no-JS it's an anchor to the footer index.
- Opening moves focus in; **focus is trapped**; `Esc` closes; closing restores focus to the trigger; route navigation closes it. Body scroll locks with scrollbar-width compensation (no layout jump); scroll position is preserved. The overlay's exit sets `pointer-events:none` so a fading layer never blocks the page.
- Shows all destinations + live entry counts (hidden at zero) + a recent-entries preview + correspondence. **CV appears only when a CV file exists** (no broken link).
- **Destination order (Phase 5I-D):** Home · Story · Work · **Experience** · Now · Notes · Field Notes · Archive · Contact · [CV]. The **no-JS footer Index** (`site-footer.tsx`, the pre-hydration fallback the trigger anchors to) mirrors the same order — keep the two in sync when adding a destination.
- The desktop utility links (Work / Story / Contact / CV) stay **outside** the Index and always visible ≥1024px — the Index supplements navigation, it does not replace it.

---

## 13. Responsive rules

Test at 375 / 430 / 768 / 1024 / 1280 / 1440.

- Mobile must feel **designed, not compressed**. The 12-col grid stacks; the margin rail becomes a separated full-width block.
- No horizontal overflow ever. Long titles/URLs wrap (`break-words` on URLs). Long filenames wrap.
- Touch targets ≥ ~24px (e.g. Archive filter chips carry `py-1`).
- The homepage Reading strip is a keyboard-scrollable `overflow-x-auto` row on mobile (next item visible), a grid ≥ md.
- Utility links hide below `lg`; the Index is the small-screen way in.

---

## 14. Empty-state principles

- Every list/section has a designed empty state — honest archive copy in the `wash` block (`EmptyNote`) or a quiet italic line. Examples: _"Nothing is on public display yet."_ / _"The archive has not marked a current focus yet."_ / _"The catalogue is being assembled."_
- **Never** "Coming soon", fake projects, lorem ipsum, or hardcoded placeholder content to fill space.
- A one-entry page must still read as an authored catalogue, not an empty table.

---

## 15. Content-honesty rules (non-negotiable)

- Every work/experience carries a **phase**: `Demonstrated` (shipped) · `Current` (in progress) · `Developing` (capability being built) · `Aspirational` (direction, not yet real). **Never blur them.**
- **"Aspirational" is never a prominent public category or filter.** Show it only as restrained entry metadata where honesty genuinely benefits.
- `institutionOrClient` uses neutral, factual framing (Context / Institution / Course / Organisation / Collaboration). **Never** relabel academic or institutional work as "Client" consulting.
- Never fabricate metrics, outcomes, testimonials, clients, dates, or achievements. When data is missing, the field simply doesn't render.

---

## 16. Protected infrastructure (do not rewrite or move)

Draft-mode enable/disable routes · `sanityFetch` · `archiveFetch` · `SanityLive` (stays per-page) · `VisualEditing` · Presentation Tool · `/studio` · `/test-preview` · Sanity env structure · all Sanity schemas · Site Settings singleton · the preview-aware editorial filter · `LATEST_UPDATE_QUERY` separation from Featured Current Entry · the workItem Presentation mapping · the Ledger Sort pre-hydration gate + session/reduced-motion behavior.

**Data flow law:** every CMS read goes through `archiveFetch` (which resolves `$preview` from Draft Mode); the editorial gate lives **inside the GROQ**. Never fetch Sanity in the browser. Never bypass `archiveFetch`. Public HTML must contain zero draft content.

---

## 16a. Experience detail surface (added Phase 5I-B; discovery updated Phase 5I-D)

Experience is a **first-class** archival record. As of Phase 5I-D it has **three discovery doorways** (see §16c for the register):

- **Discovery:** (1) the **`/experience` register** — a chronological Index destination; (2) Story "Annotations" (compact, **clickable** when a slug resolves) — the narrative doorway; (3) Archive records (clickable) — the catalog doorway. All three are intentional and kept; none replaces the others. There is still **no header/utility nav item** and **no experience grid, card wall, or résumé timeline.**
- **Detail:** `/experience/[slug]` (`src/app/(site)/experience/[slug]/page.tsx`) — a Server Component through `archiveFetch` + the editorial gate + `SanityLive` + Draft-Mode/Visual-Editing block, exactly like `/work/[slug]`. Dynamic (`ƒ`); no `generateStaticParams`, so drafts never become static params. `notFound()` when the gated query returns null.
- **Queries:** `EXPERIENCE_DETAIL_QUERY` + `EXPERIENCE_META_QUERY` in `queries.ts`. Related refs use the **parenthesised** `(x[]->{…})[gate]` form (the featuredWork precedence fix from `576d1b5`); `RELATED_ENTRIES_PROJECTION` was corrected to the same shape.
- **Page IA:** meta line (`X · year · type · date-range · phase`) → `title` (record identity) → `roleTitle` (my role) → `organisation · location` → `summary` → cover `Plate` → `narrativeBody` (`PortableProse`) → **On the record** (`verifiedFacts`, a hairline list — never badges/checkmarks) → **In numbers** (`metrics`, quiet figures with optional notes) → **Evidence** (`evidencePreviews` — linked visual citations; see §16b). Margin rail carries **references only** (Elsewhere = `websiteUrl` + `externalLinks`; **Documents** = `evidenceFiles` via `FileList`; Related work = `relatedWork` → `/work/[slug]`; `RelatedEntries` for `relatedEntries`) — never duplicating header identity.

## 16b. Linked visual evidence (added Phase 5I-B2)

A **`linkedEvidence`** object (reusable; `experience.evidencePreviews[]`) is a **visual citation**, not gallery media, not a downloadable file, not a social embed: `{ image: imageWithMetadata, title, source?, platform?, url (required) }`.

- **Rendered** in the main-column **"Evidence"** section via `EvidencePreview` (`src/components/evidence-preview.tsx`) — the same archival plate aesthetic as `Plate` (intrinsic, uncropped, aspect-preserved; `Fig. N`), but the **whole image is wrapped in an external `<a>`** and the **citation line is a sibling `<a>`** (never nested). Both open the original `url` in a new tab (`target="_blank" rel="noopener noreferrer"`).
- **Three distinct texts (never auto-duplicated):** the image's **alt** describes the *screenshot*; the **link accessible name** is derived and describes the *destination* ("View the original … on Facebook (opens in a new tab)"); the image's **caption** carries archival context. The citation line shows `source · platform ↗` (or "View original ↗").
- **Link-rot resilient:** the local screenshot always renders; the external `url` is preserved as the historical source. Never a social embed/iframe, no likes/comments/analytics/avatars — evidence, not a feed. Platform is a free-text label; **the URL is authoritative** and works for any HTTPS source.
- **Do not** overload `coverMedia`, pair image+URL by index, use `evidenceFiles` for screenshots, or use a generic gallery.
- **`title` vs `roleTitle`:** `title` = the archival event/record identity (e.g. "WACMUN 2024"); `roleTitle` = the role inside it (e.g. "Deputy Secretary General · Chair, ICJ"). Keep them distinct to avoid duplication.
- **Schema extension:** `experience` gained `externalLinks` (array of the existing `externalLink` object) and `evidenceFiles` (array of the existing `fileDownload` object). `websiteUrl` is retained. No new object types were invented; no fields removed/renamed.
- **Story ordering:** experiences now sort **chronologically (oldest→newest)** — a formation timeline that mirrors the prose and reads less like a reverse-chron résumé.

## 16c. Experience register — the `/experience` landing (added Phase 5I-D)

`/experience` (`src/app/(site)/experience/page.tsx`) is the canonical home of the Experience records — an **annotated archival chronology**, never a "Professional Experience" CV, employment history, card grid, logo wall, or skill-badge page.

- **Purpose:** answer "where has time actually been spent learning, building, representing, and changing direction?" — enough to grasp the chronology and pick a record to open. It is a **preview register, not a duplicate of the detail page**: no narrativeBody, metrics wall, evidence gallery, downloads, or social previews here — those live in `/experience/[slug]`.
- **Order:** strictly chronological by factual `dateRange.startDate` **ascending** (earliest → current) — a formation, never reverse-chron résumé order, never creation/publish/alpha/manual order. `EXPERIENCE_INDEX_QUERY` does `order(coalesce(dateRange.startDate, _createdAt) asc)`. If approximate CMS dates ever stop producing the intended narrative sequence, **fix the dates, not the sort.**
- **Query/type:** dedicated `EXPERIENCE_INDEX_QUERY` + `ExperienceListItem` in `queries.ts`, through `archiveFetch` + the same editorial gate. Fetches only landing fields (`title, slug, summary, phase, organisation, roleTitle, type, dateRange`). **Public** shows published+public only; **preview** shows drafts.
- **Empty state (public, today):** all Experiences are still draft/private, so `/experience` returns **200 with an honest `EmptyNote`** ("No experience records are on public display yet…") — never 404, never filler. When they publish, the same query surfaces them with **no code change**.
- **Row IA:** whole row is one semantic `Link` to `/experience/[slug]` (no nested links; "View record →" is affordance text inside the row, not the only target). `MetaLine` (`X · type · date-range · phase`) → `title` → `roleTitle — organisation` (italic) → `summary` → `View record →`. **Current** work (IBA) reads only as the quiet `phase` label — no dots/pulses/pills/"CURRENT" tags.
- **Index placement:** **Experience** is a top-level destination in **both** the overlay Index (`site-index.tsx`) and the no-JS footer Index (`site-footer.tsx`), placed **after Work** (peer of Work, not buried under Archive). Order: Home · Story · Work · **Experience** · Now · Notes · Field Notes · Archive · Contact. The overlay count is hidden at zero (so it shows no "N filed" while private, "5 filed" in preview).
- **Story link:** a restrained `All experience →` link sits at the foot of the Story annotation cluster (only when experiences resolve) — it **supplements**, never replaces, the per-experience annotations.
- **Relationships:** `/experience` = chronological register · `/story` = autobiographical narrative · `/archive` = complete cross-type catalog · `/experience/[slug]` = full record. This separation is deliberate — do not collapse them.
- **No homepage Experience section** was added (out of scope; revisit after publication once homepage density is assessed).

---

## 17. Patterns future work MUST reuse

- **Pages are Server Components** in the `(site)` route group, using the container + grid, fetching via `archiveFetch`, ending with the `SanityLive` + `VisualEditing` + `DisableDraftMode` (Draft Mode) block.
- **Shared components before new ones:** `PortableProse` (all blockContent), `Plate` (all images), `RelatedEntries` (all cross-references), `FileList` (all downloads), `MetaLine`, `SectionHeading`, `EmptyNote`, `WorkRow`.
- **Metadata:** `generateMetadata` from SEO fields with `clean()`ed fallbacks; canonical URLs under `https://adityaraiyan.com`; never leak draft-only titles publicly.
- **Detail routes:** meta line → display title → summary lede → cover plate → prose → margin rail; `notFound()` when the gated query returns null.

---

## 18. Anti-patterns future models MUST avoid

- ❌ New visual direction, new fonts, new palette, new accent.
- ❌ Card grids, bento layouts, tiles, glassmorphism, floating cards, device mockups.
- ❌ Agency copy ("Book a call", "Let's work together", "Scale your brand"), sales language, availability indicators, response-time promises.
- ❌ Dashboards, progress bars, streaks, gamification, fake real-time/metrics.
- ❌ GSAP or any new animation/UI/map/carousel/state package.
- ❌ New CMS schemas, new content types, a **reading** detail route, or a `/capabilities` page. *(The `/experience/[slug]` detail route exists as of Phase 5I-B — §16a; the `/experience` chronological **register** exists as of Phase 5I-D — §16c, reached via the Index — but there is still no header/utility nav item.)*
- ❌ Turning `/experience` into a **CV / employment history / card grid / logo wall / skill-badge / résumé-timeline** page — it is a restrained chronological register (§16c). No "CURRENT"-style status pills for the current role either.
- ❌ Redesigning the homepage, Ledger Sort, Index, or Work template.
- ❌ Raw camelCase enum values in the UI; duplicated label maps; passing CMS prose through `MetaLine`.
- ❌ Fetching Sanity in the browser; bypassing `archiveFetch`; publishing placeholder documents; fabricating content to fill empty states.
- ❌ Broken generated links; hover-only meaning; entrance animations that compete with the Ledger Sort.

---

_Design tokens: `src/app/globals.css` · Shared components: `src/components/` · Derived-label helpers: `src/lib/entry-meta.ts` · Queries + types: `src/sanity/lib/queries.ts`._
