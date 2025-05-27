
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, Calendar, User, FileText, AlertCircle, Clock, Target } from 'lucide-react';

interface MonthlyStabilityReviewContentProps {
  taskId: string;
  onComplete: () => void;
}

export const MonthlyStabilityReviewContent: React.FC<MonthlyStabilityReviewContentProps> = ({ taskId, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAssessment, setSelectedAssessment] = useState('');
  const [stabilityRating, setStabilityRating] = useState('');
  const [reviewNotes, setReviewNotes] = useState('');

  const steps = [
    { id: 1, title: 'Stability Assessment', icon: Target },
    { id: 2, title: 'Care Plan Review', icon: FileText },
    { id: 3, title: 'Documentation', icon: CheckCircle }
  ];

  const assessmentTools = [
    { value: 'phq9', label: 'PHQ-9 (Depression)', description: 'Depression severity assessment' },
    { value: 'gad7', label: 'GAD-7 (Anxiety)', description: 'Anxiety disorder screening' },
    { value: 'mood-tracker', label: 'Mood Stability Tracker', description: 'General mood assessment' },
    { value: 'medication-review', label: 'Medication Adherence', description: 'Treatment compliance check' }
  ];

  const stabilityOptions = [
    { value: 'stable', label: 'Stable', color: 'green' },
    { value: 'improving', label: 'Improving', color: 'blue' },
    { value: 'declining', label: 'Declining', color: 'yellow' },
    { value: 'unstable', label: 'Unstable', color: 'red' }
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleComplete = () => {
    // Here you would typically save the review data
    console.log('Monthly Stability Review completed', {
      taskId,
      assessment: selectedAssessment,
      stability: stabilityRating,
      notes: reviewNotes
    });
    onComplete();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-purple-900">Monthly Stability Review</h2>
            <p className="text-sm text-purple-700">Routine mental health stability assessment</p>
          </div>
          <Badge className="bg-purple-100 text-purple-800 border-purple-200">
            BHI Compliance
          </Badge>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              currentStep >= step.id ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              {currentStep > step.id ? (
                <CheckCircle size={16} />
              ) : (
                <step.icon size={16} />
              )}
            </div>
            <span className={`ml-2 text-sm ${
              currentStep >= step.id ? 'text-purple-600 font-medium' : 'text-gray-500'
            }`}>
              {step.title}
            </span>
            {index < steps.length - 1 && (
              <div className={`mx-4 h-px w-12 ${
                currentStep > step.id ? 'bg-purple-600' : 'bg-gray-300'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card>
        <CardContent className="p-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Mental Health Stability Assessment</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Select the appropriate assessment tool for this routine review.
                </p>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Assessment Tool</label>
                <Select value={selectedAssessment} onValueChange={setSelectedAssessment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose assessment tool" />
                  </SelectTrigger>
                  <SelectContent>
                    {assessmentTools.map((tool) => (
                      <SelectItem key={tool.value} value={tool.value}>
                        <div>
                          <div className="font-medium">{tool.label}</div>
                          <div className="text-xs text-gray-500">{tool.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Current Stability Level</label>
                <Select value={stabilityRating} onValueChange={setStabilityRating}>
                  <SelectTrigger>
                    <SelectValue placeholder="Rate current stability" />
                  </SelectTrigger>
                  <SelectContent>
                    {stabilityOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full bg-${option.color}-400 mr-2`} />
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="text-blue-600 mr-2 mt-0.5" size={16} />
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">Review Guidelines</h4>
                    <ul className="text-xs text-blue-800 mt-1 space-y-1">
                      <li>• Assess symptom changes since last review</li>
                      <li>• Review medication adherence and side effects</li>
                      <li>• Check for new stressors or triggers</li>
                      <li>• Evaluate support system effectiveness</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Care Plan Review</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Review and update the current care plan based on assessment findings.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-gray-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center">
                      <User className="mr-2" size={16} />
                      Current Interventions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs space-y-2">
                    <div>• Weekly therapy sessions</div>
                    <div>• Medication: Sertraline 50mg daily</div>
                    <div>• Mindfulness exercises</div>
                    <div>• Family support group</div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center">
                      <Target className="mr-2" size={16} />
                      Treatment Goals
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs space-y-2">
                    <div>• Maintain mood stability</div>
                    <div>• Improve sleep quality</div>
                    <div>• Increase social activities</div>
                    <div>• Develop coping strategies</div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Care Plan Updates</label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-md text-sm"
                  rows={4}
                  placeholder="Document any needed updates to the care plan..."
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <Calendar className="text-yellow-600 mr-2 mt-0.5" size={16} />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-900">Next Review</h4>
                    <p className="text-xs text-yellow-800 mt-1">
                      Schedule next monthly stability review for June 25, 2025
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Review Documentation</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Complete the documentation for BHI billing compliance.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-green-900">Time Allocation</h4>
                      <p className="text-xs text-green-800">15 minutes toward BHI requirement</p>
                    </div>
                    <div className="flex items-center text-green-600">
                      <Clock size={16} className="mr-1" />
                      <span className="text-sm font-medium">15 min</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">Review Summary</h4>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div>• Assessment Tool: {selectedAssessment || 'Not selected'}</div>
                    <div>• Stability Rating: {stabilityRating || 'Not rated'}</div>
                    <div>• Care Plan Updates: {reviewNotes ? 'Documented' : 'None'}</div>
                    <div>• Next Review: June 25, 2025</div>
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <FileText className="text-purple-600 mr-2 mt-0.5" size={16} />
                    <div>
                      <h4 className="text-sm font-medium text-purple-900">BHI Compliance Note</h4>
                      <p className="text-xs text-purple-800 mt-1">
                        This monthly stability review satisfies BHI care management requirements for ongoing behavioral health integration services.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        
        {currentStep < 3 ? (
          <Button
            onClick={handleNext}
            disabled={currentStep === 1 && (!selectedAssessment || !stabilityRating)}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Next Step
          </Button>
        ) : (
          <Button
            onClick={handleComplete}
            className="bg-green-600 hover:bg-green-700"
          >
            Complete Review
          </Button>
        )}
      </div>
    </div>
  );
};
