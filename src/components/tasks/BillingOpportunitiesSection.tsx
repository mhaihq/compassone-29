import React from 'react';
import { DollarSign, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BillingOpportunity } from '@/types/billingOpportunity';

interface BillingOpportunitiesSectionProps {
  opportunities: BillingOpportunity[];
  onDiscussService?: (opportunityId: string) => void;
}

const categoryColors = {
  'wellness-prevention': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'convenience': 'bg-blue-50 text-blue-700 border-blue-200',
  'specialized-wellness': 'bg-purple-50 text-purple-700 border-purple-200',
  'mental-health': 'bg-pink-50 text-pink-700 border-pink-200',
  'chronic-care': 'bg-orange-50 text-orange-700 border-orange-200',
};

const priorityColors = {
  high: 'bg-red-50 text-red-700 border-red-200',
  medium: 'bg-amber-50 text-amber-700 border-amber-200',
  low: 'bg-gray-50 text-gray-700 border-gray-200',
};

const conversionColors = {
  high: 'text-emerald-600',
  medium: 'text-amber-600',
  low: 'text-gray-600',
};

export const BillingOpportunitiesSection: React.FC<BillingOpportunitiesSectionProps> = ({
  opportunities,
  onDiscussService,
}) => {
  if (!opportunities || opportunities.length === 0) {
    return null;
  }

  const totalEstimatedRevenue = opportunities.reduce((sum, opp) => sum + opp.estimatedRevenue, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold text-lg">Cash-Pay Billing Opportunities</h3>
        </div>
        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
          <DollarSign className="w-3 h-3 mr-1" />
          ${totalEstimatedRevenue.toLocaleString()} potential
        </Badge>
      </div>

      <div className="space-y-3">
        {opportunities.map((opportunity) => (
          <Card key={opportunity.id} className="bg-gradient-to-br from-white to-gray-50">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <CardTitle className="text-base font-semibold mb-2">
                    {opportunity.title}
                  </CardTitle>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="outline" className={categoryColors[opportunity.category]}>
                      {opportunity.category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </Badge>
                    <Badge variant="outline" className={priorityColors[opportunity.priority]}>
                      {opportunity.priority.toUpperCase()} Priority
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-600">
                    ${opportunity.estimatedRevenue}
                  </div>
                  <div className="text-xs text-gray-500">
                    {opportunity.pricingModel}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-600">
                {opportunity.description}
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <TrendingUp className={`w-4 h-4 mt-0.5 ${conversionColors[opportunity.conversionLikelihood]}`} />
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-gray-700 mb-1">
                      Why this fits:
                    </div>
                    <p className="text-sm text-gray-600">
                      {opportunity.reasoning}
                    </p>
                  </div>
                </div>
              </div>

              {opportunity.suggestedActions && opportunity.suggestedActions.length > 0 && (
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-gray-700">
                    Suggested Actions:
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {opportunity.suggestedActions.map((action, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">•</span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t">
                <Badge variant="outline" className={`${conversionColors[opportunity.conversionLikelihood]}`}>
                  {opportunity.conversionLikelihood.toUpperCase()} conversion likelihood
                </Badge>
                {onDiscussService && (
                  <Button
                    size="sm"
                    onClick={() => onDiscussService(opportunity.id)}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Discuss with Patient
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
