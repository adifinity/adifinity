# Content Population Guide

_How to fill and maintain the Adifinity archive in Sanity Studio (`/studio`) — by content type — **without redesigning anything**._
_This describes the CMS as implemented. Field values drive exactly what appears on the public site as documented below._

---

## 0. The two gates that decide public visibility

Almost every content type is hidden from the public until **both** are true:

1. **`status` = `published`** (not `draft` or `archived`)
2. **`visibility` = `public`** (not `unlisted` or `private`)

The exceptions:
- **currentUpdate** has no status/visibility — it shows when **`active` = true**.
- **capability** has no status/visibility — it shows when **`active` = true**.

**In Draft Mode / Presentation**, unpublished drafts are visible for editing. **In normal public mode**, only published+public content appears. Draft content never leaks into public HTML. (All current placeholder documents are drafts, which is why public pages currently show empty states.)

**Alt text rule:** any image (`imageWithMetadata`) requires **alt text** before its containing document can be published. Write alt text for every image.

**Phase honesty (workItem, experience):** always set `phase` truthfully — `Demonstrated` / `Current` / `Developing` / `Aspirational`. Never blur these. Never feature "Aspirational" work prominently.

---

## 1. Work item (`workItem`) → `/work`, `/work/[slug]`, Archive, homepage

**Required (validation-enforced):** `title` · `slug` · `dateRange` (start date; leave end blank or tick *Ongoing*) · `primaryCategory` · `status` · `visibility` · `phase`.

**To appear on the public `/work` index:** `status`=published **and** `visibility`=public **and** **`featuredOrder`** is set (a number). Rows sort by `featuredOrder` ascending, then start date descending, then title. → **`featuredOrder` is the on/off + ordering switch for `/work`.** No `featuredOrder` = not on `/work` (but still in Archive once published+public).

**Strongly recommended:** `summary` (shows on the index row, detail lede, Archive, and as OG description) · `role` and/or `institutionOrClient` (shown as neutral Context — see honesty note) · `coverMedia` (Fig. 1 plate; needs alt).

**Case study vs. narrative (choose what fits the actual work):**
- Fill **`problem` / `approach` / `outcome`** (rich text) for structured case studies — each renders as its own section, only if it has content.
- Or fill **`body`** (rich text) for narrative work.
- If both exist: the structured sections establish the logic, then `body` renders below a rule as deeper context. **Don't repeat the same content in both.**

**Optional, render only when present:** `secondaryThemes` (tags) · `methods` (tags — margin "Methods", also an Archive filter) · `collaborators` (margin "Collaboration") · `confidentialityNote` (calm margin note) · `credits` (margin) · `evidence` (`narrative` rich text + `files`) → "Evidence" section · `gallery` (numbered plates; each needs alt) · `externalLinks` (margin "Elsewhere") · `downloadableFiles` (margin "Files") · `relatedEntries` (margin cross-references) · `seo` (`seoTitle`/`seoDescription`/`socialPreviewImage` → route metadata, falls back to title/summary).

**Honesty:** `institutionOrClient` is labelled neutrally ("Organisation" / Context) — **never** framed as paid "Client" consulting. The flagship _Trust as Collateral_ is academic/research work; keep it framed that way. Don't invent metrics/outcomes.

**Note:** the schema also has an unused `featured` boolean — **ignore it**; curation uses `featuredOrder` and `siteSettings.featuredWork`.

---

## 2. Note (`note`) → `/notes`, `/notes/[slug]`, Archive, homepage

**Required:** `title` · `slug` · `date` · `noteType` (Reflection / Observation / Argument / Working note / Fragment) · `status` · `visibility`.

**To appear publicly:** published + public. The `/notes` index is chronological by `date`.

**Recommended:** `summary` (index row + lede + Archive) · `body` (rich text — the note itself).

**Optional:** `estimatedReadingTime` (number, minutes → shown as "N min") · `coverMedia` (plate; needs alt) · `relatedEntries` (margin) · `seo`.

Notes are the **light, immediate** layer — keep them shorter and more informal than Work. Don't turn them into a blog.

---

## 3. Field note (`fieldNote`) → `/field-notes`, `/field-notes/[slug]`, Archive

**Required:** `title` · `slug` · `date` (editorial write-up date) · `locationName` · `dateVisited` · `status` · `visibility`.

**To appear publicly:** published + public. Index sorts by `dateVisited` (then `date`).

**Recommended:** `country` (shown with place) · `summary` · `observation` (a single distilled sentence — renders as a **strong italic margin extract**, the field note's signature; also the index preview) · `body` (rich text).

**Optional:** `coverMedia` + `photoGallery` (numbered plates; each needs alt) · `coordinates` (geopoint) and `mapLabel` → restrained "Position" metadata (no map is rendered) · `relatedEntries`.

Field notes are **evidence from places**, not travel content. The `observation` is the emotional core — write it well when it exists.

---

## 4. Experience (`experience`) → Story margin, Archive

**No detail page** (by design). Appears as **dated annotations in the Story margin** and as records in the Archive.

**Required:** `title` · `slug` · `organisation` · `roleTitle` · `dateRange` · `type` (Institution / Leadership / Education / Practice) · `status` · `visibility` · `phase`.

**To appear:** published + public. Story lists experiences newest-first by start date.

**Recommended:** `summary` (Archive) · `narrativeBody` (prose, not bullet résumé lines).

**Optional (not all surfaced yet):** `verifiedFacts` · `metrics` · `relatedWork` · `location` · `organisationLogo` · `websiteUrl`. Keep experiences factual and checkable.

---

## 5. Current update (`currentUpdate`) → `/now` + homepage "Latest Update"

**Required:** `title` · `date` · `label` (Studying / Reading / Researching / Building / Practising / Preparing / Thinking about). **No slug — not a standalone article.**

**To appear:** **`active` = true**. `/now` lists active updates by `priority` ascending, then `date` descending.

**Recommended:** `description` (one or two lines) · `priority` (number — lower surfaces first) · `date` (currently the placeholders have none; **set real dates** — dated lines read far better).

**Two distinct homepage concepts — never merge them:**
- **Latest Update** (homepage margin "Now") = the single most-recent active `currentUpdate`, computed automatically.
- **Featured Current Entry** (homepage centre) = manually chosen in Site Settings (§8).

`relatedEntries` may be set (optional). `currentUpdate` is **never** a related-entry destination and never gets a detail page.

---

## 6. Reading entry (`readingEntry`) → Archive + homepage Reading strip

**No detail page** (by design — reading entries are records, not articles). No top-level "Reading" nav item.

**Required:** `title` · `slug` · `author` · `dateRead` · `status` · `visibility`.

**To appear:** published + public.

**Recommended:** `highlightOrIdea` (the one idea worth remembering — shown on the homepage strip and Archive) · `coverImage` (**note: `coverImage`, not `coverMedia`**; needs alt).

**Optional:** `shortReflection` (keep it a paragraph, not an essay) · `genreOrTheme` (tags — Archive filter) · `relatedWork` · `relatedNotes` · `relatedEntries`. Not a social-reading app — keep it a selective record.

---

## 7. Capability (`capability`) → Story "Apparatus" only

**Never a standalone page.** Connective data that appears in Story's **Apparatus** section and as contextual (non-clickable) related-entry labels.

**Required:** `name` · `slug` · `phase` (**Current** or **Emerging** — this splits the Apparatus columns).

**To appear:** **`active` = true**.

**Recommended:** `description` (grounded — not a commercial capability claim) · `linkedExamples` (references to published+public work items → renders as "Exercised in …" links).

**Optional:** `methods` (tags) · `displayOrder` (number — ordering). Keep Current vs. Emerging honest; don't imply established consulting expertise beyond the evidence.

---

## 8. Site Settings (`siteSettings`) — the singleton — MANUAL CHECKLIST

Open **Site Settings** in the Studio and set:

| Field | Where it appears | Notes |
|-------|------------------|-------|
| `siteTitle` | homepage kicker, footer | required |
| `shortBio` | **homepage h1 identity line** | ⚠️ currently placeholder text — **replace with real bio.** If empty, a hardcoded fallback shows. |
| `longBio` | **Story** main prose | rich text; falls back to `heroCopy`, then an empty state |
| `heroCopy` | Story (fallback if no `longBio`) | rich text |
| `featuredCurrentEntry` | **homepage centre + enables the Ledger Sort** | reference → workItem / experience / currentUpdate. Must be published+public (or active, for a currentUpdate). See below. |
| `featuredWork` | **homepage "Selected work"** | ordered list of workItem refs (drag to order); each must be published+public |
| `contactLinks` | Contact "Correspondence" + Index | label + url each |
| `socialLinks` | Contact "Elsewhere" + Index | label + url each |
| `cvFile` | **header "CV" link + Contact CV** | upload → header CV opens it directly. **If empty, the header CV link falls back to `/contact` (no broken link).** |
| `profileImage` | (available; used in Story query) | needs alt |
| `defaultSeoTitle` / `defaultSeoDescription` / `defaultSocialPreviewImage` | SEO fallbacks | optional |
| `siteLogoOrWordmark` | (reserved) | optional |

**Featured Current Entry behavior:** it's the homepage's dominant "what I'm known for right now." It's **manually selected** and **distinct from Latest Update** (which is the auto-computed newest `currentUpdate`). If it points at a **draft** work item, Sanity shows a _"Referenced document must be published"_ warning — that's fine during setup and doesn't block Draft Mode/Presentation; it just means the homepage won't feature it publicly until that work item is published+public.

**Ledger Sort trigger:** the homepage signature animation plays only when `featuredCurrentEntry` resolves **and** there are **≥2** other public archive fragments. With less, the homepage renders its settled state directly (no animation, no error).

---

## 9. Related entries — how to wire cross-references

On any work item, note, or field note, set `relatedEntries` to reference other archive documents. They render as authored marginalia. **Links resolve only** for: workItem → `/work/[slug]`, note → `/notes/[slug]`, fieldNote → `/field-notes/[slug]`. References to **readingEntry, experience, capability** render as non-clickable contextual records (by design). Referenced docs must be published+public (capability: active) to appear publicly. This never produces a broken link.

---

## 10. Images & files — practical guidance

- **Alt text is mandatory** on every image before you can publish the document. Describe the image plainly.
- `caption` and `credit` on an image render below it as a readable caption (sentence case) next to a `Fig. N` label. Write real captions; don't type in ALL CAPS.
- Use `coverMedia` for a lead photo; put diagrams/charts/scans/slides in galleries — they render **uncropped** and legible.
- For **downloadable files** (`downloadableFiles`, `evidence.files`, `cvFile`): set a human `title` (shown as the label) and optional `description`. The public list shows title + file type + size + a Download affordance. Don't rely on the raw filename.

---

## 11. What must stay factually honest — never inflate

- Don't fabricate: clients, metrics, outcomes, testimonials, dates, organisations, quotations, or achievements.
- Don't reframe academic/institutional/volunteer work as paid client consulting.
- Set `phase` truthfully; keep "Aspirational" quiet and never a headline category.
- Keep capability claims grounded in linked evidence.
- When a field is empty, **leave it empty** — the design shows an honest empty state. Never hardcode content to fill a gap, and never publish the placeholder documents as if they were real.

---

## 12. Fastest path to a live-feeling site (suggested order)

1. Site Settings: real `shortBio`, `siteTitle`, `longBio`, `contactLinks`/`socialLinks`, upload `cvFile`.
2. Publish 2–4 real **work items** (published + public + `featuredOrder` + `phase` + `primaryCategory` + `summary`; add cover/case-study/evidence where real).
3. Set Site Settings `featuredCurrentEntry` (to a published work item or a current update) and `featuredWork` order → homepage comes alive + Ledger Sort arms.
4. Add a few **current updates** (active, with dates) → `/now` + homepage Latest Update fill in.
5. Add real **notes**, **field notes**, **experiences**, **reading entries**, **capabilities** as they exist.
6. Verify each in Presentation, then publish. Confirm public mode shows only published+public content.

_Field definitions live in `src/sanity/schemaTypes/`. Public rendering rules are enforced in `src/sanity/lib/queries.ts` via the preview-aware gate. Do not change schemas to work around content — write the content._
