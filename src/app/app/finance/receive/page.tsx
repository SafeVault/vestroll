"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Wallet, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function DepositPage() {
  const router = useRouter();
  const [amount, setAmount] = useState<string>("");
  const [selectedWallet, setSelectedWallet] = useState<string>("NGN");
  const [showWalletModal, setShowWalletModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Mock data for fiat wallets with deposit limits
  const fiatWallets = [
    {
      currency: "NGN",
      balance: "₦10,000.00",
      currencyName: "Nigerian Naira",
      symbol: "₦",
      imgPath: "/images/emojione_flag-for-nigeria_fiat.png",
      minDeposit: 10000,
      maxDeposit: 5000000,
    },
    {
      currency: "USD",
      balance: "$5.00",
      currencyName: "US Dollar",
      symbol: "$",
      imgPath: "/images/circle-flags_us-fiat.png",
      minDeposit: 10,
      maxDeposit: 10000,
    },
    {
      currency: "EUR",
      balance: "€5.00",
      currencyName: "Euro",
      symbol: "€",
      imgPath: "/images/emojione_flag-for-european-union_fiat.png",
      minDeposit: 10,
      maxDeposit: 8000,
    },
    {
      currency: "GBP",
      balance: "£5.00",
      currencyName: "British Pound",
      symbol: "£",
      imgPath: "/images/circle-flags_uk_fiat.png",
      minDeposit: 10,
      maxDeposit: 7000,
    },
  ];

  const selectedWalletData =
    fiatWallets.find((w) => w.currency === selectedWallet) || fiatWallets[0];

  const handleGoBack = () => {
    router.back();
  };

  const handleContinue = () => {
    const params = new URLSearchParams({
      amount: amount,
      currency: selectedWallet,
    });

    router.push(`/app/finance/receive/select-bank?${params.toString()}`);
  };

  const handleMax = () => {
    // For deposit, max is the maximum deposit limit
    setAmount(selectedWalletData.maxDeposit.toString());
  };

  const isContinueDisabled = () => {
    if (!amount || parseFloat(amount) <= 0) return true;

    const numericAmount = parseFloat(amount);
    const minDeposit = selectedWalletData.minDeposit;
    const maxDeposit = selectedWalletData.maxDeposit;

    // Check if amount is within deposit limits
    return numericAmount < minDeposit || numericAmount > maxDeposit;
  };

  const getDepositLimitsText = () => {
    return `Min: ${selectedWalletData.symbol}${selectedWalletData.minDeposit.toLocaleString()} • Max: ${selectedWalletData.symbol}${selectedWalletData.maxDeposit.toLocaleString()}`;
  };

  const getAmountValidationMessage = () => {
    if (!amount) return null;

    const numericAmount = parseFloat(amount);
    const minDeposit = selectedWalletData.minDeposit;
    const maxDeposit = selectedWalletData.maxDeposit;

    if (numericAmount < minDeposit) {
      return `Minimum deposit is ${selectedWalletData.symbol}${minDeposit.toLocaleString()}`;
    }

    if (numericAmount > maxDeposit) {
      return `Maximum deposit is ${selectedWalletData.symbol}${maxDeposit.toLocaleString()}`;
    }

    return null;
  };

  const handleSelectWallet = (currency: string) => {
    setSelectedWallet(currency);
    setShowWalletModal(false);
    setAmount(""); // Reset amount when wallet changes
  };

  const filteredWallets = fiatWallets.filter((wallet) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      wallet.currencyName.toLowerCase().includes(query) ||
      wallet.currency.toLowerCase().includes(query) ||
      wallet.symbol.toLowerCase().includes(query)
    );
  });

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
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
            Deposit
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 md:p-6 lg:p-8">
        <div className="max-w-xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <form className="space-y-6">
              {/* Wallet Selection Button - Opens Modal */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Wallet
                </label>
                <button
                  type="button"
                  onClick={() => setShowWalletModal(true)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg flex items-center justify-between hover:border-gray-400 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
                      <Image
                        src={selectedWalletData.imgPath}
                        alt={`${selectedWalletData.currencyName} flag`}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-left">
                      <span className="font-medium text-gray-900 block">
                        {selectedWalletData.currencyName}
                      </span>
                      <span className="text-sm text-gray-500">
                        {selectedWalletData.currency} Wallet
                      </span>
                    </div>
                  </div>
                  <div className="text-gray-400">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  Select wallet to deposit into
                </p>
              </div>

              {/* Amount Input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Amount
                  </label>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Deposit Limits</p>
                    <p className="text-sm font-medium text-gray-900">
                      {getDepositLimitsText()}
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-4 py-3 pl-16 text-black border border-gray-300 rounded-lg text-lg font-medium focus:outline-none focus:ring-2 focus:ring-purple-900 focus:border-transparent"
                    min={selectedWalletData.minDeposit}
                    max={selectedWalletData.maxDeposit}
                    step="0.01"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <span className="text-gray-500">
                      {selectedWalletData.symbol}
                    </span>
                  </div>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <button
                      type="button"
                      onClick={handleMax}
                      className="px-3 py-1 text-sm bg-purple-900 text-white rounded-lg hover:bg-purple-800 transition-colors"
                    >
                      Max
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Enter the amount you want to deposit
                </p>

                {/* Validation Message */}
                {getAmountValidationMessage() && (
                  <p className="text-xs text-red-600 mt-1">
                    {getAmountValidationMessage()}
                  </p>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <Button
                  type="button"
                  onClick={handleContinue}
                  className="w-full p-6 bg-purple-900 hover:bg-purple-800 font-bold text-lg text-white"
                  disabled={isContinueDisabled()}
                >
                  Continue
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Wallet Selection Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md max-h-[80vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Select Wallet
              </h2>
              <button
                type="button"
                onClick={() => setShowWalletModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Search Input */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search currency or wallet name..."
                  className="w-full px-4 py-3 pl-10 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-900 focus:border-transparent"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
                  >
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[50vh]">
              <div className="p-4 space-y-2">
                {filteredWallets.length > 0 ? (
                  filteredWallets.map((wallet) => (
                    <button
                      key={wallet.currency}
                      type="button"
                      onClick={() => handleSelectWallet(wallet.currency)}
                      className={`w-full p-4 flex items-center gap-4 rounded-lg transition-all ${
                        selectedWallet === wallet.currency
                          ? "bg-purple-50 border-2 border-purple-900"
                          : "bg-gray-50 hover:bg-gray-100 border border-transparent"
                      }`}
                    >
                      <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
                        <Image
                          src={wallet.imgPath}
                          alt={`${wallet.currencyName} flag`}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-medium text-gray-900 block">
                              {wallet.currencyName}
                            </span>
                            <span className="text-sm text-gray-500">
                              {wallet.currency} Wallet
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="font-medium text-gray-900 block">
                              {wallet.balance}
                            </span>
                            <span className="text-xs text-gray-500">
                              Min: {wallet.symbol}
                              {wallet.minDeposit.toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                          Max deposit: {wallet.symbol}
                          {wallet.maxDeposit.toLocaleString()}
                        </div>
                      </div>
                      {selectedWallet === wallet.currency && (
                        <div className="w-4 h-4 rounded-full bg-purple-900 flex items-center justify-center">
                          <svg
                            className="w-2 h-2 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))
                ) : (
                  <div className="py-8 text-center">
                    <svg
                      className="w-12 h-12 mx-auto text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <p className="mt-2 text-gray-600">No wallets found</p>
                    <p className="text-sm text-gray-500">
                      Try a different search term
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
