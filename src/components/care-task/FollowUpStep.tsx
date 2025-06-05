
import React from 'react';
import { Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TaskCallIntegration } from './TaskCallIntegration';
import { TaskPreCallIntelligence } from './call-integration/TaskPreCallIntelligence';
import { ComprehensiveCallAnalytics } from './call-integration/ComprehensiveCallAnalytics';
import { FollowUpActionSelector } from './follow-up/FollowUpActionSelector';
import { CallNowSection } from './follow-up/CallNowSection';
import { AIFollowUpSection } from './follow-up/AIFollowUpSection';
import { EscalationSection } from './follow-up/EscalationSection';
import { PostCallSummary } from './follow-up/PostCallSummary';
import { useFollowUpState } from './follow-up/useFollowUpState';
import { useFollowUpHandlers } from './follow-up/useFollowUpHandlers';
import { FollowUpStepProps } from './follow-up/followUpTypes';
import { DEFAULT_TASK_CONTEXT, mockAnalytics } from './follow-up/followUpConstants';

export const FollowUpStep: React.FC<FollowUpStepProps> = ({ taskContext }) => {
  const { state, updateState } = useFollowUpState();
  const activeTaskContext = taskContext || DEFAULT_TASK_CONTEXT;
  
  const handlers = useFollowUpHandlers({
    state,
    updateState,
    taskContext: activeTaskContext
  });

  // Show Pre-Call Intelligence
  if (state.showPreCallIntel) {
    return (
      <div className="space-y-6">
        <TaskPreCallIntelligence
          taskContext={activeTaskContext}
          onStartCall={handlers.onStartCall}
        />
        <Button 
          variant="outline" 
          onClick={() => updateState({ showPreCallIntel: false })}
          className="w-full"
        >
          Back to Follow-up Options
        </Button>
      </div>
    );
  }

  // Show Call Interface
  if (state.showCallInterface) {
    return (
      <TaskCallIntegration
        taskContext={activeTaskContext}
        onCallComplete={handlers.onCallComplete}
      />
    );
  }

  // Show Analytics View
  if (state.showAnalytics && state.callSummary) {
    return (
      <div className="space-y-6">
        <ComprehensiveCallAnalytics
          analytics={mockAnalytics}
          taskType={activeTaskContext.taskType}
          callDuration="14:32"
        />
        <Button 
          variant="outline" 
          onClick={() => updateState({ showAnalytics: false })}
          className="w-full"
        >
          Back to Summary
        </Button>
      </div>
    );
  }

  // Show Post-Call Summary and Documentation
  if (state.callCompleted && state.callSummary) {
    return (
      <PostCallSummary
        callSummary={state.callSummary}
        taskId={activeTaskContext.taskId}
        onViewAnalytics={handlers.onViewAnalytics}
        onReturnToTasks={() => updateState({ callCompleted: false })}
        onEHRSubmit={handlers.onEHRSubmit}
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
            selectedAction={state.selectedAction}
            onActionChange={(action) => updateState({ selectedAction: action })}
          />
        </div>

        {state.selectedAction === 'call-now' && (
          <CallNowSection
            onStartPreCallIntel={handlers.onStartPreCallIntel}
            onStartCall={handlers.onStartCall}
          />
        )}

        {state.selectedAction === 'ai-followup' && (
          <AIFollowUpSection
            selectedScripts={state.selectedScripts}
            customScript={state.customScript}
            followUpDate={state.followUpDate}
            onScriptToggle={handlers.onScriptToggle}
            onCustomScriptChange={handlers.onCustomScriptChange}
            onFollowUpDateChange={handlers.onFollowUpDateChange}
            onAddCustomScript={handlers.onAddCustomScript}
            onSetScriptCombination={handlers.onSetScriptCombination}
          />
        )}

        {state.selectedAction === 'escalate' && (
          <EscalationSection
            escalationReason={state.escalationReason}
            onEscalationReasonChange={handlers.onEscalationReasonChange}
          />
        )}
      </CardContent>
    </Card>
  );
};
