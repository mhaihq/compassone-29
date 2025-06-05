
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Target, ArrowRight, AlertTriangle, Clock, DollarSign, Users } from 'lucide-react';

export const SmartRecommendations: React.FC = () => {
  const recommendations = [
    {
      id: 'r1',
      title: 'Critical: Matteo\'s Blood Pressure Management',
      description: 'Patient goal is 14 days overdue with escalating readings (138/88 mmHg). Medication adherence issues detected.',
      priority: 'critical' as const,
      action: 'Schedule urgent medication review',
      impact: '$42/month revenue + prevents complications',
      timeEstimate: '15 min',
      category: 'clinical',
      daysOverdue: 14
    },
    {
      id: 'r2',
      title: 'Optimize Patient Engagement Schedule',
      description: 'Two patients haven\'t been contacted this week. Risk of losing engagement momentum.',
      priority: 'high' as const,
      action: 'Book Tuesday afternoon slots',
      impact: 'Maintain 95% engagement rate',
      timeEstimate: '30 min',
      category: 'operational',
      patientsAffected: 2
    },
    {
      id: 'r3',
      title: 'Revenue Opportunity: CCM Billing',
      description: 'Sarah Chen qualifies for additional CCM services but hasn\'t been enrolled.',
      priority: 'medium' as const,
      action: 'Review CCM eligibility and enroll',
      impact: '$38/month additional revenue',
      timeEstimate: '10 min',
      category: 'revenue',
      revenueOpportunity: '$38'
    },
    {
      id: 'r4',
      title: 'Documentation Efficiency Improvement',
      description: 'Use quick templates to reduce documentation time for routine follow-ups.',
      priority: 'low' as const,
      action: 'Review template library',
      impact: '30 min/week time savings',
      timeEstimate: '5 min',
      category: 'efficiency',
      timeSavings: '30 min/week'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-50 border-red-200';
      case 'high': return 'bg-orange-50 border-orange-200';
      case 'medium': return 'bg-yellow-50 border-yellow-200';
      case 'low': return 'bg-green-50 border-green-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'clinical': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'operational': return <Users className="w-4 h-4 text-blue-600" />;
      case 'revenue': return <DollarSign className="w-4 h-4 text-green-600" />;
      case 'efficiency': return <Clock className="w-4 h-4 text-purple-600" />;
      default: return <Target className="w-4 h-4 text-gray-600" />;
    }
  };

  const criticalCount = recommendations.filter(r => r.priority === 'critical').length;
  const highCount = recommendations.filter(r => r.priority === 'high').length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#1E4D36] flex items-center gap-2">
          <Target className="w-5 h-5" />
          Smart Recommendations
        </h3>
        <div className="flex gap-2">
          {criticalCount > 0 && (
            <Badge className="bg-red-100 text-red-800">
              {criticalCount} Critical
            </Badge>
          )}
          <Badge className="bg-[#1E4D36] text-white">
            {recommendations.length} Actions
          </Badge>
        </div>
      </div>
      
      <div className="space-y-3">
        {recommendations.map((rec) => (
          <Card key={rec.id} className={`border-l-4 ${getPriorityColor(rec.priority)}`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  {getCategoryIcon(rec.category)}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium text-gray-900">{rec.title}</h4>
                    <Badge className={getPriorityBadgeColor(rec.priority)}>
                      {rec.priority}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-2">{rec.description}</p>
                  
                  {/* Key metrics row */}
                  <div className="flex items-center gap-4 text-xs text-gray-600 mb-3">
                    {rec.daysOverdue && (
                      <span className="bg-red-100 text-red-700 px-2 py-1 rounded">
                        {rec.daysOverdue} days overdue
                      </span>
                    )}
                    {rec.patientsAffected && (
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {rec.patientsAffected} patients
                      </span>
                    )}
                    {rec.revenueOpportunity && (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                        {rec.revenueOpportunity} revenue
                      </span>
                    )}
                    {rec.timeSavings && (
                      <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">
                        {rec.timeSavings} saved
                      </span>
                    )}
                    <span className="text-gray-500">• {rec.timeEstimate}</span>
                  </div>
                  
                  <p className="text-xs text-gray-600 italic mb-3 bg-gray-50 p-2 rounded">
                    💡 {rec.impact}
                  </p>
                  
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
    </div>
  );
};
