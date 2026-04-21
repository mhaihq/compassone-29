
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Clock } from "lucide-react";
import { PatientSummary } from '@/data/patientsData';

interface PatientListViewProps {
  patients: PatientSummary[];
  onPatientClick: (patientId: string) => void;
}

export const PatientListView: React.FC<PatientListViewProps> = ({ patients, onPatientClick }) => {
  // Calculate age from DOB
  const calculateAge = (dob: string): number => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  // Format date to a more readable format
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get severity color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Mild': return 'bg-green-100 text-green-800 border-green-200';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Severe': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">Patient Dashboard</h1>
          <p className="text-muted-foreground">Manage and view patient records</p>
        </div>
        <Badge variant="outline" className="text-sm">
          {patients.length} Patients
        </Badge>
      </div>

      <div className="grid gap-4">
        {patients.map((patient) => (
          <Card 
            key={patient.id} 
            className={`transition-all duration-200 ${
              patient.isClickable 
                ? 'hover:shadow-md cursor-pointer border-l-4 border-l-primary hover:border-l-primary/80' 
                : 'opacity-60 cursor-not-allowed border-l-4 border-l-gray-300'
            }`}
            onClick={() => patient.isClickable && onPatientClick(patient.id)}
          >
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className={`p-3 rounded-full ${patient.isClickable ? 'bg-primary/10' : 'bg-gray-100'}`}>
                    <User className={`h-6 w-6 ${patient.isClickable ? 'text-primary' : 'text-gray-400'}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-semibold">{patient.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        ID: {patient.id}
                      </Badge>
                      {patient.isClickable && (
                        <Badge className="bg-blue-100 text-blue-800 text-xs">
                          Available
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{formatDate(patient.dateOfBirth)} ({calculateAge(patient.dateOfBirth)} yrs)</span>
                      </div>
                      <div>{patient.gender}</div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>Last visit: {formatDate(patient.lastVisit)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <Badge className={getSeverityColor(patient.severity)}>
                    {patient.severity}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {patient.diagnosisCode}
                  </Badge>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Primary Diagnosis</div>
                    <div className="font-medium">{patient.primaryDiagnosis}</div>
                  </div>
                  {patient.nextAppointment && (
                    <div>
                      <div className="text-muted-foreground">Next Appointment</div>
                      <div className="font-medium">{formatDate(patient.nextAppointment)}</div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

