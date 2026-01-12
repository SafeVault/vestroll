"use client"


import React, { useState } from "react";
import { ChevronDown, Clock, Calendar, NotebookPen, Palette, User, Wallet } from "lucide-react";

export default function ProjectDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white shadow-sm rounded-lg border p-4 md:p-6">
        <div className="flex justify-between">
            <span className=" font-bold text-lg">Project Details</span>
          <ChevronDown
          size={20}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
        </div>
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >

            <div className="flex gap-4 mt-6"> 
                  <div className="bg-purple-100 hidden lg:block py-3 px-3 h-16 rounded-2xl">
                <NotebookPen size={35} className=" text-purple-800 font-normal" />

              </div>
        <div>
          <h2 className="font-semibold text-lg">Insyder Website & Webapp Design</h2>
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mt-1">
      <span className="flex items-center gap-1 px-2 border border-gray-200 py-1 bg-gray-100 rounded-full">
        <Palette className="w-4 h-4 text-gray-600" />
        UI/UX Designer
      </span>
      <span className="flex items-center gap-1 px-2 border border-gray-200 py-1 bg-gray-100 rounded-full">
        <User className="w-4 h-4 text-gray-600" />
        Freelancer
      </span>
      <span className="flex items-center gap-1 px-2 border border-gray-200 py-1 bg-gray-100 rounded-full">
        <Wallet className="w-4 h-4 text-gray-600" />
        Fixed rate
      </span>
    </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-3">
            <div className="flex border border-gray-200 px-2 py-1 bg-gray-100 rounded-full items-center gap-1">
              <Clock size={14} /> 14 days notice
            </div>
            <div className="flex border border-gray-200 px-2 py-1 bg-gray-100 rounded-full items-center gap-1">
              <Calendar size={14} /> 25th Oct 22 - 28th Nov 22
            </div>
          </div>
        </div>
            </div>
      
      </div>

      {open && (
        <div className="mt-4 pt-3 text-sm text-gray-700">
            <span>Scope of work</span>
          <div className="bg-gray-100 p-3 rounded-xl mt-2 text-md font-bold">
            <p>
            Infrastructure Management: Manage and optimize cloud-based infrastructure,
            ensuring scalability and cost-effectiveness.
          </p>
          <p className="mt-2">
            CI/CD Pipeline Optimization: Expand pipelines to enable faster and more reliable deployments.
          </p>
          <p className="mt-2">
            Containerization: Implement Docker and Kubernetes for scalable systems.
          </p>
          </div>
        </div>
      )}
    </div>
  );
}
