"use client";

import React from "react";
import Image from "next/image";
import { currencies } from "@/util/constant";

interface Contract {
  id: string;
  title: string;
  amount: number;
  currency: string;
  status: "Active" | "Completed" | "Fixed rate";
  startDate: string;
  endDate: string;
  rateType: "Fixed rate" | "Hourly rate";
}

export default function ContractGrid() {
  const contractsData: Contract[] = [
    {
      id: "1",
      title: "Invyler Website & Webpage Design",
      amount: 6000.0,
      currency: "USD",
      status: "Active",
      startDate: "20th Oct 22",
      endDate: "26th Nov 22",
      rateType: "Fixed rate",
    },
    {
      id: "2",
      title: "Invyler Mobile App Design",
      amount: 4500.0,
      currency: "USD",
      status: "Completed",
      startDate: "15th Sep 22",
      endDate: "10th Oct 22",
      rateType: "Fixed rate",
    },
    {
      id: "3",
      title: "Brand Identity Design",
      amount: 2800.0,
      currency: "USD",
      status: "Completed",
      startDate: "15th Nov 22",
      endDate: "30th Nov 22",
      rateType: "Fixed rate",
    },
  ];

  const getStatusStyles = (status: Contract["status"]) => {
    switch (status) {
      case "Active":
        return "bg-green-fill text-green-default border-green-stroke";
      case "Completed":
        return "bg-blue-fill text-blue-default border-blue-stroke";
      case "Fixed rate":
        return "bg-yellow-fill text-yellow-default border-yellow-stroke";
      default:
        return "bg-fill-secondary text-text-secondary border-stroke-secondary";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
    {contractsData.length === 0 ? (
      <div className="col-span-full text-center py-10 text-text-secondary">
        No contracts available
      </div>
    ) : (
      contractsData.map((contract) => (
        <div
          key={contract.id}
          className="bg-background-b1 border border-stroke-primary rounded-lg py-4 px-4 hover:shadow-lg transition-shadow duration-200"
        >
          {/* Header: Icon + Amount */}
          <div className="flex items-center justify-between mb-6">
            <div className="w-10 h-10 bg-fill-primary border border-stroke-secondary rounded-lg flex items-center justify-center">
              <Image
                src="/note.svg"
                alt="Contract type"
                width={20}
                height={20}
              />
            </div>

            <div className="flex items-center gap-2 bg-fill-primary rounded-xl px-3 py-1">
              <Image src={currencies[0].icon} alt="Currency" width={15} height={15} />
              <span className="text-sm font-medium text-text-primary">
                {contract.amount.toLocaleString()} {contract.currency}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-text-primary text-sm sm:text-base mb-4">
            {contract.title}
          </h3>

          {/* Date Range */}
          <div className="flex items-center gap-2 mb-6 text-text-tertiary">
            <Image
              src="/calander.svg"
              alt="Calander type"
              width={20}
              height={20}
            />
            <span className="text-xs sm:text-sm">
              {contract.startDate} - {contract.endDate}
            </span>
          </div>

          {/* Divider */}
          <div className="border-t border-stroke-primary mb-4"></div>

          {/* Footer: Rate Type + Status */}
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 text-text-secondary text-xs">
              {contract.rateType}
            </span>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyles(
                contract.status
              )}`}
            >
              {contract.status}
            </span>
          </div>
        </div>
      ))
    )}
  </div>
);
}
