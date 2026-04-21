import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export function PatientDetail() {
  const { patientId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container py-4 flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to dashboard
          </Button>
        </div>
      </header>

      <main className="container py-12 text-center">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Patient {patientId}</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Patient details are now viewed from the dashboard's Patients tab.
        </p>
        <Button onClick={() => navigate('/')}>Open dashboard</Button>
      </main>
    </div>
  );
}
