import React from 'react';
import { populationTasksData } from '@/data/populationTasksData';
import { EnhancedTaskQueue } from '@/components/tasks/EnhancedTaskQueue';

interface TaskQueueContentProps {
  onOpenTask: (taskId: string) => void;
}

export const TaskQueueContent: React.FC<TaskQueueContentProps> = () => {
  return <EnhancedTaskQueue tasks={populationTasksData} />;
};
