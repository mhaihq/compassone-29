
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { PatientSummary } from '@/data/patientsData';

interface PatientTileProps {
  patient: PatientSummary;
  onPatientClick: (patientId: string) => void;
  daysSinceVisit: number;
}

export const PatientTile: React.FC<PatientTileProps> = ({ 
  patient, 
  onPatientClick, 
  daysSinceVisit 
}) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Severe': return 'bg-red-500 hover:bg-red-600 border-red-200';
      case 'Moderate': return 'bg-yellow-500 hover:bg-yellow-600 border-yellow-200';
      case 'Mild': return 'bg-green-500 hover:bg-green-600 border-green-200';
      default: return 'bg-gray-500 hover:bg-gray-600 border-gray-200';
    }
  };

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

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`
              w-12 h-12 rounded-lg cursor-pointer transition-all duration-200 
              flex items-center justify-center text-white text-xs font-medium
              border-2 transform hover:scale-105 shadow-sm hover:shadow-md
              ${getSeverityColor(patient.severity)}
            `}
            onClick={() => onPatientClick(patient.id)}
          >
            <div className="text-center leading-tight">
              <div className="font-bold">{patient.name.split(' ').map(n => n[0]).join('')}</div>
              <div className="text-xs opacity-90">{calculateAge(patient.dateOfBirth)}</div>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <div className="space-y-1">
            <p className="font-semibold">{patient.name}</p>
            <p className="text-sm">ID: {patient.id}</p>
            <p className="text-sm">Age: {calculateAge(patient.dateOfBirth)}, {patient.gender}</p>
            <p className="text-sm">Diagnosis: {patient.primaryDiagnosis}</p>
            <Badge className={`text-xs ${getSeverityColor(patient.severity)} text-white border-none`}>
              {patient.severity} Risk
            </Badge>
            <p className="text-sm">Last visit: {daysSinceVisit} days ago</p>
            {patient.nextAppointment && (
              <p className="text-sm text-blue-600">
                Next: {new Date(patient.nextAppointment).toLocaleDateString()}
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
