"use client";

import React from "react";
import { MOCK_ASSETS, generateMockTransactions } from "@/lib/mock-data";
import { BalanceSection } from "@/components/finance/balance-section";
import { AssetsGrid } from "@/components/finance/assets-grid";
import { FinanceClient } from "@/components/finance/finance-client";
import { ArrowLeft } from "lucide-react";

import type {
  SupportedAssetSymbol,
  SupportedNetwork,
} from "@/types/address-types";

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
  const handleGoBack = () => {
    // In real app, this would navigate to previous step
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-5 md:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-gray-500 text-sm mb-4 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
            Finance Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Manage your assets, track transactions, and monitor your portfolio
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 md:p-6 lg:p-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Balance Section in Grid */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Balances</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BalanceSection
                balance="$5,050.00"
                change="-0.0051% ($0.99)"
                title="Total Balance"
              />
              <BalanceSection
                balance="$12,560.30"
                change="+2.5% this month"
                title="Available Balance"
              />
            </div>
          </div>

          {/* Assets Grid */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Assets</h2>
              <button className="text-sm text-purple-900 hover:text-purple-700 font-medium transition-colors">
                View All
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
              <AssetsGrid assets={MOCK_ASSETS} />
            </div>
          </div>

          {/* Transactions Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">
                Recent Transactions
              </h2>
              <button className="text-sm text-purple-900 hover:text-purple-700 font-medium transition-colors">
                View All Transactions
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
              <FinanceClient
                allTransactions={allTransactions}
                initialResultsPerPage={10}
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-purple-900 hover:bg-purple-50 transition-all group">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-purple-200 transition-colors">
                  <span className="text-purple-900 font-bold text-xl">+</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  Add Funds
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  Deposit money
                </span>
              </button>

              <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-purple-900 hover:bg-purple-50 transition-all group">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-purple-200 transition-colors">
                  <span className="text-purple-900 font-bold text-xl">→</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  Transfer
                </span>
                <span className="text-xs text-gray-500 mt-1">Send money</span>
              </button>

              <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-purple-900 hover:bg-purple-50 transition-all group">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-purple-200 transition-colors">
                  <span className="text-purple-900 font-bold text-xl">📊</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  Analytics
                </span>
                <span className="text-xs text-gray-500 mt-1">View reports</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
