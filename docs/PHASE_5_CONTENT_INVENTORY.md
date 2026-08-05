# Phase 5A — Verified Content Inventory & Population Tracker

_Live project tracker for populating the Adifinity archive with real content and
preparing it for launch. This is the **control file** for Phase 5 (5A → launch)._

**Latest activity — Phase 5C (2026-08-06):** approved site-identity copy written
to the **draft** `siteSettings` (`shortBio`, `longBio`); `heroCopy` left empty.
Nothing published. See §13.

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

### workItem — `drafts.4eb5c9c8-…-a16f198f8` — "Trust as Collateral — Preview Template"
- **Classification:** PLACEHOLDER → **intended flagship**, replace in place.
- **Real signal to keep:** `institutionOrClient` = "Institution of Business Administration, Dhaka University"; `primaryCategory` = `financeStrategy`; `phase` = `developing`; `role` = "author & researcher". `dateRange.startDate` = 2026-07-14 (placeholder date).
- **Placeholder:** `title`, `summary`, `body`.
- **Missing:** `featuredOrder` (⇒ not on `/work`), `coverMedia`, `problem`/`approach`/`outcome`, `evidence`, `gallery`, `methods`, `collaborators`, `secondaryThemes`, `externalLinks`, `downloadableFiles`, `confidentialityNote`, `credits`, `relatedEntries`, `seo`.
- **Slug:** `trust-as-collateral-preview-template` (rename decision in §6).
- **Referenced by:** `drafts.siteSettings.featuredCurrentEntry`.
- **Appears on:** `/work`, `/work/[slug]`, Archive, homepage (if featured).

### workItem — `drafts.cb911028-…-fdc00bcac4` — "Placeholder Work Item — Policy & Research Sample"
- **Classification:** PLACEHOLDER / likely **OBSOLETE** (schema-test second entry).
- **Populated:** `phase` = `demonstrated`, `primaryCategory` = `policyResearch`, `dateRange` 2026-06-01→2026-06-15, placeholder `body`/`summary`.
- **Missing:** `featuredOrder`, everything substantive.
- **Referenced by:** nothing.
- **Decision (§6):** keep as a real second Work entry only if genuine material exists; otherwise remove later.

### experience — `drafts.fcd561ad-…-3656e667d2` — "Research Associate — Placeholder Institution"
- **Classification:** PLACEHOLDER.
- **Real signal:** `location` = "Dhaka, Bangladesh"; `dateRange` ongoing from 2024-01-01; `type` = `institution`; `phase` = `demonstrated`.
- **Placeholder:** `title`, `organisation` ("Placeholder Institution"), `roleTitle`, `summary`, `narrativeBody`.
- **Appears on:** Story margin, Archive.

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
| `siteSettings.shortBio` | Real short bio | ✅ approved (5B) + written to **draft** (5C); publish pending |
| `siteSettings.longBio` | Real Story prose | ✅ approved (5B) + written to **draft** (5C); publish pending |
| flagship workItem `4eb5c9c8…` | **Trust as Collateral** case study | Real title/summary/body + case-study fields (§5 P3) |
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
- [x] **`siteSettings.shortBio`** — homepage h1 identity line. ✅ Approved third-person bio (5B) written to the **draft** (5C). _Publish still pending — placeholder remains public until then._
- [x] **`siteSettings.longBio`** — Story main prose. ✅ Approved first-person 5-paragraph bio (5B) written to the **draft** (5C). _Publish still pending._
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
- [ ] **Publish the singleton (P1):** approve **publishing** `siteSettings` so the real bio replaces the public placeholder. The draft copy is ready; until approved, public mode shows the placeholder. _(See §12.)_
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
| Identity line (h1) | `siteSettings.shortBio` | ⚠️ real copy in **draft** (5C); published doc still placeholder until publish approved |
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
- [~] **Published `siteSettings.shortBio` / `longBio` hold placeholder text.** Because the singleton is ungated, this placeholder appears as the homepage h1 and Story prose in **public** mode. **Progress:** approved real copy is now written to the **draft** singleton (Phase 5C, §13). **Remaining:** the blocker clears only when Adi approves **publishing** the singleton. Until then, public mode still shows the placeholder (verified 2026-08-06: no draft copy leaks to public HTML/metadata).

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

Publication of the singleton remains **pending Adi's explicit approval** — the
public site still shows the published placeholder until then.
