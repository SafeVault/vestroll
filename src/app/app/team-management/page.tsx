// This is the main dashboard component that orchestrates everything.
"use client";
import React, { useState } from "react";

// Import all our new components
import { NavigationTabs } from "./components/NavigationTabs";
import TeamMgtTimeSheet from "@/components/team-mgt/time-tracking";
import TeamMgtMilestone from "@/components/team-mgt/milestone";
import TeamMgtExpense from "@/components/team-mgt/expense";
import { Plus } from "lucide-react";
import TeamMgtTimeoff from "@/components/team-mgt/timeoff";
import Link from "next/link";
import TeamMgtEmployees from "@/components/team-mgt/employees";
import { generateMockEmployees } from "./utils";
import { ExportDropdown } from "./components/ExportDropDown";
import { CreateFirstContact } from "./components/CreateFirstContact";

const TeamManagementDashboard = () => {
  const [activeTab, setActiveTab] = useState("Employees");
  const [isExportOpen, setIsExportOpen] = useState(false);
  /* const [isFilterOpen, setIsFilterOpen] = useState(false); */

  const allEmployees = generateMockEmployees();

  const renderTabContent = () => {
    switch (activeTab) {
      case "Employees":
        return <TeamMgtEmployees employees={allEmployees} />;
      case "Time off":
        return <TeamMgtTimeoff />;
      case "Milestone":
        return <TeamMgtMilestone />
      case "Time tracking":
        return <TeamMgtTimeSheet />
      case "Expense":
        return <TeamMgtExpense />
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Overview</p>
              <h1 className="text-2xl font-bold text-gray-900">
                Team management
              </h1>
            </div>
            <div className="flex gap-2">
              <ExportDropdown
                isOpen={isExportOpen}
                onToggle={() => setIsExportOpen(!isExportOpen)}
              />
              {activeTab === "Time off" && (
                <Link className="flex items-center gap-2 bg-primary-500 text-white md:h-10 px-4 rounded-lg" href={"/app/team-management/create-timeoff"}>
                  <Plus /> <span className="hidden md:inline">Create request</span>
                </Link>
              )}
            </div>
          </div>
          <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {allEmployees.length === 0 ? (
          <CreateFirstContact />
        ) : (
          renderTabContent()
        )}
      </div>


      {isExportOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsExportOpen(false)}
        />
      )}

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default TeamManagementDashboard;
