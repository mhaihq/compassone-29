
import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, CheckCircle, User, FileText, Target } from 'lucide-react';

interface StabilityReviewHeaderProps {
  timer: number;
  formatTime: (seconds: number) => string;
  currentStep: 'assessment' | 'documentation' | 'review';
  completedAssessments: number;
  totalAssessments: number;
}

export const StabilityReviewHeader: React.FC<StabilityReviewHeaderProps> = ({
  timer,
  formatTime,
  currentStep,
  completedAssessments,
  totalAssessments
}) => {
  const steps = [
    { key: 'assessment', label: 'Stability Check', icon: User },
    { key: 'documentation', label: 'Documentation', icon: FileText },
    { key: 'review', label: 'Final Review', icon: Target }
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="text-blue-600" size={24} />
            <div>
              <CardTitle className="text-xl">Monthly Stability Review</CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Simple 3-step assessment process
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <Badge className="bg-blue-50 text-blue-800 border-blue-200 font-mono">
                {formatTime(timer)}
              </Badge>
            </div>
          </div>
        </div>
        
        {/* Step Indicator */}
        <div className="flex items-center gap-4 mt-4">
          {steps.map((step, index) => {
            const isActive = currentStep === step.key;
            const isCompleted = 
              (step.key === 'assessment' && completedAssessments === totalAssessments) ||
              (step.key === 'documentation' && currentStep === 'review');
            
            return (
              <div key={step.key} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  isCompleted 
                    ? 'bg-green-100 text-green-700 border-2 border-green-300'
                    : isActive
                    ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                    : 'bg-gray-100 text-gray-500 border-2 border-gray-200'
                }`}>
                  {isCompleted ? <CheckCircle size={16} /> : <step.icon size={16} />}
                </div>
                <span className={`text-sm font-medium ${
                  isActive ? 'text-blue-700' : isCompleted ? 'text-green-700' : 'text-gray-500'
                }`}>
                  {step.label}
                </span>
                {index < 2 && <div className="w-8 h-0.5 bg-gray-200 mx-2" />}
              </div>
            );
          })}
        </div>
      </CardHeader>
    </Card>
  );
};
