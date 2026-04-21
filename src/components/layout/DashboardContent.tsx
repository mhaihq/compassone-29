import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TaskQueueContent } from '@/components/layout/sidebar/population/TaskQueueContent';
import { PatientsListContent } from '@/components/layout/sidebar/population/PatientsListContent';
import { EnrollmentContent } from '@/components/layout/sidebar/population/EnrollmentContent';
import { BillingContent } from '@/components/layout/sidebar/population/BillingContent';
import { CareTaskContent } from '@/components/care-task/CareTaskContent';
import { PopulationManagement } from '@/pages/population/PopulationManagement';
import { PatientDetailContent } from '@/components/layout/sidebar/population/PatientDetailContent';
import { PatientInfoCard } from '@/components/layout/sidebar/PatientInfoCard';
import { IntakeDrawer } from '@/components/tasks/IntakeDrawer';
import { CoordinationDrawer } from '@/components/tasks/CoordinationDrawer';
import { NAV_ITEMS } from '@/components/layout/DashboardNav';
import type { useDashboardNav } from '@/hooks/useDashboardNav';

type Nav = ReturnType<typeof useDashboardNav>;

interface DashboardContentProps {
  nav: Nav;
}

export function DashboardContent({ nav }: DashboardContentProps) {
  const {
    activeTab, selectedTaskId, selectedPatientId,
    selectedTask, isViewingTask, isViewingPatient,
    isViewingContent, patientSummary,
    openTask, openPatient, closeTask, closePatient,
  } = nav;

  const contentTitle = isViewingTask
    ? 'Care Task Details'
    : isViewingPatient
    ? 'Patient Details'
    : NAV_ITEMS.find(n => n.id === activeTab)?.label ?? 'Dashboard';

  return (
    <main className="flex-1 flex flex-col overflow-hidden bg-background">
      {/* Breadcrumb / content header */}
      <div className="flex-shrink-0 bg-card border-b border-border px-6 h-12 flex items-center gap-2">
        {isViewingContent && (
          <Button
            variant="ghost"
            size="sm"
            onClick={isViewingTask ? closeTask : closePatient}
            className="p-1.5 h-auto -ml-1.5"
          >
            <ArrowLeft size={15} />
          </Button>
        )}
        <h1 className="font-semibold text-foreground text-sm">{contentTitle}</h1>
      </div>

      {isViewingTask && (
        <div className="flex-shrink-0 border-b border-border">
          <PatientInfoCard patientSummary={patientSummary} variant="compact" />
        </div>
      )}

      <div className="flex-1 overflow-y-auto pb-16 md:pb-0">
        {isViewingTask && selectedTask ? (
          selectedTask.module === 'Monitoring' ? (
            <div className="p-6">
              <CareTaskContent taskId={selectedTaskId!} onComplete={closeTask} />
            </div>
          ) : selectedTask.module === 'Intake' ? (
            <IntakeDrawer task={selectedTask} onClose={closeTask} />
          ) : selectedTask.module === 'Coordination' ? (
            <CoordinationDrawer task={selectedTask} onClose={closeTask} />
          ) : null
        ) : isViewingPatient && selectedPatientId ? (
          <div className="p-6">
            <PatientDetailContent patientId={selectedPatientId} />
          </div>
        ) : (
          <div className="p-6">
            {activeTab === 'taskQueue' && <TaskQueueContent onOpenTask={openTask} />}
            {activeTab === 'patients' && <PatientsListContent onOpenPatient={openPatient} />}
            {activeTab === 'enrollment' && <EnrollmentContent />}
            {activeTab === 'billing' && <BillingContent />}
            {activeTab === 'population' && <PopulationManagement />}
          </div>
        )}
      </div>
    </main>
  );
}
