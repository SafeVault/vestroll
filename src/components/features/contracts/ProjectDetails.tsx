"use client";

import { useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";

interface Client {
  id: string;
  name: string;
  email: string;
  company?: string;
}

interface ContractTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  duration: string;
  rate?: string;
  terms: string[];
}

interface FormData {
  hireType: "Freelancer" | "Contractor" | "";
  projectTitle: string;
  jobRole: string;
  scopeOfWork: string;
  client: Client | null;
  template: ContractTemplate | null;
  customTerms: string;
  rate: string;
  duration: string;
}

const mockTemplates: ContractTemplate[] = [
  {
    id: "1",
    name: "Web Development Contract",
    category: "Development",
    description: "Standard web development contract for frontend and backend projects",
    duration: "3-6 months",
    rate: "$75-150/hour",
    terms: ["Project scope definition", "Payment terms", "Intellectual property rights", "Confidentiality clause"]
  },
  {
    id: "2",
    name: "Design & Branding Contract",
    category: "Design",
    description: "Comprehensive design contract for branding and UI/UX projects",
    duration: "2-4 months",
    rate: "$60-120/hour",
    terms: ["Design deliverables", "Revision limits", "Usage rights", "Timeline milestones"]
  },
  {
    id: "3",
    name: "Marketing Consultant Contract",
    category: "Marketing",
    description: "Marketing strategy and execution contract template",
    duration: "1-12 months",
    rate: "$80-200/hour",
    terms: ["Campaign objectives", "Performance metrics", "Reporting schedule", "Budget allocation"]
  },
  {
    id: "4",
    name: "Content Writing Contract",
    category: "Content",
    description: "Content creation and copywriting service contract",
    duration: "1-6 months",
    rate: "$40-100/hour",
    terms: ["Content requirements", "Publishing rights", "Editorial process", "SEO guidelines"]
  }
];

const jobRoles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "UI/UX Designer",
  "Product Manager",
  "Marketing Manager",
  "Content Writer",
  "Data Analyst",
  "DevOps Engineer",
  "Mobile Developer"
];

export default function ProjectDetails() {
  const [formData, setFormData] = useState<FormData>({
    hireType: "Freelancer",
    projectTitle: "",
    jobRole: "",
    scopeOfWork: "",
    client: null,
    template: null,
    customTerms: "",
    rate: "",
    duration: ""
  });

  const [modals, setModals] = useState({
    templateSelection: false,
    jobRoleDropdown: false,
    createTemplate: false
  });

  const [templateSearch, setTemplateSearch] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newTemplateData, setNewTemplateData] = useState({
    jobRole: "",
    scopeOfWork: ""
  });

  const filteredTemplates = mockTemplates.filter(template =>
    template.name.toLowerCase().includes(templateSearch.toLowerCase()) ||
    template.description.toLowerCase().includes(templateSearch.toLowerCase())
  );

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.hireType) newErrors.hireType = "Please select hire type";
    if (!formData.projectTitle.trim()) newErrors.projectTitle = "Project title is required";
    if (!formData.jobRole) newErrors.jobRole = "Job role is required";
    if (!formData.scopeOfWork.trim()) newErrors.scopeOfWork = "Scope of work is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const openModal = (modal: keyof typeof modals, value: boolean = true) => {
    setModals(prev => ({ ...prev, [modal]: value }));
  };

  const closeModal = (modal: keyof typeof modals) => {
    setModals(prev => ({ ...prev, [modal]: false }));
  };

  const selectTemplate = (template: ContractTemplate) => {
    setFormData(prev => ({ ...prev, template, scopeOfWork: template.description }));
    closeModal("templateSelection");
  };

  const selectJobRole = (role: string) => {
    setFormData(prev => ({ ...prev, jobRole: role }));
    closeModal("jobRoleDropdown");
  };

  const saveNewTemplate = () => {
    setNewTemplateData({ jobRole: "", scopeOfWork: "" });
    closeModal("createTemplate");
  };

  const TemplateSelectionModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[80vh] overflow-hidden shadow-lg">
        <div className="p-6 border-b border-gray-200 relative">
          <h3 className="text-lg font-semibold text-center">Select template</h3>
          <button
            onClick={() => closeModal("templateSelection")}
            className="absolute left-6 top-6 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search…"
              value={templateSearch}
              onChange={(e) => setTemplateSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="p-6 max-h-64 overflow-y-auto">
          {filteredTemplates.map((template) => (
            <button
              key={template.id}
              onClick={() => selectTemplate(template)}
              className="w-full text-left p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
            >
              <div className="font-medium text-gray-900">{template.name}</div>
            </button>
          ))}
        </div>
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={() => setModals(prev => ({ ...prev, templateSelection: false, createTemplate: true }))}
            className="w-full py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors"
          >
            Create new template
          </button>
        </div>
      </div>
    </div>
  );

  const CreateTemplateModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[80vh] overflow-hidden shadow-lg">
        <div className="p-6 border-b border-gray-200 relative">
          <h3 className="text-lg font-semibold text-center">Create template</h3>
          <button
            onClick={() => closeModal("createTemplate")}
            className="absolute left-6 top-6 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Job role</label>
            <input
              type="text"
              placeholder="--"
              value={newTemplateData.jobRole}
              onChange={(e) => setNewTemplateData(prev => ({ ...prev, jobRole: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Scope of work</label>
            <textarea
              placeholder="--"
              value={newTemplateData.scopeOfWork}
              onChange={(e) => setNewTemplateData(prev => ({ ...prev, scopeOfWork: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              rows={4}
            />
          </div>
        </div>
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={saveNewTemplate}
            className="w-full py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors"
          >
            Save template
          </button>
        </div>
      </div>
    </div>
  );

  const JobRoleDropdown = () => (
    <div className="relative">
      <button
        onClick={() => openModal("jobRoleDropdown")}
        className={`w-full flex items-center justify-between px-4 py-3 border rounded-lg bg-white hover:border-gray-400 transition-colors ${
          errors.jobRole ? "border-red-300" : "border-gray-300"
        }`}
      >
        <span className={formData.jobRole ? "text-gray-900" : "text-gray-400"}>
          {formData.jobRole || "Select--"}
        </span>
        <ChevronDown size={20} className="text-gray-400" />
      </button>
      {modals.jobRoleDropdown && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-40 max-h-48 overflow-y-auto">
          {jobRoles.map((role) => (
            <button
              key={role}
              onClick={() => selectJobRole(role)}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
            >
              {role}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Form Content */}
      <div className="w-full mb-12 lg:mb-24">
        <div className="space-y-8">
          {/* Hire Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">Hire type</label>
            <div className="flex space-x-3">
              {["Freelancer", "Contractor"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFormData(prev => ({ ...prev, hireType: type as "Freelancer" | "Contractor" }))}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                    formData.hireType === type
                      ? "bg-purple-100 text-purple-700 border border-purple-200"
                      : "bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            {errors.hireType && <p className="text-red-500 text-sm mt-2">{errors.hireType}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Project Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Project title</label>
              <input
                type="text"
                placeholder="Placeholder"
                value={formData.projectTitle}
                onChange={(e) => setFormData(prev => ({ ...prev, projectTitle: e.target.value }))}
                className={`w-full px-4 py-3 border rounded-lg bg-gray-50 text-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white ${
                  errors.projectTitle ? "border-red-300" : "border-gray-300"
                }`}
              />
              {errors.projectTitle && <p className="text-red-500 text-sm mt-2">{errors.projectTitle}</p>}
            </div>

            {/* Job Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Job role</label>
              <JobRoleDropdown />
              {errors.jobRole && <p className="text-red-500 text-sm mt-2">{errors.jobRole}</p>}
            </div>
          </div>

          {/* Scope of Work */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700">Scope of work</label>
              <button
                onClick={() => openModal("templateSelection")}
                className="text-purple-600 text-sm hover:text-purple-700 transition-colors font-medium"
              >
                Select
              </button>
            </div>
            <div className={`min-h-[120px] p-4 border-2 border-dashed rounded-lg bg-gray-50 flex items-start ${
              errors.scopeOfWork ? "border-red-300" : "border-gray-300"
            }`}>
              {formData.scopeOfWork ? (
                <div className="w-full">
                  <textarea
                    value={formData.scopeOfWork}
                    onChange={(e) => setFormData(prev => ({ ...prev, scopeOfWork: e.target.value }))}
                    className="w-full bg-transparent border-none outline-none resize-none text-gray-700"
                    rows={4}
                  />
                </div>
              ) : (
                <button
                  onClick={() => openModal("templateSelection")}
                  className="text-gray-400 text-sm"
                >
                  Select
                </button>
              )}
            </div>
            {errors.scopeOfWork && <p className="text-red-500 text-sm mt-2">{errors.scopeOfWork}</p>}
          </div>

          {/* Client Selection */}
          {formData.client && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Selected Client</label>
              <div className="p-4 border border-gray-300 rounded-lg bg-white">
                <div>
                  <div className="font-medium text-gray-900">{formData.client.name}</div>
                  <div className="text-sm text-gray-500">{formData.client.email}</div>
                </div>
              </div>
            </div>
          )}

          {/* Template Selection */}
          {formData.template && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Selected Template</label>
              <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg bg-white">
                <div>
                  <div className="font-medium text-gray-900">{formData.template.name}</div>
                  <div className="text-sm text-gray-500">{formData.template.category}</div>
                </div>
                <button
                  onClick={() => openModal("templateSelection")}
                  className="text-purple-600 text-sm hover:text-purple-700 transition-colors font-medium"
                >
                  Change
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {modals.templateSelection && <TemplateSelectionModal />}
      {modals.createTemplate && <CreateTemplateModal />}

      {/* Backdrop for dropdown */}
      {modals.jobRoleDropdown && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => closeModal("jobRoleDropdown")}
        />
      )}
    </div>
  );
}

