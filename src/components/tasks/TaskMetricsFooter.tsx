import React from 'react';
import { TaskMetrics } from '@/types/enhancedTask';
import { Bot, User, Clock, CheckCircle } from 'lucide-react';

interface TaskMetricsFooterProps {
  metrics: TaskMetrics;
}

export const TaskMetricsFooter: React.FC<TaskMetricsFooterProps> = ({ metrics }) => {
  return (
    <div className="border-t border-border bg-card px-6 py-3">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-violet-600" />
            <span className="text-muted-foreground">AI Resolution:</span>
            <span className="font-medium text-foreground">{metrics.aiResolutionRate}%</span>
          </div>
          
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-blue-600" />
            <span className="text-muted-foreground">Staff:</span>
            <span className="font-medium text-foreground">{metrics.staffResolutionRate}%</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Avg Time:</span>
            <span className="font-medium text-foreground">{metrics.avgResolutionHours}h</span>
          </div>
          
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span className="text-muted-foreground">Completed Today:</span>
            <span className="font-medium text-foreground">{metrics.tasksCompletedToday}</span>
          </div>
        </div>
        
        <div className="text-muted-foreground">
          <span className="font-medium text-foreground">{metrics.pendingTasks}</span> of {metrics.totalTasks} pending
        </div>
      </div>
    </div>
  );
};
