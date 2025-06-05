
import { useState } from 'react';
import { AICallSummary } from '@/services/aiCallService';
import { TaskCallContext } from '@/types/taskCallIntegration';

export interface FollowUpState {
  selectedAction: string;
  selectedScripts: string[];
  customScript: string;
  escalationReason: string;
  followUpDate: string;
  showCallInterface: boolean;
  showPreCallIntel: boolean;
  callCompleted: boolean;
  callSummary: AICallSummary | null;
  showAnalytics: boolean;
}

export const useFollowUpState = () => {
  const [state, setState] = useState<FollowUpState>({
    selectedAction: 'ai-followup',
    selectedScripts: [],
    customScript: '',
    escalationReason: '',
    followUpDate: 'May 27, 2025',
    showCallInterface: false,
    showPreCallIntel: false,
    callCompleted: false,
    callSummary: null,
    showAnalytics: false,
  });

  const updateState = (updates: Partial<FollowUpState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const resetState = () => {
    setState({
      selectedAction: 'ai-followup',
      selectedScripts: [],
      customScript: '',
      escalationReason: '',
      followUpDate: 'May 27, 2025',
      showCallInterface: false,
      showPreCallIntel: false,
      callCompleted: false,
      callSummary: null,
      showAnalytics: false,
    });
  };

  return {
    state,
    updateState,
    resetState,
  };
};
