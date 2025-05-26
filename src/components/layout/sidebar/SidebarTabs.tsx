
import React from 'react';
import { Brain, Calendar, FileText, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarTabsProps {
  activeTab: 'overview' | 'careLog' | 'protocols' | 'billing';
  setActiveTab: (tab: 'overview' | 'careLog' | 'protocols' | 'billing') => void;
}

export const SidebarTabs: React.FC<SidebarTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="h-16 py-2 flex items-center z-10 bg-white border-b border-gray-200">
      <div className="flex gap-3 px-4 overflow-hidden">
        <Button 
          variant={activeTab === 'overview' ? 'default' : 'outline'} 
          size="sm"
          className={`px-4 py-2 ${activeTab === 'overview' ? 'bg-[#1E4D36] hover:bg-[#2A6349]' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <Brain size={18} className="mr-2" />
          <span>Overview</span>
        </Button>
        <Button 
          variant={activeTab === 'careLog' ? 'default' : 'outline'} 
          size="sm"
          className={`px-4 py-2 ${activeTab === 'careLog' ? 'bg-[#1E4D36] hover:bg-[#2A6349]' : ''}`}
          onClick={() => setActiveTab('careLog')}
        >
          <Calendar size={18} className="mr-2" />
          <span>Care Log</span>
        </Button>
        <Button 
          variant={activeTab === 'protocols' ? 'default' : 'outline'} 
          size="sm"
          className={`px-4 py-2 ${activeTab === 'protocols' ? 'bg-[#1E4D36] hover:bg-[#2A6349]' : ''}`}
          onClick={() => setActiveTab('protocols')}
        >
          <ClipboardList size={18} className="mr-2" />
          <span>Protocols</span>
        </Button>
        <Button 
          variant={activeTab === 'billing' ? 'default' : 'outline'} 
          size="sm"
          className={`px-4 py-2 ${activeTab === 'billing' ? 'bg-[#1E4D36] hover:bg-[#2A6349]' : ''}`}
          onClick={() => setActiveTab('billing')}
        >
          <FileText size={18} className="mr-2" />
          <span>Billing</span>
        </Button>
      </div>
    </div>
  );
};
