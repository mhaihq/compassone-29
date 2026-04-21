import { useCallback, useMemo, useState } from 'react';
import { populationTasksData } from '@/data/populationTasksData';
import type { EnhancedPopulationTask, TaskMetrics } from '@/types/enhancedTask';

// TODO: Replace with real API call (React Query, etc.)
export function useTasks() {
  const [tasks, setTasks] = useState<EnhancedPopulationTask[]>(populationTasksData);
  const [isLoading] = useState(false);

  const applyUpdate = useCallback((taskId: string, updates: Partial<EnhancedPopulationTask>) => {
    setTasks(prev => prev.map(t => (t.id === taskId ? { ...t, ...updates } : t)));
  }, []);

  const addTask = useCallback((task: EnhancedPopulationTask) => {
    setTasks(prev => [task, ...prev]);
  }, []);

  const removeTask = useCallback((taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  }, []);

  const metrics: TaskMetrics = useMemo(() => {
    const total = tasks.length;
    const pending = tasks.filter(t => t.status !== 'completed').length;
    const aiHandled = tasks.filter(t => t.assignedToAI).length;
    const aiResolutionRate = total === 0 ? 0 : Math.round((aiHandled / total) * 100);
    return {
      aiResolutionRate,
      staffResolutionRate: 100 - aiResolutionRate,
      avgResolutionHours: 2.3,
      tasksCompletedToday: tasks.filter(t => t.status === 'completed').length,
      totalTasks: total,
      pendingTasks: pending,
    };
  }, [tasks]);

  return {
    tasks,
    isLoading,
    metrics,
    applyUpdate,
    addTask,
    removeTask,
  };
}
