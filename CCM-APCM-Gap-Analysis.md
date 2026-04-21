# HANA × CCM / APCM — Gap Analysis & Build Plan

**Audience:** Matteo (HANA Health, CEO)
**Date:** 2026-04-21
**Scope:** Full audit of the HANA frontend against CMS Medicare CCM and APCM billing rules.
**Sources analysed:** HQIN CCM Toolkit (28 pp), CMS Connected Care CCM Toolkit (15 pp), CircleLink CCM Implementation Guide (8 pp), NACHC APCM Reimbursement Tip Sheet (9 pp), PQA APCM Guide Book (10 pp).
**Method:** Cross-walked every CCM / APCM billing, consent, documentation and care-plan requirement against the current HANA codebase (types, data, components, routes).

---

## 0. TL;DR — the one-paragraph version

HANA today is a **Behavioral Health Integration (BHI) product dressed up as a Chronic Care Management product**. The core billing engine only models two CPT codes — **99484** (BHI) and **99490** (CCM non-complex) — the patient panel is heavily weighted to F-code mental-health diagnoses, every provider in `src/data/providerData.ts` is a psychiatrist / psychologist / therapist / counselor, and the EHR integration stub (`EHRIntegration.tsx`) offers **E&M + psychotherapy codes**, not CCM add-ons. The *good news* is that HANA has already built the hardest, most defensible parts of a CCM/APCM product: voice-AI between-visit patient contact, time tracking per action with categories, a full audit log, task modules, consent-document scaffolding and monthly review tasks. To credibly sell into CCM or APCM you need to: (1) expand the CPT universe, (2) ship a first-class *consent capture* UI, (3) ship a 9-element *comprehensive care plan*, (4) add PCP provider types and diverse chronic-disease patients, (5) add APCM's three complexity levels with QMB handling, and (6) reposition the product as *"the between-visit engine for CCM/APCM practices"*. None of this is a rewrite — it is ~8 concrete features, all additive.

---

## 1. What HANA is today vs. what CCM/APCM requires

### 1.1 The billing engine is BHI-first, not CCM-first

`src/components/layout/sidebar/care-tasks/careTasksData.ts` is the ground truth for what HANA can currently bill:

```ts
export const cptCodeInfo: Record<string, CptCodeInfo> = {
  '99490': { ... rateInfo: 'Medicare: ~$42/month' },
  '99484': { ... rateInfo: 'Medicare: ~$48/month' },
};
export const totalRequiredMinutes = { '99490': 20, '99484': 20 };
export const completedMinutes      = { '99490': 8,  '99484': 5  };
```

Two codes. That is the entire billing universe. Everything else — the breakdown chart, the countdown-to-20-minutes badge, the "ready for billing" logic in `BillingSafeguard` — is hard-wired to these two codes.

### 1.2 The patient panel is a mental-health clinic

`src/data/patientsData.ts` contains 49 patients; the diagnoses are dominated by F-code mental-health codes (depression, anxiety, PTSD, bipolar). The only patient with a physical chronic condition is P100592 (hypertension *and* depression). CCM requires **two or more chronic conditions expected to last ≥ 12 months**, drawn from a very wide ICD-10 list (heart disease, COPD, diabetes, CKD, dementia, cancer, etc.). Today HANA's demo data would fail a CCM audit.

### 1.3 Providers are not PCPs

`src/data/providerData.ts` contains only Psychiatrist / Psychologist / LCSW / LMFT-style providers. CCM and APCM can *only* be billed by "the physician or other qualified health care professional" who furnishes the patient's **primary care** — typically an MD/DO/NP/PA/CNS/CNM acting as PCP. APCM explicitly requires an **initiating visit** (AWV, IPPE, E&M or TCM) performed by that same practitioner. There is no PCP archetype in the code.

### 1.4 The EHR integration is E&M + psych, not CCM

`src/components/care-task/call-integration/EHRIntegration.tsx` exposes `availableCptCodes` that currently contain 99213/99214/90834/90837/99401/96116 — in-person E&M and psychotherapy codes. No CCM add-ons, no APCM G-codes.

### 1.5 Tasks in `populationTasksData.ts` reinforce the BHI frame

Of the 9 seeded tasks, the mental-health tasks (`T-1001`, `T-2001`, `T-3001`, `T-4001`) drive the 99484 bucket; the physical tasks (`T-1002` BP, `T-1003` med adherence, `T-1004` exercise) drive 99490. The Monthly CCM Review tasks (`T-MSR-001`, `T-MSR-002`) exist — which is great — but they are the only concession to CCM as a *program* rather than a per-task billing event.

### 1.6 What this means

HANA is an excellent BHI product. As a CCM or APCM product it has the *scaffolding* but not yet the *surface area*. That is a fixable, additive problem, not a pivot.

---

## 2. What HANA already has that aligns (don't rebuild these)

These are the pieces that make HANA credible in a CCM/APCM pitch right now:

- **Time tracking with categories.** `src/types/billingBreakdown.ts` already models `BillingAction { timeSpent, category: 'documentation' | 'patient-contact' | 'care-planning' | 'coordination' | 'administrative', taskId, timestamp }`. This is *exactly* the shape CCM auditors expect, and it already supports the non-complex 20-minute threshold. CCM auditors want to see minute-by-minute attribution — HANA already has it.
- **Audit log with actor typing.** `AuditLogEntry.actorType: 'AI' | 'Staff' | 'System' | 'Patient'` in `src/types/enhancedTask.ts` is the single most useful object for defending a CCM/APCM claim against an audit. Most EHR-native CCM products don't distinguish AI from staff; HANA does.
- **Care plan lifecycle types.** `CarePlanAction = 'created' | 'revised' | 'reviewed'` in `src/types/taskOutcome.ts` already mirrors CCM's "established / implemented / revised / monitored" language from the HQIN toolkit. Rename/extend, don't replace.
- **Clinical note structure.** `ClinicalNote` in `billingBreakdown.ts` has `stabilityAssessment`, `functionalStatus`, `riskFactors`, `interventions`, `followUpPlan`, `medicationReview`, `careCoordination`. This is already a near-perfect match for the CCM monthly note template. Keep it, rename `stabilityAssessment` → `chronicConditionStatus` to de-bias from BHI.
- **Consent document scaffolding.** `IntakeDocument { type: 'consent' | 'insurance' | 'medical-history' | 'other', status: 'missing' | 'pending' | 'completed' | 'expired' }` in `enhancedTask.ts`. A real consent capture UI doesn't exist yet, but the *type* is there.
- **Monthly review task type.** `'Monthly CCM Review'` tasks already exist in `populationTasksData.ts` (`T-MSR-001`, `T-MSR-002`) — generated by `'Scheduled Review'` at month start. The loop is there; we just need to tie it to a billing-ready workflow.
- **Campaign + script engine.** `src/data/campaignData.ts` has `ccmCampaignData` with `billingInfo: { cptCode: '99490', reimbursementRate: 62.15 }` and a real `CampaignScript`. The outbound-calling engine is already CCM-aware.
- **Voice-AI between-visit contact is *the* CCM moat.** CMS's CCM rules are written for a world in which calls and messages between visits are hard to do profitably at scale. Voice AI collapses that cost to near-zero. This is the product.

Translation: HANA has done the expensive parts. What's left is paperwork UI, an expanded code catalogue, and demo data that looks like a primary-care panel.

---

## 3. Critical CCM gaps (must-fix to bill CCM credibly)

Ordered by blast radius (audit risk × sales impact).

### 3.1 Expand the CPT code catalogue beyond 99490 / 99484

**Where:** `src/components/layout/sidebar/care-tasks/careTasksData.ts`, `src/data/campaignData.ts`, `EHRIntegration.tsx`.
**Add:**
- **99439** — CCM add-on, each additional 20 min (~$38). Lets HANA capture value when a patient goes over 40 / 60 minutes.
- **99491** — CCM provided personally by physician/QHP, 30 min (~$84). Matters because QHP time is more valuable and today HANA aggregates everything into clinical-staff time.
- **99487** — *Complex* CCM, 60 min (~$92). For the 30–50 % of CCM patients with moderate-high complexity.
- **99489** — Complex CCM add-on, +30 min (~$45).
- **G0506** — Comprehensive assessment / care planning (one-time, initiating visit add-on).
- **G0511** — FQHC/RHC CCM (*being retired July 2025 for general CCM; still valid for BHI/psychiatric CoCM in FQHCs until replaced by G0323 et al*). Only needed if selling to FQHCs.

### 3.2 Ship a real consent capture UI

**Status:** type exists (`IntakeDocument`), UI does not.
**Why it matters:** Missing or invalid consent is the single fastest way to lose a CCM audit and claw back 12 months of billing.
**What's required in the UI:**

1. Capture that patient was informed CCM services are available.
2. Record whether consent was **verbal or written** (both valid under current CMS rules — verbal must be documented).
3. Document that only **one practitioner** can furnish and bill CCM per calendar month.
4. Document the patient's right to **stop services at any time**, effective end of calendar month.
5. Disclose **applicable cost-sharing** (Part B deductible + 20 % coinsurance, or waived if QMB).
6. Date, signer, and link to the E&M / AWV / IPPE initiating visit.

This should live as a new component under `src/pages/patient/consent/` and surface on the Patient detail page as a red banner if missing.

### 3.3 Ship the 9-element comprehensive care plan

**Status:** missing. `CarePlanUpdate { summary, updatedAt, updatedBy, action }` is a single free-text blob; that won't pass a CCM audit.
**What's required:**
1. Problem list (ICD-10, linked to the qualifying chronic conditions).
2. Expected outcomes / prognosis.
3. Measurable treatment goals (SMART).
4. Symptom management.
5. Planned interventions and who is responsible.
6. Medication management (reconciliation, adherence, side-effect monitoring).
7. Community/social services the patient is connected to.
8. Care coordination with other providers (specialists, hospital, home health).
9. Requirement for periodic review (document who reviewed, when, and whether revised).

**Where:** new `src/pages/patient/care-plan/` page, replacing the single-string `CarePlanUpdate`. Keep the action lifecycle (`created/revised/reviewed`) but attach it to a *structured* plan object.

### 3.4 24/7 access messaging and triage

**Why it matters:** CCM explicitly requires 24/7 access to a care team member who can address urgent needs. APCM requires the same plus same-day/next-day appointment access.
**What to add:** a visible "24/7 care line" surface on the patient detail page + a triage decision tree (CircleLink's implementation guide leans on Schmitt-Thompson telephone-triage protocols — worth licensing or replicating).
**Product angle:** voice AI is *perfect* for the 24/7 requirement. Hana taking a 2 am call is cheaper and more consistent than a human triage nurse.

### 3.5 PCP provider archetypes + diverse chronic patient panel

**Where:** `src/data/providerData.ts`, `src/data/patientsData.ts`.
**Do:**
- Add MD/DO/NP/PA primary-care providers to the demo data.
- Reshape the demo patient panel so ≥ 60 % of patients have two or more non-psychiatric chronic conditions (hypertension, diabetes, CHF, COPD, CKD, dementia, cancer survivorship, atrial fibrillation, osteoarthritis). Keep BHI patients as a subset.
- Add explicit fields to `Patient`: `enrolledInCCM`, `enrolledInAPCM`, `dateEnrolled`, `dateTerminated`, `lastCarePlanReviewedAt`, `billingProvider` (FK to provider who owns the CCM claim).

### 3.6 Initiating-visit tracking (AWV / IPPE / E&M / TCM)

**Why:** APCM explicitly requires an initiating visit by the billing practitioner within the preceding 3 years. CCM has the same soft requirement — CMS expects the practitioner to have seen the patient face-to-face recently.
**What to add:** a field on `Patient` — `initiatingVisit: { type: 'AWV' | 'IPPE' | 'E&M' | 'TCM', date: string, providerId: string }` — and a visible "Initiating visit on file" state in the Patient header. Block CCM enrollment if missing.

### 3.7 Transitional Care 7-day follow-up

**Why:** APCM requires 7-day post-ED / post-hospital follow-up as part of care transitions. This is *exactly* a voice-AI use case.
**What to add:** task type `Transitional Care Follow-up`, auto-generated when an external signal (for now, mocked) indicates an ED visit or inpatient discharge. Due date = discharge + 7 days. Counts toward APCM performance metrics.

### 3.8 Billing-provider attribution and "only one practitioner per month" guard

**Why:** CMS will pay CCM to exactly one practitioner per patient per calendar month. Today nothing in HANA models or enforces this.
**What to add:** on `Patient`, a `ccmBillingProvider` field and a month-level lock. On the billing-ready view, show which practitioner is billing this month; warn if the patient is known to be CCM-enrolled elsewhere.

### 3.9 "Established, implemented, revised, monitored" care-plan states

Rename/extend `CarePlanAction = 'created' | 'revised' | 'reviewed'` → `'established' | 'implemented' | 'revised' | 'monitored' | 'reviewed'` to match the HQIN language. Auditors look for this wording.

### 3.10 CCM-ready clinical note template

Rename `ClinicalNote.stabilityAssessment` → `chronicConditionStatus` (or expose both). Add `careTransitions` and `patientSelfManagementSupport` fields. Make the note required before 99490/99439 billing submits.

---

## 4. Critical APCM gaps (must-fix to bill APCM)

APCM is the newer (2025-launched) CMS code family and is different in shape from CCM. It's **complexity-based, not time-based**. That is strategically *better* for HANA — you can stop fighting for 20-minute thresholds and instead demonstrate population-level complexity handling.

### 4.1 Add the three APCM G-codes and their complexity tiers

**Where:** extend `cptCodeInfo` in `careTasksData.ts`.

| Code | Tier | Who qualifies | 2025 payment |
|---|---|---|---|
| **G0556** | Level I | 1 or fewer chronic conditions | ~$16.37 |
| **G0557** | Level II | 2+ chronic conditions | ~$53.77 |
| **G0558** | Level III | QMB (dual-eligible Medicare + Medicaid) with 2+ chronic conditions | ~$117.23 |

Note: APCM is **not** time-based. You do *not* need to hit 20 / 60 min. You bill the level that matches the patient's complexity/eligibility.

### 4.2 Add 2026 APCM BHI add-on G-codes

New for CY 2026:

| Code | Description | Payment |
|---|---|---|
| **G0568** | Initial collaborative care (CoCM) add-on, per month | ~$161.66 |
| **G0569** | Subsequent CoCM add-on, per month | ~$145.96 |
| **G0570** | General BHI add-on, per month | ~$57.78 |

HANA's existing 99484 infrastructure ports directly to G0570. G0568/G0569 require a psychiatric consultant relationship — pitchable to the psych-forward providers already in the HANA panel.

### 4.3 QMB (Qualified Medicare Beneficiary) / dual-eligible workflow

**Why:** Level III APCM requires QMB status. QMB patients cannot be billed cost-sharing. Today HANA has no concept of dual-eligibility.
**What to add:** `Patient.coverage: { medicare: boolean, medicaid: boolean, qmb: boolean, planName?: string }`. Use it to (a) gate the Level III tier, (b) suppress cost-sharing messaging in consent, (c) flag claims for payer-specific rules.

### 4.4 Complexity-based tier UI

**Where:** new component `src/pages/patient/apcm-tier/`.
**Show:** which of Level I/II/III the patient falls into, the rationale (condition count + QMB), and the monthly reimbursement. Let care teams re-tier with audit trail when a new chronic condition is added.

### 4.5 APCM ↔ CCM mutual exclusion

**Why:** APCM cannot be billed in the same month as 99490/99439/99491/99487/99489, PCM (99424-99427), TCM (99495/99496), IPC, G2250-G2252, or e-visits.
**What to add:** a month-level "billing mode" per patient (`ccm | apcm | none`) with hard UI guards preventing both from being submitted in the same month. This is the single biggest revenue-protection feature you can ship.

### 4.6 Population-Level Management analytics

**Why:** APCM requires the practice to risk-stratify its panel and manage it as a population (not a queue of tasks). This is also the surface that sells APCM to ACO-participating practices.
**What to add:** a new page `src/pages/population/` with:
- Panel split by APCM level (I / II / III).
- Patients overdue for care-plan review.
- Patients without a recorded initiating visit.
- 7-day post-discharge follow-up completion rate.
- % of panel with consent on file.

### 4.7 Performance Measurement / MIPS / ACO hooks

**Why:** APCM requires the billing practitioner to report on an APCM-relevant MIPS MVP *or* participate in an ACO. Right now HANA has no measurement story.
**What to add (MVP):** an in-product "Performance Measurement" page that tracks CMS-relevant process measures (BP control, diabetes A1c screening, depression screening, med reconciliation post-discharge) from the data already captured in tasks. Doesn't need to be full MIPS; needs to demonstrate the practice can *defend* their APCM claim.

### 4.8 Community resources directory

**Why:** Both CCM and APCM require documented coordination with community/social services. Today there's no entity for this.
**What to add:** lightweight `CommunityResource { id, name, type, referralMethod, region }` plus a link from the care plan to referrals made. Can be mocked; just needs to be *visible*.

---

## 5. Sales & positioning — how to sell HANA into CCM/APCM practices

### 5.1 The one-sentence reposition

*"Hana is the voice-AI between-visit engine for CCM and APCM — we deliver the 20 minutes of monthly patient contact, the 24/7 access, and the 7-day post-discharge follow-up that CMS pays for, and we log every second in an audit-defensible trail."*

### 5.2 Why this lands

- **Economics.** Staff-run CCM costs $40–60/patient/month to deliver. Medicare pays ~$42 for 99490. Margins are thin to negative. Voice AI collapses delivery cost and makes CCM profitable at panel scale.
- **Audit defensibility.** The `AuditLogEntry.actorType` + `BillingAction.timeSpent` combination already in the codebase is stronger than what most CCM-as-a-service vendors offer.
- **24/7 without a 24/7 team.** Voice AI is always on. Human nurse triage lines cost $15–25 per call. Hana brings this to near-zero marginal cost.
- **APCM upside.** APCM's complexity-based billing means higher reimbursement per touch for the same Hana call — especially Level III ($117.23/mo for dual-eligibles, a population everyone is trying to engage and few are succeeding with).
- **CoCM 2026 add-ons.** G0568/G0569/G0570 stack *on top* of APCM — Hana's existing BHI infrastructure ports directly and adds ~$58–162 per patient per month to the same contract.

### 5.3 Three concrete ICPs and how to lead with Hana

| ICP | Lead with | Proof point to show |
|---|---|---|
| Primary care group, 5–20 PCPs, already doing CCM in-house, losing money on it | "We deliver your 20 minutes for you and you keep the $42." | Time-tracking screen + audit log |
| ACO / value-based primary care org looking at APCM | "We handle the 24/7 access, 7-day TCM, and population-management requirements at the scale APCM needs." | Population page + performance measures |
| FQHC / RHC running CoCM + CCM | "G0570 / G0568 2026 add-ons stack on APCM. Our BHI infrastructure is already built." | BHI task types + monthly stability review |

### 5.4 Things to *remove* from the pitch

- Do not lead with "mental health" when pitching CCM practices. The product panel today reads as a psych clinic — fix the demo data before the first live demo.
- Do not claim CCM billing support today. Claim *"CCM-aligned architecture, ships in Q[X]"* until §3.1, §3.2, §3.3 are done.

---

## 6. Prioritized feature backlog

Effort = S (≤2 days) / M (3-7 days) / L (>1 week). Impact = revenue / audit-risk weight.

### P0 — Ship before the next CCM/APCM sales call

1. **[S] Expand CPT catalogue** — add 99439 / 99491 / 99487 / 99489 / G0506 / G0556 / G0557 / G0558 to `careTasksData.ts` and to `EHRIntegration.tsx`. *Impact: unlocks entire pitch.*
2. **[S] Diverse chronic patient panel** — edit `src/data/patientsData.ts` so ≥ 60 % of patients have 2+ non-psychiatric chronic conditions. *Impact: demo credibility.*
3. **[S] Add PCP provider archetypes** to `src/data/providerData.ts`. *Impact: demo credibility.*
4. **[M] Consent capture UI** — new `src/pages/patient/consent/` with the 5 required consent elements (§3.2). *Impact: audit-critical, sales-critical.*
5. **[M] APCM ↔ CCM mutual-exclusion guard** — `Patient.monthBillingMode: 'ccm' | 'apcm' | 'none'` with hard UI block. *Impact: stops double-billing on day one.*

### P1 — Ship in the next sprint

6. **[L] 9-element comprehensive care plan** — replace `CarePlanUpdate.summary` with a structured care plan and a dedicated page. *Impact: core CCM/APCM requirement.*
7. **[M] APCM complexity tier UI** — new page showing Level I/II/III with QMB detection. *Impact: core APCM requirement.*
8. **[M] QMB / dual-eligible coverage fields** on `Patient` (+ used by tier and consent). *Impact: unlocks Level III pricing.*
9. **[M] Initiating-visit tracking** — `Patient.initiatingVisit` + a header badge; block CCM/APCM enrollment if missing. *Impact: audit-critical.*
10. **[S] Rename `stabilityAssessment` → `chronicConditionStatus`** in `ClinicalNote` (keep backward-compatible). Add `careTransitions` and `patientSelfManagementSupport`. *Impact: removes BHI bias from audit artifacts.*
11. **[S] Extend `CarePlanAction`** to include `'established' | 'implemented' | 'monitored'` to match HQIN language. *Impact: auditor-friendly wording.*

### P2 — Strategic differentiation

12. **[L] Population management page** — panel view split by APCM tier, overdue reviews, missing consent, 7-day TCM rate. *Impact: APCM table stakes, differentiator vs. task-queue competitors.*
13. **[L] 7-day post-discharge follow-up task type** — auto-generates on (mocked) discharge signal; due date = discharge + 7 days; counts toward APCM perf measures. *Impact: APCM requirement + demo-worthy voice-AI use case.*
14. **[M] 24/7 access surface** — patient-facing "we're always here" language + triage decision flow based on Schmitt-Thompson. *Impact: required disclosure + differentiator.*
15. **[M] G0568 / G0569 / G0570 2026 add-on codes** wired into `cptCodeInfo`. *Impact: upsell path on every APCM account.*
16. **[L] Performance measurement / MIPS-lite page** — 4-6 core measures tracked from existing task data. *Impact: required for APCM billing practitioner.*

### P3 — Nice-to-have

17. **[S] Community resources directory** (mocked). *Impact: care-plan completeness.*
18. **[S] Billing-provider attribution on `Patient`** with "only one practitioner per month" warning. *Impact: claims hygiene.*
19. **[S] CCM-enrolled-elsewhere conflict detection.** *Impact: prevents denials.*

---

## 7. Specific file references (where each gap lives)

| File | What's there today | What to change |
|---|---|---|
| `src/components/layout/sidebar/care-tasks/careTasksData.ts` | `cptCodeInfo` with only 99490, 99484 | Add all codes listed in §3.1 and §4.1–4.2 |
| `src/components/care-task/call-integration/EHRIntegration.tsx` | `availableCptCodes` has E&M + psych codes | Add CCM/APCM codes so they flow to the EHR |
| `src/types/enhancedTask.ts` | `IntakeDocument.type: 'consent' \| ...` | Add UI + capture flow; extend with CCM-specific fields |
| `src/types/taskOutcome.ts` | `CarePlanUpdate` is a free-text `summary` | Replace with 9-element structured plan |
| `src/types/taskOutcome.ts` | `CarePlanAction = 'created' \| 'revised' \| 'reviewed'` | Add `'established'`, `'implemented'`, `'monitored'` |
| `src/types/billingBreakdown.ts` | `ClinicalNote.stabilityAssessment` | Rename/add `chronicConditionStatus`; add `careTransitions` |
| `src/data/patientsData.ts` | Heavily F-code (mental health) skewed | Rebalance to ≥60% non-psychiatric chronic |
| `src/data/patientsData.ts` | No `enrolledInCCM` / `enrolledInAPCM` / `coverage.qmb` / `initiatingVisit` | Add these fields |
| `src/data/providerData.ts` | Psychiatrists / therapists only | Add MD/DO/NP/PA PCPs |
| `src/data/populationTasksData.ts` | 9 tasks, 2 × `Monthly CCM Review` | Add `Transitional Care Follow-up` task type |
| `src/data/campaignData.ts` | `ccmCampaignData` exists, good | Add APCM equivalents at each tier |
| `src/data/billingBreakdownData.ts` | Single `mockPatientBillingBreakdown` under 99484 | Add CCM and APCM variants |
| (new) `src/pages/patient/consent/` | Does not exist | Build consent capture flow per §3.2 |
| (new) `src/pages/patient/care-plan/` | Does not exist | Build 9-element plan per §3.3 |
| (new) `src/pages/patient/apcm-tier/` | Does not exist | Build tier UI per §4.4 |
| (new) `src/pages/population/` | Does not exist | Build population management per §4.6 |
| (new) `src/pages/performance/` | Does not exist | Build MIPS-lite per §4.7 |

---

## 8. Audit-risk summary

If HANA's current frontend were taken at face value by a RAC (Recovery Audit Contractor), the *most likely* denials would be:

1. **No consent on file.** Highest-frequency CCM denial. §3.2 fixes this.
2. **No comprehensive care plan meeting all 9 elements.** Second-highest. §3.3 fixes this.
3. **No documented initiating visit.** §3.6 fixes this.
4. **Provider type doesn't support CCM billing.** (Psychotherapists/psychologists can't bill 99490.) §3.5 fixes this.
5. **Double-billing CCM + APCM in same month.** §4.5 fixes this.

Fixing P0–P1 (items 1-11 above) takes the audit risk from "almost certain clawback" to "defensible". That is the minimum bar to put CCM/APCM in the pitch deck.

---

## 9. Recommendation

Treat CCM/APCM as an **additive surface** on top of the existing BHI product, not a pivot. Ship P0 in one sprint to make the demo credible. Ship P1 in the next sprint to make the claim "CCM/APCM-ready architecture" true. P2 is where HANA can credibly outcompete EHR-native CCM modules, because voice AI + audit-grade logging + population-level automation is a wedge the incumbents cannot match quickly.

The strategic prize is APCM — complexity-based, not time-based, with Level III ($117/mo) and 2026 BHI add-ons stacking to ~$275/patient/month for the right panel. Getting there only requires the 19 items above.
