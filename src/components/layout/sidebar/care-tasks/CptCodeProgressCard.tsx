
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CptCodeInfo } from './types';

interface CptCodeProgressCardProps {
  cptCode: string;
  cptCodeInfo: CptCodeInfo;
  completedMinutes: number;
  totalRequiredMinutes: number;
  className?: string;
}

export const CptCodeProgressCard: React.FC<CptCodeProgressCardProps> = ({ 
  cptCode, 
  cptCodeInfo, 
  completedMinutes, 
  totalRequiredMinutes,
  className = ''
}) => {
  // Check if cptCodeInfo is defined before accessing properties
  if (!cptCodeInfo) {
    return null;
  }
  
  const progressPercentage = (completedMinutes / totalRequiredMinutes) * 100;
  const remainingMinutes = totalRequiredMinutes - completedMinutes;
  
  return (
    <div className={`p-3 bg-gray-50 rounded-lg border border-gray-100 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge className={cptCode === '99490' ? "bg-blue-50 text-blue-700 border-blue-100 font-mono text-xs px-1.5 py-0.5" : "bg-purple-50 text-purple-700 border-purple-100 font-mono text-xs px-1.5 py-0.5"}>
              {cptCode}
            </Badge>
            <h5 className="font-medium text-sm">{cptCodeInfo.description}</h5>
          </div>
          <p className="text-xs text-gray-500">Required: {totalRequiredMinutes} min/month</p>
        </div>
        <div className="text-right">
          <p className="font-medium text-sm">
            {completedMinutes}/{totalRequiredMinutes}
          </p>
          <p className="text-xs text-gray-500">minutes</p>
        </div>
      </div>
      
      <div className="mb-2">
        <Progress value={progressPercentage} className="h-1.5" />
      </div>
      
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>{cptCodeInfo.rateInfo}</span>
        <span>{remainingMinutes} min remaining</span>
      </div>
    </div>
  );
};
