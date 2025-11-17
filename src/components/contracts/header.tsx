"use client";

import { PlusIcon } from "lucide-react";
import Link from "next/link";

function PageHeader() {
  return (
    <div>
      <header className="flex sm:flex-row items-center justify-between px-6 sm:pt-6 pb-1 space-y-1 sm:space-y-2 bg-white sm:border-b sm:border-[#DCE0E5] sm:pb-5">
        <div>
          <p className="text-xs text-[#7F8C9F] font-medium leading-[120%] tracking-[0%]">
            Overview
          </p>
          <h1 className="font-bold text-2xl sm:font-semibold sm:text-[1.75rem] text-text-header">
            Contracts
          </h1>
        </div>
        <Link href={'/app/contracts/create'} className="inline-flex items-center justify-center px-4 py-2 h-12 ml-auto md:py-2 bg-[#5E2A8C] text-white font-medium rounded-full hover:bg-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#5E2A8C] focus:ring-offset-2 transition-colors duration-200 gap-2 whitespace-nowrap">
          <PlusIcon className="h-4 w-4" />
          New contract
        </Link>
      </header>
    </div>
  );
}

export default PageHeader;
