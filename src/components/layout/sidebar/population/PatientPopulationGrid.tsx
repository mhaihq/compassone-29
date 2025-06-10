
import React from 'react';
import { PatientSummary } from '@/data/patientsData';
import { PatientTile } from './PatientTile';
import { 
  organizePatientsByGrid, 
  getGridCellColor, 
  calculateDaysSinceVisit,
  SEVERITY_LEVELS,
  DAY_RANGES 
} from '@/utils/populationMapUtils';

interface PatientPopulationGridProps {
  patients: PatientSummary[];
  onPatientClick: (patientId: string) => void;
}

export const PatientPopulationGrid: React.FC<PatientPopulationGridProps> = ({
  patients,
  onPatientClick
}) => {
  const grid = organizePatientsByGrid(patients);
  const maxPatientCount = Math.max(...grid.flat().map(cell => cell.patients.length));

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-sm font-semibold text-[#1E4D36] mb-2">Patient Population Map</h3>
        <p className="text-xs text-gray-600">Organized by risk level and days since last visit</p>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Header row with day ranges */}
          <div className="grid grid-cols-5 gap-1 mb-2">
            <div className="text-xs font-medium text-gray-600 p-2"></div>
            {DAY_RANGES.map((range, index) => (
              <div key={index} className="text-xs font-medium text-gray-600 p-2 text-center">
                {range.label}
              </div>
            ))}
          </div>

          {/* Grid rows */}
          {grid.map((row, severityIndex) => (
            <div key={severityIndex} className="grid grid-cols-5 gap-1 mb-1">
              {/* Severity level label */}
              <div className="text-xs font-medium text-gray-600 p-2 flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${
                  SEVERITY_LEVELS[severityIndex] === 'Severe' ? 'bg-red-500' :
                  SEVERITY_LEVELS[severityIndex] === 'Moderate' ? 'bg-yellow-500' : 'bg-green-500'
                }`}></div>
                {SEVERITY_LEVELS[severityIndex]}
              </div>

              {/* Grid cells */}
              {row.map((cell, dayIndex) => (
                <div
                  key={dayIndex}
                  className={`
                    min-h-[80px] p-2 rounded-lg border-2 transition-all duration-200
                    ${getGridCellColor(cell.patients.length, maxPatientCount)}
                  `}
                >
                  <div className="flex flex-wrap gap-1 justify-center items-start">
                    {cell.patients.slice(0, 6).map((patient) => (
                      <PatientTile
                        key={patient.id}
                        patient={patient}
                        onPatientClick={onPatientClick}
                        daysSinceVisit={calculateDaysSinceVisit(patient.lastVisit)}
                      />
                    ))}
                    {cell.patients.length > 6 && (
                      <div className="w-12 h-12 rounded-lg bg-gray-300 flex items-center justify-center text-xs font-medium text-gray-700">
                        +{cell.patients.length - 6}
                      </div>
                    )}
                  </div>
                  {cell.patients.length > 0 && (
                    <div className="text-xs text-gray-600 text-center mt-1">
                      {cell.patients.length} patient{cell.patients.length !== 1 ? 's' : ''}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="bg-gray-50 p-3 rounded-lg">
        <div className="text-xs font-medium text-gray-700 mb-2">Legend:</div>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <div className="font-medium mb-1">Risk Levels:</div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Mild Risk</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>Moderate Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>High Risk</span>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Cell Density:</div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded bg-gray-50 border"></div>
              <span>No patients</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded bg-blue-200"></div>
              <span>Low density</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-blue-400"></div>
              <span>High density</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
