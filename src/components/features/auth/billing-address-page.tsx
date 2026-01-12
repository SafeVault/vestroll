"use client";
import React, { useState } from 'react';
import AuthLayer from './auth/AuthLayer';
import { useRouter } from 'next/navigation';
import { RoutePaths } from '@/lib/routes';

interface FormData {
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export default function BillingAddressPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const isFormValid = formData.streetAddress && formData.city && 
                      formData.state && formData.zipCode && formData.country;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push(RoutePaths.DASHBOARD);
    }, 1500);
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
            Billing address
          </h2>
          <p className="text-gray-500 text-sm sm:text-base font-medium">
            Provide your business billing address to complete the setup.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-gray-900 text-sm font-semibold">
              Street address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.streetAddress}
              onChange={(e) => handleInputChange("streetAddress", e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-sm"
              placeholder="Enter street address"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-gray-900 text-sm font-semibold">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-sm"
                placeholder="Enter city"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-gray-900 text-sm font-semibold">
                State/Province <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-sm"
                placeholder="Enter state"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-gray-900 text-sm font-semibold">
                Zip/Postal code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.zipCode}
                onChange={(e) => handleInputChange("zipCode", e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-sm"
                placeholder="Enter zip code"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-gray-900 text-sm font-semibold">
                Country <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-sm appearance-none"
              >
                <option value="">Select country</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="ng">Nigeria</option>
                <option value="ca">Canada</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {isLoading ? "Completing setup..." : "Complete Setup"}
          </button>
        </form>
      </div>
    </AuthLayer>
  );
}
