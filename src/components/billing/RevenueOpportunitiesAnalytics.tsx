import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  DollarSign, 
  TrendingUp, 
  Target, 
  ArrowUpRight,
  Sparkles,
  Package,
  Calendar,
  Users
} from 'lucide-react';
import { BillingOpportunity, OpportunityCategory } from '@/types/billingOpportunity';

interface RevenueOpportunitiesAnalyticsProps {
  opportunities: BillingOpportunity[];
  conversionRate?: number;
  actualRevenue?: number;
}

const categoryInfo: Record<OpportunityCategory, { label: string; color: string; icon: React.ComponentType<{ className?: string }> }> = {
  'mental-health': { label: 'Mental Health', color: 'bg-purple-100 text-purple-700 border-purple-200', icon: Sparkles },
  'wellness-prevention': { label: 'Wellness', color: 'bg-green-100 text-green-700 border-green-200', icon: TrendingUp },
  'convenience': { label: 'Convenience', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: Package },
  'specialized-wellness': { label: 'Specialized', color: 'bg-amber-100 text-amber-700 border-amber-200', icon: Target },
  'chronic-care': { label: 'Chronic Care', color: 'bg-red-100 text-red-700 border-red-200', icon: Calendar }
};

export const RevenueOpportunitiesAnalytics: React.FC<RevenueOpportunitiesAnalyticsProps> = ({
  opportunities,
  conversionRate = 42,
  actualRevenue = 3200
}) => {
  const totalEstimatedRevenue = opportunities.reduce((sum, opp) => sum + opp.estimatedRevenue, 0);
  const highPriorityCount = opportunities.filter(opp => opp.priority === 'high').length;
  const highConversionCount = opportunities.filter(opp => opp.conversionLikelihood === 'high').length;

  // Group by category
  const categoryBreakdown = opportunities.reduce((acc, opp) => {
    if (!acc[opp.category]) {
      acc[opp.category] = { count: 0, revenue: 0 };
    }
    acc[opp.category].count++;
    acc[opp.category].revenue += opp.estimatedRevenue;
    return acc;
  }, {} as Record<OpportunityCategory, { count: number; revenue: number }>);

  const topOpportunities = [...opportunities]
    .sort((a, b) => b.estimatedRevenue - a.estimatedRevenue)
    .slice(0, 5);

  const projectedRevenue = Math.round(totalEstimatedRevenue * (conversionRate / 100));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Cash-Pay Revenue Opportunities</h3>
          <p className="text-sm text-muted-foreground mt-1">
            ROI dashboard tracking premium service opportunities across your patient population
          </p>
        </div>
        <Button variant="outline" size="sm">
          <TrendingUp className="h-4 w-4 mr-2" />
          View Full Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total Opportunities</p>
                <p className="text-2xl font-bold text-foreground">{opportunities.length}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {highPriorityCount} high priority
                </p>
              </div>
              <div className="p-3 rounded-lg bg-primary/10">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Est. Revenue</p>
                <p className="text-2xl font-bold text-foreground">${totalEstimatedRevenue.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  {highConversionCount} high likelihood
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-50">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Projected Revenue</p>
                <p className="text-2xl font-bold text-foreground">${projectedRevenue.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  at {conversionRate}% conversion
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50">
                <Target className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Actual Revenue</p>
                <p className="text-2xl font-bold text-foreground">${actualRevenue.toLocaleString()}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Progress value={(actualRevenue / projectedRevenue) * 100} className="h-1 w-16" />
                  <p className="text-xs text-muted-foreground">
                    {Math.round((actualRevenue / projectedRevenue) * 100)}%
                  </p>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-purple-50">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue by Category */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Revenue by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(categoryBreakdown)
              .sort(([, a], [, b]) => b.revenue - a.revenue)
              .map(([category, data]) => {
                const info = categoryInfo[category as OpportunityCategory];
                const IconComponent = info.icon;
                const percentage = (data.revenue / totalEstimatedRevenue) * 100;
                
                return (
                  <div key={category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded ${info.color.split(' ')[0]}`}>
                          <IconComponent className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-sm font-medium text-foreground">{info.label}</span>
                        <Badge variant="secondary" className="text-xs">
                          {data.count} opportunities
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-foreground">
                          ${data.revenue.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {percentage.toFixed(0)}% of total
                        </p>
                      </div>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>

      {/* Top Opportunities */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Top Revenue Opportunities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topOpportunities.map((opp, index) => {
              const categoryData = categoryInfo[opp.category];
              const IconComponent = categoryData.icon;
              
              return (
                <div
                  key={opp.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-semibold text-primary">{index + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium text-foreground truncate">{opp.title}</p>
                        <Badge className={categoryData.color} variant="outline">
                          <IconComponent className="h-3 w-3 mr-1" />
                          {categoryData.label}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {opp.pricingModel === 'monthly' ? 'Monthly' : 
                         opp.pricingModel === 'package' ? 'Package' : 
                         opp.pricingModel === 'per-session' ? 'Per Session' : 'One-time'} • 
                        {' '}{opp.conversionLikelihood} conversion likelihood
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-lg font-bold text-foreground">
                      ${opp.estimatedRevenue}
                    </p>
                    {opp.pricingModel === 'monthly' && (
                      <p className="text-xs text-muted-foreground">/month</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <Card className="shadow-sm border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground mb-1">ROI Insights</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Based on current opportunities, your team could generate an additional{' '}
                <span className="font-semibold text-foreground">${projectedRevenue.toLocaleString()}</span> in
                cash-pay revenue this month with a {conversionRate}% conversion rate.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                  {highConversionCount} high-likelihood opportunities
                </Badge>
                <Badge variant="secondary" className="bg-orange-50 text-orange-700 border-orange-200">
                  {highPriorityCount} urgent follow-ups
                </Badge>
                <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                  Avg ${Math.round(totalEstimatedRevenue / opportunities.length)} per opportunity
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};