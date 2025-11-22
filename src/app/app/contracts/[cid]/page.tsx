"use client";

import NotFound from "@/app/not-found";
import ContractReviewAccordion from "@/components/contracts/Sign&Review";
import ContractExpense from "@/components/contracts/ui/Expense";
import ContractTypeMetric from "@/components/contracts/ui/MetricType";
import ContractPaymentHistory from "@/components/contracts/ui/PaymentHistory";
import ContractTimeOff from "@/components/contracts/ui/TimeOff";
import BackButton from "@/components/ui/BackButton";
import { mockContracts } from "@/data/contracts";
import { useState } from "react";

type Props = {
  params: { cid: string }
}

export default function CidPage({ params }: Props) {
    const cid = params?.cid;
    const contract = mockContracts.find((c) => c.id.toString() === cid);
    const [activeTab, setActiveTab] = useState<number>(1);

    const title = new URL(window.location.href).searchParams.get('title');

    // Tab configuration with conditional logic
    const tabs = [
      { id: 1, label: 'Details' },
      {
        id: 2,
        label: contract?.contractType === 'Milestone' ? 'Milestone' : 'Time tracking'
      },
      { id: 3, label: 'Payment history' },
      { id: 4, label: 'Expense' },
      { id: 5, label: 'Time off' },
    ];

    const renderTabContent = () => {
      switch (activeTab) {
        case 1:
            return <ContractReviewAccordion />;
        case 2:
            return <ContractTypeMetric contract />;
        case 3:
            return <ContractPaymentHistory contract />;
        case 4:
            return <ContractExpense contract />;
        case 5:
            return <ContractTimeOff contract />;
        default:
            return null;
      }
    };

    if (!contract) {
        return <NotFound />;
    }


    return (
        <>
      <div className="flex flex-col bg-white border-b border-t mb-6 border-gray-200 pt-6 px-4">
        <BackButton>
          <span className="text-sm">Back</span>
        </BackButton>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>

        <div className="flex mt-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors duration-200 ${
                activeTab === tab.id
                  ? "border-[#5E2A8C] text-[#5E2A8C]"
                  : "border-transparent text-[#6B7280] hover:text-[#374151]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full px-2 sm:px-4 pb-8">
        {/* Content area */}
        <div className="max-w-[1536px]">
        {renderTabContent()}
        </div>
      </div>
    </>
    );
}
