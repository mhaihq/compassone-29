import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Megaphone, Plus, Users, Calendar, CheckCircle, ChevronDown, Eye, Edit, Pause, MessageSquare, Phone, ChevronUp } from 'lucide-react';
import { CampaignDetailsView } from './CampaignDetailsView';
import { ccmCampaignData, EnhancedCampaign } from '@/data/campaignData';

export const CampaignsContent: React.FC = () => {
  const [activeCampaigns, setActiveCampaigns] = useState<EnhancedCampaign[]>([ccmCampaignData]);

  const [recommendedCampaigns, setRecommendedCampaigns] = useState([
    {
      id: 2,
      title: 'PHQ-9 Kickoff',
      category: 'Behavioral Health',
      priority: 'High priority',
      priorityColor: 'bg-red-100 text-red-800',
      description: 'Voice with SMS fallback',
      patients: '312 patients',
      startDate: '5/15/2025'
    },
    {
      id: 3,
      title: 'Fall Risk Assessment',
      category: 'Preventive Care',
      priority: 'Medium priority',
      priorityColor: 'bg-yellow-100 text-yellow-800',
      description: 'Voice with SMS fallback',
      patients: '540 patients',
      startDate: '5/22/2025'
    },
    {
      id: 4,
      title: 'Medication Adherence',
      category: 'Medication Management',
      priority: 'High priority',
      priorityColor: 'bg-red-100 text-red-800',
      description: 'Voice with SMS fallback',
      patients: '118 patients',
      startDate: '5/10/2025'
    }
  ]);

  const [newCampaignForm, setNewCampaignForm] = useState({
    name: '',
    message: '',
    contactMethod: 'both',
    patientGroup: 'all'
  });

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [showCCMDetails, setShowCCMDetails] = useState(false);

  const stats = [
    {
      title: 'Total Campaigns',
      value: '4',
      subtitle: 'this month',
      icon: Megaphone,
      color: 'text-[#1E4D36]'
    },
    {
      title: 'Patients Reached',
      value: '1,230',
      subtitle: 'this month',
      icon: Users,
      color: 'text-[#1E4D36]'
    },
    {
      title: 'Tasks Created',
      value: '148',
      subtitle: 'this month',
      icon: CheckCircle,
      color: 'text-[#1E4D36]'
    },
    {
      title: 'Completion',
      value: '87%',
      subtitle: 'average rate',
      icon: CheckCircle,
      color: 'text-[#1E4D36]'
    }
  ];

  const suggestedPrompts = [
    'Remind patients to book their PHQ-9 screening',
    'Notify patients about flu shot availability',
    'Follow-up after missed appointments',
    'Invite CCM patients to a care planning call',
    'Medication adherence reminder for chronic patients'
  ];

  const patientGroups = [
    { value: 'all', label: 'All Patients', count: '1,234' },
    { value: 'high-risk', label: 'High Risk', count: '234' },
    { value: 'medium-risk', label: 'Medium Risk', count: '456' },
    { value: 'low-risk', label: 'Low Risk', count: '544' }
  ];

  const launchCampaign = (campaignId: number) => {
    const campaign = recommendedCampaigns.find(c => c.id === campaignId);
    if (campaign) {
      const newActiveCampaign = {
        ...ccmCampaignData, // Use the enhanced structure
        id: campaignId,
        title: campaign.title,
        category: campaign.category,
        priority: campaign.priority,
        priorityColor: campaign.priorityColor,
        status: 'In Progress',
        statusColor: 'bg-green-100 text-green-800',
        reached: `0 of ${campaign.patients.split(' ')[0]} reached`,
        completion: 0,
        startDate: campaign.startDate
      };
      setActiveCampaigns([...activeCampaigns, newActiveCampaign]);
      setRecommendedCampaigns(recommendedCampaigns.filter(c => c.id !== campaignId));
    }
  };

  const handleSuggestedPromptClick = (prompt: string) => {
    setNewCampaignForm({
      ...newCampaignForm,
      message: prompt
    });
  };

  const generateCampaign = () => {
    if (newCampaignForm.name && (newCampaignForm.message)) {
      const selectedGroup = patientGroups.find(g => g.value === newCampaignForm.patientGroup);
      const contactMethodText = newCampaignForm.contactMethod === 'both' ? 'Voice with SMS fallback' : 
                               newCampaignForm.contactMethod === 'call' ? 'Voice only' : 'SMS only';
      
      const newCampaign = {
        ...ccmCampaignData, // Use the enhanced structure
        id: Date.now(),
        title: newCampaignForm.name,
        category: 'Custom',
        status: 'In Progress',
        statusColor: 'bg-green-100 text-green-800',
        priority: 'Medium priority',
        priorityColor: 'bg-yellow-100 text-yellow-800',
        description: contactMethodText,
        reached: `0 of ${selectedGroup?.count || '100'} reached`,
        startDate: new Date().toLocaleDateString(),
        completion: 0
      };
      setActiveCampaigns([...activeCampaigns, newCampaign]);
      setNewCampaignForm({ name: '', message: '', contactMethod: 'both', patientGroup: 'all' });
      setIsSheetOpen(false);
    }
  };

  const updateCampaign = (updatedCampaign: EnhancedCampaign) => {
    setActiveCampaigns(campaigns =>
      campaigns.map(campaign =>
        campaign.id === updatedCampaign.id ? updatedCampaign : campaign
      )
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Megaphone size={20} className="text-[#1E4D36]" />
          <h1 className="text-lg font-semibold text-[#1E4D36]">Campaigns</h1>
        </div>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button className="bg-[#1E4D36] hover:bg-[#1E4D36]/90 text-white w-full sm:w-auto">
              <Plus size={16} />
              New Campaign
            </Button>
          </SheetTrigger>
          <SheetContent width="600px" className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="text-xl font-semibold text-gray-900 mb-6">Create New Campaign</SheetTitle>
            </SheetHeader>
            
            <div className="space-y-6">
              {/* Campaign Builder */}
              <div className="bg-gray-50 p-6 rounded-lg border shadow-sm">
                <h3 className="text-lg font-semibold text-[#1E4D36] mb-2">Campaign Builder</h3>
                <p className="text-gray-600 text-sm mb-6">
                  Create and customize your campaign with AI assistance.
                </p>
                
                <div className="space-y-6">
                  {/* Campaign Name */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Campaign Name
                    </Label>
                    <Input
                      placeholder="Enter campaign name"
                      value={newCampaignForm.name}
                      onChange={(e) => setNewCampaignForm({...newCampaignForm, name: e.target.value})}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      💬 Campaign Message
                    </Label>
                    <Textarea
                      placeholder="E.g., Remind CCM patients to complete their PHQ-9 screenings"
                      value={newCampaignForm.message}
                      onChange={(e) => setNewCampaignForm({...newCampaignForm, message: e.target.value})}
                      className="min-h-[100px]"
                    />
                  </div>

                  {/* Suggested Prompts */}
                  <div>
                    <Label className="text-sm font-medium text-amber-600 mb-3 block">
                      ✨ Suggested Prompts:
                    </Label>
                    <div className="grid grid-cols-1 gap-2">
                      {suggestedPrompts.map((prompt, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="justify-start text-left h-auto p-3 text-sm bg-gray-100 border-gray-200 hover:bg-gray-200 transition-colors"
                          onClick={() => handleSuggestedPromptClick(prompt)}
                        >
                          {prompt}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Contact Method */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-3 block">
                      Contact Method
                    </Label>
                    <RadioGroup 
                      value={newCampaignForm.contactMethod} 
                      onValueChange={(value) => setNewCampaignForm({...newCampaignForm, contactMethod: value})}
                      className="space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="call" id="call" />
                        <Label htmlFor="call" className="flex items-center gap-2 text-sm">
                          <Phone size={14} />
                          Call Only
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="text" id="text" />
                        <Label htmlFor="text" className="flex items-center gap-2 text-sm">
                          <MessageSquare size={14} />
                          Text Only
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="both" id="both" />
                        <Label htmlFor="both" className="flex items-center gap-2 text-sm">
                          <Phone size={14} />
                          <MessageSquare size={14} />
                          Voice with SMS Fallback
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Patient Selection */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-3 block">
                      Select Patients
                    </Label>
                    <RadioGroup 
                      value={newCampaignForm.patientGroup} 
                      onValueChange={(value) => setNewCampaignForm({...newCampaignForm, patientGroup: value})}
                      className="space-y-2"
                    >
                      {patientGroups.map((group) => (
                        <div key={group.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={group.value} id={group.value} />
                          <Label htmlFor={group.value} className="flex items-center justify-between flex-1 text-sm">
                            <span>{group.label}</span>
                            <Badge variant="outline" className="text-xs">{group.count} patients</Badge>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <Button 
                    className="w-full bg-[#1E4D36] hover:bg-[#1E4D36]/90 text-white py-3"
                    onClick={generateCampaign}
                    disabled={!newCampaignForm.name || !newCampaignForm.message}
                  >
                    Generate Campaign
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-white shadow-md">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <stat.icon size={16} className={stat.color} />
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 mb-1 truncate">{stat.title}</p>
                  <p className="text-lg sm:text-xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500 truncate">{stat.subtitle}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recommended Campaigns */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
            <h2 className="font-medium text-gray-900">Recommended Campaigns</h2>
            <Badge variant="outline" className="text-xs">{recommendedCampaigns.length}</Badge>
            <Badge className="text-xs bg-orange-100 text-orange-800 ml-2">Quick Launch</Badge>
          </div>
          <ChevronDown size={16} className="text-gray-400" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {recommendedCampaigns.map((campaign) => (
            <Card key={campaign.id} className="bg-white shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="text-xs bg-[#EBF4F0] text-[#1E4D36]">{campaign.category}</Badge>
                    <Badge className="text-xs bg-yellow-100 text-yellow-800">Recommended</Badge>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900">{campaign.title}</h3>
                  
                  <Badge className={`text-xs ${campaign.priorityColor}`}>
                    {campaign.priority}
                  </Badge>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Phone size={12} />
                        <MessageSquare size={12} />
                      </div>
                      <span>{campaign.description}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={14} />
                      <span>Ready to contact {campaign.patients}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>Started: {campaign.startDate}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full text-white bg-[#1E4D36] hover:bg-[#1E4D36]/90"
                    onClick={() => launchCampaign(campaign.id)}
                  >
                    <Plus size={14} />
                    Launch Campaign
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Active Campaigns */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <h2 className="font-medium text-gray-900">Active Campaigns</h2>
            <Badge variant="outline" className="text-xs">{activeCampaigns.length}</Badge>
          </div>
          <ChevronDown size={16} className="text-gray-400" />
        </div>

        <div className="grid grid-cols-1 gap-4">
          {activeCampaigns.map((campaign) => (
            <div key={campaign.id}>
              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className="text-xs bg-[#EBF4F0] text-[#1E4D36]">{campaign.category}</Badge>
                      <Badge className={`text-xs ${campaign.statusColor}`}>
                        {campaign.status}
                      </Badge>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900">{campaign.title}</h3>
                    
                    <Badge className={`text-xs ${campaign.priorityColor}`}>
                      {campaign.priority}
                    </Badge>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Phone size={12} />
                          <MessageSquare size={12} />
                        </div>
                        <span>{campaign.description}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={14} />
                        <span>{campaign.reached}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span>Started: {campaign.startDate}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Completion:</span>
                        <span>{campaign.completion}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-[#1E4D36] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${campaign.completion}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                      {campaign.id === 5 ? (
                        <Collapsible open={showCCMDetails} onOpenChange={setShowCCMDetails}>
                          <CollapsibleTrigger asChild>
                            <Button variant="outline" size="sm" className="flex-1">
                              <Eye size={14} />
                              View Details
                              {showCCMDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </Button>
                          </CollapsibleTrigger>
                        </Collapsible>
                      ) : (
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye size={14} />
                          View
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit size={14} />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Pause size={14} />
                        Pause
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* CCM Campaign Details - Enhanced inline view */}
              {campaign.id === 5 && (
                <Collapsible open={showCCMDetails} onOpenChange={setShowCCMDetails}>
                  <CollapsibleContent>
                    <CampaignDetailsView 
                      campaign={campaign} 
                      onUpdateCampaign={updateCampaign}
                    />
                  </CollapsibleContent>
                </Collapsible>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
