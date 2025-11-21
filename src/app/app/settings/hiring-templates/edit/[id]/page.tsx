"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ChevronLeft,
  Bold,
  Italic,
  Underline,
  List,
  AlignLeft,
  Pencil,
  Trash2,
} from "lucide-react";
import DeleteTemplateConfirmationModal from "../../(components)/DeleteTemplateConfirmatinModal";

interface Template {
  id: number;
  jobTitle: string;
  description: string;
  timeOffDays: number;
}

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

export default function EditTemplatePage() {
  const router = useRouter();
  const params = useParams();
  const templateId = parseInt(params.id as string);

  console.log("Looking for template ID:", templateId);
  console.log("Type of templateId:", typeof templateId);
  console.log("Raw params.id:", params.id);

  const [template, setTemplate] = useState<Template | null>(null);
  const [formData, setFormData] = useState<FormData>({
    jobTitle: "",
    description: "",
    timeOffDays: 0,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const editorRef = useRef<HTMLDivElement>(null);

  // Load template data
  useEffect(() => {
    const savedTemplates = localStorage.getItem("hiringTemplates");
    console.log("localStorage contents:", savedTemplates);
    console.log("Raw localStorage:", savedTemplates);
    let templates: Template[] = [];

    console.log("Looking for template ID:", templateId);
    console.log("Type of templateId:", typeof templateId);

    if (savedTemplates) {
      templates = JSON.parse(savedTemplates);
    } else {
      // Fallback to initial mock data
      templates = [
        {
          id: 1,
          jobTitle: "Senior Frontend Developer",
          description:
            "Responsible for developing and maintaining web applications using React, TypeScript, and modern frontend frameworks. Works closely with UX designers and backend teams to deliver high-quality user experiences.",
          timeOffDays: 25,
        },
        {
          id: 2,
          jobTitle: "Product Manager",
          description:
            "Leads product development from conception to launch, working with cross-functional teams to define product vision, roadmap, and requirements. Conducts market research and user interviews to inform product decisions.",
          timeOffDays: 30,
        },
        {
          id: 3,
          jobTitle: "UX Designer",
          description:
            "Designs user-centered digital experiences and interfaces for web and mobile applications. Creates wireframes, prototypes, and high-fidelity designs while conducting user research and usability testing.",
          timeOffDays: 22,
        },
      ];
    }

    const foundTemplate = templates.find((t) => t.id === templateId);

    if (foundTemplate) {
      setTemplate(foundTemplate);
      setFormData({
        jobTitle: foundTemplate.jobTitle,
        description: foundTemplate.description,
        timeOffDays: foundTemplate.timeOffDays,
      });

      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.innerHTML = foundTemplate.description;
        }
      }, 100);
    } else {
      router.push("/app/settings/hiring-templates");
    }
    setIsLoading(false);
  }, [templateId, router]);

  // Rich text editor functions
  const execCommand = (command: string, value?: string): void => {
    document.execCommand(command, false, value || "");
    editorRef.current?.focus();
  };

  const handleEditorInput = (e: React.FormEvent<HTMLDivElement>): void => {
    const target = e.target as HTMLDivElement;
    setFormData((prev) => ({
      ...prev,
      description: target.innerHTML,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = "Job title is required";
    }

    if (
      !formData.description.trim() ||
      formData.description === "<br>" ||
      formData.description === "<div><br></div>"
    ) {
      newErrors.description = "Description is required";
    }

    if (formData.timeOffDays < 0) {
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
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update template in localStorage
      const savedTemplates = localStorage.getItem("hiringTemplates");
      if (savedTemplates) {
        const templates: Template[] = JSON.parse(savedTemplates);
        const updatedTemplates = templates.map((t) =>
          t.id === templateId ? { ...t, ...formData } : t
        );
        localStorage.setItem(
          "hiringTemplates",
          JSON.stringify(updatedTemplates)
        );
      }

      console.log("Template updated:", formData);
      alert("Template updated successfully!");

      // Redirect back to templates list
      router.push("/app/settings/");
    } catch (error) {
      console.error("Error updating template:", error);
      alert("Error updating template. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = (): void => {
    router.push("/app/settings");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "timeOffDays" ? parseInt(value) || 0 : value,
    }));
  };

  const handleDeleteClick = (): void => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async (): Promise<void> => {
    setIsDeleting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Delete template from localStorage
      const savedTemplates = localStorage.getItem("hiringTemplates");
      if (savedTemplates) {
        const templates: Template[] = JSON.parse(savedTemplates);
        const updatedTemplates = templates.filter((t) => t.id !== templateId);
        localStorage.setItem(
          "hiringTemplates",
          JSON.stringify(updatedTemplates)
        );
      }

      console.log("Template deleted:", templateId);
      alert("Template deleted successfully!");

      // Redirect back to templates list
      router.push("/app/settings/hiring-templates");
    } catch (error) {
      console.error("Error deleting template:", error);
      alert("Error deleting template. Please try again.");
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const handleCancelDelete = (): void => {
    setShowDeleteModal(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#5E2A8C] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading template...</p>
        </div>
      </div>
    );
  }

  if (isNaN(templateId)) {
    console.error("Invalid template ID:", params.id);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Invalid Template</p>
          <button
            onClick={handleBack}
            className="mt-4 px-4 py-2 bg-[#5E2A8C] text-white rounded-lg"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="w-full bg-white border-b border-gray-200">
        <div className="mx-auto px-4 sm:px-6 lg:px-8"></div>
      </div>

      {/* Main Content Area */}
      <div className="">
        {/* Page Header */}
        <div className="bg-white flex justify-between ">
          <div className=" px-4 sm:px-6 py-6">
            <div className="flex flex-col space-y-4">
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
                Hiring Template
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-4 mr-10">
            <button
              type="button"
              //onClick={()=>()}
              className="flex items-center px-6 py-3 text-white rounded-full bg-purple-700 transition-colors"
            >
              <Pencil className="w-5 h-5" />
              Edit
            </button>
            <button
              type="button"
              onClick={handleDeleteClick}
              className="flex items-center px-6 py-3 rounded-full border border-red-600 text-red-600 hover:bg-red-800 hover:text-white transition-colors cursor-pointer"
              aria-label="Go back"
            >
              <Trash2 className="w-5 h-5" />
              Delete
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-6xl">
            <div className="bg-white rounded-lg text-gray-900 shadow-sm p-8 space-y-8">
              <div className="flex flex-col items-center justify-center space-y-4">
                {/* Job Title */}
                <div className="w-full max-w-md items-center">
                  <input
                    type="text"
                    id="jobTitle"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-4 text-lg bg-gray-50 border-0 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all placeholder-gray-400 placeholder:text-base ${
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
                      className="mt-2 text-sm text-red-600"
                      role="alert"
                    >
                      {errors.jobTitle}
                    </p>
                  )}
                </div>

                {/* Time Off Days */}
                <div className="w-full max-w-sm flex justify-between">
                  <label
                    htmlFor="timeOffDays"
                    className=" text-sm font-medium text-gray-700 mb-3"
                  >
                    Time off (days)
                  </label>
                  <input
                    type="number"
                    id="timeOffDays"
                    name="timeOffDays"
                    value={formData.timeOffDays}
                    onChange={handleInputChange}
                    min="0"
                    className={`w-full px-4 py-4 text-lg text-gray-950 bg-gray-50 border-0 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all placeholder-gray-400 placeholder:text-base ${
                      errors.timeOffDays ? "ring-2 ring-red-500" : ""
                    }`}
                    placeholder="e.g., 20, 25, 30"
                    aria-describedby={
                      errors.timeOffDays ? "timeOffDays-error" : undefined
                    }
                  />
                  {errors.timeOffDays && (
                    <p
                      id="timeOffDays-error"
                      className="mt-2 text-sm text-red-600"
                      role="alert"
                    >
                      {errors.timeOffDays}
                    </p>
                  )}
                </div>
              </div>
              {/* Description */}
              <div>
                <label className="flex flex-row justify-between text-sm font-medium text-gray-700 mb-4">
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
                  data-placeholder="Describe the role, responsibilities, requirements, and any other important details about this position..."
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
                    className="mt-2 text-sm text-red-600"
                    role="alert"
                  >
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center pt-6">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-[#5E2A8C] cursor-pointer disabled:bg-purple-400 text-white font-medium rounded-lg transition-all disabled:cursor-not-allowed text-lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-base">Updating...</span>
                    </div>
                  ) : (
                    "Update Template"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DeleteTemplateConfirmationModal
        isOpen={showDeleteModal}
        isDeleting={isDeleting}
        templateName={template?.jobTitle || ""}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      {/* Custom Styles */}
      <style jsx>{`
        [contentEditable="true"]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
          font-size: 1rem;
          line-height: 1.5;
        }

        [contentEditable="true"]:focus {
          outline: none;
        }

        [contentEditable="true"] {
          font-size: 1rem;
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
}
