// app/finance/withdraw/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MOCK_ASSETS } from "@/lib/mock-data";
import Image from "next/image";
import { AddressBookModal } from "@/components/finance/addressbook-modal";
import { AddAddressModal } from "@/components/finance/add-address-modal";

export default function WithdrawPage() {
  const router = useRouter();
  const [selectedAsset, setSelectedAsset] = useState<string>("USDT");
  const [selectedNetwork, setSelectedNetwork] = useState<string>("Ethereum");
  const [amount, setAmount] = useState<string>("");
  const [recipientAddress, setRecipientAddress] = useState<string>("");
  const [showAssetDropdown, setShowAssetDropdown] = useState<boolean>(false);
  const [showNetworkDropdown, setShowNetworkDropdown] =
    useState<boolean>(false);
  const [showAddressBookModal, setShowAddressBookModal] =
    useState<boolean>(false);
  const [showAddAddressModal, setShowAddAddressModal] =
    useState<boolean>(false);

  const handleGoBack = () => {
    router.back();
  };

  const handleContinue = () => {
    // Navigate to confirmation page with data as URL params
    const params = new URLSearchParams({
      asset: selectedAsset,
      network: selectedNetwork,
      amount: amount,
      address: recipientAddress,
    });

    router.push(`/app/finance/withdraw/confirm?${params.toString()}`);
  };

  const handleMax = () => {
    const asset = MOCK_ASSETS.find((a) => a.symbol === selectedAsset);
    if (asset) {
      setAmount(asset.balance.replace("$", ""));
    }
  };

  const handleSaveAddress = (address: string, network: string) => {
    console.log("Address saved:", { name, address, network });
    setShowAddAddressModal(false);
  };

  const networks = ["Ethereum", "Polygon", "Arbitrum", "Optimism", "Stellar"];

  const selectedAssetDetails =
    MOCK_ASSETS.find((a) => a.symbol === selectedAsset) || MOCK_ASSETS[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-5 md:px-6 lg:px-2">
        <div className="max-w-[1400px] mx-2">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-gray-500 text-sm mb-4 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
            Withdraw
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 md:p-6 lg:p-8">
        <div className="max-w-xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Withdrawal Details
            </h2>

            <form className="space-y-6">
              {/* Asset Selection Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Asset
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAssetDropdown(!showAssetDropdown);
                      setShowNetworkDropdown(false);
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg flex items-center justify-between hover:border-gray-400 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: selectedAssetDetails.bgColor
                            .replace("bg-[", "")
                            .replace("]", ""),
                        }}
                      >
                        <Image
                          width={20}
                          height={20}
                          src={selectedAssetDetails.icon}
                          alt={selectedAssetDetails.symbol}
                          className="w-4 h-4"
                        />
                      </div>
                      <div className="text-left">
                        <span className="font-medium text-gray-900 block">
                          {selectedAssetDetails.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {selectedAssetDetails.symbol}
                        </span>
                      </div>
                    </div>
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </button>

                  {/* Asset Dropdown Menu */}
                  {showAssetDropdown && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {MOCK_ASSETS.map((asset) => (
                        <button
                          key={asset.id}
                          type="button"
                          onClick={() => {
                            setSelectedAsset(asset.symbol);
                            setShowAssetDropdown(false);
                          }}
                          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                        >
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{
                              backgroundColor: asset.bgColor
                                .replace("bg-[", "")
                                .replace("]", ""),
                            }}
                          >
                            <Image
                              width={20}
                              height={20}
                              src={asset.icon}
                              alt={asset.name}
                              className="w-4 h-4"
                            />
                          </div>
                          <span className="font-medium text-gray-900">
                            {asset.name}
                          </span>
                          {selectedAsset === asset.symbol && (
                            <div className="ml-auto">
                              <div className="w-2 h-2 rounded-full bg-purple-900"></div>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Network Selection Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Network
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setShowNetworkDropdown(!showNetworkDropdown);
                      setShowAssetDropdown(false);
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg flex items-center justify-between hover:border-gray-400 transition-colors"
                  >
                    <span className="font-medium text-gray-900">
                      {selectedNetwork}
                    </span>
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </button>

                  {/* Network Dropdown Menu */}
                  {showNetworkDropdown && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                      {networks.map((network) => (
                        <button
                          key={network}
                          type="button"
                          onClick={() => {
                            setSelectedNetwork(network);
                            setShowNetworkDropdown(false);
                          }}
                          className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                        >
                          <span className="text-gray-900">{network}</span>
                          {selectedNetwork === network && (
                            <div className="w-2 h-2 rounded-full bg-purple-900"></div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Select the network for withdrawal
                </p>
              </div>

              {/* Amount Input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Amount
                  </label>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Available Balance</p>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedAssetDetails.balance}
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-4 py-3 pl-16 text-black border border-gray-300 rounded-lg text-lg font-medium focus:outline-none focus:ring-2 focus:ring-purple-900 focus:border-transparent"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <span className="text-gray-500">$</span>
                  </div>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <span className="text-gray-900 font-medium">
                      {selectedAsset}
                    </span>
                  </div>
                </div>
                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    onClick={handleMax}
                    className="text-sm text-purple-900 hover:text-purple-700 font-medium"
                  >
                    Use Max
                  </button>
                </div>
              </div>

              {/* Recipient Address with Address Book link */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Send To
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowAddressBookModal(true)}
                    className="text-sm text-purple-900 hover:text-purple-700 font-medium flex items-center gap-1"
                  >
                    <Plus className="h-3 w-3" />
                    Address Book
                  </button>
                </div>
                <input
                  type="text"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  placeholder="0x742d35Cc6634C0532925a3b844Bc9e...e37e05"
                  className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-purple-900 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Enter the recipient&apos;s wallet address
                </p>
              </div>

              {/* Network Fee */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Network Fee
                    </p>
                    <p className="text-xs text-gray-500">
                      Estimated fee for {selectedNetwork} network
                    </p>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">$0.50</p>
                </div>
              </div>

              <div className="mt-30 px-2">
                <Button
                  type="button"
                  onClick={handleContinue}
                  className="w-full p-6 bg-purple-900 hover:bg-purple-800 font-bold text-lg text-white"
                  disabled={!amount || !recipientAddress}
                >
                  Continue
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddressBookModal
        isOpen={showAddressBookModal}
        onClose={() => setShowAddressBookModal(false)}
        onSelectAddress={setRecipientAddress}
        onOpenAddAddress={() => setShowAddAddressModal(true)}
      />

      <AddAddressModal
        isOpen={showAddAddressModal}
        onClose={() => setShowAddAddressModal(false)}
        onSave={handleSaveAddress}
      />

      {/* Close dropdowns when clicking outside */}
      {(showAssetDropdown || showNetworkDropdown) && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => {
            setShowAssetDropdown(false);
            setShowNetworkDropdown(false);
          }}
        />
      )}
    </div>
  );
}
