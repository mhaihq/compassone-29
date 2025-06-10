
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
  gridCol: number;
  gridRow: number;
}

export interface HexbinPoint extends PatientMapPoint {
  count: number;
  patients: PatientMapPoint[];
}

export const transformPatientsToMapPoints = (patients: PatientSummary[]): PatientMapPoint[] => {
  // Calculate grid dimensions based on patient count
  const patientCount = patients.length;
  const cols = Math.ceil(Math.sqrt(patientCount * 1.8)); // Wider grid for more density
  const rows = Math.ceil(patientCount / cols);
  
  // Group patients by severity for better distribution
  const severityGroups = {
    'Severe': patients.filter(p => p.severity === 'Severe'),
    'Moderate': patients.filter(p => p.severity === 'Moderate'),
    'Mild': patients.filter(p => p.severity === 'Mild')
  };
  
  let gridIndex = 0;
  const mapPoints: PatientMapPoint[] = [];
  
  // Distribute severe patients in top rows
  const topRows = Math.ceil(rows * 0.3);
  const middleRows = Math.ceil(rows * 0.4);
  
  ['Severe', 'Moderate', 'Mild'].forEach((severity) => {
    const patientsInSeverity = severityGroups[severity as keyof typeof severityGroups];
    
    patientsInSeverity.forEach((patient) => {
      const col = gridIndex % cols;
      const row = Math.floor(gridIndex / cols);
      
      // Adjust row based on severity
      let adjustedRow = row;
      if (severity === 'Severe') {
        adjustedRow = Math.min(row, topRows - 1);
      } else if (severity === 'Moderate') {
        adjustedRow = topRows + Math.min(row, middleRows - 1);
      } else {
        adjustedRow = topRows + middleRows + row;
      }
      
      mapPoints.push({
        id: patient.id,
        name: patient.name,
        x: col / (cols - 1), // Normalized 0-1
        y: adjustedRow / (rows - 1), // Normalized 0-1
        severity: patient.severity,
        primaryDiagnosis: patient.primaryDiagnosis,
        age: calculateAge(patient.dateOfBirth),
        lastVisit: patient.lastVisit,
        gridCol: col,
        gridRow: adjustedRow
      });
      
      gridIndex++;
    });
  });
  
  return mapPoints;
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
  // Calculate grid cell size
  const cols = Math.max(...points.map(p => p.gridCol)) + 1;
  const rows = Math.max(...points.map(p => p.gridRow)) + 1;
  
  const cellWidth = (width - 2 * hexRadius) / Math.max(cols - 1, 1);
  const cellHeight = (height - 2 * hexRadius) / Math.max(rows - 1, 1);
  
  // Calculate hexagon size based on grid density
  const adjustedHexRadius = Math.min(
    hexRadius,
    Math.min(cellWidth, cellHeight) / 2 * 0.95 // Slightly smaller to ensure spacing
  );
  
  return points.map(point => {
    // Position hexagon in center of its grid cell
    const x = hexRadius + (point.gridCol * cellWidth);
    const y = hexRadius + (point.gridRow * cellHeight);
    
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
