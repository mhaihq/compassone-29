
import React from 'react';
import { Calendar } from 'lucide-react';
import { FollowUpActionSelector } from './FollowUpActionSelector';
import { CallNowSection } from './CallNowSection';
import { AIFollowUpSection } from './AIFollowUpSection';
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
      
      <FollowUpActionSelector
        selectedAction={state.selectedAction}
        onActionChange={(action) => updateState({ selectedAction: action })}
      />

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
    </div>
  );
};
