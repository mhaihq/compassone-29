import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Phone, CheckCircle, XCircle, Clock, FileText } from 'lucide-react';

type EnrollmentStatus = 'eligible' | 'outreach-sent' | 'consent-pending' | 'enrolled' | 'declined';

interface EnrollmentPatient {
  id: string;
  name: string;
  age: number;
  conditions: string[];
  status: EnrollmentStatus;
  lastContact: string | null;
  consentDate: string | null;
  outreachAttempts: number;
}

const mockPatients: EnrollmentPatient[] = [
  {
    id: 'P200001',
    name: 'Dorothy Nguyen',
    age: 71,
    conditions: ['Type 2 Diabetes', 'Hypertension'],
    status: 'eligible',
    lastContact: null,
    consentDate: null,
    outreachAttempts: 0,
  },
  {
    id: 'P200002',
    name: 'Frank Delgado',
    age: 64,
    conditions: ['COPD', 'Depression'],
    status: 'outreach-sent',
    lastContact: '2026-04-18',
    consentDate: null,
    outreachAttempts: 1,
  },
  {
    id: 'P200003',
    name: 'Helen Morris',
    age: 78,
    conditions: ['CHF', 'CKD Stage 3'],
    status: 'consent-pending',
    lastContact: '2026-04-20',
    consentDate: null,
    outreachAttempts: 2,
  },
  {
    id: 'P200004',
    name: 'Matteo Grassi',
    age: 45,
    conditions: ['Major Depression', 'Hypertension'],
    status: 'enrolled',
    lastContact: '2026-04-22',
    consentDate: '2026-04-10',
    outreachAttempts: 1,
  },
  {
    id: 'P200005',
    name: 'James Thompson',
    age: 38,
    conditions: ['Generalized Anxiety Disorder'],
    status: 'enrolled',
    lastContact: '2026-04-23',
    consentDate: '2026-04-12',
    outreachAttempts: 1,
  },
  {
    id: 'P200006',
    name: 'George Patel',
    age: 69,
    conditions: ['Type 2 Diabetes', 'CAD'],
    status: 'declined',
    lastContact: '2026-04-15',
    consentDate: null,
    outreachAttempts: 3,
  },
];

const STATUS_CONFIG: Record<EnrollmentStatus, { label: string; className: string }> = {
  eligible: { label: 'Eligible', className: 'bg-blue-100 text-blue-700 border-blue-200' },
  'outreach-sent': { label: 'Outreach Sent', className: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  'consent-pending': { label: 'Consent Pending', className: 'bg-orange-100 text-orange-700 border-orange-200' },
  enrolled: { label: 'Enrolled', className: 'bg-green-100 text-green-700 border-green-200' },
  declined: { label: 'Declined', className: 'bg-gray-100 text-gray-500 border-gray-200' },
};

const FILTERS: { value: EnrollmentStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'eligible', label: 'Eligible' },
  { value: 'outreach-sent', label: 'Outreach Sent' },
  { value: 'consent-pending', label: 'Consent Pending' },
  { value: 'enrolled', label: 'Enrolled' },
  { value: 'declined', label: 'Declined' },
];

export function EnrollmentContent() {
  const [patients] = useState<EnrollmentPatient[]>(mockPatients);
  const [filter, setFilter] = useState<EnrollmentStatus | 'all'>('all');

  const filtered = filter === 'all' ? patients : patients.filter(p => p.status === filter);

  const counts = {
    eligible: patients.filter(p => p.status === 'eligible').length,
    enrolled: patients.filter(p => p.status === 'enrolled').length,
    pending: patients.filter(p => p.status === 'consent-pending' || p.status === 'outreach-sent').length,
    declined: patients.filter(p => p.status === 'declined').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Enrollment</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Track eligible patients through outreach, consent, and CCM enrollment.
        </p>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Eligible', value: counts.eligible, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'In Progress', value: counts.pending, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Enrolled', value: counts.enrolled, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Declined', value: counts.declined, icon: XCircle, color: 'text-gray-500', bg: 'bg-gray-100' },
        ].map(s => (
          <Card key={s.label} className="shadow-sm">
            <CardContent className="p-3 flex items-center gap-3">
              <div className={`p-2 rounded-lg ${s.bg}`}>
                <s.icon className={`h-4 w-4 ${s.color}`} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-lg font-bold text-foreground">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map(f => (
          <Button
            key={f.value}
            variant={filter === f.value ? 'default' : 'outline'}
            size="sm"
            className="text-xs"
            onClick={() => setFilter(f.value)}
          >
            {f.label}
            <Badge variant="secondary" className="ml-1.5 text-xs">
              {f.value === 'all' ? patients.length : patients.filter(p => p.status === f.value).length}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Patient list */}
      <div className="space-y-3">
        {filtered.map(patient => {
          const cfg = STATUS_CONFIG[patient.status];
          return (
            <Card key={patient.id} className="shadow-sm">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-sm text-foreground">{patient.name}</span>
                      <span className="text-xs text-muted-foreground">{patient.age}y · {patient.id}</span>
                      <Badge className={`text-xs ${cfg.className}`}>{cfg.label}</Badge>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {patient.conditions.map(c => (
                        <Badge key={c} variant="outline" className="text-xs">{c}</Badge>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-muted-foreground">
                      {patient.lastContact && (
                        <span>Last contact: {new Date(patient.lastContact).toLocaleDateString()}</span>
                      )}
                      {patient.outreachAttempts > 0 && (
                        <span>{patient.outreachAttempts} outreach attempt{patient.outreachAttempts > 1 ? 's' : ''}</span>
                      )}
                      {patient.consentDate && (
                        <span className="text-green-600">Consent: {new Date(patient.consentDate).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 flex-shrink-0">
                    {patient.status === 'eligible' && (
                      <Button size="sm" className="text-xs">
                        <Phone size={11} className="mr-1" />
                        Start Outreach
                      </Button>
                    )}
                    {patient.status === 'outreach-sent' && (
                      <Button size="sm" className="text-xs">
                        <Phone size={11} className="mr-1" />
                        Follow Up
                      </Button>
                    )}
                    {patient.status === 'consent-pending' && (
                      <Button size="sm" className="text-xs">
                        <FileText size={11} className="mr-1" />
                        Record Consent
                      </Button>
                    )}
                    {patient.status === 'enrolled' && (
                      <Badge className="text-xs bg-green-100 text-green-700 border-green-200">
                        <CheckCircle size={10} className="mr-1" />
                        Active
                      </Badge>
                    )}
                    {patient.status === 'declined' && (
                      <span className="text-xs text-muted-foreground">No further action</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
