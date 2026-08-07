# Phase 5A — Verified Content Inventory & Population Tracker

_Live project tracker for populating the Adifinity archive with real content and
preparing it for launch. This is the **control file** for Phase 5 (5A → launch)._

**Latest activity — Phase 5I-F (2026-08-08):** **Experience dates now display as
intentionally coarse editorial years** (code only; stored CMS dates untouched; still
**not published**). New helper **`formatExperiencePeriod`** (`src/lib/entry-meta.ts`)
renders: Academics **2023–2024** · WACMUN **Jun 2024** (fixes the old
"Jun 2024 — Jun 2024") · YAF **2024** · Presidency **2024–2025** · IBA
**2025–present**. Wired into all four Experience date surfaces — `/experience`
register, `/experience/[slug]`, Story annotation, and the Featured-Entry `X` branch
— and the now-redundant standalone catalog-year was dropped from those meta lines.
**Work keeps `formatDateRange`** (month precision) — verified GHOROA still shows
"Jul 2026 — Jul 2026"; Archive `catalogLabel` (X · year · type) unchanged.
`tsc`/`eslint`/`build` pass; no regressions. See §13.

**Earlier — Phase 5I-E (2026-08-08):** **final Experience evidence set
locked** (CMS content-correction; still **draft / private — NOT published**).
**DRMCMUNA Academics** gained **four representative study-guide `evidenceFiles`**
— DISEC · NATO · US Cabinet · USSR Cabinet, in that order (each inspected: page
counts agree across two PDF libraries, no email/phone/ID PII, uploaded as-is);
metrics preserved at **350+ / 8**. **WACMUN** gained **source-grounded metrics** —
**Applications 146 · Committees offered 5** (re-verified against the registration
form: 146 submissions, 5 committee options), with the discredited **239 / 37 / 6**
figures kept out and **no Countries metric**; the **ICJ guide** is confirmed
(**79 pages**, all readable) and retained. **IBA** rank stays **visual-evidence
only** (no text/metric; "11,147" omitted). **YAF & Presidency unchanged.** Dates
render at **month level** (no false day precision) → no formatter change (§9).
Public privacy re-verified: all five `/experience/[slug]` **404**, `/experience`
200 empty, no leaks, GHOROA + Site Settings untouched. **The next phase is
publication review.** See [`docs/EXPERIENCE_EVIDENCE_PLAN.md`](EXPERIENCE_EVIDENCE_PLAN.md)
and §13.

**Earlier — Phase 5I-D (2026-08-08):** **Experience is now a first-class
accessible destination** (code/navigation only — no CMS mutations). Added the
**`/experience` landing register** (`src/app/(site)/experience/page.tsx`, a
chronological register ordered by `dateRange.startDate` ascending, via a dedicated
`EXPERIENCE_INDEX_QUERY` + `ExperienceListItem`), and added **Experience** as a
top-level entry in **both** the overlay Index (`site-index.tsx`) and the no-JS
footer Index (`site-footer.tsx`), placed after Work — order: Home · Story · Work ·
**Experience** · Now · Notes · Field Notes · Archive · Contact. A restrained
`All experience →` link was added to the foot of the Story annotation cluster
(supplement, not replacement). Experience now has **three discovery doorways**
(register, Story annotation, Archive) — all intentional and kept. **The five
Experience drafts remain draft / private / NOT published**; `/experience` shows an
honest **200 empty state** publicly and will surface them automatically once
published (no code change). **Story prose (`longBio`) unchanged; GHOROA unchanged;
Capabilities and Current Updates untouched.** `tsc`/`eslint`/`build` pass; no
regressions. Not pushed, not merged. See §13.

**Earlier — Phase 5I-C (2026-08-08):** wrote the **five real Experience
drafts** (all **draft / private — NOT published**), transaction
`ELYHRmWtP4iGWsbqfPuZbB`. The placeholder `fcd561ad…` was **repurposed in place**
into **WACMUN 2024** (UUID preserved). New UUIDs: **DRMCMUNA — Academics**
`5f35a12a-4ba0-473f-89a4-f494bc7b87d1`, **DRMCMUNA — Presidency**
`1c685bfd-a0b5-400f-acc8-07a68d19e357`, **Youth Affairs Forum**
`3f96bf50-5f1b-4f89-adaf-180b3d524891`, **IBA** `bae83bb3-9c2f-4a4a-87c6-ece55d047559`.
Six assets uploaded (5 evidence screenshots + the ICJ study-guide PDF). Metrics only
where evidence supports them (Academics 350+/8, YAF core team 11); WACMUN scale
metrics, the IBA rank, DRMCMUN study guides, registration sheets, and the EC-panel
document are all **held/private**. Integrity confirmed: GHOROA + siteSettings revs
unchanged, 0 published experiences, 0 Crimson, all `/experience/[slug]` → 404
publicly, homepage GHOROA untouched. Full per-Experience state, held claims, and
publication gates live in **[`docs/EXPERIENCE_EVIDENCE_PLAN.md`](EXPERIENCE_EVIDENCE_PLAN.md)**
(the authoritative Experience tracker). See §13.

**Earlier — Phase 5H (2026-08-07):** **GHOROA is PUBLISHED** (status
`published` / visibility `public`; `publishedAt` 2026-08-06T21:24:45Z;
`featuredOrder` 1; project date 2026-07-13 unchanged). It now resolves publicly
as the homepage **Featured Current Entry**, appears first on `/work`, and its
detail page (cover, 5 plates, PDF + PPTX downloads, collaborators, credits)
renders correctly.

**Phase 5I-B2 (2026-08-07):** added **linked visual evidence** to Experience — a
reusable `linkedEvidence` object (`experience.evidencePreviews[]`: screenshot +
title + source? + platform? + required url) rendered as a main-column **"Evidence"**
section where the image *and* its citation open the original external post in a new
tab (link-rot resilient; alt/caption/link-label kept distinct). The rail files block
was renamed "Evidence" → **"Documents"**. Additive/backward-compatible; `tsc`/`eslint`/
`build` pass; no regressions. Placeholder untouched. **Five real Experiences still
pending (5I-C).** See §13.

_Earlier — Phase 5I-B (2026-08-07):_ built the **Experience detail surface** —
`/experience/[slug]` (a first-class but restrained archival record; discovered via
now-clickable Story annotations + Archive records; no index, no nav item). Added
`EXPERIENCE_DETAIL_QUERY`/`_META_QUERY`, a minimal schema extension (`externalLinks`
+ `evidenceFiles`, reusing existing objects), and fixed the latent
`RELATED_ENTRIES_PROJECTION` precedence bug. Story experiences now sort
chronologically (oldest→newest). `tsc`/`eslint`/`build` pass; no regressions. **The
five real Experience records are NOT written yet** (Phase 5I-C). Placeholder
`drafts.fcd561ad…` remains draft/private/unreferenced. See §13.

_Earlier — Phase 5I (2026-08-07):_ ✅ fixed the `featuredWork` query defect (a
one-token parenthesis in `SITE_SETTINGS_QUERY`) and re-enabled `featuredWork = [GHOROA]`.

_Earlier — Phase 5G (2026-08-07):_ added cover (slide 9), 5-slide gallery, and a
36-page PDF; `socialPreviewImage` left empty.

_Earlier — Phase 5F (2026-08-06):_ built the flagship draft by replacing the
*Trust as Collateral* placeholder **in place** (UUID preserved) with **GHOROA**
(slug `ghoroa-nourish-proposal`); cleaned team deck uploaded as a public PPTX.

_Earlier — Phase 5D (2026-08-06):_ approved site-identity copy **published** on the
`siteSettings` singleton (`shortBio`, `longBio`); `heroCopy` empty; public identity
placeholder gone.

### ✅ Resolved defect — homepage `featuredWork` query (found 5H, fixed 5I)

**RESOLVED (2026-08-07):** the `featuredWork` projection in `SITE_SETTINGS_QUERY`
was parenthesised — `"featuredWork": (featuredWork[]->{ … })[defined(_id) && ${PUBLIC_ENTRY_FILTER}]`
— so the editorial gate filters the array instead of collapsing each dereferenced
doc to null. No runtime guard was added (query is now correct; the trailing
`[defined(_id) && …]` guarantees non-null items, matching the `FeaturedWorkItem[]`
type). `featuredWork = [GHOROA]` re-enabled; homepage renders GHOROA in Selected
Work exactly once. `tsc`, `eslint`, and `next build` all pass. Original defect
detail retained below for the record.

- **Affected page:** homepage `/` ([`src/app/(site)/page.tsx:104`](../src/app/(site)/page.tsx)) — returned **500** before the fix.
- **Trigger:** any **non-empty** `siteSettings.featuredWork`. The homepage does `featuredWork.map((item) => <WorkRow key={item._id} …/>)` with **no null guard**, and the array contains a `null`.
- **Root cause:** the `SITE_SETTINGS_QUERY` `featuredWork` projection ([`src/sanity/lib/queries.ts:70`](../src/sanity/lib/queries.ts)) — `featuredWork[]->{…}[defined(_id) && <gate>]`. GROQ operator precedence binds the trailing `[…gate]` to **each dereferenced object**, not the array, so a valid published ref collapses to `null` → `featuredWork` resolves to `[null]`. **Verified empirically:** the buggy shape returns `[null]`; `featuredWork[]->{_id,title}` (no trailing filter) returns `[{…GHOROA}]`.
- **Repro:** set `siteSettings.featuredWork` to a published+public workItem ref → load `/` in public mode → `TypeError: Cannot read properties of null (reading '_id')`.
- **Smallest proposed repair (NOT applied — code is out of scope for the 5x content phases):**
  1. **Query (root cause):** parenthesise the deref+project so the gate filters the array — `"featuredWork": (featuredWork[]->{ _id, title, …, coverMedia })[defined(_id) && (<PUBLIC_ENTRY_FILTER>)]` — or gate the refs before dereferencing.
  2. **Defensive (belt-and-suspenders):** `featuredWork.filter(Boolean).map(…)` at page.tsx:104.
- **Regression risk:** low — `featuredWork` is empty everywhere today; the fix only changes how a (previously-never-populated) field resolves + adds a null guard. Verify with 0 / 1 / 2+ items and in Draft Mode.
- **Current state (post-fix):** ✅ `featuredWork = [GHOROA]`; homepage 200 with GHOROA in **Selected Work** (once) **and** as Featured Current Entry; `/work` unchanged (GHOROA first); detail unchanged. Ledger Sort still inactive (only GHOROA public). Verified via dev server + `next build` (homepage prerendered Static without crash).

**Rules live elsewhere — do not duplicate them here:**
- Field-by-field population rules → [`docs/CONTENT_POPULATION_GUIDE.md`](CONTENT_POPULATION_GUIDE.md)
- Design invariants & anti-patterns → [`docs/MARGINALIA_DESIGN_HANDOFF.md`](MARGINALIA_DESIGN_HANDOFF.md)
- Project brief → [`CLAUDE.md`](../CLAUDE.md)

**Recovery state at start of Phase 5A** (verified 2026-08-05):
branch `phase-4-marginalia` · HEAD `c089c19` · working tree clean · local == `origin/phase-4-marginalia` (0/0) · dev server running from the correct project directory on :3000 · Phase 4 not merged to `main`.

**Factuality gate (from the Phase 5A brief):** every public claim must come from a
verifiable source supplied by Adi or already in the repo. Nothing is invented.
Where evidence is missing, the field stays empty and is listed in §5. All edits
stay in Draft Mode until Adi approves publication.

---

## 1. Dataset overview

- **Project:** `yj7sdqyj` · **Dataset:** `production`
- **Content documents:** 12 (all `workItem`/`note`/`fieldNote`/`experience`/`currentUpdate`/`readingEntry`/`capability`) — **all are draft-only placeholders**, `status: draft`, `visibility: private`.
- **Singleton:** `siteSettings` exists as **both** a published doc **and** a draft — and the **published** copy holds placeholder text (see §6/§12 — this is the one real launch defect).
- **Other docs:** `test-doc-1` (`test` type, **published**, scratch content — only ever renders on the protected `/test-preview`); `drafts.sanity.previewUrlSecret` (system doc for Presentation — leave alone).
- **Real content in the CMS today:** effectively none. Every content field is placeholder or empty.
- **Net effect in public mode:** all public list pages correctly show their honest empty states; the **only** placeholder that would leak publicly is `siteSettings.shortBio` / `longBio` (the singleton is always read, ungated).

Type counts (content types):

| Type | Count | State |
|------|-------|-------|
| `siteSettings` | 1 (published + draft) | placeholder, published copy is a leak risk |
| `workItem` | 2 | both placeholder drafts |
| `experience` | 1 | placeholder draft |
| `note` | 1 | placeholder draft |
| `fieldNote` | 1 | placeholder draft |
| `currentUpdate` | 2 | placeholder drafts (both `active: true`) |
| `readingEntry` | 1 | placeholder draft |
| `capability` | 2 | placeholder drafts (both `active: true`) |
| `test` | 1 | published scratch doc (protected route only) |

---

## 2. Document-by-document inventory

Legend — Classification: **PLACEHOLDER** = must be replaced with real content before it can go public · **OBSOLETE** = a schema-verification artifact, candidate for removal · **SYSTEM** = leave alone.

### siteSettings — published (`_id: siteSettings`)
- **Classification:** PLACEHOLDER · **published** (this is the live singleton).
- **Populated:** `siteTitle` = "Adifinity — Raiyan Sadi Aditya" (fine); `shortBio` = "Placeholder short bio — content to be written for Phase 4." (**placeholder — leaks to homepage h1**); `longBio` = one block "Adifinity — Raiyan Sadi AdityaX" (**placeholder — leaks to Story**).
- **Missing:** `heroCopy`, `featuredCurrentEntry`, `featuredWork`, `contactLinks`, `socialLinks`, `cvFile`, `profileImage`, `defaultSeoTitle/Description/SocialPreviewImage`.
- **Appears on:** homepage (shortBio → h1), Story (longBio), Contact + Index (links/cv), header (cv), all pages (SEO).
- **Action:** replace `shortBio`/`longBio` with real copy; then decide publication (§6, §12).

### siteSettings — draft (`_id: drafts.siteSettings`)
- **Classification:** PLACEHOLDER · draft override of the singleton.
- **Extra vs published:** `featuredCurrentEntry` → weak ref to the flagship workItem draft `4eb5c9c8…` (shows the expected "Referenced document must be published" warning — benign).
- Same placeholder `shortBio`/`longBio` as the published doc.

### workItem — `4eb5c9c8-…-a16f198f8` — **"GHOROA — The Taste of Home, Wherever You Are"** (Phase 5F–5H) — **PUBLISHED**
- **Classification:** REAL flagship, **PUBLISHED** (replaced the *Trust as Collateral* placeholder **in place** — UUID preserved; the draft was consumed on publish).
- **Status:** **`published` / `public`** (5H). rev `G2blyWsrpd4FcYBaehS2Wa`. `publishedAt` = 2026-08-06T21:24:45Z. *Trust as Collateral* is fully retired.
- **Text/meta (5F):** `title`, `slug` = `ghoroa-nourish-proposal`, `summary`, `body` (15 blocks), `problem`/`approach`/`outcome`, `dateRange` 2026-07-13, `phase` = `demonstrated` (completed proposal, not implemented), `primaryCategory` = `financeStrategy`, `featuredOrder` = **1**, `role` = "Research & development", `institutionOrClient` = "IBA Intra Business Competition — Nourish case", `collaborators` = Kazi Ahnaf Akif · Ayesha Ferdous Faiza · Bushra Lubabah, `credits`, `methods` (6), `secondaryThemes` (3), `confidentialityNote` (context note), `seo` (title+description).
- **Media & files (5G):** `coverMedia` = **slide 9** (brand-name/meaning; asset `image-ef6f…`), with alt/caption/credit. `gallery` = **5 slides in order** — 12 (positioning), 13 (roadmap), 16 (brand system), 22 (Gulf route), 29 (illustrative unit economics) — each with alt/caption/credit. `downloadableFiles` = **[0] PDF** (`file-393f…-pdf`) then **[1] cleaned PPTX** (`file-97c95…-pptx`). PDF: 36 pages, all fonts embedded (Bengali = ShonarBangla), no PII.
- **Intentionally empty (pending):** `externalLinks`, `relatedEntries`, `evidence`, `seo.socialPreviewImage` (left empty — slide-9 crop would clip the bottom tagline at social ratios; a dedicated card is better later).
- **Deck note:** cleaned public PPTX (teammate email + tidied metadata removed; all 36 visible slides + citations intact). Underlying Nourish case/source files **not** uploaded.
- **Cover FYI:** slide 9's right-hand background is a generic raw red-meat photo (flagged in 5E as reading as non-chicken); the teammate selected slide 9 knowingly — trivially swappable while draft.
- **Referenced by:** `siteSettings.featuredCurrentEntry` (published, weak → this UUID) — now **resolves publicly** to GHOROA (homepage Featured Current Entry).
- **Appears on (public, verified):** homepage (Featured Current Entry) · `/work` (first) · `/work/ghoroa-nourish-proposal` (200, canonical correct) · Archive. **Not** in Selected Work (see 🐛 `featuredWork` defect above).
- **Teammate consent:** ✅ confirmed (Kazi Ahnaf Akif, Ayesha Ferdous Faiza, Bushra Lubabah may be named publicly).

### workItem — `drafts.cb911028-…-fdc00bcac4` — "Placeholder Work Item — Policy & Research Sample"
- **Classification:** PLACEHOLDER / likely **OBSOLETE** (schema-test second entry).
- **Populated:** `phase` = `demonstrated`, `primaryCategory` = `policyResearch`, `dateRange` 2026-06-01→2026-06-15, placeholder `body`/`summary`.
- **Missing:** `featuredOrder`, everything substantive.
- **Referenced by:** nothing.
- **Decision (§6):** keep as a real second Work entry only if genuine material exists; otherwise remove later.

### The five real Experience drafts (Phase 5I-C, 2026-08-08) — all **draft / private**
Full per-Experience state, evidence, held claims, and publication gates live in
**[`docs/EXPERIENCE_EVIDENCE_PLAN.md`](EXPERIENCE_EVIDENCE_PLAN.md)** (authoritative). Summary:

| UUID | Experience | roleTitle | type / phase | Metrics | Held / private |
|---|---|---|---|---|---|
| `fcd561ad-…` *(repurposed placeholder)* | **WACMUN 2024** | Deputy SG · ICJ Chair | leadership / past | — (scale metrics held) | 239/37/6 unsupported by 146-row form |
| `5f35a12a-…` | **DRMCMUNA — Academics** | Junior Rep · ASG Academics | leadership / past | Delegates **350+** · Committees **8** | 9 study guides (authored-selection pending) |
| `1c685bfd-…` | **DRMCMUNA — Presidency** | President | leadership / past | — | EC-panel document (other students' PII) |
| `3f96bf50-…` | **Youth Affairs Forum** | Co-Founder | leadership / past | Core team **11** | country count (source conflict) |
| `bae83bb3-…` | **IBA** | BBA Student | education / **current** | — | **rank ("Merit 4th") — image only, wording approval pending** |

- **Repurpose:** the ex-placeholder `fcd561ad…` became **WACMUN 2024** in place (UUID preserved; the old "Research Associate — Placeholder Institution" is fully retired). The other four are new drafts.
- **Evidence uploaded:** 5 clickable screenshot previews (each links to its original IG/FB post — see the mapping table in the evidence plan) + the WACMUN ICJ study-guide PDF (no PII). Registration spreadsheets, study guides, and the EC-panel image were **not** uploaded (private / held).
- **Appears on:** Story margin, Archive, and `/experience/[slug]` — but **only in Draft Mode**; all five are 404 publicly.
- **Crimson Education:** deliberately **not** an Experience (Story/CV per 5I-A). Reading / MUN-origin / IBA-transition → Story prose.

### note — `drafts.2053a4bb-…-883a5c59c` — "this is part of notes that i will most likely use as a blog"
- **Classification:** PLACEHOLDER (title is Adi's own scratch note).
- **Populated:** `noteType` = `workingNote`, `date` 2026-07-05, `estimatedReadingTime` 2; placeholder `summary`/`body`.
- **Appears on:** `/notes`, `/notes/[slug]`, Archive, homepage notes strip.

### fieldNote — `drafts.e2178a20-…-20c9498079` — "Placeholder Field note (oh wow i can edit in real time)"
- **Classification:** PLACEHOLDER.
- **Real signal:** `country` = "Bangladesh". `locationName` = "Placeholder Location" (placeholder); `date` 2026-06-20; `dateVisited` 2026-06-18.
- **Placeholder:** `title`, `summary`, `observation`, `body`.
- **Appears on:** `/field-notes`, `/field-notes/[slug]`, Archive.

### currentUpdate — `drafts.3c02ddad-…-3257d8a78a` — "Placeholder — Reading for Phase 4 content model"
- **Classification:** PLACEHOLDER · `active: true`.
- **Populated:** `label` = `reading`; placeholder `description`. **No `date`, no `priority`.**
- **Appears on:** `/now`, homepage "Latest Update" (auto-computed newest active).

### currentUpdate — `drafts.effcd631-…-38285e640` — "Placeholder — Building the Adifinity content model"
- **Classification:** PLACEHOLDER · `active: true`.
- **Populated:** `label` = `building`, `priority` 1; placeholder `description`. **No `date`.**
- **Appears on:** `/now`, homepage "Latest Update".

### readingEntry — `drafts.8bfe77dd-…-25b429cee6` — "Placeholder Reading Entry"
- **Classification:** PLACEHOLDER.
- **Populated:** `author` = "Placeholder Author", `dateRead` 2026-05-20; placeholder `highlightOrIdea`/`shortReflection`.
- **Appears on:** Archive, homepage Reading strip. (No detail route — by design.)

### capability — `drafts.a058d39e-…-4c7f4c730a5` — "Placeholder Capability — Financial Analysis"
- **Classification:** PLACEHOLDER · `active: true` · `phase` = `current` · `displayOrder` 1.
- **Appears on:** Story "Apparatus" (Current column).

### capability — `drafts.4c10d514-…-0a16f198f8` — "Placeholder Capability — Applied Policy Writing"
- **Classification:** PLACEHOLDER · `active: true` · `phase` = `emerging` · `displayOrder` 2.
- **Appears on:** Story "Apparatus" (Emerging column).

### test — `test-doc-1` (published)
- **Classification:** OBSOLETE scratch doc. Renders only on protected `/test-preview`. Not a public concern. Remove later if desired (needs Adi's go-ahead).

### drafts.sanity.previewUrlSecret
- **Classification:** SYSTEM (Presentation preview secret). **Leave alone.**

---

## 3. Placeholder replacement map

| Placeholder doc | Becomes | Needs before it can be real |
|---|---|---|
| `siteSettings.shortBio` | Real short bio | ✅ approved (5B) + **published** (5D) — live public |
| `siteSettings.longBio` | Real Story prose | ✅ approved (5B) + **published** (5D) — live public |
| flagship workItem `4eb5c9c8…` | ✅ **GHOROA** proposal (built 5F, draft) | Replaced in place; cover + gallery + teammate-consent still pending before publish |
| second workItem `cb911028…` | A genuine 2nd Work entry **or** removed | A real project, or a decision to delete |
| experience `fcd561ad…` | A real experience | Org name, role, dates, narrative |
| note `2053a4bb…` | A real note | One real note's text |
| fieldNote `e2178a20…` | A real field note | Place, date visited, observation, body |
| currentUpdate ×2 | Real "now" lines | Accurate current activities + dates |
| readingEntry `8bfe77dd…` | A real reading record | Book title, author, date, one idea |
| capability ×2 | Real capabilities | Honest Current/Emerging skills + evidence links |
| `test-doc-1` | (removed) | Adi's go-ahead to delete |

---

## 4. Existing factual source map (what is actually verifiable today)

Everything below is either approved copy in the repo or a real signal embedded in a placeholder. **This is the entire verifiable set.**

- [x] **Name:** Raiyan Sadi Aditya (Adi) — `src/lib/site-copy.ts`, brief.
- [x] **Institution:** Institution of Business Administration (IBA), University of Dhaka — `site-copy.ts` + flagship workItem `institutionOrClient`.
- [x] **Location:** Dhaka, Bangladesh — experience `location`, fieldNote `country`.
- [x] **Public domain:** https://adityaraiyan.com — `site-copy.ts`.
- [x] **Approved identity line** (`IDENTITY_LINE`, `site-copy.ts`): _"The working archive of Raiyan Sadi Aditya — a business student at IBA, University of Dhaka, documenting a path from research and institutions toward finance and strategy."_ Already wired as the homepage/meta fallback. Candidate for `siteSettings.shortBio`.
- [x] **Transformation arc** (`TRANSFORMATION_ARC`, `site-copy.ts`, already rendered on Story): private reader → public debater → institutional builder → business student → emerging finance & strategy professional.
- [x] **Flagship framing:** category `financeStrategy`, phase `developing`, academic/research (not client) — from the placeholder's kept fields.

**No source material exists in the repo for:** any bio prose, any real project write-up, real dates, experiences, reading list, notes, field observations, capabilities evidence, CV file, or any image/plate. `public/` is empty; there are no source `.md`/`.pdf`/`.docx`/image assets.

---

## 5. Missing-source list (source request) — grouped by priority

For each item: **CMS doc · field · why it matters · acceptable source · blocks launch?**

### P1 — Site identity (highest)
- [x] **`siteSettings.shortBio`** — homepage h1 identity line. ✅ Approved (5B), written to draft (5C), **published (5D)** — live public.
- [x] **`siteSettings.longBio`** — Story main prose. ✅ Approved (5B), written to draft (5C), **published (5D)** — live public.
- [ ] **`siteSettings.heroCopy`** — Story fallback. _Acceptable:_ optional short prose. Blocks launch: no.
- [ ] **`siteSettings.contactLinks`** — Contact + Index. _Acceptable:_ label + email/URL pairs (e.g. email, LinkedIn). Blocks launch: no (honest empty state).
- [ ] **`siteSettings.socialLinks`** — Contact "Elsewhere" + Index. _Acceptable:_ label + URL pairs. Blocks launch: no.
- [ ] **`siteSettings.cvFile`** — header CV + Contact. _Acceptable:_ a real, current CV/PDF. Blocks launch: no (header falls back to `/contact`).
- [ ] **`siteSettings.defaultSeoTitle` / `defaultSeoDescription`** — SEO fallbacks. _Acceptable:_ short strings (or accept code defaults). Blocks launch: no.
- [ ] **`siteSettings.profileImage`** — Story query. _Acceptable:_ a portrait + alt text. Blocks launch: no.

### P2 — Homepage control
- [ ] **`siteSettings.featuredCurrentEntry`** — homepage centre + arms Ledger Sort. _Acceptable:_ Adi picks a published+public workItem/experience/currentUpdate once one exists. Blocks launch: no (honest empty state) — but needed for the homepage to feel alive.
- [ ] **`siteSettings.featuredWork`** — homepage "Selected work". _Acceptable:_ ordered list of real published+public workItems. Blocks launch: no.

### P3 — Flagship work (Trust as Collateral)
- [ ] **`workItem 4eb5c9c8….title`** — real title. **Blocks a real launch.**
- [ ] **`workItem 4eb5c9c8….summary`** — index/detail lede + OG description. Blocks a real launch.
- [ ] **`workItem 4eb5c9c8….dateRange`** — real start/end (or ongoing). Blocks a real launch.
- [ ] **`…problem` / `…approach` / `…outcome`** _or_ **`…body`** — the write-up. _Acceptable:_ Adi's real account of the project (academic/research framing). Blocks a real launch.
- [ ] **`…coverMedia`** (+ alt), **`…evidence`** (narrative + files), **`…gallery`**, **`…methods`**, **`…collaborators`**, **`…secondaryThemes`**, **`…externalLinks`**, **`…credits`**, **`…relatedEntries`** — all optional, populate only where real. Blocks launch: no.
- [ ] **`…featuredOrder`** — number; the on/off switch for `/work`. Set once the entry is real + published+public.

### P4 — Supporting work (optional)
- [ ] Real material for a **second workItem**, or a decision to remove `cb911028…`.

### P5 — Current state (`/now`)
- [ ] **currentUpdate ×2 `title` / `description` / `label` / `date` / `priority`** — _Acceptable:_ 1–4 activities genuinely current in Aug 2026, with real dates. Blocks launch: no.

### P6 — Story & apparatus
- [ ] **experience `fcd561ad….organisation` / `roleTitle` / `dateRange` / `summary` / `narrativeBody`** — _Acceptable:_ real institutional/leadership/education/practice roles (name, title, dates, prose). Blocks launch: no.
- [ ] **capability ×2 `name` / `phase` (Current|Emerging) / `description` / `linkedExamples`** — _Acceptable:_ honest skills tied to evidence. Blocks launch: no.

### P7 — Notes, field notes, reading
- [ ] **note `2053a4bb…`** — one real note (`title`, `summary`, `body`, `noteType`, `date`). Blocks launch: no.
- [ ] **fieldNote `e2178a20…`** — one real place record (`title`, `locationName`, `dateVisited`, `observation`, `body`). Blocks launch: no.
- [ ] **readingEntry `8bfe77dd…`** — one real book (`title`, `author`, `dateRead`, `highlightOrIdea`). Blocks launch: no.

---

## 6. Required user decisions

- [x] **Short/long bio copy (P1):** RESOLVED (Phase 5B) — approved a third-person homepage `shortBio` and a first-person 5-paragraph Story `longBio` (not the `IDENTITY_LINE` verbatim). Written to the draft in Phase 5C (§13).
- [x] **Publish the singleton (P1):** RESOLVED (5D) — `siteSettings` published; real bio is live public, placeholder gone.
- [ ] **`featuredCurrentEntry`:** it is now a **published** field holding a weak ref to the **draft** flagship workItem. Harmless (gated → shows homepage empty state), but a future *Studio* "Publish" of `siteSettings` while the workItem is still a draft could surface a strengthen conflict. Cleanest durable fix: publish/replace the flagship workItem (5E) so the ref can strengthen — or repoint/clear it later. No action needed now.
- [ ] **Flagship slug:** keep `trust-as-collateral-preview-template`, or rename to e.g. `trust-as-collateral`? (Renaming pre-publication is clean; the design brief says preserve slugs unless there's a clear reason.)
- [ ] **Second workItem `cb911028…`:** promote to a real entry, or remove later?
- [ ] **`test-doc-1`:** remove this scratch doc, or leave it (it only shows on the protected `/test-preview`)?
- [ ] **CV:** is a current CV available to upload, or launch without one (header falls back to `/contact`)?

---

## 7. Publication dependencies (what must be true for content to appear publicly)

- A **workItem/note/fieldNote/experience/readingEntry** shows publicly only when `status: published` **and** `visibility: public`.
- A **currentUpdate** and **capability** show when `active: true` (no status/visibility).
- **`/work`** additionally requires a numeric **`featuredOrder`**.
- **`featuredWork`** and **`featuredCurrentEntry`** refs must point at published+public docs (currentUpdate: active) to resolve publicly.
- **`relatedEntries`** targets must themselves be published+public/active, or they simply don't render (never a broken link).
- **Ledger Sort** arms only when `featuredCurrentEntry` resolves **and** ≥2 other public archive fragments exist — otherwise the settled homepage renders directly.
- **`siteSettings`** is always read (ungated), so its own fields (bio, links, cv, seo) surface as soon as the published singleton carries them — this is why its placeholder is the one real leak.

---

## 8. Homepage configuration status

| Element | Source | Status |
|---|---|---|
| Identity line (h1) | `siteSettings.shortBio` | ✅ **published & live public** (5D) — approved short bio |
| Featured Current Entry (centre) | `siteSettings.featuredCurrentEntry` | ❌ set only on draft (→ draft workItem); not public |
| Latest Update ("Now") | newest `active` currentUpdate (auto) | ⚠️ two active placeholders, no dates — would compute but placeholder text |
| Archive fragments | recent public docs | ❌ none public yet → empty |
| Selected Work | `siteSettings.featuredWork` | ❌ unset |
| Notes / Field Notes strips | public notes/field notes | ❌ none public |
| Reading strip | public readingEntry | ❌ none public |
| **Ledger Sort** | featured entry + ≥2 fragments | ❌ not eligible (correct) |

**Keep distinct (never merge):** Featured Current Entry (manual, centre) ≠ Latest Update (auto newest active) ≠ Selected Work (`featuredWork`).

---

## 9. Work-page configuration status

- `/work` index is **empty** until at least one workItem is `published + public + featuredOrder`.
- Flagship `4eb5c9c8…`: has real category/phase/role/institution signal, but placeholder title/summary/body and **no `featuredOrder`** → not on `/work`.
- Second workItem `cb911028…`: placeholder, no `featuredOrder`.
- **`featuredOrder` plan (once entries are real & published):** flagship = `1`; a real second entry = `2`.
- The unused `featured` boolean is ignored (curation uses `featuredOrder` + `featuredWork`).

---

## 10. Contact & CV status

- **Contact links / social links:** none set → Contact shows its honest empty state; Index omits them.
- **CV:** none uploaded → header "CV" link falls back to `/contact` (no broken link). Needs a real current CV to enable the direct link.
- **No action taken** — awaiting real links + CV file (§5 P1, §6).

---

## 11. Proposed population sequence

Ordered so each step unlocks the next and nothing public is placeholder:

1. **P1 identity (draft):** set real `shortBio` (approve `IDENTITY_LINE` or fresh) + `longBio` on the **draft** siteSettings; add `contactLinks`/`socialLinks`/`cvFile` if available. Verify in Presentation.
2. **P3 flagship (draft):** replace flagship workItem title/summary/body + real case-study fields; add `featuredOrder`.
3. **P2 homepage (draft):** set `featuredCurrentEntry` + `featuredWork` to the now-real flagship.
4. **P5 current updates:** replace with genuine "now" lines + dates.
5. **P6 Story apparatus:** real experience + capabilities.
6. **P7 notes / field notes / reading:** one excellent real item each (no filler).
7. **Publish** (only on Adi's explicit approval), starting with the singleton to clear the public bio placeholder, then each entry after Presentation verification.

Each completed CMS change is logged in §13.

---

## 12. Launch-blocking vs. optional content

**Hard launch blocker (a defect, not an empty state):**
- [x] **RESOLVED (5D) — Published `siteSettings.shortBio` / `longBio` now hold the approved real copy.** The homepage h1 and Story prose show the real bio in public mode; the placeholder is gone (verified 2026-08-06 in public mode: correct copy renders, both routes 200, no console/hydration errors, no draft leakage, draft workItem still gated out of the featured slot).

**Content-completeness blockers (site is technically launchable via honest empty states, but feels unfinished):**
- [ ] No published+public work → `/work`, homepage Selected Work, Archive empty.
- [ ] No `featuredCurrentEntry` → homepage has no centre; Ledger Sort dormant.
- [ ] No real current updates / experiences / capabilities / notes / reading.

**Optional / not blocking:**
- CV file, profile image, SEO defaults, second work item, related-entry wiring, `test-doc-1` cleanup.

---

## 13. CMS change log

**Phase 5A (2026-08-05):** inventory only — no CMS documents created, edited,
published, or deleted.

**Phase 5C (2026-08-06):** approved site-identity copy written to the **draft**
singleton. The `.env.local` token is read-only (Viewer, 403 on write), so the
patch was applied through the authenticated Sanity CLI user session
(`sanity exec --with-user-token`). Only the two named fields were touched via
`.set`; `siteTitle` and `featuredCurrentEntry` preserved; `heroCopy` not set;
the **published** `siteSettings` left untouched (`_rev` unchanged); nothing published.

| Date | Doc | Field(s) | Change | Draft/Published |
|------|-----|----------|--------|-----------------|
| 2026-08-06 | `drafts.siteSettings` | `shortBio` | Set to approved third-person homepage bio (verbatim) | **Draft** — rev `8kVPCFAj0Gzsq6loj2KK8U` |
| 2026-08-06 | `drafts.siteSettings` | `longBio` | Set to approved 5-paragraph first-person Story bio (Portable Text, verbatim) | **Draft** — same rev |
| 2026-08-06 | `drafts.siteSettings` | `heroCopy` | Intentionally left empty (unused fallback; `longBio` populated) | — |

**Phase 5D (2026-08-06):** published the singleton. The canonical Document
Actions publish failed (409) because it tried to *strengthen* the
`featuredCurrentEntry` weak ref, whose target workItem has no published version.
Publish was instead done as Studio does it — a content-preserving transaction
(`createOrReplace` published from the draft + delete the draft) that keeps
`featuredCurrentEntry` **verbatim** (weak, unchanged), via the authenticated CLI
user session. Only `siteSettings` changed; the referenced workItem draft
(`2a2d65b9…`) was untouched; nothing else published.

| Date | Doc | Field(s) | Change | Draft/Published |
|------|-----|----------|--------|-----------------|
| 2026-08-06 | `siteSettings` | `shortBio`, `longBio` | Published approved copy (draft → published) | **Published** — rev `8kVPCFAj0Gzsq6loj2LsdC` (was `9txlVAuf…`) |
| 2026-08-06 | `siteSettings` | `siteTitle`, `featuredCurrentEntry`, `heroCopy` | Preserved (title unchanged; featured ref verbatim weak; heroCopy absent) | **Published** |
| 2026-08-06 | `drafts.siteSettings` | — | Deleted by publish (normal lifecycle) | removed |

**Post-publish note:** the published `siteSettings.featuredCurrentEntry` is a
weak ref to the draft flagship workItem. It is gated (homepage shows the empty
featured state publicly) and never leaks the draft. See §6 for the durable
cleanup path (Phase 5E).

**Phase 5F (2026-08-06):** built the GHOROA flagship by replacing the *Trust as
Collateral* placeholder **in place** (UUID `4eb5c9c8…` preserved, so the weak
`featuredCurrentEntry` ref stays valid). Written via the authenticated CLI user
session with an `ifRevisionId` guard. Deck was cleaned first: only the hidden
`lastModifiedBy` teammate email (`docProps/core.xml`) and title/creator metadata
were changed — all 36 visible slides, media and source citations are byte-identical
(verified). The lone embedded object is slide 4's own market-chart data (not a
source document). Underlying Nourish case/source files were **not** uploaded.

| Date | Doc | Change | Draft/Published |
|------|-----|--------|-----------------|
| 2026-08-06 | asset `file-97c95…-pptx` | Uploaded cleaned public deck (4.67 MB, `GHOROA-Competition-Presentation.pptx`) | asset |
| 2026-08-06 | `drafts.4eb5c9c8…` | Placeholder → full GHOROA draft (all core fields, PA/O, 15-block body, SEO, `downloadableFiles`); `featured` bool unset | **Draft** — rev `2a2d65b9…` → `eWSIqatZ40JEzfekvND1K7` |
| 2026-08-06 | `siteSettings` | **Untouched** (`featuredCurrentEntry` still weak → `4eb5c9c8`) | Published (unchanged) |

**Verification:** UUID unchanged; public-perspective queries return `None`/`[]`;
`/work/ghoroa-nourish-proposal` → 404 publicly; no GHOROA text/asset-URL leak;
published `4eb5c9c8` does not exist (nothing published).

**Phase 5G (2026-08-07):** added media + PDF via the authenticated CLI session
with an `ifRevisionId` guard; only `coverMedia`, `gallery`, `downloadableFiles`
were set (all text preserved). The teammate-supplied 36-page PDF was inspected
(36 pages; all fonts embedded incl. Bengali `ShonarBangla`; `/Author` = generic
"Microsoft Office User", no PII) and uploaded as-is. Six teammate slide exports
(9, 12, 13, 16, 22, 29 — all ~16:9, uncropped) were uploaded as images.

| Date | Doc | Change | Draft/Published |
|------|-----|--------|-----------------|
| 2026-08-07 | asset `file-393f…-pdf` | Uploaded 36-page PDF edition (1.02 MB) | asset |
| 2026-08-07 | 6 × `image-…-png` | Uploaded slide exports (cover 9 + gallery 12/13/16/22/29) | assets |
| 2026-08-07 | `drafts.4eb5c9c8…` | Set `coverMedia` (slide 9), `gallery` (5, ordered, alt/caption/credit), `downloadableFiles` = [PDF, PPTX]; `socialPreviewImage` left empty; **all text untouched** | **Draft** — rev `eWSIqatZ…` → `ELYHRmWtP4iGWsbqfPiHSu` |
| 2026-08-07 | `siteSettings` | **Untouched** (`featuredCurrentEntry` still weak → `4eb5c9c8`) | Published (unchanged) |

**5G verification:** cover → slide-9 asset; gallery 5 items in order; PDF =
`downloadableFiles[0]`, PPTX = `[1]`; text/SEO/collaborators unchanged;
`/work/ghoroa-nourish-proposal` still 404 publicly; no asset-URL/image/text leak;
nothing published; Site Settings ref unchanged.

**Phase 5H (2026-08-07):** **published GHOROA** and attempted its placement, via
the authenticated CLI session with rev guards.

| Date | Doc | Change | Result |
|------|-----|--------|--------|
| 2026-08-07 | `drafts.4eb5c9c8…` → `4eb5c9c8…` | Publish: set `status=published`, `visibility=public`, `publishedAt=2026-08-06T21:24:45Z`; all content preserved; draft consumed | **Published** — rev `G2blyWsrpd4FcYBaehS2Wa` |
| 2026-08-07 | `siteSettings` | Added `featuredWork=[GHOROA]` … then **reverted** (unset) after it exposed the homepage 🐛 defect (500) | Published — reverted; other fields (shortBio/longBio/featuredCurrentEntry/siteTitle) preserved |

**5H verification:** GHOROA published (status/visibility/phase/featuredOrder/slug
correct; text/collaborators/cover/gallery/PDF+PPTX intact); `featuredCurrentEntry`
resolves publicly to GHOROA; API **and** CDN serve it. After a `.next` clear +
dev restart (stale-cache handling per §12): homepage `/` **200** with GHOROA
featured + honest empty Selected Work; `/work` **200** (GHOROA first, no
placeholder); `/work/ghoroa-nourish-proposal` **200** (canonical
`https://adityaraiyan.com/…`, cover Fig.1, 5 plates, PDF+PPTX links, collaborators,
credits, context note, "illustrative" on slide 29, SEO title/desc). No draft/`trust
as collateral`/placeholder/stega leak. **Ledger Sort:** correctly **inactive** (only
GHOROA public ⇒ <2 fragments — expected, no filler created). Mobile 375px: no
horizontal overflow, images fit, downloads present. Policy placeholder still
draft-only; no unrelated document changed.

**Phase 5I (2026-08-07) — `featuredWork` query repair (code + data):**

| Date | Doc/File | Change | Result |
|------|----------|--------|--------|
| 2026-08-07 | `src/sanity/lib/queries.ts` | `SITE_SETTINGS_QUERY.featuredWork`: wrapped `featuredWork[]->{…}` in parens so `[defined(_id) && <gate>]` filters the array, not each doc. No runtime guard added (query now correct; type contract restored). | code fix |
| 2026-08-07 | `siteSettings` | Re-set `featuredWork=[GHOROA]` (strong ref, one item); shortBio/longBio/featuredCurrentEntry/siteTitle preserved | Published — rev `ELYHRmWtP4iGWsbqfPisYe` |

**5I verification:** reproduced A `featuredWork[]->{…}[gate]` → `[null]`; proved B
`(featuredWork[]->{…})[gate]` → `[{GHOROA}]`. After fix + re-enable: homepage `/`
**200**, GHOROA in Selected Work **exactly once** (1 row, 1 link) + still Featured
Current Entry; no `_id`-null error in dev log; `/work` + detail unchanged (PDF/PPTX
intact); Ledger Sort still inactive. **`tsc --noEmit` = 0, `eslint` = 0,
`next build` = success** (homepage prerendered Static without crash). Draft-Mode
click-to-edit of `featuredWork` = a manual check (pane can't authenticate Presentation).

**Phase 5I-B (2026-08-07) — Experience detail surface (code + schema + docs):**

| File | Change |
|------|--------|
| `src/sanity/schemaTypes/documents/experienceType.ts` | +`externalLinks` (array of `externalLink`) +`evidenceFiles` (array of `fileDownload`); `websiteUrl` retained; nothing removed/renamed |
| `src/sanity/lib/queries.ts` | Fixed `RELATED_ENTRIES_PROJECTION` precedence (parenthesised, like 576d1b5); added `EXPERIENCE_DETAIL_QUERY` + `EXPERIENCE_META_QUERY` (+ `MetricValue`/`ExperienceDetailPayload`/`ExperienceMetaPayload` types); `STORY_QUERY` experiences: added `slug`, order `desc`→**`asc`** (chronological) |
| `src/app/(site)/experience/[slug]/page.tsx` | **new** detail route (Server Component; `archiveFetch`+gate+`SanityLive`+Draft Mode; `notFound()`; dynamic `ƒ`, no static params) |
| `src/app/(site)/story/page.tsx` | Annotations wrapped in `Link` → `/experience/[slug]` when slug resolves (compact design preserved; keyboard/hover a11y) |
| `src/app/(site)/archive/page.tsx` | `ROUTE_BASE` += `experience: '/experience'` (records now clickable) |
| `src/components/related-entries.tsx` | `ROUTE_BASE` += `experience` (experience cross-refs now link) |
| docs | handoff §16a, guide §4, this file |

**5I-B verification:** `EXPERIENCE_DETAIL_QUERY` resolves the placeholder in
**preview** (all fields; parenthesised relatedWork/relatedEntries return cleanly),
returns **null** in **public**. `tsc`=0, `eslint`=0, `next build`=success
(`ƒ /experience/[slug]` registered; `/story`,`/archive` still Static). Public:
`/`,`/story`,`/archive` 200; `/experience/nonexistent` and the draft placeholder
→ **404**; placeholder absent from Story/Archive. **No regression:** GHOROA
Featured Current Entry + Selected Work intact, `/work/ghoroa` 200, 0 dev-log
errors, featuredWork repair unchanged. **Manual (needs Studio auth):** the
preview *visual* of `/experience/[placeholder-slug]` + clickable annotation.
No Experience published; placeholder untouched.

**Phase 5I-B2 (2026-08-07) — linked visual evidence (code + schema + docs):**

| File | Change |
|------|--------|
| `src/sanity/schemaTypes/objects/linkedEvidenceType.ts` | **new** `linkedEvidence` object `{image: imageWithMetadata, title, source?, platform?, url}` (url required) |
| `src/sanity/schemaTypes/index.ts` | registered `linkedEvidenceType` |
| `src/sanity/schemaTypes/documents/experienceType.ts` | +`evidencePreviews` (array of `linkedEvidence`); additive, nothing removed/renamed |
| `src/sanity/lib/queries.ts` | `EXPERIENCE_DETAIL_QUERY` +`evidencePreviews` (image with dims); +`LinkedEvidence` type; `ExperienceDetailPayload` +field |
| `src/components/evidence-preview.tsx` | **new** `EvidencePreview` — clickable image + sibling citation link (no nesting), intrinsic/aspect-preserved, distinct alt/link-label/caption |
| `src/app/(site)/experience/[slug]/page.tsx` | render "Evidence" main section; rail "Evidence"→"Documents" |
| docs | handoff §16b, guide §4, this file |

**5I-B2 verification:** projection valid (placeholder resolves, `evidencePreviews`
null). `tsc`=0, `eslint`=0, `next build`=success. Public: `/`,`/story`,`/archive`,
`/work` 200; experience routes 404 (gated); **no regression** (GHOROA featured +
Selected Work intact, `/work/ghoroa` 200, no placeholder leak, 0 dev-log errors).
**Manual (Studio auth):** the *visual* render of an evidence preview (image
clickable → original post; citation link; focus; responsive) — needs a real
`linkedEvidence` item in Draft Mode. Placeholder untouched; nothing published.

**Phase 5I-C (2026-08-08) — five real Experience drafts written (CONTENT WRITE):**
Authorized CMS write of exactly five Experience records via the authenticated CLI
user session (`sanity exec --with-user-token`; the `.env.local` token is read-only).
Single transaction `ELYHRmWtP4iGWsbqfPuZbB`: 6 assets uploaded, then 5 experiences
`createOrReplace`'d as **drafts** (`drafts.<uuid>`, no `publishedAt`,
`status: draft`, `visibility: private`). The placeholder `fcd561ad…` was repurposed
in place (UUID preserved). All held/private material listed in
[`EXPERIENCE_EVIDENCE_PLAN.md`](EXPERIENCE_EVIDENCE_PLAN.md).

| Date | Doc | Change | Draft/Published |
|------|-----|--------|-----------------|
| 2026-08-08 | 5 × `image-…` + 1 × `file-…-pdf` | Uploaded 5 evidence screenshots + WACMUN ICJ study-guide PDF (no PII) | assets |
| 2026-08-08 | `drafts.fcd561ad…` | Placeholder → **WACMUN 2024** (Deputy SG · ICJ Chair; leadership/past; IG evidence preview + ICJ PDF; scale metrics **held**) | **Draft** |
| 2026-08-08 | `drafts.5f35a12a…` | **DRMCMUNA — Academics** (ASG Academics; metrics 350+/8; FB evidence preview; study guides held) | **Draft** |
| 2026-08-08 | `drafts.1c685bfd…` | **DRMCMUNA — Presidency** (President; GS Ibtisam Mahe; FB evidence preview; relatedEntry → Academics) | **Draft** |
| 2026-08-08 | `drafts.3f96bf50…` | **Youth Affairs Forum** (Co-Founder; core team 11; IG preview + website + team link; relatedEntry → WACMUN) | **Draft** |
| 2026-08-08 | `drafts.bae83bb3…` | **IBA** (BBA Student; education/current; FB preview; relatedWork → GHOROA; **rank held out of text**) | **Draft** |
| 2026-08-08 | `siteSettings`, `4eb5c9c8…` (GHOROA) | **Untouched** (revs `ELYHRmWtP4iGWsbqfPisYe` / `G2blyWsrpd4FcYBaehS2Wa` unchanged) | Published (unchanged) |

**5I-C verification:** transaction committed; 5 experiences exist, **0 published**,
**0 Crimson**, GHOROA + siteSettings revs unchanged. Public perspective: all five
`/experience/[slug]` → **404**; `/story` shows 0 new experience annotations;
`/archive` shows 0 experience records; homepage GHOROA Featured Current Entry +
Selected Work still render (count 2). Metrics applied only where evidence supports
(Academics 350+/8, YAF 11); WACMUN/Presidency/IBA no metrics. IBA rank held out of
verifiedFacts/narrative (appears only inside the FB evidence-preview image, pending
wording approval). **Manual (needs Studio auth):** the Presentation *visual* of each
`/experience/[slug]` in Draft Mode (evidence images clickable → original posts;
citations; metrics; relations). Nothing published; nothing merged.

**Publication gates before any Experience can go public** (see the evidence plan for
the per-record detail): (a) confirm all approximate dateRanges; (b) decide the WACMUN
scale metrics (the 146-row application form does **not** support 239 delegates / 37
countries / 6 committees); (c) **approve the IBA rank wording** — "Merit 4th" is
currently image-only; (d) select which DRMCMUN study guides you authored (none
uploaded yet); (e) the ICJ PDF could not be render-verified here (Spotlight reports
79 pages vs the attachment tool's 14 — confirm it is the intended final file).

**Phase 5I-D (2026-08-08) — Experience index + global Index access (CODE / NAV only):**
No CMS documents were created, edited, published, or deleted. The five Experience
drafts are **byte-for-byte unchanged** and still draft / private / not published
(re-verified read-only: 0 published, 0 public, chronological order intact).

| File | Change |
|------|--------|
| `src/sanity/lib/queries.ts` | +`EXPERIENCE_INDEX_QUERY` (gated; `order(coalesce(dateRange.startDate, _createdAt) asc)`; landing fields only) +`ExperienceListItem` type. No existing query/type touched. |
| `src/app/(site)/experience/page.tsx` | **new** `/experience` register (Server Component; `archiveFetch` + gate + `SanityLive` + Draft-Mode block; `EmptyNote` honest empty state; Static `○`). |
| `src/components/site-index.tsx` | +`{ label: 'Experience', href: '/experience', count: counts?.experiences }` after Work. No overlay/focus/scroll/keyboard behaviour changed. |
| `src/components/site-footer.tsx` | +`{ href: '/experience', label: 'Experience' }` after Work (no-JS footer Index parity). |
| `src/app/(site)/story/page.tsx` | + restrained `All experience →` link at the foot of the annotations cluster (only when experiences resolve). **`longBio` prose untouched.** |
| docs | handoff §12/§16a/§16c/§18, guide §4, this file. |

**5I-D verification:** `tsc`=0, `eslint`=0, `next build`=success (`/experience`
Static `○`, `/experience/[slug]` still Dynamic `ƒ`, `/story` still Static). Public
(dev): `/experience` **200** honest empty state (0 console errors); `/experience/
nonexistent` **and** `/experience/wacmun-2024` (a real draft slug) → **404** (no
leak); `/`, `/story`, `/archive`, `/work`, `/work/ghoroa-nourish-proposal`, `/now`,
`/notes`, `/field-notes`, `/contact` all **200**; no draft-experience titles on
`/story` or `/archive`; the Story `All experience →` link correctly **hidden**
publicly (0 public experiences); homepage **GHOROA Featured Current Entry + Selected
Work intact**. **Index:** the hydrated overlay and the server-rendered footer both
list **Experience → /experience** in order Home · Story · Work · Experience · Now ·
Notes · Field Notes · Archive · Contact. **Preview data-layer** (`EXPERIENCE_INDEX_
QUERY` with `$preview=true`, read-only): returns the **five in chronological order**
(Academics → WACMUN → YAF → Presidency → IBA); public returns **0**. No horizontal
overflow at 375 / 768 / desktop; one `h1` on `/experience`. **Manual (needs Adi's
Studio auth):** the Draft-Mode *visual* of `/experience` (five rows, click-through to
each `/experience/[slug]`, click-to-edit) — the verification pane cannot authenticate
Presentation, and its rAF clock is suspended (`visibilityState: hidden`), so the
overlay open-animation and Draft-Mode render are the two things left to eyeball.
Nothing published; nothing merged.

**Phase 5I-E (2026-08-08) — final Experience evidence cleanup (CONTENT WRITE):**
Authorized CMS content-correction via the authenticated CLI user session
(`sanity exec --with-user-token`, raw perspective, `ifRevisionID` guards on both
docs from `ELYHRmWtP4iGWsbqfPuZbB`; guard also asserted draft/private + 0 published
before writing). Four study-guide PDFs uploaded; two docs patched. **No document
published; the read-only `.env.local` token is unchanged; Site Settings, GHOROA,
Story, homepage, capabilities, current updates, and all Work docs untouched.**

| Date | Doc | Change | Draft/Published |
|------|-----|--------|-----------------|
| 2026-08-08 | 4 × `file-…-pdf` | Uploaded DISEC (`0bae243d…`, 27.5 MB), NATO (`c2a3dde4…`, 19.1 MB), US Cabinet (`76857326…`, 9.1 MB), USSR Cabinet (`598cc857…`, 18.2 MB) — all PII-clean | assets |
| 2026-08-08 | `drafts.5f35a12a…` (Academics) | `set evidenceFiles` = [DISEC, NATO, US Cabinet, USSR Cabinet] (order intentional); metrics/preview/facts/narrative untouched | **Draft** — rev `ELYHRmWtP4iGWsbqfPuZbB` → `G2blyWsrpd4FcYBaeiER8d` |
| 2026-08-08 | `drafts.fcd561ad…` (WACMUN) | `set metrics` = [Applications 146 (note), Committees offered 5 (note)]; ICJ evidenceFile + preview + facts + summary preserved | **Draft** — rev `ELYHRmWtP4iGWsbqfPuZbB` → `G2blyWsrpd4FcYBaeiERFM` |
| 2026-08-08 | Academics metrics · IBA · YAF · Presidency | **Preserved** (350+/8 kept; IBA no rank/metric; YAF 11 + no country count; Presidency unchanged) | Draft (rev unchanged where untouched) |

**Inspection (5I-E):** ICJ guide **79 pages** (PyMuPDF = pypdf = Spotlight agree; earlier "14" was the attachment tool), all 79 text-readable, opens, no PII. Four DRMCMUN guides: page counts agree across two libraries (DISEC 46 · NATO 35 · US Cabinet 24 · USSR Cabinet 21), **no email/phone/ID PII**, empty author metadata → uploaded as-is (no scrub needed). Provenance: DISEC & NATO name DRMCMUN 2024 internally; US/USSR Cabinet identified by filename + folder + committee match (US-Soviet Crisis Cabinet JCC). WACMUN registration re-verified: **146 submissions**, **5 committee options** (col E); country columns are representation preferences → no Countries metric.

**5I-E verification (post-write, read-only):** Academics — exactly **4 evidenceFiles** in order, correct titles/descriptions, byte-exact assets, metrics 350+/8, FB preview + facts + narrative intact. WACMUN — metrics **Applications 146 / Committees offered 5**, **no 239/37/6**, no Countries metric, **ICJ preserved**, IG preview + restrained summary/facts intact. IBA/YAF/Presidency **rev unchanged**. All five **draft/private/no publishedAt; 0 published**. **Preview** detail projection (`$preview=true`) renders both edited pages with the new evidence/metrics; **public** projection returns `null` (404). Dates render **month-level** (no false day precision) → no code change (§9). All 5 asset URLs downloadable (200, byte-exact, `application/pdf`). Public: `/experience` 200 empty, `/story`/`/archive` no experience leak, all five slugs **404**, GHOROA unchanged. **Manual (Adi's Studio auth):** the Draft-Mode Presentation *visual* of the two edited detail pages (four guides open/download; 146/5 labelled correctly). Nothing published; nothing merged.

**Phase 5I-F (2026-08-08) — coarse editorial Experience dates (CODE only):**
No CMS mutations; stored `dateRange` values are byte-for-byte unchanged. Added
`formatExperiencePeriod` and pointed the four Experience date surfaces at it.

| File | Change |
|------|--------|
| `src/lib/entry-meta.ts` | **new** `formatExperiencePeriod(range)` — coarse editorial years (`2023–2024` / `Jun 2024` / `2024` / `2025–present`); en dash, no spaces; single-month events collapse to `Mon YYYY` (fixes WACMUN "Jun 2024 — Jun 2024"). `formatDateRange` untouched. |
| `src/app/(site)/experience/page.tsx` | register row meta: `formatDateRange` → `formatExperiencePeriod`. |
| `src/app/(site)/experience/[slug]/page.tsx` | detail meta: `formatDateRange` → `formatExperiencePeriod`; dropped redundant `yearOf` segment (+import). |
| `src/app/(site)/story/page.tsx` | annotation meta: `formatDateRange` → `formatExperiencePeriod`. |
| `src/components/featured-entry.tsx` | Experience (`X`) branch only: `formatDateRange` → `formatExperiencePeriod`, dropped redundant `yearOf`; **`W`/`U` branches untouched**. |
| docs | handoff §16c, guide §4, evidence plan, this file. |

**5I-F verification:** `formatExperiencePeriod` output matches all five targets +
edge cases (same-year-multi-month → year; ongoing-with-end → `…–present`; null →
null). `tsc`=0, `eslint`=0, `next build`=success (routes unchanged; `/experience`
Static, `/experience/[slug]` Dynamic). **Regression:** GHOROA (Work) still renders
`W · 2026 · Finance & Strategy · Jul 2026 — Jul 2026 · Demonstrated` on homepage +
`/work` (month precision preserved); all public routes 200; `/experience` 200 empty;
`/experience/nonexistent` **and** `/experience/wacmun-2024` → 404; no new console/
server errors (only the pre-existing Studio styled-components warning + benign
SanityLive dev reconnect). Experiences stay draft/private, so the coarse dates are
proven at the formatter/data layer; the Draft-Mode *visual* of the five rows is the
one manual check (needs Adi's Studio auth). Nothing published; nothing merged.

**Note (out of scope):** GHOROA (a Work item) still shows the redundant
"Jul 2026 — Jul 2026" because the single-month collapse is Experience-only by design;
applying it to Work would be a separate, later decision.
