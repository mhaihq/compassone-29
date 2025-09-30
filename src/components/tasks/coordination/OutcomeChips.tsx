import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Check, DollarSign, Calendar, AlertTriangle, X } from 'lucide-react';

interface OutcomeChipsProps {
  outcomes: Array<{
    type: 'fee-charged' | 'fee-waived' | 'rescheduled' | 'escalated' | 'cancelled' | 'pushed' | 'fixed' | 'override';
    label: string;
  }>;
}

export const OutcomeChips: React.FC<OutcomeChipsProps> = ({ outcomes }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'fee-charged': return <DollarSign className="h-3 w-3" />;
      case 'fee-waived': return <X className="h-3 w-3" />;
      case 'rescheduled': return <Calendar className="h-3 w-3" />;
      case 'escalated': return <AlertTriangle className="h-3 w-3" />;
      case 'pushed':
      case 'fixed': return <Check className="h-3 w-3" />;
      default: return null;
    }
  };

  const getVariant = (type: string) => {
    switch (type) {
      case 'fee-charged':
      case 'pushed':
      case 'fixed': return 'default';
      case 'escalated': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {outcomes.map((outcome, idx) => (
        <Badge key={idx} variant={getVariant(outcome.type)} className="flex items-center gap-1">
          {getIcon(outcome.type)}
          {outcome.label}
        </Badge>
      ))}
    </div>
  );
};
