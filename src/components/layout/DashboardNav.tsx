import { ListChecks, UserPlus, FileText, Users, Settings } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import type { DashboardTab } from '@/hooks/useDashboardNav';

interface NavItem {
  id: DashboardTab;
  label: string;
  icon: React.ReactNode;
}

const PRIMARY_ITEMS: NavItem[] = [
  { id: 'taskQueue', label: 'Task Queue', icon: <ListChecks size={18} /> },
  { id: 'patients', label: 'Patients', icon: <Users size={18} /> },
  { id: 'billing', label: 'Billing', icon: <FileText size={18} /> },
];

const SECONDARY_ITEMS: NavItem[] = [
  { id: 'enrollment', label: 'Enrollment', icon: <UserPlus size={18} /> },
];

export const NAV_ITEMS: NavItem[] = [...PRIMARY_ITEMS, ...SECONDARY_ITEMS];

interface DashboardNavProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
}

export function DashboardNav({ activeTab, onTabChange }: DashboardNavProps) {
  return (
    <>
      {/* Desktop left nav */}
      <nav className="hidden md:flex flex-col flex-shrink-0 w-52 bg-card border-r border-border">
        <div className="flex flex-col gap-1 p-3">
          {PRIMARY_ITEMS.map(item => (
            <DesktopNavItem
              key={item.id}
              item={item}
              active={activeTab === item.id}
              onClick={() => onTabChange(item.id)}
            />
          ))}
        </div>
        <Separator />
        <div className="flex flex-col gap-1 p-3">
          <p className="px-3 pb-1 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
            More
          </p>
          {SECONDARY_ITEMS.map(item => (
            <DesktopNavItem
              key={item.id}
              item={item}
              active={activeTab === item.id}
              onClick={() => onTabChange(item.id)}
              muted
            />
          ))}
        </div>
        <div className="mt-auto p-3 border-t border-border">
          <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
            <Settings size={18} />
            <span>Settings</span>
          </button>
        </div>
      </nav>

      {/* Mobile bottom nav (primary only) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border flex justify-around px-2 py-1">
        {PRIMARY_ITEMS.map(item => (
          <MobileNavItem
            key={item.id}
            item={item}
            active={activeTab === item.id}
            onClick={() => onTabChange(item.id)}
          />
        ))}
      </nav>
    </>
  );
}

interface ItemProps {
  item: NavItem;
  active: boolean;
  onClick: () => void;
  muted?: boolean;
}

function DesktopNavItem({ item, active, onClick, muted }: ItemProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={onClick}
          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            active
              ? 'bg-primary text-primary-foreground'
              : muted
              ? 'text-muted-foreground/80 hover:bg-accent hover:text-accent-foreground'
              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          }`}
        >
          <span className="flex-shrink-0">{item.icon}</span>
          <span className="truncate">{item.label}</span>
        </button>
      </TooltipTrigger>
      <TooltipContent side="right">{item.label}</TooltipContent>
    </Tooltip>
  );
}

function MobileNavItem({ item, active, onClick }: ItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
        active ? 'text-primary' : 'text-muted-foreground'
      }`}
    >
      {item.icon}
      <span className="text-[10px]">{item.label}</span>
    </button>
  );
}
