"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SearchFilterBar } from "@/app/app/team-management/components/SearchFilterBar";
import { TeamEmptyState } from "@/app/app/team-management/components/TeamEmptyState";
import { Pagination } from "@/app/app/team-management/components/Pagination";
import { FilterModal } from "@/app/app/team-management/components/FilterModal";
import { StatsBar } from "@/app/app/team-management/components/StatsBar";
import { EmployeeList } from "@/app/app/team-management/components/EmployeeList";
import { useSort } from "@/hooks/use-sort";
import { Employee } from "@/types/teamManagement.types";

interface TeamMgtEmployeesProps {
  employees: Employee[];
}

const TeamMgtEmployees: React.FC<TeamMgtEmployeesProps> = ({ employees }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // use-sort hook for filtering, searching, and pagination
  const {
    data: paginatedEmployees,
    currentPage,
    setCurrentPage,
    totalPages,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    totalItems,
    itemsPerPage,
  } = useSort({
    data: employees,
    searchKeys: ["name"],
    initialFilters: {
      status: "All",
      type: "All",
    },
    itemsPerPage: 12,
  });

  const activeEmployeesCount = employees.filter(
    (emp) => emp.status === "Active"
  ).length;

  const handleFilterApply = (newFilters: Record<string, string>) => {
    setFilters(newFilters);
  };

  const employeeFilterConfig = [
    {
      key: "status",
      label: "Status",
      options: [
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
      ],
    },
    {
      key: "type",
      label: "Type",
      options: [
        { label: "Freelancer", value: "Freelancer" },
        { label: "Contractor", value: "Contractor" },
      ],
    },
  ];

  // Show empty state if no employees passed (handled by parent usually, but safety check)
  if (employees.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200">
        <TeamEmptyState onAddEmployee={() => console.log("Add employee")} />
      </div>
    );
  }

  return (
    <>
      <StatsBar
        totalEmployees={employees.length}
        activeEmployees={activeEmployeesCount}
      />
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Employees</h3>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex-1 md:flex-initial md:min-w-96">
            <SearchFilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onFilterClick={() => setIsFilterOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* Show "no results" if search/filter returns empty */}
      {totalItems === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 min-h-96">
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <Image
              src="/search-paper.svg"
              alt="No records"
              width={200}
              height={200}
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No employees found
            </h3>
            <p className="text-gray-500 text-center max-w-sm">
              Try adjusting your search or filter criteria
            </p>
          </div>
        </div>
      ) : (
        <div>
          <EmployeeList employees={paginatedEmployees} />
          {totalPages > 1 && (
            <div className="border-t border-gray-200 mt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      )}

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onApply={handleFilterApply}
        filterConfiguration={employeeFilterConfig}
      />
    </>
  );
};

export default TeamMgtEmployees;
