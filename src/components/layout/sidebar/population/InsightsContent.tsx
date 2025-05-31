
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, BarChart3, Target, Lightbulb, TrendingUp } from 'lucide-react';
import { getInsightsData } from '@/services/insightsService';
import { MetricsDashboard } from '../insights/MetricsDashboard';
import { RecommendationsPanel } from '../insights/RecommendationsPanel';
import { GoalsTracker } from '../insights/GoalsTracker';
import { WeeklySummary } from '../insights/WeeklySummary';
import { PopulationBillingAnalytics } from '@/components/billing/PopulationBillingAnalytics';
import { mockPopulationBillingAnalytics } from '@/data/billingBreakdownData';

export const InsightsContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const insightsData = getInsightsData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-left">
        <div className="flex items-center gap-2 mb-2">
          <Brain size={24} className="text-[#1E4D36]" />
          <h2 className="text-xl font-semibold text-gray-900">Care Intelligence Hub</h2>
        </div>
        <p className="text-sm text-gray-600">
          AI-powered insights for optimized patient care delivery
        </p>
      </div>

      {/* Tabbed Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="text-xs">
            <BarChart3 className="w-4 h-4 mr-1" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="actions" className="text-xs">
            <Target className="w-4 h-4 mr-1" />
            Actions
          </TabsTrigger>
          <TabsTrigger value="goals" className="text-xs">
            <TrendingUp className="w-4 h-4 mr-1" />
            Goals
          </TabsTrigger>
          <TabsTrigger value="billing" className="text-xs">
            <Lightbulb className="w-4 h-4 mr-1" />
            Billing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <MetricsDashboard metrics={insightsData.metrics} />
          <WeeklySummary 
            highlight={insightsData.summary.weeklyHighlight}
            nextActions={insightsData.summary.nextActions}
          />
        </TabsContent>

        <TabsContent value="actions" className="space-y-6">
          <RecommendationsPanel recommendations={insightsData.recommendations} />
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <GoalsTracker goals={insightsData.goals} />
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <PopulationBillingAnalytics analytics={mockPopulationBillingAnalytics} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
