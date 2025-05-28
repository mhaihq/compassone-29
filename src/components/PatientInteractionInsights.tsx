
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Phone, Heart, BarChart } from 'lucide-react';
import { PatientInteractionInsights as InsightsType } from '@/data/interactionInsights';

interface PatientInteractionInsightsProps {
  insights: InsightsType;
  variant?: 'full' | 'compact';
}

export const PatientInteractionInsights: React.FC<PatientInteractionInsightsProps> = ({ 
  insights, 
  variant = 'full' 
}) => {
  const getStyleIcon = () => {
    switch (insights.communicationStyle) {
      case 'Direct': return <BarChart className="h-4 w-4" />;
      case 'Supportive': return <Heart className="h-4 w-4" />;
      case 'Educational': return <MessageSquare className="h-4 w-4" />;
      case 'Motivational': return <Phone className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getStyleColor = () => {
    switch (insights.communicationStyle) {
      case 'Direct': return 'bg-blue-100 text-blue-800';
      case 'Supportive': return 'bg-green-100 text-green-800';
      case 'Educational': return 'bg-purple-100 text-purple-800';
      case 'Motivational': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (variant === 'compact') {
    return (
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <CardContent className="p-3">
          <div className="flex items-center gap-2 mb-2">
            {getStyleIcon()}
            <span className="font-medium text-sm">Communication Guidance</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={getStyleColor()}>
                {insights.communicationStyle}
              </Badge>
              <Badge variant="outline" className="text-xs">
                Prefers {insights.preferredContact}
              </Badge>
            </div>
            {insights.motivationalFactors.length > 0 && (
              <div className="text-xs text-gray-600">
                <span className="font-medium">Key motivators:</span> {insights.motivationalFactors.slice(0, 2).join(', ')}
                {insights.motivationalFactors.length > 2 && '...'}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          {getStyleIcon()}
          Patient Interaction Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Communication Style</p>
            <Badge className={getStyleColor()}>
              {insights.communicationStyle}
            </Badge>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Preferred Contact</p>
            <Badge variant="outline">
              {insights.preferredContact}
            </Badge>
          </div>
        </div>

        {insights.motivationalFactors.length > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Motivational Factors</p>
            <div className="flex flex-wrap gap-1">
              {insights.motivationalFactors.map((factor, index) => (
                <Badge key={index} variant="secondary" className="text-xs bg-green-100 text-green-800">
                  {factor}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {insights.concerns.length > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Key Concerns</p>
            <div className="flex flex-wrap gap-1">
              {insights.concerns.map((concern, index) => (
                <Badge key={index} variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
                  {concern}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {insights.successStrategies.length > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Success Strategies</p>
            <ul className="text-xs text-gray-600 space-y-1">
              {insights.successStrategies.map((strategy, index) => (
                <li key={index} className="flex items-start gap-1">
                  <span className="text-indigo-500 mt-1">•</span>
                  <span>{strategy}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {insights.culturalConsiderations.length > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Cultural Considerations</p>
            <div className="flex flex-wrap gap-1">
              {insights.culturalConsiderations.map((consideration, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {consideration}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="pt-2 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Last updated: {new Date(insights.lastUpdated).toLocaleDateString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
