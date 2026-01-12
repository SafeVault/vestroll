"use client";

import { ArrowLeft, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { InvoiceStatus } from "@/types/interface";
import { ArrowDown, CancelIcon, ExportIcon } from "@/components/shared/icons";

interface InvoiceHeaderProps {
  title: string;
  showCtaButton?: boolean;
  status?: InvoiceStatus;
  onApprove?: () => void;
  handlePayment?: () => void;
  handleExport?: () => void;
  handleReject?: () => void;
}
function InvoiceHeader({
  title,
  showCtaButton,
  onApprove,
  handleReject,
  handleExport,
  handlePayment,
  status,
}: InvoiceHeaderProps) {
  const router = useRouter();

  const handleBackButton = () => {
    router.back();
  };

  const isApprove = status === "Approved";

  return (
    <section className="sticky top-0 bg-white border-b z-5 border-border-primary">
      <div className="flex items-center justify-between px-4 py-6">
        <div className="pb-1 space-y-1">
          <button
            onClick={handleBackButton}
            className="flex items-center gap-1 text-xs font-medium text-gray-300 transition-colors duration-150 ease-in-out cursor-pointer hover:text-gray-200"
          >
            <span>
              <ArrowLeft size={16} />
            </span>
            Back
          </button>

          <div className="flex items-center justify-between gap-4">
            <h1 className="overflow-hidden text-2xl font-bold tracking-tight text-gray-600 truncate max-w-44 xs:max-w-56 whitespace-nowrap sm:text-4xl sm:max-w-full">
              {title}
            </h1>
          </div>
        </div>
        {showCtaButton && (
          <div className="hidden lg:flex gap-2">
            <button
              onClick={handleReject}
              className="px-4 py-2 text-sm font-medium text-primary-500  border border-primary-500  rounded-xl space-x-1 cursor-pointer flex items-center"
            >
              <span>Reject</span>
              <CancelIcon />
            </button>
            <button
              onClick={onApprove}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-xl hover:bg-primary-500/90 flex items-center gap-1 cursor-pointer"
            >
              <span>Approve</span>
              <Check height={16} width={16} />
            </button>
          </div>
        )}

        {!showCtaButton && status !== "Pending" && (
          <div className="static hidden lg:flex items-center w-full gap-2 px-4 sm:px-0 sm:gap-4 lg:gap-2 lg:w-fit">
            <button
              aria-label="reject button"
              className=" rounded-xl h-10 text-primary-500 border border-primary-500 text-sm font-medium capitalize px-4 py-2 flex items-center gap-1 cursor-pointer"
              onClick={handleExport}
              type="button"
            >
              <ExportIcon />
              <span className="text-primary-200">Export</span>
              <ArrowDown />
            </button>

            {isApprove && (
              <button
                onClick={handlePayment}
                type="button"
                className="flex items-center justify-center w-full gap-1 px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out border-0 rounded-xl outline-none cursor-pointer h-14 lg:h-10 bg-primary-500 lg:w-fit"
              >
                Make payment
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default InvoiceHeader;
