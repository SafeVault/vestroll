"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Bold,
  Italic,
  Underline,
  List,
  AlignLeft,
} from "lucide-react";

interface FormData {
  jobTitle: string;
  description: string;
  timeOffDays: number;
}

interface FormErrors {
  jobTitle?: string;
  description?: string;
  timeOffDays?: string;
}

const HiringTemplatePage: React.FC = () => {
  const router = useRouter();
  const [jobTitle, setJobTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [timeOffDays, setTimeOffDays] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const editorRef = useRef<HTMLDivElement>(null);

  // Rich text editor functions
  const execCommand = (command: string, value?: string): void => {
    document.execCommand(command, false, value || "");
    editorRef.current?.focus();
  };

  const handleEditorInput = (e: React.FormEvent<HTMLDivElement>): void => {
    const target = e.target as HTMLDivElement;
    setDescription(target.innerHTML);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!jobTitle.trim()) {
      newErrors.jobTitle = "Job title is required";
    }

    if (
      !description.trim() ||
      description === "<br>" ||
      description === "<div><br></div>"
    ) {
      newErrors.description = "Description is required";
    }

    const timeOffValue = parseInt(timeOffDays);
    if (!timeOffDays || isNaN(timeOffValue) || timeOffValue < 0) {
      newErrors.timeOffDays = "Time off days must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      const formData: FormData = {
        jobTitle,
        description,
        timeOffDays: parseInt(timeOffDays),
      };

      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Form submitted:", formData);

      const newTemplate = {
        id: Date.now(),
        jobTitle: formData.jobTitle,
        description: formData.description,
        timeOffDays: formData.timeOffDays,
      };

      const existingTemplates = JSON.parse(
        localStorage.getItem("hringTeplates") || "[]"
      );

      // Add new template
      const updatedTemplates = [...existingTemplates, newTemplate];
      localStorage.setItem("hiringTemplates", JSON.stringify(updatedTemplates));

      alert("Template created successfully!");

      // Redirect back to templates list or previous page
      router.push("/app/settings");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error creating template. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = (): void => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="w-full bg-white border-b border-gray-200">
        <div className="mx-auto px-4 sm:px-6 lg:px-8"></div>
      </div>

      {/* Main Content Area */}
      <div className="">
        {/* Page Header */}
        <div className="bg-white">
          <div className="mx-auto px-4 sm:px-6 py-6">
            <div className="flex flex-col items-start space-y-4">
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
                aria-label="Go back"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="ml-1 text-sm">Back</span>
              </button>
              <h1 className="text-2xl font-semibold text-gray-900">
                Create template
              </h1>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-lg  mx-auto text-gray-950">
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-8">
              {/* Job Title */}
              <div>
                <label
                  htmlFor="jobTitle"
                  className="block text-sm font-medium text-gray-700 mb-3"
                >
                  Job title
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  value={jobTitle}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setJobTitle(e.target.value)
                  }
                  className={`w-full px-4 py-4 bg-gray-50 border-0 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all placeholder-gray-400 ${
                    errors.jobTitle ? "ring-2 ring-red-500" : ""
                  }`}
                  placeholder="e.g., Senior Frontend Developer, Product Manager, etc."
                  aria-describedby={
                    errors.jobTitle ? "jobTitle-error" : undefined
                  }
                />
                {errors.jobTitle && (
                  <p
                    id="jobTitle-error"
                    className="mt-1 text-sm text-red-600"
                    role="alert"
                  >
                    {errors.jobTitle}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="flex flex-row justify-between text-sm font-medium text-gray-700 mb-3">
                  <span>Description</span>
                  {/* Rich Text Editor Toolbar */}
                  <div className="flex items-center space-x-1">
                    <button
                      type="button"
                      onClick={() => execCommand("bold")}
                      className="bg-[#F5F6F7] p-2 rounded-full text-gray-600 hover:text-gray-800 transition-colors"
                      title="Bold"
                      aria-label="Bold"
                    >
                      <Bold className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => execCommand("italic")}
                      className="bg-[#F5F6F7] p-2 rounded-full text-gray-600 hover:text-gray-800 transition-colors"
                      title="Italic"
                      aria-label="Italic"
                    >
                      <Italic className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => execCommand("underline")}
                      className="bg-[#F5F6F7] p-2 rounded-full text-gray-600 hover:text-gray-800 transition-colors"
                      title="Underline"
                      aria-label="Underline"
                    >
                      <Underline className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => execCommand("insertUnorderedList")}
                      className="p-2 bg-[#E8E5FA] rounded-full text-gray-600 hover:text-gray-800 transition-colors"
                      title="Bullet List"
                      aria-label="Bullet List"
                    >
                      <List className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => execCommand("insertOrderedList")}
                      className="p-2 bg-[#F5F6F7] rounded-full text-gray-600 hover:text-gray-800 transition-colors"
                      title="Numbered List"
                      aria-label="Numbered List"
                    >
                      <AlignLeft className="w-4 h-4" />
                    </button>
                  </div>
                </label>

                {/* Editor Area */}
                <div
                  ref={editorRef}
                  contentEditable
                  onInput={handleEditorInput}
                  className={`w-full min-h-64 p-6 bg-gray-50 border-0 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-base ${
                    errors.description ? "ring-2 ring-red-500" : ""
                  }`}
                  style={{ maxHeight: "400px", overflowY: "auto" }}
                  data-placeholder="Enter job description..."
                  role="textbox"
                  aria-multiline="true"
                  aria-label="Job description"
                  aria-describedby={
                    errors.description ? "description-error" : undefined
                  }
                />

                {errors.description && (
                  <p
                    id="description-error"
                    className="mt-1 text-sm text-red-600"
                    role="alert"
                  >
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Time Off Days */}
              <div>
                <label
                  htmlFor="timeOffDays"
                  className="block text-sm font-medium text-gray-700 mb-3"
                >
                  Time off (days)
                </label>
                <input
                  type="number"
                  id="timeOffDays"
                  value={timeOffDays}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTimeOffDays(e.target.value)
                  }
                  min="0"
                  className={`w-full px-4 py-3 text-gray-950 bg-gray-50 border-0 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.timeOffDays ? "ring-2 ring-red-500" : ""
                  }`}
                  placeholder="Enter number of days"
                  aria-describedby={
                    errors.timeOffDays ? "timeOffDays-error" : undefined
                  }
                />
                {errors.timeOffDays && (
                  <p
                    id="timeOffDays-error"
                    className="mt-1 text-sm text-red-600"
                    role="alert"
                  >
                    {errors.timeOffDays}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center pt-6">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-[#5E2A8C] cursor-pointer disabled:bg-purple-400 text-white font-medium rounded-lg transition-all disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Saving...</span>
                    </div>
                  ) : (
                    "Save template"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        [contentEditable="true"]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }

        [contentEditable="true"]:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
};

export default HiringTemplatePage;
