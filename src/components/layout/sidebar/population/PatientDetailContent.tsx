
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Phone, Mail, MapPin, Activity, Clock, FileText } from 'lucide-react';
import { patientsData } from '@/data/patientsData';

interface PatientDetailContentProps {
  patientId: string;
}

export const PatientDetailContent: React.FC<PatientDetailContentProps> = ({ patientId }) => {
  const patient = patientsData.find(p => p.id === patientId);

  if (!patient) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p>Patient not found</p>
      </div>
    );
  }

  const calculateAge = (dateOfBirth: string) => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Severe': return 'bg-red-100 text-red-800 border-red-200';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Mild': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-4">
      {/* Patient Header */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#1E4D36]/10 rounded-full">
                <User className="h-5 w-5 text-[#1E4D36]" />
              </div>
              <div>
                <CardTitle className="text-[#1E4D36]">{patient.name}</CardTitle>
                <p className="text-sm text-gray-600">ID: {patient.id}</p>
              </div>
            </div>
            <Badge className={`${getSeverityColor(patient.severity)}`}>
              {patient.severity}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span>{calculateAge(patient.dateOfBirth)} years old • {patient.gender}</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-gray-400" />
              <span>Status: {patient.status}</span>
            </div>
          </div>
        </CardContent>
      </Card>

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

      {/* Contact Information (Mock Data) */}
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

      {/* Recent Activity (Mock Data) */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="border-l-2 border-blue-200 pl-3">
              <p className="text-sm font-medium">Follow-up call completed</p>
              <p className="text-xs text-gray-500">2 days ago</p>
            </div>
            <div className="border-l-2 border-green-200 pl-3">
              <p className="text-sm font-medium">Medication adherence check</p>
              <p className="text-xs text-gray-500">1 week ago</p>
            </div>
            <div className="border-l-2 border-yellow-200 pl-3">
              <p className="text-sm font-medium">Care plan updated</p>
              <p className="text-xs text-gray-500">2 weeks ago</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
