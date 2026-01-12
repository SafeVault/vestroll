"use client";

import React from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface PermissionsInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  iconSrc?: string; // e.g. "/permission-icon.png"
}

const permissionsDetails = [
  {
    title: "Administrator",
    description:
      "Has full access to view and edit information in all areas of the platform, including both company and engagement data.",
  },
  {
    title: "Team manager",
    description:
      "Can view, add, and edit information relating to members of their team within the Time off and Expenses sections. This role has no access to any other areas or to any information outside of their team.",
  },
  {
    title: "Expenses administrator",
    description:
      "Can view and edit information in the Expenses section. This role has no access to any other areas outside of Expenses.",
  },
  {
    title: "Invoice administrator",
    description:
      "Can view and edit information in the Invoices section. This role can also view the Payroll section but can’t edit information there.",
  },
  {
    title: "Payroll administrator",
    description:
      "Can view and edit information in the Payroll section. This role can also view the Invoices section but can’t edit information there.",
  },
  {
    title: "Time off administrator",
    description:
      "Can view and edit information in the Time off section. This role has no access to other areas of the platform.",
  },
];

export default function PermissionsInfoModal({
  isOpen,
  onClose,
  iconSrc = "/permission-icon.png", // put your image in /public
}: PermissionsInfoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 ">
      {/* Modal panel */}
      <div className="flex h-full w-full flex-col rounded-none bg-white shadow-lg md:h-auto md:w-[480px] md:max-w-lg md:rounded-2xl">
        {/* Header */}
        <div className="relative flex items-center border-b px-6 py-4">
          {/* X always on the left */}
          <button
            onClick={onClose}
            className="absolute left-4 p-1 text-gray-600 hover:text-gray-900"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>

          <h2 className="w-full text-center text-lg font-semibold text-gray-900">
            Permissions
          </h2>
        </div>

        {/* Content area */}
        <div className="no-scrollbar flex-1 overflow-y-auto p-4 space-y-4 md:max-h-[70vh]">
          {permissionsDetails.map((perm) => (
            <div
              key={perm.title}
              className="flex items-start gap-3 rounded-xl bg-gray-50 p-4"
            >
              <Image
                src={iconSrc}
                alt=""
                width={40}
                height={40}
                className="shrink-0"
              />
              <div>
                <p className="font-medium text-gray-900">{perm.title}</p>
                <p className="mt-1 text-sm text-gray-600">{perm.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hide scrollbar cross-browser */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
