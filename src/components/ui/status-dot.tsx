import * as React from 'react';
import { cn } from '@/lib/utils';

type DotTone = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'violet' | 'muted';

const DOT_CLASS: Record<DotTone, string> = {
  red: 'bg-red-500',
  orange: 'bg-orange-500',
  yellow: 'bg-yellow-500',
  green: 'bg-green-500',
  blue: 'bg-blue-500',
  violet: 'bg-violet-500',
  muted: 'bg-muted-foreground/50',
};

interface StatusPillProps {
  tone?: DotTone;
  children: React.ReactNode;
  className?: string;
}

// Notion-style pill: grey background, small colored dot for signal.
export function StatusPill({ tone = 'muted', children, className }: StatusPillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/60 px-2 py-0.5 text-xs font-medium text-foreground',
        className,
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full flex-shrink-0', DOT_CLASS[tone])} />
      {children}
    </span>
  );
}

interface StatusDotProps {
  tone?: DotTone;
  className?: string;
}

export function StatusDot({ tone = 'muted', className }: StatusDotProps) {
  return <span className={cn('h-1.5 w-1.5 rounded-full flex-shrink-0 inline-block', DOT_CLASS[tone], className)} />;
}
