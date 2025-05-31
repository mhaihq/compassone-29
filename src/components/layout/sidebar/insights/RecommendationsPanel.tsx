
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, AlertTriangle, Clock, Target } from 'lucide-react';
import { InsightRecommendation } from '@/services/insightsService';

interface RecommendationsPanelProps {
  recommendations: InsightRecommendation[];
}

export const RecommendationsPanel: React.FC<RecommendationsPanelProps> = ({ 
  recommendations 
}) => {
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'medium': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'low': return <Target className="w-4 h-4 text-green-600" />;
      default: return <Target className="w-4 h-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-50 border-red-200 text-red-800';
      case 'medium': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'low': return 'bg-green-50 border-green-200 text-green-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#1E4D36]">
          Priority Actions
        </h3>
        <Badge className="bg-[#1E4D36] text-white">
          {recommendations.length} items
        </Badge>
      </div>
      
      {recommendations.map((rec) => (
        <Card key={rec.id} className={`border-l-4 ${getPriorityColor(rec.priority)}`}>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                {getPriorityIcon(rec.priority)}
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-medium text-gray-900">{rec.title}</h4>
                  <Badge variant="outline" className="text-xs">
                    {rec.priority}
                  </Badge>
                </div>
                <p className="text-sm text-gray-700 mb-2">{rec.description}</p>
                <p className="text-xs text-gray-600 italic mb-3">{rec.impact}</p>
                <Button size="sm" variant="outline" className="text-xs">
                  {rec.action}
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
