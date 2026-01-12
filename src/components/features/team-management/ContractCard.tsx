"use client";

import React from "react";

import { Calendar, ShieldCheck } from "lucide-react";

interface Contract {
  id: string;
  type: string;
  role: string;
  status: "Active" | "Pending" | "Terminated";
  issuedDate: string;
}

const ContractCard = ({ contract }: { contract?: Contract }) => {
  const data = contract || {
    id: "1",
    type: "Full-time Contract",
    role: "Front-end Developer",
    status: "Active",
    issuedDate: "Jan 12, 2026",
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-[#e5e7eb] hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="bg-purple-50 p-2 rounded-lg">
          <ShieldCheck className="w-6 h-6 text-purple-600" />
        </div>
        <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${
          data.status === "Active" ? "bg-green-100 text-green-700" : 
          data.status === "Pending" ? "bg-yellow-100 text-yellow-700" : 
          "bg-red-100 text-red-700"
        }`}>
          {data.status}
        </span>
      </div>
      
      <h3 className="font-bold text-gray-900 mb-1">{data.type}</h3>
      <p className="text-sm text-gray-500 mb-6">{data.role}</p>
      
      <div className="flex items-center gap-2 text-[#7F8C9F] mt-auto pt-4 border-t border-gray-50">
        <Calendar className="w-4 h-4" />
        <span className="text-xs font-medium">Issued: {data.issuedDate}</span>
      </div>
    </div>
  );
};

export default ContractCard;
