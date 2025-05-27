import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  Users, 
  Target,
  CheckCircle2,
  Activity,
  Calendar,
  Clock,
  Brain,
  Lightbulb,
  BarChart3
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { SmartRecommendations } from '../insights/SmartRecommendations';
import { GoalGapsTracker } from '../insights/GoalGapsTracker';
import { SmartSummary } from '../insights/SmartSummary';
import { ActivityGuidance } from '../insights/ActivityGuidance';

const chartConfig = {
  timeSpent: {
    label: "Time Spent",
    color: "#1E4D36",
  },
  efficiency: {
    label: "Efficiency",
    color: "#2A6349",
  },
  completed: {
    label: "Completed",
    color: "#1E4D36",
  },
  pending: {
    label: "Pending", 
    color: "#E6F0EE",
  }
};

export const InsightsContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const enrollmentTrendData = [
    { week: 'Week 1', enrolled: 12 },
    { week: 'Week 2', enrolled: 18 },
    { week: 'Week 3', enrolled: 15 },
    { week: 'Week 4', enrolled: 21 },
    { week: 'Week 5', enrolled: 25 },
    { week: 'Week 6', enrolled: 30 }
  ];

  const timeAllocationData = [
    { activity: 'Patient Calls', minutes: 25, percentage: 35 },
    { activity: 'Documentation', minutes: 18, percentage: 25 },
    { activity: 'Care Planning', minutes: 14, percentage: 20 },
    { activity: 'Provider Coordination', minutes: 11, percentage: 15 },
    { activity: 'Administrative', minutes: 4, percentage: 5 }
  ];

  const efficiencyTrendData = [
    { week: 'Week 1', efficiency: 72, tasksCompleted: 45 },
    { week: 'Week 2', efficiency: 78, tasksCompleted: 52 },
    { week: 'Week 3', efficiency: 85, tasksCompleted: 58 },
    { week: 'Week 4', efficiency: 82, tasksCompleted: 55 }
  ];

  const pieData = [
    { name: 'High Priority', value: 35, color: '#1E4D36' },
    { name: 'Medium Priority', value: 45, color: '#2A6349' },
    { name: 'Low Priority', value: 20, color: '#E6F0EE' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-left">
        <div className="flex items-center gap-2 mb-2">
          <Brain size={24} className="text-[#1E4D36]" />
          <h2 className="text-xl font-semibold text-gray-900">Care Coordination Intelligence Hub</h2>
        </div>
        <p className="text-sm text-gray-600">
          AI-powered insights and recommendations for optimized patient care delivery
        </p>
      </div>

      {/* Smart Summary - Always visible at top */}
      <SmartSummary />

      {/* Tabbed Interface for Detailed Insights */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard" className="text-xs">
            <BarChart3 className="w-4 h-4 mr-1" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="text-xs">
            <Brain className="w-4 h-4 mr-1" />
            Smart Insights
          </TabsTrigger>
          <TabsTrigger value="goals" className="text-xs">
            <Target className="w-4 h-4 mr-1" />
            Goal Gaps
          </TabsTrigger>
          <TabsTrigger value="optimization" className="text-xs">
            <Lightbulb className="w-4 h-4 mr-1" />
            Optimization
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="bg-[#EBF4F0] border-[#1E4D36]/20">
              <CardContent className="p-4">
                <div className="text-sm text-[#1E4D36] mb-1">Patients engaged this week</div>
                <div className="text-3xl font-bold text-[#1E4D36] mb-1">5</div>
                <div className="flex items-center">
                  <span className="text-xs text-green-600 font-medium">↑ 25%</span>
                </div>
                <div className="text-xs text-[#2A6349] mt-1">Total: 15 this month</div>
              </CardContent>
            </Card>

            <Card className="bg-[#EBF4F0] border-[#1E4D36]/20">
              <CardContent className="p-4">
                <div className="text-sm text-[#1E4D36] mb-1">Care target</div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-3xl font-bold text-[#1E4D36]">80%</span>
                  <span className="text-sm text-[#2A6349]">complete</span>
                </div>
                <Progress value={80} className="h-2 mb-1" />
                <div className="text-xs text-[#2A6349]">4 of 5 target patients</div>
              </CardContent>
            </Card>

            <Card className="bg-[#EBF4F0] border-[#1E4D36]/20">
              <CardContent className="p-4">
                <div className="text-sm text-[#1E4D36] mb-1">Engagement rate</div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-3xl font-bold text-[#1E4D36]">90%</span>
                  <span className="text-sm text-[#2A6349]">response</span>
                </div>
                <div className="text-xs text-[#2A6349]">9 of 10 patients contacted</div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Enrollment Trend Chart */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg text-[#1E4D36] flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Patient Engagement Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={enrollmentTrendData}>
                      <XAxis dataKey="week" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line 
                        type="monotone" 
                        dataKey="enrolled" 
                        stroke="#1E4D36" 
                        strokeWidth={3}
                        dot={{ fill: "#1E4D36", strokeWidth: 2, r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Task Priority Distribution */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg text-[#1E4D36] flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Task Priority Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
                <div className="mt-4 space-y-2">
                  {pieData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-gray-600">{item.name}</span>
                      </div>
                      <span className="font-medium text-gray-900">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Summary */}
          <Card className="bg-[#EBF4F0] border-[#1E4D36]/20">
            <CardContent className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-[#1E4D36]">Hello Dr. Martinez</h3>
                <Badge className="bg-green-100 text-green-800 border-green-300">Great week!</Badge>
              </div>
              <p className="text-gray-700 mb-4">
                This week, you supported <strong>5 patients</strong>, completed <strong>8 care goals</strong>, and logged <strong>22 minutes</strong> of thoughtful, efficient care. <span className="text-[#1E4D36] font-medium">That's 15% more time than last week.</span>
              </p>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8 text-[#1E4D36]" />
                  <div>
                    <div className="text-sm text-gray-600">Patients Supported</div>
                    <div className="text-xl font-bold text-gray-900">5</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                  <div>
                    <div className="text-sm text-gray-600">Goals Completed</div>
                    <div className="text-xl font-bold text-gray-900">8</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-8 w-8 text-orange-600" />
                  <div>
                    <div className="text-sm text-gray-600">Time Logged</div>
                    <div className="text-xl font-bold text-gray-900">22 min</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Activity className="h-8 w-8 text-[#2A6349]" />
                  <div>
                    <div className="text-sm text-gray-600">AI Edits</div>
                    <div className="text-xl font-bold text-gray-900">3</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <SmartRecommendations />
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <GoalGapsTracker />
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <ActivityGuidance />
        </TabsContent>
      </Tabs>
    </div>
  );
};
