"use client";

import React, { useState } from "react";
import { XMarkIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";
import Image from "next/image";
import LogoIcon from "@public/images/logoinvoice.png";

interface PaymentDetail {
  id: string;
  amount: number;
  currency: string;
  date: string;
  status: string;
}

interface InvoiceData {
  invoiceNo: string;
  amount: number;
  currency: string;
  fiatAmount: number;
  status: string;
  network: string;
  to: string;
  fee: string;
  transactionId: string;
  timestamp: string;
  contract: string;
  contractType: string;
  employee: string;
  availablePayments?: PaymentDetail[]; // Optional to avoid showing breakdown
  transactionIds?: string[];
  paymentHashes?: string[];
}

interface InvoiceDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoiceData: InvoiceData;
}

export default function InvoiceDetailsModal({
  isOpen,
  onClose,
  invoiceData,
}: InvoiceDetailsModalProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleSaveReceipt = async () => {
    setIsGeneratingPDF(true);
    try {
      const modalContent = document.getElementById("invoice-modal-content");
      if (modalContent) {
        const imgData = await domtoimage.toPng(modalContent, {
          bgcolor: "#ffffff",
          width: modalContent.scrollWidth,
          height: modalContent.scrollHeight,
        });
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: "a4",
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = modalContent.scrollWidth;
        const imgHeight = modalContent.scrollHeight;
        const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
        const width = imgWidth * ratio;
        const height = imgHeight * ratio;

        pdf.addImage(imgData, "PNG", 0, 0, width, height);
        pdf.save(`receipt-${invoiceData.invoiceNo}.pdf`);
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
        <div className="overflow-y-auto flex-1">
          <div id="invoice-modal-content" className="p-4">
            {/* Header */}
            <div className="flex items-center mb-6">
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors mr-auto"
                aria-label="Close modal"
              >
                <XMarkIcon className="w-8 h-6 text-black hover:text-black" />
              </button>
              <h2 className="text-lg text-center font-bold text-gray-800 w-full pr-12">
                Invoice
              </h2>
            </div>

            {/* Amount Section */}
            <div className="text-center mb-6">
              <div className="mx-auto w-12 h-12 bg-[#00A478] rounded-full flex items-center justify-center text-white text-xl font-bold">
                <Image
                  src={LogoIcon}
                  width={100}
                  alt="USDT Icon"
                  className="w-6 h-6"
                />
              </div>
              <p className="text-2xl font-bold text-red-500 mt-2">
                -{invoiceData.amount} {invoiceData.currency}
              </p>
              <p className="text-gray-500">≈ ${invoiceData.fiatAmount}</p>
            </div>

            {/* Transaction Details */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between bg-gray-100 p-1">
                <span className="text-gray-600">Network</span>
                <span className="text-gray-600">Status</span>
              </div>
              <div className="flex justify-between bg-white">
                <span className="font-medium text-black">
                  {invoiceData.network}
                </span>
                <span className="font-medium text-green-600">
                  • {invoiceData.status}
                </span>
              </div>
              <div className="flex justify-between bg-gray-100 p-1">
                <span className="text-gray-600">To</span>
                <span className="text-gray-600">Fee</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono truncate text-black">
                  {invoiceData.to}
                </span>
                <span className="font-medium text-black">
                  {invoiceData.fee}
                </span>
              </div>
              <div className="flex justify-between bg-gray-100 p-1">
                <span className="text-gray-600">Transaction ID</span>
                <span className="text-gray-600">Timestamp</span>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center">
                  <span className="font-mono truncate text-black">
                    {invoiceData.transactionId}
                  </span>
                  <button
                    onClick={() => handleCopy(invoiceData.invoiceNo, "invoice")}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                    aria-label="Copy invoice number"
                  >
                    <DocumentDuplicateIcon className="w-4 h-4 text-[#5A42DE]" />
                  </button>
                </div>
                <span className="font-medium text-black">
                  {invoiceData.timestamp}
                </span>
              </div>
              <div className="flex justify-between bg-gray-100 p-1">
                <span className="text-gray-600">Contract</span>
                <span className="text-gray-600">Contract Type</span>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center">
                  <span className="font-medium text-black truncate">
                    {invoiceData.contract}
                  </span>
                  <button
                    onClick={() => handleCopy(invoiceData.contract, "contract")}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                    aria-label="Copy contract address"
                  >
                    <svg
                      width="15px"
                      height="15px"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="48"
                        height="48"
                        fill="white"
                        fillOpacity="0.01"
                      />
                      <path
                        d="M26 6H42V22"
                        stroke="#5A42DE"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M42 29.4737V39C42 40.6569 40.6569 42 39 42H9C7.34315 42 6 40.6569 6 39V9C6 7.34315 7.34315 6 9 6L18 6"
                        stroke="#5A42DE"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M25.8 22.2L41.1 6.89999"
                        stroke="#5A42DE"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                <span className="font-medium text-black">
                  {invoiceData.contractType}
                </span>
              </div>
              <div className="flex justify-between bg-gray-100 p-1">
                <span className="text-gray-600">Invoice</span>
                <span className="text-gray-600">Employee</span>
              </div>

              <div className="flex justify-between text-black">
                <div className="flex items-center">
                  <span className="font-medium text-black">
                    {invoiceData.invoiceNo}
                  </span>
                  <button
                    onClick={() =>
                      handleCopy(invoiceData.transactionId, "tx-id")
                    }
                    className="ml-2 text-gray-500 hover:text-gray-700"
                    aria-label="Copy transaction ID"
                  >
                    <svg
                      width="15px"
                      height="15px"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="48"
                        height="48"
                        fill="white"
                        fillOpacity="0.01"
                      />
                      <path
                        d="M26 6H42V22"
                        stroke="#5A42DE"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M42 29.4737V39C42 40.6569 40.6569 42 39 42H9C7.34315 42 6 40.6569 6 39V9C6 7.34315 7.34315 6 9 6L18 6"
                        stroke="#5A42DE"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M25.8 22.2L41.1 6.89999"
                        stroke="#5A42DE"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                <span>{invoiceData.employee}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with Share Receipt Button */}
        <div className="p-4 border-t border-gray-200 bg-white mt-24 md:mt-0">
          <button
            onClick={handleSaveReceipt}
            disabled={isGeneratingPDF}
            className="w-full bg-[#5E2A8C] text-white px-4 py-3 rounded-md font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isGeneratingPDF ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Generating PDF...
              </>
            ) : (
              <>
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 15L12 3M12 15L9 12M12 15L15 12"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 15L3 18C3 19.1046 3.89543 20 5 20L19 20C20.1046 20 21 19.1046 21 18L21 15"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Save Receipt
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
