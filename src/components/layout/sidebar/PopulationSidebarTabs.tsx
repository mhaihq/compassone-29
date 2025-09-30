
import React from 'react';
import { ListChecks, Users, Megaphone, FileText, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PopulationSidebarTabsProps {
  activeTab: 'taskQueue' | 'patients' | 'campaigns' | 'billing' | 'insights';
  setActiveTab: (tab: 'taskQueue' | 'patients' | 'campaigns' | 'billing' | 'insights') => void;
}

export const PopulationSidebarTabs: React.FC<PopulationSidebarTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="h-16 py-2 flex items-center z-10 bg-white border-b border-gray-200">
      <div className="flex gap-2 w-full overflow-x-auto medical-scrollbar">
        <Button 
          variant={activeTab === 'taskQueue' ? 'default' : 'outline'} 
          size="sm"
          className={`px-3 py-2 whitespace-nowrap ${activeTab === 'taskQueue' ? 'bg-[#1a1a1a] hover:bg-[#333333]' : ''}`}
          onClick={() => setActiveTab('taskQueue')}
        >
          <ListChecks size={16} className="mr-1" />
          <span>Task Queue</span>
        </Button>
        <Button 
          variant={activeTab === 'patients' ? 'default' : 'outline'} 
          size="sm"
          className={`px-3 py-2 whitespace-nowrap ${activeTab === 'patients' ? 'bg-[#1a1a1a] hover:bg-[#333333]' : ''}`}
          onClick={() => setActiveTab('patients')}
        >
          <Users size={16} className="mr-1" />
          <span>Patients</span>
        </Button>
        <Button 
          variant={activeTab === 'campaigns' ? 'default' : 'outline'} 
          size="sm"
          className={`px-3 py-2 whitespace-nowrap ${activeTab === 'campaigns' ? 'bg-[#1a1a1a] hover:bg-[#333333]' : ''}`}
          onClick={() => setActiveTab('campaigns')}
        >
          <Megaphone size={16} className="mr-1" />
          <span>Campaigns</span>
        </Button>
        <Button 
          variant={activeTab === 'billing' ? 'default' : 'outline'} 
          size="sm"
          className={`px-3 py-2 whitespace-nowrap ${activeTab === 'billing' ? 'bg-[#1a1a1a] hover:bg-[#333333]' : ''}`}
          onClick={() => setActiveTab('billing')}
        >
          <FileText size={16} className="mr-1" />
          <span>Billing</span>
        </Button>
        <Button 
          variant={activeTab === 'insights' ? 'default' : 'outline'} 
          size="sm"
          className={`px-3 py-2 whitespace-nowrap ${activeTab === 'insights' ? 'bg-[#1a1a1a] hover:bg-[#333333]' : ''}`}
          onClick={() => setActiveTab('insights')}
        >
          <BarChart3 size={16} className="mr-1" />
          <span>Insights</span>
        </Button>
      </div>
    </div>
  );
};
