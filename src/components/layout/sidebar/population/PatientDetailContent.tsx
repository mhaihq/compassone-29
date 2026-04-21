import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, FileText, Brain, User, Clock } from 'lucide-react';
import { patientsData } from '@/data/patientsData';
import { OverviewTab } from '@/components/overview/OverviewTab';
import { PatientCareLog } from './PatientCareLog';
import { BillingContent } from '../BillingContent';

interface PatientDetailContentProps {
  patientId: string;
}

export const PatientDetailContent: React.FC<PatientDetailContentProps> = ({ patientId }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const patient = patientsData.find(p => p.id === patientId);

  if (!patient) {
    return (
      <div className="py-8 text-center text-muted-foreground text-sm">Patient not found.</div>
    );
  }

  const calculateAge = (dob: string) => {
    const b = new Date(dob);
    const t = new Date();
    let a = t.getFullYear() - b.getFullYear();
    if (t.getMonth() < b.getMonth() || (t.getMonth() === b.getMonth() && t.getDate() < b.getDate())) a--;
    return a;
  };

  return (
    <div className="space-y-4">
      {/* Patient card — name, age, last contact, conditions, ops status */}
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
                {patient.diagnosisCode && (
                  <Badge variant="outline" className="text-xs">{patient.diagnosisCode}</Badge>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5">
                <Badge variant="outline" className="text-xs text-green-700 border-green-300">CCM Enrolled</Badge>
                <Badge variant="outline" className="text-xs">Care plan active</Badge>
                <Badge variant="outline" className="text-xs">42 / 60 min logged</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="flex items-center gap-1.5">
            <Brain className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="careLog" className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            Care Plan & Log
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-1.5">
            <FileText className="h-4 w-4" />
            Billing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <OverviewTab />
        </TabsContent>

        <TabsContent value="careLog" className="mt-4 space-y-4">
          <CarePlanSummary />
          <PatientCareLog />
        </TabsContent>

        <TabsContent value="billing" className="mt-4">
          <BillingContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Inline care plan summary — shown above the call log in the Care Plan & Log tab
function CarePlanSummary() {
  // TODO: Replace with real API call
  const plan = {
    status: 'Active',
    lastUpdated: '2026-04-18',
    updatedBy: 'Dr. Wilson',
    statusSinceLastReview: 'Depression symptoms stable. PHQ-9 dropped from 15 to 11. BP still elevated (138/88).',
    medicationUpdate: 'Sertraline 100mg daily. Lisinopril 10mg daily — adherence concerns.',
    symptomUpdate: 'Mood improving. Occasional hopelessness mid-afternoon. No SI.',
    interventions: 'Weekly Hana check-ins. Coordinated with Dr. Wilson on lisinopril adherence.',
    nextReviewNote: 'Check PHQ-9 at next review. Escalate if BP remains >135/85.',
  };

  return (
    <Card className="shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-foreground">Care Plan</h3>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs text-green-700 border-green-300">{plan.status}</Badge>
            <span className="text-xs text-muted-foreground">
              Updated {new Date(plan.lastUpdated).toLocaleDateString()} by {plan.updatedBy}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <Field label="Status since last review" value={plan.statusSinceLastReview} />
          <Field label="Medication update" value={plan.medicationUpdate} />
          <Field label="Symptom update" value={plan.symptomUpdate} />
          <Field label="Interventions" value={plan.interventions} />
          <Field label="Next review note" value={plan.nextReviewNote} className="sm:col-span-2" />
        </div>
      </CardContent>
    </Card>
  );
}

function Field({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className={className}>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-0.5">{label}</p>
      <p className="text-sm text-foreground leading-snug">{value}</p>
    </div>
  );
}
