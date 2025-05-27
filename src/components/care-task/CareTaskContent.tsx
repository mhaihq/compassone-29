
import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, Clock, Play, Pause
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
import { MonthlyStabilityReview } from '@/components/care-task/MonthlyStabilityReview';
import { useNavigate } from 'react-router-dom';

// Sample data - would come from an API or context in a real app
const careTasksData = {
  'T-1001': {
    id: 'T-1001',
    title: 'Mental Health Monitoring',
    description: 'High Alert: Depression symptoms requiring immediate clinical review and intervention',
    category: 'Mental-health',
    categoryColor: 'pink',
    minutes: 12,
    insight: 'High Alert triggered by Hana AI Coach - immediate clinical review required for depression management',
    status: 'urgent',
    cptCode: '99484',
    cptDescription: 'Behavioral Health Integration',
    patientId: 'P100592',
    patientName: 'Matteo Grassi',
    flagReason: 'Critical escalation in depression symptoms detected during routine monitoring, requiring immediate clinical intervention and care plan adjustment.',
    evidenceFromCall: [
      {
        text: "My depression has gotten significantly worse over the past week. I'm having trouble getting out of bed and I've been having some really dark thoughts.",
        timestamp: "2:45",
        importance: "high"
      },
      {
        text: "I haven't been taking my antidepressant regularly because I don't think it's working anymore. What's the point?",
        timestamp: "4:15",
        importance: "high"
      },
      {
        text: "I cancelled my therapy appointment this week because I just couldn't face it. Everything feels overwhelming.",
        timestamp: "6:30",
        importance: "high"
      }
    ],
    audioUrl: "#",
    transcript: "AI: How have you been feeling since our last check-in?\nPatient: My depression has gotten significantly worse over the past week. I'm having trouble getting out of bed and I've been having some really dark thoughts.\nAI: I'm concerned about what you're telling me. Can you tell me more about your medication?\nPatient: I haven't been taking my antidepressant regularly because I don't think it's working anymore. What's the point?\nAI: It's important that we address this. How have you been managing your therapy sessions?\nPatient: I cancelled my therapy appointment this week because I just couldn't face it. Everything feels overwhelming.",
    suggestedActions: [
      { id: 'action-1', text: 'Immediate mental health crisis assessment and safety planning', default: true },
      { id: 'action-2', text: 'Emergency consultation with psychiatrist for medication review', default: true },
      { id: 'action-3', text: 'Coordinate urgent therapy session within 24-48 hours', default: true },
      { id: 'action-4', text: 'Implement enhanced monitoring protocol with daily check-ins', default: true },
      { id: 'action-5', text: 'Assess need for higher level of care (IOP/PHP)', default: false }
    ]
  },
  'T-1002': {
    id: 'T-1002',
    title: 'Blood Pressure Elevated',
    description: 'Recent reading 138/88 mmHg, above target range',
    category: 'Vitals',
    categoryColor: 'blue',
    minutes: 5,
    insight: 'Flagged by Hana AI Coach - medication adherence affecting BP control',
    status: 'urgent',
    cptCode: '99490',
    cptDescription: 'Chronic Care Management',
    patientId: 'P100592',
    patientName: 'Matteo Grassi',
    flagReason: 'Patient blood pressure reading above target range, indicating need for intervention.',
    evidenceFromCall: [
      {
        text: "I've been forgetting to take my blood pressure medication some mornings when I'm rushing to work.",
        timestamp: "2:15",
        importance: "high"
      },
      {
        text: "My home readings have been around 135-140 over 85-90 lately.",
        timestamp: "4:30",
        importance: "high"
      }
    ],
    audioUrl: "#",
    transcript: "AI: How has your blood pressure been this week?\nPatient: I've been forgetting to take my blood pressure medication some mornings when I'm rushing to work.\nAI: That's concerning. What have your home readings been?\nPatient: My home readings have been around 135-140 over 85-90 lately. I know it's higher than it should be.",
    suggestedActions: [
      { id: 'action-1', text: 'Review medication timing and set up reminders', default: true },
      { id: 'action-2', text: 'Schedule blood pressure recheck in 1 week', default: true },
      { id: 'action-3', text: 'Discuss lifestyle modifications (diet, exercise, stress)', default: false }
    ]
  },
  'T-MSR-001': {
    id: 'T-MSR-001',
    title: 'Monthly Stability Review',
    description: 'Comprehensive monthly assessment of mental health stability and care plan effectiveness',
    category: 'Monthly-review',
    categoryColor: 'purple',
    minutes: 15,
    insight: 'Scheduled monthly review to assess patient stability trends and adjust care plan as needed',
    status: 'pending',
    cptCode: '99484',
    cptDescription: 'Behavioral Health Integration',
    patientId: 'P100592',
    patientName: 'Matteo Grassi',
    taskType: 'monthly-stability-review'
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
      
      // Only set initial values for non-Monthly Stability Review tasks
      if (taskData.taskType !== 'monthly-stability-review') {
        // Set initial selected actions based on default values
        const initialSelectedActions = taskData.suggestedActions
          ?.filter(action => action.default)
          .map(action => action.id) || [];
        
        setSelectedActions(initialSelectedActions);
        
        // Generate initial SOAP note based on evidence
        const evidenceText = taskData.evidenceFromCall?.map(e => e.text).join('. ') || '';
        setSoapNote({
          subjective: `Patient reports: ${evidenceText}`,
          objective: `${taskData.title} noted during Hana call on ${new Date().toLocaleDateString()}. Patient accessed via telehealth monitoring.`,
          assessment: `${taskData.title} - ${taskData.description}. ${taskData.flagReason || ''}`,
          plan: taskData.id === 'T-1001' 
            ? 'URGENT: Immediate mental health crisis assessment and safety planning. Emergency psychiatrist consultation for medication review. Coordinate urgent therapy session within 24-48 hours. Implement enhanced monitoring with daily check-ins. Patient requires immediate clinical intervention for escalating depression symptoms.'
            : 'Review medication timing and adherence. Schedule BP recheck in 1 week. Reinforce importance of consistent dosing.'
        });
        
        // Generate initial summary
        const actionTexts = taskData.suggestedActions
          ?.filter(action => action.default)
          .map(action => action.text) || [];
          
        setSummary(
          taskData.id === 'T-1001'
            ? `CRITICAL ALERT: Addressed escalating depression symptoms requiring immediate intervention. Implemented: ${actionTexts.join(", ")}. Patient expressing suicidal ideation and medication non-compliance. Emergency protocols activated for immediate psychiatric evaluation and safety planning.`
            : `Addressed ${taskData.title} by implementing: ${actionTexts.join(", ")}. Patient reported ${taskData.evidenceFromCall?.[0]?.text.toLowerCase() || ''} Will follow-up to monitor progress.`
        );
      }
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

    if (task && task.suggestedActions) {
      const actionTexts = task.suggestedActions
        .filter(action => {
          if (action.id === actionId) {
            return checked;
          }
          return selectedActions.includes(action.id);
        })
        .map(action => action.text);

      setSummary(
        task.id === 'T-1001'
          ? `CRITICAL ALERT: Addressed escalating depression symptoms requiring immediate intervention. Implemented: ${actionTexts.join(", ")}. ${manualAction ? `Added custom plan: ${manualAction}. ` : ''}Patient expressing suicidal ideation and medication non-compliance. Emergency protocols activated.`
          : `Addressed ${task.title} by implementing: ${actionTexts.join(", ")}. ${manualAction ? `Added custom plan: ${manualAction}. ` : ''}Patient reported ${task.evidenceFromCall?.[0]?.text.toLowerCase() || ''} Will follow-up to monitor progress.`
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

  // Check if this is a Monthly Stability Review task
  if (task.taskType === 'monthly-stability-review') {
    return (
      <MonthlyStabilityReview
        task={task}
        onComplete={handleFinalize}
        timer={timer}
        formatTime={formatTime}
      />
    );
  }

  return (
    <div className="w-full">
      {/* Step Progress and Timer */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        {/* Timer Display */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Session Time:</span>
            <Badge className="bg-blue-50 text-blue-800 border-blue-200 font-mono">
              {formatTime(timer)}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              {Math.round((timer / (20 * 60)) * 100)}% of 20 min
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="h-7 px-2"
            >
              {isTimerRunning ? (
                <><Pause size={12} className="mr-1" /> Pause</>
              ) : (
                <><Play size={12} className="mr-1" /> Resume</>
              )}
            </Button>
          </div>
        </div>

        {/* Step Progress - Full Width */}
        <div className="w-full">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => {
              const stepNumber = index + 1;
              const isCompleted = completedSteps.includes(stepNumber);
              const isCurrent = currentStep === stepNumber;
              const isAccessible = stepNumber <= currentStep || isCompleted;

              return (
                <div key={stepNumber} className="flex items-center" style={{ width: `${100 / STEPS.length}%` }}>
                  <div className="flex flex-col items-center w-full">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium border-2 transition-all duration-200 ${
                        isCompleted
                          ? "bg-green-500 border-green-500 text-white shadow-sm"
                          : isCurrent
                          ? "bg-blue-500 border-blue-500 text-white shadow-md"
                          : isAccessible
                          ? "bg-white border-gray-300 text-gray-600 hover:border-gray-400"
                          : "bg-gray-50 border-gray-200 text-gray-400"
                      }`}
                    >
                      {stepNumber}
                    </div>
                    <span
                      className={`mt-1 text-xs font-medium text-center ${
                        isCurrent
                          ? "text-blue-600"
                          : isCompleted
                          ? "text-green-600"
                          : "text-gray-500"
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                  
                  {index < STEPS.length - 1 && (
                    <div
                      className={`h-0.5 transition-colors duration-200 flex-1 mx-2 ${
                        isCompleted || (isCurrent && index + 1 < currentStep)
                          ? "bg-green-500"
                          : stepNumber < currentStep
                          ? "bg-blue-500"
                          : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
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
