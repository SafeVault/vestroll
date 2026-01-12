/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo } from "react";
import TableContent from "./TableContent";
import TableFilterHeader from "./TableFilterHeader";
import TableHeader, { TableColumn } from "./TableHeader";
import Pagination from "@/components/ui/Pagination";

interface TableProps<T = any> {
  data: T[];
  columns: TableColumn[];
  search: string;
  setSearch: (value: string) => void;
  showModal: () => void;

  // Table configuration
  selectedTab?: string;
  searchPlaceholder?: string;
  showCheckbox?: boolean;
  showFilterHeader?: boolean;

  // Pagination
  showPagination?: boolean;
  itemsPerPage?: number;

  // Selection functionality
  selectedItems?: string[];
  onSelectItem?: (id: string, checked: boolean) => void;
  onSelectAll?: (checked: boolean) => void;

  // Interaction
  onRowClick?: (item: T) => void;
  renderCell: (item: T, column: TableColumn) => React.ReactNode;
  renderMobileCell: (item: T) => React.ReactNode;

  // Empty state customization
  emptyTitle?: string;
  emptyDescription?: string;
  getItemId?: (item: T) => string;

  // Filter header props
  SearchIcon?: React.ComponentType;
  FilterIcon?: React.ComponentType;
}

const Table = <T extends Record<string, any>>({
  data,
  columns,
  search,
  setSearch,
  showModal,
  selectedTab = "Data",
  searchPlaceholder = "Search...",
  showCheckbox = true,
  showFilterHeader = true,
  showPagination = false,
  itemsPerPage = 10,
  selectedItems = [],
  onSelectItem,
  onSelectAll,
  onRowClick,
  renderCell,
  renderMobileCell,
  emptyTitle,
  emptyDescription,
  getItemId,
  SearchIcon,
  FilterIcon,
}: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination values
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = useMemo(() => data.slice(startIndex, endIndex), [data, startIndex, endIndex]);

  const allSelected = paginatedData.length > 0 && paginatedData.every(item => {
    const itemId = getItemId ? getItemId(item) : item.id || item._id || String(Math.random());
    return selectedItems.includes(itemId);
  });
  const isAllDataSelected = data.length > 0 && selectedItems.length === data.length;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSelectAll = (checked: boolean) => {
    if (showPagination) {
      // For paginated tables, select all items on current page
      const currentPageIds = paginatedData.map(item => getItemId ? getItemId(item) : item.id || item._id || String(Math.random()));

      if (checked) {
        // Add current page items to selection
        currentPageIds.forEach(id => {
          if (!selectedItems.includes(id)) {
            onSelectItem?.(id, true);
          }
        });
      } else {
        // Remove current page items from selection
        currentPageIds.forEach(id => {
          if (selectedItems.includes(id)) {
            onSelectItem?.(id, false);
          }
        });
      }
    } else {
      // For non-paginated tables, select all items
      onSelectAll?.(checked);
    }
  };

  return (
    <div>
      <div className="pb-4">
        {showFilterHeader && (
          <div className="">
            <TableFilterHeader
              selectedTab={selectedTab}
              search={search}
              setSearch={setSearch}
              showModal={showModal}
              searchPlaceholder={searchPlaceholder}
              SearchIcon={SearchIcon}
              FilterIcon={FilterIcon}
            />
          </div>
        )}
      </div>
      <div className="md:overflow-x-auto bg-white p-4 rounded-lg custom-scrollbar">
        <TableHeader
          columns={columns}
          showCheckbox={showCheckbox}
          onSelectAll={handleSelectAll}
          allSelected={showPagination ? allSelected : isAllDataSelected}
        />
        <TableContent
          data={paginatedData}
          columns={columns}
          search={search}
          showCheckbox={showCheckbox}
          selectedItems={selectedItems}
          onSelectItem={onSelectItem}
          onRowClick={onRowClick}
          renderCell={renderCell}
          emptyTitle={emptyTitle}
          emptyDescription={emptyDescription}
          getItemId={getItemId}
          renderMobileCell={renderMobileCell}
        />
      </div>

      {showPagination && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          totalItems={data.length}
          showInfo={true}
        />
      )}
    </div>
  );
};

export default Table;
