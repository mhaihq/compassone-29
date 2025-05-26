
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Clock, User, ArrowRight, Search, Filter, ChevronDown, ChevronRight } from 'lucide-react';
import { populationTasksData, PopulationTask } from '@/data/populationTasksData';
import { CareTaskModal } from '@/components/care-task/CareTaskModal';

const TaskRow: React.FC<{ task: PopulationTask; onOpenTask: (taskId: string) => void }> = ({ task, onOpenTask }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-50 text-red-700 border-red-200';
      case 'Medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Low': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const handleTakeAction = () => {
    onOpenTask(task.id);
  };

  return (
    <div className="p-3 border-b last:border-b-0 hover:bg-gray-50/50 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start gap-2">
            <div className="flex-1">
              <div className="font-medium text-sm text-[#1E4D36] mb-1">{task.title}</div>
              <div className="text-xs text-gray-600 mb-2">{task.description}</div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="text-sm text-gray-700">{task.patientName}</div>
                <div className="text-xs text-gray-500">ID: {task.patientId}</div>
                <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock size={12} />
                  <span>{task.estimatedTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button 
          variant="ghost"
          size="sm" 
          className="h-8 px-3 text-xs text-gray-600 hover:text-[#1E4D36] hover:bg-gray-100 self-start sm:self-center"
          onClick={handleTakeAction}
        >
          <ArrowRight size={14} className="mr-1" />
          Take Action
        </Button>
      </div>
    </div>
  );
};

const TaskBin: React.FC<{ title: string; tasks: PopulationTask[]; count: number; onOpenTask: (taskId: string) => void }> = ({ title, tasks, count, onOpenTask }) => {
  const [isOpen, setIsOpen] = useState(true);
  
  const getBinColor = (title: string) => {
    switch (title) {
      case 'Needs review': return 'border-orange-200 bg-orange-50';
      case 'In progress': return 'border-blue-200 bg-blue-50';
      case 'Needs QHP': return 'border-purple-200 bg-purple-50';
      case 'Completed': return 'border-green-200 bg-green-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className={`rounded-lg border ${getBinColor(title)} overflow-hidden`}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <button className="w-full p-3 flex items-center justify-between hover:bg-white/50 transition-colors">
            <div className="flex items-center gap-2">
              <span className="font-medium text-[#1E4D36]">{title}</span>
              <Badge variant="outline" className="text-xs">
                {count}
              </Badge>
            </div>
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="bg-white">
            {tasks.length > 0 ? (
              tasks.map(task => (
                <TaskRow key={task.id} task={task} onOpenTask={onOpenTask} />
              ))
            ) : (
              <div className="p-6 text-center text-gray-500 text-sm">
                No tasks in this category
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export const TaskQueueContent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenTask = (taskId: string) => {
    setSelectedTaskId(taskId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTaskId(null);
  };

  const filteredTasks = populationTasksData.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    
    return matchesSearch && matchesPriority;
  });

  // Categorize tasks into bins based on status
  const taskBins = {
    'Needs review': filteredTasks.filter(task => task.status === 'needs-review'),
    'In progress': filteredTasks.filter(task => task.status === 'in-progress'),
    'Needs QHP': filteredTasks.filter(task => task.status === 'needs-qhp'),
    'Completed': filteredTasks.filter(task => task.status === 'completed')
  };

  const totalTasks = Object.values(taskBins).reduce((sum, tasks) => sum + tasks.length, 0);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-[#1E4D36]">Population Task Queue</h2>
        <Badge variant="outline" className="text-xs self-start sm:self-center">
          {totalTasks} Total Tasks
        </Badge>
      </div>
      
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search tasks, patients, or descriptions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 text-sm"
        />
      </div>

      {/* Collapsible Filters */}
      <Collapsible open={showFilters} onOpenChange={setShowFilters}>
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Filter size={14} />
            Filters
            {showFilters ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="mt-3 p-4 bg-gray-50 rounded-lg">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <label className="text-xs font-medium text-gray-700 mb-1 block">Priority</label>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="text-xs">
                    <SelectValue placeholder="All Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      {/* Task Bins */}
      <div className="space-y-4">
        {Object.entries(taskBins).map(([binTitle, tasks]) => (
          <TaskBin 
            key={binTitle} 
            title={binTitle} 
            tasks={tasks} 
            count={tasks.length}
            onOpenTask={handleOpenTask}
          />
        ))}
      </div>
      
      {totalTasks === 0 && (
        <div className="p-8 text-center text-gray-500">
          <Filter className="h-8 w-8 mx-auto mb-2 text-gray-300" />
          <p>No tasks match your current filters</p>
        </div>
      )}

      {/* Care Task Modal */}
      <CareTaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        taskId={selectedTaskId}
      />
    </div>
  );
};
