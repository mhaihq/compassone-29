import React from 'react';
import { EnhancedPopulationTask, TaskStatus } from '@/types/enhancedTask';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, Clock } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TaskBoardViewProps {
  tasks: EnhancedPopulationTask[];
  onTaskClick: (task: EnhancedPopulationTask) => void;
}

const statusColumns: { status: TaskStatus; label: string; color: string }[] = [
  { status: 'needs-review', label: 'Needs Review', color: 'bg-yellow-50 border-yellow-200' },
  { status: 'in-progress', label: 'In Progress', color: 'bg-blue-50 border-blue-200' },
  { status: 'needs-qhp', label: 'Needs QHP', color: 'bg-purple-50 border-purple-200' },
  { status: 'completed', label: 'Completed', color: 'bg-green-50 border-green-200' },
];

export const TaskBoardView: React.FC<TaskBoardViewProps> = ({ tasks, onTaskClick }) => {
  const getModuleColor = (module: string) => {
    switch (module) {
      case 'Intake': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Coordination': return 'bg-violet-50 text-violet-700 border-violet-200';
      case 'Monitoring': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-severity-high';
      case 'Medium': return 'bg-severity-medium';
      case 'Low': return 'bg-severity-low';
      default: return 'bg-muted-foreground';
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4 h-full">
      {statusColumns.map(({ status, label, color }) => {
        const columnTasks = tasks.filter(task => task.status === status);
        
        return (
          <div key={status} className="flex flex-col h-full">
            <div className={`p-3 rounded-t-lg border ${color}`}>
              <h3 className="font-semibold text-sm">{label}</h3>
              <p className="text-xs text-muted-foreground mt-1">{columnTasks.length} tasks</p>
            </div>
            
            <ScrollArea className="flex-1 border-l border-r border-b rounded-b-lg bg-muted/20 p-2">
              <div className="space-y-2">
                {columnTasks.map(task => (
                  <Card 
                    key={task.id}
                    className="cursor-pointer hover:shadow-md transition-all"
                    onClick={() => onTaskClick(task)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start gap-2 mb-2">
                        <div className={`w-1 h-full rounded-full flex-shrink-0 ${getPriorityColor(task.priority)}`} />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{task.title}</h4>
                          <p className="text-xs text-muted-foreground truncate mt-1">{task.patientName}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 flex-wrap mt-2">
                        <Badge className={`${getModuleColor(task.module)} text-xs px-1.5 py-0`}>
                          {task.module}
                        </Badge>
                        {task.assignedToAI && (
                          <Badge className="bg-violet-50 text-violet-700 border-violet-200 gap-1 text-xs px-1.5 py-0">
                            <Bot className="w-2.5 h-2.5" />
                            AI
                          </Badge>
                        )}
                        <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                          <Clock className="w-3 h-3" />
                          {task.estimatedTime}
                        </div>
                      </div>
                      
                      {task.description && (
                        <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{task.description}</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        );
      })}
    </div>
  );
};
