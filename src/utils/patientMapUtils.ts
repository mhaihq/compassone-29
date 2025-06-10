
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
    
    return {
      id: patient.id,
      name: patient.name,
      x: 0, // Will be set by createHexbinData
      y: 0, // Will be set by createHexbinData
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
  hexRadius: number = 12
): HexbinPoint[] => {
  if (points.length === 0) return [];
  
  // Calculate optimal grid dimensions
  const patientCount = points.length;
  const cols = Math.ceil(Math.sqrt(patientCount * 1.2)); // Slightly wider than square
  const rows = Math.ceil(patientCount / cols);
  
  // Calculate spacing to fit within bounds with padding
  const padding = 20;
  const hexWidth = hexRadius * 2 * 0.866; // Width of hexagon
  const hexHeight = hexRadius * 1.5; // Height between hex centers
  
  const totalGridWidth = cols * hexWidth + (cols - 1) * hexRadius * 0.3;
  const totalGridHeight = rows * hexHeight;
  
  // Scale to fit if needed
  const scaleX = Math.min(1, (width - padding * 2) / totalGridWidth);
  const scaleY = Math.min(1, (height - padding * 2) / totalGridHeight);
  const scale = Math.min(scaleX, scaleY);
  
  const scaledHexRadius = hexRadius * scale;
  const scaledHexWidth = scaledHexRadius * 2 * 0.866;
  const scaledHexHeight = scaledHexRadius * 1.5;
  
  // Center the grid
  const startX = (width - (cols - 1) * scaledHexWidth * 1.15) / 2;
  const startY = (height - (rows - 1) * scaledHexHeight) / 2;
  
  const hexbinData: HexbinPoint[] = [];
  
  // Create hex grid - only for actual patients
  for (let i = 0; i < points.length; i++) {
    const patient = points[i];
    const row = Math.floor(i / cols);
    const col = i % cols;
    
    // Calculate position with hex offset pattern
    const offsetX = (row % 2) * (scaledHexWidth * 0.5);
    const x = startX + col * scaledHexWidth * 1.15 + offsetX;
    const y = startY + row * scaledHexHeight;
    
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
  }
  
  return hexbinData;
};

export const getSeverityColor = (severity: string): string => {
  switch (severity) {
    case 'Severe': return '#dc2626'; // Red
    case 'Moderate': return '#eab308'; // Gold
    case 'Mild': return '#059669'; // Green
    default: return '#6b7280';
  }
};
