import React from 'react';
import { AssetCard } from './asset-card';
import { Asset } from '@/types/finance.types';

interface AssetsGridProps {
  assets: Asset[];
}

export function AssetsGrid ({ assets }:AssetsGridProps) {
  return (
    <div className="mb-4">
      <h2 className="text-base font-semibold text-[#0F172A] mb-3 px-1">
        Assets
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {assets.map(asset => (
          <AssetCard key={asset.id} asset={asset} />
        ))}
      </div>
    </div>
  );
};