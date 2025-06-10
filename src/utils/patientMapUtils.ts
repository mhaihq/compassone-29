
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
  gradientColor: string;
  isRealPatient: boolean;
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

export const createSmoothHexbinData = (
  points: PatientMapPoint[], 
  width: number, 
  height: number, 
  hexRadius: number = 6
): HexbinPoint[] => {
  const hexWidth = hexRadius * 2 * 0.866;
  const hexHeight = hexRadius * 1.5;
  
  // Calculate grid dimensions for tighter packing
  const cols = Math.floor(width / hexWidth) + 2;
  const rows = Math.floor(height / hexHeight) + 2;
  
  // Create color interpolation for smooth gradient
  const colorScale = d3.scaleLinear<string>()
    .domain([0, 0.5, 1])
    .range(['#dc2626', '#d97706', '#059669']); // Red -> Orange -> Green
  
  const hexbinData: HexbinPoint[] = [];
  let patientIndex = 0;
  
  // Create hexagonal grid with smooth gradient
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Calculate position with offset for hexagonal packing
      const offsetX = (row % 2) * (hexWidth / 2);
      const x = col * hexWidth + hexWidth / 2 + offsetX;
      const y = row * hexHeight + hexRadius;
      
      // Skip hexagons outside bounds
      if (x + hexRadius > width || y + hexRadius > height || x - hexRadius < 0 || y - hexRadius < 0) {
        continue;
      }
      
      // Calculate gradient position (0 = bottom/severe, 1 = top/mild)
      const normalizedY = 1 - (row / (rows - 1));
      const gradientColor = colorScale(normalizedY);
      
      // Assign real patient or create synthetic based on availability
      let hexData: HexbinPoint;
      const isRealPatient = patientIndex < points.length;
      
      if (isRealPatient) {
        const patient = points[patientIndex];
        hexData = {
          ...patient,
          x,
          y,
          count: 1,
          patients: [{ ...patient, x, y }],
          gradientColor,
          isRealPatient: true
        };
        patientIndex++;
      } else {
        // Create synthetic hexagon for visual density
        const syntheticSeverity = normalizedY > 0.67 ? 'Mild' : 
                                 normalizedY > 0.33 ? 'Moderate' : 'Severe';
        
        hexData = {
          id: `synthetic-${row}-${col}`,
          name: 'Background',
          x,
          y,
          severity: syntheticSeverity,
          primaryDiagnosis: 'Background',
          age: 0,
          lastVisit: '2025-01-01',
          count: 0,
          patients: [],
          gradientColor,
          isRealPatient: false
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
    case 'Mild': return '#059669'; // emerald-600
    default: return '#6b7280'; // gray-500
  }
};
