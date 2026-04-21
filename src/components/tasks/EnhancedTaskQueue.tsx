import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { EnhancedPopulationTask, TaskFilters, TaskMetrics, TaskModule, TaskStatus } from '@/types/enhancedTask';
import { Search, Plus, Filter, List, Table as TableIcon, Kanban, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StatusPill } from '@/components/ui/status-dot';
import { NewTaskModal, type NewTaskSubmission } from './NewTaskModal';
import { TaskMetricsFooter } from './TaskMetricsFooter';
import { TaskBoardView } from './TaskBoardView';
import { TaskTableView } from './TaskTableView';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type ViewMode = 'list' | 'board' | 'table';
type GroupBy = 'none' | 'status' | 'priority' | 'module';
type AssigneeFilter = TaskFilters['assignee'];
type PriorityFilter = TaskFilters['priority'];
type ModuleFilter = TaskFilters['module'];
type StatusFilter = TaskFilters['status'];

interface EnhancedTaskQueueProps {
  tasks: EnhancedPopulationTask[];
  metrics: TaskMetrics;
  onOpenTask: (taskId: string) => void;
  onTaskUpdate: (taskId: string, updates: Partial<EnhancedPopulationTask>) => void;
  onTaskCreate: (task: EnhancedPopulationTask) => void;
}

const isViewMode = (v: string): v is ViewMode => v === 'list' || v === 'board' || v === 'table';

export function EnhancedTaskQueue({
  tasks,
  metrics,
  onOpenTask,
  onTaskUpdate,
  onTaskCreate,
}: EnhancedTaskQueueProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const viewModeParam = searchParams.get('view') ?? '';
  const viewMode: ViewMode = isViewMode(viewModeParam) ? viewModeParam : 'list';

  const [filters, setFilters] = useState<TaskFilters>({
    module: 'All',
    priority: 'All',
    status: 'All',
    assignee: 'All',
    searchTerm: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [groupBy, setGroupBy] = useState<GroupBy>('none');

  const setViewMode = (v: ViewMode) => {
    const next = new URLSearchParams(searchParams);
    next.set('view', v);
    setSearchParams(next, { replace: true });
  };

  const filteredTasks = tasks.filter(task => {
    if (filters.module !== 'All' && task.module !== filters.module) return false;
    if (filters.priority !== 'All' && task.priority !== filters.priority) return false;
    if (filters.status !== 'All' && task.status !== filters.status) return false;
    if (filters.assignee === 'AI' && !task.assignedToAI) return false;
    if (filters.assignee === 'Staff' && task.assignedToAI) return false;
    if (filters.searchTerm) {
      const q = filters.searchTerm.toLowerCase();
      if (!task.patientName.toLowerCase().includes(q) && !task.title.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  const getPriorityTone = (priority: string): 'red' | 'orange' | 'blue' | 'muted' => {
    switch (priority) {
      case 'High': return 'red';
      case 'Medium': return 'orange';
      case 'Low': return 'blue';
      default: return 'muted';
    }
  };

  const getPriorityBar = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-orange-500';
      case 'Low': return 'bg-blue-500';
      default: return 'bg-muted-foreground/40';
    }
  };

  const handleTaskClick = (task: EnhancedPopulationTask) => onOpenTask(task.id);

  const handleNewTaskSubmit = (data: NewTaskSubmission) => {
    const newTask: EnhancedPopulationTask = {
      id: `T-${Date.now()}`,
      title: 'New task',
      patientName: 'Unassigned',
      patientId: 'PENDING',
      description: '',
      priority: 'Medium',
      estimatedTime: '10 min',
      status: 'needs-review',
      dueDate: data.dueDate,
      taskType: 'Manual',
      module: data.module,
      channel: data.channel,
      assignedToAI: data.assignToAI,
      aiStatus: data.assignToAI ? 'pending' : null,
      auditLog: [
        {
          id: `audit-${Date.now()}`,
          timestamp: new Date().toISOString(),
          actor: 'Staff',
          actorType: 'Staff',
          action: 'Task created manually',
          outcome: 'success',
        },
      ],
    };
    onTaskCreate(newTask);
  };

  const groupTasks = (items: EnhancedPopulationTask[]) => {
    if (groupBy === 'none') return { 'All Tasks': items };
    return items.reduce<Record<string, EnhancedPopulationTask[]>>((groups, task) => {
      const key =
        groupBy === 'status' ? task.status :
        groupBy === 'priority' ? task.priority :
        groupBy === 'module' ? task.module : 'All Tasks';
      (groups[key] ||= []).push(task);
      return groups;
    }, {});
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
          <div className={`w-0.5 h-10 rounded-full flex-shrink-0 ${getPriorityBar(task.priority)}`} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="font-medium text-sm text-foreground truncate">{task.title}</span>
              <span className="text-xs text-muted-foreground truncate">· {task.patientName}</span>
              <StatusPill tone={getPriorityTone(task.priority)}>{task.priority}</StatusPill>
              {task.assignedToAI && (
                <StatusPill tone="violet">
                  <Bot className="w-2.5 h-2.5" />
                  AI
                </StatusPill>
              )}
            </div>
            <p className="text-xs text-muted-foreground line-clamp-1">{task.description}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xs text-muted-foreground">{task.estimatedTime}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-shrink-0 p-4 bg-card border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Task Queue</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {filteredTasks.length} tasks {filters.module !== 'All' && `in ${filters.module}`}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Tabs value={viewMode} onValueChange={v => { if (isViewMode(v)) setViewMode(v); }}>
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

        <div className="flex items-center gap-2">
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              className="pl-7 h-9 text-sm"
              value={filters.searchTerm}
              onChange={e => setFilters({ ...filters, searchTerm: e.target.value })}
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(s => !s)}
            className="gap-1 h-9 px-3 text-xs flex-shrink-0"
          >
            <Filter className="w-3 h-3" />
            <span className="hidden sm:inline">Filters</span>
          </Button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-2 gap-2 mt-3 p-3 bg-muted/50 rounded-md">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Group By</label>
              <Select value={groupBy} onValueChange={v => setGroupBy(v as GroupBy)}>
                <SelectTrigger className="h-7 text-xs"><SelectValue /></SelectTrigger>
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
              <Select value={filters.module} onValueChange={v => setFilters({ ...filters, module: v as ModuleFilter })}>
                <SelectTrigger className="h-7 text-xs"><SelectValue /></SelectTrigger>
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
              <Select value={filters.priority} onValueChange={v => setFilters({ ...filters, priority: v as PriorityFilter })}>
                <SelectTrigger className="h-7 text-xs"><SelectValue /></SelectTrigger>
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
              <Select value={filters.status} onValueChange={v => setFilters({ ...filters, status: v as StatusFilter })}>
                <SelectTrigger className="h-7 text-xs"><SelectValue /></SelectTrigger>
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
              <Select value={filters.assignee} onValueChange={v => setFilters({ ...filters, assignee: v as AssigneeFilter })}>
                <SelectTrigger className="h-7 text-xs"><SelectValue /></SelectTrigger>
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

      <div className="flex-1 overflow-y-auto p-4">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm text-muted-foreground">No tasks match the current filters.</p>
          </div>
        ) : viewMode === 'board' ? (
          <TaskBoardView tasks={filteredTasks} onTaskClick={handleTaskClick} />
        ) : viewMode === 'table' ? (
          <TaskTableView
            tasks={filteredTasks}
            onTaskClick={handleTaskClick}
            onUpdate={onTaskUpdate}
          />
        ) : (
          <div className="space-y-4">
            {Object.entries(groupedTasks).map(([groupName, groupItems]) => (
              <div key={groupName}>
                {groupBy !== 'none' && (
                  <h3 className="text-sm font-semibold text-foreground mb-2 sticky top-0 bg-background py-2">
                    {groupName} ({groupItems.length})
                  </h3>
                )}
                <div className="space-y-2">{groupItems.map(renderTaskRow)}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex-shrink-0">
        <TaskMetricsFooter metrics={metrics} />
      </div>

      <NewTaskModal
        open={showNewTaskModal}
        onClose={() => setShowNewTaskModal(false)}
        onSubmit={handleNewTaskSubmit}
      />
    </div>
  );
}
