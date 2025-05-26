
import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepProgressProps {
  currentStep: number;
  completedSteps: number[];
  steps: string[];
}

export const StepProgress: React.FC<StepProgressProps> = ({
  currentStep,
  completedSteps,
  steps
}) => {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = completedSteps.includes(stepNumber);
          const isCurrent = currentStep === stepNumber;
          const isAccessible = stepNumber <= currentStep || isCompleted;

          return (
            <div key={stepNumber} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium border-2 transition-all duration-200",
                    isCompleted
                      ? "bg-green-500 border-green-500 text-white shadow-sm"
                      : isCurrent
                      ? "bg-blue-500 border-blue-500 text-white shadow-md"
                      : isAccessible
                      ? "bg-white border-gray-300 text-gray-600 hover:border-gray-400"
                      : "bg-gray-50 border-gray-200 text-gray-400"
                  )}
                >
                  {isCompleted ? (
                    <Check size={14} />
                  ) : (
                    stepNumber
                  )}
                </div>
                <span
                  className={cn(
                    "mt-2 text-xs font-medium text-center max-w-20",
                    isCurrent
                      ? "text-blue-600"
                      : isCompleted
                      ? "text-green-600"
                      : "text-gray-500"
                  )}
                >
                  {step}
                </span>
              </div>
              
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-4 transition-colors duration-200",
                    isCompleted || (isCurrent && index + 1 < currentStep)
                      ? "bg-green-500"
                      : stepNumber < currentStep
                      ? "bg-blue-500"
                      : "bg-gray-200"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
