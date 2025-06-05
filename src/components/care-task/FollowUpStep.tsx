
import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TaskCallIntegration } from './TaskCallIntegration';
import { TaskPreCallIntelligence } from './call-integration/TaskPreCallIntelligence';
import { ComprehensiveCallAnalytics } from './call-integration/ComprehensiveCallAnalytics';
import { TaskCallContext } from '@/types/taskCallIntegration';
import { AICallSummary, generateCallSummary } from '@/services/aiCallService';
import { useToast } from '@/hooks/use-toast';
import { FollowUpActionSelector } from './follow-up/FollowUpActionSelector';
import { CallNowSection } from './follow-up/CallNowSection';
import { AIFollowUpSection } from './follow-up/AIFollowUpSection';
import { EscalationSection } from './follow-up/EscalationSection';
import { PostCallSummary } from './follow-up/PostCallSummary';
import { FollowUpStepProps } from './follow-up/types';

export const FollowUpStep: React.FC<FollowUpStepProps> = ({ taskContext }) => {
  const [selectedAction, setSelectedAction] = useState('ai-followup');
  const [selectedScripts, setSelectedScripts] = useState<string[]>([]);
  const [customScript, setCustomScript] = useState('');
  const [escalationReason, setEscalationReason] = useState('');
  const [followUpDate, setFollowUpDate] = useState('May 27, 2025');
  const [showCallInterface, setShowCallInterface] = useState(false);
  const [showPreCallIntel, setShowPreCallIntel] = useState(false);
  const [callCompleted, setCallCompleted] = useState(false);
  const [callSummary, setCallSummary] = useState<AICallSummary | null>(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const { toast } = useToast();

  // Create a default task context if none is provided
  const defaultTaskContext: TaskCallContext = {
    taskId: 'demo-task-001',
    taskTitle: 'Monthly Stability Review',
    taskType: 'Monthly Stability Review',
    patientId: 'PAT-001',
    patientName: 'Sarah Johnson',
    priority: 'Medium',
    dueDate: '2025-06-07',
    assignedTo: 'Dr. Smith',
    status: 'in_progress'
  };

  const activeTaskContext = taskContext || defaultTaskContext;

  const handleScriptToggle = (scriptId: string, checked: boolean) => {
    if (checked) {
      setSelectedScripts(prev => [...prev, scriptId]);
    } else {
      setSelectedScripts(prev => prev.filter(id => id !== scriptId));
    }
  };

  const handleAddCustomScript = () => {
    if (customScript.trim()) {
      setCustomScript('');
    }
  };

  const handleStartPreCallIntel = () => {
    console.log('Starting pre-call intelligence...');
    setShowPreCallIntel(true);
  };

  const handleStartCall = () => {
    console.log('Starting direct call...');
    setShowPreCallIntel(false);
    setShowCallInterface(true);
  };

  const handleCallComplete = async () => {
    console.log('Call completed, generating summary...');
    setShowCallInterface(false);
    setCallCompleted(true);
    
    // Generate comprehensive call summary
    const summary = await generateCallSummary(activeTaskContext.patientId, [], '14:32');
    setCallSummary(summary);
    
    toast({
      title: "Call Completed Successfully",
      description: "AI analysis complete. Comprehensive documentation ready for review."
    });
  };

  const handleViewAnalytics = () => {
    console.log('Viewing analytics...');
    setShowAnalytics(true);
  };

  const handleEHRSubmit = (ehrData: any) => {
    console.log('EHR data submitted:', ehrData);
    toast({
      title: "Documentation Submitted",
      description: "Call documentation has been successfully submitted to the EHR system."
    });
  };

  // Mock analytics data
  const mockAnalytics = {
    callEfficiency: 94,
    patientSatisfaction: 89,
    clinicalObjectivesAchieved: 92,
    aiAssistanceUtilization: 87,
    protocolAdherence: 96,
    timeAllocation: {
      assessment: 35,
      intervention: 40,
      planning: 20,
      documentation: 5
    },
    comparisonToBaseline: {
      averageCallDuration: '12:45 avg',
      patientEngagement: 89,
      outcomesAchieved: 92
    }
  };

  // Show Pre-Call Intelligence
  if (showPreCallIntel) {
    return (
      <div className="space-y-6">
        <TaskPreCallIntelligence
          taskContext={activeTaskContext}
          onStartCall={handleStartCall}
        />
        <Button 
          variant="outline" 
          onClick={() => setShowPreCallIntel(false)}
          className="w-full"
        >
          Back to Follow-up Options
        </Button>
      </div>
    );
  }

  // Show Call Interface
  if (showCallInterface) {
    return (
      <TaskCallIntegration
        taskContext={activeTaskContext}
        onCallComplete={handleCallComplete}
      />
    );
  }

  // Show Analytics View
  if (showAnalytics && callSummary) {
    return (
      <div className="space-y-6">
        <ComprehensiveCallAnalytics
          analytics={mockAnalytics}
          taskType={activeTaskContext.taskType}
          callDuration="14:32"
        />
        <Button 
          variant="outline" 
          onClick={() => setShowAnalytics(false)}
          className="w-full"
        >
          Back to Summary
        </Button>
      </div>
    );
  }

  // Show Post-Call Summary and Documentation
  if (callCompleted && callSummary) {
    return (
      <PostCallSummary
        callSummary={callSummary}
        taskId={activeTaskContext.taskId}
        onViewAnalytics={handleViewAnalytics}
        onReturnToTasks={() => setCallCompleted(false)}
        onEHRSubmit={handleEHRSubmit}
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="mr-2 text-blue-500" size={20} />
          Set up the next steps for this patient
        </CardTitle>
        <div className="text-sm text-gray-600">
          Task: {activeTaskContext.taskTitle} • Patient: {activeTaskContext.patientName}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex items-center mb-4">
            <Calendar className="mr-2 text-blue-500" size={16} />
            <h3 className="font-medium">What happens next?</h3>
          </div>
          
          <FollowUpActionSelector
            selectedAction={selectedAction}
            onActionChange={setSelectedAction}
          />
        </div>

        {selectedAction === 'call-now' && (
          <CallNowSection
            onStartPreCallIntel={handleStartPreCallIntel}
            onStartCall={handleStartCall}
          />
        )}

        {selectedAction === 'ai-followup' && (
          <AIFollowUpSection
            selectedScripts={selectedScripts}
            customScript={customScript}
            followUpDate={followUpDate}
            onScriptToggle={handleScriptToggle}
            onCustomScriptChange={setCustomScript}
            onFollowUpDateChange={setFollowUpDate}
            onAddCustomScript={handleAddCustomScript}
            onSetScriptCombination={setSelectedScripts}
          />
        )}

        {selectedAction === 'escalate' && (
          <EscalationSection
            escalationReason={escalationReason}
            onEscalationReasonChange={setEscalationReason}
          />
        )}
      </CardContent>
    </Card>
  );
};
