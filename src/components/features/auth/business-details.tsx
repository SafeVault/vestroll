"use client";
import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

// Type definitions
interface FormData {
  companyName: string;
  companySize: string;
  companyIndustry: string;
  headquarterCountry: string;
  businessDescription: string;
}

interface FormErrors {
  companyName?: string;
  companySize?: string;
  companyIndustry?: string;
  headquarterCountry?: string;
  businessDescription?: string;
}

interface DropdownProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  error?: string;
  required?: boolean;
  isOpen: boolean;
  onToggle: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder,
  error,
  required = false,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={onToggle}
          className={`w-full px-4 py-3 text-left bg-[#F5F6F7] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 ${value ? "text-gray-900" : "text-gray-400"}`}
        >
          {value || placeholder}
          <ChevronDown
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {options.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  onChange(option);
                  onToggle();
                }}
                className="w-full px-4 py-3 text-left hover:bg-purple-50 focus:bg-purple-50 focus:outline-none transition-colors duration-150"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

const BusinessRegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    companySize: "",
    companyIndustry: "",
    headquarterCountry: "",
    businessDescription: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(1);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const companySizes = [
    "1-10 employees",
    "11-50 employees",
    "51-200 employees",
    "201-500 employees",
    "501-1000 employees",
    "1000+ employees",
  ];

  const industries = [
    "Technology",
    "Finance",
    "Healthcare",
    "Education",
    "Retail",
    "Manufacturing",
    "Real Estate",
    "Media & Entertainment",
    "Food & Beverage",
    "Transportation",
    "Other",
  ];

  const countries = [
    "United States",
    "United Kingdom",
    "Canada",
    "Germany",
    "France",
    "Australia",
    "Japan",
    "Singapore",
    "Netherlands",
    "Nigeria",
    "South Africa",
    "Other",
  ];

  // Calculate progress based on form completion
  useEffect(() => {
    let completedFields = 0;

    if (formData.companyName.trim()) completedFields++;
    if (formData.companySize) completedFields++;
    if (formData.companyIndustry) completedFields++;
    if (formData.headquarterCountry) completedFields++;
    if (formData.businessDescription.trim()) completedFields++;

    setProgress(Math.max(1, completedFields));
  }, [formData]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }

    if (!formData.companySize) {
      newErrors.companySize = "Please select company size";
    }

    if (!formData.companyIndustry) {
      newErrors.companyIndustry = "Please select an industry";
    }

    if (!formData.headquarterCountry) {
      newErrors.headquarterCountry = "Please select headquarter country";
    }

    if (!formData.businessDescription.trim()) {
      newErrors.businessDescription = "Business description is required";
    } else if (formData.businessDescription.trim().length < 10) {
      newErrors.businessDescription =
        "Description must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", formData);
      alert("Business details submitted successfully!");
      setIsSubmitting(false);
    }, 2000);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const isFormValid =
    formData.companyName &&
    formData.companySize &&
    formData.companyIndustry &&
    formData.headquarterCountry &&
    formData.businessDescription;

  return (
    <div className="w-full bg-white p-4">
      {/* Mobile Logo */}
      <div className="lg:hidden">
        <Image src="/Vector.svg" alt="Globe icon" width={40} height={40} />
      </div>

      <div className="flex h-full">
        {/* Left Side - Hero Section (Desktop Only) */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#5E2A8C] text-white p-8 lg:p-12 flex-col justify-center relative overflow-hidden rounded-xl">
          {/* Logo */}
          <div className="absolute top-8 left-8">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm text-red-500 px-4 py-2 rounded-lg text-lg font-bold">
              <Image src="/Logo.svg" alt="Globe icon" width={174} height={56} />
            </div>
          </div>

          {/* Globe visualization */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <Image
                src="/Frame 2147223744.svg"
                alt="Globe icon"
                width={494.22}
                height={497.03}
              />
            </div>
          </div>

          <h1 className="text-4xl lg:text-[76px] font-extrabold mb-4 leading-tight">
            Seamless Payments,
            <br />
            Anywhere.
          </h1>
          <p className="text-[16px] text-white">
            Experience Fast, Secure Crypto & Fiat Payroll & Invoicing with
            VestRoll
          </p>
        </div>

        {/* Right Side - Form Section */}
        <div className="relative w-full flex-1 flex flex-col items-center sm:justify-between justify-center px-0 sm:px-4">
          <div className="h-[50px] sm:block hidden"></div>
          <div className="flex items-center justify-center w-full max-w-2xl">
            <div className="w-full">
              {/* Progress Indicator - Now Functional */}
              <div className="mb-8">
                <div className="flex items-center mb-2">
                  <div
                    className={`flex-1 h-1 rounded-full transition-colors duration-300 ${progress >= 1 ? "bg-[#5E2A8C]" : "bg-gray-200"}`}
                  ></div>
                  <div
                    className={`flex-1 h-1 rounded-full ml-2 transition-colors duration-300 ${progress >= 2 ? "bg-[#5E2A8C]" : "bg-gray-200"}`}
                  ></div>
                  <div
                    className={`flex-1 h-1 rounded-full ml-2 transition-colors duration-300 ${progress >= 3 ? "bg-[#5E2A8C]" : "bg-gray-200"}`}
                  ></div>
                  <div
                    className={`flex-1 h-1 rounded-full ml-2 transition-colors duration-300 ${progress >= 4 ? "bg-[#5E2A8C]" : "bg-gray-200"}`}
                  ></div>
                  <div
                    className={`flex-1 h-1 rounded-full ml-2 transition-colors duration-300 ${progress >= 5 ? "bg-[#5E2A8C]" : "bg-gray-200"}`}
                  ></div>
                </div>
              </div>

              {/* Heading */}
              <div className="mb-8">
                <h2 className="text-2xl lg:text-[40px] font-bold text-[#17171C] mb-2">
                  Add business details
                </h2>
                <p className="text-[#414F62] text-[16px]">
                  Tell us about your business
                </p>
              </div>

              {/* Form */}
              <div className="space-y-6">
                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) =>
                      handleInputChange("companyName", e.target.value)
                    }
                    placeholder="What's the name of your company"
                    className={`w-full px-4 py-3 bg-[#F5F6F7] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 ${
                      errors.companyName ? "border-red-300" : "border-gray-300"
                    }`}
                  />
                  {errors.companyName && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.companyName}
                    </p>
                  )}
                </div>

                {/* Company Size and Industry - Always 2 columns */}
                <div className="grid grid-cols-2 gap-4">
                  <Dropdown
                    label="Company size"
                    value={formData.companySize}
                    onChange={(value) =>
                      handleInputChange("companySize", value)
                    }
                    options={companySizes}
                    placeholder="Select"
                    error={errors.companySize}
                    required
                    isOpen={openDropdown === "companySize"}
                    onToggle={() =>
                      setOpenDropdown(
                        openDropdown === "companySize" ? null : "companySize"
                      )
                    }
                  />

                  <Dropdown
                    label="Company industry"
                    value={formData.companyIndustry}
                    onChange={(value) =>
                      handleInputChange("companyIndustry", value)
                    }
                    options={industries}
                    placeholder="Select your industry"
                    error={errors.companyIndustry}
                    required
                    isOpen={openDropdown === "companyIndustry"}
                    onToggle={() =>
                      setOpenDropdown(
                        openDropdown === "companyIndustry"
                          ? null
                          : "companyIndustry"
                      )
                    }
                  />
                </div>

                {/* Headquarter Country */}
                <Dropdown
                  label="Headquarter country"
                  value={formData.headquarterCountry}
                  onChange={(value) =>
                    handleInputChange("headquarterCountry", value)
                  }
                  options={countries}
                  placeholder="Where country is your headquarter located?"
                  error={errors.headquarterCountry}
                  required
                  isOpen={openDropdown === "headquarterCountry"}
                  onToggle={() =>
                    setOpenDropdown(
                      openDropdown === "headquarterCountry"
                        ? null
                        : "headquarterCountry"
                    )
                  }
                />

                {/* Business Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What does your business do?{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.businessDescription}
                    onChange={(e) =>
                      handleInputChange("businessDescription", e.target.value)
                    }
                    placeholder="Describe what your company does"
                    rows={4}
                    className={`w-full px-4 py-3 bg-[#F5F6F7] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 resize-none ${
                      errors.businessDescription
                        ? "border-red-300"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.businessDescription && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.businessDescription}
                    </p>
                  )}
                </div>

                {/* Continue Button */}
                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
                    isFormValid && !isSubmitting
                      ? "bg-[#5E2A8C] hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transform hover:scale-[1.02]"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    "Continue"
                  )}
                </button>
              </div>
            </div>
          </div>
          {/* Footer */}
          <div className="w-full pt-6 text-center text-sm sm:block hidden">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
              <span className="text-[15px] text-[#7F8C9F]">
                © 2025, all rights reserved
              </span>
              <div className="flex space-x-4 text-[#17171C]">
                <a href="#" className="text-[16px]">
                  Privacy Policy
                </a>
                <span>•</span>
                <a href="#" className="text-[16px]">
                  Terms and condition
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessRegistrationForm;
