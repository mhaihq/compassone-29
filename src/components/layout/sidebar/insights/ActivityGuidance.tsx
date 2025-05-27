
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Clock,
  TrendingUp,
  Target,
  Lightbulb,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface ActivityOptimization {
  activity: string;
  currentTime: number;
  optimalTime: number;
  impact: 'high' | 'medium' | 'low';
  suggestion: string;
  reasoning: string;
  potentialSavings?: number;
  actionable: boolean;
}

const activityOptimizations: ActivityOptimization[] = [
  {
    activity: 'Patient Calls',
    currentTime: 25,
    optimalTime: 28,
    impact: 'high',
    suggestion: 'Increase by 3 minutes per call for better outcomes',
    reasoning: 'Longer calls correlate with 23% better goal achievement',
    actionable: true
  },
  {
    activity: 'Documentation',
    currentTime: 18,
    optimalTime: 13,
    impact: 'medium',
    suggestion: 'Use quick templates for routine follow-ups',
    reasoning: 'Templates can reduce time by 28% without losing quality',
    potentialSavings: 5,
    actionable: true
  },
  {
    activity: 'Care Planning',
    currentTime: 14,
    optimalTime: 16,
    impact: 'high',
    suggestion: 'Spend 2 more minutes on comprehensive planning',
    reasoning: 'Better planning reduces future urgent interventions by 31%',
    actionable: true
  },
  {
    activity: 'Provider Coordination',
    currentTime: 11,
    optimalTime: 10,
    impact: 'low',
    suggestion: 'Maintain current efficiency',
    reasoning: 'Your coordination time is optimal for patient outcomes',
    actionable: false
  },
  {
    activity: 'Administrative',
    currentTime: 4,
    optimalTime: 3,
    impact: 'low',
    suggestion: 'Batch administrative tasks',
    reasoning: 'Batching can save 25% of administrative time',
    potentialSavings: 1,
    actionable: true
  }
];

export const ActivityGuidance: React.FC = () => {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (current: number, optimal: number) => {
    const ratio = current / optimal;
    if (ratio > 1.1) return 'bg-red-500';
    if (ratio < 0.9) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const totalPotentialSavings = activityOptimizations
    .filter(opt => opt.potentialSavings)
    .reduce((sum, opt) => sum + (opt.potentialSavings || 0), 0);

  const actionableOptimizations = activityOptimizations.filter(opt => opt.actionable);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#1E4D36] flex items-center gap-2">
          <Lightbulb className="w-5 h-5" />
          Activity Time Optimization
        </h3>
        <div className="flex items-center gap-2">
          <Badge className="bg-green-100 text-green-800">
            +{totalPotentialSavings} min available
          </Badge>
          <Badge className="bg-[#1E4D36] text-white">
            {actionableOptimizations.length} opportunities
          </Badge>
        </div>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-blue-600" />
            <h4 className="font-medium text-blue-900">Optimization Goal</h4>
          </div>
          <p className="text-sm text-blue-800 mb-3">
            Redistribute time to maximize patient outcomes while maintaining efficiency. 
            Focus on high-impact activities that drive better care results.
          </p>
          <div className="flex items-center gap-4 text-xs text-blue-700">
            <span className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              23% better outcomes with optimized time
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              6 minutes can be reallocated
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {activityOptimizations.map((optimization, index) => (
          <Card key={index} className={`${optimization.actionable ? 'border-l-4 border-l-blue-400' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-gray-900 flex items-center gap-2">
                    {optimization.activity}
                    {!optimization.actionable && (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    )}
                  </h4>
                  <p className="text-sm text-gray-600">{optimization.suggestion}</p>
                </div>
                <Badge className={getImpactColor(optimization.impact)}>
                  {optimization.impact} impact
                </Badge>
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Current vs Optimal Time</span>
                  <span className="font-medium">
                    {optimization.currentTime} → {optimization.optimalTime} min
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getProgressColor(optimization.currentTime, optimization.optimalTime)}`}
                      style={{ width: `${Math.min(100, (optimization.currentTime / optimization.optimalTime) * 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">
                    {optimization.currentTime > optimization.optimalTime ? 'Over' : 'Under'} by {Math.abs(optimization.currentTime - optimization.optimalTime)} min
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-600 italic mb-3">
                {optimization.reasoning}
              </p>

              <div className="flex items-center justify-between">
                <div>
                  {optimization.potentialSavings && (
                    <span className="text-sm text-green-600 font-medium">
                      Save {optimization.potentialSavings} min/week
                    </span>
                  )}
                </div>
                {optimization.actionable && (
                  <Button size="sm" variant="outline" className="text-xs">
                    Apply Optimization
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-[#EBF4F0] border-[#1E4D36]/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-[#1E4D36]" />
            <h4 className="font-medium text-[#1E4D36]">Weekly Time Reallocation Plan</h4>
          </div>
          <p className="text-sm text-gray-700 mb-3">
            Reduce documentation by 5 minutes and increase patient calls by 3 minutes 
            for optimal care delivery and improved outcomes.
          </p>
          <Button size="sm" className="bg-[#1E4D36] hover:bg-[#2A6349] text-white">
            Implement Plan This Week
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
