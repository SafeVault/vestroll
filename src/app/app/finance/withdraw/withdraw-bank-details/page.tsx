// app/finance/withdraw/bank-details/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ChevronDown, Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BankDetailsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [showBankDropdown, setShowBankDropdown] = useState<boolean>(false);

  // Get data from URL params
  const amount = searchParams.get("amount") || "";
  const currency = searchParams.get("currency") || "NGN";

  // Mock data for Nigerian banks (you can expand this for other countries)
  const banks = [
    { id: "access", name: "Access Bank" },
    { id: "gtb", name: "Guaranty Trust Bank" },
    { id: "zenith", name: "Zenith Bank" },
    { id: "firstbank", name: "First Bank of Nigeria" },
    { id: "uba", name: "United Bank for Africa" },
    { id: "union", name: "Union Bank", code: "032" },
    { id: "fidelity", name: "Fidelity Bank" },
    { id: "ecobank", name: "Ecobank" },
    { id: "fcmb", name: "First City Monument Bank" },
    { id: "sterling", name: "Sterling Bank" },
    { id: "polaris", name: "Polaris Bank" },
    { id: "wema", name: "Wema Bank" },
  ];

  const selectedBankData = banks.find((b) => b.id === selectedBank);

  const handleGoBack = () => {
    router.back();
  };

  const handleProceed = () => {
    if (!selectedBank) {
      alert("Please select a bank");
      return;
    }

    // Navigate to confirmation page with all data
    const params = new URLSearchParams({
      amount: amount,
      currency: currency,
      accountNumber: accountNumber,
      bankCode: selectedBankData?.code || "",
      bankName: selectedBankData?.name || "",
    });

    router.push(`/app/finance/withdraw/confirm?${params.toString()}`);
  };

  const isProceedDisabled = () => {
    return !accountNumber || !selectedBank;
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
          <h1 className="text-xl md:text-xl font-semibold text-gray-900 mb-2">
            Withdraw
          </h1>
          <p className="text-gray-600">
            Withdrawing {currency} {amount} to your bank account
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 md:p-6 lg:p-8">
        <div className="max-w-xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Bank
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowBankDropdown(!showBankDropdown)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg flex items-center justify-between hover:border-gray-400 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-left">
                        <span className="font-medium text-gray-900 block">
                          {selectedBankData?.name || "Select your bank"}
                        </span>
                      </div>
                    </div>
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </button>

                  {showBankDropdown && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {banks.map((bank) => (
                        <button
                          key={bank.id}
                          type="button"
                          onClick={() => {
                            setSelectedBank(bank.id);
                            setShowBankDropdown(false);
                          }}
                          className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                        >
                          {/* Remove the icon/code div and show only bank name */}
                          <span className="font-medium text-gray-900">
                            {bank.name}
                          </span>
                          {selectedBank === bank.id && (
                            <div className="w-2 h-2 rounded-full bg-purple-900"></div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Select the bank where you want to receive funds
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Number
                </label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="Enter your account number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-900 focus:border-transparent"
                  maxLength={10}
                />
                <p className="text-xs text-gray-500 mt-2">
                  Enter your 10-digit account number
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <Button
                  type="button"
                  onClick={handleProceed}
                  className="w-full p-6 bg-[#5E2A8C] hover:bg-purple-800 font-bold text-lg text-white"
                  disabled={isProceedDisabled()}
                >
                  Withdraw
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Close dropdown when clicking outside */}
      {showBankDropdown && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowBankDropdown(false)}
        />
      )}
    </div>
  );
}
