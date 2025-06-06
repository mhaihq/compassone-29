
import { TaskCallContext } from '@/types/taskCallIntegration';
import { AICallSummary } from '@/services/aiCallService';

export interface FollowUpStepProps {
  taskContext?: TaskCallContext;
}

export interface Script {
  id: string;
  title: string;
  description: string;
  category?: 'medication' | 'appointment' | 'assessment' | 'review';
}

export interface ScriptCombination {
  id: string;
  label: string;
  scripts: string[];
  description?: string;
}

export interface MockAnalytics {
  callEfficiency: number;
  patientSatisfaction: number;
  clinicalObjectivesAchieved: number;
  aiAssistanceUtilization: number;
  protocolAdherence: number;
  timeAllocation: {
    assessment: number;
    intervention: number;
    planning: number;
    documentation: number;
  };
  comparisonToBaseline: {
    averageCallDuration: string;
    patientEngagement: number;
    outcomesAchieved: number;
  };
}

export interface FollowUpHandlers {
  onScriptToggle: (scriptId: string, checked: boolean) => void;
  onCustomScriptChange: (value: string) => void;
  onFollowUpDateChange: (value: Date | undefined) => void;
  onFollowUpNotesChange: (value: string) => void;
  onAssignedToChange: (value: string) => void;
  onAddCustomScript: () => void;
  onSetScriptCombination: (scripts: string[]) => void;
  onEscalationReasonChange: (value: string) => void;
  onScheduleManualFollowUp: () => void;
  onStartPreCallIntel: () => void;
  onStartCall: () => void;
  onCallComplete: () => void;
  onViewAnalytics: () => void;
  onEHRSubmit: (ehrData: any) => void;
}
