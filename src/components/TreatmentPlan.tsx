
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PatientData } from '@/data/patientData';

interface TreatmentPlanProps {
  patient: PatientData;
}

export const TreatmentPlan: React.FC<TreatmentPlanProps> = ({ patient }) => {
  // Format date helper
  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'No date set';
    
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate progress percentage for goals
  const calculateProgress = (status: string): number => {
    switch (status) {
      case 'Not Started': return 0;
      case 'In Progress': return 50;
      case 'Achieved': return 100;
      default: return 0;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Treatment Plan</CardTitle>
            <CardDescription>Behavioral Health Integration (BHI)</CardDescription>
          </div>
          <Badge className="bg-green-50 text-green-600 border border-green-200">
            BHI G2214/99484
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="goals">
          <TabsList className="mb-4 w-full justify-start">
            <TabsTrigger value="goals">Treatment Goals</TabsTrigger>
            <TabsTrigger value="interventions">Interventions</TabsTrigger>
            <TabsTrigger value="assessments">Assessments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="goals" className="fade-in">
            <div className="space-y-4">
              {patient.treatmentPlan.goals.map((goal, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium">{goal.description}</div>
                    <Badge variant={
                      goal.status === 'Achieved' ? 'default' : 
                      goal.status === 'In Progress' ? 'secondary' : 
                      'outline'
                    }>
                      {goal.status}
                    </Badge>
                  </div>
                  
                  <Progress 
                    value={calculateProgress(goal.status)} 
                    className="h-2 mt-2" 
                  />
                  
                  <div className="mt-2 text-sm text-muted-foreground">
                    Target date: {formatDate(goal.targetDate)}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="interventions" className="fade-in">
            <div className="space-y-4">
              {patient.treatmentPlan.interventions.map((intervention, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="font-medium">{intervention.type}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Frequency: {intervention.frequency}
                  </div>
                  <div className="mt-2 text-sm">{intervention.notes}</div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="assessments" className="fade-in">
            <div className="space-y-4">
              {patient.treatmentPlan.assessments.map((assessment, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between">
                    <div className="font-medium">{assessment.name}</div>
                    <div className="text-sm">{formatDate(assessment.date)}</div>
                  </div>
                  <div className="text-sm font-medium mt-2">
                    Score: {assessment.score}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Administered by: {assessment.administrator}
                  </div>
                  {assessment.notes && (
                    <div className="mt-2 text-sm">{assessment.notes}</div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

