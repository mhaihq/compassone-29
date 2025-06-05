
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, Clock, AlertTriangle, User, Calendar, FileText, Brain, TrendingUp } from 'lucide-react';
import { generatePreCallInsights, PreCallInsight } from '@/services/aiCallService';

interface CallQueueProps {
  searchTerm: string;
  onStartCall: (patientId: string) => void;
}

interface QueuedCall {
  id: string;
  patientName: string;
  patientId: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
  scheduledTime: string;
  lastContact: string;
  preCallNotes: string[];
  riskFactors: string[];
  aiInsights?: PreCallInsight[];
}

const queuedCalls: QueuedCall[] = [
  {
    id: 'call-001',
    patientName: 'Matteo Grassi',
    patientId: 'P100592',
    reason: 'Monthly Stability Check',
    priority: 'high',
    scheduledTime: '2:00 PM',
    lastContact: '3 weeks ago',
    preCallNotes: [
      'Recent medication adjustment (Sertraline increased)',
      'Reported improved mood in last session',
      'Compliance rate: 95%'
    ],
    riskFactors: ['Hypertension', 'Depression history']
  },
  {
    id: 'call-002',
    patientName: 'Maria Rodriguez',
    patientId: 'P100594',
    reason: 'Follow-up Call',
    priority: 'high',
    scheduledTime: '2:30 PM',
    lastContact: '1 week ago',
    preCallNotes: [
      'Missed last appointment',
      'History of bipolar episodes',
      'Family expressed concerns'
    ],
    riskFactors: ['Bipolar Disorder', 'Medication non-compliance']
  },
  {
    id: 'call-003',
    patientName: 'Robert Chen',
    patientId: 'P100595',
    reason: 'Medication Review',
    priority: 'medium',
    scheduledTime: '3:00 PM',
    lastContact: '2 weeks ago',
    preCallNotes: [
      'PTSD therapy progress positive',
      'Sleep improvements noted',
      'Work stress levels decreasing'
    ],
    riskFactors: ['PTSD', 'Work-related stress']
  }
];

export const CallQueue: React.FC<CallQueueProps> = ({ searchTerm, onStartCall }) => {
  const [callsWithInsights, setCallsWithInsights] = useState<QueuedCall[]>(queuedCalls);
  const [loadingInsights, setLoadingInsights] = useState<Record<string, boolean>>({});

  // Load AI insights for each call
  useEffect(() => {
    const loadInsights = async () => {
      for (const call of queuedCalls) {
        setLoadingInsights(prev => ({ ...prev, [call.id]: true }));
        
        try {
          const insights = await generatePreCallInsights(call.patientId);
          setCallsWithInsights(prev => prev.map(c => 
            c.id === call.id ? { ...c, aiInsights: insights } : c
          ));
        } catch (error) {
          console.error('Failed to load insights for', call.patientId, error);
        }
        
        setLoadingInsights(prev => ({ ...prev, [call.id]: false }));
      }
    };

    loadInsights();
  }, []);

  const filteredCalls = callsWithInsights.filter(call =>
    call.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    call.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInsightTypeIcon = (type: string) => {
    switch (type) {
      case 'risk_factor': return <AlertTriangle className="w-3 h-3" />;
      case 'positive_trend': return <TrendingUp className="w-3 h-3" />;
      case 'medication_change': return <Calendar className="w-3 h-3" />;
      default: return <Brain className="w-3 h-3" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'risk_factor': return 'bg-red-50 text-red-700 border-red-200';
      case 'positive_trend': return 'bg-green-50 text-green-700 border-green-200';
      case 'medication_change': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'concern': return 'bg-orange-50 text-orange-700 border-orange-200';
      default: return 'bg-purple-50 text-purple-700 border-purple-200';
    }
  };

  return (
    <div className="space-y-4">
      {filteredCalls.map((call) => (
        <Card key={call.id} className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{call.patientName}</h3>
                  <p className="text-sm text-gray-600">ID: {call.patientId}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge className={getPriorityColor(call.priority)}>
                  {call.priority.toUpperCase()}
                </Badge>
                <p className="text-sm text-gray-600 mt-1">{call.scheduledTime}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">{call.reason}</h4>
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Last contact: {call.lastContact}
                  </span>
                </div>
              </div>

              {/* AI Insights Section */}
              {call.aiInsights && call.aiInsights.length > 0 && (
                <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                  <h5 className="text-sm font-medium text-purple-900 mb-2 flex items-center gap-1">
                    <Brain className="w-4 h-4" />
                    AI Pre-Call Insights ({call.aiInsights.length})
                  </h5>
                  <div className="space-y-2">
                    {call.aiInsights.slice(0, 2).map((insight, index) => (
                      <div key={index} className={`p-2 rounded border text-xs ${getInsightColor(insight.type)}`}>
                        <div className="flex items-center gap-1 mb-1">
                          {getInsightTypeIcon(insight.type)}
                          <span className="font-medium">{insight.title}</span>
                          <Badge variant="outline" className="ml-auto text-xs">
                            {Math.round(insight.confidence * 100)}%
                          </Badge>
                        </div>
                        <p>{insight.description}</p>
                      </div>
                    ))}
                    {call.aiInsights.length > 2 && (
                      <p className="text-xs text-purple-700">
                        +{call.aiInsights.length - 2} more insights available in call
                      </p>
                    )}
                  </div>
                </div>
              )}

              {loadingInsights[call.id] && (
                <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-purple-600 animate-pulse" />
                    <span className="text-sm text-purple-700">Loading AI insights...</span>
                  </div>
                </div>
              )}

              {/* Pre-call Intelligence */}
              <div className="bg-blue-50 p-3 rounded-lg">
                <h5 className="text-sm font-medium text-blue-900 mb-2 flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  Pre-call Intelligence
                </h5>
                <ul className="space-y-1">
                  {call.preCallNotes.map((note, index) => (
                    <li key={index} className="text-xs text-blue-800">• {note}</li>
                  ))}
                </ul>
              </div>

              {/* Risk Factors */}
              {call.riskFactors.length > 0 && (
                <div className="bg-orange-50 p-3 rounded-lg">
                  <h5 className="text-sm font-medium text-orange-900 mb-2 flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" />
                    Key Considerations
                  </h5>
                  <div className="flex flex-wrap gap-1">
                    {call.riskFactors.map((factor, index) => (
                      <Badge key={index} variant="outline" className="text-xs bg-orange-100 text-orange-800">
                        {factor}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2 mt-4">
              <Button
                onClick={() => onStartCall(call.patientId)}
                className="bg-[#1E4D36] hover:bg-[#2A6349] flex-1"
              >
                <Phone className="w-4 h-4 mr-2" />
                Start AI-Enhanced Call
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {filteredCalls.length === 0 && (
        <div className="text-center py-8">
          <Phone className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No calls in queue</h3>
          <p className="text-gray-600">All scheduled calls have been completed.</p>
        </div>
      )}
    </div>
  );
};
