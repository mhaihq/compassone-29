import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Activity, FileText, Clock, CheckCircle2, AlertTriangle, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// TODO: Replace with real API call
const mockOverview = {
  conditions: [
    { name: 'Major Depression', icd10: 'F32.1', status: 'Active', trend: 'improving' as const },
    { name: 'Hypertension', icd10: 'I10', status: 'Active', trend: 'stable' as const },
    { name: 'Type 2 Diabetes', icd10: 'E11', status: 'Active', trend: 'worsening' as const },
  ],
  carePlan: {
    lastUpdated: '2026-04-18',
    updatedBy: 'Dr. Wilson',
    status: 'Active',
    signOff: 'approved' as const,
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
    { date: '2026-04-22', note: 'Depression symptoms flagged during Hana call — escalated to provider', type: 'alert' as const },
    { date: '2026-04-20', note: 'Medication adherence check completed', type: 'task' as const },
    { date: '2026-04-18', note: 'Care plan reviewed and updated by Dr. Wilson', type: 'careplan' as const },
  ],
};

const TREND_ICON: Record<string, React.ReactNode> = {
  improving: <TrendingUp className="h-3 w-3 text-green-600" />,
  stable: <Minus className="h-3 w-3 text-muted-foreground" />,
  worsening: <TrendingDown className="h-3 w-3 text-red-500" />,
};

export function OverviewTab() {
  const { conditions, carePlan, billing, recentActivity } = mockOverview;
  const billingPct = Math.min(Math.round((billing.minutesLogged / billing.minutesRequired) * 100), 100);

  return (
    <div className="space-y-3">
      {/* Conditions + Care Plan in a 2-col grid on wider screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

        {/* Chronic conditions */}
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs font-semibold text-foreground uppercase tracking-wide">Conditions</span>
          </div>
          <div className="space-y-2.5">
            {conditions.map(c => (
              <div key={c.icd10} className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm text-foreground truncate">{c.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">{c.icd10}</p>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {TREND_ICON[c.trend]}
                  <Badge variant="outline" className="text-xs">{c.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Care plan status */}
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs font-semibold text-foreground uppercase tracking-wide">Care Plan</span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs">Status</span>
              <Badge variant="outline" className="text-xs text-green-700 border-green-300 bg-green-50">
                <CheckCircle2 className="h-3 w-3 mr-1" />{carePlan.status}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs">Sign-off</span>
              <Badge
                variant="outline"
                className={`text-xs ${carePlan.signOff === 'approved' ? 'text-green-700 border-green-300 bg-green-50' : 'text-amber-700 border-amber-300 bg-amber-50'}`}
              >
                {carePlan.signOff === 'approved' ? 'Provider approved' : 'Pending review'}
              </Badge>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs">Last updated</span>
              <span className="text-xs text-foreground">{new Date(carePlan.lastUpdated).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs">Updated by</span>
              <span className="text-xs text-foreground">{carePlan.updatedBy}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Billing / minutes */}
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs font-semibold text-foreground uppercase tracking-wide">Billing — {billing.billingMonth}</span>
          </div>
          {billing.ready
            ? <Badge variant="outline" className="text-xs text-green-700 border-green-300 bg-green-50">Ready to bill</Badge>
            : <Badge variant="outline" className="text-xs text-amber-700 border-amber-300 bg-amber-50">In progress</Badge>
          }
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>{billing.cptCode} · {billing.description}</span>
          <span className={`font-medium ${billingPct >= 100 ? 'text-green-700' : 'text-foreground'}`}>
            {billing.minutesLogged} / {billing.minutesRequired} min
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${billingPct >= 100 ? 'bg-green-500' : 'bg-primary'}`}
            style={{ width: `${billingPct}%` }}
          />
        </div>
      </div>

      {/* Recent activity */}
      <div className="rounded-lg border border-border bg-card p-4">
        <span className="text-xs font-semibold text-foreground uppercase tracking-wide">Recent Activity</span>
        {recentActivity.length === 0 ? (
          <p className="text-sm text-muted-foreground mt-3 text-center py-4">No recent activity.</p>
        ) : (
          <div className="mt-3 space-y-0 divide-y divide-border">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 py-2.5">
                <div className="mt-0.5 flex-shrink-0">
                  {item.type === 'alert'
                    ? <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                    : item.type === 'careplan'
                    ? <FileText className="h-3.5 w-3.5 text-blue-500" />
                    : <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-foreground leading-snug">{item.note}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{new Date(item.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
