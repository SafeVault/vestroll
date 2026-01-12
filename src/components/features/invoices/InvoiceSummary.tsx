"use client";

import Image from "next/image";
import BilledSection from "./BilledSection";
import InvoiceDetailsSection from "./InvoiceDetailsSection";
import { Invoice } from "@/data/invoices";
import InvoiceFooterSection from "./InvoiceFooterSection";

interface InvoiceSummaryProps {
  id: string;
  amount: number;
  currency: string;
  convertedValue: string;
  iconSrc?: string;
  invoice: Invoice;
}

export default function InvoiceSummary({
  id,
  amount,
  currency,
  convertedValue,
  iconSrc = "/invoice-summary-icon.png",
  invoice,
}: InvoiceSummaryProps) {
  return (
    <section className="max-w-[852px] mx-auto px-4 sm:px-6 md:px-0 space-y-3 sm:space-y-5">
      {/* Summary Card */}
      <div className="rounded-2xl border border-[#E9EAF0] bg-white shadow-sm px-8 sm:px-10 py-5 flex flex-col items-center text-center">
        <Image
          src={iconSrc}
          alt="Invoice"
          width={100}
          height={100}
          priority
          className="mx-auto block"
        />

        <h2 className="mt-3 text-[20px] sm:text-[22px] font-semibold text-[#17171C]">
          {amount} {currency}
        </h2>

        <p className="mt-2 text-[15px] sm:text-[16px] text-[#5D6B82]">
          ≈{convertedValue}
        </p>
      </div>

      <BilledSection />

      {/* Pass down invoice object */}
      <InvoiceDetailsSection invoice={invoice} />

      <div className="rounded-2xl border border-[#E9EAF0] bg-white shadow-sm p-5 sm:p-6 w-full max-w-[852px] mx-auto">
      <span className="inline-block bg-[#EAE6F7] text-[#6B5CD6] text-[11px] sm:text-xs font-medium px-2.5 py-1 rounded-md mb-3">
        Payment Memo
      </span>

      <p className="text-[#17171C] text-[13px] sm:text-[14px] leading-relaxed">
        Thank you for your business. Please remit payment according to the terms
        outlined in this invoice. If you have any questions regarding this
        invoice or the payment process, do not hesitate to contact us.
      </p>
    </div>

    <InvoiceFooterSection />
    </section>
  );
}
