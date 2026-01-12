"use client";

import React from "react";

export interface TableColumn {
  key: string;
  header: string;
  align?: "left" | "center" | "right";
  width?: string;
}

interface TableHeaderProps {
  columns: TableColumn[];
  showCheckbox?: boolean;
  onSelectAll?: (checked: boolean) => void;
  allSelected?: boolean;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  columns,
  showCheckbox = true,
  onSelectAll,
  allSelected = false,
}) => {
  const getAlignmentClass = (align?: string) => {
    switch (align) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  };

  return (
    <div className="hidden bg-gray-100 lg:block">
      <div className="flex items-center px-4 py-3 text-sm font-medium text-gray-400">
        {showCheckbox && (
          <div className="w-6 h-4 mr-4">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              checked={allSelected}
              onChange={(e) => onSelectAll?.(e.target.checked)}
            />
          </div>
        )}
        <div
          className={`flex-1 grid gap-4`}
          style={{
            gridTemplateColumns: columns
              .map((col) => col.width || "1fr")
              .join(" "),
          }}
        >
          {columns.map((column) => (
            <div
              key={column.key}
              className={
                getAlignmentClass(column.align) + " !text-text-subtext  "
              }
            >
              {column.header}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableHeader;
