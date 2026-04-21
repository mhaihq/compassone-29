import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Search, Filter } from 'lucide-react';
import { patientsData } from '@/data/patientsData';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent } from '@/components/ui/card';
import { StatusPill } from '@/components/ui/status-dot';

interface PatientsListContentProps {
  onOpenPatient: (patientId: string) => void;
}

export const PatientsListContent: React.FC<PatientsListContentProps> = ({ onOpenPatient }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');

  const activePatients = patientsData.filter(p => p.status === 'Active');

  const filteredPatients = activePatients.filter(patient => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.primaryDiagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === 'all' || patient.severity === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  const getSeverityTone = (severity: string): 'red' | 'orange' | 'green' | 'muted' => {
    switch (severity) {
      case 'Severe': return 'red';
      case 'Moderate': return 'orange';
      case 'Mild': return 'green';
      default: return 'muted';
    }
  };

  const calculateAge = (dob: string) => {
    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    if (
      today.getMonth() < birth.getMonth() ||
      (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())
    ) age--;
    return age;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Patient Population</h2>
        <Badge variant="outline" className="text-xs">{filteredPatients.length} patients</Badge>
      </div>

      {/* Risk counters */}
      <div className="grid grid-cols-3 gap-2 p-3 bg-card rounded-lg border border-border">
        {[
          { label: 'High Risk', tone: 'red' as const, count: activePatients.filter(p => p.severity === 'Severe').length },
          { label: 'Medium Risk', tone: 'orange' as const, count: activePatients.filter(p => p.severity === 'Moderate').length },
          { label: 'Low Risk', tone: 'green' as const, count: activePatients.filter(p => p.severity === 'Mild').length },
        ].map(r => (
          <div key={r.label} className="flex items-center justify-center gap-2">
            <span className={`h-1.5 w-1.5 rounded-full ${r.tone === 'red' ? 'bg-red-500' : r.tone === 'orange' ? 'bg-orange-500' : 'bg-green-500'}`} />
            <span className="text-xs text-muted-foreground">{r.label}</span>
            <span className="text-sm font-medium text-foreground tabular-nums">{r.count}</span>
          </div>
        ))}
      </div>

      {/* Search + filter */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search patients..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-8 h-9 text-sm"
          />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 px-3">
              <Filter size={14} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2" align="end">
            <div className="space-y-2">
              <p className="text-xs font-medium">Filter by Severity</p>
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="All Severities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="Severe">High Risk</SelectItem>
                  <SelectItem value="Moderate">Medium Risk</SelectItem>
                  <SelectItem value="Mild">Low Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Mobile: card list — hidden on md+ */}
      <div className="space-y-2 md:hidden">
        {filteredPatients.map(patient => (
          <Card key={patient.id} className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-sm text-foreground">{patient.name}</span>
                    <StatusPill tone={getSeverityTone(patient.severity)}>{patient.severity}</StatusPill>
                  </div>
                  <p className="text-xs text-muted-foreground">{patient.id} · {calculateAge(patient.dateOfBirth)}y · {patient.gender}</p>
                  <Badge variant="outline" className="text-xs">{patient.primaryDiagnosis}</Badge>
                  <p className="text-xs text-muted-foreground">
                    Last visit: {new Date(patient.lastVisit).toLocaleDateString()}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-9 px-3 flex-shrink-0"
                  onClick={() => onOpenPatient(patient.id)}
                >
                  <Eye size={13} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop: table — hidden on mobile */}
      <div className="hidden md:block border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Patient</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Age</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Severity</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Last Visit</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map(patient => (
                <tr key={patient.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-sm text-foreground">{patient.name}</p>
                    <p className="text-xs text-muted-foreground">{patient.id}</p>
                    <Badge variant="outline" className="text-xs mt-1">{patient.primaryDiagnosis}</Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {calculateAge(patient.dateOfBirth)}y · {patient.gender}
                  </td>
                  <td className="px-4 py-3">
                    <StatusPill tone={getSeverityTone(patient.severity)}>{patient.severity}</StatusPill>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    <p>{new Date(patient.lastVisit).toLocaleDateString()}</p>
                    {patient.nextAppointment && (
                      <p className="text-primary">Next: {new Date(patient.nextAppointment).toLocaleDateString()}</p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 px-3 text-xs"
                      onClick={() => onOpenPatient(patient.id)}
                    >
                      <Eye size={12} className="mr-1" />
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredPatients.length === 0 && (
        <div className="text-center py-8 text-muted-foreground text-sm">
          No patients found matching your search.
        </div>
      )}
    </div>
  );
};
