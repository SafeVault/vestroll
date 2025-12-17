import React, { useState } from "react";
import { TransactionCard } from "./transaction-card";
import { Transaction } from "@/types/finance.types";
import { TransactionDetailsModal } from "./transaction-detail-modal";

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedTransaction(null), 300);
  };

  return (
    <>
      <div className="md:hidden p-4">
        {transactions.map((transaction, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(transaction)}
            className="cursor-pointer"
          >
            <TransactionCard
              transaction={transaction}
              onClick={() => handleCardClick(transaction)}
            />
          </div>
        ))}
      </div>

      <TransactionDetailsModal
        transaction={selectedTransaction}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
