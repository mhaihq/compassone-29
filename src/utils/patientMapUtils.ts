
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

export interface ClusterPoint extends PatientMapPoint {
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

export const createClusterData = (
  points: PatientMapPoint[], 
  width: number, 
  height: number, 
  clusterRadius: number = 25
): ClusterPoint[] => {
  // Scale points to svg dimensions
  const scaledPoints = points.map(p => ({
    ...p,
    x: p.x * width,
    y: p.y * height
  }));
  
  const clusters: ClusterPoint[] = [];
  const processedPoints = new Set<number>();
  
  scaledPoints.forEach((point, index) => {
    if (processedPoints.has(index)) return;
    
    // Find nearby points within cluster radius
    const nearbyPoints = scaledPoints.filter((otherPoint, otherIndex) => {
      if (processedPoints.has(otherIndex)) return false;
      
      const dx = point.x - otherPoint.x;
      const dy = point.y - otherPoint.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      return distance <= clusterRadius;
    });
    
    // Mark all nearby points as processed
    nearbyPoints.forEach((nearbyPoint) => {
      const nearbyIndex = scaledPoints.findIndex(p => p.id === nearbyPoint.id);
      if (nearbyIndex !== -1) {
        processedPoints.add(nearbyIndex);
      }
    });
    
    // Calculate cluster center
    const centerX = nearbyPoints.reduce((sum, p) => sum + p.x, 0) / nearbyPoints.length;
    const centerY = nearbyPoints.reduce((sum, p) => sum + p.y, 0) / nearbyPoints.length;
    
    // Use the first patient as representative data
    const representative = nearbyPoints[0];
    
    clusters.push({
      ...representative,
      x: centerX,
      y: centerY,
      count: nearbyPoints.length,
      patients: nearbyPoints
    });
  });
  
  return clusters;
};

export const getSeverityColor = (severity: string): string => {
  switch (severity) {
    case 'Severe': return '#dc2626'; // red-600
    case 'Moderate': return '#d97706'; // amber-600
    case 'Mild': return '#16a34a'; // green-600
    default: return '#6b7280'; // gray-500
  }
};
