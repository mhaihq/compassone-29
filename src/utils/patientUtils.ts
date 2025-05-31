
import { PatientData } from '@/data/patientData';

export const calculateAge = (dateOfBirth: string): number => {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

export const formatDate = (dateString: string, options?: Intl.DateTimeFormatOptions): string => {
  const defaultOptions: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString(undefined, options || defaultOptions);
};

export const formatDateShort = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  });
};

export const getMedicalConditions = (patientData: PatientData): string[] => {
  const activeConditions = patientData.medicalHistory.pastConditions
    .filter(condition => condition.status === 'Active')
    .map(condition => condition.condition);
  
  return [...activeConditions, patientData.diagnosis.primary];
};

export const getLastContactDate = (patientData: PatientData): string => {
  if (patientData.sessionNotes.length === 0) {
    return 'No recent contact';
  }
  
  const lastSessionDate = patientData.sessionNotes[0].date;
  return formatDateShort(lastSessionDate);
};

export const getSeverityColor = (severity: string): string => {
  switch (severity) {
    case 'Mild': return 'bg-severity-low text-white';
    case 'Moderate': return 'bg-severity-medium text-black';
    case 'Severe': return 'bg-severity-high text-white';
    default: return 'bg-muted text-muted-foreground';
  }
};
