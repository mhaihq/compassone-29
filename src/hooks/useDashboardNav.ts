import { useState } from 'react';
import { populationTasksData } from '@/data/populationTasksData';
import { patientData } from '@/data/patientData';
import { getPatientDataSummary } from '@/services/patientService';

export type DashboardTab = 'taskQueue' | 'patients' | 'campaigns' | 'billing';

// TODO: Replace with real API call
export function useDashboardNav() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('taskQueue');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

  const isViewingTask = selectedTaskId !== null;
  const isViewingPatient = selectedPatientId !== null;
  const isViewingContent = isViewingTask || isViewingPatient;

  const selectedTask = selectedTaskId
    ? populationTasksData.find(t => t.id === selectedTaskId) ?? null
    : null;

  const patientSummary = getPatientDataSummary(patientData);

  const openTask = (taskId: string) => setSelectedTaskId(taskId);
  const openPatient = (patientId: string) => setSelectedPatientId(patientId);
  const closeTask = () => setSelectedTaskId(null);
  const closePatient = () => setSelectedPatientId(null);

  const changeTab = (tab: DashboardTab) => {
    setActiveTab(tab);
    setSelectedTaskId(null);
    setSelectedPatientId(null);
  };

  return {
    activeTab,
    selectedTaskId,
    selectedPatientId,
    selectedTask,
    isViewingTask,
    isViewingPatient,
    isViewingContent,
    patientSummary,
    openTask,
    openPatient,
    closeTask,
    closePatient,
    changeTab,
  };
}
