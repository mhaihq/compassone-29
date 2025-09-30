
import React, { useState, useEffect } from 'react';
import { BadgeAlert, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { patientData } from '@/data/patientData';
import { ModifiedOverviewTab } from './sidebar/ModifiedOverviewTab';
import { SidebarTabs } from './sidebar/SidebarTabs';
import { AgentsCareLogContents } from './sidebar/AgentsCareLogContents';
import { ProtocolsContent } from './sidebar/ProtocolsContent';
import { BillingContent } from './sidebar/BillingContent';
import { PatientInfoCard } from './sidebar/PatientInfoCard';
import { getPatientDataSummary } from '@/services/patientService';

interface HanaSidebarProps {
  autoOpen?: boolean;
}

export const HanaSidebar: React.FC<HanaSidebarProps> = ({ autoOpen = false }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'careLog' | 'protocols' | 'billing'>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Auto-open sidebar when autoOpen prop is true
  useEffect(() => {
    if (autoOpen) {
      setIsSidebarOpen(true);
    }
  }, [autoOpen]);
  
  // Get consolidated patient data summary
  const patientSummary = getPatientDataSummary(patientData);

  // Handler to switch to protocols tab when needed
  const handleProtocolClick = () => {
    setActiveTab('protocols');
  };
  
  return (
    <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
      <SheetTrigger asChild>
        <button 
          className="flex items-center justify-center w-10 h-10 bg-[#1a1a1a] rounded-full shadow-lg hover:bg-[#333333] transition-colors pulse-animation fixed right-4 top-20 z-50"
          aria-label="Open Hana sidebar"
        >
          <img 
            src="/lovable-uploads/8bd12f77-f027-47b9-a41c-a780b6ec54d0.png" 
            alt="Hana Clinic Logo" 
            className="h-8 w-8 object-contain"
          />
        </button>
      </SheetTrigger>
      
      <SheetContent className="p-0 max-w-2/3 w-2/3 border-l border-gray-200 overflow-y-auto bg-[#F1F1F1]">
        <div className="flex flex-col h-full">
          {/* Sidebar Header with modern minimal design */}
          <div className="relative bg-white shadow-sm">
            <div className="relative z-10 flex items-center justify-between p-6">
              <div className="flex items-center gap-3">
                <img 
                  src="/lovable-uploads/8bd12f77-f027-47b9-a41c-a780b6ec54d0.png" 
                  alt="Hana Clinic Logo" 
                  className="h-14 w-auto"
                />
                <div>
                  <h2 className="text-2xl font-bold text-[#1a1a1a]">Hana Compass</h2>
                  <p className="text-sm text-[#333333]">Patient Care Assistant</p>
                </div>
              </div>
              <button 
                className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100/50"
                onClick={() => setIsSidebarOpen(false)}
                aria-label="Close sidebar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {/* Patient Quick Information Card */}
          <PatientInfoCard patientSummary={patientSummary} />
          
          {/* Navigation Tabs - With sticky positioning */}
          <SidebarTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          
          {/* Tab Content */}
          <div className="flex-grow overflow-y-auto p-4">
            {activeTab === 'overview' && <ModifiedOverviewTab onTaskClick={handleProtocolClick} />}
            {activeTab === 'careLog' && <AgentsCareLogContents type="careLog" />}
            {activeTab === 'protocols' && <ProtocolsContent />}
            {activeTab === 'billing' && <BillingContent />}
          </div>
          
          {/* Footer with minimal design */}
          <div className="bg-white shadow-sm p-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Hana Compass • Patient: {patientSummary.patientData.name} ({patientSummary.patientData.gender}, {patientSummary.patientAge}) • Last updated: 4 days ago
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HanaSidebar;
