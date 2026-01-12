"use client";

import { useState } from "react";
import * as Lucide from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { X, FileText, Clock, User, Building, ArrowLeft, ExternalLink, Check } from "lucide-react";



function pickIcon(names: string[]) {
  for (const n of names) {
    const Comp = (Lucide as any)[n];
    if (Comp) return Comp as React.ComponentType<any>;
  }

  const Fallback = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" fill="none" />
    </svg>
  );

  return Fallback;
}

const XIcon = pickIcon(["X", "XOctagon", "XSquare"]);
const FileTextIcon = pickIcon(["FileText", "File", "FileText2"]);
const ClockIcon = pickIcon(["Clock4", "Clock", "Clock1"]);
const UserIcon = pickIcon(["User", "User2"]);
const BuildingIcon = pickIcon(["Building2", "Building", "Bank"]);

export default function TimesheetDetails() {
  const [status, setStatus] = useState("Pending");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const handleApprove = () => {
    setStatus("Approved");
  };

  const handleReject = () => {
    if (!reason.trim()) {
      setError("Please provide a reason for rejection.");
      return;
    }
    setStatus("Rejected");
    setShowRejectModal(false);
    setReason("");
    setError("");
  };

  return (
    <div className="p-4 md:p-8 bg-[#F9FAFB] min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex-col space-y-2">
          <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
          <ArrowLeft/>
          Back
        </button>
        <h1 className="text-xl font-bold">Timesheet Details</h1>
        </div>
        {status === "Pending" && (
          <div className="hidden md:flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowRejectModal(true)}
              className="border bg-white border-purple-800 text-purple-800"
            >
              <span className="inline-flex items-center gap-2">Reject<XIcon size={16} /> </span>
            </Button>
            <Button
              className="bg-purple-800  text-white hover:bg-purple-800"
              onClick={handleApprove}
            >
                           <span className="inline-flex items-center gap-2"> Accept <Check size={16} /></span>


            </Button>
          </div>
        )}
      </div>

      <Card className="p-5 md:p-6 rounded-2xl bg-white shadow-sm">
        <div className="flex md:flex-row justify-between items-start md:items-center gap-2 mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-purple-200 py-3 px-3 rounded-md">
              <ClockIcon className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-800">
              12 hours, 21 minutes
            </p>
             <p className="text-sm text-gray-400">
              14th oct 25 - 25th oct 25
            </p>
            </div>
          </div>
                     <div className="flex-col flex">
                       <span className="text-sm text-gray-600">status</span>

          <span
            className={cn(
              "text-sm px-3 py-1 rounded-full font-medium",
              status === "Approved"
                ? "bg-green-50 border border-green-400 text-green-600"
                : status === "Rejected"
                ? "bg-red-50 border border-red-400 text-red-600"
                : "bg-yellow-50 border border-yellow-400 text-yellow-600"
            )}
          >
            {status}
          </span>
                     </div>
        </div>

        <div className="space-y-4">
          <div className="flex bg-gray-100 py-1 px-1  justify-between text-sm">
            <p className="text-gray-500">Rate</p>
                        <p className="text-gray-500">Total amount</p>

          </div>
          <div className="flex justify-between text-md">
                        <p className="font-medium">10 USDT / Hour</p>

            <p className="font-medium">1200 USDT</p>
          </div>

          <div>
            <p className="text-gray-500 bg-gray-100 py-1 px-1 text-sm mb-1">Description</p>
            <p className="text-gray-700 text-md font-bold">
              Monthly subscription for design and creative tools used for client
              deliverables.
            </p>
          </div>

          <div className="  text-sm">
            <div>
             <div className="bg-gray-100 py-1 px-1 flex items-center justify-between">
               <p className="text-gray-500 ">Attachment</p>
                            <p className="text-gray-500">Submitted on</p>
             </div>

              <div className=" mt-2 text-purple-600 cursor-pointer">
               <div className="justify-between items-center flex">
                 <span>File_name.pdf</span>
                              <p className="text-gray-700">14th Oct 2025</p>
               </div>

              </div>
            </div>
            <div>
            </div>
          </div>
        </div>
      </Card>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 rounded-2xl">
      <div className="flex justify-between">
            <div className="flex items-center gap-3">
            <div className="bg-purple-200 py-3 px-3 rounded-md">
            <BuildingIcon className="text-purple-600" size={20} />

            </div>
            <div>
              <p className="font-medium">Quikdash</p>
              <p className="text-sm text-gray-500">Pay as you go</p>
            </div>
          </div>
        <button className="text-purple-600 relative top-3 gap-1 flex items-center text-sm hover:underline">
            View details
            
            <ExternalLink size={15}/>
          </button>
      </div>
        </Card>

        <Card className="p-4  rounded-2xl">
          <div className="flex justify-between gap-4">
            <div className="flex items-center gap-3">
            <div className="bg-purple-200 py-3 px-3 rounded-md">
            <UserIcon className="text-purple-600" size={20} />

            </div>
            <div>
              <p className="font-medium">James Akinbiola</p>
              <p className="text-sm text-gray-500">Front-end Developer</p>
            </div>
          </div>
          <button className="text-purple-600 relative top-3  gap-1 flex items-center text-sm hover:underline">
            View details
            
            <ExternalLink size={15}/>
          </button>
          </div>
        </Card>
      </div>

      {showRejectModal && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50 px-3">
          <div className="bg-white w-full max-w-md rounded-2xl p-4 sm:p-6 relative shadow-lg">
            <button
              onClick={() => setShowRejectModal(false)}
              className="absolute top-4 left-4 text-gray-900 hover:text-gray-700"
            >
              <X size={25} />
            </button>

            <h3 className="text-base text-center relative bottom-3 sm:text-lg font-semibold mb-4">Reject Timesheet</h3>
        
            <textarea
              className="w-full mt-4 outline-none border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={4}
              placeholder="Enter reason for rejection..."
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                setError("");
              }}
            ></textarea>

            {error && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">{error}</p>
            )}

            <Button
              onClick={handleReject}
              className="w-full mt-5 bg-purple-800 text-white hover:bg-red-700 text-sm sm:text-base"
            >
              Reject
            </Button>
          </div>
        </div>
      )}

      {status === "Pending" && (
        <div className="md:hidden grid grid-cols-2 gap-2 mt-24">
            <Button
              variant="outline"
              onClick={() => setShowRejectModal(true)}
              className="border bg-white border-purple-800 text-purple-800 w-full"
            >
              <span className="inline-flex items-center gap-2">Reject<XIcon size={16} /> </span>
            </Button>
            <Button
              className="bg-purple-800  text-white hover:bg-purple-800 w-full"
              onClick={handleApprove}
            >
                           <span className="inline-flex items-center gap-2"> Accept <Check size={16} /></span>


            </Button>
        </div>
      )}
    </div>
  );
}
