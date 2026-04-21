
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PatientData } from '@/data/patientData';
import { Brain, Calendar, Heart, Pill } from "lucide-react";

interface MedicalHistoryProps {
  patient: PatientData;
}

export const MedicalHistory: React.FC<MedicalHistoryProps> = ({ patient }) => {
  // Format date helper
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Medical History</CardTitle>
            <CardDescription>Past conditions, medications and health history</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="conditions">
          <TabsList className="mb-4 w-full justify-start">
            <TabsTrigger value="conditions" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span>Conditions</span>
            </TabsTrigger>
            <TabsTrigger value="medications" className="flex items-center gap-2">
              <Pill className="h-4 w-4" />
              <span>Medications</span>
            </TabsTrigger>
            <TabsTrigger value="family" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span>Family History</span>
            </TabsTrigger>
            <TabsTrigger value="allergies" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Allergies</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="conditions" className="fade-in">
            <div className="space-y-4">
              {patient.medicalHistory.pastConditions.map((condition, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium">{condition.condition}</div>
                    <Badge variant={condition.status === "Active" ? "default" : "outline"}>
                      {condition.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Diagnosed on {formatDate(condition.diagnosedDate)}
                  </div>
                  <div className="mt-2 text-sm">{condition.notes}</div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="medications" className="fade-in">
            <div className="space-y-4">
              {patient.medicalHistory.medications.map((medication, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="font-medium">{medication.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {medication.dosage}, {medication.frequency}
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <div>Started: {formatDate(medication.startDate)}</div>
                    <div>Prescribed by: {medication.prescribedBy}</div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="family" className="fade-in">
            <div className="space-y-4">
              {patient.medicalHistory.familyHistory.map((item, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="font-medium">{item.condition}</div>
                  <div className="text-sm text-muted-foreground">
                    Relation: {item.relation}
                  </div>
                  <div className="mt-2 text-sm">{item.notes}</div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="allergies" className="fade-in">
            <div className="space-y-4">
              {patient.medicalHistory.allergies.map((allergy, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="font-medium">{allergy.allergen}</div>
                  <div className="text-sm text-muted-foreground">
                    Reaction: {allergy.reaction}
                  </div>
                  <div className="mt-2 text-sm">
                    <Badge variant="outline" className={
                      allergy.severity === 'Severe' ? 'border-severity-high text-severity-high' :
                      allergy.severity === 'Moderate' ? 'border-severity-medium text-severity-medium' :
                      'border-severity-low text-severity-low'
                    }>
                      {allergy.severity} Severity
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

