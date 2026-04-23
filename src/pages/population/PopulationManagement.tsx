import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { patientsCcmData } from '@/data/patientsCcmData';
import { patientsData } from '@/data/patientsData';
import { CheckCircle, AlertTriangle, Users, Clock, Shield } from 'lucide-react';
import { CcmPanel, ApcmPanel, ConsentQueue } from './PopulationPanels';
import { EscalationPrefs } from './EscalationPrefs';
import { ProviderApprovalInbox } from './ProviderApprovalInbox';

// 24/7 coverage — who's reachable right now. Clinician concern: for chronic care,
// someone must be available 24/7 for emergencies. Coordinator/provider sees this
// at a glance so they know who's on and can hand off if needed.
function CoverageStrip() {
  // TODO: pull from real on-call schedule API
  const onCallCoordinator = 'Linda Torres, RN';
  const onCallProvider = 'Dr. Sandra Kim, MD';
  const afterHoursLine = '1-800-555-0100';
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-muted/30 px-4 py-2 text-xs">
      <span className="flex items-center gap-1.5 text-green-700 font-medium">
        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
        24/7 coverage active
      </span>
      <span className="text-muted-foreground">·</span>
      <span><span className="text-muted-foreground">On call (coordinator):</span> <span className="font-medium text-foreground">{onCallCoordinator}</span></span>
      <span className="text-muted-foreground">·</span>
      <span><span className="text-muted-foreground">On call (provider):</span> <span className="font-medium text-foreground">{onCallProvider}</span></span>
      <span className="text-muted-foreground">·</span>
      <span className="flex items-center gap-1"><Shield className="h-3 w-3 text-muted-foreground" /><span className="text-muted-foreground">After-hours:</span> <span className="font-mono text-foreground">{afterHoursLine}</span></span>
    </div>
  );
}

function usePopulationMetrics() {
  const totalActive = patientsData.filter(p => p.status === 'Active').length;
  const ccmCount = patientsCcmData.filter(p => p.enrolledInCCM).length;
  const apcmCount = patientsCcmData.filter(p => p.enrolledInAPCM).length;
  const pendingConsent = patientsCcmData.filter(p => !p.consent.obtained).length;
  const billingReady = patientsCcmData.filter(
    p => p.minutesTarget > 0 && p.minutesThisMonth >= p.minutesTarget,
  ).length;
  const needOutreach = patientsCcmData.filter(
    p => p.minutesThisMonth < 10 && p.minutesTarget >= 20,
  ).length;

  return { totalActive, ccmCount, apcmCount, pendingConsent, billingReady, needOutreach };
}

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  sub?: string;
  accent?: 'green' | 'amber' | 'default';
}

function MetricCard({ icon, label, value, sub, accent = 'default' }: MetricCardProps) {
  const valueColor =
    accent === 'green' ? 'text-green-600' :
    accent === 'amber' ? 'text-amber-600' :
    'text-foreground';

  return (
    <Card className="border border-border shadow-none">
      <CardContent className="pt-4 pb-4 px-4">
        <div className="flex items-start gap-3">
          <span className="text-muted-foreground mt-0.5">{icon}</span>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground leading-none mb-1">{label}</p>
            <p className={`text-2xl font-semibold leading-none ${valueColor}`}>{value}</p>
            {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function PopulationManagement() {
  const { ccmCount, apcmCount, pendingConsent, billingReady, needOutreach } = usePopulationMetrics();

  return (
    <div className="flex flex-col gap-6">
      <CoverageStrip />

      {/* Metric strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard
          icon={<Users size={16} />}
          label="Total Enrolled"
          value={ccmCount + apcmCount}
          sub={`${ccmCount} CCM · ${apcmCount} APCM`}
        />
        <MetricCard
          icon={<CheckCircle size={16} />}
          label="Billing Ready"
          value={billingReady}
          sub="Met minutes target"
          accent="green"
        />
        <MetricCard
          icon={<AlertTriangle size={16} />}
          label="Need Outreach"
          value={needOutreach}
          sub="< 10 min logged"
          accent="amber"
        />
        <MetricCard
          icon={<Clock size={16} />}
          label="Pending Consent"
          value={pendingConsent}
          sub="Awaiting signature"
        />
      </div>

      {/* Panel tabs */}
      <Tabs defaultValue="ccm">
        <TabsList className="mb-4 flex-wrap">
          <TabsTrigger value="ccm">CCM Panel</TabsTrigger>
          <TabsTrigger value="apcm">APCM Panel</TabsTrigger>
          <TabsTrigger value="consent">Consent Queue</TabsTrigger>
          <TabsTrigger value="approvals">Provider Inbox</TabsTrigger>
          <TabsTrigger value="prefs">Provider Prefs</TabsTrigger>
        </TabsList>
        <TabsContent value="ccm"><CcmPanel /></TabsContent>
        <TabsContent value="apcm"><ApcmPanel /></TabsContent>
        <TabsContent value="consent"><ConsentQueue /></TabsContent>
        <TabsContent value="approvals"><ProviderApprovalInbox /></TabsContent>
        <TabsContent value="prefs"><EscalationPrefs /></TabsContent>
      </Tabs>
    </div>
  );
}
