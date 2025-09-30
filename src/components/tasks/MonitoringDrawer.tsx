import React, { useState, useEffect } from 'react';
import { EnhancedPopulationTask } from '@/types/enhancedTask';
import { useToast } from '@/hooks/use-toast';
import { MonitoringStepHeader } from './monitoring/MonitoringStepHeader';
import { RiskAssessmentStep } from './monitoring/RiskAssessmentStep';
import { EvidenceReviewStep } from './monitoring/EvidenceReviewStep';
import { CareDecisionStep } from './monitoring/CareDecisionStep';
import { MonitoringFinalizeStep } from './monitoring/MonitoringFinalizeStep';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

interface MonitoringDrawerProps {
  task: EnhancedPopulationTask;
  open: boolean;
  onClose: () => void;
}

export const MonitoringDrawer: React.FC<MonitoringDrawerProps> = ({
  task,
  open,
  onClose
}) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<'assessment' | 'evidence' | 'decision' | 'finalize'>('assessment');
  const [isCompleted, setIsCompleted] = useState(false);
  const [finalConfirmation, setFinalConfirmation] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (open) {
      const interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setTimer(0);
      setCurrentStep('assessment');
      setIsCompleted(false);
      setFinalConfirmation(false);
    }
  }, [open]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNextStep = () => {
    if (currentStep === 'assessment') {
      setCurrentStep('evidence');
    } else if (currentStep === 'evidence') {
      setCurrentStep('decision');
    } else if (currentStep === 'decision') {
      setCurrentStep('finalize');
    }
  };

  const handleBackStep = () => {
    if (currentStep === 'evidence') {
      setCurrentStep('assessment');
    } else if (currentStep === 'decision') {
      setCurrentStep('evidence');
    } else if (currentStep === 'finalize') {
      setCurrentStep('decision');
    }
  };

  const handleComplete = () => {
    if (!finalConfirmation) {
      toast({
        title: "Confirmation Required",
        description: "Please confirm that all information is accurate before submitting.",
        variant: "destructive"
      });
      return;
    }

    setIsCompleted(true);
    
    toast({
      title: "Review Completed Successfully",
      description: `Monitoring review completed in ${formatTime(timer)}.`,
    });

    setTimeout(() => {
      onClose();
    }, 1500);
  };

  if (isCompleted) {
    return (
      <Card className="m-4">
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-emerald-900 mb-2">
              Review Completed
            </h3>
            <p className="text-muted-foreground">
              Patient monitoring review has been successfully documented.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <MonitoringStepHeader
        timer={timer}
        formatTime={formatTime}
        currentStep={currentStep}
      />

      {currentStep === 'assessment' && (
        <RiskAssessmentStep
          task={task}
          onNext={handleNextStep}
        />
      )}

      {currentStep === 'evidence' && (
        <EvidenceReviewStep
          task={task}
          onNext={handleNextStep}
          onBack={handleBackStep}
        />
      )}

      {currentStep === 'decision' && (
        <CareDecisionStep
          onNext={handleNextStep}
          onBack={handleBackStep}
        />
      )}

      {currentStep === 'finalize' && (
        <MonitoringFinalizeStep
          timer={timer}
          finalConfirmation={finalConfirmation}
          onConfirmationChange={setFinalConfirmation}
          onComplete={handleComplete}
          onBack={handleBackStep}
        />
      )}
    </div>
  );
};
