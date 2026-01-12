"use client";

import React from "react";

const payouts = [
  { id: 1, date: "Jan 12, 2026", amount: "$1,200.00", status: "Successful", desc: "Monthly Salary" },
  { id: 2, date: "Dec 12, 2025", amount: "$1,200.00", status: "Successful", desc: "Monthly Salary" },
  { id: 3, date: "Nov 12, 2025", amount: "$1,200.00", status: "Successful", desc: "Monthly Salary" },
  { id: 4, date: "Oct 25, 2025", amount: "$500.00", status: "Successful", desc: "Performance Bonus" },
];

const PayoutHistory = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Payout History</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {payouts.map((payout) => (
              <tr key={payout.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-600 font-medium">{payout.date}</td>
                <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{payout.desc}</td>
                <td className="px-6 py-4 text-sm text-gray-900 font-bold">{payout.amount}</td>
                <td className="px-6 py-4 text-sm text-right">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                    {payout.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayoutHistory;
