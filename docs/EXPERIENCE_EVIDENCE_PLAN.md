# Experience Evidence Plan — the authoritative Experience tracker

_Created Phase 5I-C (2026-08-08). Tracks the five real Experience drafts, their
evidence, held claims, and publication gates. All five remain **draft / private —
not published.**_

**Rules:** [`CONTENT_POPULATION_GUIDE.md`](CONTENT_POPULATION_GUIDE.md) §4 ·
[`MARGINALIA_DESIGN_HANDOFF.md`](MARGINALIA_DESIGN_HANDOFF.md) §16a/§16b/§16c.

**Phase 5I-E (2026-08-08) — final evidence set locked (still not published):**
Academics gained **four representative study-guide `evidenceFiles`** (DISEC ·
NATO · US Cabinet · USSR Cabinet, in that order); WACMUN gained **source-grounded
metrics** (Applications 146 · Committees offered 5) with the ICJ guide confirmed
(79 pp) and kept; IBA's rank stays **visual-evidence only**; YAF & Presidency
unchanged. All uploads PII-clean. The next phase is **publication review**.

## Screenshot → original-post mapping (verified via post caption + OpenGraph image)

| Screenshot (file) | Experience | Original post URL | How matched |
|---|---|---|---|
| `ev_wacmun.png` (Deputy SG, green) | WACMUN 2024 | https://www.instagram.com/p/C6_243cvY4Y/ | IG caption "WACMUN'24 … Raiyan Sadi Aditya / Deputy Secretary General" + OG image identical |
| `ev_yaf.png` (Co-Founder, red) | Youth Affairs Forum | https://www.instagram.com/p/C-SdcCdy2HR/ | IG caption "Youth Affairs Forum … Meet our Co-Founder, Adi!" + OG image identical |
| `ev_president.jpg` (President card) | DRMCMUNA — Presidency | https://www.facebook.com/share/p/19BAf274L6/ | FB post "establishment of the new executive committee … 2024-2025" (carousel incl. President card + the EC formation doc) |
| `ev_asg.jpg` (ASG Academics) | DRMCMUNA — Academics | https://www.facebook.com/share/p/19QjovQUQS/ | FB post "Presenting the Assistant Secretary Generals … DRMC MUN Conference 2024"; OG image = the ASG card |
| `ev_iba.jpg` (IBA Merit 4th) | Institute of Business Administration | https://www.facebook.com/share/p/1Jr7xzU5pX/ | FB post "#4 Aditya Raiyan…"; OG image identical |

All five matched confidently — **no pending mappings.**

## Per-Experience state

### WACMUN 2024 — `fcd561ad-…` (repurposed placeholder)
- **Verified & populated:** roleTitle (Deputy SG · ICJ Chair), organisation, `Online`, dateRange **15–16 Jun 2024** (from the WACMUN IG bio), founding trio (Prisha Ahuja SG / Govind Khetpal DG), ICJ committee (Russia–Ukraine).
- **Metrics (5I-E, source-grounded):** **Applications 146** (_"Submissions recorded in the supplied WACMUN 2024 registration form."_) · **Committees offered 5** (_"Committee options listed in the supplied registration form."_). **Re-verified 5I-E** against `WACMUN'24 registration .xlsx`: 147 rows incl. header → **146 submissions**; column E "committee first preference" has exactly **5** options (UNGA, CSW, ICJ, UNHRC, ECOSOC). Labelled **Applications**, never delegates/attendees/participants.
- **Rejected (unverified) — not present anywhere:** ⚠️ **239 delegates / 37 countries / 6 committees.** The registration is an *application form*, not an attendance roster; its "country first/second preference (please check countries on mymun)" columns are **representation preferences, not nationalities** → **no Countries metric** was created. Narrative/verifiedFacts/summary stay qualitatively restrained (international / online); audit-confirmed 5I-E that none of `239`/`37`/`6 committee` appears in the doc.
- **Linked visual evidence:** Deputy SG post (IG, above). **Evidence file:** ICJ Study Guide PDF (`file-0d5b…-pdf`) — **user-confirmed correct file (5I-E)**; **79 pages** (authoritative: PyMuPDF = pypdf = Spotlight all agree; the earlier "14" was the attachment tool being wrong), all 79 pages text-readable, opens cleanly, no email/phone/ID PII, empty author metadata. Kept as the single WACMUN evidenceFile.
- **Public links:** Official Instagram `@wacmun24`.
- **Publication gates:** confirm the approximate date framing (WACMUN itself is exact); metrics + ICJ file now **resolved**. **Do not** upload the registration spreadsheet (participant emails + full names).

### DRMCMUNA — Academics — `5f35a12a-…`
- **Verified & populated:** roleTitle (Junior Rep · ASG Academics), organisation, `Dhaka, Bangladesh`. **Metrics: Delegates 350+ · Committees 8** — supported: the DRMCMUN registration has **488 rows** across **8 distinct committees** (SOCHUM, DISEC, UNSC, HWHO, NATO, IP, National Parliament/জাতীয় সংসদ, US-Soviet Crisis Cabinet).
- **Linked visual evidence:** ASG Academics post (FB, above).
- **Public links:** Official Facebook + Instagram.
- **User-confirmed / narrative only (Level B):** "wrote roughly half of the study guides" — kept in narrative, **not** in verifiedFacts and **not** claimed in the evidence-file descriptions (the PDFs carry no per-author attribution; descriptions say "prepared for the … committee at DRMCMUN 2024", never "written entirely by Raiyan"). Flooded-auditorium anecdote + Palestinian-Ambassador — narrative, restrained.
- **Evidence files (5I-E — user-selected representative set, uploaded, in order):**
  1. **DISEC — Study Guide** (`file-0bae243d…-pdf`, 27.5 MB, 46 pp) — body internally references DRMCMUN 2024.
  2. **NATO — Study Guide** (`file-c2a3dde4…-pdf`, 19.1 MB, 35 pp) — EB message internally names "Dhaka Residential Model United Nations 2024".
  3. **US Cabinet — Study Guide** (`file-76857326…-pdf`, 9.1 MB, 24 pp) — topic: US Cabinet on the Vietnam War (1953–61).
  4. **USSR Cabinet — Study Guide** (`file-598cc857…-pdf`, 18.2 MB, 21 pp).
  All four: opened + page-counted with **two libraries in agreement**, **no email/phone/ID PII**, empty author metadata → uploaded as-is (no metadata scrub needed). Each is a **separate `fileDownload`** (no ZIP). ⚠️ **Provenance note:** DISEC & NATO self-identify as DRMCMUN 2024 internally; **US Cabinet & USSR Cabinet do not name the conference in-document** — they are identified by filename + the `Study Guides DRMCMUN 2024` folder + the committee match (the DRMCMUN 2024 registration's **US-Soviet Crisis Cabinet** JCC = these two sides). This is Adi's own authoritative selection.
- **Intentionally NOT surfaced:** the other five guides (UNSC, IP, Historical WHO, European Union, Interim Government) — present on disk, deliberately excluded from the public set. **Registration sheet never uploaded** (participant PII).
- **Publication gates:** exact dates (encoded `2023-09-01 → 2024-11-30`, approximate — confirm); evidence set now **resolved**.

### DRMCMUNA — Presidency — `1c685bfd-…`
- **Verified & populated:** President; **General Secretary Ibtisam Mahe** — both **confirmed by the official EC formation document** (President = Aditya Raiyan, GS = Ibtisam Mahe). Declined-SG / advisory framing in narrative.
- **Linked visual evidence:** President post (FB, above; the EC-announcement carousel).
- **Public links:** Official Facebook + Instagram. **Relation:** → DRMCMUNA — Academics.
- **Held / not uploaded:** the **EC formation document image** (`drmcmuna panel picture.jpg`) — contains other students' college numbers/class/shift → **private, not uploaded**. The cleaner President card is the public evidence. (If you later want the document public, it needs a redaction pass — see §D of the brief.)
- **Publication gates:** exact dates (`2024-09-01 → 2025-06-30`, approximate); superlatives about club size deliberately omitted.

### Youth Affairs Forum — `3f96bf50-…`
- **Verified & populated:** Co-Founder (Prisha Ahuja Founder; Govind Khetpal Co-Founder — audit-confirmed on the public team page), **Core team 11** (metric, team-page listed), **indefinite hiatus**. `Distributed / Online`. dateRange start `2024-07-01`, no end (hiatus → renders "Jul 2024").
- **Linked visual evidence:** Co-Founder post (IG, above). **Public links / website:** `youthaffairsforum.weebly.com` (websiteUrl) + Team page + Official Instagram. **Relation:** → WACMUN 2024.
- **Held:** country count — **not** populated (source conflict "6 countries" vs "6 excluding my own"); kept qualitative ("several countries"). Member names not individually listed (team page linked instead).
- **Publication gates:** confirm the hiatus/date framing; confirm you want the team linked rather than named.

### Institute of Business Administration — `bae83bb3-…`
- **Verified & populated:** BBA Student, University of Dhaka; type `education`, phase **`current`** (start `2025-01-01`, ongoing). **Relation:** → GHOROA (relatedWork).
- **Linked visual evidence:** IBA admission post (FB, above). Evidence-preview copy (5I-G): title **"IBA BBA 34th Batch Admission"**, caption "Official DRMCMUNA announcement marking my admission to the Institute of Business Administration, University of Dhaka.", alt "Official DRMCMUNA congratulatory graphic for Raiyan Sadi Aditya's admission to the IBA BBA 34th batch.", credit/source "DRMC Model United Nations Association". The screenshot (which visibly shows the historical announcement) + the Facebook URL are unchanged.
- **Rank — FINAL (5I-E decision, 5I-G copy cleanup):** the rank number lives **only inside the screenshot image**; it appears in **no** rendered text — not summary, narrativeBody, verifiedFacts, metrics, **title, caption, or alt** (5I-G removed the earlier "Merit 4th" wording from title/alt/caption). **"11,147" appears nowhere.** The record stays centred on entering IBA, the field change, business education, and direction toward finance & strategy — **not** an admission-results page. IBA has **no metrics**.
- **Publication gates:** exact IBA start month (encoded Jan 2025 — confirm). Rank question **closed**.

## Cross-cutting held / private
- **Registration spreadsheets** (WACMUN 146 rows; DRMCMUN 488 rows) — **private verification sources only; never uploaded** (participant emails/phones/IDs).
- **EC formation document** — private (other students' data).
- **DRMCMUN study guides — 4 of 9 now surfaced** (DISEC · NATO · US Cabinet · USSR Cabinet, per Adi's 5I-E selection); the other five (UNSC, IP, Historical WHO, European Union, Interim Government) intentionally not surfaced.
- **Crimson Education** — deliberately **not** an Experience (Story/CV per 5I-A).

## Publication status — PUBLISHED (2026-08-08)
All five Experience records are now **published / public** (transaction
`ELYHRmWtP4iGWsbqfPwcNZ`; drafts consumed). Dates render as coarse editorial years
(Academics `2023–2024` · WACMUN `Jun 2024` · YAF `2024` · Presidency `2024–2025` · IBA
`2025–present`); metrics, evidence files, evidence previews, and the register/detail/
Story/Archive surfaces all render publicly. Stored ISO dates unchanged.

**Both follow-ups now RESOLVED (Phase 5I-G, 2026-08-08):**
1. ✅ **Public cross-reference rail fixed** — added the gate fields (`status`, `visibility`,
   and `active`) to `EXPERIENCE_DETAIL_QUERY.relatedWork` and `RELATED_ENTRIES_PROJECTION`,
   matching `featuredWork`. Public now renders IBA→GHOROA (Related work),
   Presidency→Academics and YAF→WACMUN (In the margin). Gate unchanged → privacy preserved
   (draft/private targets still excluded; verified).
2. ✅ **IBA evidence-preview copy cleaned** — rank number removed from all rendered text
   (title/alt/caption); screenshot, Facebook URL, source, and platform preserved. See §
   IBA below. "Merit 4th"/"11,147" appear in **no** field of any Experience.
