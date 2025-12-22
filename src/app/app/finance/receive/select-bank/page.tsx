// app/finance/deposit/select-bank/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SelectBankPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedBank, setSelectedBank] = useState<string>("");

  // Get data from URL params
  const amount = searchParams.get("amount") || "";
  const currency = searchParams.get("currency") || "NGN";

  // Available banks for deposit
  const banks = [
    { id: "access", name: "Access Bank" },
    { id: "gtb", name: "Guaranty Trust Bank" },
    { id: "zenith", name: "Zenith Bank" },
    { id: "firstbank", name: "First Bank of Nigeria" },
    { id: "uba", name: "United Bank for Africa" },
    { id: "union", name: "Union Bank" },
    { id: "fidelity", name: "Fidelity Bank" },
    { id: "ecobank", name: "Ecobank" },
    { id: "fcmb", name: "First City Monument Bank" },
    { id: "sterling", name: "Sterling Bank" },
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

    // Navigate to confirmation deposit page
    const params = new URLSearchParams({
      amount: amount,
      currency: currency,
      bank: selectedBank,
      bankName: selectedBankData?.name || "",
    });

    router.push(
      `/app/finance/receive/select-bank/confirm-details?${params.toString()}`
    );
  };

  const isProceedDisabled = () => {
    return !selectedBank;
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
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
            Select Bank
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 md:p-6 lg:p-8">
        <div className="max-w-xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
            {/* Bank Selection */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Choose the bank you are sending from
              </h3>
              {/* Bank Grid - First row with 3 banks */}
              <div className="grid grid-cols-3 gap-2 mb-2">
                {banks.slice(0, 3).map((bank) => (
                  <button
                    key={bank.id}
                    type="button"
                    onClick={() => setSelectedBank(bank.id)}
                    className={`p-1 flex items-center justify-center text-black rounded-lg border-2 transition-all min-h-[50px] ${
                      selectedBank === bank.id
                        ? "border-[#9D62D0]"
                        : "border-gray-200  hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-[20px] font-medium text-center px-1">
                      {bank.name}
                    </span>
                    {selectedBank === bank.id && (
                      <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-white flex items-center justify-center">
                        <Check className="w-2 h-2 text-purple-900" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
              {/* Remaining rows with 2 banks each */}
              <div className="space-y-2">
                {(() => {
                  const remainingBanks = banks.slice(3);
                  const rows = [];

                  for (let i = 0; i < remainingBanks.length; i += 2) {
                    const rowBanks = remainingBanks.slice(i, i + 2);
                    rows.push(
                      <div key={`row-${i}`} className="grid grid-cols-2 gap-2">
                        {rowBanks.map((bank) => (
                          <button
                            key={bank.id}
                            type="button"
                            onClick={() => setSelectedBank(bank.id)}
                            className={`p-1 flex items-center text-black justify-center rounded-lg border-2 transition-all min-h-[60px] relative ${
                              selectedBank === bank.id
                                ? "border-[#9D62D0] "
                                : "border-gray-200  hover:border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            <span className="text-[20px] font-medium text-center px-1">
                              {bank.name}
                            </span>
                            {selectedBank === bank.id && (
                              <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-white flex items-center justify-center">
                                <Check className="w-2 h-2 text-purple-900" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    );
                  }
                  return rows;
                })()}
              </div>
            </div>

            <div className="pt-4">
              <Button
                type="button"
                onClick={handleProceed}
                className="w-full p-6 bg-purple-900 hover:bg-purple-800 font-bold text-lg text-white"
                disabled={isProceedDisabled()}
              >
                Continue to Payment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
