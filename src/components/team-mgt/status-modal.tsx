'use client';

import { Button } from "../ui/button";
import { useState } from "react";

export const StatusModal = ({
    tabStatus,
    handleStatusModal,
    onConfirm
}: {
    tabStatus: string,
    handleStatusModal: (show: boolean) => void,
    onConfirm: (status: string, reason?: string) => void
}) => {
    const [reason, setReason] = useState("");
    const [error, setError] = useState("");

    const handleReject = () => {
        if (!reason.trim()) {
            setError("Please provide a reason for rejection.");
            return;
        }
        onConfirm("Rejected", reason);
        handleStatusModal(false);
        setReason("");
        setError("");
    };

    const handleClose = () => {
        handleStatusModal(false);
        setReason("");
        setError("");
    };
    return (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50 px-3">
          <div className="bg-white w-full max-w-md rounded-2xl p-4 sm:p-6 relative shadow-lg">
            <div
                className="absolute top-1 left-4 text-gray-900 hover:text-gray-700 cursor-pointer"
                onClick={handleClose}
            >
                <span className="text-2xl">
                    &times;
                </span>
            </div>

            <h3 className="text-base text-center relative bottom-3 sm:text-lg font-semibold mb-4">Reject Milestone</h3>

            <textarea
              className="w-full mt-4 outline-none border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              rows={4}
              placeholder="Enter reason for rejection..."
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                setError("");
              }}
            ></textarea>

            {error && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">{error}</p>
            )}

            <Button
              onClick={handleReject}
              className="w-full mt-5 bg-primary-500 text-white hover:bg-red-700 text-sm sm:text-base"
            >
              Reject
            </Button>
          </div>
        </div>
    );
  };
