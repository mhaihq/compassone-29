import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Phone, PhoneOff, Loader2, Radio, Check } from 'lucide-react';

type CallState = 'idle' | 'ringing' | 'connected' | 'ended';

interface CallButtonProps {
  patientName: string;
  patientPhone?: string;
}

export function CallButton({ patientName, patientPhone = '+1 (555) 234-5678' }: CallButtonProps) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<CallState>('idle');
  const [elapsed, setElapsed] = useState(0);
  const [pin] = useState(() => String(Math.floor(100 + Math.random() * 900)));

  // Simulated PSTN flow: ringing → connected → ended
  useEffect(() => {
    if (state === 'ringing') {
      const t = setTimeout(() => setState('connected'), 2200);
      return () => clearTimeout(t);
    }
    if (state === 'connected') {
      const t = setInterval(() => setElapsed(e => e + 1), 1000);
      return () => clearInterval(t);
    }
  }, [state]);

  function start() {
    setState('ringing');
    setElapsed(0);
  }

  function end() {
    setState('ended');
  }

  function close() {
    setOpen(false);
    setTimeout(() => {
      setState('idle');
      setElapsed(0);
    }, 200);
  }

  const mm = String(Math.floor(elapsed / 60)).padStart(2, '0');
  const ss = String(elapsed % 60).padStart(2, '0');

  return (
    <>
      <Button
        size="sm"
        variant="outline"
        className="h-8"
        onClick={() => { setOpen(true); setState('idle'); setElapsed(0); }}
      >
        <Phone className="h-3.5 w-3.5 mr-1.5" />
        Call patient
      </Button>

      <Dialog open={open} onOpenChange={o => { if (!o) close(); else setOpen(true); }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Call {patientName}
            </DialogTitle>
          </DialogHeader>

          {state === 'idle' && (
            <div className="space-y-4">
              <div className="rounded-lg border border-border bg-muted/30 p-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Patient phone</span>
                  <span className="font-medium">{patientPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Your PIN for this call</span>
                  <span className="font-mono font-semibold">{pin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Hana bot</span>
                  <span className="font-medium text-green-700 flex items-center gap-1">
                    <Radio className="h-3 w-3" />Will listen in background
                  </span>
                </div>
              </div>
              <div className="rounded-md bg-blue-50 border border-blue-200 p-3 text-xs text-blue-900 space-y-1">
                <p>
                  <strong>How it works:</strong> We'll ring your clinic phone first. Answer, then enter PIN <span className="font-mono font-semibold">{pin}</span> to
                  connect to the patient. Hana transcribes the call in the background and suggests care plan updates when you hang up.
                </p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={close}>Cancel</Button>
                <Button onClick={start}>
                  <Phone className="h-3.5 w-3.5 mr-1.5" />Start call
                </Button>
              </DialogFooter>
            </div>
          )}

          {state === 'ringing' && (
            <div className="py-8 space-y-4 text-center">
              <Loader2 className="h-10 w-10 mx-auto text-primary animate-spin" />
              <p className="text-sm text-foreground">Ringing your clinic phone…</p>
              <p className="text-xs text-muted-foreground">Answer and enter PIN <span className="font-mono font-semibold">{pin}</span></p>
            </div>
          )}

          {state === 'connected' && (
            <div className="space-y-4">
              <div className="rounded-lg border-2 border-green-300 bg-green-50 p-4 text-center">
                <div className="flex items-center justify-center gap-2 text-green-800 mb-1">
                  <span className="h-2 w-2 rounded-full bg-green-600 animate-pulse" />
                  <span className="text-sm font-semibold">Connected to {patientName}</span>
                </div>
                <p className="text-3xl font-mono font-bold text-foreground">{mm}:{ss}</p>
              </div>
              <div className="rounded-md bg-muted/40 border border-border p-3 text-xs text-muted-foreground flex items-start gap-2">
                <Radio className="h-3.5 w-3.5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-foreground">Hana is listening</strong> — transcribing in the background. Working notes
                  and suggested care plan updates will appear in the patient panel when the call ends.
                </div>
              </div>
              <DialogFooter>
                <Button variant="destructive" onClick={end}>
                  <PhoneOff className="h-3.5 w-3.5 mr-1.5" />End call
                </Button>
              </DialogFooter>
            </div>
          )}

          {state === 'ended' && (
            <div className="space-y-4">
              <div className="rounded-lg border border-border bg-muted/30 p-4 text-center space-y-2">
                <Check className="h-8 w-8 mx-auto text-green-600" />
                <p className="text-sm font-semibold text-foreground">Call ended</p>
                <p className="text-xs text-muted-foreground">Duration: {mm}:{ss}</p>
              </div>
              <div className="rounded-md bg-amber-50 border border-amber-200 p-3 text-xs text-amber-900">
                Hana is drafting a working note and suggesting care plan updates. They'll appear in the patient's Care Plan tab
                in about 30 seconds.
              </div>
              <DialogFooter>
                <Button onClick={close}>Close</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
