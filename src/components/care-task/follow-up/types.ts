
export interface FollowUpStepProps {
  taskContext?: import('@/types/taskCallIntegration').TaskCallContext;
}

export interface Script {
  id: string;
  title: string;
  description: string;
}

export interface ScriptCombination {
  id: string;
  label: string;
  scripts: string[];
}
