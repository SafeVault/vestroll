"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import BusinessIllustration from "./ui/business_illustration";
import FreelancerIllustration from "./ui/freelancer_illustration";
import ContractorIllustration from "./ui/contractor_illustration";
import Image from "next/image";
import mobileLogo from "../../public/logo/mologo.png";
import leftImage from "../../public/images/Left.png";
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

export default function VestRollAccountSelection() {
  const [selectedType, setSelectedType] = useState<string>("");

  return (
    <div className="min-h-screen bg-gray-50 lg:bg-white">
      {/* Mobile Logo */}
      <div className="m-7 lg:hidden">
        <Image src={mobileLogo} alt="Globe icon" width={40} height={40} />
      </div>

      <div className="p-4 lg:flex lg:min-h-screen">
        {/* Left Panel - Desktop Only */}
        <div className="hidden rounded-lg  lg:flex lg:w-1/2 relative">
          <Image src={leftImage} alt="left image" />
        </div>

        {/* Right Panel - Account Selection */}
        <div className="lg:w-1/2 flex flex-col justify-center p-6 lg:p-16 md:mr-70">
          {/* Progress Indicator */}
          <div className="flex justify-center mb-8 lg:mb-12">
            <div className="flex gap-2">
              <div className="w-18 h-1 bg-purple-600 rounded-full"></div>
              <div className="w-18 h-1 bg-purple-600 rounded-full"></div>
              <div className="w-18 h-1 bg-purple-600 rounded-full"></div>
              <div className="w-18 h-1 bg-purple-600 rounded-full"></div>
              <div className="w-18 h-1 bg-gray-200 rounded-full"></div>
            </div>
          </div>

          <div className="max-w-md mx-auto w-full">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 text-balance">
              Select account type
            </h2>
            <p className="text-gray-600 mb-8 lg:mb-12">
              Choose an account type that best suits your usecase
            </p>

            {/* Account Type Cards */}
            <div className="grid grid-cols-3 gap-3 lg:gap-4 mb-8 lg:mb-12">
              {accountTypes.map((type) => (
                <div
                  key={type.id}
                  className={`p-4 lg:p-6 cursor-pointer transition-all hover:shadow-md ${
                    selectedType === type.id
                      ? "ring-2 ring-purple-600 bg-purple-50"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedType(type.id)}
                >
                  <div className="text-center">
                    <div className="mb-4 flex items-center justify-center h-24  w-24  mx-auto">
                      {type.icon}
                    </div>
                    <h3 className="font-medium text-gray-900 text-sm lg:text-base">
                      {type.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Button */}
            <Button
              className="w-full h-[56px] bg-purple-600 hover:bg-purple-700 text-white py-3 lg:py-4 text-base lg:text-lg font-medium rounded-lg"
              disabled={!selectedType}
            >
              Continue
            </Button>

            <div className="absolute bottom-4 ml-0 hidden md:flex mb-2 justify-between items-center text-black text-sm w-[30%]">
              <span>© 2025, all rights reserved</span>
              <div className="flex gap-4">
                <span>Privacy Policy</span>
                <span>Terms and condition</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
