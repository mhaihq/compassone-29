
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CareTaskContent } from '@/components/care-task/CareTaskContent';

const CareTaskDetail = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();

  const handleComplete = () => {
    navigate('/');
  };

  if (!taskId) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-start items-center mb-6">
            <Button variant="outline" onClick={() => navigate(-1)} className="gap-2">
              <ArrowLeft size={16} /> Back
            </Button>
          </div>
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900">Task Not Found</h2>
            <p className="text-gray-600 mt-2">The care task you're looking for could not be found.</p>
            <Button className="mt-6" onClick={() => navigate('/')}>
              Return to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Simple Back Navigation */}
        <div className="flex justify-start items-center mb-6">
          <Button variant="outline" onClick={() => navigate(-1)} className="gap-2">
            <ArrowLeft size={16} /> Back
          </Button>
        </div>

        {/* Main Content */}
        <CareTaskContent taskId={taskId} onComplete={handleComplete} />
      </div>
    </div>
  );
};

export default CareTaskDetail;
