import React from 'react';
import { MessageCircle, FileText, CalendarDays } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { patientData } from '@/data/patientData';
import { PriorityTaskItem } from './PriorityTaskItem';
import { ArrowUpRight, FileText as FileTextIcon } from '@/components/SidebarIcons';

// Updated priority tasks to match Hana-triggered population level tasks for Matteo Grassi
const priorityTasks = [
  {
    id: 'T-1001',
    title: 'Mental Health Monitoring',
    description: 'High Alert: Depression symptoms requiring immediate clinical review and intervention',
    dueDate: '2025-05-27',
    status: 'Needs Review',
    statusColor: 'red',
    icon: <ArrowUpRight className="text-red-500" size={18} />
  },
  {
    id: 'T-1002',
    title: 'Blood Pressure Elevated', 
    description: 'Recent reading 138/88 mmHg, above target range',
    dueDate: '2025-05-27',
    status: 'Needs Review',
    statusColor: 'red',
    icon: <FileTextIcon className="text-red-500" size={18} />
  },
  {
    id: 'T-1003',
    title: 'Medication Adherence Issues',
    description: 'Occasional missed Lisinopril doses affecting BP control',
    dueDate: '2025-05-28',
    status: 'Needs Review',
    statusColor: 'yellow',
    icon: <ArrowUpRight className="text-yellow-500" size={18} />
  }
];

// Calculate time since last Hana call
const getTimeSinceLastCall = (): string => {
  // Last Hana call was May 22, 2025
  const lastCallDate = new Date('2025-05-22');
  const today = new Date('2025-05-26'); // Current date
  
  const diffInHours = Math.floor((today.getTime() - lastCallDate.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else {
    const days = Math.floor(diffInHours / 24);
    return `${days}d ago`;
  }
};

interface ModifiedOverviewTabProps {
  onTaskClick: () => void;
}

export const ModifiedOverviewTab: React.FC<ModifiedOverviewTabProps> = ({ onTaskClick }) => {
  return (
    <div className="bg-[#F1F1F1] p-4 rounded-lg space-y-6">
      {/* Priority Tasks Section */}
      <section>
        <h3 className="font-medium text-gray-900 mb-4 flex items-center">
          <FileTextIcon className="mr-2 text-[#1E4D36]" size={18} />
          Priority Tasks (Hana-Triggered)
        </h3>
        
        <div className="space-y-4">
          {priorityTasks.map(task => (
            <PriorityTaskItem 
              key={task.id} 
              task={task} 
              onTaskClick={onTaskClick}
            />
          ))}
        </div>
      </section>

      {/* Engagement - Enhanced version with Hana-specific data */}
      <section>
        <h3 className="font-medium text-gray-900 mb-4 flex items-center">
          <MessageCircle className="mr-2 text-[#1E4D36]" size={18} />
          Hana AI Coach Engagement
        </h3>
        <Card className="bg-white border-none shadow-sm rounded-lg overflow-hidden">
          <div className="bg-[#1E4D36] px-4 py-3">
            <div className="flex justify-between items-center">
              <h4 className="text-white font-medium">Hana Call History</h4>
              <Badge className="bg-green-100 text-green-700">
                Last call: {getTimeSinceLastCall()}
              </Badge>
            </div>
          </div>
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center p-2 bg-[#F8F8F8] rounded-lg">
                <p className="text-sm text-gray-600">Calls this week</p>
                <p className="text-xl font-medium text-[#1E4D36]">2</p>
              </div>
              <div className="text-center p-2 bg-[#F8F8F8] rounded-lg">
                <p className="text-sm text-gray-600">Avg. Duration</p>
                <p className="text-xl font-medium text-[#1E4D36]">16 min</p>
              </div>
              <div className="text-center p-2 bg-[#F8F8F8] rounded-lg">
                <p className="text-sm text-gray-600">Engagement</p>
                <p className="text-xl font-medium text-[#1E4D36]">Good</p>
              </div>
            </div>
            
            <div className="mb-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Recent Call Topics</h5>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-red-50 text-red-700 border-red-100">Mental Health Alert</Badge>
                <Badge className="bg-blue-50 text-blue-700 border-blue-100">Blood Pressure</Badge>
                <Badge className="bg-yellow-50 text-yellow-700 border-yellow-100">Medication Adherence</Badge>
                <Badge className="bg-green-50 text-green-700 border-green-100">Exercise Goals</Badge>
              </div>
            </div>
            
            <div className="mb-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Hana's Key Insights</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li className="flex items-start">
                  <span className="text-[#1E4D36] mr-2">•</span>
                  High Alert: Depression symptoms requiring immediate clinical intervention
                </li>
                <li className="flex items-start">
                  <span className="text-[#1E4D36] mr-2">•</span>
                  Blood pressure trending up due to medication non-adherence
                </li>
                <li className="flex items-start">
                  <span className="text-[#1E4D36] mr-2">•</span>
                  Patient motivated but struggling with time management for exercise
                </li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-sm font-medium text-gray-700 mb-2">Risk Flags</h5>
              <Alert className="bg-red-50 border-red-200 py-2">
                <AlertTitle className="text-red-800 text-sm font-medium">Critical Alert</AlertTitle>
                <AlertDescription className="text-red-700 text-xs mt-1">
                  Mental health symptoms require immediate clinical review and intervention
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Billing Overview */}
      <section>
        <h3 className="font-medium text-gray-900 mb-4 flex items-center">
          <FileTextIcon className="mr-2 text-[#1E4D36]" size={18} />
          Billing Overview
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-white border-none shadow-sm rounded-lg overflow-hidden">
            <CardContent className="p-4">
              <h4 className="font-medium text-gray-900">CCM 99490</h4>
              <p className="text-sm text-gray-600 mb-3">Chronic Care Management</p>
              
              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Time Used</span>
                  <span className="text-gray-900 font-medium">8/20 min</span>
                </div>
                <Progress value={40} className="h-2 bg-gray-100" />
              </div>
              
              <div className="text-right">
                <span className="text-xs text-gray-500">
                  12 minutes remaining
                </span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-none shadow-sm rounded-lg overflow-hidden">
            <CardContent className="p-4">
              <h4 className="font-medium text-gray-900">BHI 99484</h4>
              <p className="text-sm text-gray-600 mb-3">Behavioral Health Integration</p>
              
              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Time Used</span>
                  <span className="text-gray-900 font-medium">5/20 min</span>
                </div>
                <Progress value={25} className="h-2 bg-gray-100" />
              </div>
              
              <div className="text-right">
                <span className="text-xs text-gray-500">
                  15 minutes remaining
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Calendar Quick View */}
      <section>
        <h3 className="font-medium text-gray-900 mb-4 flex items-center">
          <CalendarDays className="mr-2 text-[#1E4D36]" size={18} />
          Upcoming Schedule
        </h3>
        <Card className="bg-white border-none shadow-sm rounded-lg overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center justify-between p-2 border-b">
              <div>
                <h4 className="font-medium text-gray-900">Next Hana Call</h4>
                <p className="text-sm text-gray-600">Tue, May 29 • 10:00 AM</p>
              </div>
              <Badge className="bg-green-100 text-green-700">Scheduled</Badge>
            </div>
            
            <div className="flex items-center justify-between p-2">
              <div>
                <h4 className="font-medium text-gray-900">Follow-up: Dr. Rodriguez</h4>
                <p className="text-sm text-gray-600">Mon, Jun 17 • 2:00 PM</p>
              </div>
              <Badge className="bg-blue-100 text-blue-700">In-Person</Badge>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};
