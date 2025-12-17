"use client";

import React from "react";
import { X, Copy, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Transaction } from "@/types/finance.types";
import Image from "next/image";

interface TransactionDetailsModalProps {
  transaction: Transaction | null;
  isOpen: boolean;
  onClose: () => void;
}

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

export function TransactionDetailsModal({
  transaction,
  isOpen,
  onClose,
}: TransactionDetailsModalProps) {
  if (!isOpen || !transaction) return null;

  const transactionType = transaction.type || "Transfer";

  // Get icon path for the asset
  const iconPath = assetIcons[transaction.asset] || DEFAULT_ICON;
  const iconAlt = `${transaction.asset} icon`;

  const network = transaction.network || "Ethereum";

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const shareReceipt = () => {
    if (navigator.share) {
      navigator.share({
        title: `Transaction ${transaction.id}`,
        text: `Transaction details for ${transaction.id}`,
        url: window.location.href,
      });
    } else {
      copyToClipboard(
        `Transaction ID: ${transaction.id}\nAmount: ${transaction.amount}\nStatus: ${transaction.status}`
      );
    }
  };

  const invoiceNumber = `INV-${transaction.id.substring(2, 10).toUpperCase()}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md md:max-w-lg mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center p-2">
          <div className="">
            <button
              onClick={onClose}
              className="h-8 w-8 rounded-full text-black hover:bg-gray-100"
            >
              <X className="h-8 w-8" />
            </button>
          </div>

          <div className="flex-5 flex justify-center">
            <div className="px-3 py-1 rounded-full text-2xl text-black font-medium">
              {transactionType}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 mx-4 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Details Grid */}
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="flex items-center justify-center gap-2">
                <Image
                  src={iconPath}
                  alt={iconAlt}
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
              <p className="text-lg font-semibold text-gray-900">
                {transaction.amount}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 bg-[#F5F6F7] py-1 pl-2 mb-1">
                  Network
                </p>
                <p className="text-gray-900 font-medium">{network}</p>
              </div>
              <div className="flex flex-col items-end flex-shrink-0">
                <p className="text-sm text-gray-500 bg-[#F5F6F7] py-1 pl-18 mb-1">
                  Status
                </p>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    transaction.status === "Successful"
                      ? "bg-green-100 text-green-800"
                      : transaction.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {transaction.status.charAt(0).toUpperCase() +
                    transaction.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2">
              <div className="">
                <p className="text-sm text-gray-500 bg-[#F5F6F7] py-1 pl-2 mb-1">
                  {transactionType === "Deposit" ? "From" : "To"}
                </p>
                <div className="flex items-center gap-2">
                  <p className="flex-1 text-black font-mono text-sm  truncate">
                    {transactionType === "Deposit"
                      ? "0x8fB5...a7c3"
                      : "0x742d35Cc6634C0532925a3b844Bc9e...e37e05"}
                  </p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      copyToClipboard(
                        transactionType === "Deposit"
                          ? "0x8fB5a7c3"
                          : "0x742d35Cc6634C0532925a3b844Bc9ee37e05"
                      )
                    }
                    className="h-8 w-8 text-[#5E2A8C]"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-col items-end flex-shrink-0">
                <p className="text-sm text-gray-500 bg-[#F5F6F7] py-1 pl-22 mb-1">
                  {transactionType === "Deposit" ? "Description" : "Fee"}
                </p>
                <p className="text-gray-900 font-medium">
                  {transactionType === "Deposit"
                    ? transaction.description
                    : transaction.fee}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 bg-[#F5F6F7] py-1 pl-2 mb-1">
                  {" "}
                  ID
                </p>
                <div className="flex items-center ">
                  <code className="flex-1 font-mono text-sm text-black  p-2 rounded truncate">
                    {transaction.id}
                  </code>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(transaction.id)}
                    className="h-8 w-8 text-[#5E2A8C]"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col items-end flex-shrink-0">
                <p className="text-sm text-gray-500 bg-[#F5F6F7] py-1 pl-10 mb-1">
                  Timestamp
                </p>
                <p className="text-gray-900">{transaction.timestamp}</p>
              </div>
            </div>

            {transactionType === "Invoice" && (
              <>
                <div className="grid grid-cols-2">
                  <div>
                    <p className="text-sm text-gray-500 bg-[#F5F6F7] py-1 pl-2 mb-1">
                      Contract
                    </p>
                    <p className="text-gray-900">
                      Brightfolk payment for contract
                    </p>
                  </div>

                  <div className="flex flex-col items-end flex-shrink-0">
                    <p className="text-sm text-gray-500 bg-[#F5F6F7] py-1 pl-10 mb-1">
                      Contract Type
                    </p>
                    <p className="text-gray-900">Fixed</p>
                  </div>
                </div>

                <div className="grid grid-cols-2">
                  <div>
                    <p className="text-sm text-gray-500 bg-[#F5F6F7] py-1 pl-2 mb-1">
                      Invoice Number
                    </p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 font-mono text-sm text-black p-2 rounded">
                        {invoiceNumber}
                      </code>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(invoiceNumber)}
                        className="h-8 w-8 text-[#5E2A8C]"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end flex-shrink-0">
                    <p className="text-sm text-gray-500 bg-[#F5F6F7] py-1 pl-10 mb-1">
                      Employee
                    </p>
                    <p className="text-gray-900">Random Name</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col mb-2 mx-8  sm:flex-row gap-3">
          <button
            onClick={shareReceipt}
            className="flex-1 flex items-center rounded-2xl p-4 mb-4 justify-center gap-2 p bg-[#5E2A8C] "
          >
            <Share2 className="h-4 w-4" />
            Share Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
