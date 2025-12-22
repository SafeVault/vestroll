"use client";

import React from "react";
import {
  MOCK_FIAT_ASSETS,
  generateMockFiatTransactions,
} from "@/lib/mock-data-fiat";
import { BalanceSection } from "@/components/finance/balance-section";
import { AssetsGrid } from "@/components/finance/assets-grid";
import { FinanceClient } from "@/components/finance/finance-client";

import type {
  SupportedAssetSymbol,
  SupportedNetwork,
} from "@/types/address-types";

type Option<T extends string> = { label: string; value: T };

// const assetOptions: Option<SupportedAssetSymbol>[] = [
//   { label: "USDC", value: "USDC" },
//   { label: "USDT", value: "USDT" },
//   { label: "ETH", value: "ETH" },
//   { label: "BTC", value: "BTC" },
// ];

// const networkOptions: Option<SupportedNetwork>[] = [
//   { label: "Ethereum", value: "Ethereum" },
//   { label: "Polygon", value: "Polygon" },
//   { label: "Arbitrum", value: "Arbitrum" },
//   { label: "Optimism", value: "Optimism" },
//   { label: "Stellar", value: "Stellar" },
// ];

const allTransactions = generateMockFiatTransactions(80);

export default function FinancePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-5 md:px-6 lg:px-2">
        <div className="max-w-[1400px] mx-2">
          <h4 className="text-gray-400">Overview</h4>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
            Finance
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className=" md:p-3 lg:p-4">
        <div className="max-w-[1400px] mx-2">
          <div className="mb-4">
            <div className="">
              <BalanceSection
                balance="$5,050.00"
                change="-0.0051% ($0.99)"
                title="Total Balance"
              />
            </div>
          </div>

          {/* Assets Grid */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">
                My Fiat Balance
              </h2>
            </div>

            <AssetsGrid assets={MOCK_FIAT_ASSETS} />
          </div>

          {/* Transactions Section */}
          <div className="mb-8">
            <FinanceClient
              allTransactions={allTransactions}
              initialResultsPerPage={10}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// // import {
// //   UsersIcon,
// //   GlobeAltIcon,
// //   ShieldCheckIcon,
// // } from "@heroicons/react/24/outline";

// import { Users, Globe, User } from "lucide-react";
// import PermissionsTab from "@/components/permissions/permissions-tab";
// import HiringTemplatesTab from "./hiring-templates/page";
// import AddressBook from "./address-book/page";

// interface StatProps {
//   Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
//   label: string;
//   value: string;
// }

// function Stat({ Icon, label, value }: StatProps) {
//   return (
//     <div className="flex items-center gap-3">
//       <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f3ff]">
//         <Icon className="h-5 w-5 text-[purple]" />
//       </div>
//       <div className="leading-tight">
//         <div className="text-xs sm:text-sm text-[#6b7280]">{label}</div>
//         <div className="text-base sm:text-lg font-semibold text-[#111827]">
//           {value}
//         </div>
//       </div>
//     </div>
//   );
// }

// interface SectionCardProps {
//   title: string;
//   action?: React.ReactNode;
//   children: React.ReactNode;
// }

// function SectionCard({ title, action, children }: SectionCardProps) {
//   return (
//     <section className="rounded-xl border border-[#e5e7eb] bg-white shadow-sm">
//       <div className="group flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-[#eef2f7]">
//         <h2 className="text-lg font-semibold text-[#1f2937]">{title}</h2>
//         {action}
//       </div>
//       <div className="p-4 sm:p-6">{children}</div>
//     </section>
//   );
// }

// interface FieldRowProps {
//   label: string;
//   value?: React.ReactNode;
//   right?: React.ReactNode;
// }

// function FieldRow({ label, value, right }: FieldRowProps) {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2 sm:gap-6 px-3 sm:px-4 py-3 rounded-lg bg-[#f8fafc]">
//       <div className="text-sm text-[#6b7280]">{label}</div>
//       <div className="sm:col-span-2 flex items-center justify-end gap-3">
//         <div className="text-sm sm:text-base text-[#111827] text-right">
//           {value ?? <span className="text-[#9ca3af]">--</span>}
//         </div>
//         {right}
//       </div>
//     </div>
//   );
// }

// type SettingsTab =
//   | "company"
//   | "permissions"
//   | "hiring-templates"
//   | "address-book";

// export default function Page() {
//   const [activeTab, setActiveTab] = useState<SettingsTab>("company");

//   const tabs = [
//     { id: "company" as SettingsTab, label: "Company" },
//     { id: "permissions" as SettingsTab, label: "Permissions" },
//     { id: "hiring-templates" as SettingsTab, label: "Hiring Templates" },
//     { id: "address-book" as SettingsTab, label: "Address book" },
//   ];

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "permissions":
//         return <PermissionsTab />;
//       case "hiring-templates":
//         return <HiringTemplatesTab />;
//       case "address-book":
//         return <AddressBook />;
//       case "company":
//       default:
//         return <CompanySettingsContent />;
//     }
//   };
//   return (
//     <>
//       <header className="bg-white border-b border-[#DCE0E5] px-4 sm:px-6 py-2">
//         <div className="flex flex-col justify-between">
//           <h1 className="mt-4 mb-2 text-[24px] text-gray-950 font-bold">
//             Settings
//           </h1>
//           <div className="flex flex-1 space-x-3 text-gray-500">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`relative px-3 py-2 transition-colors cursor-pointer ${
//                   activeTab === tab.id
//                     ? "text-[#5E2A8C] font-medium"
//                     : "text-gray-500 hover:text-gray-700"
//                 }`}
//               >
//                 {tab.label}
//                 {activeTab === tab.id && (
//                   <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#5E2A8C]"></span>
//                 )}
//               </button>
//             ))}
//           </div>
//         </div>
//       </header>
//       <div className="m-4 max-w-6xl">{renderTabContent()}</div>
//     </>
//   );
// }

// // Company Settings Content Component
// function CompanySettingsContent() {
//   const router = useRouter();

//   return (
//     <>
//       <div className="rounded-xl border border-[#e5e7eb] bg-white p-4 sm:p-6 shadow-sm">
//         <div className="flex flex-col items-center text-center gap-4 md:block sm:items-center sm:justify-start sm:text-left">
//           <div className="md:flex gap-8 items-center">
//             <Image
//               src="/touchpoint360.png"
//               alt="Touchpoint 360"
//               width={96}
//               height={96}
//               className="mx-auto md:mx-0 sm:h-[112px] sm:w-[112px] h-[96px] w-[96px]"
//             />

//             <div>
//               <h2 className="text-3xl sm:text-3xl font-semibold text-[#111827]">
//                 Touchpoint 360
//               </h2>

//               <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-10 pt-4">
//                 <Stat Icon={Users} label="Active members" value="20" />
//                 <div
//                   className="hidden sm:block h-10 w-px bg-[#e5e7eb]"
//                   aria-hidden="true"
//                 />
//                 <Stat Icon={Globe} label="Countries" value="04" />
//                 <div
//                   className="hidden sm:block h-10 w-px bg-[#e5e7eb]"
//                   aria-hidden="true"
//                 />
//                 <Stat Icon={User} label="Administrators" value="02" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="mt-6">
//         <SectionCard
//           title="Company information"
//           action={
//             <button
//               onClick={() => router.push("/app/settings/company/company-info")}
//               className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium text-[#5E2A8C] border-[#5E2A8C] hover:bg-purple-300 hover:text-purple-950 active:bg-[#5E2A8C] transition-colors"
//               type="button"
//               aria-label="Edit company information"
//             >
//               <Image
//                 src="/edit.svg"
//                 width={16}
//                 height={16}
//                 alt=""
//                 aria-hidden
//                 className="transition group-hover:invert group-hover:brightness-0"
//               />
//               Edit
//             </button>
//           }
//         >
//           <div className="space-y-3">
//             <FieldRow label="Company/Brand name" value="Touchpoint 360" />
//             <FieldRow label="Registered name" value="Touchpoint 360" />
//             <FieldRow
//               label="Registration Number/EIN ID"
//               value={<span className="text-[#9ca3af]">--</span>}
//             />
//             <FieldRow
//               label="Country of incorporation"
//               value={
//                 <div className="flex items-center gap-2">
//                   <Image
//                     src="/nigeria.svg"
//                     width={20}
//                     height={14}
//                     alt="Nigeria flag"
//                   />
//                   <span>Nigeria</span>
//                 </div>
//               }
//             />
//             <FieldRow
//               label="Size"
//               value={<span className="text-[#9ca3af]">--</span>}
//             />
//             <FieldRow
//               label="VAT number"
//               value={<span className="text-[#9ca3af]">--</span>}
//             />
//             <FieldRow
//               label="Company public website URL"
//               value={
//                 <a
//                   href="https://www.touchpoint360.com/"
//                   className="text-[var(--violet-base)] hover:underline"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   https://www.touchpoint360.com/
//                 </a>
//               }
//             />
//           </div>
//         </SectionCard>
//       </div>

//       <div className="mt-6">
//         <SectionCard title="Addresses">
//           <div className="space-y-4">
//             <div>
//               <div className="text-sm text-[#6b7280] mb-2">Billing address</div>
//               <div className="flex items-center justify-center gap-3 rounded-xl border border-gray-300 px-4 py-4">
//                 <Image
//                   src="/warning.svg"
//                   width={20}
//                   height={20}
//                   alt="Warning"
//                 />
//                 <div className="text-sm text-black">
//                   Please{" "}
//                   <button
//                     onClick={() =>
//                       router.push(
//                         "/app/settings/company/addresses/billing-address"
//                       )
//                     }
//                     className="underline !decoration-[#5E2A8C] !text-[#5E2A8C] hover:no-underline"
//                   >
//                     add
//                   </button>{" "}
//                   your company billing address
//                 </div>
//               </div>
//             </div>
//             <div>
//               <div className="text-sm text-[#6b7280] mb-2">
//                 Registered address
//               </div>
//               <div className="flex items-center justify-center gap-3 rounded-xl border border-gray-300 px-4 py-4">
//                 <Image
//                   src="/warning.svg"
//                   width={20}
//                   height={20}
//                   alt="Warning"
//                 />
//                 <div className="text-sm text-black">
//                   Please{" "}
//                   <button
//                     onClick={() =>
//                       router.push(
//                         "/app/settings/company/addresses/registered-address"
//                       )
//                     }
//                     className="underline !decoration-[#5E2A8C] !text-[#5E2A8C] hover:no-underline"
//                   >
//                     add
//                   </button>{" "}
//                   your registered address
//                 </div>
//               </div>
//             </div>
//           </div>
//         </SectionCard>
//       </div>
//     </>
//   );
// }
