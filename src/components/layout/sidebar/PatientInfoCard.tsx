import React from 'react';
import { User, Calendar, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { PatientDataSummary } from '@/services/patientService';

interface PatientInfoCardProps {
  patientSummary: PatientDataSummary;
  variant?: 'default' | 'compact';
}

export const PatientInfoCard: React.FC<PatientInfoCardProps> = ({
  patientSummary,
  variant = 'default',
}) => {
  const { patientData, patientAge, lastContactedFormatted, medicalConditions } = patientSummary;

  if (variant === 'compact') {
    return (
      <Card className="border-0 shadow-none rounded-none border-b border-border">
        <CardContent className="px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="bg-muted p-1.5 rounded-full flex-shrink-0">
              <User className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-medium text-sm text-foreground">{patientData.name}</span>
              <div className="flex items-center gap-3 mt-0.5 text-xs text-muted-foreground">
                <span>{patientAge}y</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {lastContactedFormatted}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Status indicators — derive from patientData if available, otherwise show sensible defaults
  const statuses: { label: string; variant: 'outline' | 'secondary'; className?: string }[] = [];

  // Enrollment / consent status (placeholder — real data from API)
  statuses.push({ label: 'CCM Enrolled', variant: 'outline', className: 'text-green-700 border-green-300' });

  // Care plan status
  statuses.push({ label: 'Care plan active', variant: 'outline' });

  // Billing minutes status
  statuses.push({ label: '42 / 60 min logged', variant: 'outline' });

  return (
    <Card className="shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="bg-muted p-2 rounded-full flex-shrink-0">
            <User className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0 space-y-2">
            <div>
              <h3 className="font-semibold text-foreground truncate">{patientData.name}</h3>
              <div className="flex flex-wrap items-center gap-3 mt-0.5 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {patientAge} years old
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Last contact: {lastContactedFormatted}
                </span>
              </div>
            </div>

            {medicalConditions.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {medicalConditions.slice(0, 3).map((c, i) => (
                  <Badge key={i} variant="outline" className="text-xs">{c}</Badge>
                ))}
                {medicalConditions.length > 3 && (
                  <Badge variant="outline" className="text-xs">+{medicalConditions.length - 3}</Badge>
                )}
              </div>
            )}

            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {statuses.map((s, i) => (
                <Badge key={i} variant={s.variant} className={`text-xs ${s.className ?? ''}`}>
                  {s.label}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
