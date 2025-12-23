import React from "react";
import { AssetCard } from "./asset-card";
import { Asset } from "@/types/finance.types";

interface AssetsGridProps {
  assets: Asset[];
}

export function AssetsGrid({ assets }: AssetsGridProps) {
  return (
    <div className="mb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {assets.map((asset) => (
          <div key={asset.id} className="cursor-pointer">
            <AssetCard key={asset.id} asset={asset} />
          </div>
        ))}
      </div>
    </div>
  );
}
