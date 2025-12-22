import React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { StatusBadge } from "./status-badge";
import { Transaction } from "@/types/finance.types";

interface TransactionCardProps {
  transaction: Transaction;
  onClick?: () => void;
}

// Asset icon mapping
const assetIcons: Record<string, string> = {
  USDT: "/tether-icon.svg",
  USDC: "/usdc-usd.svg",
  ETH: "/eth-.svg",
  BTC: "/btc.svg",
  BNB: "/bnb-icon.svg",
  DAI: "/dai-svg.svg",
  SOL: "/sol.svg",
  MATIC: "/matic.svg",
};

// Fallback icon for unknown assets
const DEFAULT_ICON = "/crypto-svg.svg";

export function TransactionCard({
  transaction,
  onClick,
}: TransactionCardProps) {
  const iconPath = assetIcons[transaction.asset] || DEFAULT_ICON;
  const iconAlt = `${transaction.asset} icon`;
  return (
    <div
      className="bg-white p-4 rounded-lg border border-gray-100 mb-3 shadow-sm hover:border-purple-200 hover:shadow-md transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 pr-3">
          <div className="flex items-center gap-2">
            {/* <p className="text-sm font-medium text-[#0F172A] mb-1 line-clamp-2">
              {transaction.description}
            </p> */}
            <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
          </div>
          <p className="text-xs text-[#64748B] font-mono">{transaction.id}</p>
        </div>
        <StatusBadge status={transaction.status} />
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-[#0F172A] text-sm">
            {transaction.amount}
          </span>
          <div className="flex items-center gap-1.5">
            <Image
              src={iconPath}
              alt={iconAlt}
              width={20}
              height={20}
              className="object-contain"
            />
            <span className="text-xs text-[#64748B]">{transaction.asset}</span>
          </div>
        </div>
        <span className="text-xs text-[#94A3B8]">{transaction.timestamp}</span>
      </div>
    </div>
  );
}
