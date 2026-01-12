"use client";
import React, { useState } from 'react';
import AuthLayer from './auth/AuthLayer';
import { useRouter } from 'next/navigation';
import { ChevronDown } from "lucide-react";

interface FormData {
  companyName: string;
  companySize: string;
  companyIndustry: string;
  headquarterCountry: string;
  businessDescription: string;
}

export default function BusinessDetailsPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    companySize: "",
    companyIndustry: "",
    headquarterCountry: "",
    businessDescription: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const isFormValid = formData.companyName && formData.companySize && 
                      formData.companyIndustry && formData.headquarterCountry && 
                      formData.businessDescription;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/onboarding/billing-address');
    }, 1000);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <AuthLayer>
      <div className="w-full">
        {/* Stepper */}
        <div className="flex gap-2 mb-10 w-full">
          <div className="h-1 flex-1 bg-primary-600 rounded-full"></div>
          <div className="h-1 flex-1 bg-primary-600 rounded-full"></div>
          <div className="h-1 flex-1 bg-primary-600 rounded-full"></div>
          <div className="h-1 flex-1 bg-primary-600 rounded-full"></div>
          <div className="h-1 flex-1 bg-primary-600 rounded-full"></div>
        </div>

        <div className="mb-10">
          <h2 className="text-gray-900 text-3xl font-bold mb-3">
            Add business details
          </h2>
          <p className="text-gray-500 text-sm sm:text-base font-medium">
            Tell us more about your business to help us personalize your experience.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-gray-900 text-sm font-semibold">
              Company name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.companyName}
              onChange={(e) => handleInputChange("companyName", e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-sm"
              placeholder="What's the name of your company"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-gray-900 text-sm font-semibold">
                Company size <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.companySize}
                onChange={(e) => handleInputChange("companySize", e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-sm appearance-none"
              >
                <option value="">Select size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201+">201+ employees</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-gray-900 text-sm font-semibold">
                Industry <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.companyIndustry}
                onChange={(e) => handleInputChange("companyIndustry", e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-sm appearance-none"
              >
                <option value="">Select industry</option>
                <option value="tech">Technology</option>
                <option value="finance">Finance</option>
                <option value="healthcare">Healthcare</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-900 text-sm font-semibold">
              Headquarter country <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={formData.headquarterCountry}
              onChange={(e) => handleInputChange("headquarterCountry", e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-sm appearance-none"
            >
              <option value="">Select country</option>
              <option value="us">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="ng">Nigeria</option>
              <option value="ca">Canada</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-900 text-sm font-semibold">
              What does your business do? <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={formData.businessDescription}
              onChange={(e) => handleInputChange("businessDescription", e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-sm resize-none"
              placeholder="Describe what your company does"
            />
          </div>

          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Processing..." : "Continue"}
          </button>
        </form>
      </div>
    </AuthLayer>
  );
}
