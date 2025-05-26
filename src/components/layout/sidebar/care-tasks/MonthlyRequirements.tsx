
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CptCodeProgressCard } from './CptCodeProgressCard';
import { CptCodeInfo } from './types';

interface MonthlyRequirementsProps {
  cptCodeInfo: Record<string, CptCodeInfo>;
  completedMinutes: Record<string, number>;
  totalRequiredMinutes: Record<string, number>;
}

export const MonthlyRequirements: React.FC<MonthlyRequirementsProps> = ({ 
  cptCodeInfo, 
  completedMinutes, 
  totalRequiredMinutes 
}) => {
  // Get available CPT codes from the data
  const cptCodes = Object.keys(cptCodeInfo || {});
  
  // If no data, don't render anything
  if (!cptCodes.length) {
    return null;
  }
  
  return (
    <Card className="bg-white rounded-lg shadow-sm hover-scale animate-fade-in">
      <CardContent className="p-3">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-base text-hana-green">Monthly Requirements</h4>
          <Badge className="bg-blue-50 text-blue-600 border-blue-100 text-xs px-2 py-0.5">
            April 2025
          </Badge>
        </div>
        
        <div className="space-y-3">
          {cptCodes.map((cptCode, index) => (
            <CptCodeProgressCard 
              key={cptCode}
              cptCode={cptCode}
              cptCodeInfo={cptCodeInfo[cptCode]}
              completedMinutes={completedMinutes[cptCode] || 0}
              totalRequiredMinutes={totalRequiredMinutes[cptCode] || 0}
              className={`delay-${index * 100} animate-fade-in`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
