import { useState } from 'react';
import { ListChecks, UserPlus, FileText, Users, MoreHorizontal, BarChart2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
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
  { id: 'population', label: 'Population', icon: <BarChart2 size={18} /> },
];

export const NAV_ITEMS: NavItem[] = [...PRIMARY_ITEMS, ...SECONDARY_ITEMS];

interface DashboardNavProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
}

export function DashboardNav({ activeTab, onTabChange }: DashboardNavProps) {
  const [moreOpen, setMoreOpen] = useState(false);

  const handleMobileSecondary = (id: DashboardTab) => {
    onTabChange(id);
    setMoreOpen(false);
  };

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
      </nav>

      {/* Mobile bottom nav: primary items + More sheet for secondary */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border flex justify-around px-2 py-1">
        {PRIMARY_ITEMS.map(item => (
          <MobileNavItem
            key={item.id}
            item={item}
            active={activeTab === item.id}
            onClick={() => onTabChange(item.id)}
          />
        ))}
        <Sheet open={moreOpen} onOpenChange={setMoreOpen}>
          <SheetTrigger asChild>
            <button
              className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                SECONDARY_ITEMS.some(i => i.id === activeTab) ? 'text-primary' : 'text-muted-foreground'
              }`}
              aria-label="More"
            >
              <MoreHorizontal size={18} />
              <span className="text-[10px]">More</span>
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-xl">
            <SheetHeader className="mb-3">
              <SheetTitle className="text-sm">More</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-1">
              {SECONDARY_ITEMS.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleMobileSecondary(item.id)}
                  className={`flex items-center gap-3 w-full px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === item.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-accent'
                  }`}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
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
