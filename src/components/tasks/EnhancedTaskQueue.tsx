import React, { useState } from 'react';
import { EnhancedPopulationTask, TaskFilters, TaskMetrics } from '@/types/enhancedTask';
import { Search, Plus, Filter, List, LayoutGrid, ChevronRight, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { NewTaskModal } from './NewTaskModal';
import { IntakeDrawer } from './IntakeDrawer';
import { CoordinationDrawer } from './CoordinationDrawer';
import { TaskMetricsFooter } from './TaskMetricsFooter';
import { useNavigate } from 'react-router-dom';

interface EnhancedTaskQueueProps {
  tasks: EnhancedPopulationTask[];
}

export const EnhancedTaskQueue: React.FC<EnhancedTaskQueueProps> = ({ tasks }) => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<TaskFilters>({
    module: 'All',
    priority: 'All',
    status: 'All',
    assignee: 'All',
    searchTerm: ''
  });
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  const [showFilters, setShowFilters] = useState(false);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<EnhancedPopulationTask | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

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
    if (task.module === 'Monitoring') {
      navigate(`/care-task/${task.id}`);
    } else {
      setDrawerOpen(true);
    }
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedTask(null);
  };

  const renderTaskRow = (task: EnhancedPopulationTask) => (
    <Card 
      key={task.id}
      className="mb-2 hover:shadow-md transition-all cursor-pointer"
      onClick={() => handleTaskClick(task)}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          {/* Priority Indicator */}
          <div className={`w-1 h-12 rounded-full ${getPriorityColor(task.priority)}`} />
          
          {/* Task Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-foreground">{task.patientName}</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{task.title}</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <Badge className={`${getPriorityColor(task.priority)} text-white border-0`}>
                {task.priority}
              </Badge>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <Badge className={getModuleColor(task.module)}>
                {task.module}
              </Badge>
              {task.assignedToAI && (
                <>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  <Badge className="bg-violet-50 text-violet-700 border-violet-200 gap-1">
                    <Bot className="w-3 h-3" />
                    AI
                  </Badge>
                </>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{task.description}</p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{task.estimatedTime}</span>
            <Button variant="ghost" size="sm" className="text-primary">
              Take Action
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Task Queue</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {filteredTasks.length} tasks {filters.module !== 'All' && `in ${filters.module}`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode(viewMode === 'list' ? 'kanban' : 'list')}
              className="gap-2"
            >
              {viewMode === 'list' ? <LayoutGrid className="w-4 h-4" /> : <List className="w-4 h-4" />}
              {viewMode === 'list' ? 'Kanban' : 'List'}
            </Button>
            <Button onClick={() => setShowNewTaskModal(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              New Task
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by patient name or task..."
              className="pl-10"
              value={filters.searchTerm}
              onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>

        {/* Filter Controls */}
        {showFilters && (
          <div className="grid grid-cols-4 gap-3 mt-4 p-4 bg-muted/50 rounded-lg">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Module</label>
              <Select value={filters.module} onValueChange={(v: any) => setFilters({ ...filters, module: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  <SelectItem value="All">All Modules</SelectItem>
                  <SelectItem value="Intake">Intake</SelectItem>
                  <SelectItem value="Coordination">Coordination</SelectItem>
                  <SelectItem value="Monitoring">Monitoring</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Priority</label>
              <Select value={filters.priority} onValueChange={(v: any) => setFilters({ ...filters, priority: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  <SelectItem value="All">All Priorities</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Status</label>
              <Select value={filters.status} onValueChange={(v: any) => setFilters({ ...filters, status: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  <SelectItem value="All">All Statuses</SelectItem>
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
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="AI">AI Only</SelectItem>
                  <SelectItem value="Staff">Staff Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      {/* Task List */}
      <div className="flex-1 overflow-y-auto p-6">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No tasks found matching your filters</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredTasks.map(renderTaskRow)}
          </div>
        )}
      </div>

      {/* Metrics Footer */}
      <TaskMetricsFooter metrics={metrics} />

      {/* New Task Modal */}
      <NewTaskModal
        open={showNewTaskModal}
        onClose={() => setShowNewTaskModal(false)}
        onSubmit={(data) => console.log('New task:', data)}
      />

      {/* Module-Specific Drawers */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent className="h-[90vh]">
          {selectedTask && selectedTask.module === 'Intake' && (
            <IntakeDrawer task={selectedTask} onClose={handleCloseDrawer} />
          )}
          {selectedTask && selectedTask.module === 'Coordination' && (
            <CoordinationDrawer task={selectedTask} onClose={handleCloseDrawer} />
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
};
