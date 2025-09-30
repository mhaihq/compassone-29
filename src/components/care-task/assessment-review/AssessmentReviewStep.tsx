import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, AlertCircle, FileText, Brain, Activity } from 'lucide-react';

interface AssessmentData {
  patientName: string;
  assessmentType: 'adhd' | 'alzheimer';
  completedDate: string;
  assessor: string;
  results: {
    category: string;
    score: string;
    interpretation: string;
    severity?: string;
  }[];
  clinicalFindings: string;
  recommendations: string[];
}

interface AssessmentReviewStepProps {
  assessmentType: 'adhd' | 'alzheimer';
  onApprove: (notes: string) => void;
  onReject: (reason: string) => void;
}

const mockADHDData: AssessmentData = {
  patientName: "Sarah Martinez",
  assessmentType: "adhd",
  completedDate: "2025-09-28",
  assessor: "Dr. Michael Stevens",
  results: [
    {
      category: "Inattention Symptoms",
      score: "7/9",
      interpretation: "Clinically significant",
      severity: "Moderate to Severe"
    },
    {
      category: "Hyperactivity/Impulsivity Symptoms",
      score: "5/9",
      interpretation: "Above threshold",
      severity: "Moderate"
    },
    {
      category: "Functional Impairment",
      score: "Moderate",
      interpretation: "Significant impact on work and social activities"
    }
  ],
  clinicalFindings: "Patient demonstrates consistent pattern of inattention and moderate hyperactivity/impulsivity across multiple settings. Symptoms present since childhood with documented impact on academic and occupational functioning. No evidence of other conditions that better explain symptoms.",
  recommendations: [
    "Initiate stimulant medication trial (first-line treatment)",
    "Refer to behavioral therapy for organizational skills training",
    "Workplace accommodations assessment",
    "Follow-up in 4 weeks to assess medication response"
  ]
};

const mockAlzheimerData: AssessmentData = {
  patientName: "Robert Thompson",
  assessmentType: "alzheimer",
  completedDate: "2025-09-28",
  assessor: "Dr. Emily Rodriguez",
  results: [
    {
      category: "MMSE Score",
      score: "21/30",
      interpretation: "Mild cognitive impairment",
      severity: "Mild"
    },
    {
      category: "Memory (Delayed Recall)",
      score: "1/3",
      interpretation: "Significantly impaired"
    },
    {
      category: "Executive Function",
      score: "Impaired",
      interpretation: "Difficulty with planning and problem-solving"
    },
    {
      category: "Language",
      score: "Mildly Impaired",
      interpretation: "Word-finding difficulties noted"
    }
  ],
  clinicalFindings: "Patient shows progressive decline in memory and executive function over past 18 months. Family reports increased difficulty with daily activities and financial management. No evidence of delirium or depression. MRI shows age-appropriate atrophy with mild hippocampal volume loss.",
  recommendations: [
    "Initiate cholinesterase inhibitor therapy",
    "Refer to memory care specialist",
    "Discuss advance care planning with family",
    "Home safety assessment",
    "Caregiver support resources and education",
    "Follow-up cognitive assessment in 6 months"
  ]
};

export const AssessmentReviewStep: React.FC<AssessmentReviewStepProps> = ({
  assessmentType,
  onApprove,
  onReject
}) => {
  const [reviewNotes, setReviewNotes] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [showRejectForm, setShowRejectForm] = useState(false);

  const data = assessmentType === 'adhd' ? mockADHDData : mockAlzheimerData;
  const Icon = assessmentType === 'adhd' ? Brain : Activity;

  const handleApprove = () => {
    if (confirmed) {
      onApprove(reviewNotes);
    }
  };

  const handleReject = () => {
    if (rejectionReason.trim()) {
      onReject(rejectionReason);
    }
  };

  if (showRejectForm) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-destructive flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Reject Assessment
          </CardTitle>
          <CardDescription>
            Please provide a reason for rejecting this assessment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Explain why this assessment needs to be redone..."
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            rows={6}
          />
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowRejectForm(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={!rejectionReason.trim()}
            >
              Confirm Rejection
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Icon className="w-6 h-6 text-primary" />
              <div>
                <CardTitle>
                  {assessmentType === 'adhd' ? 'ADHD' : "Alzheimer's"} Assessment Review
                </CardTitle>
                <CardDescription>
                  Review completed assessment for {data.patientName}
                </CardDescription>
              </div>
            </div>
            <Badge variant="secondary">
              Completed {new Date(data.completedDate).toLocaleDateString()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Assessed by:</span>
              <span className="font-medium">{data.assessor}</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Assessment Results
            </h3>
            <div className="space-y-3">
              {data.results.map((result, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{result.category}</span>
                    {result.severity && (
                      <Badge variant={
                        result.severity.includes('Severe') ? 'destructive' :
                        result.severity.includes('Moderate') ? 'default' : 'secondary'
                      }>
                        {result.severity}
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Score: </span>
                    <span className="font-medium">{result.score}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{result.interpretation}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Clinical Findings</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {data.clinicalFindings}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Clinical Recommendations</h3>
            <ul className="space-y-2">
              {data.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 pt-4 border-t">
            <h3 className="font-semibold">Physician Review Notes</h3>
            <Textarea
              placeholder="Add your clinical review notes and any additional observations..."
              value={reviewNotes}
              onChange={(e) => setReviewNotes(e.target.value)}
              rows={4}
            />
          </div>

          <div className="flex items-center space-x-2 p-4 bg-muted rounded-lg">
            <Checkbox
              id="confirm"
              checked={confirmed}
              onCheckedChange={(checked) => setConfirmed(checked as boolean)}
            />
            <label
              htmlFor="confirm"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I confirm that I have reviewed this assessment and approve it for EHR submission
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowRejectForm(true)}
            >
              Reject Assessment
            </Button>
            <Button
              className="flex-1"
              onClick={handleApprove}
              disabled={!confirmed}
            >
              Approve & Continue to EHR
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
