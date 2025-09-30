
import React from 'react';
import { User, Calendar, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { PatientInteractionInsights } from '@/components/PatientInteractionInsights';
import { PatientDataSummary } from '@/services/patientService';

interface PatientInfoCardProps {
  patientSummary: PatientDataSummary;
  variant?: 'default' | 'compact';
}

export const PatientInfoCard: React.FC<PatientInfoCardProps> = ({
  patientSummary,
  variant = 'default'
}) => {
  const { patientData, patientAge, lastContactedFormatted, medicalConditions, insights } = patientSummary;

  if (variant === 'compact') {
    return (
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-3">
          <div className="flex items-start gap-2">
            <div className="bg-blue-100 p-1.5 rounded-full">
              <User className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 truncate text-sm">
                {patientData.name}
              </h3>
              <div className="flex items-center gap-3 mt-1 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{patientAge}y</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{lastContactedFormatted}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="p-4 bg-white space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Patient Information Card */}
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

        {/* Patient Interaction Insights */}
        <PatientInteractionInsights 
          insights={insights} 
          variant="compact" 
        />
      </div>
    </div>
  );
};
