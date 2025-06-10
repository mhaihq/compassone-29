
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
  // Calculate grid dimensions for a denser layout
  const patientCount = patients.length;
  const cols = Math.ceil(Math.sqrt(patientCount * 1.3)); // More square-like grid
  const rows = Math.ceil(patientCount / cols);
  
  // Group patients by severity for better distribution
  const severityGroups = {
    'Severe': patients.filter(p => p.severity === 'Severe'),
    'Moderate': patients.filter(p => p.severity === 'Moderate'),
    'Mild': patients.filter(p => p.severity === 'Mild')
  };
  
  let gridIndex = 0;
  const mapPoints: PatientMapPoint[] = [];
  
  // Distribute patients more evenly across the grid
  const severeCount = severityGroups['Severe'].length;
  const moderateCount = severityGroups['Moderate'].length;
  const mildCount = severityGroups['Mild'].length;
  
  // Calculate rows per severity group
  const topRows = Math.ceil((severeCount / patientCount) * rows);
  const middleRows = Math.ceil((moderateCount / patientCount) * rows);
  const bottomRows = rows - topRows - middleRows;
  
  let currentRow = 0;
  
  ['Severe', 'Moderate', 'Mild'].forEach((severity, severityIndex) => {
    const patientsInSeverity = severityGroups[severity as keyof typeof severityGroups];
    let rowsForThisSeverity;
    
    if (severityIndex === 0) rowsForThisSeverity = topRows;
    else if (severityIndex === 1) rowsForThisSeverity = middleRows;
    else rowsForThisSeverity = bottomRows;
    
    patientsInSeverity.forEach((patient, index) => {
      const positionInGroup = index;
      const patientsPerRow = Math.ceil(patientsInSeverity.length / rowsForThisSeverity);
      
      const col = positionInGroup % cols;
      const localRow = Math.floor(positionInGroup / cols);
      const adjustedRow = currentRow + Math.min(localRow, rowsForThisSeverity - 1);
      
      mapPoints.push({
        id: patient.id,
        name: patient.name,
        x: col / Math.max(cols - 1, 1), // Normalized 0-1
        y: adjustedRow / Math.max(rows - 1, 1), // Normalized 0-1
        severity: patient.severity,
        primaryDiagnosis: patient.primaryDiagnosis,
        age: calculateAge(patient.dateOfBirth),
        lastVisit: patient.lastVisit,
        gridCol: col,
        gridRow: adjustedRow
      });
    });
    
    currentRow += rowsForThisSeverity;
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
  hexRadius: number = 15
): HexbinPoint[] => {
  // Calculate grid cell size based on actual data
  const cols = Math.max(...points.map(p => p.gridCol)) + 1;
  const rows = Math.max(...points.map(p => p.gridRow)) + 1;
  
  // Make cells smaller to fit more hexagons
  const cellWidth = (width - 2 * hexRadius) / Math.max(cols - 1, 1);
  const cellHeight = (height - 2 * hexRadius) / Math.max(rows - 1, 1);
  
  // Calculate optimal hexagon size
  const adjustedHexRadius = Math.min(
    hexRadius,
    Math.min(cellWidth, cellHeight) / 2.5 // Smaller hexagons for denser packing
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
