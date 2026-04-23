import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Mail, MessageSquare, Phone, Bot, Save } from 'lucide-react';
import { toast } from 'sonner';

// Per-provider escalation preferences — clinician said: "we have to ask them,
// how would you like to be informed… do you want us to email, text, call, or
// have Hana call you." This is a per-clinic / per-provider config.

interface ProviderPrefs {
  id: string;
  name: string;
  clinic: string;
  email: boolean;
  sms: boolean;
  phoneCall: boolean;
  hanaCall: boolean;
  // How critical does the escalation need to be before they're pinged?
  threshold: 'urgent-only' | 'all-escalations';
}

// TODO: replace with real API
const seedProviders: ProviderPrefs[] = [
  { id: 'DR-001', name: 'Dr. Sandra Kim, MD',   clinic: 'Dallas Primary Care',   email: true,  sms: true,  phoneCall: false, hanaCall: false, threshold: 'all-escalations' },
  { id: 'DR-002', name: 'Dr. Michael Brown, MD', clinic: 'Dallas Primary Care',   email: false, sms: false, phoneCall: true,  hanaCall: true,  threshold: 'urgent-only' },
  { id: 'DR-003', name: 'Dr. Rachel Chen, MD',   clinic: 'North Texas Cardiology', email: true,  sms: false, phoneCall: false, hanaCall: false, threshold: 'urgent-only' },
  { id: 'DR-004', name: 'Dr. James Wilson, MD',  clinic: 'Dallas Primary Care',   email: true,  sms: true,  phoneCall: true,  hanaCall: false, threshold: 'all-escalations' },
];

export function EscalationPrefs() {
  const [providers, setProviders] = useState(seedProviders);

  function update(id: string, patch: Partial<ProviderPrefs>) {
    setProviders(prev => prev.map(p => p.id === id ? { ...p, ...patch } : p));
  }

  function save(p: ProviderPrefs) {
    toast.success(`Preferences saved for ${p.name}`);
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-foreground">
          Each provider chooses how they want to be notified about escalations. Preferences apply to urgent triggers like
          BP &gt;180/120, PHQ-9 ≥20 with positive safety screen, or AFib with rapid rate.
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Configured per provider during onboarding. Can be updated any time.
        </p>
      </div>

      <div className="space-y-3">
        {providers.map(p => (
          <Card key={p.id} className="shadow-none border-border">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <p className="text-sm font-semibold text-foreground">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.clinic}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={p.threshold === 'urgent-only' ? 'outline' : 'secondary'} className="text-xs">
                    {p.threshold === 'urgent-only' ? 'Urgent only' : 'All escalations'}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8"
                    onClick={() =>
                      update(p.id, {
                        threshold: p.threshold === 'urgent-only' ? 'all-escalations' : 'urgent-only',
                      })
                    }
                  >
                    Toggle threshold
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <Channel
                  icon={<Mail className="h-4 w-4" />}
                  label="Email"
                  checked={p.email}
                  onChange={v => update(p.id, { email: v })}
                />
                <Channel
                  icon={<MessageSquare className="h-4 w-4" />}
                  label="SMS"
                  checked={p.sms}
                  onChange={v => update(p.id, { sms: v })}
                />
                <Channel
                  icon={<Phone className="h-4 w-4" />}
                  label="Direct call"
                  checked={p.phoneCall}
                  onChange={v => update(p.id, { phoneCall: v })}
                />
                <Channel
                  icon={<Bot className="h-4 w-4" />}
                  label="Hana calls me"
                  checked={p.hanaCall}
                  onChange={v => update(p.id, { hanaCall: v })}
                />
              </div>

              <div className="flex justify-end">
                <Button size="sm" variant="ghost" className="h-8" onClick={() => save(p)}>
                  <Save className="h-3.5 w-3.5 mr-1.5" />Save
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Channel({
  icon,
  label,
  checked,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-2 rounded-md border border-border bg-muted/30 px-3 py-2 cursor-pointer hover:bg-muted/60">
      <span className="flex items-center gap-2 text-sm text-foreground">
        <span className="text-muted-foreground">{icon}</span>
        {label}
      </span>
      <Switch checked={checked} onCheckedChange={onChange} />
    </label>
  );
}
