// components/finance/address-book-modal.tsx
"use client";

import React, { useState } from "react";
import { X, Search, Plus } from "lucide-react";
import Image from "next/image";
import empty from "../../../public/images/search-payroll.png";

// Mock saved addresses - Empty array to show empty state
const MOCK_SAVED_ADDRESSES: Array<{
  id: number;
  name: string;
  address: string;
  network: string;
}> = []; // Empty array to show empty state

interface AddressBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAddress: (address: string) => void;
  onOpenAddAddress: () => void;
}

export function AddressBookModal({
  isOpen,
  onClose,
  onSelectAddress,
  onOpenAddAddress,
}: AddressBookModalProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [savedAddresses, setSavedAddresses] = useState(MOCK_SAVED_ADDRESSES);

  const handleDeleteAddress = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedAddresses(savedAddresses.filter((addr) => addr.id !== id));
  };

  // Filter addresses based on search query
  const filteredAddresses = savedAddresses.filter(
    (address) =>
      address.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      address.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hasAddresses = savedAddresses.length > 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg mx-auto max-h-[80vh] flex flex-col">
        {/* Header with X button on left and title centered */}
        <div className="relative flex items-center justify-center p-6 min-h-[80px]">
          {/* X Button - Top Left */}
          <button
            onClick={onClose}
            className="absolute left-6 top-1/2 text-black -translate-y-1/2 h-8 w-8 rounded-full hover:bg-gray-100 flex items-center justify-center"
          >
            <X className="h-7 w-7" />
          </button>

          {/* Centered Title */}
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Address Book
            </h2>
          </div>

          {/* Add Address Button - Top Right (only when there are addresses) */}
          {hasAddresses && (
            <button
              onClick={() => {
                onClose();
                onOpenAddAddress();
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-sm text-purple-900 hover:text-purple-700 font-medium flex items-center gap-1"
            >
              <Plus className="h-4 w-4" />
              Add Address
            </button>
          )}
        </div>

        {/* Search Bar - ALWAYS SHOWING */}
        <div className="px-8 ">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-900 focus:border-transparent"
              disabled={!hasAddresses} // Disable when no addresses
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {hasAddresses ? (
            filteredAddresses.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-24 h-24 mx-auto mb-4 relative">
                  {/* Add your empty state image here */}
                  <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center">
                    <Search className="h-12 w-12 text-gray-400" />
                  </div>
                </div>
                <p className="text-gray-500">No addresses found</p>
                {searchQuery && (
                  <p className="text-sm text-gray-400 mt-2">
                    Try a different search term
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredAddresses.map((address) => (
                  <div
                    key={address.id}
                    onClick={() => {
                      onSelectAddress(address.address);
                      onClose();
                    }}
                    className="p-4 border border-gray-200 rounded-lg hover:border-purple-900 hover:bg-purple-50 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                            <span className="text-purple-900 font-medium">
                              {address.name.charAt(0)}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-gray-900 truncate">
                                {address.name}
                              </h3>
                              <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                                {address.network}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 font-mono truncate mt-1">
                              {address.address}
                            </p>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={(e) => handleDeleteAddress(address.id, e)}
                        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 p-1 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            // Empty state when no addresses exist
            <div className="flex flex-col items-center justify-center h-full py-8">
              <div className="w-32 h-32 relative mb-6">
                {/* Add your empty state image here */}
                <div className="w-full h-full  rounded-full flex items-center justify-center">
                  <Image
                    src={empty}
                    width={100}
                    height={100}
                    alt="no-address"
                  />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                No addresses saved yet
              </h3>
              <p className="text-gray-500 text-center mb-8 max-w-xs">
                Save your go-to crypto addresses so sending funds is faster and
                safer.
              </p>
            </div>
          )}
        </div>

        {/* Footer with Add Address button (only when NO addresses) */}
        {!hasAddresses && (
          <div className=" p-6">
            <button
              onClick={() => {
                onClose();
                onOpenAddAddress();
              }}
              className="w-full py-3 bg-purple-900 hover:bg-purple-800 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Your First Address
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
