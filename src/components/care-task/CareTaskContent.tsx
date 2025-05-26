import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, Clock, Play, Pause, User
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { StepProgress } from '@/components/ui/step-progress';
import { RiskAssessmentStep } from '@/components/care-task/RiskAssessmentStep';
import { CarePlanStep } from '@/components/care-task/CarePlanStep';
import { FollowUpStep } from '@/components/care-task/FollowUpStep';
import { FinalizeStep } from '@/components/care-task/FinalizeStep';
import { useNavigate } from 'react-router-dom';

// Sample data - would come from an API or context in a real app
const careTasksData = {
  'T-1001': {
    id: 'T-1001',
    title: 'PHQ-9 Score Increased',
    description: 'Score increased from 8 to 13',
    category: 'Mental-health',
    categoryColor: 'pink',
    minutes: 10,
    insight: 'Flagged by AI from Apr 3 call — mentions job stress',
    status: 'urgent',
    cptCode: '99484',
    cptDescription: 'Behavioral Health Integration',
    patientId: 'P100592',
    patientName: 'Sthita Pujari',
    flagReason: 'Patient reported increased feelings of depression and anxiety during the regular check-in call.',
    evidenceFromCall: [
      {
        text: "I'm feeling more overwhelmed than usual with work lately.",
        timestamp: "2:34",
        importance: "high"
      },
      {
        text: "Some days I just don't have the energy to get out of bed.",
        timestamp: "4:15",
        importance: "high"
      },
      {
        text: "I've been having trouble sleeping through the night.",
        timestamp: "6:22",
        importance: "medium"
      }
    ],
    audioUrl: "#",
    transcript: "AI: How have you been feeling lately?\nPatient: Not great, to be honest. I'm feeling more overwhelmed than usual with work lately.\nAI: I'm sorry to hear that. Can you tell me more about what's been going on?\nPatient: Work has been really stressful. Some days I just don't have the energy to get out of bed. I've been having trouble sleeping through the night too.",
    suggestedActions: [
      { id: 'action-1', text: 'Schedule call with behavioral health specialist', default: true },
      { id: 'action-2', text: 'Adjust current medication dosage (consult with doctor)', default: true },
      { id: 'action-3', text: 'Provide resources for stress management techniques', default: true },
      { id: 'action-4', text: 'Recommend sleep hygiene practices', default: false }
    ]
  },
  'T-1002': {
    id: 'T-1002',
    title: 'Missed Medications This Week',
    description: '2 doses of Lisinopril missed (Apr 3-4)',
    category: 'Medication',
    categoryColor: 'yellow',
    minutes: 5,
    insight: 'Flagged by Adherence Agent — 11% drop in last 30 days',
    status: 'assigned',
    cptCode: '99490',
    cptDescription: 'Chronic Care Management',
    patientId: 'P100592',
    patientName: 'Sthita Pujari',
    flagReason: 'Patient missed 2 doses of Lisinopril (Apr 3-4), which is part of their hypertension management plan.',
    evidenceFromCall: [
      {
        text: "I forgot to take my blood pressure medication two days in a row.",
        timestamp: "1:45",
        importance: "high"
      },
      {
        text: "I've been out of my normal routine because of family visiting.",
        timestamp: "2:30",
        importance: "medium"
      }
    ],
    audioUrl: "#",
    transcript: "AI: How have you been with your medications this week?\nPatient: I forgot to take my blood pressure medication two days in a row.\nAI: I see. Was there a particular reason for that?\nPatient: I've been out of my normal routine because of family visiting. I usually take it with breakfast but we've been going out to eat.",
    suggestedActions: [
      { id: 'action-1', text: 'Set up medication reminder system', default: true },
      { id: 'action-2', text: 'Educate on importance of consistent Lisinopril use', default: true },
      { id: 'action-3', text: 'Create backup plan for routine disruptions', default: false }
    ]
  }
};

const STEPS = ['Risk Assessment', 'Care Plan', 'Follow-up', 'Finalize'];

interface CareTaskContentProps {
  taskId: string;
  onComplete?: () => void;
}

export const CareTaskContent: React.FC<CareTaskContentProps> = ({ taskId, onComplete }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [task, setTask] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAudioDialog, setShowAudioDialog] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [manualAction, setManualAction] = useState("");
  const [summary, setSummary] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [riskApproved, setRiskApproved] = useState<boolean | null>(null);
  const [evidenceStatuses, setEvidenceStatuses] = useState<Record<string, 'pending' | 'saved' | 'rejected'>>({});
  const [soapNote, setSoapNote] = useState({
    subjective: '',
    objective: '',
    assessment: '',
    plan: ''
  });

  // Mock data fetching
  useEffect(() => {
    if (taskId && careTasksData[taskId as keyof typeof careTasksData]) {
      const taskData = careTasksData[taskId as keyof typeof careTasksData];
      setTask(taskData);
      
      // Set initial selected actions based on default values
      const initialSelectedActions = taskData.suggestedActions
        .filter(action => action.default)
        .map(action => action.id);
      
      setSelectedActions(initialSelectedActions);
      
      // Generate initial SOAP note based on evidence
      const evidenceText = taskData.evidenceFromCall.map(e => e.text).join('. ');
      setSoapNote({
        subjective: `Patient reports: ${evidenceText}`,
        objective: `PHQ-9 score increased from 8 to 13. Patient accessed via telehealth call on ${new Date().toLocaleDateString()}.`,
        assessment: `${taskData.title} - ${taskData.description}. ${taskData.flagReason}`,
        plan: 'Schedule follow-up call with behavioral health specialist. Review current medication regimen. Provide stress management resources. Monitor sleep patterns and energy levels.'
      });
      
      // Generate initial summary
      const actionTexts = taskData.suggestedActions
        .filter(action => action.default)
        .map(action => action.text);
        
      setSummary(
        `Addressed ${taskData.title} by implementing: ${actionTexts.join(", ")}. ` +
        `Patient reported ${taskData.evidenceFromCall[0].text.toLowerCase()} ` +
        `Will follow-up to monitor progress.`
      );
    }
    setIsLoading(false);
  }, [taskId]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Format time function
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Handle patient name click
  const handlePatientNameClick = () => {
    if (task?.patientId) {
      // Navigate to patient detail page in the population context
      navigate(`/patient/${task.patientId}`);
    }
  };

  // Step navigation functions
  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCompletedSteps(prev => [...prev, currentStep]);
      setCurrentStep(currentStep + 1);
    }
  };

  const goToStep = (stepNumber: number) => {
    if (stepNumber <= currentStep || completedSteps.includes(stepNumber)) {
      setCurrentStep(stepNumber);
    }
  };

  // Evidence handling functions
  const handleEvidenceAction = (evidenceIndex: number, action: 'save' | 'reject') => {
    setEvidenceStatuses(prev => ({
      ...prev,
      [evidenceIndex]: action === 'save' ? 'saved' : 'rejected'
    }));

    toast({
      title: action === 'save' ? "Evidence Saved" : "Evidence Rejected",
      description: `Evidence piece ${evidenceIndex + 1} has been ${action === 'save' ? 'saved to log' : 'rejected'}.`,
      variant: action === 'save' ? "default" : "destructive"
    });
  };

  // SOAP note handler
  const handleSoapNoteChange = (section: string, value: string) => {
    setSoapNote(prev => ({
      ...prev,
      [section]: value
    }));
  };

  // Risk assessment handlers
  const handleRiskApproval = (approved: boolean) => {
    setRiskApproved(approved);
    const savedCount = Object.values(evidenceStatuses).filter(status => status === 'saved').length;
    
    toast({
      title: approved ? "Risk Approved" : "Risk Denied",
      description: approved 
        ? `The risk assessment has been approved with ${savedCount} evidence pieces.` 
        : "The risk assessment has been marked as not applicable.",
      variant: approved ? "default" : "destructive"
    });

    if (approved) {
      setTimeout(() => {
        nextStep();
      }, 1000);
    }
  };

  // Care plan handlers
  const handleActionToggle = (actionId: string, checked: boolean) => {
    if (checked) {
      setSelectedActions(prev => [...prev, actionId]);
    } else {
      setSelectedActions(prev => prev.filter(id => id !== actionId));
    }

    // Update summary based on selected actions
    if (task) {
      const actionTexts = task.suggestedActions
        .filter(action => {
          if (action.id === actionId) {
            return checked;
          }
          return selectedActions.includes(action.id);
        })
        .map(action => action.text);

      setSummary(
        `Addressed ${task.title} by implementing: ${actionTexts.join(", ")}. ` +
        (manualAction ? `Added custom plan: ${manualAction}. ` : '') +
        `Patient reported ${task.evidenceFromCall[0].text.toLowerCase()} ` +
        `Will follow-up to monitor progress.`
      );
    }
  };

  // Handle adding manual action
  const handleAddManualAction = () => {
    if (manualAction.trim()) {
      // Update summary to include manual action
      setSummary(prev => {
        return prev + ` Added custom plan: ${manualAction}.`;
      });
      setManualAction("");
      toast({
        title: "Custom Action Added",
        description: "Your custom action has been added to the plan."
      });
    }
  };

  // Handle finalizing the task
  const handleFinalize = () => {
    toast({
      title: "Care Task Completed",
      description: `Time logged: ${formatTime(timer)} minutes for ${task?.cptCode} billing code.`,
    });
    
    setTimeout(() => {
      onComplete?.();
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="text-gray-500">Loading task...</div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="text-center py-8">
        <AlertTriangle className="mx-auto text-amber-500" size={48} />
        <h2 className="text-xl font-semibold mt-4 text-gray-900">Task Not Found</h2>
        <p className="text-gray-600 mt-2">The care task you're looking for could not be found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Step Progress */}
      <div className="mb-6">
        <StepProgress 
          currentStep={currentStep}
          completedSteps={completedSteps}
          steps={STEPS}
        />
      </div>

      {/* Main Content Container */}
      <div className="space-y-8">
        {/* Step Content */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <RiskAssessmentStep
              task={task}
              riskApproved={riskApproved}
              onRiskDecision={handleRiskApproval}
              onShowAudio={() => setShowAudioDialog(true)}
              evidenceStatuses={evidenceStatuses}
              onEvidenceAction={handleEvidenceAction}
            />
            {riskApproved === false && (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">Risk assessment denied. Task workflow ended.</p>
              </div>
            )}
          </div>
        )}

        {currentStep === 2 && riskApproved && (
          <div className="space-y-6">
            <CarePlanStep
              task={task}
              selectedActions={selectedActions}
              manualAction={manualAction}
              summary={summary}
              onActionToggle={handleActionToggle}
              onManualActionChange={setManualAction}
              onAddManualAction={handleAddManualAction}
              onSummaryChange={setSummary}
              soapNote={soapNote}
              onSoapNoteChange={handleSoapNoteChange}
            />
            <div className="flex justify-end">
              <Button onClick={nextStep} className="bg-[#1E4D36] hover:bg-[#2A6349]">
                Next: Follow-up Plan
              </Button>
            </div>
          </div>
        )}

        {currentStep === 3 && riskApproved && (
          <div className="space-y-6">
            <FollowUpStep />
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => goToStep(2)}>
                Back: Care Plan
              </Button>
              <Button onClick={nextStep} className="bg-[#1E4D36] hover:bg-[#2A6349]">
                Next: Finalize
              </Button>
            </div>
          </div>
        )}

        {currentStep === 4 && riskApproved && (
          <div className="space-y-6">
            <FinalizeStep
              task={task}
              timer={timer}
              isTimerRunning={isTimerRunning}
              onToggleTimer={() => setIsTimerRunning(!isTimerRunning)}
              onFinalize={handleFinalize}
              formatTime={formatTime}
            />
            <div className="flex justify-start">
              <Button variant="outline" onClick={() => goToStep(3)}>
                Back: Follow-up Plan
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Audio & Transcript Dialog */}
      <Dialog open={showAudioDialog} onOpenChange={setShowAudioDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Call Recording & Transcript</DialogTitle>
            <DialogDescription>
              Patient call from April 3, 2025
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Audio Recording:</h4>
              <div className="p-4 bg-gray-100 rounded-md flex items-center justify-center">
                <Button>
                  <Play size={16} className="mr-2" /> Play Recording
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Audio player would be implemented here in production.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Transcript:</h4>
              <div className="bg-white p-4 rounded-md border max-h-64 overflow-y-auto">
                <pre className="text-sm whitespace-pre-wrap">{task.transcript}</pre>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
