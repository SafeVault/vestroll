'use client';

import EmptyState from "@/components/ui/EmptyState";
import { cn } from "@/utils/classNames";
import { Timeoff, timeoffs as initialTimeoffs } from "@/data/team-mgt";
import { useState } from "react";
import { getStatusIcon, getStatusClass, getStatusText } from "./status-lib";
import { createPortal } from "react-dom";
import { StatusModal } from "./status-modal";
import { BookmarkMinusIcon } from "lucide-react";
import { DetailsConfig } from "./details.types";
import { DetailsView } from "./details-view";
import { SearchFilterBar } from "@/app/app/team-management/components/SearchFilterBar";
import { Pagination } from "@/app/app/team-management/components/Pagination";
import { FilterModal } from "@/app/app/team-management/components/FilterModal";
import { useSort } from "@/hooks/use-sort";
import Image from "next/image";

function TeamMgtTimeoff() {
    const [selectedTimeoff, setSelectedTimeoff] = useState<Timeoff | null>(null);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const handleStatusModal = (show: boolean) => setShowStatusModal(show);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Lift data to state for updates
    const [timeoffs, setTimeoffs] = useState(initialTimeoffs);

    // use-sort hook
    const {
        data: paginatedTimeoffs,
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
        data: timeoffs,
        searchKeys: ["employeeName", "type"],
        initialFilters: {
            status: "All",
        },
        itemsPerPage: 10,
    });

    const handleFilterApply = (newFilters: Record<string, string>) => {
        setFilters(newFilters);
    };

    const handleApprove = () => {
        if (!selectedTimeoff) return;

        // Update the selected item
        const updatedTimeoff = { ...selectedTimeoff, status: "Approved" as const };
        setSelectedTimeoff(updatedTimeoff);

        // Update in the list
        setTimeoffs(prev =>
            prev.map(item => item.id === selectedTimeoff.id ? updatedTimeoff : item)
        );
    };

    const handleReject = (status: string, reason?: string) => {
        if (!selectedTimeoff) return;

        // Update the selected item
        const updatedTimeoff = { ...selectedTimeoff, status: "Rejected" as const };
        setSelectedTimeoff(updatedTimeoff);

        // Update in the list
        setTimeoffs(prev =>
            prev.map(item => item.id === selectedTimeoff.id ? updatedTimeoff : item)
        );
    };

    const filterConfig = [
        {
            key: "status",
            label: "Status",
            options: [
                { label: "Pending", value: "Pending" },
                { label: "Approved", value: "Approved" },
                { label: "Rejected", value: "Rejected" },
            ],
        },
    ];

  const TimeoffList = () => {
    return (
        <section>
      <div className="bg-white sm:bg-white p-4 rounded-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <h2 className="text-base font-semibold text-gray-900">
                Time off requests
            </h2>
             <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="flex-1 md:flex-initial md:min-w-64">
                  <SearchFilterBar
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onFilterClick={() => setIsFilterOpen(true)}
                  />
                </div>
            </div>
        </div>

        {totalItems === 0 && (searchQuery || filters.status !== "All") ? (
             <div className="bg-white rounded-lg border border-gray-200 min-h-96">
                <div className="flex flex-col items-center justify-center py-20 px-4">
                  <Image
                    src="/search-paper.svg"
                    alt="No records"
                    width={200}
                    height={200}
                  />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No requests found
                  </h3>
                  <p className="text-gray-500 text-center max-w-sm">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              </div>
        ) : totalItems > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="hidden md:table-header-group ltr:text-left rtl:text-right bg-gray-50 rounded-t-lg text-xs font-medium">
                <tr className="*:font-medium *:text-gray-500">
                  <th className="px-3 py-4 whitespace-nowrap">#</th>
                  <th className="px-3 py-4 whitespace-nowrap">
                    Employee
                  </th>
                  <th className="px-3 py-4 whitespace-nowrap">
                    Type
                  </th>
                  <th className="px-3 py-4 whitespace-nowrap">
                    Period
                  </th>
                  <th className="px-3 py-4 whitespace-nowrap">
                    Total time off
                  </th>
                  <th className="px-3 py-4 whitespace-nowrap">Status</th>
                  <th className="px-3 py-4 whitespace-nowrap">Submitted</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {paginatedTimeoffs.map((timeoff, index) => (
                <tr className="*:text-[#17171C] *:first:font-medium cursor-pointer" key={index} onClick={() => setSelectedTimeoff(timeoff)}>
                  <td className="hidden md:table-cell px-3 py-4 whitespace-nowrap">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  {/* includes employee name, role, picture */}
                  <td className="hidden md:table-cell px-3 py-4 w-52 md:w-auto">
                    <div className="flex items-center gap-2">
                      <img src={timeoff.profileImage} alt="img" className="w-10 h-10 rounded-full" />
                      <div className="flex flex-col">
                        <span className="font-medium">{timeoff.employeeName}</span>
                        <span className="text-xs text-gray-500">{timeoff.employeeRole}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-4 w-52 md:w-auto">
                    <div className="hidden md:table-cell line-clamp-1 md:line-clamp-none md:whitespace-nowrap">
                      {timeoff.type}
                    </div>
                    <div className="md:hidden line-clamp-1 md:line-clamp-none md:whitespace-nowrap">
                      {timeoff.type}
                    </div>
                    {/* mobile view */}
                    <small className="text-xs md:hidden">
                      <div className="flex items-center gap-2">
                        <span className="text-[#7F8C9F]">{timeoff.startDate} - {timeoff.endDate}</span>
                        <span className="text-[#DCE0E5]">|</span>
                        <p>{timeoff.totalDuration} days</p>
                      </div>
                    </small>
                  </td>
                  <td className="hidden md:table-cell px-3 py-4 whitespace-nowrap">
                    {timeoff.startDate} - {timeoff.endDate}
                  </td>
                  <td className="hidden md:table-cell px-3 py-4 whitespace-nowrap">
                    {timeoff.totalDuration} days
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    {/* Status */}
                    <div className={cn(
                      "px-2 py-1 rounded-full text-xs flex items-center gap-1 border w-fit",
                      getStatusClass(timeoff.status)
                    )}>
                      {getStatusIcon(timeoff.status)}
                      <span className="text-xs">{getStatusText(timeoff.status)}</span>
                    </div>
                    {/* mobile view */}
                    <small className="md:hidden text-xs text-[#414F62]">{timeoff.submittedAt}</small>
                  </td>
                  <td className="hidden md:table-cell px-3 py-4 whitespace-nowrap">{timeoff.submittedAt}</td>
                </tr>
                ))}
              </tbody>
            </table>

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
        ) : (
          <EmptyState
            title="No time off requests found"
            description="Manage your employees' time off request or create one on their behalf"
          />
        )}
      </div>

       <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onApply={handleFilterApply}
        filterConfiguration={filterConfig}
      />
    </section>
    );
  }

  const timeoffConfig: DetailsConfig<Timeoff> = {
  title: "Timeoff details",
  getStatus: (t) => t.status,

  header: {
    icon: (<BookmarkMinusIcon size={24} />),
    title: (t) => t.employeeName,
    subtitle: (t) => t.employeeRole,
  },

  summary: {
    leftLabel: "Reason",
    leftValue: (t) => t.reason,
    rightLabel: "Total time off",
    rightValue: (t) => `${t.totalDuration} days`,
  },

  description: selectedTimeoff?.description,

  attachments: {
    url: "https://via.placeholder.com/150",
    submittedAt: selectedTimeoff?.submittedAt || "",
  },

  footerCards: {
    employeeId: selectedTimeoff?.id || "",
    contract: selectedTimeoff?.id || "",
    employeeName: selectedTimeoff?.employeeName || "",
    employeeRole: selectedTimeoff?.employeeRole || "",
  }
  };

  return (
    <>
      {selectedTimeoff
      ? <DetailsView
            data={selectedTimeoff}
            onBack={() => setSelectedTimeoff(null)}
            onReject={() => setShowStatusModal(true)}
            onApprove={handleApprove}
            config={timeoffConfig}
        />
      : <TimeoffList />}

      {/* Status modal with createPortal */}
      {showStatusModal && createPortal(
        <StatusModal
            tabStatus={selectedTimeoff?.status || "Pending"}
            handleStatusModal={handleStatusModal}
            onConfirm={handleReject}
        />,
        document.body
      )}
    </>
  );
}

export default TeamMgtTimeoff;
