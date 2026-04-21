import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar, FileText, Brain, User, Clock, Shield, ClipboardList } from 'lucide-react';
import { patientsData } from '@/data/patientsData';
import { patientsCcmData } from '@/data/patientsCcmData';
import { OverviewTab } from '@/components/overview/OverviewTab';
import { PatientCareLog } from './PatientCareLog';
import { BillingContent } from '../BillingContent';
import { ConsentCapture } from '@/pages/patient/consent/ConsentCapture';
import { ApcmTierPanel } from '@/pages/patient/apcm-tier/ApcmTierPanel';
import { CarePlanPanel } from '@/pages/patient/care-plan/CarePlanPanel';
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
  coordinationOfCare: '',
  preventiveServices: '',
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
  plannedInterventions: 'Monthly care coordination calls (NP Linda Torres). Medication reconciliation each visit. BP log review every 2 weeks. Diabetes self-management education — 2 sessions scheduled. Referral to nephrology if eGFR drops below 45.',
  expectedOutcomes: 'BP controlled to <130/80 within 3 months. HbA1c <7% by Q3 2026. No hospitalizations for 6 months. Patient able to walk 20+ min/day by June 2026.',
  coordinationOfCare: 'Billing provider: Dr. Sandra Kim MD (CCM). Care coordinator: Patricia Nguyen NP (monthly calls). Specialists: Nephrology (pending referral), Cardiology (last seen Jan 2026). Communication via shared EHR notes and monthly care conference.',
  preventiveServices: 'Annual flu shot — due Oct 2026. Colonoscopy — due 2027. Annual dilated eye exam — due Dec 2026. Annual foot exam — due Nov 2026. A1c lab — due June 2026.',
  communityResources: 'Meals on Wheels — enrolled since Feb 2026. Transportation via Medicaid NEMT for appointments. Local diabetes support group — Tuesdays at Community Health Center.',
  crisisAndEmergency: 'Call 911 for BP >180/120, chest pain, or stroke symptoms. After-hours nurse line: 1-800-555-0100. Emergency contact: Maria Grassi (spouse) — 555-234-5678. Nearest ER: General Hospital (2.1 mi).',
  sharedWithPatient: true,
  lastUpdated: p.carePlanLastUpdated,
  updatedBy: 'Care Team',
  revisionHistory: p.carePlanLastUpdated ? [{ date: p.carePlanLastUpdated, by: 'Care Team', summary: 'Initial plan created' }] : [],
});

function calculateAge(dob: string) {
  const b = new Date(dob);
  const t = new Date();
  let a = t.getFullYear() - b.getFullYear();
  if (t.getMonth() < b.getMonth() || (t.getMonth() === b.getMonth() && t.getDate() < b.getDate())) a--;
  return a;
}

export function PatientDetailContent({ patientId }: PatientDetailContentProps) {
  const [activeTab, setActiveTab] = useState('overview');
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

  return (
    <div className="space-y-4">
      {/* Patient header card */}
      <Card className="shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="bg-muted p-2 rounded-full flex-shrink-0">
              <User className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0 space-y-2">
              <div>
                <h3 className="font-semibold text-foreground truncate">{patient.name}</h3>
                <div className="flex flex-wrap items-center gap-3 mt-0.5 text-xs text-muted-foreground">
                  <span>{patient.id}</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {calculateAge(patient.dateOfBirth)} years old
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Last visit: {new Date(patient.lastVisit).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline" className="text-xs">{patient.primaryDiagnosis}</Badge>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {enrolledLabel && (
                  <Badge variant="outline" className="text-xs text-green-700 border-green-300">
                    {enrolledLabel}
                  </Badge>
                )}
                {carePlan.lastUpdated && (
                  <Badge variant="outline" className="text-xs">Care plan active</Badge>
                )}
                {minutesBadge && (
                  <Badge variant="outline" className="text-xs">{minutesBadge} logged</Badge>
                )}
                {ccmPatient && !ccmPatient.consent.obtained && (
                  <Badge variant="outline" className="text-xs text-amber-700 border-amber-300">
                    Consent needed
                  </Badge>
                )}
                {ccmPatient?.initiatingVisit.completed && (
                  <Badge variant="outline" className="text-xs text-blue-700 border-blue-300">
                    Initiating visit ✓
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <ScrollArea orientation="horizontal">
          <TabsList className="flex w-max min-w-full">
            <TabsTrigger value="overview" className="flex items-center gap-1.5 text-xs">
              <Brain className="h-3.5 w-3.5" />Overview
            </TabsTrigger>
            <TabsTrigger value="carePlan" className="flex items-center gap-1.5 text-xs">
              <ClipboardList className="h-3.5 w-3.5" />Care Plan
            </TabsTrigger>
            <TabsTrigger value="careLog" className="flex items-center gap-1.5 text-xs">
              <Calendar className="h-3.5 w-3.5" />Call Log
            </TabsTrigger>
            <TabsTrigger value="consent" className="flex items-center gap-1.5 text-xs">
              <FileText className="h-3.5 w-3.5" />Consent
            </TabsTrigger>
            <TabsTrigger value="enrollment" className="flex items-center gap-1.5 text-xs">
              <Shield className="h-3.5 w-3.5" />Enrollment
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-1.5 text-xs">
              <FileText className="h-3.5 w-3.5" />Billing
            </TabsTrigger>
          </TabsList>
        </ScrollArea>

        <TabsContent value="overview" className="mt-4">
          <OverviewTab />
        </TabsContent>

        <TabsContent value="carePlan" className="mt-4">
          <CarePlanPanel
            patientId={patientId}
            plan={carePlan}
            onSave={setCarePlan}
          />
        </TabsContent>

        <TabsContent value="careLog" className="mt-4 space-y-4">
          <PatientCareLog />
        </TabsContent>

        <TabsContent value="consent" className="mt-4">
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
            <div className="py-8 text-center text-muted-foreground text-sm">
              Patient is not enrolled in CCM/APCM.
            </div>
          )}
        </TabsContent>

        <TabsContent value="enrollment" className="mt-4">
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
            <div className="py-8 text-center text-muted-foreground text-sm">
              No enrollment record found.
            </div>
          )}
        </TabsContent>

        <TabsContent value="billing" className="mt-4">
          <BillingContent />
        </TabsContent>
      </Tabs>
    </div>
  );
}
