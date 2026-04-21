import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Megaphone, Users, Calendar, Pause, Eye } from 'lucide-react';

interface Campaign {
  id: string;
  title: string;
  category: string;
  status: 'active' | 'paused';
  reached: string;
  totalPatients: number;
  completion: number;
  startDate: string;
  channel: 'Voice + SMS' | 'Voice' | 'SMS';
}

const mockCampaigns: Campaign[] = [
  {
    id: 'c-001',
    title: 'CCM Enrollment Outreach',
    category: 'CCM Enrollment',
    status: 'active',
    reached: '87 of 234',
    totalPatients: 234,
    completion: 37,
    startDate: '2026-04-01',
    channel: 'Voice + SMS',
  },
  {
    id: 'c-002',
    title: 'PHQ-9 Screening Reminder',
    category: 'Behavioral Health',
    status: 'active',
    reached: '212 of 312',
    totalPatients: 312,
    completion: 68,
    startDate: '2026-04-10',
    channel: 'Voice + SMS',
  },
  {
    id: 'c-003',
    title: 'Medication Adherence Check-In',
    category: 'Medication Management',
    status: 'paused',
    reached: '44 of 118',
    totalPatients: 118,
    completion: 37,
    startDate: '2026-03-28',
    channel: 'SMS',
  },
];

export const CampaignsContent: React.FC = () => {
  const [campaigns] = useState<Campaign[]>(mockCampaigns);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Campaigns</h2>
          <p className="text-sm text-muted-foreground mt-1">Enrollment outreach running across your patient population.</p>
        </div>
      </div>

      <div className="space-y-4">
        {campaigns.map(campaign => (
          <Card key={campaign.id} className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-sm text-foreground">{campaign.title}</h3>
                    <Badge variant="outline" className="text-xs">{campaign.category}</Badge>
                    <Badge
                      className={`text-xs ${
                        campaign.status === 'active'
                          ? 'bg-green-100 text-green-700 border-green-200'
                          : 'bg-gray-100 text-gray-600 border-gray-200'
                      }`}
                    >
                      {campaign.status === 'active' ? 'Active' : 'Paused'}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users size={11} />
                      <span>{campaign.reached} reached</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Megaphone size={11} />
                      <span>{campaign.channel}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={11} />
                      <span>Started {new Date(campaign.startDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Completion</span>
                      <span>{campaign.completion}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div
                        className="bg-primary h-1.5 rounded-full transition-all"
                        style={{ width: `${campaign.completion}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 sm:flex-col sm:items-end">
                  <Button variant="outline" size="sm" className="text-xs">
                    <Eye size={12} className="mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    <Pause size={12} className="mr-1" />
                    {campaign.status === 'active' ? 'Pause' : 'Resume'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
