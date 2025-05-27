
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, AlertTriangle, TrendingUp, Calendar, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MonthlyStabilityReviewProps {
  task: any;
  onComplete: () => void;
  timer: number;
  formatTime: (seconds: number) => string;
}

export const MonthlyStabilityReview: React.FC<MonthlyStabilityReviewProps> = ({
  task,
  onComplete,
  timer,
  formatTime
}) => {
  const { toast } = useToast();
  const [stabilityMetrics, setStabilityMetrics] = useState({
    mood: '',
    medication: '',
    sleep: '',
    functionality: '',
    triggers: ''
  });
  const [careRecommendations, setCareRecommendations] = useState('');
  const [nextReviewDate, setNextReviewDate] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const handleMetricChange = (metric: string, value: string) => {
    setStabilityMetrics(prev => ({
      ...prev,
      [metric]: value
    }));
  };

  const handleComplete = () => {
    // Validate that all required fields are filled
    const requiredFields = Object.values(stabilityMetrics).every(value => value.trim() !== '');
    
    if (!requiredFields || !careRecommendations.trim()) {
      toast({
        title: "Incomplete Review",
        description: "Please complete all stability metrics and care recommendations.",
        variant: "destructive"
      });
      return;
    }

    setIsCompleted(true);
    
    toast({
      title: "Monthly Stability Review Completed",
      description: `Review completed in ${formatTime(timer)}. Patient stability assessed and documented.`,
    });

    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  const getMetricColor = (value: string) => {
    switch (value) {
      case 'improved': return 'bg-green-50 text-green-700 border-green-200';
      case 'stable': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'declined': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  if (isCompleted) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-6 text-center">
          <CheckCircle className="mx-auto text-green-600 mb-4" size={48} />
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            Monthly Stability Review Completed
          </h3>
          <p className="text-green-700">
            Patient stability assessment has been documented and care plan updated.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="text-blue-600" size={24} />
              <div>
                <CardTitle className="text-xl">Monthly Stability Review</CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Comprehensive assessment of patient's mental health stability over the past month
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <Badge className="bg-blue-50 text-blue-800 border-blue-200 font-mono">
                {formatTime(timer)}
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Stability Metrics Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="text-green-600" size={20} />
            Stability Metrics Assessment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { key: 'mood', label: 'Mood Stability', description: 'Overall mood patterns and emotional regulation' },
            { key: 'medication', label: 'Medication Adherence', description: 'Compliance with prescribed medications' },
            { key: 'sleep', label: 'Sleep Patterns', description: 'Quality and consistency of sleep' },
            { key: 'functionality', label: 'Daily Functioning', description: 'Ability to perform daily activities' },
            { key: 'triggers', label: 'Trigger Management', description: 'Response to identified triggers and stressors' }
          ].map(({ key, label, description }) => (
            <div key={key} className="space-y-2">
              <div>
                <label className="text-sm font-medium text-gray-700">{label}</label>
                <p className="text-xs text-gray-500">{description}</p>
              </div>
              <div className="flex gap-2">
                {['improved', 'stable', 'declined'].map((status) => (
                  <Button
                    key={status}
                    variant={stabilityMetrics[key as keyof typeof stabilityMetrics] === status ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleMetricChange(key, status)}
                    className={
                      stabilityMetrics[key as keyof typeof stabilityMetrics] === status 
                        ? getMetricColor(status) 
                        : ''
                    }
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Care Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="text-amber-600" size={20} />
            Care Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">
              Based on this month's assessment, what are your care recommendations?
            </label>
            <Textarea
              placeholder="Document recommended care plan adjustments, intervention strategies, follow-up requirements, and any concerns that need attention..."
              value={careRecommendations}
              onChange={(e) => setCareRecommendations(e.target.value)}
              className="min-h-24"
            />
          </div>
        </CardContent>
      </Card>

      {/* Summary and Actions */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Progress:</span>
              <Badge variant="outline">
                {Object.values(stabilityMetrics).filter(v => v).length}/5 metrics assessed
              </Badge>
            </div>
            <Button 
              onClick={handleComplete}
              className="bg-[#1E4D36] hover:bg-[#2A6349]"
              disabled={Object.values(stabilityMetrics).some(v => !v) || !careRecommendations.trim()}
            >
              Complete Review
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
