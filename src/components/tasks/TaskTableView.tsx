import React from 'react';
import { EnhancedPopulationTask } from '@/types/enhancedTask';
import { Badge } from '@/components/ui/badge';
import { Bot } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TaskTableViewProps {
  tasks: EnhancedPopulationTask[];
  onTaskClick: (task: EnhancedPopulationTask) => void;
  onUpdate?: (taskId: string, updates: Partial<EnhancedPopulationTask>) => void;
}

export const TaskTableView: React.FC<TaskTableViewProps> = ({ tasks, onTaskClick, onUpdate }) => {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'needs-review': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'in-progress': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'needs-qhp': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'completed': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleStatusChange = (taskId: string, newStatus: string) => {
    if (onUpdate) {
      onUpdate(taskId, { status: newStatus as any });
    }
  };

  const handlePriorityChange = (taskId: string, newPriority: string) => {
    if (onUpdate) {
      onUpdate(taskId, { priority: newPriority as any });
    }
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]"></TableHead>
            <TableHead className="min-w-[200px]">Task</TableHead>
            <TableHead className="min-w-[150px]">Patient</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Module</TableHead>
            <TableHead>Assignee</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Est. Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map(task => (
            <TableRow 
              key={task.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => onTaskClick(task)}
            >
              <TableCell>
                <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
              </TableCell>
              <TableCell className="font-medium">{task.title}</TableCell>
              <TableCell>{task.patientName}</TableCell>
              <TableCell onClick={(e) => e.stopPropagation()}>
                <Select 
                  value={task.status} 
                  onValueChange={(value) => handleStatusChange(task.id, value)}
                >
                  <SelectTrigger className="h-7 text-xs w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="needs-review">Needs Review</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="needs-qhp">Needs QHP</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell onClick={(e) => e.stopPropagation()}>
                <Select 
                  value={task.priority} 
                  onValueChange={(value) => handlePriorityChange(task.id, value)}
                >
                  <SelectTrigger className="h-7 text-xs w-[100px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Badge className={`${getModuleColor(task.module)} text-xs px-1.5 py-0`}>
                  {task.module}
                </Badge>
              </TableCell>
              <TableCell>
                {task.assignedToAI ? (
                  <Badge className="bg-violet-50 text-violet-700 border-violet-200 gap-1 text-xs px-1.5 py-0">
                    <Bot className="w-2.5 h-2.5" />
                    AI
                  </Badge>
                ) : (
                  <span className="text-xs text-muted-foreground">
                    {task.assignedTo || 'Unassigned'}
                  </span>
                )}
              </TableCell>
              <TableCell className="text-xs text-muted-foreground">{task.dueDate}</TableCell>
              <TableCell className="text-xs text-muted-foreground">{task.estimatedTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
