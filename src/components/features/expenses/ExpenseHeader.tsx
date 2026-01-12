"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { X, Check } from "lucide-react";

export default function ExpenseHeader({
  title = "Expense details",
  status = "Pending",
  onApprove,
  onReject,
}: {
  title?: string;
  status?: "Pending" | "Approved" | "Rejected";
  onApprove?: () => void;
  onReject?: () => void;
}) {
  const showActions = status === "Pending";

  return (
    <div className="w-full bg-white p-5 flex items-start justify-between gap-4">
      <div>
        <Link
          href="/app/finance"
          className="inline-flex items-center gap-2 text-sm text-[#6b7280] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Link>

        <div className="w-full flex justify-between">
          <h2 className="mt-4 text-2xl font-semibold text-[#111827]">
            {title}
          </h2>
        </div>
      </div>
      {showActions ? (
        <div className="sm:flex justify-end mt-4 hidden">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onReject?.()}
              className="rounded-lg cursor-pointer border flex items-center gap-1 border-[#5E2A8C] bg-white px-6 py-3 text-sm text-[#5E2A8C]"
            >
              Reject
              <X width={20} height={20} />
            </button>
            <button
              type="button"
              onClick={() => onApprove?.()}
              className="rounded-lg cursor-pointer flex items-center gap-1 bg-[#5E2A8C] px-6 py-3 text-sm text-white"
            >
              Approve
              <Check width={20} height={20} />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
