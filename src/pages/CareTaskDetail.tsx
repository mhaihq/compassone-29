
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CareTaskContent } from '@/components/care-task/CareTaskContent';
import { Clock, Play, Pause } from 'lucide-react';

const CareTaskDetail = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();

  const handleComplete = () => {
    navigate('/');
  };

  if (!taskId) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2" size={16} /> Back
          </Button>
        </div>
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold">Task Not Found</h2>
          <p className="text-gray-600 mt-2">The care task you're looking for could not be found.</p>
          <Button className="mt-6" onClick={() => navigate('/')}>Return to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2" size={16} /> Back
        </Button>
      </div>

      <CareTaskContent taskId={taskId} onComplete={handleComplete} />
    </div>
  );
};

export default CareTaskDetail;
