
import { PatientData } from '@/data/patientData';
import { PatientInteractionInsights, matteoInteractionInsights, defaultInteractionInsights } from '@/data/interactionInsights';
import { calculateAge, getMedicalConditions, getLastContactDate } from '@/utils/patientUtils';

export interface PatientDataSummary {
  patientData: PatientData;
  patientAge: number;
  lastContactedFormatted: string;
  medicalConditions: string[];
  insights: PatientInteractionInsights;
}

export const getPatientDataSummary = (patientData: PatientData): PatientDataSummary => {
  const patientAge = calculateAge(patientData.dateOfBirth);
  const lastContactedFormatted = getLastContactDate(patientData);
  const medicalConditions = getMedicalConditions(patientData);
  
  // For now, we only have detailed insights for Matteo
  const insights = patientData.id === 'P100592' ? matteoInteractionInsights : defaultInteractionInsights;
  
  return {
    patientData,
    patientAge,
    lastContactedFormatted,
    medicalConditions,
    insights
  };
};
