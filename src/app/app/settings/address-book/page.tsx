"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import DeleteAddressbookConfirmationModal from "./(components)/DeleteAddressbookConfirmationModal";

interface CryptoAddress {
  id: string;
  cryptoType: string;
  cryptoName: string;
  walletAddress: string;
  createdAt: string;
}

export default function AddressBook() {
  const [addresses, setAddresses] = useState<CryptoAddress[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null);

  // Generate random mock data
  const generateMockAddresses = (): CryptoAddress[] => {
    const cryptoTypes = [
      { type: "BTC", name: "Bitcoin" },
      { type: "ETH", name: "Ethereum" },
      { type: "USDT", name: "Tether" },
      { type: "BNB", name: "Binance Coin" },
      { type: "SOL", name: "Solana" },
      { type: "XRP", name: "Ripple" },
      { type: "ADA", name: "Cardano" },
      { type: "DOGE", name: "Dogecoin" },
    ];

    return Array.from({ length: 8 }, (_, index) => {
      const crypto =
        cryptoTypes[Math.floor(Math.random() * cryptoTypes.length)];
      return {
        id: `address-${index + 1}`,
        cryptoType: crypto.type,
        cryptoName: crypto.name,
        walletAddress: generateWalletAddress(crypto.type),
        createdAt: new Date(
          Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
        ).toISOString(),
      };
    });
  };

  // Generate realistic wallet addresses based on crypto type
  const generateWalletAddress = (cryptoType: string): string => {
    const prefixes: { [key: string]: string } = {
      BTC: "1",
      ETH: "0x",
      USDT: "0x",
      BNB: "bnb",
      SOL: "Solana",
      XRP: "r",
      ADA: "addr1",
      DOGE: "D",
    };

    const prefix = prefixes[cryptoType] || "0x";
    const chars = "0123456789abcdefABCDEF";
    let address = prefix;

    // Generate random characters after prefix
    for (let i = 0; i < (cryptoType === "BTC" ? 33 : 39); i++) {
      address += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return address;
  };

  // Load mock addresses on component mount
  useEffect(() => {
    const mockAddresses = generateMockAddresses();
    setAddresses(mockAddresses);

    // Also check localStorage for saved addresses
    const savedAddresses = localStorage.getItem("cryptoAddresses");
    if (savedAddresses) {
      setAddresses(JSON.parse(savedAddresses));
    } else {
      localStorage.setItem("cryptoAddresses", JSON.stringify(mockAddresses));
    }
  }, []);

  const handleAddAddressClick = (): void => {
    // Navigate to add address form or open modal
    console.log("Add new address clicked");
    // router.push("/app/wallet/add-address");
  };

  const handleRemoveAddressClick = (id: string): void => {
    setAddressToDelete(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async (): Promise<void> => {
    if (!addressToDelete) return;

    setIsDeleting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Delete address from localStorage
      const updatedAddresses = addresses.filter(
        (address) => address.id !== addressToDelete
      );
      setAddresses(updatedAddresses);
      localStorage.setItem("cryptoAddresses", JSON.stringify(updatedAddresses));

      console.log("Address deleted:", addressToDelete);

      // Close modal
      setShowDeleteModal(false);
      setAddressToDelete(null);
    } catch (error) {
      console.error("Error deleting address:", error);
      alert("Error deleting address. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = (): void => {
    setShowDeleteModal(false);
    setAddressToDelete(null);
  };

  const copyToClipboard = (address: string): void => {
    navigator.clipboard.writeText(address).then(() => {
      // You can add a toast notification here
      alert("Address copied to clipboard!");
    });
  };

  return (
    <>
      <section className="rounded-xl border border-[#e5e7eb] bg-white shadow-sm">
        <div className="block md:flex items-center justify-between gap-4 px-4 sm:px-6 py-4 border-b border-[#eef2f7]">
          <div className="block items-center justify-between gap-4">
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-[#1f2937]">
                Address book {addresses.length > 0 && `(${addresses.length})`}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddAddressClick}
            className="inline-flex items-center gap-2 rounded-full border mt-4 md:mt-0 px-4 py-2 text-sm font-medium text-[#5E2A8C] border-[#5E2A8C] hover:bg-[#5E2A8C] hover:text-white active:bg-[#4c1d95] transition-colors"
            aria-label="Add new crypto address"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M12 5v14M5 12h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Add Address
          </button>
        </div>

        {/* Conditional rendering based on whether addresses exist */}
        {addresses.length === 0 ? (
          // Empty state
          <div className="px-4 sm:px-6 py-10 sm:py-16">
            <div className="mx-auto flex max-w-md flex-col items-center text-center">
              <Image
                src="/scope.png"
                alt="Empty addresses"
                width={180}
                height={150}
                className="h-auto w-[126px] sm:w-[180px]"
              />
              <h3 className="mt-6 text-sm sm:text-base font-semibold text-[#111827]">
                No crypto addresses saved
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#6b7280]">
                Add your first cryptocurrency wallet address to get started
              </p>
            </div>
          </div>
        ) : (
          // Addresses list
          <div className="p-6">
            <div className="grid gap-6 md:grid-cols-2">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-200 bg-white hover:border-[#5E2A8C] hover:border-2"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                        {address.cryptoName}
                      </h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                        {address.cryptoType}
                      </span>
                    </div>
                    <button
                      onClick={() => handleRemoveAddressClick(address.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors p-1 rounded"
                      aria-label={`Remove ${address.cryptoName} address`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mb-2">
                    <label className="text-xs font-medium text-gray-500 mb-1 block">
                      Wallet Address
                    </label>
                    <div
                      className="text-gray-800 text-sm font-mono bg-gray-50 p-2 rounded border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => copyToClipboard(address.walletAddress)}
                      title="Click to copy address"
                    >
                      {address.walletAddress.length > 20
                        ? `${address.walletAddress.substring(0, 20)}...${address.walletAddress.substring(address.walletAddress.length - 8)}`
                        : address.walletAddress}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Click address to copy
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Show message when using mock data */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Showing {addresses.length} address
                {addresses.length !== 1 ? "es" : ""}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Delete Confirmation Modal */}
      <DeleteAddressbookConfirmationModal
        isOpen={showDeleteModal}
        isDeleting={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
}
