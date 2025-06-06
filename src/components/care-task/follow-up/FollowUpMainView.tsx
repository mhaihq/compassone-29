
import React from 'react';
import { Calendar, AlertCircle } from 'lucide-react';
import { FollowUpActionSelector } from './FollowUpActionSelector';
import { CallNowSection } from './CallNowSection';
import { AIFollowUpSection } from './AIFollowUpSection';
import { ManualFollowUpSection } from './ManualFollowUpSection';
import { EscalationSection } from './EscalationSection';
import { FollowUpState } from './useFollowUpState';
import { FollowUpHandlers } from './followUpTypes';

interface FollowUpMainViewProps {
  state: FollowUpState;
  handlers: FollowUpHandlers;
  updateState: (updates: Partial<FollowUpState>) => void;
}

export const FollowUpMainView: React.FC<FollowUpMainViewProps> = ({
  state,
  handlers,
  updateState
}) => {
  return (
    <div>
      <div className="flex items-center mb-4">
        <Calendar className="mr-2 text-blue-500" size={16} />
        <h3 className="font-medium">What happens next?</h3>
      </div>

      {state.error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
          <AlertCircle className="mr-2 text-red-600" size={16} />
          <span className="text-red-700">{state.error}</span>
        </div>
      )}
      
      <FollowUpActionSelector
        selectedAction={state.selectedAction}
        onActionChange={(action) => updateState({ selectedAction: action })}
      />

      {state.selectedAction === 'call-now' && (
        <CallNowSection
          onStartPreCallIntel={handlers.onStartPreCallIntel}
          onStartCall={handlers.onStartCall}
          isLoading={state.isLoading}
        />
      )}

      {state.selectedAction === 'ai-followup' && (
        <AIFollowUpSection
          selectedScripts={state.selectedScripts}
          customScript={state.customScript}
          followUpDate={state.followUpDate ? state.followUpDate.toDateString() : ''}
          onScriptToggle={handlers.onScriptToggle}
          onCustomScriptChange={handlers.onCustomScriptChange}
          onFollowUpDateChange={(dateString) => {
            const date = dateString ? new Date(dateString) : undefined;
            handlers.onFollowUpDateChange(date);
          }}
          onAddCustomScript={handlers.onAddCustomScript}
          onSetScriptCombination={handlers.onSetScriptCombination}
          isLoading={state.isLoading}
        />
      )}

      {state.selectedAction === 'manual-followup' && (
        <ManualFollowUpSection
          followUpDate={state.followUpDate}
          followUpNotes={state.followUpNotes}
          assignedTo={state.assignedTo}
          onFollowUpDateChange={handlers.onFollowUpDateChange}
          onFollowUpNotesChange={handlers.onFollowUpNotesChange}
          onAssignedToChange={handlers.onAssignedToChange}
          onScheduleFollowUp={handlers.onScheduleManualFollowUp}
          isLoading={state.isLoading}
        />
      )}

      {state.selectedAction === 'escalate' && (
        <EscalationSection
          escalationReason={state.escalationReason}
          onEscalationReasonChange={handlers.onEscalationReasonChange}
          isLoading={state.isLoading}
        />
      )}
    </div>
  );
};
