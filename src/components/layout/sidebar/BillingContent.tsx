
import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PatientBillingBreakdown } from "@/components/billing/PatientBillingBreakdown";
import { mockPatientBillingBreakdown } from "@/data/billingBreakdownData";

export const BillingContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div>
      <h3 className="font-medium text-xl text-gray-900 mb-4">
        <FileText className="mr-2 text-[#1E4D36]" size={20} />
        Billing
      </h3>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="breakdown">Time Breakdown</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card className="mb-6">
            <CardContent className="p-4">
              <h4 className="font-medium mb-3">BHI Billing Codes</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Time Used</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">G2214</TableCell>
                    <TableCell>Initial Assessment</TableCell>
                    <TableCell>35/50 min</TableCell>
                    <TableCell><Badge className="bg-green-100 text-green-700">Active</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">99484</TableCell>
                    <TableCell>General BHI Service</TableCell>
                    <TableCell>12/20 min</TableCell>
                    <TableCell><Badge className="bg-green-100 text-green-700">Active</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">99492</TableCell>
                    <TableCell>First Month CoCM</TableCell>
                    <TableCell>0/70 min</TableCell>
                    <TableCell><Badge className="bg-gray-100 text-gray-700">Not Started</Badge></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-white border-none shadow-sm">
              <CardContent className="p-4">
                <h4 className="font-medium text-gray-900">BHI G2214</h4>
                <p className="text-sm text-gray-600 mb-3">Initial Assessment</p>
                
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Time Used</span>
                    <span className="text-gray-900 font-medium">35/50 min</span>
                  </div>
                  <Progress value={70} className="h-2 bg-gray-100" />
                </div>
                
                <div className="text-right">
                  <span className="text-xs text-gray-500">
                    15 minutes remaining
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white border-none shadow-sm">
              <CardContent className="p-4">
                <h4 className="font-medium text-gray-900">BHI 99484</h4>
                <p className="text-sm text-gray-600 mb-3">Monthly Service</p>
                
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Time Used</span>
                    <span className="text-gray-900 font-medium">12/20 min</span>
                  </div>
                  <Progress value={60} className="h-2 bg-gray-100" />
                </div>
                
                <div className="text-right">
                  <span className="text-xs text-gray-500">
                    8 minutes remaining
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="breakdown" className="space-y-6">
          <PatientBillingBreakdown breakdown={mockPatientBillingBreakdown} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
