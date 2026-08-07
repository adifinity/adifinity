# Experience Evidence Plan — the authoritative Experience tracker

_Created Phase 5I-C (2026-08-08). Tracks the five real Experience drafts, their
evidence, held claims, and publication gates. All five are **draft / private —
not published.**_

**Rules:** [`CONTENT_POPULATION_GUIDE.md`](CONTENT_POPULATION_GUIDE.md) §4 ·
[`MARGINALIA_DESIGN_HANDOFF.md`](MARGINALIA_DESIGN_HANDOFF.md) §16a/§16b.

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
- **Linked visual evidence:** Deputy SG post (IG, above). **Evidence file:** ICJ Study Guide PDF (`file-0d5b…-pdf`; no PII; MS-Word-generated).
- **Public links:** Official Instagram `@wacmun24`.
- **Held claims:** ⚠️ **239 delegates / 37 countries / 6 committees — NOT populated.** The WACMUN registration is a **146-row application form** offering **5 committees** (CSW, ECOSOC, ICJ, UNGA, UNHRC); its "country" column is a free-text *representation preference* (111 noisy values), not delegate nationalities. Metrics left empty (§9). **Need:** the final conference figures from an authoritative source if you want these surfaced.
- **Publication gates:** confirm exact dates OK; decide on the missing scale metrics; confirm ICJ PDF is the correct/final version (I could not render its pages here — Spotlight reports 79 pages vs the 14 the attachment tool reported).

### DRMCMUNA — Academics — `5f35a12a-…`
- **Verified & populated:** roleTitle (Junior Rep · ASG Academics), organisation, `Dhaka, Bangladesh`. **Metrics: Delegates 350+ · Committees 8** — supported: the DRMCMUN registration has **488 rows** across **8 distinct committees** (SOCHUM, DISEC, UNSC, HWHO, NATO, IP, National Parliament/জাতীয় সংসদ, US-Soviet Crisis Cabinet).
- **Linked visual evidence:** ASG Academics post (FB, above).
- **Public links:** Official Facebook + Instagram.
- **User-confirmed / narrative only (Level B):** "wrote roughly half of the study guides" — kept in narrative, **not** in verifiedFacts (the 9 study-guide PDFs carry no per-author attribution). Flooded-auditorium anecdote + Palestinian-Ambassador — narrative, restrained.
- **Held / not uploaded:** the **9 DRMCMUN 2024 study guides** (DISEC, US Cabinet, EU, IP, UNSC, Historical WHO, USSR Cabinet, NATO, Interim Government) — held pending **your selection of the ones you actually authored** (recommend 2–3 as `evidenceFiles`; the study-guide count is 9, not the "8" committees). **Do not** upload the DRMCMUN registration sheet (participant PII).
- **Publication gates:** exact dates (encoded `2023-09-01 → 2024-11-30`, approximate — confirm); pick representative study guides.

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
- **Linked visual evidence:** IBA Merit-4th post (FB, above).
- **⚠️ HELD claim — the rank:** "Merit 4th" appears **only inside the evidence-preview image**; it is **not** in verifiedFacts or narrative. **"11,147 candidates" appears nowhere** (no source shows it). **Publication gate (needs your approval, §13/§E):** whether to state the rank in text, and the exact wording. Proposed if approved: _"…after a focused preparation, admitted to IBA's BBA 34th batch on the fourth merit position."_ **Do not publish the rank without your sign-off.**
- **Publication gates:** rank wording approval; exact IBA start month (encoded Jan 2025 — confirm).

## Cross-cutting held / private
- **Registration spreadsheets** (WACMUN 146 rows; DRMCMUN 488 rows) — **private verification sources only; never uploaded** (participant emails/phones/IDs).
- **EC formation document** — private (other students' data).
- **DRMCMUN study guides (9)** — held pending your authored-selection.
- **Crimson Education** — deliberately **not** an Experience (Story/CV per 5I-A).

## Global publication gate
All five are **draft / private**. Before any publish: teammate/co-founder name-display consent (Prisha Ahuja & Govind Khetpal already consented per your source; Ibtisam Mahe named factually from the official EC doc), date confirmations, the WACMUN scale metrics decision, the study-guide selection, and the **IBA rank wording approval**.
