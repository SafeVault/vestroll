"use client";

import React from "react";
import { FilterIcon } from "../../../public/svg";

interface TableFilterHeaderProps {
  selectedTab: string;
  search: string;
  setSearch: (value: string) => void;
  showModal: () => void;
  searchPlaceholder?: string;
  showFilterButton?: boolean;
  showTabLabel?: boolean;
  SearchIcon?: React.ComponentType;
  FilterIcon?: React.ComponentType;
  children?: React.ReactNode;
}

const TableFilterHeader: React.FC<TableFilterHeaderProps> = ({
  selectedTab,
  search,
  setSearch,
  showModal,
  searchPlaceholder = "Search by name...",
  showFilterButton = true,
  showTabLabel = true,
  SearchIcon,
  children,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      {showTabLabel && (
        <p className="font-semibold text-text-header">{selectedTab}</p>
      )}
      <div className="flex items-center w-full gap-1 md:max-w-85">
        <div className="flex justify-between items-center w-full px-4 py-2 bg-white border rounded-lg border-border-primary h-9">
          <input
            type="search"
            className="w-full text-xs text-gray-400 outline-none"
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {SearchIcon && <SearchIcon />}
        </div>
        {showFilterButton && (
          <button
            onClick={showModal}
            className="flex items-center justify-center bg-white border rounded-lg cursor-pointer w-9 h-9 border-primary-500"
          >
            <FilterIcon />
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default TableFilterHeader;
