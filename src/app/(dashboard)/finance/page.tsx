import { MOCK_ASSETS, generateMockTransactions } from '@/lib/mock-data';
import { BalanceSection } from '@/components/features/finance/balance-section';
import { AssetsGrid } from '@/components/features/finance/assets-grid';
import { FinanceClient } from '@/components/features/finance/finance-client';

import type { SupportedAssetSymbol, SupportedNetwork } from "@/types/address-types";


type Option<T extends string> = { label: string; value: T };

const assetOptions: Option<SupportedAssetSymbol>[] = [
  { label: "USDC", value: "USDC" },
  { label: "USDT", value: "USDT" },
  { label: "ETH", value: "ETH" },
  { label: "BTC", value: "BTC" },
];

const networkOptions: Option<SupportedNetwork>[] = [
  { label: "Ethereum", value: "Ethereum" },
  { label: "Polygon", value: "Polygon" },
  { label: "Arbitrum", value: "Arbitrum" },
  { label: "Optimism", value: "Optimism" },
  { label: "Stellar", value: "Stellar" },
];

const allTransactions = generateMockTransactions(80);

export default function FinancePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-6 lg:p-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <header className="mb-5">
          <p className="text-xs text-[#94A3B8] mb-1">Overview</p>
          <h1 className="text-2xl md:text-3xl font-bold text-[#0F172A]">
            Finance
          </h1>
        </header>

        {/* Balance Section */}
        <BalanceSection
          balance="$5,050.00"
          change="-0.0051% ($0.99)"
        />

        {/* Assets Grid */}
        <AssetsGrid assets={MOCK_ASSETS} />

        {/* Transactions Section with Client Component */}
        <FinanceClient
          allTransactions={allTransactions}
          initialResultsPerPage={10}
        />
      </div>
    </div>

  );
}