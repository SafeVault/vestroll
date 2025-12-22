"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MOCK_ASSETS } from "@/lib/mock-data";
import Image from "next/image";
import { OtpModal } from "@/components/finance/otp-modal";

export default function WithdrawConfirmPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showOtpModal, setShowOtpModal] = useState<boolean>(false);

  // Get withdrawal data from URL params
  const selectedAsset = searchParams.get("asset") || "USDT";
  const selectedNetwork = searchParams.get("network") || "Ethereum";
  const amount = searchParams.get("amount") || "0";
  const recipientAddress = searchParams.get("address") || "";

  const handleGoBack = () => {
    router.back();
  };

  const handleContinue = () => {
    setShowOtpModal(true);
  };

  const handleWithdrawComplete = () => {
    console.log("Withdraw completed:", {
      asset: selectedAsset,
      network: selectedNetwork,
      amount,
      recipientAddress,
    });
    router.push("/finance");
  };

  const selectedAssetDetails =
    MOCK_ASSETS.find((a) => a.symbol === selectedAsset) || MOCK_ASSETS[0];

  const usdAmount = parseFloat(amount) || 0;
  const fee = 0.5;
  const total = usdAmount + fee;

  // Redirect if required data is missing
  useEffect(() => {
    if (!amount || !recipientAddress) {
      router.push("/app/finance/withdraw");
    }
  }, [amount, recipientAddress, router]);

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
            Withdraw
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 md:p-6 lg:p-8">
        <div className="max-w-xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            {/* Amount in USD (locked) */}
            <div className=" p-4 rounded-lg mb-6">
              <div className="flex items-center justify-center gap-3">
                <div className=" flex flex-col items-center gap-2">
                  <Image
                    width={12}
                    height={12}
                    src={selectedAssetDetails.icon}
                    alt={selectedAssetDetails.symbol}
                    className="w-10 h-10"
                  />
                  <p className="text-2xl font-bold text-gray-900">
                    ${usdAmount.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {usdAmount.toFixed(4)} {selectedAsset}
                  </p>
                </div>
              </div>
            </div>

            {/* Asset and Network */}
            <div className="space-y-4 mb-6">
              {/* Asset and Network on same line */}
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: selectedAssetDetails.bgColor
                        .replace("bg-[", "")
                        .replace("]", ""),
                    }}
                  >
                    <Image
                      width={12}
                      height={12}
                      src={selectedAssetDetails.icon}
                      alt={selectedAssetDetails.symbol}
                      className="w-3 h-3"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Asset</p>
                    <p className="font-medium text-gray-900">
                      {selectedAssetDetails.name}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm font-medium text-gray-700">Network</p>
                  <p className="font-medium text-gray-900">{selectedNetwork}</p>
                </div>
              </div>

              {/* To and Network Fee on same line */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-700">To</p>
                  <p className="font-mono text-sm text-gray-900 truncate max-w-[200px]">
                    {recipientAddress}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-medium text-gray-700">
                    Network Fee
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    ${fee.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">
                    Estimated fee for {selectedNetwork} network
                  </p>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="bg-purple-50 p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-purple-900">Total</p>
                <p className="text-lg font-bold text-purple-900">
                  ${total.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Confirm Button */}
            <div className="mt-30 px-2">
              <Button
                type="button"
                onClick={handleContinue}
                className="w-full p-6 bg-purple-900 hover:bg-purple-800 font-bold text-lg text-white"
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      <OtpModal
        isOpen={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        onComplete={handleWithdrawComplete}
      />
    </div>
  );
}
