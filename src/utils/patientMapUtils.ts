
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
  hexRadius: number = 4
): HexbinPoint[] => {
  const hexWidth = hexRadius * 2 * 0.866;
  const hexHeight = hexRadius * 1.5;
  
  // Calculate grid dimensions with tighter packing
  const cols = Math.floor(width / hexWidth) + 2;
  const rows = Math.floor(height / hexHeight) + 2;
  
  const hexbinData: HexbinPoint[] = [];
  let patientIndex = 0;
  
  // Create hexagonal grid - fill as much as possible
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Calculate position with offset for hexagonal packing
      const offsetX = (row % 2) * (hexWidth / 2);
      const x = col * hexWidth + hexRadius + offsetX;
      const y = row * hexHeight + hexRadius;
      
      // Skip hexagons outside bounds but be more generous with bounds
      if (x + hexRadius > width + hexRadius/2 || y + hexRadius > height + hexRadius/2 || 
          x - hexRadius < -hexRadius/2 || y - hexRadius < -hexRadius/2) {
        continue;
      }
      
      // Create hexagons for real patients first, then fill with synthetic ones
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
      } else {
        // Fill remaining space with synthetic patients for visual density
        const severities: ('Mild' | 'Moderate' | 'Severe')[] = ['Mild', 'Moderate', 'Severe'];
        const randomSeverity = severities[Math.floor(Math.random() * severities.length)];
        const solidColor = getSeverityColor(randomSeverity);
        
        const syntheticPatient: PatientMapPoint = {
          id: `synthetic-${row}-${col}`,
          name: `Patient ${row}-${col}`,
          x,
          y,
          severity: randomSeverity,
          primaryDiagnosis: 'General Care',
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
    case 'Severe': return '#dc2626'; // red-600
    case 'Moderate': return '#d97706'; // amber-600
    case 'Mild': return '#059669'; // emerald-600
    default: return '#6b7280'; // gray-500
  }
};
