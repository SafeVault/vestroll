'use client';

import EmptyState from "@/components/ui/EmptyState";
import { cn } from "@/utils/classNames";
import { Milestone, milestones as initialMilestones } from "@/data/team-mgt";
import { currencies } from "@/util/constant";
import { useState } from "react";
import { getStatusIcon, getStatusClass, getStatusText } from "./status-lib";
import { createPortal } from "react-dom";
import { StatusModal } from "./status-modal";
import { FlagIcon } from "lucide-react";
import { DetailsConfig } from "./details.types";
import { DetailsView } from "./details-view";
import { SearchFilterBar } from "@/app/app/team-management/components/SearchFilterBar";
import { Pagination } from "@/app/app/team-management/components/Pagination";
import { FilterModal } from "@/app/app/team-management/components/FilterModal";
import { useSort } from "@/hooks/use-sort";
import Image from "next/image";

function TeamMgtMilestone() {
    const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const handleStatusModal = (show: boolean) => setShowStatusModal(show);

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Lift data to state for updates
    const [milestones, setMilestones] = useState(initialMilestones);

    // use-sort hook
    const {
        data: paginatedMilestones,
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
        data: milestones,
        searchKeys: ["employeeName", "milestoneName"],
        initialFilters: {
            status: "All",
        },
        itemsPerPage: 10,
    });

    const handleFilterApply = (newFilters: Record<string, string>) => {
        setFilters(newFilters);
    };

    const handleApprove = () => {
        if (!selectedMilestone) return;

        // Update the selected item
        const updatedMilestone = { ...selectedMilestone, status: "Approved" as const };
        setSelectedMilestone(updatedMilestone);

        // Update in the list
        setMilestones(prev =>
            prev.map(item => item.id === selectedMilestone.id ? updatedMilestone : item)
        );
    };

    const handleReject = (status: string, reason?: string) => {
        if (!selectedMilestone) return;

        // Update the selected item
        const updatedMilestone = { ...selectedMilestone, status: "Rejected" as const };
        setSelectedMilestone(updatedMilestone);

        // Update in the list
        setMilestones(prev =>
            prev.map(item => item.id === selectedMilestone.id ? updatedMilestone : item)
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

  const MilestoneList = () => {
    return (
        <section>
      <div className="bg-white sm:bg-white p-4 rounded-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <h2 className="text-base font-semibold text-gray-900">
                Milestone requests
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
                    No milestones found
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
                    Milestone completed
                  </th>
                  <th className="px-3 py-4 whitespace-nowrap">
                    Total milestone
                  </th>
                  <th className="px-3 py-4 whitespace-nowrap">
                    Total amount
                  </th>
                  <th className="px-3 py-4 whitespace-nowrap">
                    Paid in
                  </th>
                  <th className="px-3 py-4 whitespace-nowrap">Status</th>
                  <th className="px-3 py-4 whitespace-nowrap">Submitted</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {paginatedMilestones.map((milestone, index) => (
                <tr className="*:text-[#17171C] *:first:font-medium cursor-pointer" key={index} onClick={() => setSelectedMilestone(milestone)}>
                  <td className="hidden md:table-cell px-3 py-4 whitespace-nowrap">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  {/* includes employee name, role, picture */}
                  <td className="hidden md:table-cell px-3 py-4 w-52 md:w-auto">
                    <div className="flex items-center gap-2">
                      <img src={milestone.profileImage} alt="img" className="w-10 h-10 rounded-full" />
                      <div className="flex flex-col">
                        <span className="font-medium">{milestone.employeeName}</span>
                        <span className="text-xs text-gray-500">{milestone.employeeRole}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-4 w-52 md:w-auto">
                    <div className="hidden md:table-cell line-clamp-1 md:line-clamp-none md:whitespace-nowrap">
                      {milestone.milestoneCompleted}
                    </div>
                    <div className="md:hidden line-clamp-1 md:line-clamp-none md:whitespace-nowrap">
                      {milestone.milestoneName}
                    </div>
                    {/* mobile view */}
                    <small className="text-xs md:hidden">
                      <div className="flex items-center gap-2">
                        <span className="text-[#7F8C9F]">${milestone.amount.toFixed(2)}</span>
                        <span className="text-[#DCE0E5]">|</span>
                        <p className="flex items-center gap-1">
                          <img src={currencies[0].icon} alt="fiat" className="w-5 h-5" />
                          <span className="text-[#17171C]">{currencies[0].label}</span>
                        </p>
                      </div>
                    </small>
                  </td>
                  <td className="hidden md:table-cell px-3 py-4 whitespace-nowrap">
                    {milestone.totalMilestone}
                  </td>
                  <td className="hidden md:table-cell px-3 py-4 whitespace-nowrap">
                    ${milestone.amount.toFixed(2)}
                  </td>
                  <td className="hidden md:table-cell px-3 py-4 whitespace-nowrap">
                    <div className="w-fit flex items-center gap-1 px-2 border bg-[#F5F6F7] rounded-xl">
                        <img src={currencies[0].icon} alt="fiat" className="w-5 h-5" />
                        <span className="text-[#17171C]">{currencies[0].label}</span>
                    </div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    {/* Status */}
                    <div className={cn(
                      "px-2 py-1 rounded-full text-xs flex items-center gap-1 border w-fit",
                      getStatusClass(milestone.status)
                    )}>
                      {getStatusIcon(milestone.status)}
                      <span className="text-xs">{getStatusText(milestone.status)}</span>
                    </div>
                    {/* mobile view */}
                    <small className="md:hidden text-xs text-[#414F62]">{milestone.submittedAt}</small>
                  </td>
                  <td className="hidden md:table-cell px-3 py-4 whitespace-nowrap">{milestone.submittedAt}</td>
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
            title="No milestone records found"
            description="Looks like you're yet to receive any milestone record"
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

  const milestoneConfig: DetailsConfig<Milestone> = {
  title: "Milestone details",
  getStatus: (m) => m.status,

  header: {
    icon: (<FlagIcon size={24} />),
    title: (m) => m.milestoneName,
    subtitle: (m) =>
      `${m.milestoneCompleted} of ${m.totalMilestone} milestones`,
  },

  summary: {
    leftLabel: "Amount",
    leftValue: (m) => `${m.amount} USD`,
    rightLabel: "Estimated due date",
    rightValue: (m) => m.dueDate,
  },

  description: "Monthly subscription for design and creative tools",

  attachments: {
    url: "https://via.placeholder.com/150",
    submittedAt: selectedMilestone?.submittedAt || "",
  },

  footerCards: {
    employeeId: selectedMilestone?.id || "",
    contract: selectedMilestone?.id || "",
    employeeName: selectedMilestone?.employeeName || "",
    employeeRole: selectedMilestone?.employeeRole || "",
  }
  };

  return (
    <>
      {selectedMilestone
      ? <DetailsView
            data={selectedMilestone}
            onBack={() => setSelectedMilestone(null)}
            onReject={() => setShowStatusModal(true)}
            onApprove={handleApprove}
            config={milestoneConfig}
        />
      : <MilestoneList />}

      {/* Status modal with createPortal */}
      {showStatusModal && createPortal(
        <StatusModal
            tabStatus={selectedMilestone?.status || "Pending"}
            handleStatusModal={handleStatusModal}
            onConfirm={handleReject}
        />,
        document.body
      )}
    </>
  );
}

export default TeamMgtMilestone;
