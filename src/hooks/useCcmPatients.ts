import { useState, useCallback } from 'react';
import type { Patient, MonthBillingMode } from '@/types/patient';
import { patientsCcmData } from '@/data/patientsCcmData';

// TODO: Replace with real API call
export function useCcmPatients() {
  const [patients, setPatients] = useState<Patient[]>(patientsCcmData);
  const [isLoading] = useState(false);

  const updatePatient = useCallback((patientId: string, updates: Partial<Patient>) => {
    setPatients(prev =>
      prev.map(p => (p.id === patientId ? { ...p, ...updates } : p))
    );
  }, []);

  // Guard: setting APCM clears CCM enrollment and vice versa (CMS mutual exclusion)
  const setMonthBillingMode = useCallback((patientId: string, mode: MonthBillingMode) => {
    setPatients(prev =>
      prev.map(p => {
        if (p.id !== patientId) return p;
        if (mode === 'APCM') return { ...p, monthBillingMode: 'APCM', enrolledInCCM: false };
        if (mode === 'CCM') return { ...p, monthBillingMode: 'CCM', enrolledInAPCM: false };
        return { ...p, monthBillingMode: null };
      })
    );
  }, []);

  const getPatient = useCallback(
    (patientId: string) => patients.find(p => p.id === patientId) ?? null,
    [patients]
  );

  return { patients, isLoading, updatePatient, setMonthBillingMode, getPatient };
}
