import React from 'react';
import Image from 'next/image';
import { StatusBadge } from './status-badge';
import { Transaction } from '@/types/finance.types';

interface TransactionCardProps {
  transaction: Transaction;
}

export function TransactionCard ({ 
  transaction 
}:TransactionCardProps)  {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-100 mb-3 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 pr-3">
          <p className="text-sm font-medium text-[#0F172A] mb-1 line-clamp-2">
            {transaction.description}
          </p>
          <p className="text-xs text-[#64748B] font-mono">
            {transaction.id}
          </p>
        </div>
        <StatusBadge status={transaction.status} />
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-[#0F172A] text-sm">
            {transaction.amount}
          </span>
          <div className="flex items-center gap-1.5">
            <Image 
            src="/tether-icon.svg" 
            alt="USDT" 
            width={20} 
            height={20}
            className="object-contain"
          />
            <span className="text-xs text-[#64748B]">
              {transaction.asset}
            </span>
          </div>
        </div>
        <span className="text-xs text-[#94A3B8]">
          {transaction.timestamp}
        </span>
      </div>
    </div>
  );
};