"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Globe from "@/components/ui/globe";
import BusinessIllustration from "@/components/ui/business_illustration";
import FreelancerIllustration from "@/components/ui/freelancer_illustration";
import ContractorIllustration from "@/components/ui/contractor_illustration";
import vesrrolllogo from "@public/vestroll_Logo.png";
import profile from "@public/profile.png";
import Image from "next/image";
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
      <div className="p-4 lg:flex lg:min-h-screen">
        {/* Left Panel - Desktop Only */}
        <div className="hidden rounded-lg  lg:flex lg:w-1/2 bg-[#5E2A8C] relative overflow-hidden">
          {/* VestRoll Logo */}
          <div className="absolute bg-white top-8 rounded-lg left-8 z-10">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
              <Image
                src={vesrrolllogo}
                alt="VestRoll Logo"
                width={32}
                height={32}
              />
              <span className="text-black font-semibold text-lg">VestRoll</span>
            </div>
          </div>

          {/* Currency Indicators */}
          <div className="absolute top-[15rem] left-[25%] flex items-center justify-center">
            <div className="relative w-80 h-80">
              <Globe />

              {/* Currency Badges */}
              <div className="absolute top-12 left-6 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
                <Image src={profile} alt="Profile" width={24} height={24} />

                <span className="text-sm font-medium">CAD</span>
                <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                  🍁
                </span>
              </div>

              <div className="absolute top-12 left-50 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
                <Image src={profile} alt="Profile" width={24} height={24} />

                <span className="text-sm font-medium">EUR</span>
                <span className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                  🇪🇺
                </span>
              </div>

              <div className="absolute bottom-25 left-70 bg-white/90 w-[6.5rem] backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
                <Image src={profile} alt="Profile" width={24} height={24} />

                <span className="text-sm font-medium">GBP</span>
                <span className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs">
                  🇬🇧
                </span>
              </div>

              <div className="absolute bottom-32 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
                <Image src={profile} alt="Profile" width={24} height={24} />

                <span className="text-sm font-medium">USD</span>
                <span className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center text-white text-xs">
                  💵
                </span>
              </div>

              <div className="absolute bottom-4 right-0 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
                <Image src={profile} alt="Profile" width={24} height={24} />

                <span className="text-sm font-medium">NGN</span>
                <span className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                  🇳🇬
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Content */}
          <div className="absolute bottom-16 left-8 right-8">
            <h1 className="text-6xl font-bold text-white mb-4 leading-tight">
              Seamless Payments,
              <br />
              Anywhere.
            </h1>
            <p className="text-purple-100 text-lg">
              Experience Fast, Secure Crypto & Fiat Payroll & Invoicing with
              VestRoll
            </p>
          </div>
        </div>

        {/* Right Panel - Account Selection */}
        <div className="lg:w-1/2 flex flex-col justify-center p-6 lg:p-16">
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

            <div className="absolute bottom-4 right-8 flex justify-between items-center text-black text-sm w-[40%]">
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
