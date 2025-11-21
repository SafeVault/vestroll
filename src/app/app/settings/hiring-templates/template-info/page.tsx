"use client";

import React, { useRef, useState } from "react";
import InputField from "@/components/InputField";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface FormData {
  jobTitle: string;
  description: string;
  timeOffDays: number;
}

export default function TemplateInfoPage() {
  const logoInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
    // alert("Going back to previous step...");
  };

  const [formData, setFormData] = useState<FormData>({
    jobTitle: "",
    description: "",
    timeOffDays: 0,
  });

  const isFormValid = true; // Placeholder for form validation logic

  return (
    <div className="min-h-screen ">
      <div className=" bg-white p-4 border-b border-gray-300">
        <div className="">
          <button
            onClick={handleGoBack}
            className="text-gray-400 text-sm mb-1 hover:text-gray-600 transition-colors"
          >
            ← Back
          </button>
          <h1 className="text-2xl mb-2 font-semibold text-gray-900">
            Hiring Template
          </h1>
        </div>
        <div className="">
          <button className="p-3">Edit</button>
          <button className="p-3">Delete</button>
        </div>
      </div>
      <div className="bg-gray-50 flex p-4">
        <div className="w-full max-w-lg bg-white rounded-lg shadow-sm p-6 md:p-8">
          <div className="flex flex-col gap-4 text-black">
            <InputField
              id="jobTitle"
              label="Job Title"
              value={formData.jobTitle}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  companyName: e.target.value,
                }))
              }
              placeholder="job title"
            />

            <InputField
              id="description"
              label="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  registeredName: e.target.value,
                }))
              }
              placeholder="--"
            />

            <InputField
              id="timeoffdays"
              label="Time Off"
              value={formData.timeOffDays.toString()} // Convert number to string
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  timeOffDays:
                    e.target.value === "" ? 0 : parseInt(e.target.value) || 0, // Convert back to number
                }))
              }
              placeholder="--"
            />
          </div>

          <div className="mt-12">
            <Button
              disabled={!isFormValid}
              className={`w-full text-white px-8 py-6 rounded-lg text-base font-semibold ${
                isFormValid
                  ? "bg-[#5E2A8C] hover:bg-[#4A1F73]"
                  : "bg-gray-500 cursor-not-allowed"
              }`}
            >
              Save changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
