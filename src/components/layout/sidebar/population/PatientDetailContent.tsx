
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, User, Phone, Mail, MapPin, Activity, Clock, FileText, Brain, ClipboardList } from 'lucide-react';
import { patientsData } from '@/data/patientsData';
import { patientData } from '@/data/patientData';
import OverviewTab from '@/components/overview/OverviewTab';
import { PatientCareLog } from './PatientCareLog';
import { ProtocolsContent } from '../ProtocolsContent';
import { BillingContent } from '../BillingContent';

interface PatientDetailContentProps {
  patientId: string;
}

export const PatientDetailContent: React.FC<PatientDetailContentProps> = ({ patientId }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const patient = patientsData.find(p => p.id === patientId);

  if (!patient) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p>Patient not found</p>
      </div>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Severe': return 'bg-red-100 text-red-800 border-red-200';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Mild': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // For detailed patient data, use the full patient data if available
  const isDetailedPatient = patientId === 'P100592';

  return (
    <div className="space-y-4">
      {/* Patient Info Header */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="h-5 w-5" />
            {patient.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Patient ID: {patient.id}</p>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{patient.primaryDiagnosis}</Badge>
              {patient.diagnosisCode && (
                <Badge variant="outline">{patient.diagnosisCode}</Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for detailed view */}
      {isDetailedPatient ? (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="careLog" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Care Log
            </TabsTrigger>
            <TabsTrigger value="protocols" className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4" />
              Protocols
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
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

          <TabsContent value="protocols" className="mt-4">
            <ProtocolsContent />
          </TabsContent>

          <TabsContent value="billing" className="mt-4">
            <BillingContent />
          </TabsContent>
        </Tabs>
      ) : (
        /* Basic patient info for other patients */
        <div className="space-y-4">
          {/* Primary Diagnosis */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Primary Diagnosis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-medium">{patient.primaryDiagnosis}</p>
                <Badge variant="outline">{patient.diagnosisCode}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Visit Information */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Visit Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700">Last Visit</p>
                  <p className="text-sm">{new Date(patient.lastVisit).toLocaleDateString()}</p>
                </div>
                {patient.nextAppointment && (
                  <div>
                    <p className="text-sm font-medium text-gray-700">Next Appointment</p>
                    <p className="text-sm text-blue-600">{new Date(patient.nextAppointment).toLocaleDateString()}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">(555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{patient.name.toLowerCase().replace(' ', '.')}@email.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">123 Main St, City, State 12345</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
