import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DollarSign, 
  Users, 
  Clock, 
  AlertTriangle,
  Phone,
  FileText,
  ChevronDown,
  Calendar,
  ClipboardX,
  MessageCircleX,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { RevenueOpportunitiesAnalytics } from '@/components/billing/RevenueOpportunitiesAnalytics';
import { getAllBillingOpportunities } from '@/services/billingOpportunitiesService';

interface Patient {
  id: string;
  name: string;
  cptCode: string;
  description: string;
  minutesUsed: number;
  minutesTotal: number;
  amount: string;
  status: string;
  daysRemaining: number;
  riskFactors?: string[];
}

export const BillingContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'traditional' | 'revenue-opportunities'>('traditional');
  const [activeFilter, setActiveFilter] = useState<'ready' | 'at-risk'>('ready');
  const [isOtherFiltersOpen, setIsOtherFiltersOpen] = useState(false);
  
  const allOpportunities = getAllBillingOpportunities();

  const metrics = [
    {
      title: 'Enrolled Patients',
      value: '247',
      icon: Users,
      color: 'text-[#1a1a1a]',
      bgColor: 'bg-[#f5f5f5]'
    },
    {
      title: 'Ready to Bill',
      value: '$24,580',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'At Risk of Expiring',
      value: '12',
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Average Time Logged',
      value: '42 min',
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    }
  ];

  const readyToBillPatients: Patient[] = [
    {
      id: 'P001',
      name: 'Sarah Johnson',
      cptCode: 'G2214',
      description: 'Initial Assessment',
      minutesUsed: 50,
      minutesTotal: 50,
      amount: '$185.00',
      status: 'ready',
      daysRemaining: 5
    },
    {
      id: 'P002',
      name: 'Michael Chen',
      cptCode: '99484',
      description: 'Monthly Service',
      minutesUsed: 20,
      minutesTotal: 20,
      amount: '$95.00',
      status: 'ready',
      daysRemaining: 8
    },
    {
      id: 'P003',
      name: 'Jennifer Martinez',
      cptCode: '99492',
      description: 'First Month CoCM',
      minutesUsed: 70,
      minutesTotal: 70,
      amount: '$220.00',
      status: 'ready',
      daysRemaining: 12
    },
    {
      id: 'P004',
      name: 'David Wilson',
      cptCode: 'G2214',
      description: 'Initial Assessment',
      minutesUsed: 50,
      minutesTotal: 50,
      amount: '$185.00',
      status: 'ready',
      daysRemaining: 6
    },
    {
      id: 'P005',
      name: 'Amanda Thompson',
      cptCode: '99484',
      description: 'Monthly Service',
      minutesUsed: 20,
      minutesTotal: 20,
      amount: '$95.00',
      status: 'ready',
      daysRemaining: 9
    },
    {
      id: 'P013',
      name: 'Kevin Park',
      cptCode: '99493',
      description: 'Subsequent CoCM',
      minutesUsed: 60,
      minutesTotal: 60,
      amount: '$160.00',
      status: 'ready',
      daysRemaining: 7
    },
    {
      id: 'P014',
      name: 'Rachel Green',
      cptCode: 'G2214',
      description: 'Initial Assessment',
      minutesUsed: 50,
      minutesTotal: 50,
      amount: '$185.00',
      status: 'ready',
      daysRemaining: 4
    }
  ];

  const atRiskPatients: Patient[] = [
    {
      id: 'P006',
      name: 'Emma Davis',
      cptCode: 'G2214',
      description: 'Initial Assessment',
      minutesUsed: 45,
      minutesTotal: 50,
      amount: '$185.00',
      status: 'at-risk',
      daysRemaining: 3,
      riskFactors: ['Expires in 3 days', 'Missing care plan']
    },
    {
      id: 'P007',
      name: 'James Wilson',
      cptCode: '99484',
      description: 'Monthly Service',
      minutesUsed: 18,
      minutesTotal: 20,
      amount: '$95.00',
      status: 'at-risk',
      daysRemaining: 5,
      riskFactors: ['Not contacted in 14 days', 'Missing 2 minutes']
    },
    {
      id: 'P008',
      name: 'Lisa Anderson',
      cptCode: '99492',
      description: 'First Month CoCM',
      minutesUsed: 65,
      minutesTotal: 70,
      amount: '$220.00',
      status: 'at-risk',
      daysRemaining: 2,
      riskFactors: ['Expires in 2 days', 'Missing documentation']
    },
    {
      id: 'P009',
      name: 'Robert Kim',
      cptCode: 'G2214',
      description: 'Initial Assessment',
      minutesUsed: 42,
      minutesTotal: 50,
      amount: '$185.00',
      status: 'at-risk',
      daysRemaining: 4,
      riskFactors: ['Missing 8 minutes', 'Care plan incomplete']
    },
    {
      id: 'P010',
      name: 'Maria Garcia',
      cptCode: '99484',
      description: 'Monthly Service',
      minutesUsed: 15,
      minutesTotal: 20,
      amount: '$95.00',
      status: 'at-risk',
      daysRemaining: 6,
      riskFactors: ['Not contacted in 10 days', 'Missing 5 minutes']
    },
    {
      id: 'P015',
      name: 'Thomas Lee',
      cptCode: '99493',
      description: 'Subsequent CoCM',
      minutesUsed: 55,
      minutesTotal: 60,
      amount: '$160.00',
      status: 'at-risk',
      daysRemaining: 1,
      riskFactors: ['Expires tomorrow', 'Missing physician consultation']
    }
  ];

  const otherFilterPatients: Patient[] = [
    {
      id: 'P011',
      name: 'Robert Kim',
      cptCode: '99484',
      description: 'Monthly Service',
      minutesUsed: 5,
      minutesTotal: 20,
      amount: '$95.00',
      status: 'under-minutes',
      daysRemaining: 10
    },
    {
      id: 'P012',
      name: 'Maria Garcia',
      cptCode: 'G2214',
      description: 'Initial Assessment',
      minutesUsed: 0,
      minutesTotal: 50,
      amount: '$185.00',
      status: 'blocked',
      daysRemaining: 0
    }
  ];

  const getCurrentPatients = () => {
    switch (activeFilter) {
      case 'ready':
        return readyToBillPatients;
      case 'at-risk':
        return atRiskPatients;
      default:
        return [];
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ready':
        return <Badge className="bg-green-100 text-green-700 border-green-200 flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3" />
          Ready
        </Badge>;
      case 'at-risk':
        return <Badge className="bg-orange-100 text-orange-700 border-orange-200">At Risk</Badge>;
      case 'under-minutes':
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Under Minutes</Badge>;
      case 'blocked':
        return <Badge className="bg-red-100 text-red-700 border-red-200">Blocked</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200">Pending</Badge>;
    }
  };

  const getRiskFactorIcon = (factor: string) => {
    if (factor.includes('Expires') || factor.includes('days') || factor.includes('tomorrow')) {
      return <Calendar className="h-3 w-3 text-orange-500" />;
    }
    if (factor.includes('Missing') || factor.includes('care plan') || factor.includes('documentation') || factor.includes('consultation')) {
      return <ClipboardX className="h-3 w-3 text-red-500" />;
    }
    if (factor.includes('contacted')) {
      return <MessageCircleX className="h-3 w-3 text-blue-500" />;
    }
    return <AlertTriangle className="h-3 w-3 text-orange-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center py-4">
        <h2 className="text-xl font-semibold text-[#1a1a1a] mb-2">Billing Management</h2>
        <p className="text-sm text-gray-600">
          Track billing cycles, CPT codes, and revenue optimization across your patient population.
        </p>
      </div>

      {/* Tabs for Traditional vs Cash-Pay */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'traditional' | 'revenue-opportunities')} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="traditional" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Traditional Billing
          </TabsTrigger>
          <TabsTrigger value="revenue-opportunities" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Cash-Pay Opportunities
            {allOpportunities.length > 0 && (
              <Badge variant="secondary" className="ml-1 bg-green-100 text-green-700">
                {allOpportunities.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="traditional" className="space-y-6 mt-6">

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">{metric.title}</p>
                    <p className="text-lg font-bold text-gray-900">{metric.value}</p>
                  </div>
                  <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                    <IconComponent className={`h-4 w-4 ${metric.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Billing Table */}
      <Card className="shadow-md">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-[#1a1a1a] mb-4">Patient Billing Status</CardTitle>
          
          {/* Primary Filter Toggle */}
          <div className="flex items-center p-1 bg-gray-100 rounded-lg w-fit">
            <Button
              variant={activeFilter === 'ready' ? 'default' : 'ghost'}
              size="sm"
              className={`${
                activeFilter === 'ready' 
                  ? 'bg-[#1a1a1a] hover:bg-[#333333] text-white shadow-sm'
                  : 'hover:bg-gray-50 text-gray-600'
              } rounded-md px-4 py-2 transition-all`}
              onClick={() => setActiveFilter('ready')}
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Ready to Bill
              <Badge variant="secondary" className="ml-2 text-xs bg-white text-gray-700">
                {readyToBillPatients.length}
              </Badge>
            </Button>
            
            <Button
              variant={activeFilter === 'at-risk' ? 'default' : 'ghost'}
              size="sm"
              className={`${
                activeFilter === 'at-risk' 
                  ? 'bg-[#1a1a1a] hover:bg-[#333333] text-white shadow-sm'
                  : 'hover:bg-gray-50 text-gray-600'
              } rounded-md px-4 py-2 transition-all ml-1`}
              onClick={() => setActiveFilter('at-risk')}
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              At Risk
              <Badge variant="secondary" className="ml-2 text-xs bg-white text-gray-700">
                {atRiskPatients.length}
              </Badge>
            </Button>
          </div>

          {/* Expandable Other Filters */}
          <Collapsible open={isOtherFiltersOpen} onOpenChange={setIsOtherFiltersOpen} className="mt-4">
            <CollapsibleTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-300 hover:bg-gray-50 text-gray-600"
              >
                Additional Filters
                <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${isOtherFiltersOpen ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3">
              <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg">
                <Button variant="outline" size="sm" className="border-gray-300 hover:bg-white text-gray-600">
                  Under Minutes
                  <Badge variant="secondary" className="ml-2 text-xs">8</Badge>
                </Button>
                <Button variant="outline" size="sm" className="border-gray-300 hover:bg-white text-gray-600">
                  Blocked
                  <Badge variant="secondary" className="ml-2 text-xs">3</Badge>
                </Button>
                <Button variant="outline" size="sm" className="border-gray-300 hover:bg-white text-gray-600">
                  Expired
                  <Badge variant="secondary" className="ml-2 text-xs">2</Badge>
                </Button>
                <Button variant="outline" size="sm" className="border-gray-300 hover:bg-white text-gray-600">
                  Pending Review
                  <Badge variant="secondary" className="ml-2 text-xs">5</Badge>
                </Button>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-xs font-medium text-gray-700 px-6">Patient</TableHead>
                  <TableHead className="text-xs font-medium text-gray-700">CPT Code</TableHead>
                  <TableHead className="text-xs font-medium text-gray-700">Progress</TableHead>
                  <TableHead className="text-xs font-medium text-gray-700">Amount</TableHead>
                  <TableHead className="text-xs font-medium text-gray-700">Status</TableHead>
                  {activeFilter === 'at-risk' && (
                    <TableHead className="text-xs font-medium text-gray-700">Risk Factors</TableHead>
                  )}
                  <TableHead className="text-xs font-medium text-gray-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getCurrentPatients().map((patient) => (
                  <TableRow key={patient.id} className="hover:bg-gray-50 border-b border-gray-100">
                    <TableCell className="px-6">
                      <div>
                        <p className="font-medium text-sm text-gray-900">{patient.name}</p>
                        <p className="text-xs text-gray-500">ID: {patient.id}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm text-gray-900">{patient.cptCode}</p>
                        <p className="text-xs text-gray-500">{patient.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">{patient.minutesUsed}/{patient.minutesTotal} min</span>
                          <span className="font-medium text-gray-900">
                            {Math.round((patient.minutesUsed / patient.minutesTotal) * 100)}%
                          </span>
                        </div>
                        <Progress 
                          value={(patient.minutesUsed / patient.minutesTotal) * 100} 
                          className="h-2"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-gray-900">{patient.amount}</TableCell>
                    <TableCell>{getStatusBadge(patient.status)}</TableCell>
                    {activeFilter === 'at-risk' && (
                      <TableCell>
                        <div className="space-y-1">
                          {patient.riskFactors?.map((factor, index) => (
                            <div key={index} className="flex items-center gap-2 text-xs">
                              {getRiskFactorIcon(factor)}
                              <span className="text-gray-600">{factor}</span>
                            </div>
                          ))}
                        </div>
                      </TableCell>
                    )}
                    <TableCell>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0 hover:bg-gray-50">
                          <Phone className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0 hover:bg-gray-50">
                          <FileText className="h-3 w-3" />
                        </Button>
                        {activeFilter === 'ready' && (
                          <Button size="sm" className="h-8 px-3 bg-[#1a1a1a] hover:bg-[#333333] text-xs">
                            Bill Now
                          </Button>
                        )}
                        {activeFilter === 'at-risk' && (
                          <Button size="sm" variant="outline" className="h-8 px-3 text-xs border-orange-200 text-orange-700 hover:bg-orange-50">
                            Review
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
        </TabsContent>

        <TabsContent value="revenue-opportunities" className="mt-6">
          <RevenueOpportunitiesAnalytics 
            opportunities={allOpportunities}
            conversionRate={42}
            actualRevenue={3200}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
