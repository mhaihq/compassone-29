
import * as d3 from 'd3';
import { PatientSummary } from '@/data/patientsData';

export interface PatientMapPoint {
  id: string;
  name: string;
  x: number;
  y: number;
  severity: 'Mild' | 'Moderate' | 'Severe';
  primaryDiagnosis: string;
  age: number;
  lastVisit: string;
  daysSinceLastVisit: number;
}

export interface HexbinPoint extends PatientMapPoint {
  count: number;
  patients: PatientMapPoint[];
}

export const transformPatientsToMapPoints = (patients: PatientSummary[]): PatientMapPoint[] => {
  return patients.map(patient => {
    const age = calculateAge(patient.dateOfBirth);
    const daysSinceLastVisit = calculateDaysSinceLastVisit(patient.lastVisit);
    
    // Map severity to X-axis position (0 to 1)
    const severityToX = {
      'Mild': 0.2,
      'Moderate': 0.5,
      'Severe': 0.8
    };
    
    // Map days since last visit to Y-axis position (0 to 1)
    // Invert Y so recent visits are at top
    const maxDays = 30; // Assuming max 30 days for scaling
    const normalizedDays = Math.min(daysSinceLastVisit / maxDays, 1);
    const y = 1 - normalizedDays; // Invert so recent visits are at top
    
    // Add some jitter to prevent exact overlaps
    const jitterX = (Math.random() - 0.5) * 0.15;
    const jitterY = (Math.random() - 0.5) * 0.1;
    
    return {
      id: patient.id,
      name: patient.name,
      x: Math.max(0.1, Math.min(0.9, severityToX[patient.severity] + jitterX)),
      y: Math.max(0.1, Math.min(0.9, y + jitterY)),
      severity: patient.severity,
      primaryDiagnosis: patient.primaryDiagnosis,
      age,
      lastVisit: patient.lastVisit,
      daysSinceLastVisit
    };
  });
};

const calculateAge = (dateOfBirth: string): number => {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

const calculateDaysSinceLastVisit = (lastVisit: string): number => {
  const lastVisitDate = new Date(lastVisit);
  const today = new Date();
  const diffTime = today.getTime() - lastVisitDate.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const createHexbinData = (
  points: PatientMapPoint[], 
  width: number, 
  height: number, 
  hexRadius: number = 20
): HexbinPoint[] => {
  // Convert normalized positions to actual pixel positions
  return points.map(point => {
    const x = point.x * (width - hexRadius * 2) + hexRadius;
    const y = point.y * (height - hexRadius * 2) + hexRadius;
    
    return {
      ...point,
      x,
      y,
      count: 1,
      patients: [{ ...point, x, y }]
    };
  });
};

export const getSeverityColor = (severity: string): string => {
  switch (severity) {
    case 'Severe': return '#dc2626'; // red-600
    case 'Moderate': return '#d97706'; // amber-600
    case 'Mild': return '#16a34a'; // green-600
    default: return '#6b7280'; // gray-500
  }
};
