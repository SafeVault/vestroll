"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { MoveLeft } from "lucide-react";
import EmployeeProfileHeader from "@/components/features/team-management/EmployeeProfileHeader";
import ContractCard from "@/components/features/team-management/ContractCard";

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  image: string;
}

const TeamManagementPage: React.FC = () => {
  const router = useRouter();
  // Default employee data if none is provided
  const defaultEmployee: Employee = {
    id: "1",
    name: "James Akinbiola",
    email: "mailjames@gmail.com",
    phone: "+234 904 364 2019",
    address:
      "No 5 James Robertson Stedu/Oguntana Drive, Surulere, Nigeria | 145241",
    image: "/profileImage.png",
  };

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-3">
        <button
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
          onClick={() => router.back()}
        >
          <MoveLeft className="w-4 h-4" /> 
          <span className="text-sm font-medium">Back</span>
        </button>
        <h1 className="text-2xl font-bold text-gray-900">{defaultEmployee.name}</h1>
      </div>

      <div className="space-y-6">
        <section>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Personal Information
          </h2>
          <EmployeeProfileHeader defaultEmployee={defaultEmployee} />
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Contracts</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ContractCard 
              contract={{
                id: "1",
                type: "Full-time Contract",
                role: "Front-end Developer",
                status: "Active",
                issuedDate: "Jan 12, 2026"
              }}
            />
            <ContractCard 
              contract={{
                id: "2",
                type: "Part-time Contract",
                role: "UI/UX Designer",
                status: "Pending",
                issuedDate: "Jan 10, 2026"
              }}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default TeamManagementPage;
