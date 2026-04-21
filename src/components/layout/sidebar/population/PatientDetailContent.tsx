import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, FileText, Brain } from 'lucide-react';
import { patientsData } from '@/data/patientsData';
import OverviewTab from '@/components/overview/OverviewTab';
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

  return (
    <div className="space-y-4">
      {/* Minimal patient header */}
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-base font-semibold text-foreground">{patient.name}</h2>
        <span className="text-xs text-muted-foreground">{patient.id}</span>
        <Badge variant="outline" className="text-xs">{patient.primaryDiagnosis}</Badge>
        {patient.diagnosisCode && (
          <Badge variant="outline" className="text-xs">{patient.diagnosisCode}</Badge>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="flex items-center gap-1.5">
            <Brain className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="careLog" className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            Care Log
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-1.5">
            <FileText className="h-4 w-4" />
            Billing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <OverviewTab />
        </TabsContent>

        <TabsContent value="careLog" className="mt-4">
          <PatientCareLog />
        </TabsContent>

        <TabsContent value="billing" className="mt-4">
          <BillingContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};
