'use client';

import EmptyState from "@/components/ui/EmptyState";
import { cn } from "@/utils/classNames";
import { Expense, expenses as initialExpenses } from "@/data/team-mgt";
import { currencies } from "@/util/constant";
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

function TeamMgtExpense() {
    const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const handleStatusModal = (show: boolean) => setShowStatusModal(show);

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Lift data to state for updates
    const [expenses, setExpenses] = useState(initialExpenses);

    // use-sort hook
    const {
        data: paginatedExpenses,
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
        data: expenses,
        searchKeys: ["employeeName", "name", "category"],
        initialFilters: {
            status: "All",
        },
        itemsPerPage: 10,
    });

    const handleFilterApply = (newFilters: Record<string, string>) => {
        setFilters(newFilters);
    };

    const handleApprove = () => {
        if (!selectedExpense) return;

        // Update the selected item
        const updatedExpense = { ...selectedExpense, status: "Approved" as const };
        setSelectedExpense(updatedExpense);

        // Update in the list
        setExpenses(prev =>
            prev.map(item => item.id === selectedExpense.id ? updatedExpense : item)
        );
    };

    const handleReject = (status: string, reason?: string) => {
        if (!selectedExpense) return;

        // Update the selected item
        const updatedExpense = { ...selectedExpense, status: "Rejected" as const };
        setSelectedExpense(updatedExpense);

        // Update in the list
        setExpenses(prev =>
            prev.map(item => item.id === selectedExpense.id ? updatedExpense : item)
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

  const ExpenseList = () => {
    return (
        <section>
      <div className="bg-white sm:bg-white p-4 rounded-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <h2 className="text-base font-semibold text-gray-900">
                Expense requests
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
                    No expenses found
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
                    Expense name
                  </th>
                  <th className="px-3 py-4 whitespace-nowrap">
                    Expense date
                  </th>
                  <th className="px-3 py-4 whitespace-nowrap">
                    Amount
                  </th>
                  <th className="px-3 py-4 whitespace-nowrap">
                    Paid in
                  </th>
                  <th className="px-3 py-4 whitespace-nowrap">Status</th>
                  <th className="px-3 py-4 whitespace-nowrap">Submitted</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {paginatedExpenses.map((expense, index) => (
                <tr className="*:text-[#17171C] *:first:font-medium cursor-pointer" key={index} onClick={() => setSelectedExpense(expense)}>
                  <td className="hidden md:table-cell px-3 py-4 whitespace-nowrap">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  {/* includes employee name, role, picture */}
                  <td className="hidden md:table-cell px-3 py-4 w-52 md:w-auto">
                    <div className="flex items-center gap-2">
                      <img src={expense.profileImage} alt="img" className="w-10 h-10 rounded-full" />
                      <div className="flex flex-col">
                        <span className="font-medium">{expense.employeeName}</span>
                        <span className="text-xs text-gray-500">{expense.employeeRole}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-4 w-52 md:w-auto">
                    <div className="hidden md:table-cell line-clamp-1 md:line-clamp-none md:whitespace-nowrap">
                      {expense.name}
                    </div>
                    <div className="md:hidden line-clamp-1 md:line-clamp-none md:whitespace-nowrap">
                      {expense.name}
                    </div>
                    {/* mobile view */}
                    <small className="text-xs md:hidden">
                      <div className="flex items-center gap-2">
                        <span className="text-[#7F8C9F]">${expense.amount.toFixed(2)}</span>
                        <span className="text-[#DCE0E5]">|</span>
                        <p className="flex items-center gap-1">
                          <img src={currencies[0].icon} alt="fiat" className="w-5 h-5" />
                          <span className="text-[#17171C]">{currencies[0].label}</span>
                        </p>
                      </div>
                    </small>
                  </td>
                  <td className="hidden md:table-cell px-3 py-4 whitespace-nowrap">
                    {expense.expenseDate}
                  </td>
                  <td className="hidden md:table-cell px-3 py-4 whitespace-nowrap">
                    ${expense.amount.toFixed(2)}
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
                      getStatusClass(expense.status)
                    )}>
                      {getStatusIcon(expense.status)}
                      <span className="text-xs">{getStatusText(expense.status)}</span>
                    </div>
                    {/* mobile view */}
                    <small className="md:hidden text-xs text-[#414F62]">{expense.submittedAt}</small>
                  </td>
                  <td className="hidden md:table-cell px-3 py-4 whitespace-nowrap">{expense.submittedAt}</td>
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
            title="No expenses yet"
            description="Keep track of your contract-related spending here."
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

  const expenseConfig: DetailsConfig<Expense> = {
  title: "Expense details",
  getStatus: (e) => e.status,

  header: {
    icon: (<BookmarkMinusIcon size={24} />),
    title: (e) => e.name,
    subtitle: (e) => e.category,
  },

  summary: {
    leftLabel: "Amount",
    leftValue: (e) => `${e.amount} USD`,
    rightLabel: "Expense Date",
    rightValue: (e) => e.expenseDate,
  },

  description: "Monthly subscription for design and creative tools",

  attachments: {
    url: "https://via.placeholder.com/150",
    submittedAt: selectedExpense?.submittedAt || "",
  },

  footerCards: {
    employeeId: selectedExpense?.id || "",
    contract: selectedExpense?.id || "",
    employeeName: selectedExpense?.employeeName || "",
    employeeRole: selectedExpense?.employeeRole || "",
  }
  };

  return (
    <>
      {selectedExpense
      ? <DetailsView
            data={selectedExpense}
            onBack={() => setSelectedExpense(null)}
            onReject={() => setShowStatusModal(true)}
            onApprove={handleApprove}
            config={expenseConfig}
        />
      : <ExpenseList />}

      {/* Status modal with createPortal */}
      {showStatusModal && createPortal(
        <StatusModal
            tabStatus={selectedExpense?.status || "Pending"}
            handleStatusModal={handleStatusModal}
            onConfirm={handleReject}
        />,
        document.body
      )}
    </>
  );
}

export default TeamMgtExpense;
