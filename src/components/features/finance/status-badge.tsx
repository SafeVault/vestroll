import React from 'react';
import { Badge } from '@/components/ui/badge';
import { TransactionStatus } from '@/types/finance.types';

interface StatusBadgeProps {
  status: TransactionStatus;
}

export function StatusBadge ({ status }:StatusBadgeProps) {
  const variants: Record<TransactionStatus, string> = {
    Pending: 'bg-[#FEF7EB] text-[#E79A23] border-[#E79A23]',
    Failed: 'bg-[#FEECEC] text-[#C64242] border-[#C64242]',
    Successful: 'bg-[#EDFEEC] text-[#26902B] border-[#26902B]'
  };

  return (
    <Badge 
      variant="outline" 
      className={`px-3 py-0.5 rounded-full text-xs font-medium border ${variants[status]}`}
    >
      {status}
    </Badge>
  );
};