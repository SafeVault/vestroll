"use client";

import { CircleDollarSign, ListFilterIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import { Contract, mockContracts } from "@/data/contracts";
import Image from "next/image";
import EmptyState from "../ui/EmptyState";
import { cn } from "@/utils/classNames";
import FilterModal, { FilterSelection } from "./ui/FilterModal";
import Link from "next/link";

const getStatusClass = (status: Contract['status']) => {
    switch (status) {
      case 'In Review':
        return 'bg-[#FFF7E6] text-[#F5A623] border-[#F5A623]';
      case 'Rejected':
        return 'bg-[#FFF1F0] text-[#FF4D4F] border-[#FF4D4F]';
      case 'Active':
        return 'bg-[#F6FFED] text-[#52C41A] border-[#52C41A]';
      case 'Completed':
        return 'bg-[#EBF2FF] text-[#387DF4] border-[#387DF4]';
    }
  };

const ContractHistoryCard = (contract: Contract) => {
    return (
      <Link href={`/app/contracts/${contract.id}?title=${encodeURIComponent(contract.title)}`}>
        <div className="min-w-[250px] bg-white rounded-xl space-y-2 p-4">
            <div className="flex justify-between">
                <Image src={'/contract-icon.png'} alt="icon" width={40} height={40}/>
                <div className="p-2 flex gap-2 bg-gray-100 rounded-full">
                    <CircleDollarSign className="text-green-500"/>
                    {contract.amount.toFixed(2)} {contract.paymentType === 1 ? 'USD': 'USDT'}
                </div>
            </div>
            <h4 className="font-semibold text-sm md:text-base">{contract.title}</h4>
            {/* period */}
            <div className="flex gap-2">
                <Image src={'/calander.svg'} alt="icon" width={14} height={14}/>
                <small className="text-gray-400">{contract.period.startDate} - {contract.period.endDate}</small>
            </div>
            <hr className="my-4 text-border-primary" />
            <div className="flex justify-between">
                <p>Fixed rate</p> {/* TODO: this can be dynamic for contract type */}
                {/* Status */}
                <div className={cn(
                    "px-2 py-1 rounded-full text-xs border w-fit",
                    getStatusClass(contract.status)
                )}>
                    <span className="text-xs">{contract.status}</span>
                </div>
            </div>
        </div>
      </Link>
    );
}

function ContractHistory() {
    const [searchInput, setSearchInput] = useState('');
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [filters, setFilters] = useState<FilterSelection>({
    contractType: "All",
    status: "All"
  });

  const contractTypes = ["All", "Fixed rate", "Milestone", "Pay as you go"];
  const statusTypes = ["All", "Pending", "Rejected", "Active", "Completed"];

  const filteredMockContracts = mockContracts.filter((c) => {
    // Contract type filter
  const matchesContractType =
    filters.contractType === "All" ||
    c.contractType === filters.contractType;

  // Status filter
  const matchesStatus =
    filters.status === "All" ||
    c.status === filters.status;

    // Search filter (checks name, id, or anything else you want)
    const search = searchInput.toLowerCase().trim();
    const matchesSearch =
      search === "" ||
      c.title?.toLowerCase().includes(search) ||
      c.id?.toString().includes(search);

    return matchesContractType && matchesStatus && matchesSearch;
  });


  const handleFilterReset = () => {
    setFilters({
      contractType: "All",
      status: "All",
    });
  }

  const handleRemoveFilter = (type: keyof FilterSelection) => {
    setFilters((ff) => ({
      ...ff,
      [type]: "All"
    }));
  }

  return (
    <div className="py-4">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <p className="font-semibold text-text-header">History</p>
            <div className="flex items-center w-full gap-1 md:max-w-85">
                <div className="flex justify-between items-center w-full px-4 py-2 bg-white border rounded-lg border-border-primary h-9">
                  <input
                    type="search"
                    className="w-full text-xs text-gray-400 outline-none"
                    placeholder="Search..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  <SearchIcon
                    className="text-gray-300 cursor-pointer"
                    onClick={() => setSearchInput(searchInput.trim())}
                  />
                </div>
                {filteredMockContracts.length > 4 && (
                  <button
                    onClick={() => setShowFilterModal(true)}
                    className="flex items-center justify-center bg-white border border-[#DCE0E5]
                    rounded-lg cursor-pointer w-9 h-9 hover:bg-gray-50 transition-colors"
                  >
                    <ListFilterIcon size={14} />
                  </button>
                )}
            </div>
        </div>
        <div className="mb-4 flex justify-end">
          {/* shows the current filters set */}
          {filters.contractType !== filters.status && (
            <div className="flex gap-3 items-center">
              {filters.contractType !== "All" && (
                <p className="p-2 bg-[#F3EBF9] flex items-center gap-2 rounded-xl">
                  <span className="font-medium text-[#5E2A8C]">Contract type:</span>
                  <span className="text-[#17171C]">{filters.contractType}</span>
                  <span className="text-[#7F8C9F] cursor-pointer hover:text-red-400 p-0.5"
                  onClick={() => handleRemoveFilter('contractType')}
                  >
                    &times;
                  </span>
                </p>
              )}
              {filters.status !== "All" && (
                <p className="p-2 bg-[#F3EBF9] flex items-center gap-2 rounded-xl">
                  <span className="font-medium text-[#5E2A8C]">Status:</span>
                  <span className="text-[#17171C]">{filters.status}</span>
                  <span className="text-[#7F8C9F] cursor-pointer hover:text-red-400 p-0.5"
                  onClick={() => handleRemoveFilter('status')}
                  >
                    &times;
                  </span>
                </p>
              )}
              <button className="p-2 border border-[#5E2A8C] text-[#5E2A8C] rounded-xl
                cursor-pointer"
                onClick={handleFilterReset}
              >
                Reset
              </button>
            </div>
          )}
        </div>
        {showFilterModal && (
          <FilterModal
            onClose={() => setShowFilterModal(false)}
            onApply={(selected) => {
              setFilters(selected);
              setShowFilterModal(false);
            }}
            contractTypes={contractTypes}
            statusTypes={statusTypes}
            initialSelection={filters}
          />
        )}

        {/* contract list */}
        {filteredMockContracts.length > 0 ? (
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredMockContracts.map((item, index) => (
                  <ContractHistoryCard
                      {...item}
                      key={index}
                  />
              ))}
          </section>
        ):(
          <EmptyState
              title="No transactions yet"
              description="Your transactions will be displayed here"
          />
        )}
    </div>
  )
}

export default ContractHistory
