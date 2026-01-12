"use client";
import React, { useState } from 'react';
import AuthLayer from './auth/AuthLayer';
import OtpForm from './auth/OtpForm';
import { useRouter } from 'next/navigation';

export default function OtpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = () => {
    setIsLoading(true);
    // Simulate verification
    setTimeout(() => {
      setIsLoading(false);
      router.push('/register/success');
    }, 1500);
  };

  return (
    <AuthLayer>
      <div className="w-full">
        {/* Stepper */}
        <div className="flex gap-2 mb-10 w-full">
          <div className="h-1 flex-1 bg-primary-600 rounded-full"></div>
          <div className="h-1 flex-1 bg-primary-600 rounded-full"></div>
          <div className="h-1 flex-1 bg-primary-600 rounded-full"></div>
          <div className="h-1 flex-1 bg-gray-100 rounded-full"></div>
          <div className="h-1 flex-1 bg-gray-100 rounded-full"></div>
        </div>

        <div className="mb-10">
          <h2 className="text-gray-900 text-3xl font-bold mb-3">
            Provide 6-digit code
          </h2>
          <p className="text-gray-500 text-sm sm:text-base font-medium">
            We sent a 6-digit code to your email address. Provide the code below to verify your email.
          </p>
        </div>

        <div className="space-y-10">
          <OtpForm />

          <button
            onClick={handleContinue}
            disabled={isLoading}
            className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {isLoading ? "Verifying..." : "Continue"}
          </button>
        </div>
      </div>
    </AuthLayer>
  );
}
