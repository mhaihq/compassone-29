
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
  hexRadius: number = 8
): HexbinPoint[] => {
  const hexWidth = hexRadius * 2 * 0.866;
  const hexHeight = hexRadius * 1.5;
  
  // Calculate grid dimensions
  const cols = Math.floor(width / hexWidth);
  const rows = Math.floor(height / hexHeight);
  
  // Group patients by severity
  const patientsBySeverity = {
    Severe: points.filter(p => p.severity === 'Severe'),
    Moderate: points.filter(p => p.severity === 'Moderate'),
    Mild: points.filter(p => p.severity === 'Mild')
  };
  
  const hexbinData: HexbinPoint[] = [];
  let patientIndex = { Severe: 0, Moderate: 0, Mild: 0 };
  
  // Create hexagonal grid from bottom to top
  for (let row = rows - 1; row >= 0; row--) {
    for (let col = 0; col < cols; col++) {
      // Calculate position
      const offsetX = (row % 2) * (hexWidth / 2);
      const x = col * hexWidth + hexWidth / 2 + offsetX;
      const y = row * hexHeight + hexRadius;
      
      // Ensure hexagon stays within bounds
      if (x + hexRadius > width || y + hexRadius > height || x - hexRadius < 0 || y - hexRadius < 0) {
        continue;
      }
      
      // Determine severity based on vertical position (bottom = severe, top = mild)
      const normalizedY = row / (rows - 1); // 0 = bottom, 1 = top
      let severity: 'Mild' | 'Moderate' | 'Severe';
      
      if (normalizedY < 0.33) {
        severity = 'Severe';
      } else if (normalizedY < 0.67) {
        severity = 'Moderate';
      } else {
        severity = 'Mild';
      }
      
      // Get patient data or create synthetic
      const severityPatients = patientsBySeverity[severity];
      let hexData: HexbinPoint;
      
      if (patientIndex[severity] < severityPatients.length) {
        const patient = severityPatients[patientIndex[severity]];
        hexData = {
          ...patient,
          x,
          y,
          count: 1,
          patients: [{ ...patient, x, y }]
        };
        patientIndex[severity]++;
      } else {
        // Create synthetic patient for visual density
        hexData = {
          id: `synthetic-${severity}-${hexbinData.length}`,
          name: `Patient ${hexbinData.length + 1}`,
          x,
          y,
          severity,
          primaryDiagnosis: 'General Care',
          age: Math.floor(Math.random() * 60) + 20,
          lastVisit: '2025-05-01',
          count: 1,
          patients: [{
            id: `synthetic-${severity}-${hexbinData.length}`,
            name: `Patient ${hexbinData.length + 1}`,
            x,
            y,
            severity,
            primaryDiagnosis: 'General Care',
            age: Math.floor(Math.random() * 60) + 20,
            lastVisit: '2025-05-01'
          }]
        };
      }
      
      hexbinData.push(hexData);
    }
  }
  
  return hexbinData;
};

export const getSeverityColor = (severity: string): string => {
  switch (severity) {
    case 'Severe': return '#dc2626'; // red-600
    case 'Moderate': return '#d97706'; // amber-600
    case 'Mild': return '#16a34a'; // green-600
    default: return '#6b7280'; // gray-500
  }
};
