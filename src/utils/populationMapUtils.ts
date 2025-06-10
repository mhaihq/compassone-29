
import { PatientSummary } from '@/data/patientsData';

export interface GridCell {
  severityLevel: string;
  dayRange: string;
  patients: PatientSummary[];
  daysSinceVisit: number;
}

export const SEVERITY_LEVELS = ['Mild', 'Moderate', 'Severe'];
export const DAY_RANGES = [
  { label: '0-7 days', min: 0, max: 7 },
  { label: '8-30 days', min: 8, max: 30 },
  { label: '31-90 days', min: 31, max: 90 },
  { label: '90+ days', min: 91, max: Infinity }
];

export const calculateDaysSinceVisit = (lastVisitDate: string): number => {
  const lastVisit = new Date(lastVisitDate);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - lastVisit.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const organizePatientsByGrid = (patients: PatientSummary[]): GridCell[][] => {
  // Initialize grid
  const grid: GridCell[][] = [];
  
  SEVERITY_LEVELS.forEach((severity, severityIndex) => {
    const row: GridCell[] = [];
    DAY_RANGES.forEach((dayRange, dayIndex) => {
      row.push({
        severityLevel: severity,
        dayRange: dayRange.label,
        patients: [],
        daysSinceVisit: dayRange.min
      });
    });
    grid.push(row);
  });

  // Populate grid with patients
  patients.forEach(patient => {
    const daysSince = calculateDaysSinceVisit(patient.lastVisit);
    const severityIndex = SEVERITY_LEVELS.indexOf(patient.severity);
    const dayRangeIndex = DAY_RANGES.findIndex(range => 
      daysSince >= range.min && daysSince <= range.max
    );

    if (severityIndex !== -1 && dayRangeIndex !== -1) {
      grid[severityIndex][dayRangeIndex].patients.push(patient);
    }
  });

  return grid;
};

export const getGridCellColor = (patientCount: number, maxCount: number): string => {
  if (patientCount === 0) return 'bg-gray-50 border-gray-200';
  
  const intensity = patientCount / maxCount;
  if (intensity <= 0.25) return 'bg-blue-100 border-blue-200';
  if (intensity <= 0.5) return 'bg-blue-200 border-blue-300';
  if (intensity <= 0.75) return 'bg-blue-300 border-blue-400';
  return 'bg-blue-400 border-blue-500';
};
