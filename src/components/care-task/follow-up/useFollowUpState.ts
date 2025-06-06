
import { useState } from 'react';
import { AICallSummary } from '@/services/aiCallService';

export interface FollowUpState {
  selectedAction: string;
  selectedScripts: string[];
  customScript: string;
  escalationReason: string;
  followUpDate: Date | undefined;
  followUpNotes: string;
  assignedTo: string;
  showCallInterface: boolean;
  showPreCallIntel: boolean;
  callCompleted: boolean;
  callSummary: AICallSummary | null;
  showAnalytics: boolean;
  isLoading: boolean;
  error: string | null;
}

export const useFollowUpState = () => {
  const [state, setState] = useState<FollowUpState>({
    selectedAction: 'ai-followup',
    selectedScripts: [],
    customScript: '',
    escalationReason: '',
    followUpDate: undefined,
    followUpNotes: '',
    assignedTo: '',
    showCallInterface: false,
    showPreCallIntel: false,
    callCompleted: false,
    callSummary: null,
    showAnalytics: false,
    isLoading: false,
    error: null,
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
      followUpDate: undefined,
      followUpNotes: '',
      assignedTo: '',
      showCallInterface: false,
      showPreCallIntel: false,
      callCompleted: false,
      callSummary: null,
      showAnalytics: false,
      isLoading: false,
      error: null,
    });
  };

  const setLoading = (isLoading: boolean) => {
    updateState({ isLoading });
  };

  const setError = (error: string | null) => {
    updateState({ error });
  };

  return {
    state,
    updateState,
    resetState,
    setLoading,
    setError,
  };
};
