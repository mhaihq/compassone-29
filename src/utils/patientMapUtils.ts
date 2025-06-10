
import * as d3 from 'd3';
import { hexbin } from 'd3-hexbin';
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
}

export interface HexbinPoint extends PatientMapPoint {
  count: number;
  patients: PatientMapPoint[];
}

export const transformPatientsToMapPoints = (patients: PatientSummary[]): PatientMapPoint[] => {
  return patients.map(patient => {
    const age = calculateAge(patient.dateOfBirth);
    
    // Create synthetic positioning based on severity and age
    // This creates logical clustering for the visualization
    const severityWeight = patient.severity === 'Severe' ? 0.8 : 
                          patient.severity === 'Moderate' ? 0.5 : 0.2;
    
    const ageWeight = Math.min(age / 100, 1); // Normalize age
    
    // Add some randomness for realistic distribution
    const jitter = 0.2;
    const x = severityWeight + (Math.random() - 0.5) * jitter;
    const y = ageWeight + (Math.random() - 0.5) * jitter;
    
    return {
      id: patient.id,
      name: patient.name,
      x: Math.max(0, Math.min(1, x)), // Clamp to [0,1]
      y: Math.max(0, Math.min(1, y)), // Clamp to [0,1]
      severity: patient.severity,
      primaryDiagnosis: patient.primaryDiagnosis,
      age,
      lastVisit: patient.lastVisit
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

export const createHexbinData = (
  points: PatientMapPoint[], 
  width: number, 
  height: number, 
  hexRadius: number = 20
): HexbinPoint[] => {
  // Scale points to svg dimensions
  const scaledPoints = points.map(p => ({
    ...p,
    x: p.x * width,
    y: p.y * height
  }));
  
  // Create hexbin generator using the imported hexbin function
  const hexbinGenerator = hexbin()
    .radius(hexRadius)
    .extent([[0, 0], [width, height]]);
  
  // Generate hexbins
  const bins = hexbinGenerator(scaledPoints.map(p => [p.x, p.y] as [number, number]));
  
  // Transform bins to include patient data
  return bins.map(bin => {
    const patientsInBin = scaledPoints.filter(point => {
      const dx = point.x - bin.x;
      const dy = point.y - bin.y;
      return Math.sqrt(dx * dx + dy * dy) <= hexRadius;
    });
    
    // Use the first patient as representative data
    const representative = patientsInBin[0] || scaledPoints[0];
    
    return {
      ...representative,
      x: bin.x,
      y: bin.y,
      count: bin.length,
      patients: patientsInBin
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
