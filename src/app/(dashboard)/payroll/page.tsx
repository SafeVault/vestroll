"use client";

import React, { useState } from "react";
import { Filter, ChevronDown, ShareIcon } from "lucide-react";
import Image from "next/image";
import { Geist } from "next/font/google";
import searchIcon from "@public/images/search-payroll.png";
import PageNavHeader from "@/components/shared/reuseables/PageNavHeader";
import ProfileDetails from "@/components/features/payroll/ProfileDetails";
import QuickDash from "@/components/features/payroll/QuickDash";
import PayoutHistory from "@/components/features/payroll/PayoutHistory";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function PayrollPage() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div
      className={`min-h-screen bg-[#F5F6F7] ${geistSans.variable} font-sans`}
    >
      {/* Header Section */}
      <div className="bg-white border-b border-[#DCE0E5] px-4 sm:px-6 py-4 sm:py-6">
        <div className="max-w-9xl mx-auto">
          {/* Top section with title and export button */}
          <div className="flex sm:flex-row sm:items-center sm:justify-between gap-x-36 mb-6">
            <div>
              <p className="text-sm text-[#6B7280] mb-1">Overview</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#111827]">
                Payroll
              </h1>
            </div>
            <button className="inline-flex items-center justify-center px-4 py-2 h-12 ml-auto md:py-2 bg-[#5E2A8C] text-white font-medium rounded-full hover:bg-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#5E2A8C] focus:ring-offset-2 transition-colors duration-200 gap-2">
              <ShareIcon className="h-4 w-4" />
              Export
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-[#E5E7EB]">
            <button
              onClick={() => setActiveTab("Overview")}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors duration-200 ${
                activeTab === "Overview"
                  ? "border-[#5E2A8C] text-[#5E2A8C]"
                  : "border-transparent text-[#6B7280] hover:text-[#374151]"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("Payout history")}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors duration-200 ${
                activeTab === "Payout history"
                  ? "border-[#5E2A8C] text-[#5E2A8C]"
                  : "border-transparent text-[#6B7280] hover:text-[#374151]"
              }`}
            >
              Payout history
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-9xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === "Overview" && (
          <>
            {/* image Banner */}
            <div
              className="bg-gradient-to-r from-[#5E2A8C] to-[#A855F7] rounded-2xl p-6 sm:p-8 mb-5 text-white relative overflow-hidden"
              style={{
                backgroundImage: "url(/images/payout-group.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                Set up payroll for your employees
              </h2>
              <p className="text-purple-100 mb-6 text-sm sm:text-base">
                Let&apos;s make things easier! Automate payroll disbursement for
                your employees.
              </p>
              <button className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#5E2A8C] font-medium rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-600 transition-colors duration-200">
                New contract
              </button>
            </div>

            {/* Payout Schedule Section */}
            <div className="mb-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                <h2 className="hidden md:flex lg:flex text-xl font-semibold text-[#111827]">
                  Payout Schedule
                </h2>
                <h2 className="flex md:hidden lg:hidden text-xl font-semibold text-[#111827]">
                  Payroll
                </h2>

                {/* Search Bar and Filter */}
                <div className="flex justify-between gap-2">
                  <div className="relative">
                    <input
                      type="search"
                      placeholder="Search by name..."
                      className="w-full sm:w-80 pl-4 pr-24 py-2.5 bg-white border border-[#DCE0E5] rounded-lg text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#5E2A8C] focus:border-[#5E2A8C] transition-colors duration-200"
                    />
                    <svg
                      className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF]"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Document/Paper */}
                      <rect
                        x="4"
                        y="3"
                        width="12"
                        height="16"
                        rx="1"
                        fill="#F3F4F6"
                        stroke="#E5E7EB"
                        strokeWidth="1"
                      />
                      <rect
                        x="5"
                        y="2"
                        width="12"
                        height="16"
                        rx="1"
                        fill="#F9FAFB"
                        stroke="#E5E7EB"
                        strokeWidth="1"
                      />
                      <rect
                        x="6"
                        y="1"
                        width="12"
                        height="16"
                        rx="1"
                        fill="white"
                        stroke="#E5E7EB"
                        strokeWidth="1"
                      />

                      {/* Document lines */}
                      <line
                        x1="8"
                        y1="5"
                        x2="14"
                        y2="5"
                        stroke="#E5E7EB"
                        strokeWidth="0.5"
                      />
                      <line
                        x1="8"
                        y1="7"
                        x2="15"
                        y2="7"
                        stroke="#E5E7EB"
                        strokeWidth="0.5"
                      />
                      <line
                        x1="8"
                        y1="9"
                        x2="13"
                        y2="9"
                        stroke="#E5E7EB"
                        strokeWidth="0.5"
                      />
                      <line
                        x1="8"
                        y1="11"
                        x2="14"
                        y2="11"
                        stroke="#E5E7EB"
                        strokeWidth="0.5"
                      />

                      {/* Magnifying glass */}
                      <circle
                        cx="14"
                        cy="14"
                        r="3.5"
                        fill="none"
                        stroke="#8B5CF6"
                        strokeWidth="1.5"
                      />
                      <circle cx="14" cy="14" r="2.5" fill="#F3F4F6" />
                      <line
                        x1="16.5"
                        y1="16.5"
                        x2="19"
                        y2="19"
                        stroke="#8B5CF6"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />

                      {/* Dollar sign in magnifying glass */}
                      <text
                        x="14"
                        y="16"
                        textAnchor="middle"
                        fill="#8B5CF6"
                        fontSize="3"
                        fontWeight="bold"
                      >
                        $
                      </text>
                    </svg>
                  </div>
                  <button className="flex items-center justify-center px-3 py-2.5 bg-white border border-[#DCE0E5] rounded-lg text-[#6B7280] hover:bg-[#F9FAFB] focus:outline-none focus:ring-2 focus:ring-[#5E2A8C] transition-colors duration-200">
                    <Filter className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Empty State */}
            <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm ">
              <div className="flex flex-col items-center justify-center py-16 sm:py-20 px-4 text-center">
                {/* Empty State Illustration */}
                <div className="mb-8">
                  {/* <img
                  className="bg-gradient-to-r from-[#5E2A8C] to-[#A855F7] rounded-2xl p-6 sm:p-8 mb-8 text-white relative overflow-hidden"
                  style={{
                    backgroundImage: "url(/images/payout-group.png)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }} /> */}
                  <Image
                    className="h-14 w-14"
                    width={100}
                    src={searchIcon}
                    alt="Payout Group"
                  />
                </div>

                {/* Empty State Message */}
                <h3 className="text-xl font-semibold text-[#111827] mb-3">
                  You haven&apos;t set up any payrolls.
                </h3>
                <p className="text-[#9CA3AF] max-w-sm text-sm">
                  Employees you put on payroll will be displayed here
                </p>
              </div>
            </div>

            {/* Additional payroll UI below empty state */}
            <div className="">
              <PageNavHeader name="James Akinbiola" />
              <div className="p-4 md:px-6 md:pt-6 flex flex-col lg:w-max ">
                <div className="flex lg:flex-row flex-col gap-6 lg:gap-10 mb-6">
                  <ProfileDetails />
                  <QuickDash />
                </div>
                <PayoutHistory />
              </div>
            </div>
          </>
        )}

        {activeTab === "Payout history" && <PayoutHistory />}
      </div>
    </div>
  );
}
