// types.ts
export interface Asset {
  id: number;
  name: string;
  symbol: string;
  balance: string;
  amount: string;
  price: string;
  change: string;
  icon: string;
  bgColor: string;
}

export interface Transaction {
  id: string;
  description: string;
  amount: string;
  asset: string;
  status: TransactionStatus;
  timestamp: string;
  network: string;
  fee: string;
  destinationAddress?: string;
  type: "Deposit" | "Withdrawal" | "Invoice";
}

export type TransactionStatus = "Pending" | "Failed" | "Successful";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  resultsPerPage: number;
  onPageChange: (page: number) => void;
  onResultsPerPageChange: (results: number) => void;
}
