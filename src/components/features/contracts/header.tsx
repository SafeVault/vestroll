"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface PageHeaderProps {
  title?: string;
}

function PageHeader({ title = "Create Contract" }: PageHeaderProps) {
const router = useRouter()
  return (
    <aside className="sm:-ml-8 lg:-ml-10 -mt-6">
      <div className="border space-y-1 border-[#e5e7eb] w-full bg-white p-6 shadow-sm h-[100]">
        <div className="flex items-center cursor-pointer" onClick={() => router.back()}>
          <ArrowLeft size={16} className="text-gray-700"/>
          <span className="text-xs font-medium text-gray-700 lowercase">Back</span>
        </div>
        <h2 className="font-bold text-2xl">{title}</h2>
      </div>
    </aside>
  );
}

export default PageHeader;
