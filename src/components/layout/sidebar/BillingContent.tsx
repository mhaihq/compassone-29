
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
        <FileText className="mr-2 text-[#1a1a1a]" size={20} />
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
              <h4 className="font-medium mb-3">CCM Billing Codes</h4>
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
                    <TableCell className="font-medium">99490</TableCell>
                    <TableCell>CCM Monthly (20 min)</TableCell>
                    <TableCell>22/20 min</TableCell>
                    <TableCell><Badge className="bg-green-100 text-green-700">Ready</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">99439</TableCell>
                    <TableCell>CCM Add-on (+20 min)</TableCell>
                    <TableCell>0/20 min</TableCell>
                    <TableCell><Badge className="bg-gray-100 text-gray-700">Not Started</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">99487</TableCell>
                    <TableCell>Complex CCM (60 min)</TableCell>
                    <TableCell>0/60 min</TableCell>
                    <TableCell><Badge className="bg-gray-100 text-gray-700">Not Started</Badge></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-white border-none shadow-sm">
              <CardContent className="p-4">
                <h4 className="font-medium text-gray-900">CCM 99490</h4>
                <p className="text-sm text-gray-600 mb-3">Monthly (20 min)</p>

                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Time Used</span>
                    <span className="text-gray-900 font-medium">22/20 min</span>
                  </div>
                  <Progress value={100} className="h-2 bg-gray-100" />
                </div>

                <div className="text-right">
                  <span className="text-xs text-green-700 font-medium">
                    Threshold met
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white border-none shadow-sm">
              <CardContent className="p-4">
                <h4 className="font-medium text-gray-900">CCM 99439</h4>
                <p className="text-sm text-gray-600 mb-3">Add-on (+20 min)</p>

                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Time Used</span>
                    <span className="text-gray-900 font-medium">0/20 min</span>
                  </div>
                  <Progress value={0} className="h-2 bg-gray-100" />
                </div>

                <div className="text-right">
                  <span className="text-xs text-gray-500">
                    20 minutes remaining
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
