
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PatientData } from '@/data/patientData';
import { providers } from '@/data/providerData';
import { Calendar } from "lucide-react";

interface ProviderNotesProps {
  patient: PatientData;
}

export const ProviderNotes: React.FC<ProviderNotesProps> = ({ patient }) => {
  // Format date helper
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get provider color for visual distinction
  const getProviderColor = (providerName: string) => {
    const colorMap: Record<string, string> = {
      "Dr. Maya Patel": "bg-clinical-blue",
      "Dr. Sarah Chen": "bg-clinical-green",
      "Dr. Michael Thomas": "bg-clinical-purple",
      "Dr. Elena Rodriguez": "bg-clinical-orange"
    };
    return colorMap[providerName] || "bg-muted";
  };

  // Get indicator color for mood rating
  const getMoodColor = (rating: number) => {
    if (rating <= 3) return "bg-severity-high";
    if (rating <= 6) return "bg-severity-medium";
    return "bg-severity-low";
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Session Notes</CardTitle>
            <CardDescription>Provider documentation from therapy sessions</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[500px] overflow-y-auto medical-scrollbar pr-2">
          {patient.sessionNotes.map((session) => (
            <div key={session.id} className="p-4 border rounded-lg relative">
              {/* Colored indicator for the provider */}
              <div className={`absolute top-0 left-0 w-1.5 h-full ${getProviderColor(session.provider)} rounded-l-lg`}></div>
              
              <div className="flex justify-between items-start pl-2">
                <div>
                  <div className="font-medium">{session.provider}</div>
                  <div className="flex items-center text-sm text-muted-foreground gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{formatDate(session.date)}</span>
                    <span>•</span>
                    <span>{session.duration}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <div className={`w-3 h-3 rounded-full ${getMoodColor(session.moodRating)}`}></div>
                  <span className="text-sm">Mood: {session.moodRating}/10</span>
                </div>
              </div>
              
              <div className="mt-3 pl-2 text-sm">{session.notes}</div>
              
              {session.interventionsUsed && session.interventionsUsed.length > 0 && (
                <div className="mt-3 pl-2">
                  <div className="flex flex-wrap gap-2">
                    {session.interventionsUsed.map((intervention, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {intervention}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {session.medicationChanges && (
                <div className="mt-3 pl-2 p-2 bg-muted/40 rounded text-sm">
                  <div className="font-medium">Medication Change:</div>
                  <div>{session.medicationChanges.medication} - {session.medicationChanges.change}</div>
                  <div className="text-muted-foreground">Reason: {session.medicationChanges.reason}</div>
                </div>
              )}
              
              {session.nextAppointment && (
                <div className="mt-3 pl-2 text-sm flex items-center gap-1 text-muted-foreground">
                  <span>Next appointment:</span>
                  <span className="font-medium">{formatDate(session.nextAppointment)}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

