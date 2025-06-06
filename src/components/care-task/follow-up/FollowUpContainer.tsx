
import React from 'react';
import { Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TaskCallIntegration } from '../TaskCallIntegration';
import { TaskPreCallIntelligence } from '../call-integration/TaskPreCallIntelligence';
import { ComprehensiveCallAnalytics } from '../call-integration/ComprehensiveCallAnalytics';
import { PostCallSummary } from './PostCallSummary';
import { FollowUpMainView } from './FollowUpMainView';
import { FollowUpErrorBoundary } from './ErrorBoundary';
import { FollowUpLoadingSkeleton } from './LoadingStates';
import { useFollowUpState } from './useFollowUpState';
import { useFollowUpHandlers } from './useFollowUpHandlers';
import { FollowUpStepProps } from './followUpTypes';
import { DEFAULT_TASK_CONTEXT, mockAnalytics } from './followUpConstants';

export const FollowUpContainer: React.FC<FollowUpStepProps> = ({ taskContext }) => {
  const { state, updateState, setLoading, setError } = useFollowUpState();
  const activeTaskContext = taskContext || DEFAULT_TASK_CONTEXT;
  
  const handlers = useFollowUpHandlers({
    state,
    updateState,
    setLoading,
    setError,
    taskContext: activeTaskContext
  });

  // Show loading state for major operations
  if (state.isLoading && (state.showCallInterface || state.callCompleted)) {
    return <FollowUpLoadingSkeleton />;
  }

  return (
    <FollowUpErrorBoundary>
      {/* Show Pre-Call Intelligence */}
      {state.showPreCallIntel && (
        <div className="space-y-6">
          <TaskPreCallIntelligence
            taskContext={activeTaskContext}
            onStartCall={handlers.onStartCall}
          />
          <Button 
            variant="outline" 
            onClick={() => updateState({ showPreCallIntel: false })}
            className="w-full"
            disabled={state.isLoading}
          >
            Back to Follow-up Options
          </Button>
        </div>
      )}

      {/* Show Call Interface */}
      {state.showCallInterface && (
        <TaskCallIntegration
          taskContext={activeTaskContext}
          onCallComplete={handlers.onCallComplete}
        />
      )}

      {/* Show Analytics View */}
      {state.showAnalytics && state.callSummary && (
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
            disabled={state.isLoading}
          >
            Back to Summary
          </Button>
        </div>
      )}

      {/* Show Post-Call Summary and Documentation */}
      {state.callCompleted && state.callSummary && (
        <PostCallSummary
          callSummary={state.callSummary}
          taskId={activeTaskContext.taskId}
          onViewAnalytics={handlers.onViewAnalytics}
          onReturnToTasks={() => updateState({ callCompleted: false })}
          onEHRSubmit={handlers.onEHRSubmit}
        />
      )}

      {/* Show Main Follow-up View */}
      {!state.showPreCallIntel && !state.showCallInterface && !state.showAnalytics && (!state.callCompleted || !state.callSummary) && (
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
      )}
    </FollowUpErrorBoundary>
  );
};
