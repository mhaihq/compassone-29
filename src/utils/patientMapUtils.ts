
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
    
    // Rearrange positioning: Severe (red) at top, Moderate (gold) in middle, Mild (green) at bottom
    const severityBaseY = patient.severity === 'Severe' ? 0.15 : 
                         patient.severity === 'Moderate' ? 0.5 : 0.85;
    
    const x = Math.random();
    const y = severityBaseY + (Math.random() - 0.5) * 0.3; // Add some spread
    
    return {
      id: patient.id,
      name: patient.name,
      x: Math.max(0, Math.min(1, x)),
      y: Math.max(0, Math.min(1, y)),
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
  hexRadius: number = 6 // Increased from 4 to 6 for bigger hexagons
): HexbinPoint[] => {
  const hexWidth = hexRadius * 2 * 0.866;
  const hexHeight = hexRadius * 1.5;
  
  // Create a tighter, more uniform grid
  const cols = Math.floor(width / hexWidth) + 1;
  const rows = Math.floor(height / hexHeight) + 1;
  
  const hexbinData: HexbinPoint[] = [];
  let patientIndex = 0;
  
  // Create uniform hexagonal grid
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Calculate position with proper hexagonal offset
      const offsetX = (row % 2) * (hexWidth / 2);
      const x = col * hexWidth + hexWidth / 2 + offsetX;
      const y = row * hexHeight + hexRadius;
      
      // Skip hexagons that are completely outside bounds
      if (x - hexRadius > width || y - hexRadius > height || x + hexRadius < 0 || y + hexRadius < 0) {
        continue;
      }
      
      if (patientIndex < points.length) {
        // Real patient data
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
      } else {
        // Synthetic data for visual completeness - distributed evenly
        const severities: ('Mild' | 'Moderate' | 'Severe')[] = ['Mild', 'Moderate', 'Severe'];
        const randomSeverity = severities[Math.floor(Math.random() * severities.length)];
        const solidColor = getSeverityColor(randomSeverity);
        
        const syntheticPatient: PatientMapPoint = {
          id: `synthetic-${row}-${col}`,
          name: 'Population Data',
          x,
          y,
          severity: randomSeverity,
          primaryDiagnosis: 'Various Conditions',
          age: Math.floor(Math.random() * 60) + 20,
          lastVisit: new Date().toISOString().split('T')[0]
        };
        
        const hexData: HexbinPoint = {
          ...syntheticPatient,
          count: 1,
          patients: [syntheticPatient],
          solidColor,
          isRealPatient: false
        };
        
        hexbinData.push(hexData);
      }
    }
  }
  
  return hexbinData;
};

export const getSeverityColor = (severity: string): string => {
  switch (severity) {
    case 'Severe': return '#dc2626'; // Red
    case 'Moderate': return '#eab308'; // Gold instead of orange
    case 'Mild': return '#059669'; // Green
    default: return '#6b7280';
  }
};
