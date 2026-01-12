'use client';

import React from 'react';
import { Transaction } from '@/types/finance.types';
import { usePagination } from '@/hooks/use-pagination';
import { TransactionsSection } from '@/components/features/finance/transactions-section';

interface FinanceClientProps {
  allTransactions: Transaction[];
  initialResultsPerPage: number;
}

export const FinanceClient: React.FC<FinanceClientProps> = ({
  allTransactions,
  initialResultsPerPage
}) => {
  const {
    currentPage,
    resultsPerPage,
    totalPages,
    currentData: currentTransactions,
    setCurrentPage,
    setResultsPerPage
  } = usePagination({
    data: allTransactions,
    initialResultsPerPage
  });

  const handleFundWallet = () => {
    console.log('Fund wallet clicked');
    // Implement fund wallet logic
  };

  const handleWithdraw = () => {
    console.log('Withdraw clicked');
    // Implement withdraw logic
  };

  const handleSeeAllTransactions = () => {
    console.log('See all transactions clicked');
    // Navigate to full transactions page
  };

  return (
    <>
      {/* Transactions Section */}
      <TransactionsSection
        transactions={currentTransactions}
        pagination={{
          currentPage,
          totalPages,
          totalItems: allTransactions.length,
          resultsPerPage,
          onPageChange: setCurrentPage,
          onResultsPerPageChange: setResultsPerPage
        }}
        onSeeAll={handleSeeAllTransactions}
      />
    </>
  );
};