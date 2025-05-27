
import React from 'react';
import { populationTasksData } from '@/data/populationTasksData';
import { MonthlyStabilityReviewContent } from './MonthlyStabilityReviewContent';

interface CareTaskContentProps {
  taskId: string;
  onComplete: () => void;
}

export const CareTaskContent: React.FC<CareTaskContentProps> = ({ taskId, onComplete }) => {
  const task = populationTasksData.find(t => t.id === taskId);
  
  if (!task) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-500">Task not found</p>
        </div>
      </div>
    );
  }

  // Route to specific task content based on task type
  if (task.taskType === 'Monthly Stability Review') {
    return <MonthlyStabilityReviewContent taskId={taskId} onComplete={onComplete} />;
  }

  // Default task content for other task types
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-blue-900">{task.title}</h2>
        <p className="text-sm text-blue-700">{task.description}</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="font-medium text-gray-900 mb-2">Task Details</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <div>Patient: {task.patientName}</div>
            <div>Priority: {task.priority}</div>
            <div>Estimated Time: {task.estimatedTime}</div>
            <div>Due Date: {task.dueDate}</div>
            {task.triggeredBy && <div>Triggered By: {task.triggeredBy}</div>}
          </div>
        </div>
        
        <button
          onClick={onComplete}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm"
        >
          Mark Complete
        </button>
      </div>
    </div>
  );
};
