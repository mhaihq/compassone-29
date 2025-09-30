import React from 'react';
import { TaskMetrics } from '@/types/enhancedTask';
import { Bot, User, Clock, CheckCircle } from 'lucide-react';

interface TaskMetricsFooterProps {
  metrics: TaskMetrics;
}

export const TaskMetricsFooter: React.FC<TaskMetricsFooterProps> = ({ metrics }) => {
  return (
    <div className="border-t border-border bg-card px-4 py-2">
      <div className="flex items-center justify-between text-xs flex-wrap gap-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Bot className="w-3 h-3 text-violet-600" />
            <span className="text-muted-foreground">AI:</span>
            <span className="font-medium text-foreground">{metrics.aiResolutionRate}%</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <User className="w-3 h-3 text-blue-600" />
            <span className="text-muted-foreground">Staff:</span>
            <span className="font-medium text-foreground">{metrics.staffResolutionRate}%</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-muted-foreground" />
            <span className="text-muted-foreground">Avg:</span>
            <span className="font-medium text-foreground">{metrics.avgResolutionHours}h</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-3 h-3 text-emerald-600" />
            <span className="text-muted-foreground">Today:</span>
            <span className="font-medium text-foreground">{metrics.tasksCompletedToday}</span>
          </div>
        </div>
        
        <div className="text-muted-foreground">
          <span className="font-medium text-foreground">{metrics.pendingTasks}</span> / {metrics.totalTasks} pending
        </div>
      </div>
    </div>
  );
};
