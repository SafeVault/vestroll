import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { Transaction, PaginationProps } from '@/types/finance.types';
import { TransactionTable } from './transaction-table';
import { TransactionList } from './transaction-list';
import { Pagination } from './pagination';

interface TransactionsSectionProps {
  transactions: Transaction[];
  pagination: PaginationProps;
  onSeeAll: () => void;
}

export function TransactionsSection ({
  transactions,
  pagination,
  onSeeAll
}:TransactionsSectionProps)  {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between p-5 md:p-6 border-b border-gray-100">
        <h2 className="text-base font-semibold text-[#0F172A]">
          Transactions
        </h2>
        <Button 
          onClick={onSeeAll}
          variant="ghost" 
          className="text-[#7C3AED] text-sm font-medium hover:bg-[#F5F3FF] h-auto p-0 pr-1"
        >
          See all
          <ChevronRight size={16} className="ml-1" />
        </Button>
      </div>

      {/* Desktop Table */}
      <TransactionTable transactions={transactions} />

      {/* Mobile List */}
      <TransactionList transactions={transactions} />

      {/* Pagination */}
      <div className="px-4 md:px-6 pb-5 md:pb-6">
        <Pagination {...pagination} />
      </div>
    </div>
  );
};