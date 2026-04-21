import React, { useState } from 'react';
import { EnhancedPopulationTask, TaskFilters, TaskMetrics } from '@/types/enhancedTask';
import { Search, Plus, Filter, List, LayoutGrid, Table as TableIcon, Kanban, ChevronRight, Bot, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { NewTaskModal } from './NewTaskModal';
import { TaskMetricsFooter } from './TaskMetricsFooter';
import { TaskBoardView } from './TaskBoardView';
import { TaskTableView } from './TaskTableView';
import { TaskDetailDrawer } from './TaskDetailDrawer';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface EnhancedTaskQueueProps {
  tasks: EnhancedPopulationTask[];
  onOpenTask?: (taskId: string) => void;
}

export const EnhancedTaskQueue: React.FC<EnhancedTaskQueueProps> = ({ tasks, onOpenTask }) => {
  const [filters, setFilters] = useState<TaskFilters>({
    module: 'All',
    priority: 'All',
    status: 'All',
    assignee: 'All',
    searchTerm: ''
  });
  const [viewMode, setViewMode] = useState<'list' | 'board' | 'table'>('list');
  const [showFilters, setShowFilters] = useState(false);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<EnhancedPopulationTask | null>(null);
  const [groupBy, setGroupBy] = useState<'none' | 'status' | 'priority' | 'module'>('none');

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (filters.module !== 'All' && task.module !== filters.module) return false;
    if (filters.priority !== 'All' && task.priority !== filters.priority) return false;
    if (filters.status !== 'All' && task.status !== filters.status) return false;
    if (filters.assignee === 'AI' && !task.assignedToAI) return false;
    if (filters.assignee === 'Staff' && task.assignedToAI) return false;
    if (filters.searchTerm && !task.patientName.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
        !task.title.toLowerCase().includes(filters.searchTerm.toLowerCase())) return false;
    return true;
  });

  // Calculate metrics
  const metrics: TaskMetrics = {
    aiResolutionRate: 67,
    staffResolutionRate: 33,
    avgResolutionHours: 2.3,
    tasksCompletedToday: 12,
    totalTasks: tasks.length,
    pendingTasks: tasks.filter(t => t.status !== 'completed').length
  };

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

  const handleTaskClick = (task: EnhancedPopulationTask) => {
    setSelectedTask(task);
    if (onOpenTask) {
      onOpenTask(task.id);
    }
  };

  const handleTaskUpdate = (taskId: string, updates: Partial<EnhancedPopulationTask>) => {
    // In a real app, this would update the task in state/backend
    console.log('Update task:', taskId, updates);
  };

  const groupTasks = (tasks: EnhancedPopulationTask[]) => {
    if (groupBy === 'none') return { 'All Tasks': tasks };

    return tasks.reduce((groups, task) => {
      let key: string;
      switch (groupBy) {
        case 'status':
          key = task.status;
          break;
        case 'priority':
          key = task.priority;
          break;
        case 'module':
          key = task.module;
          break;
        default:
          key = 'All Tasks';
      }
      if (!groups[key]) groups[key] = [];
      groups[key].push(task);
      return groups;
    }, {} as Record<string, EnhancedPopulationTask[]>);
  };

  const groupedTasks = groupTasks(filteredTasks);

  const renderTaskRow = (task: EnhancedPopulationTask) => (
    <Card 
      key={task.id}
      className="hover:shadow-sm transition-all cursor-pointer"
      onClick={() => handleTaskClick(task)}
    >
      <CardContent className="p-3">
        <div className="flex items-center gap-2">
          {/* Priority Indicator */}
          <div className={`w-1 h-10 rounded-full flex-shrink-0 ${getPriorityColor(task.priority)}`} />
          
          {/* Task Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 mb-1 flex-wrap">
              <span className="font-medium text-sm text-foreground truncate">{task.title}</span>
              <ChevronRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
              <span className="text-xs text-muted-foreground truncate">{task.patientName}</span>
              <ChevronRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
              <Badge className={`${getPriorityColor(task.priority)} text-white border-0 text-xs px-1.5 py-0`}>
                {task.priority}
              </Badge>
              <ChevronRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
              <Badge className={`${getModuleColor(task.module)} text-xs px-1.5 py-0`}>
                {task.module}
              </Badge>
              {task.assignedToAI && (
                <>
                  <ChevronRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                  <Badge className="bg-violet-50 text-violet-700 border-violet-200 gap-1 text-xs px-1.5 py-0">
                    <Bot className="w-2.5 h-2.5" />
                    AI
                  </Badge>
                </>
              )}
            </div>
            <p className="text-xs text-muted-foreground line-clamp-1">{task.description}</p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xs text-muted-foreground">{task.estimatedTime}</span>
            <Button variant="ghost" size="sm" className="text-primary h-7 px-2 text-xs">
              Action
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header - Fixed at top */}
      <div className="flex-shrink-0 p-4 bg-card border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Task Queue</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {filteredTasks.length} tasks {filters.module !== 'All' && `in ${filters.module}`}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Tabs value={viewMode} onValueChange={(v: any) => setViewMode(v)}>
              <TabsList className="h-8">
                <TabsTrigger value="list" className="text-xs h-7 px-2 gap-1">
                  <List className="w-3 h-3" />
                  <span className="hidden sm:inline">List</span>
                </TabsTrigger>
                <TabsTrigger value="board" className="text-xs h-7 px-2 gap-1">
                  <Kanban className="w-3 h-3" />
                  <span className="hidden sm:inline">Board</span>
                </TabsTrigger>
                <TabsTrigger value="table" className="text-xs h-7 px-2 gap-1">
                  <TableIcon className="w-3 h-3" />
                  <span className="hidden sm:inline">Table</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Button onClick={() => setShowNewTaskModal(true)} className="gap-1 h-8 px-3 text-xs">
              <Plus className="w-3 h-3" />
              New Task
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              className="pl-7 h-9 text-sm"
              value={filters.searchTerm}
              onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-1 h-9 px-3 text-xs flex-shrink-0"
          >
            <Filter className="w-3 h-3" />
            <span className="hidden sm:inline">Filters</span>
          </Button>
        </div>

        {/* Filter Controls */}
        {showFilters && (
          <div className="grid grid-cols-2 gap-2 mt-3 p-3 bg-muted/50 rounded-md">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Group By</label>
              <Select value={groupBy} onValueChange={(v: any) => setGroupBy(v)}>
                <SelectTrigger className="h-7 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                  <SelectItem value="module">Module</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Module</label>
              <Select value={filters.module} onValueChange={(v: any) => setFilters({ ...filters, module: v })}>
                <SelectTrigger className="h-7 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Intake">Intake</SelectItem>
                  <SelectItem value="Coordination">Coordination</SelectItem>
                  <SelectItem value="Monitoring">Monitoring</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Priority</label>
              <Select value={filters.priority} onValueChange={(v: any) => setFilters({ ...filters, priority: v })}>
                <SelectTrigger className="h-7 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Status</label>
              <Select value={filters.status} onValueChange={(v: any) => setFilters({ ...filters, status: v })}>
                <SelectTrigger className="h-7 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="needs-review">Needs Review</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="needs-qhp">Needs QHP</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Assignee</label>
              <Select value={filters.assignee} onValueChange={(v: any) => setFilters({ ...filters, assignee: v })}>
                <SelectTrigger className="h-7 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="AI">AI</SelectItem>
                  <SelectItem value="Staff">Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      {/* Task Views - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">No tasks found</p>
          </div>
        ) : viewMode === 'board' ? (
          <TaskBoardView tasks={filteredTasks} onTaskClick={handleTaskClick} />
        ) : viewMode === 'table' ? (
          <TaskTableView 
            tasks={filteredTasks} 
            onTaskClick={handleTaskClick}
            onUpdate={handleTaskUpdate}
          />
        ) : (
          <div className="space-y-4">
            {Object.entries(groupedTasks).map(([groupName, groupTasks]) => (
              <div key={groupName}>
                {groupBy !== 'none' && (
                  <h3 className="text-sm font-semibold text-foreground mb-2 sticky top-0 bg-background py-2">
                    {groupName} ({groupTasks.length})
                  </h3>
                )}
                <div className="space-y-2">
                  {groupTasks.map(renderTaskRow)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Metrics Footer - Fixed at bottom */}
      <div className="flex-shrink-0">
        <TaskMetricsFooter metrics={metrics} />
      </div>

      {/* New Task Modal */}
      <NewTaskModal 
        open={showNewTaskModal} 
        onClose={() => setShowNewTaskModal(false)} 
        onSubmit={(data) => console.log('New task:', data)}
      />

      {/* Task Detail Drawer */}
      <TaskDetailDrawer
        task={selectedTask}
        open={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        onUpdate={handleTaskUpdate}
      />
    </div>
  );
};
