
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Clock, TrendingUp, Activity, Target } from 'lucide-react';
import { PopulationBillingAnalytics as PopulationBillingAnalyticsType } from '@/types/billingBreakdown';

interface PopulationBillingAnalyticsProps {
  analytics: PopulationBillingAnalyticsType;
}

const chartConfig = {
  totalMinutes: {
    label: "Total Minutes",
    color: "#1E4D36",
  },
  documentation: {
    label: "Documentation",
    color: "#3B82F6",
  },
  patientContact: {
    label: "Patient Contact", 
    color: "#10B981",
  },
  carePlanning: {
    label: "Care Planning",
    color: "#8B5CF6",
  },
  coordination: {
    label: "Coordination",
    color: "#F59E0B",
  },
  administrative: {
    label: "Administrative",
    color: "#6B7280",
  }
};

export const PopulationBillingAnalytics: React.FC<PopulationBillingAnalyticsProps> = ({ analytics }) => {
  // Prepare action breakdown data for pie chart
  const actionPieData = Object.entries(analytics.actionBreakdown).map(([action, minutes]) => ({
    name: action,
    value: minutes,
    color: chartConfig[action as keyof typeof chartConfig]?.color || '#6B7280'
  }));

  // Prepare weekly trends data for bar chart  
  const weeklyTrendsData = analytics.trends.weeklyTrends.map(week => ({
    week: week.week,
    totalMinutes: week.totalMinutes,
    documentation: week.actionBreakdown.documentation || 0,
    patientContact: week.actionBreakdown.patientContact || 0,
    carePlanning: week.actionBreakdown.carePlanning || 0,
    coordination: week.actionBreakdown.coordination || 0,
    administrative: week.actionBreakdown.administrative || 0
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-[#1E4D36] mb-2">Population Billing Analytics</h2>
        <p className="text-sm text-gray-600">
          Time allocation analysis across all patient care activities
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Total Minutes Logged</p>
                <p className="text-lg font-bold text-gray-900">{analytics.totalMinutesLogged}</p>
              </div>
              <div className="p-2 rounded-lg bg-[#EBF4F0]">
                <Clock className="h-4 w-4 text-[#1E4D36]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Avg Time/Patient</p>
                <p className="text-lg font-bold text-gray-900">{analytics.averageTimePerPatient.toFixed(1)} min</p>
              </div>
              <div className="p-2 rounded-lg bg-blue-50">
                <Target className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Avg Time/Action</p>
                <p className="text-lg font-bold text-gray-900">{analytics.efficiencyMetrics.averageTimePerAction.toFixed(1)} min</p>
              </div>
              <div className="p-2 rounded-lg bg-green-50">
                <Activity className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Most Time-Consuming</p>
                <p className="text-sm font-bold text-gray-900">{analytics.efficiencyMetrics.mostTimeConsumingAction}</p>
              </div>
              <div className="p-2 rounded-lg bg-orange-50">
                <TrendingUp className="h-4 w-4 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Action Breakdown Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-[#1E4D36]">Action Time Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={actionPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {actionPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-4 space-y-2">
              {actionPieData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-gray-600">{item.name}</span>
                  </div>
                  <span className="font-medium text-gray-900">{item.value} min</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Trends Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-[#1E4D36]">Weekly Time Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyTrendsData}>
                  <XAxis dataKey="week" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="totalMinutes" fill="#1E4D36" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Efficiency Insights */}
      <Card className="bg-[#EBF4F0] border-[#1E4D36]/20">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#1E4D36] mb-4">Efficiency Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Most Time-Consuming Action</h4>
              <Badge className="bg-red-100 text-red-800 border-red-200">
                {analytics.efficiencyMetrics.mostTimeConsumingAction}
              </Badge>
              <p className="text-sm text-gray-600 mt-2">
                Consider reviewing workflows for this action to improve efficiency.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Most Efficient Action</h4>
              <Badge className="bg-green-100 text-green-800 border-green-200">
                {analytics.efficiencyMetrics.leastTimeConsumingAction}
              </Badge>
              <p className="text-sm text-gray-600 mt-2">
                This action shows good efficiency patterns that could be applied elsewhere.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
