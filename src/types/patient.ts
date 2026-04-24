export type ApcmLevel = 'I' | 'II' | 'III';
export type CoverageType = 'Medicare' | 'Medicaid' | 'Dual' | 'Commercial' | 'Uninsured';
export type MonthBillingMode = 'CCM' | 'APCM' | null;

export interface ChronicCondition {
  icd10: string;
  label: string;
  onsetYear?: number;
}

export interface CcmConsent {
  obtained: boolean;
  date?: string;
  method?: 'written' | 'verbal' | 'electronic';
  documentUrl?: string;
}

export interface InitiatingVisit {
  completed: boolean;
  date?: string;
  cptCode?: 'G0506' | 'office-visit';
  provider?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;

  // Primary diagnosis display (derived from chronicConditions)
  primaryDiagnosis: string;
  diagnosisCode: string;

  // Structured chronic conditions (CCM requires ≥2)
  chronicConditions: ChronicCondition[];

  severity: 'Mild' | 'Moderate' | 'Severe';
  lastVisit: string;
  nextAppointment?: string;
  status: 'Active' | 'Inactive' | 'Pending';

  // CCM / APCM enrollment
  enrolledInCCM: boolean;
  enrolledInAPCM: boolean;
  coverage: CoverageType;

  // APCM tier — only relevant when enrolledInAPCM = true
  apcmLevel?: ApcmLevel;

  // Mutual-exclusion guard: tracks which program billed this calendar month
  // null = neither billed yet this month
  monthBillingMode: MonthBillingMode;

  // CMS pre-requisites
  consent: CcmConsent;
  initiatingVisit: InitiatingVisit;

  // Care plan
  carePlanLastUpdated?: string;

  // Care team
  pcp?: string;
  careCoordinator?: string;

  // Priority scoring — guideline-driven, not AI probability (auditable)
  priority?: 'High' | 'Medium' | 'Low';
  priorityReason?: string;

  // Clinical trajectory — separate from enrollment status
  trajectory?: 'improving' | 'stable' | 'not-improving';

  // Last contact with patient (call, SMS, visit)
  lastContact?: string;
  nextTask?: string;

  // Set when a task auto-escalated straight to the provider, bypassing
  // the care coordinator (guideline trigger like BP >160, PHQ-9 ≥20).
  // Coordinator still needs visibility that it happened.
  escalatedToProvider?: { reason: string; at: string };

  // Active programs this patient is enrolled in this month (can be multiple)
  activePrograms?: Array<'CCM' | 'APCM' | 'RPM' | 'RTM' | 'PCM' | 'TCM'>;

  // Minutes logged this billing month
  minutesThisMonth: number;
  minutesTarget: number;

  // UI
  isClickable: boolean;
}
