"use client";

import React, { useMemo } from "react";
import { ArrowLeft, Check, X as Close, Download, CreditCard } from "lucide-react";

export type InvoiceStatus = "Pending" | "Approved" | "Overdue" | "Paid" | "Rejected";

interface Props {
  invoiceId: string; // e.g. "#INV-2025-010"
  status: InvoiceStatus;
  onBack: () => void;
  onApprove?: () => void;
  onReject?: () => void;
  onExport?: () => void;
  onMakePayment?: () => void;
}

export default function InvoiceHeader({
  invoiceId,
  status,
  onBack,
  onApprove,
  onReject,
  onExport,
  onMakePayment,
}: Props) {
  const desktopActions = useMemo(() => {
    const outline =
      "inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium";
    const solid =
      "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white";

    switch (status) {
      case "Pending":
        return (
          <div className="hidden md:flex items-center gap-3">
            <button onClick={onReject} className={`${outline} border-purple-600 text-purple-700 hover:bg-purple-50`}>
              <Close className="h-4 w-4" /> Reject
            </button>
            <button onClick={onApprove} className={`${solid} bg-purple-700 hover:bg-purple-800`}>
              <Check className="h-4 w-4" /> Approve
            </button>
          </div>
        );
      case "Approved":
      case "Overdue":
        return (
          <div className="hidden md:flex items-center gap-3">
            <button onClick={onExport} className={`${outline} border-purple-600 text-purple-700 hover:bg-purple-50`}>
              <Download className="h-4 w-4" /> Export
            </button>
            <button onClick={onMakePayment} className={`${solid} bg-purple-700 hover:bg-purple-800`}>
              <CreditCard className="h-4 w-4" /> Make payment
            </button>
          </div>
        );
      case "Paid":
        return (
          <div className="hidden md:flex items-center gap-3">
            <button onClick={onExport} className={`${outline} border-purple-600 text-purple-700 hover:bg-purple-50`}>
              <Download className="h-4 w-4" /> Export
            </button>
          </div>
        );
      case "Rejected":
      default:
        return null;
    }
  }, [status, onApprove, onReject, onExport, onMakePayment]);

  const mobileActions = useMemo(() => {
    if (status === "Rejected") return null;

    const base = "h-11 rounded-lg text-sm font-medium flex items-center justify-center";
    const outline = `${base} border border-purple-600 text-purple-700 bg-white`;
    const solid = `${base} text-white bg-purple-700`;

    return (
      <div
        className="
          md:hidden fixed inset-x-0 bottom-0 z-40
           border-gray-200 backdrop-blur
          px-4 py-3
          pb-[calc(env(safe-area-inset-bottom)+12px)]
          shadow-[0_-8px_16px_rgba(0,0,0,0.06)]
        "
      >
        {status === "Pending" && (
          <div className="grid grid-cols-2 gap-3">
            <button onClick={onReject} className={outline}>
              <Close className="h-4 w-4 mr-1.5" /> Reject
            </button>
            <button onClick={onApprove} className={solid}>
              <Check className="h-4 w-4 mr-1.5" /> Approve
            </button>
          </div>
        )}

        {(status === "Approved" || status === "Overdue") && (
          <div className="grid grid-cols-2 gap-3">
            <button onClick={onExport} className={outline}>
              <Download className="h-4 w-4 mr-1.5" /> Export
            </button>
            <button onClick={onMakePayment} className={solid}>
              <CreditCard className="h-4 w-4 mr-1.5" /> Make payment
            </button>
          </div>
        )}

        {status === "Paid" && (
          <div className="grid grid-cols-1">
            <button onClick={onExport} className={outline}>
              <Download className="h-4 w-4 mr-1.5" /> Export
            </button>
          </div>
        )}
      </div>
    );
  }, [status, onApprove, onReject, onExport, onMakePayment]);

  const needsMobileSpacer = status !== "Rejected";

  return (
    <>
      <div className="w-full bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex flex-col items-start gap-4">
            <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <h1 className="text-lg font-semibold text-gray-900">{invoiceId}</h1>
          </div>
          {desktopActions}
        </div>
      </div>

      {mobileActions}
      {needsMobileSpacer && <div className="md:hidden sm:h-10" />}
    </>
  );
}
