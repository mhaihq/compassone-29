import { EnhancedTaskQueue } from '@/components/tasks/EnhancedTaskQueue';
import { useTasks } from '@/hooks/useTasks';
import { Skeleton } from '@/components/ui/skeleton';

interface TaskQueueContentProps {
  onOpenTask: (taskId: string) => void;
}

export function TaskQueueContent({ onOpenTask }: TaskQueueContentProps) {
  const { tasks, isLoading, metrics, applyUpdate, addTask } = useTasks();

  if (isLoading) {
    return (
      <div className="p-4 space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-14 w-full" />
        ))}
      </div>
    );
  }

  return (
    <EnhancedTaskQueue
      tasks={tasks}
      metrics={metrics}
      onOpenTask={onOpenTask}
      onTaskUpdate={applyUpdate}
      onTaskCreate={addTask}
    />
  );
}
