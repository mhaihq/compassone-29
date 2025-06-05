
import { TaskCallContext } from '@/types/taskCallIntegration';
import { PRIORITY_COLORS } from './followUpConstants';

export const getPriorityColor = (priority: string): string => {
  return PRIORITY_COLORS[priority as keyof typeof PRIORITY_COLORS] || 'bg-gray-100 text-gray-800';
};

export const formatCallDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
};

export const validateTaskContext = (taskContext: TaskCallContext | undefined): TaskCallContext => {
  if (!taskContext) {
    throw new Error('Task context is required');
  }
  
  if (!taskContext.taskId || !taskContext.patientId) {
    throw new Error('Task context must include taskId and patientId');
  }
  
  return taskContext;
};

export const createCallSummaryRequest = (
  patientId: string,
  scripts: string[],
  duration: string
) => ({
  patientId,
  selectedScripts: scripts,
  callDuration: duration,
  timestamp: new Date().toISOString(),
});
