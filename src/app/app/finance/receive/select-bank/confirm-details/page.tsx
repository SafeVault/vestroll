// app/finance/deposit/confirm/page.tsx
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Copy, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ConfirmDepositPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [timeLeft, setTimeLeft] = useState<number>(15 * 60); // 15 minutes in seconds
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Get data from URL params
  const amount = searchParams.get("amount") || "";
  const currency = searchParams.get("currency") || "NGN";
  const bankName = searchParams.get("bankName") || "";

  // Generate a fixed trade reference
  const tradeRef = useMemo(() => {
    // Use a combination of timestamp and random string for uniqueness
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `TRD${timestamp.toString().slice(-6)}${randomStr}`;
  }, []);

  // Mock bank details
  const bankDetails = useMemo(
    () => ({
      bank: bankName,
      accountNumber: "1234567890",
      accountOwner: "Tech Finance Ltd",
      amount: `${currency} ${parseFloat(amount).toFixed(2)}`,
      paymentContent: `Deposit ${tradeRef}`,
    }),
    [bankName, currency, amount, tradeRef]
  );

  // Countdown timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      // Redirect to deposit page when timer reaches 0
      router.push("/app/finance/receive");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, router]);

  const handleGoBack = () => {
    router.back();
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getPaymentStatus = () => {
    if (timeLeft > 14 * 60) return "Pending"; // First minute
    if (timeLeft > 5 * 60) return "Awaiting Payment";
    if (timeLeft > 0) return "Time Running Out";
    return "Expired";
  };

  const getStatusColor = () => {
    const status = getPaymentStatus();
    switch (status) {
      case "Pending":
        return "text-blue-600";
      case "Awaiting Payment":
        return "text-yellow-600";
      case "Time Running Out":
        return "text-orange-600";
      case "Expired":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
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
            Receive
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 md:p-6 lg:p-8">
        <div className="max-w-xl mx-auto space-y-6">
          {/* Payment Status Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            {/* Amount to Deposit */}
            <div className="mb-6 flex flex-col items-center justify-center text-[#17171C]">
              <p className=" mb-1 text-[20px]">Deposit {currency}</p>
              <p className=" font-bold text-[28px] ">
                {parseFloat(amount).toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}{" "}
                {currency}
              </p>
            </div>
            <div className="border border-[#D6E0EE] p-4 rounded-lg">
              <div className="flex items-center justify-between mt-4">
                <p className="text-[16px] text-black mt-1">
                  Time left to transfer
                </p>
                <div className="flex items-center gap-2 text-red-600">
                  <Clock className="w-5 h-5" />
                  <span className="text-lg font-bold">
                    {formatTime(timeLeft)}
                  </span>
                </div>
              </div>
              {/* payment status */}
              <div className="flex items-center justify-between mt-4">
                <p className="text-[16px] font-medium text-black">
                  Payment Status
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-sm font-medium ${getStatusColor()}`}>
                    {getPaymentStatus()}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                </div>
              </div>
              {/* Trade Reference */}
              <div className="flex items-center justify-between mt-4">
                <div>
                  <p className="text-sm text-gray-600">Trade Reference</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-mono font-medium text-gray-900 text-right">
                    {tradeRef}
                  </p>
                  <button
                    onClick={() => handleCopy(tradeRef, "tradeRef")}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {copiedField === "tradeRef" ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
              {/* Transfer Details Card */}
              <div className="bg-[#FEF7EB] flex items-center justify-center border border-[#E79A23] rounded-lg p-2 mb-2">
                <p className="font-medium text-gray-950 text-[14px] ">
                  Transfer using the exact info below:
                </p>
              </div>
              {/* Bank Details */}
              <div className="space-y-4">
                {Object.entries(bankDetails).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-3  rounded-lg"
                  >
                    <p className="text-[16px] font-medium text-black">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </p>
                    <div className="flex items-center gap-3">
                      <p className="text-[16px] font-medium text-[#7F8C9F] text-right">
                        {value}
                      </p>
                      <button
                        onClick={() => handleCopy(value.toString(), key)}
                        className="p-2 hover:bg-white rounded-lg transition-colors border border-gray-200"
                      >
                        {copiedField === key ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-purple-700" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <Button
                type="button"
                onClick={() => router.push("/app/finance/")}
                className="flex-1 p-4 border border-gray-300 bg-white text-gray-900 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={() => {
                  alert("await confirmation and check your balance...");

                  setTimeout(() => {
                    router.push("/app/finance");
                  }, 500);
                }}
                className="flex-1 p-4 bg-purple-900 hover:bg-purple-800 text-white"
              >
                I&pos;ve Made the Transfer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
