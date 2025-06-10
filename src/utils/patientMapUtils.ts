
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

// Generate additional synthetic patients to increase hexagon count
const generateSyntheticPatients = (startId: number, count: number): PatientSummary[] => {
  const diagnoses = [
    'Hypertension', 'Type 2 Diabetes', 'Anxiety Disorder', 'Depression', 
    'Chronic Kidney Disease', 'COPD', 'Arthritis', 'Heart Disease',
    'Asthma', 'Migraine', 'Obesity', 'Sleep Apnea', 'Fibromyalgia'
  ];
  
  const severities = ['Mild', 'Moderate', 'Severe'] as const;
  const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Lisa', 'Robert', 'Emily', 'James', 'Ashley'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
  
  const patients: PatientSummary[] = [];
  
  for (let i = 0; i < count; i++) {
    const patientId = `P${(startId + i).toString().padStart(6, '0')}`;
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const age = Math.floor(Math.random() * 60) + 18; // Age between 18-78
    const birthYear = new Date().getFullYear() - age;
    const severity = severities[Math.floor(Math.random() * severities.length)];
    const diagnosis = diagnoses[Math.floor(Math.random() * diagnoses.length)];
    
    // Generate a recent date for last visit (within last 6 months)
    const lastVisitDate = new Date();
    lastVisitDate.setDate(lastVisitDate.getDate() - Math.floor(Math.random() * 180));
    
    patients.push({
      id: patientId,
      name: `${firstName} ${lastName}`,
      dateOfBirth: `${birthYear}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      severity,
      primaryDiagnosis: diagnosis,
      lastVisit: lastVisitDate.toISOString().split('T')[0]
    });
  }
  
  return patients;
};

export const transformPatientsToMapPoints = (patients: PatientSummary[]): PatientMapPoint[] => {
  // Add synthetic patients to increase the count significantly
  const syntheticPatients = generateSyntheticPatients(100721, 150); // Add 150 more patients
  const allPatients = [...patients, ...syntheticPatients];
  
  return allPatients.map(patient => {
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
  
  // Sort patients by severity: Severe first, then Moderate, then Mild
  const sortedPoints = [...points].sort((a, b) => {
    const severityOrder = { 'Severe': 0, 'Moderate': 1, 'Mild': 2 };
    return severityOrder[a.severity] - severityOrder[b.severity];
  });
  
  // Calculate optimal grid dimensions
  const patientCount = sortedPoints.length;
  const cols = Math.ceil(Math.sqrt(patientCount * 1.3)); // Slightly wider grid
  const rows = Math.ceil(patientCount / cols);
  
  // Calculate spacing to fit within bounds with padding
  const padding = 15;
  const hexWidth = hexRadius * 2 * 0.866; // Width of hexagon
  const hexHeight = hexRadius * 1.5; // Height between hex centers
  
  const totalGridWidth = cols * hexWidth + (cols - 1) * hexRadius * 0.2;
  const totalGridHeight = rows * hexHeight;
  
  // Scale to fit if needed
  const scaleX = Math.min(1, (width - padding * 2) / totalGridWidth);
  const scaleY = Math.min(1, (height - padding * 2) / totalGridHeight);
  const scale = Math.min(scaleX, scaleY);
  
  const scaledHexRadius = hexRadius * scale;
  const scaledHexWidth = scaledHexRadius * 2 * 0.866;
  const scaledHexHeight = scaledHexRadius * 1.5;
  
  // Center the grid
  const startX = (width - (cols - 1) * scaledHexWidth * 1.1) / 2;
  const startY = (height - (rows - 1) * scaledHexHeight) / 2;
  
  const hexbinData: HexbinPoint[] = [];
  
  // Create hex grid for sorted patients
  for (let i = 0; i < sortedPoints.length; i++) {
    const patient = sortedPoints[i];
    const row = Math.floor(i / cols);
    const col = i % cols;
    
    // Calculate position with hex offset pattern
    const offsetX = (row % 2) * (scaledHexWidth * 0.5);
    const x = startX + col * scaledHexWidth * 1.1 + offsetX;
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
