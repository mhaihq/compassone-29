import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Calendar, User, Clock } from 'lucide-react';
import { patientsData } from '@/data/patientsData';
import { patientsCcmData } from '@/data/patientsCcmData';
import { OverviewTab } from '@/components/overview/OverviewTab';
import { PatientCareLog } from './PatientCareLog';
import { BillingContent } from '../BillingContent';
import { ConsentCapture } from '@/pages/patient/consent/ConsentCapture';
import { ApcmTierPanel } from '@/pages/patient/apcm-tier/ApcmTierPanel';
import { CarePlanPanel } from '@/pages/patient/care-plan/CarePlanPanel';
import { CallButton } from '@/pages/patient/call/CallButton';
import type { CarePlanData } from '@/pages/patient/care-plan/CarePlanPanel';
import type { Patient } from '@/types/patient';

interface PatientDetailContentProps {
  patientId: string;
}

const emptyCarePlan: CarePlanData = {
  patientGoals: '',
  chronicConditions: '',
  medicationList: '',
  allergiesAndInteractions: '',
  plannedInterventions: '',
  expectedOutcomes: '',
  billingProvider: '',
  coordinationOfCare: '',
  communityResources: '',
  crisisAndEmergency: '',
  sharedWithPatient: false,
  revisionHistory: [],
};

const seedCarePlan = (p: Patient): CarePlanData => ({
  patientGoals: 'Maintain independence at home. Manage BP and blood sugar to avoid hospitalization. Resume walking 30 min/day.',
  chronicConditions: p.chronicConditions.map(c => `${c.icd10} — ${c.label} (since ${c.onsetYear ?? 'unknown'})`).join('\n') + '\n\nMonitoring targets: BP <130/80, HbA1c <7%, weight stable ±2 lb/week.',
  medicationList: 'Lisinopril 10mg daily (HTN — Dr. Kim). Metformin 500mg twice daily (DM — Dr. Kim). Atorvastatin 20mg nightly (lipids — Dr. Kim).',
  allergiesAndInteractions: 'NKDA. No flagged drug-drug interactions on current regimen. Monitor potassium with Lisinopril.',
  plannedInterventions: 'Monthly care coordination calls (Linda Torres, RN). Medication reconciliation each visit. BP log review every 2 weeks. Diabetes self-management education — 2 sessions scheduled. Referral to nephrology if eGFR drops below 45.',
  expectedOutcomes: 'BP controlled to <130/80 within 3 months. HbA1c <7% by Q3 2026. No hospitalizations for 6 months. Patient able to walk 20+ min/day by June 2026.',
  billingProvider: 'Dr. Sandra Kim, MD — NPI 1234567890. Principal CCM billing practitioner. General supervision of care coordination staff.',
  coordinationOfCare: 'Care coordinator: Linda Torres, RN (monthly monitoring calls). AI coach: Hana (weekly check-ins, supervised by Linda Torres). Specialists: Nephrology (pending referral), Cardiology (last seen Jan 2026), Psychiatry — Dr. Rodriguez (comorbid depression). Communication via EHR notes and monthly care conference.',
  communityResources: 'Meals on Wheels (tied to diabetes weight management) — enrolled since Feb 2026. Medicaid NEMT transportation for appointments (mobility barrier). Local diabetes support group — Tuesdays at Community Health Center.',
  crisisAndEmergency: 'Call 911 for BP >180/120, chest pain, or stroke symptoms. After-hours nurse line: 1-800-555-0100. Emergency contact: Maria Grassi (spouse) — 555-234-5678. Nearest ER: General Hospital (2.1 mi).',
  sharedWithPatient: true,
  lastUpdated: p.carePlanLastUpdated,
  updatedBy: 'Linda Torres, RN',
  revisionHistory: p.carePlanLastUpdated
    ? [{
        timestamp: `${p.carePlanLastUpdated}T09:00:00Z`,
        by: 'Linda Torres, RN',
        role: 'Care Coordinator',
        summary: 'Initial plan created',
        changes: [],
      }]
    : [],
  signOffStatus: p.id === 'P100592' ? 'approved' : 'draft',
  signOffHistory: p.id === 'P100592' ? [
    {
      timestamp: '2026-04-01T10:15:00Z',
      by: 'Linda Torres, RN',
      role: 'Care Coordinator',
      action: 'submitted',
    },
    {
      timestamp: '2026-04-01T16:42:00Z',
      by: 'Dr. Sandra Kim, MD',
      role: 'Provider',
      action: 'approved',
    },
  ] : [],
  workingNotes: p.id === 'P100592' ? [
    {
      id: 'wn-1',
      timestamp: '2026-04-15T10:30:00Z',
      by: 'Hana AI',
      role: 'Hana AI',
      text: 'Weekly check-in call (14 min). BP log reviewed — home readings 135–142/85–90 over past week. Patient acknowledged missing Lisinopril 2–3x/week. Mood appears stable. No SI concerns.',
    },
    {
      id: 'wn-2',
      timestamp: '2026-04-20T14:00:00Z',
      by: 'Linda Torres, RN',
      role: 'Care Coordinator',
      text: 'Follow-up call (9 min) re: Lisinopril adherence. Patient agreed to set up morning phone reminder. Reviewed lipid lab results — LDL 112, continuing Atorvastatin 20mg. Next check-in with Hana on 4/27.',
    },
  ] : [],
});

function calculateAge(dob: string) {
  const b = new Date(dob);
  const t = new Date();
  let a = t.getFullYear() - b.getFullYear();
  if (t.getMonth() < b.getMonth() || (t.getMonth() === b.getMonth() && t.getDate() < b.getDate())) a--;
  return a;
}

export function PatientDetailContent({ patientId }: PatientDetailContentProps) {
  const patient = patientsData.find(p => p.id === patientId);
  const [ccmPatient, setCcmPatient] = useState<Patient | null>(
    patientsCcmData.find(p => p.id === patientId) ?? null
  );
  const [carePlan, setCarePlan] = useState<CarePlanData>(
    ccmPatient ? seedCarePlan(ccmPatient) : emptyCarePlan
  );

  if (!patient) {
    return <div className="py-8 text-center text-muted-foreground text-sm">Patient not found.</div>;
  }

  const enrolledLabel = ccmPatient?.enrolledInAPCM
    ? `APCM Level ${ccmPatient.apcmLevel}`
    : ccmPatient?.enrolledInCCM
    ? 'CCM Enrolled'
    : null;

  const minutesBadge = ccmPatient && ccmPatient.minutesTarget > 0
    ? `${ccmPatient.minutesThisMonth} / ${ccmPatient.minutesTarget} min`
    : null;

  const age = calculateAge(patient.dateOfBirth);
  const minutesPct = ccmPatient && ccmPatient.minutesTarget > 0
    ? Math.min(Math.round((ccmPatient.minutesThisMonth / ccmPatient.minutesTarget) * 100), 100)
    : null;

  return (
    <div className="space-y-4">
      {/* Patient header */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
              <User className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base font-semibold text-foreground">{patient.name}</h2>
                {enrolledLabel && (
                  <Badge variant="outline" className="text-xs text-green-700 border-green-300 bg-green-50">{enrolledLabel}</Badge>
                )}
                {ccmPatient && !ccmPatient.consent.obtained && (
                  <Badge variant="outline" className="text-xs text-amber-700 border-amber-300 bg-amber-50">Consent needed</Badge>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-1 text-xs text-muted-foreground">
                <span className="font-mono">{patient.id}</span>
                <span>·</span>
                <span>{age} y/o</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  DOB {patient.dateOfBirth}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Last visit {new Date(patient.lastVisit).toLocaleDateString()}
                </span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                <Badge variant="secondary" className="text-xs">{patient.primaryDiagnosis}</Badge>
              </div>
            </div>
          </div>
          <CallButton patientName={patient.name} />
        </div>

        {/* Minutes progress bar */}
        {minutesPct !== null && ccmPatient && (
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
              <span>Care time this month</span>
              <span className={`font-medium ${minutesPct >= 100 ? 'text-green-700' : 'text-foreground'}`}>
                {ccmPatient.minutesThisMonth} / {ccmPatient.minutesTarget} min
                {minutesPct >= 100 && ' · Ready to bill'}
              </span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${minutesPct >= 100 ? 'bg-green-500' : 'bg-primary'}`}
                style={{ width: `${minutesPct}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full grid grid-cols-4 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="careplan">Care Plan & Log</TabsTrigger>
          <TabsTrigger value="enrollment">Enrollment</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>

        <TabsContent value="careplan" className="space-y-6">
          <CarePlanPanel
            patientId={patientId}
            plan={carePlan}
            onSave={setCarePlan}
          />
          <Separator />
          <section>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Call Log</p>
            <PatientCareLog />
          </section>
        </TabsContent>

        <TabsContent value="enrollment" className="space-y-6">
          <section>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Program Enrollment</p>
            {ccmPatient ? (
              <ApcmTierPanel
                patientId={patientId}
                patientName={patient.name}
                enrolledInCCM={ccmPatient.enrolledInCCM}
                enrolledInAPCM={ccmPatient.enrolledInAPCM}
                apcmLevel={ccmPatient.apcmLevel}
                monthBillingMode={ccmPatient.monthBillingMode}
                onEnrollmentChange={(update) =>
                  setCcmPatient(prev => prev ? { ...prev, ...update } : prev)
                }
              />
            ) : (
              <p className="text-sm text-muted-foreground">No enrollment record found.</p>
            )}
          </section>
          <Separator />
          <section>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Consent</p>
            {ccmPatient ? (
              <ConsentCapture
                patientId={patientId}
                patientName={patient.name}
                consent={ccmPatient.consent}
                onConsentUpdate={(update) =>
                  setCcmPatient(prev => prev ? { ...prev, consent: { ...prev.consent, ...update } } : prev)
                }
              />
            ) : (
              <p className="text-sm text-muted-foreground">Patient is not enrolled in CCM/APCM.</p>
            )}
          </section>
        </TabsContent>

        <TabsContent value="billing">
          <BillingContent />
        </TabsContent>
      </Tabs>
    </div>
  );
}
