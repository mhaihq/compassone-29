
import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { generateCallSummary } from '@/services/aiCallService';
import { FollowUpState } from './useFollowUpState';
import { TaskCallContext } from '@/types/taskCallIntegration';
import { FollowUpHandlers } from './followUpTypes';

interface UseFollowUpHandlersProps {
  state: FollowUpState;
  updateState: (updates: Partial<FollowUpState>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  taskContext: TaskCallContext;
}

export const useFollowUpHandlers = ({
  state,
  updateState,
  setLoading,
  setError,
  taskContext
}: UseFollowUpHandlersProps): FollowUpHandlers => {
  const { toast } = useToast();

  const onScriptToggle = useCallback((scriptId: string, checked: boolean) => {
    const newScripts = checked
      ? [...state.selectedScripts, scriptId]
      : state.selectedScripts.filter(id => id !== scriptId);
    
    updateState({ selectedScripts: newScripts });
  }, [state.selectedScripts, updateState]);

  const onCustomScriptChange = useCallback((value: string) => {
    updateState({ customScript: value });
  }, [updateState]);

  const onFollowUpDateChange = useCallback((value: Date | undefined) => {
    updateState({ followUpDate: value });
  }, [updateState]);

  const onFollowUpNotesChange = useCallback((value: string) => {
    updateState({ followUpNotes: value });
  }, [updateState]);

  const onAssignedToChange = useCallback((value: string) => {
    updateState({ assignedTo: value });
  }, [updateState]);

  const onAddCustomScript = useCallback(() => {
    if (state.customScript.trim()) {
      updateState({ customScript: '' });
      toast({
        title: "Custom Script Added",
        description: "Your custom script has been added to the selection."
      });
    }
  }, [state.customScript, updateState, toast]);

  const onSetScriptCombination = useCallback((scripts: string[]) => {
    updateState({ selectedScripts: scripts });
  }, [updateState]);

  const onEscalationReasonChange = useCallback((value: string) => {
    updateState({ escalationReason: value });
  }, [updateState]);

  const onScheduleManualFollowUp = useCallback(async () => {
    if (!state.followUpDate || !state.followUpNotes.trim() || !state.assignedTo.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Manual Follow-up Scheduled",
        description: `Follow-up has been scheduled for ${state.followUpDate.toDateString()} and assigned to ${state.assignedTo}.`
      });

      // Reset form
      updateState({
        followUpDate: undefined,
        followUpNotes: '',
        assignedTo: ''
      });
    } catch {
      setError('Failed to schedule follow-up. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [state.followUpDate, state.followUpNotes, state.assignedTo, setLoading, setError, toast, updateState]);

  const onStartPreCallIntel = useCallback(() => {
    updateState({ showPreCallIntel: true });
  }, [updateState]);

  const onStartCall = useCallback(() => {
    updateState({
      showPreCallIntel: false,
      showCallInterface: true
    });
  }, [updateState]);

  const onCallComplete = useCallback(async () => {
    setLoading(true);
    updateState({ 
      showCallInterface: false,
      callCompleted: true 
    });
    
    try {
      const summary = await generateCallSummary(taskContext.patientId, [], '14:32');
      updateState({ callSummary: summary });
      
      toast({
        title: "Call Completed Successfully",
        description: "AI analysis complete. Comprehensive documentation ready for review."
      });
    } catch {
      setError('Failed to generate call summary. Please try again.');
      toast({
        title: "Error",
        description: "Failed to generate call summary. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [updateState, setLoading, setError, taskContext.patientId, toast]);

  const onViewAnalytics = useCallback(() => {
    updateState({ showAnalytics: true });
  }, [updateState]);

  const onEHRSubmit = useCallback((_ehrData: unknown) => {
    toast({
      title: "Documentation Submitted",
      description: "Call documentation has been successfully submitted to the EHR system."
    });
  }, [toast]);

  return {
    onScriptToggle,
    onCustomScriptChange,
    onFollowUpDateChange,
    onFollowUpNotesChange,
    onAssignedToChange,
    onAddCustomScript,
    onSetScriptCombination,
    onEscalationReasonChange,
    onScheduleManualFollowUp,
    onStartPreCallIntel,
    onStartCall,
    onCallComplete,
    onViewAnalytics,
    onEHRSubmit,
  };
};
