
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, TrendingUp, TrendingDown, Target, CheckCircle } from 'lucide-react';

interface ActivityOptimization {
  id: string;
  activity: string;
  currentTime: number;
  optimalTime: number;
  impact: 'high' | 'medium' | 'low';
  suggestion: string;
  savings?: number;
}

interface ActivityGuidanceProps {
  optimizations: ActivityOptimization[];
}

export const ActivityGuidance: React.FC<ActivityGuidanceProps> = ({ optimizations }) => {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-50 border-red-200 text-red-800';
      case 'medium': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'low': return 'bg-green-50 border-green-200 text-green-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'high': return <TrendingUp className="w-4 h-4 text-red-600" />;
      case 'medium': return <Target className="w-4 h-4 text-yellow-600" />;
      case 'low': return <CheckCircle className="w-4 h-4 text-green-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendIcon = (current: number, optimal: number) => {
    if (current < optimal) {
      return <TrendingUp className="w-3 h-3 text-blue-600" />;
    } else if (current > optimal) {
      return <TrendingDown className="w-3 h-3 text-orange-600" />;
    }
    return <CheckCircle className="w-3 h-3 text-green-600" />;
  };

  const totalSavings = optimizations.reduce((sum, opt) => sum + (opt.savings || 0), 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#1a1a1a] flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Activity Time Guidance
        </h3>
        <Badge className="bg-blue-100 text-blue-800">
          {totalSavings} min/week potential savings
        </Badge>
      </div>

      <div className="space-y-3">
        {optimizations.map((opt) => {
          const difference = opt.optimalTime - opt.currentTime;
          const isUnder = opt.currentTime < opt.optimalTime;
          const isOver = opt.currentTime > opt.optimalTime;
          const progressPercentage = (opt.currentTime / opt.optimalTime) * 100;

          return (
            <Card key={opt.id} className={`border-l-4 ${getImpactColor(opt.impact)}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getImpactIcon(opt.impact)}
                    <div>
                      <h4 className="font-medium text-gray-900">{opt.activity}</h4>
                      <p className="text-sm text-gray-600">{opt.suggestion}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      {getTrendIcon(opt.currentTime, opt.optimalTime)}
                      <span className="text-sm font-mono">
                        {opt.currentTime}/{opt.optimalTime} min
                      </span>
                    </div>
                    {opt.savings && (
                      <p className="text-xs text-green-600 font-medium">
                        +{opt.savings} min saved
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-2">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Current vs Optimal</span>
                    <span>
                      {isUnder && `${Math.abs(difference)} min under`}
                      {isOver && `${Math.abs(difference)} min over`}
                      {difference === 0 && 'Optimal'}
                    </span>
                  </div>
                  <Progress 
                    value={Math.min(progressPercentage, 100)} 
                    className={`h-2 ${isOver ? '[&>div]:bg-orange-500' : '[&>div]:bg-blue-500'}`}
                  />
                </div>

                <Badge variant="outline" className="text-xs">
                  {opt.impact} impact
                </Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
