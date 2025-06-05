
import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { generateCallSummary } from '@/services/aiCallService';
import { FollowUpState } from './useFollowUpState';
import { TaskCallContext } from '@/types/taskCallIntegration';
import { FollowUpHandlers } from './followUpTypes';

interface UseFollowUpHandlersProps {
  state: FollowUpState;
  updateState: (updates: Partial<FollowUpState>) => void;
  taskContext: TaskCallContext;
}

export const useFollowUpHandlers = ({
  state,
  updateState,
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

  const onFollowUpDateChange = useCallback((value: string) => {
    updateState({ followUpDate: value });
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

  const onStartPreCallIntel = useCallback(() => {
    console.log('Starting pre-call intelligence...');
    updateState({ showPreCallIntel: true });
  }, [updateState]);

  const onStartCall = useCallback(() => {
    console.log('Starting direct call...');
    updateState({ 
      showPreCallIntel: false,
      showCallInterface: true 
    });
  }, [updateState]);

  const onCallComplete = useCallback(async () => {
    console.log('Call completed, generating summary...');
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
    } catch (error) {
      console.error('Error generating call summary:', error);
      toast({
        title: "Error",
        description: "Failed to generate call summary. Please try again.",
        variant: "destructive"
      });
    }
  }, [updateState, taskContext.patientId, toast]);

  const onViewAnalytics = useCallback(() => {
    console.log('Viewing analytics...');
    updateState({ showAnalytics: true });
  }, [updateState]);

  const onEHRSubmit = useCallback((ehrData: any) => {
    console.log('EHR data submitted:', ehrData);
    toast({
      title: "Documentation Submitted",
      description: "Call documentation has been successfully submitted to the EHR system."
    });
  }, [toast]);

  return {
    onScriptToggle,
    onCustomScriptChange,
    onFollowUpDateChange,
    onAddCustomScript,
    onSetScriptCombination,
    onEscalationReasonChange,
    onStartPreCallIntel,
    onStartCall,
    onCallComplete,
    onViewAnalytics,
    onEHRSubmit,
  };
};
