
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
  const hexWidth = hexRadius * 2 * 0.866;
  const hexHeight = hexRadius * 1.5;
  
  // Define zones with white space separation
  const zoneHeight = height / 4; // Divide into 4 sections (3 colors + spacing)
  const zones = {
    severe: { start: height - zoneHeight, end: height, severity: 'Severe' as const },
    moderate: { start: height - 2.5 * zoneHeight, end: height - 1.5 * zoneHeight, severity: 'Moderate' as const },
    mild: { start: 0, end: zoneHeight, severity: 'Mild' as const }
  };
  
  // Group patients by severity
  const patientsBySeverity = {
    Severe: points.filter(p => p.severity === 'Severe'),
    Moderate: points.filter(p => p.severity === 'Moderate'),
    Mild: points.filter(p => p.severity === 'Mild')
  };
  
  const hexbinData: HexbinPoint[] = [];
  
  // Process each zone
  Object.entries(zones).forEach(([zoneName, zone]) => {
    const zonePatients = patientsBySeverity[zone.severity];
    const zoneActualHeight = zone.end - zone.start;
    
    // Calculate how many hexagons fit in this zone
    const colsInZone = Math.floor(width / hexWidth);
    const rowsInZone = Math.floor(zoneActualHeight / hexHeight);
    const hexagonsInZone = colsInZone * rowsInZone;
    
    // Create hexagons for this zone
    for (let i = 0; i < hexagonsInZone; i++) {
      const col = i % colsInZone;
      const row = Math.floor(i / colsInZone);
      
      // Calculate position within the zone
      const offsetX = (row % 2) * (hexWidth / 2);
      const x = col * hexWidth + hexWidth / 2 + offsetX;
      const y = zone.start + row * hexHeight + hexRadius;
      
      // Ensure hexagon stays within zone bounds
      const clampedX = Math.max(hexRadius, Math.min(width - hexRadius, x));
      const clampedY = Math.max(zone.start + hexRadius, Math.min(zone.end - hexRadius, y));
      
      let hexData: HexbinPoint;
      
      // Use real patient data if available, otherwise create synthetic
      if (i < zonePatients.length) {
        const patient = zonePatients[i];
        hexData = {
          ...patient,
          x: clampedX,
          y: clampedY,
          count: 1,
          patients: [{ ...patient, x: clampedX, y: clampedY }]
        };
      } else {
        // Create synthetic patient for visual density
        hexData = {
          id: `synthetic-${zone.severity}-${i}`,
          name: `Patient ${hexbinData.length + 1}`,
          x: clampedX,
          y: clampedY,
          severity: zone.severity,
          primaryDiagnosis: 'General Care',
          age: Math.floor(Math.random() * 60) + 20,
          lastVisit: '2025-05-01',
          count: 1,
          patients: [{
            id: `synthetic-${zone.severity}-${i}`,
            name: `Patient ${hexbinData.length + 1}`,
            x: clampedX,
            y: clampedY,
            severity: zone.severity,
            primaryDiagnosis: 'General Care',
            age: Math.floor(Math.random() * 60) + 20,
            lastVisit: '2025-05-01'
          }]
        };
      }
      
      hexbinData.push(hexData);
    }
  });
  
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
