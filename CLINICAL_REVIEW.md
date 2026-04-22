# Clinical Review — Hana Compass CCM/APCM Dashboard

**Prepared by:** Matteo (Hana)
**Date:** April 2026
**Branch:** `feat/ccm-mvp-trim`
**Purpose:** Validate clinical accuracy of CCM/APCM workflows before backend integration.

This is a UI prototype with dummy data. No real patient data is used. Your job is to tell us if the clinical logic, terminology, and documentation flows are correct — not to evaluate the software itself.

---

## What was built

### 1. Patient enrollment — CCM vs APCM
Patients can be enrolled in either CCM or APCM, but not both in the same calendar month (CMS rule). The UI enforces this with a confirmation step when switching.

**CCM CPT codes implemented:** 99490 (20 min), 99439 (add-on), 99491 (physician direct, 30 min), 99487 (complex, 60 min), 99489 (complex add-on), G0506 (initiating visit)

**APCM CPT codes implemented:** G0556 (Level I), G0557 (Level II), G0558 (Level III), G0568–G0570 (add-ons)

### 2. Consent capture
A consent form documents that the patient was informed about CCM/APCM, agreed to participate, and understands their right to opt out. Records date, method (verbal/written/portal), and staff name.

### 3. Electronic care plan
An 11-element care plan aligned to CMS CCM requirements:
1. Patient goals & preferences
2. Chronic conditions & problem list (ICD-10 codes)
3. Medication list
4. Allergies & drug interactions
5. Planned interventions
6. Expected outcomes & prognosis
7. Principal CCM billing provider (name + NPI)
8. Coordination of care (all treating providers + communication method)
9. Preventive services due
10. Community & social resources
11. Crisis & emergency plan

Includes a "shared with patient and all treating providers" checkbox (CMS requirement) and revision history.

### 4. Monitoring task queue
Hana AI flags clinical concerns from calls as tasks for the care team to review. Each task shows:
- Why it was flagged
- A call summary (tone, topics, AI observations, key quotes)
- An encounter note for the clinician to complete

### 5. Encounter note (SOAP format)
When a clinician reviews a monitoring task, they complete a SOAP note:
- **S — Subjective:** patient-reported symptoms, mood, adherence
- **O — Objective:** vitals, validated scores (PHQ-9, GAD-7), medications
- **A — Assessment:** clinical interpretation, condition status, escalation rationale
- **P — Plan:**
  - Interventions performed this session
  - Coordination action taken (who was contacted, what was communicated)
  - Plan for next period

Each note captures who conducted the session, their role, and the CPT code it counts toward.

### 6. Call log
A log of all care coordination contacts per patient. Each entry records:
- Date, duration, CPT code
- Who conducted it and their role
- The specific coordination activity performed (CMS audit requirement)

### 7. APCM tier assignment
Assigns patients to APCM Level I, II, or III based on chronic condition count and complexity (per CMS 2025 rule).

---

## What we need you to check

Please review each section and tell us: **correct**, **needs adjustment**, or **wrong** — and add a note if something needs to change.

---

### Care plan elements

- [ ] Are the 11 care plan elements the right ones for CMS CCM compliance?
- [ ] Is field 7 (Principal CCM Billing Provider) correctly described? Should it include NPI, supervision level, or anything else?
- [ ] Is field 8 (Coordination of Care) asking for the right information?
- [ ] The "shared with patient" checkbox — is this sufficient documentation, or does CMS require more?
- [ ] Is the revision history sufficient for audit purposes, or do we need more detail per revision?

---

### Encounter note (SOAP)

- [ ] Is SOAP the right format for a CCM monitoring encounter note, or is there a preferred format your practice uses?
- [ ] **S — Subjective**: are we capturing the right patient-reported information?
- [ ] **O — Objective**: we include vitals, PHQ-9/GAD-7/PCL-5 scores, medication list, and call tone. Is anything missing?
- [ ] **A — Assessment**: is "clinician interpretation + condition status + escalation rationale" the right scope for this field?
- [ ] **P — Interventions performed**: does this correctly separate what was done *this session* from the forward plan?
- [ ] **P — Coordination action taken**: CMS requires documentation of who was contacted and what was communicated. Is our prompt/placeholder language clear enough for staff to fill this correctly?
- [ ] **P — Plan for next period**: is the scope right, or should this be more structured (e.g. separate fields for follow-up date, escalation triggers, patient action items)?

---

### CPT codes & billing

- [ ] Are the 6 CCM codes (99490, 99439, 99491, 99487, 99489, G0506) correct and complete for your billing setup?
- [ ] Are the APCM codes (G0556–G0558, G0568–G0570) correct?
- [ ] The CCM/APCM mutual exclusion (one per calendar month) — is this the correct rule, or are there edge cases we're missing?
- [ ] The "counts for billing" checkbox on task completion — is this the right place to confirm billing, or should it be a separate workflow?

---

### Consent

- [ ] Is verbal consent sufficient, or must CCM consent always be written?
- [ ] What exactly must be documented at consent time? We currently capture: date, method, staff name, free-text notes. Is anything missing?
- [ ] Does the consent need to be renewed annually, or only once at enrollment?

---

### APCM tier assignment

- [ ] Level I = 1 chronic condition, Level II = 2+ chronic conditions, Level III = 2+ chronic conditions with high complexity. Is this the correct CMS definition?
- [ ] Are there specific conditions that automatically qualify a patient for Level III regardless of count?

---

### Call log

- [ ] The log captures: date, duration, CPT code, staff name, staff role, coordination activity. Is this sufficient for a CMS audit?
- [ ] Should AI-conducted calls (supervised by RN) be documented differently from RN-conducted calls?
- [ ] Is "coordination activity" the right field name, or is there standard terminology your practice uses?

---

### General

- [ ] Is anything missing that CMS requires for CCM/APCM compliance that we haven't built yet?
- [ ] Is the terminology we're using (field names, labels, descriptions) consistent with what your clinical staff would expect to see?
- [ ] Any workflows that feel clinically incorrect or that would create documentation problems?

---

## How to give feedback

Add comments directly in this file, or email matteo@usehana.com with your notes. Screenshots of specific screens are helpful if something looks wrong in the UI.

We're not looking for software feedback — just whether the clinical logic and documentation requirements are right.
