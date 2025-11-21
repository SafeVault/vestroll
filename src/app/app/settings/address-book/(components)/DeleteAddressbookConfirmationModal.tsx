import React from "react";
import { X } from "lucide-react";
import Image from "next/image";
import warning from "../../../../../../public/images/deletewarn.png";

interface DeleteAddressbookConfirmationModalProps {
  isOpen: boolean;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteAddressbookConfirmationModal({
  isOpen,
  isDeleting,
  onConfirm,
  onCancel,
}: DeleteAddressbookConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-black/70  flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onCancel}
            className="text-gray-900 font-extrabold hover:text-gray-600 transition-colors"
            disabled={isDeleting}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6 mt-15 flex flex-col items-center justify-center text-center">
          <Image src={warning} alt="warning" />
          <h1 className="mt-10 text-gray-900 text-4xl items-center justify-center font-bold mb-4">
            Remove Address
          </h1>
          <p className="text-gray-600 mx-20">
            You&apos;re about to delete the address ? This action cannot be
            undone.
          </p>
        </div>

        <div className="flex items-center justify-center space-x-3">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="px-20 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-20 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isDeleting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
