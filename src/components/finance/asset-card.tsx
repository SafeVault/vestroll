import React from "react";
import Image from "next/image";
import { Asset } from "@/types/finance.types";

interface AssetCardProps {
  asset: Asset;
}

export function AssetCard({ asset }: AssetCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${asset.bgColor} group-hover:scale-105 transition-transform`}
          >
            <Image
              src={asset.icon}
              alt={asset.symbol}
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-[#0F172A] text-sm mb-0.5">
                {asset.name}
              </h3>
            </div>
            <p className="text-xs text-[#64748B]">
              {asset.price}{" "}
              <span
                className={
                  asset.change.includes("-") ? "text-red-500" : "text-green-500"
                }
              >
                {asset.change}
              </span>
            </p>
          </div>
        </div>
        <div className="text-right ml-2">
          <p className="font-semibold text-[#0F172A] text-sm mb-0.5">
            {asset.balance}
          </p>
          <p className="text-xs text-[#94A3B8]">{asset.amount}</p>
        </div>
      </div>
    </div>
  );
}
