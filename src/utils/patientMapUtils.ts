
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
    // Calculate days since last visit for Y-axis positioning
    const lastVisitDate = new Date(patient.lastVisit);
    const today = new Date();
    const daysSinceLastVisit = Math.floor((today.getTime() - lastVisitDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Map severity to X-axis (with more spread)
    let severityX;
    switch (patient.severity) {
      case 'Severe': 
        severityX = 0.8 + (Math.random() - 0.5) * 0.3; // Right side with scatter
        break;
      case 'Moderate': 
        severityX = 0.5 + (Math.random() - 0.5) * 0.4; // Center with scatter
        break;
      case 'Mild': 
        severityX = 0.2 + (Math.random() - 0.5) * 0.3; // Left side with scatter
        break;
      default:
        severityX = 0.5;
    }
    
    // Map severity to Y-axis (inverted so severe is at top)
    // Also factor in days since last visit for additional positioning
    let severityY;
    switch (patient.severity) {
      case 'Severe': 
        severityY = 0.15 + Math.random() * 0.25; // Top area (red on top)
        break;
      case 'Moderate': 
        severityY = 0.35 + Math.random() * 0.3; // Middle area (yellow in middle)
        break;
      case 'Mild': 
        severityY = 0.7 + Math.random() * 0.25; // Bottom area (green at bottom)
        break;
      default:
        severityY = 0.5;
    }
    
    // Add some influence from days since last visit for more realistic scatter
    const daysFactor = Math.min(daysSinceLastVisit / 365, 1); // Normalize to 0-1 over a year
    const yWithDays = severityY + (daysFactor * 0.1) + (Math.random() - 0.5) * 0.15;
    
    return {
      id: patient.id,
      name: patient.name,
      x: Math.max(0.05, Math.min(0.95, severityX)), // Keep within bounds with margin
      y: Math.max(0.05, Math.min(0.95, yWithDays)), // Keep within bounds with margin
      severity: patient.severity,
      primaryDiagnosis: patient.primaryDiagnosis,
      age: calculateAge(patient.dateOfBirth),
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
  // Convert normalized coordinates to actual pixel positions
  return points.map(point => {
    const x = point.x * (width - 2 * hexRadius) + hexRadius;
    const y = point.y * (height - 2 * hexRadius) + hexRadius;
    
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
