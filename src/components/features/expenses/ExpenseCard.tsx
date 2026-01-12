"use client";

import Image from "next/image";
import Link from "next/link";
import StatusBadge from "./StatusBadge";

export default function ExpenseCard({
  title = "Electricity and data",
  category = "Software & Tools",
  amount = "42 USDT",
  expenseDate = "25th Oct 2025",
  submittedOn = "25th Oct 2025",
  description = "Monthly subscription for design and creative tools used for client deliverables.",
  attachment = "File_name.pdf",
  status = "Pending",
}: {
  title?: string;
  category?: string;
  amount?: string;
  expenseDate?: string;
  submittedOn?: string;
  description?: string;
  attachment?: string;
  status?: "Pending" | "Approved" | "Rejected";
}) {
  return (
    <div className="rounded-xl border border-[#e5e7eb] bg-white p-6">
      <div className="flex items-start justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="rounded-lg bg-[#F3EBF9] p-3">
            <Image src="/bills.svg" alt="icon" width={28} height={28} />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#111827]">{title}</h3>
            <p className="text-sm text-[#6b7280]">{category}</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="text-left">
            <div className="text-sm text-[#6b7280]">Status</div>
            <div className="mt-1">
              <StatusBadge status={status} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="col-span-3 w-full">
          <div className="w-full flex justify-between bg-[#f9fafb] p-1 px-2 text-sm text-[#6b7280]">
            <div className="rounded-md font-semibold bg-[#f9fafb] text-sm text-[#6b7280]">
              Amount
            </div>
            <div className="rounded-md font-semibold bg-[#f9fafb] text-sm text-[#6b7280]">
              Expense date
            </div>
          </div>
          <div className="mt-2 text-base flex justify-between p-1 px-2 font-medium text-[#111827]">
            <div className="text-sm font-semibold text-[#17171C]">{amount}</div>
            <div className="text-sm font-semibold text-[#17171C]">
              {expenseDate}
            </div>
          </div>

          <div className="mt-4 w-full flex justify-between bg-[#f9fafb] p-1 px-2 text-sm text-[#6b7280]">
            Description
          </div>
          <p className="mt-2 text-sm font-semibold text-[#17171C] p-1 px-2">
            {description}
          </p>

          <div className="mt-2 w-full flex justify-between bg-[#f9fafb] p-1 px-2 text-sm text-[#6b7280]">
            <div className="rounded-md font-semibold bg-[#f9fafb] text-sm text-[#6b7280]">
              Attachment
            </div>
            <div className="rounded-md bg-[#f9fafb] font-semibold text-sm text-[#6b7280]">
              Submitted on
            </div>
          </div>
          <div className="mt-2 text-base flex justify-between p-1 px-2 font-medium text-[#111827]">
            <div className="text-sm font-semibold text-[#17171C]">
              <Link href="#" className="text-sm font-medium text-[#5E2A8C]">
                {attachment}
              </Link>
            </div>
            <div className="text-sm font-semibold text-[#17171C]">
              {submittedOn}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
