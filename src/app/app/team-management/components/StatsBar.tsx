// Displays the statistics bar with total and active employees.

import { User } from "lucide-react";

type StatsBarProps = {
  totalEmployees: number;
  activeEmployees: number;
};

export const StatsBar = ({ totalEmployees, activeEmployees }: StatsBarProps) => {
  const percentage =
    totalEmployees > 0 ? (activeEmployees / totalEmployees) * 100 : 0;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
          <User size={24} className="text-primary-500" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-1">Total number</p>
          <h2 className="text-2xl font-bold text-gray-900">
            {totalEmployees} employees
          </h2>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">
            Active:{" "}
            <span className="font-semibold text-gray-900">
              {activeEmployees} employees
            </span>
          </p>
        </div>
      </div>
      <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-primary-500 h-2 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
