"use client";

import React from "react";
import { DollarSign, FileText, Clock } from "lucide-react";

const QuickDash = () => {
  return (
    <div className="flex-1 bg-white p-6 rounded-xl shadow-sm border border-[#e5e7eb]">
      <h2 className="text-lg font-semibold mb-6">Payroll Summary</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-green-600" />
            <span className="text-xs font-semibold text-green-700 uppercase tracking-wider">Total Paid</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">$12,450.00</p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">Pending</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">$2,100.00</p>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 col-span-1 sm:col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-purple-600" />
            <span className="text-xs font-semibold text-purple-700 uppercase tracking-wider">Active Contracts</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">8</p>
        </div>
      </div>
    </div>
  );
};

export default QuickDash;
