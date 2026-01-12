"use client";

import React, { useState } from "react";
import { PasswordFormData} from "./types";
import Image from "next/image";

interface SecuritySectionProps {
  onPasswordChange: (data: PasswordFormData) => Promise<void>;
}

const SecuritySection: React.FC<SecuritySectionProps> = ({
  onPasswordChange,
}) => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  const handle2FAToggle = () => {
    setIs2FAEnabled(!is2FAEnabled);
    // In a real app, this would trigger the 2FA setup/disable process
  };

  return (
    <div className="space-y-8  rounded">
      {/* Security Section */}
      <div className="bg-[#FFFFFF] p-4 rounded-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
          <div className="flex flex-col">
            <h2 className="text-lg font-medium text-gray-900">Security</h2>
            <p className="text-sm text-gray-600">
              Two-factor authentication (2FA)
            </p>
          </div>
          <button
            onClick={handle2FAToggle}
            className="flex flex-row items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-[#5E2A8C] border border-[#5E2A8C] rounded-lg hover:bg-[#5E2A8C] hover:text-white transition-colors flex-shrink-0 w-full sm:w-auto justify-center"
          >
            <Image src={"/setting.png"} alt="edit" width={16} height={16} />
            <span className="hidden sm:inline">Setup</span>
            <span className="sm:hidden">Setup 2FA</span>
          </button>
        </div>

        {/* Two-Factor Authentication */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-orange-400 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs">!</span>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900 mb-1">
                Two-factor authentication (2FA)
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Two-factor authentication is an additional security measure to
                protect your account. Once set up, depending on your
                authentication method, each time you access your account you
                will have to provide a verification code using an authentication
                application or through your email.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Section */}
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Legal</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <button className="text-xs sm:text-sm text-[#414F62] bg-[#F5F6F7] py-3 px-4 sm:py-2 sm:px-3 rounded-full hover:bg-[#E5E7EB] hover:text-[#374151] transition-colors text-center whitespace-nowrap">
            Help & Support
          </button>
          <button className="text-xs sm:text-sm text-[#414F62] bg-[#F5F6F7] py-3 px-4 sm:py-2 sm:px-3 rounded-full hover:bg-[#E5E7EB] hover:text-[#374151] transition-colors text-center whitespace-nowrap">
            Terms and conditions
          </button>
          <button className="text-xs sm:text-sm text-[#414F62] bg-[#F5F6F7] py-3 px-4 sm:py-2 sm:px-3 rounded-full hover:bg-[#E5E7EB] hover:text-[#374151] transition-colors text-center whitespace-nowrap">
            Privacy notice
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;
