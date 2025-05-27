
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Phone, MessageSquare, Calendar, DollarSign, Users, TrendingUp, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { EnhancedCampaign, CampaignPatient } from '@/data/campaignData';

interface CampaignDetailsViewProps {
  campaign: EnhancedCampaign;
  onUpdateCampaign: (updatedCampaign: EnhancedCampaign) => void;
}

export const CampaignDetailsView: React.FC<CampaignDetailsViewProps> = ({ campaign, onUpdateCampaign }) => {
  const [editingPatient, setEditingPatient] = useState<CampaignPatient | null>(null);
  const [selectedScript, setSelectedScript] = useState(campaign.scripts[0]?.id || '');

  const getStatusColor = (status: string) => {
    const colors = {
      'enrolled': 'bg-green-100 text-green-800',
      'contacted': 'bg-blue-100 text-blue-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'declined': 'bg-red-100 text-red-800',
      'callback-scheduled': 'bg-purple-100 text-purple-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getRiskColor = (risk: string) => {
    const colors = {
      'high': 'text-red-600',
      'medium': 'text-yellow-600',
      'low': 'text-green-600'
    };
    return colors[risk as keyof typeof colors] || 'text-gray-600';
  };

  const updatePatientStatus = (patientId: string, newStatus: string, notes?: string) => {
    const updatedPatients = campaign.patients.map(patient => 
      patient.id === patientId 
        ? { 
            ...patient, 
            status: newStatus as any,
            lastContactDate: new Date().toISOString().split('T')[0],
            contactAttempts: patient.contactAttempts + 1,
            notes: notes || patient.notes
          }
        : patient
    );
    
    onUpdateCampaign({ ...campaign, patients: updatedPatients });
  };

  return (
    <Card className="mt-2 bg-gray-50 border-l-4 border-l-[#1E4D36]">
      <CardHeader>
        <CardTitle className="text-[#1E4D36] text-lg">CCM Enrollment Outreach - Campaign Details</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="scripts">Scripts</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-sm text-gray-700 mb-1">Status</h4>
                <Badge className={campaign.statusColor}>{campaign.status}</Badge>
              </div>
              <div>
                <h4 className="font-medium text-sm text-gray-700 mb-1">Priority</h4>
                <Badge className={campaign.priorityColor}>{campaign.priority}</Badge>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-sm text-gray-700 mb-2">Campaign Progress</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Patients Contacted:</span>
                  <span>{campaign.metrics.contacted} of {campaign.metrics.totalPatients} ({campaign.completion}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-[#1E4D36] h-3 rounded-full transition-all duration-300" style={{ width: `${campaign.completion}%` }}></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-gray-700">Quick Stats</h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Enrolled:</span>
                    <span className="font-medium text-green-600">{campaign.metrics.enrolled}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pending:</span>
                    <span className="font-medium text-yellow-600">{campaign.metrics.pending}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Declined:</span>
                    <span className="font-medium text-red-600">{campaign.metrics.declined}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-gray-700">Campaign Details</h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Start Date:</span>
                    <span>{campaign.startDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Contact Method:</span>
                    <span>{campaign.description}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Conversion Rate:</span>
                    <span>{campaign.metrics.conversionRate}%</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="patients" className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-gray-700">Patient List ({campaign.patients.length})</h4>
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Patients</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="enrolled">Enrolled</SelectItem>
                  <SelectItem value="declined">Declined</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {campaign.patients.map((patient) => (
                <Card key={patient.id} className="p-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{patient.name}</span>
                        <Badge className={getStatusColor(patient.status)} variant="outline">
                          {patient.status}
                        </Badge>
                        <span className={`text-xs font-medium ${getRiskColor(patient.riskLevel)}`}>
                          {patient.riskLevel} risk
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>Phone: {patient.phone}</div>
                        <div>Attempts: {patient.contactAttempts} | Eligibility: {patient.eligibilityScore}%</div>
                        {patient.lastContactDate && (
                          <div>Last Contact: {patient.lastContactDate}</div>
                        )}
                        {patient.notes && (
                          <div className="text-xs italic">"{patient.notes}"</div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline">
                        <Phone size={12} />
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare size={12} />
                      </Button>
                      <Select onValueChange={(value) => updatePatientStatus(patient.id, value)}>
                        <SelectTrigger className="w-32 h-8">
                          <SelectValue placeholder="Update" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="contacted">Contacted</SelectItem>
                          <SelectItem value="enrolled">Enrolled</SelectItem>
                          <SelectItem value="declined">Declined</SelectItem>
                          <SelectItem value="callback-scheduled">Schedule Callback</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="scripts" className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-gray-700">Campaign Scripts</h4>
              <Select value={selectedScript} onValueChange={setSelectedScript}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select script" />
                </SelectTrigger>
                <SelectContent>
                  {campaign.scripts.map((script) => (
                    <SelectItem key={script.id} value={script.id}>
                      {script.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedScript && (
              <Card className="p-4">
                {(() => {
                  const script = campaign.scripts.find(s => s.id === selectedScript);
                  return script ? (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h5 className="font-medium">{script.title}</h5>
                        <Badge variant="outline">{script.duration}</Badge>
                      </div>
                      <div className="bg-gray-50 p-3 rounded text-sm">
                        {script.content}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Edit Script</Button>
                        <Button size="sm" variant="outline">Copy to Clipboard</Button>
                      </div>
                    </div>
                  ) : null;
                })()}
              </Card>
            )}
          </TabsContent>

          <TabsContent value="metrics" className="space-y-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-3">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-[#1E4D36]" />
                  <div>
                    <p className="text-xs text-gray-500">Total Patients</p>
                    <p className="text-lg font-bold">{campaign.metrics.totalPatients}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-green-600" />
                  <div>
                    <p className="text-xs text-gray-500">Conversion Rate</p>
                    <p className="text-lg font-bold">{campaign.metrics.conversionRate}%</p>
                  </div>
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-500">Avg Call Duration</p>
                    <p className="text-lg font-bold">{campaign.metrics.avgCallDuration}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center gap-2">
                  <DollarSign size={16} className="text-purple-600" />
                  <div>
                    <p className="text-xs text-gray-500">Cost/Enrollment</p>
                    <p className="text-lg font-bold">${campaign.metrics.costPerEnrollment}</p>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-4">
              <h5 className="font-medium mb-3">Enrollment Progress</h5>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Enrolled</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(campaign.metrics.enrolled / campaign.metrics.totalPatients) * 100}%` }}></div>
                    </div>
                    <span className="text-sm font-medium">{campaign.metrics.enrolled}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Contacted</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(campaign.metrics.contacted / campaign.metrics.totalPatients) * 100}%` }}></div>
                    </div>
                    <span className="text-sm font-medium">{campaign.metrics.contacted}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Pending</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${(campaign.metrics.pending / campaign.metrics.totalPatients) * 100}%` }}></div>
                    </div>
                    <span className="text-sm font-medium">{campaign.metrics.pending}</span>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign size={16} className="text-[#1E4D36]" />
                  <h5 className="font-medium">Revenue Tracking</h5>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>CPT Code:</span>
                    <span className="font-medium">{campaign.billingInfo.cptCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reimbursement Rate:</span>
                    <span className="font-medium">${campaign.billingInfo.reimbursementRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Revenue:</span>
                    <span className="font-medium text-green-600">${campaign.billingInfo.totalRevenue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Projected Revenue:</span>
                    <span className="font-medium">${(campaign.metrics.totalPatients * campaign.billingInfo.reimbursementRate * 0.3).toFixed(2)}</span>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle size={16} className="text-green-600" />
                  <h5 className="font-medium">Compliance Status</h5>
                </div>
                <div className="space-y-2">
                  <Badge className={`${campaign.billingInfo.complianceStatus === 'compliant' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {campaign.billingInfo.complianceStatus.toUpperCase()}
                  </Badge>
                  <div className="text-sm text-gray-600">
                    <p>• 20-minute minimum requirement: ✓</p>
                    <p>• Comprehensive care plan: ✓</p>
                    <p>• Patient consent obtained: ✓</p>
                    <p>• 24/7 access documented: ✓</p>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-4">
              <h5 className="font-medium mb-3">Monthly CCM Requirements</h5>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Minimum 20 minutes of care coordination</span>
                  <Badge className="bg-green-100 text-green-800">Met</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Comprehensive care plan established</span>
                  <Badge className="bg-green-100 text-green-800">Completed</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Patient access to care team 24/7</span>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Electronic health information exchange</span>
                  <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
