"use client";
import React, { useState } from 'react';
import AuthLayer from './auth/AuthLayer';
import { useRouter } from 'next/navigation';
import BusinessIllustration from "@/components/ui/business_illustration";
import FreelancerIllustration from "@/components/ui/freelancer_illustration";
import ContractorIllustration from "@/components/ui/contractor_illustration";

const accountTypes = [
  {
    id: "business",
    name: "Business",
    icon: <BusinessIllustration />,
    description: "For companies and organizations",
  },
  {
    id: "freelancer",
    name: "Freelancer",
    icon: <FreelancerIllustration />,
    description: "For independent professionals",
  },
  {
    id: "contractor",
    name: "Contractor",
    icon: <ContractorIllustration />,
    description: "For contract workers",
  },
];

export default function AccountSelectionPage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string>("");

  const handleContinue = () => {
    if (!selectedType) return;
    router.push('/onboarding/business-details');
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
          <div className="h-1 flex-1 bg-gray-100 rounded-full"></div>
        </div>

        <div className="mb-10">
          <h2 className="text-gray-900 text-3xl font-bold mb-3">
            Select account type
          </h2>
          <p className="text-gray-500 text-sm sm:text-base font-medium">
            Choose an account type that best suits your usecase
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-10">
          {accountTypes.map((type) => (
            <div
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`flex flex-col items-center p-4 rounded-2xl cursor-pointer transition-all border-2 ${
                selectedType === type.id
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-transparent bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mb-4">
                {type.icon}
              </div>
              <span className={`text-sm font-bold ${
                selectedType === type.id ? 'text-primary-700' : 'text-gray-900'
              }`}>
                {type.name}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={handleContinue}
          disabled={!selectedType}
          className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </AuthLayer>
  );
}
