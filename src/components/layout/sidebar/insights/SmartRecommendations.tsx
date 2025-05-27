
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Users, 
  Target,
  ArrowRight,
  Clock,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

interface SmartRecommendationProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  actionText: string;
  metric?: string;
  insight?: string;
}

const SmartRecommendation: React.FC<SmartRecommendationProps> = ({
  icon,
  title,
  description,
  priority,
  actionText,
  metric,
  insight
}) => {
  const priorityColors = {
    high: 'bg-red-50 border-red-200 text-red-800',
    medium: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    low: 'bg-green-50 border-green-200 text-green-800'
  };

  const priorityDots = {
    high: 'bg-red-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500'
  };

  return (
    <Card className={`${priorityColors[priority]} border-l-4`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            {icon}
          </div>
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2 h-2 rounded-full ${priorityDots[priority]}`}></div>
              <h4 className="font-medium text-gray-900">{title}</h4>
              {metric && (
                <Badge variant="secondary" className="text-xs">
                  {metric}
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-700 mb-2">{description}</p>
            {insight && (
              <p className="text-xs text-gray-600 italic mb-3">{insight}</p>
            )}
            <Button size="sm" variant="outline" className="text-xs">
              {actionText}
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const SmartRecommendations: React.FC = () => {
  const recommendations: SmartRecommendationProps[] = [
    {
      icon: <Users className="w-5 h-5 text-[#1E4D36]" />,
      title: "Increase Patient Engagement",
      description: "Your engagement rate (90%) is excellent, but you could reach 2 more patients this week.",
      priority: "medium",
      actionText: "Schedule Outreach",
      metric: "90% → 95%",
      insight: "Based on historical patterns, Tuesday 2-4 PM has highest response rates"
    },
    {
      icon: <Target className="w-5 h-5 text-[#1E4D36]" />,
      title: "Optimize Care Target Achievement",
      description: "You're at 80% completion. Focus on 1 pending goal to reach your 85% target.",
      priority: "high",
      actionText: "Review Goals",
      metric: "80% → 85%",
      insight: "Matteo's medication adherence goal is closest to completion"
    },
    {
      icon: <Clock className="w-5 h-5 text-[#1E4D36]" />,
      title: "Time Allocation Optimization",
      description: "Consider reducing documentation time by 5 minutes to increase patient interaction.",
      priority: "low",
      actionText: "View Templates",
      metric: "-5 min docs",
      insight: "Use quick templates for routine follow-ups to save time"
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-[#1E4D36]" />,
      title: "Revenue Opportunity",
      description: "3 patients are eligible for BHI billing but haven't reached minimum time threshold.",
      priority: "high",
      actionText: "Review Billing",
      metric: "+$144 potential",
      insight: "Each patient needs 15 more minutes to qualify for 99484"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#1E4D36] flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          Smart Recommendations
        </h3>
        <Badge className="bg-[#1E4D36] text-white">
          4 Actions Available
        </Badge>
      </div>
      
      <div className="space-y-3">
        {recommendations.map((recommendation, index) => (
          <SmartRecommendation key={index} {...recommendation} />
        ))}
      </div>
    </div>
  );
};
