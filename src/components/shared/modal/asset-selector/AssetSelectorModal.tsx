"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ArrowLeft, Search } from "lucide-react";

interface Asset {
  id: number;
  name: string;
  symbol: string;
  description: string;
  image: string; 
}

const mockAssets: Asset[] = [
  {
    id: 1,
    name: "No specific asset",
    symbol: "Learn more",
    description: "For Universal addresses",
    image: "/images/global.png",
  },
  {
    id: 2,
    name: "USDC",
    symbol: "Multichain",
    description: "USD Coin",
    image: "/images/usdc.png",
  },
  {
    id: 3,
    name: "USDT",
    symbol: "Multichain",
    description: "Tether USD",
    image: "/images/usdt.png",
  },
];

interface AssetSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AssetSelectorModal({
  isOpen,
  onClose,
}: AssetSelectorModalProps) {
  const [search, setSearch] = useState("");
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  if (!isOpen) return null;

  const filteredAssets = mockAssets.filter(
    (asset) =>
      asset.name.toLowerCase().includes(search.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center lg:p-6">
      <div
        className="
          bg-white w-full h-full 
          lg:h-auto lg:max-h-[90vh] lg:w-[460px] 
          rounded-none lg:rounded-2xl shadow-xl flex flex-col
        "
      >
        <div className="flex items-center justify-center relative border-b p-4">
          <button
            onClick={onClose}
            className="hidden lg:block absolute left-4 text-gray-700 hover:text-gray-900"
          >
            <ArrowLeft size={22} />
          </button>

          <h2 className="text-lg font-semibold text-gray-900">
            Select asset
          </h2>

          <button
            onClick={onClose}
            className="lg:hidden absolute right-4 text-gray-700 hover:text-gray-900"
          >
            <X size={22} />
          </button>
        </div>

        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 pr-10 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm"
            />
            <Search
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 space-y-1.5">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              onClick={() => setSelectedAsset(asset)}
              className={`
                flex items-center gap-3 py-3 border-b cursor-pointer rounded-lg px-2
                hover:bg-gray-50
                ${
                  selectedAsset?.id === asset.id
                    ? "bg-purple-50 border-purple-400"
                    : ""
                }
              `}
            >
              <div className="py-2 px-2 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <Image
                  src={asset.image}
                  alt={asset.name}
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>

              <div className="flex flex-col">
                <p className="text-md mt-1 font-bold text-gray-900 flex items-center gap-2">
                  {asset.name}
                  <span
                    className={`text-xs font-normal px-2 py-0.5 rounded ${
                      asset.id === 1
                        ? "bg-purple-100 text-purple-600"
                        : "bg-gray-100 border border-gray-300 text-gray-400"
                    }`}
                  >
                    {asset.symbol}
                  </span>
                </p>
                <p className="text-xs text-gray-500">{asset.description}</p>
              </div>
            </div>
          ))}

          {filteredAssets.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-6">
              No results found
            </p>
          )}
        </div>

        {/* FOOTER BUTTON */}
        <div className="p-4 border-t">
          <button
            disabled={!selectedAsset}
            className={`
              w-full py-3 rounded-xl font-medium
              ${
                selectedAsset
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            {selectedAsset ? "Create new template" : "Select template"}
          </button>
        </div>
      </div>
    </div>
  );
}
