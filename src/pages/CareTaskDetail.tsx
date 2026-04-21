import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CareTaskContent } from '@/components/care-task/CareTaskContent';

export function CareTaskDetail() {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();

  const backButton = (
    <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="gap-2">
      <ArrowLeft size={14} /> Back
    </Button>
  );

  if (!taskId) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">{backButton}</div>
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-foreground">Task not found</h2>
            <p className="text-sm text-muted-foreground mt-2">The care task you're looking for could not be found.</p>
            <Button className="mt-6" onClick={() => navigate('/')}>Return to dashboard</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">{backButton}</div>
        <CareTaskContent taskId={taskId} onComplete={() => navigate('/')} />
      </div>
    </div>
  );
}
