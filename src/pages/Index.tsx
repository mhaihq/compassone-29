import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useDashboardNav } from '@/hooks/useDashboardNav';
import { DashboardNav } from '@/components/layout/DashboardNav';
import { DashboardContent } from '@/components/layout/DashboardContent';

export function Index() {
  const nav = useDashboardNav();

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <header className="flex-shrink-0 bg-card border-b border-border h-14 flex items-center px-4 md:px-6 gap-3">
        <img
          src="/lovable-uploads/8bd12f77-f027-47b9-a41c-a780b6ec54d0.png"
          alt="Hana"
          className="h-7 w-auto"
        />
        <div className="flex items-baseline gap-2">
          <span className="font-semibold text-foreground text-sm">Hana Compass</span>
          <span className="hidden md:inline text-xs text-muted-foreground">Population Health</span>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <Separator orientation="vertical" className="h-5" />
          <Avatar className="h-7 w-7">
            <AvatarFallback className="text-xs bg-primary text-primary-foreground">MG</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <DashboardNav activeTab={nav.activeTab} onTabChange={nav.changeTab} />
        <DashboardContent nav={nav} />
      </div>
    </div>
  );
}

export default Index;
