import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
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
} from 'lucide-react';

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
  const [activeFilter, setActiveFilter] = useState<'ready' | 'at-risk'>('ready');
  const [isOtherFiltersOpen, setIsOtherFiltersOpen] = useState(false);

  const metrics = [
    { title: 'Enrolled Patients', value: '247', icon: Users, color: 'text-[#1a1a1a]', bgColor: 'bg-[#f5f5f5]' },
    { title: 'Ready to Bill', value: '$24,580', icon: DollarSign, color: 'text-green-600', bgColor: 'bg-green-50' },
    { title: 'At Risk of Expiring', value: '12', icon: AlertTriangle, color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { title: 'Average Time Logged', value: '42 min', icon: Clock, color: 'text-blue-600', bgColor: 'bg-blue-50' },
  ];

  const readyToBillPatients: Patient[] = [
    { id: 'P001', name: 'Sarah Johnson', cptCode: 'G2214', description: 'Initial Assessment', minutesUsed: 50, minutesTotal: 50, amount: '$185.00', status: 'ready', daysRemaining: 5 },
    { id: 'P002', name: 'Michael Chen', cptCode: '99484', description: 'Monthly Service', minutesUsed: 20, minutesTotal: 20, amount: '$95.00', status: 'ready', daysRemaining: 8 },
    { id: 'P003', name: 'Jennifer Martinez', cptCode: '99492', description: 'First Month CoCM', minutesUsed: 70, minutesTotal: 70, amount: '$220.00', status: 'ready', daysRemaining: 12 },
    { id: 'P004', name: 'David Wilson', cptCode: 'G2214', description: 'Initial Assessment', minutesUsed: 50, minutesTotal: 50, amount: '$185.00', status: 'ready', daysRemaining: 6 },
    { id: 'P005', name: 'Amanda Thompson', cptCode: '99484', description: 'Monthly Service', minutesUsed: 20, minutesTotal: 20, amount: '$95.00', status: 'ready', daysRemaining: 9 },
    { id: 'P013', name: 'Kevin Park', cptCode: '99493', description: 'Subsequent CoCM', minutesUsed: 60, minutesTotal: 60, amount: '$160.00', status: 'ready', daysRemaining: 7 },
    { id: 'P014', name: 'Rachel Green', cptCode: 'G2214', description: 'Initial Assessment', minutesUsed: 50, minutesTotal: 50, amount: '$185.00', status: 'ready', daysRemaining: 4 },
  ];

  const atRiskPatients: Patient[] = [
    { id: 'P006', name: 'Emma Davis', cptCode: 'G2214', description: 'Initial Assessment', minutesUsed: 45, minutesTotal: 50, amount: '$185.00', status: 'at-risk', daysRemaining: 3, riskFactors: ['Expires in 3 days', 'Missing care plan'] },
    { id: 'P007', name: 'James Wilson', cptCode: '99484', description: 'Monthly Service', minutesUsed: 18, minutesTotal: 20, amount: '$95.00', status: 'at-risk', daysRemaining: 5, riskFactors: ['Not contacted in 14 days', 'Missing 2 minutes'] },
    { id: 'P008', name: 'Lisa Anderson', cptCode: '99492', description: 'First Month CoCM', minutesUsed: 65, minutesTotal: 70, amount: '$220.00', status: 'at-risk', daysRemaining: 2, riskFactors: ['Expires in 2 days', 'Missing documentation'] },
    { id: 'P009', name: 'Robert Kim', cptCode: 'G2214', description: 'Initial Assessment', minutesUsed: 42, minutesTotal: 50, amount: '$185.00', status: 'at-risk', daysRemaining: 4, riskFactors: ['Missing 8 minutes', 'Care plan incomplete'] },
    { id: 'P010', name: 'Maria Garcia', cptCode: '99484', description: 'Monthly Service', minutesUsed: 15, minutesTotal: 20, amount: '$95.00', status: 'at-risk', daysRemaining: 6, riskFactors: ['Not contacted in 10 days', 'Missing 5 minutes'] },
    { id: 'P015', name: 'Thomas Lee', cptCode: '99493', description: 'Subsequent CoCM', minutesUsed: 55, minutesTotal: 60, amount: '$160.00', status: 'at-risk', daysRemaining: 1, riskFactors: ['Expires tomorrow', 'Missing physician consultation'] },
  ];

  const currentPatients = activeFilter === 'ready' ? readyToBillPatients : atRiskPatients;

  const getStatusBadge = (status: string) => {
    if (status === 'ready') return <Badge className="bg-green-100 text-green-700 border-green-200 flex items-center gap-1"><CheckCircle2 className="h-3 w-3" />Ready</Badge>;
    if (status === 'at-risk') return <Badge className="bg-orange-100 text-orange-700 border-orange-200">At Risk</Badge>;
    return <Badge className="bg-gray-100 text-gray-700 border-gray-200">Pending</Badge>;
  };

  const getRiskIcon = (factor: string) => {
    if (factor.includes('Expires') || factor.includes('days') || factor.includes('tomorrow')) return <Calendar className="h-3 w-3 text-orange-500" />;
    if (factor.includes('Missing') || factor.includes('care plan') || factor.includes('documentation') || factor.includes('consultation')) return <ClipboardX className="h-3 w-3 text-red-500" />;
    if (factor.includes('contacted')) return <MessageCircleX className="h-3 w-3 text-blue-500" />;
    return <AlertTriangle className="h-3 w-3 text-orange-500" />;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Billing Management</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Track billing cycles, CPT codes, and time thresholds across your patient population.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, i) => (
          <Card key={i} className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{metric.title}</p>
                  <p className="text-lg font-bold text-foreground">{metric.value}</p>
                </div>
                <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                  <metric.icon className={`h-4 w-4 ${metric.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-base text-foreground mb-4">Patient Billing Status</CardTitle>

          <div className="flex items-center p-1 bg-muted rounded-lg w-full sm:w-fit">
            <Button
              variant={activeFilter === 'ready' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-md px-3 py-2 flex-1 sm:flex-none"
              onClick={() => setActiveFilter('ready')}
            >
              <CheckCircle2 className="h-4 w-4 mr-1.5" />
              Ready to Bill
              <Badge variant="secondary" className="ml-2 text-xs">{readyToBillPatients.length}</Badge>
            </Button>
            <Button
              variant={activeFilter === 'at-risk' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-md px-3 py-2 ml-1 flex-1 sm:flex-none"
              onClick={() => setActiveFilter('at-risk')}
            >
              <AlertTriangle className="h-4 w-4 mr-1.5" />
              At Risk
              <Badge variant="secondary" className="ml-2 text-xs">{atRiskPatients.length}</Badge>
            </Button>
          </div>

          <Collapsible open={isOtherFiltersOpen} onOpenChange={setIsOtherFiltersOpen} className="mt-4">
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="sm">
                Additional Filters
                <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${isOtherFiltersOpen ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3">
              <div className="flex flex-wrap gap-2 p-3 bg-muted rounded-lg">
                {[['Under Minutes', '8'], ['Blocked', '3'], ['Expired', '2'], ['Pending Review', '5']].map(([label, count]) => (
                  <Button key={label} variant="outline" size="sm">
                    {label}
                    <Badge variant="secondary" className="ml-2 text-xs">{count}</Badge>
                  </Button>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="text-xs font-medium px-4">Patient</TableHead>
                  <TableHead className="text-xs font-medium hidden sm:table-cell">CPT Code</TableHead>
                  <TableHead className="text-xs font-medium hidden md:table-cell">Progress</TableHead>
                  <TableHead className="text-xs font-medium">Amount</TableHead>
                  <TableHead className="text-xs font-medium">Status</TableHead>
                  {activeFilter === 'at-risk' && <TableHead className="text-xs font-medium hidden lg:table-cell">Risk Factors</TableHead>}
                  <TableHead className="text-xs font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPatients.map(patient => (
                  <TableRow key={patient.id} className="hover:bg-muted/30 border-b border-border">
                    <TableCell className="px-4 py-3">
                      <p className="font-medium text-sm">{patient.name}</p>
                      <p className="text-xs text-muted-foreground hidden sm:block">ID: {patient.id}</p>
                      {/* Show CPT inline on mobile */}
                      <p className="text-xs text-muted-foreground sm:hidden">{patient.cptCode} · {patient.description}</p>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <p className="font-medium text-sm">{patient.cptCode}</p>
                      <p className="text-xs text-muted-foreground">{patient.description}</p>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="space-y-1.5 w-28">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">{patient.minutesUsed}/{patient.minutesTotal} min</span>
                          <span className="font-medium">{Math.round((patient.minutesUsed / patient.minutesTotal) * 100)}%</span>
                        </div>
                        <Progress value={(patient.minutesUsed / patient.minutesTotal) * 100} className="h-1.5" />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-sm">{patient.amount}</TableCell>
                    <TableCell>{getStatusBadge(patient.status)}</TableCell>
                    {activeFilter === 'at-risk' && (
                      <TableCell className="hidden lg:table-cell">
                        <div className="space-y-1">
                          {patient.riskFactors?.map((f, i) => (
                            <div key={i} className="flex items-center gap-1 text-xs text-muted-foreground">
                              {getRiskIcon(f)}
                              {f}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                    )}
                    <TableCell className="py-3">
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0"><Phone className="h-3 w-3" /></Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0 hidden sm:flex"><FileText className="h-3 w-3" /></Button>
                        {activeFilter === 'ready' && (
                          <Button size="sm" className="h-8 px-3 text-xs">Bill Now</Button>
                        )}
                        {activeFilter === 'at-risk' && (
                          <Button size="sm" variant="outline" className="h-8 px-3 text-xs border-orange-200 text-orange-700 hover:bg-orange-50">Review</Button>
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
    </div>
  );
};
