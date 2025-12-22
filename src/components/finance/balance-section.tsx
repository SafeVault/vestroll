"use client";

import React from "react";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface BalanceSectionProps {
  balance: string;
  change: string;
  title?: string;
}

export function BalanceSection({
  balance,
  change,
  title = "Total balance",
}: BalanceSectionProps) {
  const router = useRouter();
  const isPositive = change.includes("+");

  const handleFundWallet = () => {
    router.push("/app/finance/receive");
  };

  const handleWithdraw = () => {
    router.push("/app/finance/withdraw");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div className="flex flex-col items-center justify-center">
        <p className="text-sm text-gray-500 mb-2">{title}</p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {balance}
        </h1>
        <p
          className={`text-sm font-medium mb-6 ${isPositive ? "text-green-600" : "text-red-600"}`}
        >
          {change}
        </p>
        <div className="flex gap-3">
          <Button
            onClick={handleFundWallet}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#F3EBF9] text-[#5E2A8C] rounded-full font-medium transition-colors"
          >
            <ArrowDownLeft size={16} strokeWidth={2.5} />
            Fund wallet
          </Button>
          <Button
            onClick={handleWithdraw}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#F3EBF9] text-[#5E2A8C] rounded-full font-medium transition-colors"
          >
            <ArrowUpRight size={16} strokeWidth={2.5} />
            Withdraw
          </Button>
        </div>
      </div>
    </div>
  );
}
