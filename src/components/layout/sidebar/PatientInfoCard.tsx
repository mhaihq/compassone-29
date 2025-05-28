
import React from 'react';
import { User, Calendar, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { PatientData } from '@/data/patientData';
import { PatientInteractionInsights } from '@/components/PatientInteractionInsights';
import { matteoInteractionInsights } from '@/data/interactionInsights';

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
    <div className="p-4 bg-white space-y-4">
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">
                {patientData.name}
              </h3>
              <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{patientAge} years old</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>Last: {lastContactedFormatted}</span>
                </div>
              </div>
              {medicalConditions.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {medicalConditions.slice(0, 3).map((condition, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {condition}
                    </Badge>
                  ))}
                  {medicalConditions.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{medicalConditions.length - 3} more
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <PatientInteractionInsights 
        insights={matteoInteractionInsights} 
        variant="compact" 
      />
    </div>
  );
};
