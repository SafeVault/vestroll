// app/finance/[symbol]/page.tsx
"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BalanceSection } from "@/components/finance/balance-section";
import { FinanceClient } from "@/components/finance/finance-client";
import { generateMockTransactions } from "@/lib/mock-data";
import { MOCK_ASSETS } from "@/lib/mock-data";

export default function AssetTransactionsPage() {
  const params = useParams();
  const router = useRouter();
  const symbol = params.symbol as string;

  // Find the asset details
  const asset = MOCK_ASSETS.find((a) => a.symbol === symbol) || MOCK_ASSETS[0];

  // Filter transactions to show only for this asset
  const allTransactions = generateMockTransactions(80).filter(
    (transaction) => transaction.asset === symbol
  );

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-5 md:px-6 lg:px-2">
        <div className="max-w-[1400px] mx-2">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-gray-500 text-sm mb-4 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: asset.bgColor
                  .replace("bg-[", "")
                  .replace("]", ""),
              }}
            >
              <img src={asset.icon} alt={asset.symbol} className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                {asset.name} ({asset.symbol})
              </h1>
              <p className="text-sm text-gray-500">
                All transactions for {asset.symbol}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 md:p-6 lg:p-8">
        <div className="max-w-[1400px] mx-2">
          {/* Balance Section for this asset */}
          <div className="mb-8">
            <div className="grid grid-cols-1 gap-6">
              <BalanceSection
                balance={asset.balance}
                change={asset.change}
                title={`${asset.symbol} Balance`}
              />
            </div>
          </div>

          {/* Asset Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Asset Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Current Price</p>
                <p className="text-lg font-semibold text-gray-900">
                  {asset.price}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">24h Change</p>
                <p
                  className={`text-lg font-semibold ${asset.change.includes("-") ? "text-red-600" : "text-green-600"}`}
                >
                  {asset.change}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Total Holdings</p>
                <p className="text-lg font-semibold text-gray-900">
                  {asset.amount}
                </p>
              </div>
            </div>
          </div>

          {/* Transactions Section for this asset */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {asset.symbol} Transactions
            </h2>
            <FinanceClient
              allTransactions={allTransactions}
              initialResultsPerPage={10}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
