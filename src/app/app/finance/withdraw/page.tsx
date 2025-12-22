// app/finance/withdraw/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronDown, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function WithdrawPage() {
  const router = useRouter();
  const [amount, setAmount] = useState<string>("");
  const [selectedWallet, setSelectedWallet] = useState<string>("NGN");
  const [showWalletDropdown, setShowWalletDropdown] = useState<boolean>(false);

  // Mock data for fiat wallets
  const fiatWallets = [
    {
      currency: "NGN",
      balance: "₦1,500,000.00",
      currencyName: "Nigerian Naira",
      symbol: "₦",
      imgPath: "/images/emojione_flag-for-nigeria_fiat.png",
    },
    {
      currency: "USD",
      balance: "$5,050.00",
      currencyName: "US Dollar",
      symbol: "$",
      imgPath: "/images/circle-flags_us-fiat.png",
    },
    {
      currency: "EUR",
      balance: "€4,250.00",
      currencyName: "Euro",
      symbol: "€",
      imgPath: "/images/emojione_flag-for-european-union_fiat.png",
    },
    {
      currency: "GBP",
      balance: "£3,800.00",
      currencyName: "British Pound",
      symbol: "£",
      imgPath: "/images/circle-flags_uk_fiat.png",
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

    router.push(
      `/app/finance/withdraw/withdraw-bank-details?${params.toString()}`
    );
  };

  const handleMax = () => {
    const balanceValue = selectedWalletData.balance.replace(/[^\d.-]/g, "");
    setAmount(balanceValue);
  };

  const isContinueDisabled = () => {
    if (!amount || parseFloat(amount) <= 0) return true;

    // Check if withdrawal amount exceeds balance
    const numericAmount = parseFloat(amount);
    const numericBalance = parseFloat(
      selectedWalletData.balance.replace(/[^\d.-]/g, "")
    );

    return numericAmount > numericBalance;
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
            Withdraw
          </h1>
        </div>
      </div>

      <div className="p-4 md:p-6 lg:p-8">
        <div className="max-w-xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Wallet
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowWalletDropdown(!showWalletDropdown)}
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
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </button>

                  {showWalletDropdown && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                      {fiatWallets.map((wallet) => (
                        <button
                          key={wallet.currency}
                          type="button"
                          onClick={() => {
                            setSelectedWallet(wallet.currency);
                            setShowWalletDropdown(false);
                            setAmount("");
                          }}
                          className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
                              <Image
                                src={wallet.imgPath}
                                alt={`${wallet.currencyName} flag`}
                                width={32}
                                height={32}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="text-left">
                              <span className="font-medium text-gray-900 block">
                                {wallet.currencyName}
                              </span>
                              <span className="text-sm text-gray-500">
                                Balance: {wallet.balance}
                              </span>
                            </div>
                          </div>
                          {selectedWallet === wallet.currency && (
                            <div className="w-2 h-2 rounded-full bg-purple-900"></div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Select wallet to withdraw from
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Amount
                  </label>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Available Balance</p>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedWalletData.balance}
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
                    min="0"
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
                  Enter the amount you want to withdraw
                </p>

                {amount &&
                  parseFloat(amount) >
                    parseFloat(
                      selectedWalletData.balance.replace(/[^\d.-]/g, "")
                    ) && (
                    <p className="text-xs text-red-600 mt-1">
                      Insufficient balance. Maximum withdrawal is{" "}
                      {selectedWalletData.balance}
                    </p>
                  )}
              </div>

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

      {/* Close dropdown when clicking outside */}
      {showWalletDropdown && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowWalletDropdown(false)}
        />
      )}
    </div>
  );
}
