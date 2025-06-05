
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, TrendingUp, Calendar, Lightbulb, Brain, ChevronRight } from 'lucide-react';
import { PreCallInsight } from '@/services/aiCallService';

interface PreCallIntelligenceProps {
  insights: PreCallInsight[];
  patientName: string;
}

export const PreCallIntelligence: React.FC<PreCallIntelligenceProps> = ({ insights, patientName }) => {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'risk_factor': return <AlertTriangle className="w-4 h-4" />;
      case 'positive_trend': return <TrendingUp className="w-4 h-4" />;
      case 'medication_change': return <Calendar className="w-4 h-4" />;
      case 'concern': return <AlertTriangle className="w-4 h-4" />;
      default: return <Lightbulb className="w-4 h-4" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'risk_factor': return 'bg-red-100 text-red-800 border-red-200';
      case 'positive_trend': return 'bg-green-100 text-green-800 border-green-200';
      case 'medication_change': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'concern': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <Card className="border-l-4 border-l-purple-500">
      <CardHeader className="bg-purple-50">
        <CardTitle className="text-lg flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-600" />
          AI Pre-Call Intelligence for {patientName}
        </CardTitle>
        <p className="text-sm text-purple-700">
          AI-generated insights to guide your conversation
        </p>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-4 p-4">
          {insights.map((insight) => (
            <div key={insight.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${getInsightColor(insight.type)}`}>
                    {getInsightIcon(insight.type)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                    <p className="text-sm text-gray-600">{insight.description}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge className={getPriorityColor(insight.priority)}>
                    {insight.priority.toUpperCase()}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {Math.round(insight.confidence * 100)}% confidence
                  </span>
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <h5 className="text-sm font-medium text-blue-900 mb-2 flex items-center gap-1">
                  <Lightbulb className="w-4 h-4" />
                  Suggested Talking Points
                </h5>
                <ul className="space-y-1">
                  {insight.suggestedTalkingPoints.map((point, index) => (
                    <li key={index} className="text-sm text-blue-800 flex items-center gap-2">
                      <ChevronRight className="w-3 h-3" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-xs text-gray-500">
                Source: {insight.source}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
