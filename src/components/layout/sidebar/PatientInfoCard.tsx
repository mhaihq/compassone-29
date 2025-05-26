
import React from 'react';
import { User, Calendar, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PatientData } from '@/data/patientData';

interface PatientInfoCardProps {
  patientData: PatientData;
  patientAge: number;
  lastContactedFormatted: string;
  medicalConditions: string[];
}

export const PatientInfoCard: React.FC<PatientInfoCardProps> = ({
  patientData,
  patientAge,
  lastContactedFormatted,
  medicalConditions
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      {/* Patient Information Row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#1E4D36]" />
            <span className="font-medium text-gray-800">
              {patientData.name}
            </span>
          </div>
          <Badge variant="outline" className="bg-white border-[#1E4D36] text-[#1E4D36]">
            {patientAge} y/o • {patientData.gender}
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="w-3 h-3" />
          <span>Last contact: {lastContactedFormatted}</span>
        </div>
      </div>

      {/* Medical Conditions */}
      {medicalConditions.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {medicalConditions.map((condition, index) => (
            <Badge 
              key={index}
              variant="outline" 
              className="text-xs py-0 bg-white text-[#1E4D36] border-[#1E4D36]"
            >
              {condition}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};
