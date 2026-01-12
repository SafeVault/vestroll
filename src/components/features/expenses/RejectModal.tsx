"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function RejectModal({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}) {
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (!open) setReason("");
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal - mobile-first full-height, desktop becomes centered card */}
      <div className="relative z-10 w-full h-full sm:h-auto sm:max-w-md sm:rounded-2xl bg-white flex flex-col">
        {/* Top bar: close icon left, title centered */}
        <div className="flex items-center justify-center border-b border-gray-100 p-4">
          <button
            type="button"
            onClick={onClose}
            className="absolute left-4 top-4 text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="hidden sm:block text-center text-lg font-semibold">
            Reject expense
          </div>
          <div className="text-center sm:hidden text-lg font-semibold">
            Reason for rejection
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <label className="sm:block hidden text-sm font-medium text-gray-700">
            Reason
          </label>
          <label className="block sm:hidden text-sm font-medium text-gray-700">
            Reason(s)
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="--"
            className="mt-2 h-40 w-full max-w-full rounded-md border border-gray-100 bg-gray-50 p-3 text-sm focus:outline-none resize-none"
          />
        </div>

        <div className="p-4">
          <button
            type="button"
            onClick={() => onConfirm(reason)}
            className="w-full cursor-pointer rounded-2xl bg-[#5E2A8C] px-4 py-3 text-sm text-white"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
