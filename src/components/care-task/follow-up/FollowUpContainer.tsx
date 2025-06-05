
import React from 'react';
import { Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TaskCallIntegration } from '../TaskCallIntegration';
import { TaskPreCallIntelligence } from '../call-integration/TaskPreCallIntelligence';
import { ComprehensiveCallAnalytics } from '../call-integration/ComprehensiveCallAnalytics';
import { PostCallSummary } from './PostCallSummary';
import { FollowUpMainView } from './FollowUpMainView';
import { useFollowUpState } from './useFollowUpState';
import { useFollowUpHandlers } from './useFollowUpHandlers';
import { FollowUpStepProps } from './followUpTypes';
import { DEFAULT_TASK_CONTEXT, mockAnalytics } from './followUpConstants';

export const FollowUpContainer: React.FC<FollowUpStepProps> = ({ taskContext }) => {
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

  // Show Main Follow-up View
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
        <FollowUpMainView
          state={state}
          handlers={handlers}
          updateState={updateState}
        />
      </CardContent>
    </Card>
  );
};
