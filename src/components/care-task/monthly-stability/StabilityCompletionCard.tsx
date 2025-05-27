
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const StabilityCompletionCard: React.FC = () => {
  return (
    <Card className="border-green-200 bg-green-50">
      <CardContent className="p-6 text-center">
        <CheckCircle className="mx-auto text-green-600 mb-4" size={48} />
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          Monthly Review Complete!
        </h3>
        <p className="text-green-700">
          Great work! The patient's stability assessment has been documented successfully.
        </p>
      </CardContent>
    </Card>
  );
};
