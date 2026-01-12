"use client";

import { InvoiceStatus } from "@/types/interface";
import { ArrowDown, ExportIcon } from "@/components/shared/icons";

interface InvoiceDetailFooterProps {
  onApprove: () => void;
  onPayment: () => void;
  onExport?: () => void;
  onReject: () => void;
  status: InvoiceStatus;
  showButton: boolean;
}

const InvoiceDetailFooter = ({
  onApprove,
  status,
  onExport,
  showButton,
  onPayment,
  onReject,
}: InvoiceDetailFooterProps) => {
  const isApprove = status === "Approved";

  return (
    <section className="bg-white py-4 px-6 fixed w-full bottom-0 lg:hidden block">
      {showButton && (
        <div className="static flex items-center w-full gap-2 sm:gap-4 lg:gap-2 lg:w-fit">
          <button
            aria-label="reject button"
            className="flex items-center justify-center w-full gap-1 px-4 py-2 font-medium transition duration-150 ease-in-out border rounded-full outline-none cursor-pointer text-primary-500 border-primary-500  lg:w-fit h-14 lg:h-10"
            onClick={onReject}
            type="button"
          >
            Reject
          </button>
          <button
            onClick={onApprove}
            type="button"
            className="flex items-center justify-center w-full gap-1 px-4 py-2 font-medium text-white transition duration-150 ease-in-out border-0 rounded-full outline-none cursor-pointer h-14 lg:h-10 bg-primary-500 lg:w-fit"
          >
            Approve
          </button>
        </div>
      )}

      {!showButton && status !== "Pending" && status !== "Rejected" && (
        <div className="static flex items-center w-full gap-2 px-4 sm:px-0 sm:gap-4 lg:gap-2 lg:w-fit">
          <button
            aria-label="reject button"
            className={
              "flex items-center justify-center gap-2 px-4 py-2 font-medium transition duration-150 ease-in-out border rounded-full outline-none cursor-pointer text-primary-500 border-primary-500  h-14 lg:h-10 " +
              (!isApprove ? "w-fit px-9 self-end ml-auto" : "w-full")
            }
            onClick={onExport}
            type="button"
          >
            <ExportIcon />

            <span className="text-primary-200">Export</span>
            <ArrowDown />
          </button>

          {isApprove && (
            <button
              onClick={onPayment}
              type="button"
              className="flex items-center justify-center w-full gap-1 px-4 py-2 font-medium text-white transition duration-150 ease-in-out border-0 rounded-full outline-none cursor-pointer h-14 lg:h-10 bg-primary-500 lg:w-fit"
            >
              Make payment
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default InvoiceDetailFooter;
