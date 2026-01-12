"use client";

import React from "react";
import Image from "next/image";

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  image: string;
}

const EmployeeProfileHeader = ({ defaultEmployee }: { defaultEmployee: Employee }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e5e7eb] mb-6">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex items-center gap-4">
          <Image
            src={defaultEmployee.image}
            alt={defaultEmployee.name}
            width={80}
            height={80}
            className="rounded-full bg-gray-100"
          />
          <div>
            <h2 className="text-xl font-bold text-gray-900">{defaultEmployee.name}</h2>
            <p className="text-gray-500 text-sm">{defaultEmployee.email}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 md:border-l md:pl-8 border-gray-100">
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Phone Number</p>
            <p className="text-sm text-gray-700 font-medium">{defaultEmployee.phone}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Address</p>
            <p className="text-sm text-gray-700 font-medium">{defaultEmployee.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfileHeader;
