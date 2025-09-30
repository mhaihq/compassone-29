
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { InsightMetric } from '@/services/insightsService';

interface MetricsDashboardProps {
  metrics: InsightMetric[];
}

export const MetricsDashboard: React.FC<MetricsDashboardProps> = ({ metrics }) => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-green-600" />;
      case 'down': return <TrendingDown className="w-3 h-3 text-red-600" />;
      default: return <div className="w-3 h-3 bg-gray-400 rounded-full" />;
    }
  };

  const getColorClass = (color: string) => {
    switch (color) {
      case 'green': return 'text-green-600';
      case 'red': return 'text-red-600';
      case 'blue': return 'text-blue-600';
      case 'yellow': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <Card key={metric.id} className="bg-[#f5f5f5] border-[#1a1a1a]/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#1a1a1a]">{metric.label}</span>
              {getTrendIcon(metric.trend)}
            </div>
            <div className={`text-2xl font-bold ${getColorClass(metric.color)} mb-1`}>
              {metric.value}
            </div>
            <div className="text-xs text-[#333333]">
              {metric.change}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
