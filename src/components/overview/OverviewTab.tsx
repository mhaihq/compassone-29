import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, FileText, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';

// TODO: Replace with real API call
const mockOverview = {
  conditions: [
    { name: 'Major Depression', icd10: 'F32.1', status: 'Active' },
    { name: 'Hypertension', icd10: 'I10', status: 'Active' },
  ],
  carePlan: {
    lastUpdated: '2026-04-18',
    updatedBy: 'Dr. Wilson',
    status: 'Active',
  },
  billing: {
    cptCode: '99490',
    description: 'CCM Monthly',
    minutesLogged: 42,
    minutesRequired: 20,
    billingMonth: 'April 2026',
    ready: true,
  },
  recentActivity: [
    { date: '2026-04-22', note: 'Depression symptoms flagged during Hana call — escalated to provider', type: 'alert' },
    { date: '2026-04-20', note: 'Medication adherence check completed', type: 'task' },
    { date: '2026-04-18', note: 'Care plan reviewed and updated', type: 'careplan' },
  ],
};

const OverviewTab = () => {
  const { conditions, carePlan, billing, recentActivity } = mockOverview;
  const billingPct = Math.min(Math.round((billing.minutesLogged / billing.minutesRequired) * 100), 100);

  return (
    <div className="space-y-4">

      {/* Chronic conditions */}
      <Card className="shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-foreground">Chronic Conditions</h3>
          </div>
          <div className="space-y-2">
            {conditions.map(c => (
              <div key={c.icd10} className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-foreground">{c.name}</span>
                  <span className="text-xs text-muted-foreground ml-2">{c.icd10}</span>
                </div>
                <Badge variant="outline" className="text-xs text-green-700 border-green-300">{c.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Care plan status */}
      <Card className="shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-foreground">Care Plan</h3>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Status</span>
            <Badge variant="outline" className="text-xs text-green-700 border-green-300">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              {carePlan.status}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-muted-foreground">Last updated</span>
            <span className="text-foreground">{new Date(carePlan.lastUpdated).toLocaleDateString()} by {carePlan.updatedBy}</span>
          </div>
        </CardContent>
      </Card>

      {/* Billing / minutes */}
      <Card className="shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-foreground">Billing — {billing.billingMonth}</h3>
          </div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">{billing.cptCode} · {billing.description}</span>
            {billing.ready
              ? <Badge variant="outline" className="text-xs text-green-700 border-green-300">Ready to bill</Badge>
              : <Badge variant="outline" className="text-xs text-orange-600 border-orange-300">In progress</Badge>
            }
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
            <span>{billing.minutesLogged} min logged</span>
            <span>{billing.minutesRequired} min required</span>
          </div>
          <div className="w-full bg-muted rounded-full h-1.5">
            <div
              className="bg-primary h-1.5 rounded-full transition-all"
              style={{ width: `${billingPct}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Recent activity */}
      <Card className="shadow-sm">
        <CardContent className="p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className="mt-0.5 flex-shrink-0">
                  {item.type === 'alert'
                    ? <AlertTriangle className="h-3.5 w-3.5 text-orange-500" />
                    : item.type === 'careplan'
                    ? <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                    : <CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-foreground leading-snug">{item.note}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{new Date(item.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default OverviewTab;
