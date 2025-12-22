// components/finance/add-address-modal.tsx
"use client";

import React, { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MOCK_ASSETS } from "@/lib/mock-data";
import Image from "next/image";

interface AddAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (address: string, network: string) => void;
}

export function AddAddressModal({
  isOpen,
  onClose,
  onSave,
}: AddAddressModalProps) {
  const [addressWallet, setAddressWallet] = useState<string>("");
  const [selectedAsset, setSelectedAsset] = useState<string>("USDT");
  const [selectedNetwork, setSelectedNetwork] = useState<string>("Ethereum");
  const [showAssetDropdown, setShowAssetDropdown] = useState<boolean>(false);
  const [showNetworkDropdown, setShowNetworkDropdown] =
    useState<boolean>(false);

  const networks = ["Ethereum", "Polygon", "Arbitrum", "Optimism", "Stellar"];

  const selectedAssetDetails =
    MOCK_ASSETS.find((a) => a.symbol === selectedAsset) || MOCK_ASSETS[0];

  const handleCreateAddress = () => {
    onSave(addressWallet, selectedNetwork);
    setAddressWallet("");
    setSelectedAsset("USDT");
    setSelectedNetwork("Ethereum");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-auto">
        {/* Header with X on left and title centered */}
        <div className="relative flex items-center justify-center p-6 border-b border-gray-200 min-h-[80px]">
          {/* X Button - Top Left */}
          <button
            onClick={onClose}
            className="absolute left-6 top-1/2 text-black -translate-y-1/2 h-8 w-8 rounded-full hover:bg-gray-100 flex items-center justify-center"
          >
            <X className="h-8 w-8" />
          </button>

          {/* Centered Title */}
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Add New Address
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
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
            </div>

            {/* Wallet Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Wallet Address
              </label>
              <textarea
                value={addressWallet}
                onChange={(e) => setAddressWallet(e.target.value)}
                placeholder="0x742d35Cc6634C0532925a3b844Bc9e...e37e05"
                rows={3}
                className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-purple-900 focus:border-transparent"
              />
            </div>
          </form>
        </div>

        {/* Footer - Only Create Address button */}
        <div className="border-t border-gray-200 p-6">
          <Button
            type="button"
            onClick={handleCreateAddress}
            className="w-full py-3 bg-purple-900 hover:bg-purple-800 text-white"
            disabled={!addressWallet}
          >
            Create Address
          </Button>
        </div>
      </div>

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
