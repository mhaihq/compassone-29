
export interface TaskCallContext {
  taskId: string;
  taskTitle: string;
  patientId: string;
  patientName: string;
  taskType: string;
  priority: 'High' | 'Medium' | 'Low';
  description?: string;
  dueDate?: string;
  assignedTo?: string;
  status?: string;
}

export interface CallTaskUpdate {
  taskId: string;
  callSummary: string;
  outcome: string;
  nextSteps: string[];
  newTasksCreated?: Array<{
    title: string;
    description: string;
    priority: 'High' | 'Medium' | 'Low';
    dueDate: string;
  }>;
  taskStatus: 'completed' | 'needs-follow-up' | 'escalated';
}
