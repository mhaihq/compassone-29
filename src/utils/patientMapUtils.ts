
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
  // Calculate grid dimensions based on hex radius
  const hexWidth = hexRadius * 2 * 0.866; // Width of hexagon
  const hexHeight = hexRadius * 1.5; // Height spacing for hexagons
  
  // Calculate how many hexagons can fit in each dimension
  const cols = Math.floor(width / hexWidth);
  const rows = Math.floor(height / hexHeight);
  
  // Create grid positions for hexagons
  return points.map((point, index) => {
    // Calculate grid position for this hexagon
    const col = index % cols;
    const row = Math.floor(index / cols);
    
    // Calculate actual x,y position in the grid
    // Offset every other row for proper hexagon tiling
    const offsetX = (row % 2) * (hexWidth / 2);
    const x = col * hexWidth + hexWidth / 2 + offsetX;
    const y = row * hexHeight + hexRadius;
    
    // Ensure the hexagon stays within bounds
    const clampedX = Math.max(hexRadius, Math.min(width - hexRadius, x));
    const clampedY = Math.max(hexRadius, Math.min(height - hexRadius, y));
    
    return {
      ...point,
      x: clampedX,
      y: clampedY,
      count: 1,
      patients: [{ ...point, x: clampedX, y: clampedY }]
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
