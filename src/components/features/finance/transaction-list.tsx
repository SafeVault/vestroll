import React from 'react';
import { TransactionCard } from './transaction-card';
import { Transaction } from '@/types/finance.types';

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ 
  transactions 
}:TransactionListProps) {
  return (
    <div className="md:hidden p-4">
      {transactions.map((transaction, index) => (
        <TransactionCard key={index} transaction={transaction} />
      ))}
    </div>
  );
};