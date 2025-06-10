
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
  solidColor: string;
  isRealPatient: boolean;
}

export const transformPatientsToMapPoints = (patients: PatientSummary[]): PatientMapPoint[] => {
  return patients.map(patient => {
    const age = calculateAge(patient.dateOfBirth);
    
    // Create positioning based on severity for visual grouping
    const severityWeight = patient.severity === 'Severe' ? 0.2 : 
                          patient.severity === 'Moderate' ? 0.5 : 0.8;
    
    // Add randomness for distribution within severity zones
    const jitter = 0.15;
    const x = Math.random(); // Random X position
    const y = severityWeight + (Math.random() - 0.5) * jitter;
    
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
  hexRadius: number = 6
): HexbinPoint[] => {
  const hexWidth = hexRadius * 2 * 0.866;
  const hexHeight = hexRadius * 1.5;
  
  // Calculate grid dimensions
  const cols = Math.floor(width / hexWidth) + 1;
  const rows = Math.floor(height / hexHeight) + 1;
  
  const hexbinData: HexbinPoint[] = [];
  let patientIndex = 0;
  
  // Create hexagonal grid - only real patients, no synthetic ones
  for (let row = 0; row < rows && patientIndex < points.length; row++) {
    for (let col = 0; col < cols && patientIndex < points.length; col++) {
      // Calculate position with offset for hexagonal packing
      const offsetX = (row % 2) * (hexWidth / 2);
      const x = col * hexWidth + hexWidth / 2 + offsetX;
      const y = row * hexHeight + hexRadius;
      
      // Skip hexagons outside bounds
      if (x + hexRadius > width || y + hexRadius > height || x - hexRadius < 0 || y - hexRadius < 0) {
        continue;
      }
      
      // Only create hexagons for real patients
      if (patientIndex < points.length) {
        const patient = points[patientIndex];
        const solidColor = getSeverityColor(patient.severity);
        
        const hexData: HexbinPoint = {
          ...patient,
          x,
          y,
          count: 1,
          patients: [{ ...patient, x, y }],
          solidColor,
          isRealPatient: true
        };
        
        hexbinData.push(hexData);
        patientIndex++;
      }
    }
  }
  
  return hexbinData;
};

export const getSeverityColor = (severity: string): string => {
  switch (severity) {
    case 'Severe': return '#dc2626'; // red-600
    case 'Moderate': return '#d97706'; // amber-600
    case 'Mild': return '#059669'; // emerald-600
    default: return '#6b7280'; // gray-500
  }
};
