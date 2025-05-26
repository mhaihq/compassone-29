
import React from 'react';
import { ClipboardList, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const ProtocolsContent: React.FC = () => {
  const protocols = [
    {
      id: 1,
      name: "Mental Health Assessment Protocol",
      status: "Active",
      lastUpdated: "2024-01-15",
      steps: 5,
      completedSteps: 3,
      priority: "High",
      description: "Comprehensive mental health evaluation and care planning"
    },
    {
      id: 2,
      name: "Medication Adherence Protocol",
      status: "Pending",
      lastUpdated: "2024-01-10",
      steps: 4,
      completedSteps: 1,
      priority: "Medium",
      description: "Monitor and support medication compliance"
    },
    {
      id: 3,
      name: "Crisis Intervention Protocol",
      status: "Complete",
      lastUpdated: "2024-01-08",
      steps: 3,
      completedSteps: 3,
      priority: "High",
      description: "Emergency response and stabilization procedures"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Complete':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Active':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'Pending':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <ClipboardList className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Complete':
        return 'bg-green-100 text-green-800';
      case 'Active':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Treatment Protocols</h3>
        <Button size="sm" variant="outline">
          <ClipboardList className="h-4 w-4 mr-2" />
          Add Protocol
        </Button>
      </div>

      <div className="space-y-3">
        {protocols.map((protocol) => (
          <Card key={protocol.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(protocol.status)}
                  <CardTitle className="text-sm font-medium">{protocol.name}</CardTitle>
                </div>
                <div className="flex gap-2">
                  <Badge className={`text-xs ${getPriorityColor(protocol.priority)}`}>
                    {protocol.priority}
                  </Badge>
                  <Badge className={`text-xs ${getStatusColor(protocol.status)}`}>
                    {protocol.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600 mb-3">{protocol.description}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Progress: {protocol.completedSteps}/{protocol.steps} steps</span>
                  <span>Updated: {protocol.lastUpdated}</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${(protocol.completedSteps / protocol.steps) * 100}%` }}
                  />
                </div>
              </div>
              
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="outline" className="flex-1">
                  View Details
                </Button>
                {protocol.status === 'Active' && (
                  <Button size="sm" className="flex-1">
                    Continue
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Protocol Summary</h4>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-lg font-semibold text-blue-600">1</div>
            <div className="text-xs text-gray-600">Active</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-yellow-600">1</div>
            <div className="text-xs text-gray-600">Pending</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-green-600">1</div>
            <div className="text-xs text-gray-600">Complete</div>
          </div>
        </div>
      </div>
    </div>
  );
};
