"use client"


import React from "react";
import ProjectDropdown from "./ProjectDropdown";
import AccordionSection from "./AccordionSection";
import EmployeeDetails from "./EmployeeDetails";
import PaymentDetails from "./PaymentDetails";
import ComplianceDetails from "./ComplianceDetails";
import { ArrowLeft } from "lucide-react";

export default function ContractDetailsPage() {
  return (
   <>
    <div className="flex bg-white flex-col border-b p-4 gap-2">
        <div  className="mx-6">
            <div>
            <button
          onClick={() => window.history.back()}
          className=" flex items-center gap-1 cursor-pointer text-gray-400 rounded-full not-odd:"
        >
          <ArrowLeft/> back
        </button>
        </div>
        <h1 className="text-xl md:text-2xl font-semibold">Create contract</h1>
        </div>
      </div>
      
    <div className="min-h-screen bg-gray-50 p-4 md:p-8  flex flex-col">
<div className="bg-white p-6 rounded-2xl">
             <div className="flex flex-col">
                <span className="text-gray-600 text-xl font-medium">Review & Sign</span>

      <div className="flex items-center gap-2 my-6 justify-between">
        <div className="flex-1 h-1 bg-purple-800 rounded-full"></div>
        <div className="flex-1 h-1 bg-purple-800 rounded-full"></div>
        <div className="flex-1 h-1 bg-purple-800 rounded-full"></div>
        <div className="flex-1 h-1 bg-purple-800 rounded-full"></div>
      </div>
              </div>

      <ProjectDropdown />

      <div className="space-y-4 mt-6">
        <AccordionSection  title="Employee details">
          <EmployeeDetails />
        </AccordionSection>

        <AccordionSection title="Payment details">
          <PaymentDetails />
        </AccordionSection>

        <AccordionSection title="Compliance">
          <ComplianceDetails />
        </AccordionSection>
      </div>

      <div className="mt-8 flex justify-baseline gap-4 pt-4">
        <button className="px-6 py-2 w-full border border-purple-800 text-purple-800 rounded-md hover:bg-gray-100">
          Prev
        </button>
        <button className="px-6 w-full py-2 bg-purple-800 text-white rounded-md hover:bg-purple-700">
          Create
        </button>
      </div>
    </div>     

     
    </div>
   </>
  );
}
