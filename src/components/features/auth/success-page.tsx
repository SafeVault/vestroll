"use client";
import React from 'react';
import AuthLayer from './auth/AuthLayer';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();

  const handleProceed = () => {
    router.push('/onboarding/account-type');
  };

  return (
    <AuthLayer>
      <div className="w-full flex flex-col items-center text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mb-8">
          <div className="w-14 h-14 bg-primary-600 rounded-full flex items-center justify-center">
            <Check size={32} className="text-white" strokeWidth={3} />
          </div>
        </div>

        <h2 className="text-gray-900 text-3xl font-bold mb-3">
          Mail Verified
        </h2>
        <p className="text-gray-500 text-sm sm:text-base font-medium mb-10 max-w-sm">
          Your email address has been successfully verified. You can now proceed to complete your account setup.
        </p>

        <button
          onClick={handleProceed}
          className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all"
        >
          Proceed to Onboarding
        </button>
      </div>
    </AuthLayer>
  );
}
