import React from 'react';
import { User, Calendar, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PatientData } from '@/data/patientData';
interface PatientInfoCardProps {
  patientData: PatientData;
  patientAge: number;
  lastContactedFormatted: string;
  medicalConditions: string[];
}
export const PatientInfoCard: React.FC<PatientInfoCardProps> = ({
  patientData,
  patientAge,
  lastContactedFormatted,
  medicalConditions
}) => {
  return;
};