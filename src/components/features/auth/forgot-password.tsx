"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Type definitions
interface FormData {
  email: string;
}

interface FormErrors {
  email?: string;
}

const ForgotPasswordForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
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
      console.log("Reset password request:", formData);
      alert("Reset link sent to your email!");
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

  const isFormValid = formData.email.trim() && validateEmail(formData.email);

  return (
    <div className="w-full bg-white p-4">
      {/* Mobile Logo */}
      <div className="lg:hidden pt-8 mb-16">
        <Image src="/Vector.svg" alt="Globe icon" width={40} height={40} />
      </div>

      <div className="flex h-full">
        {/* Left Side - Hero Section (Desktop Only) */}
        <div className="hidden lg:flex lg:w-3/5 bg-gradient-to-br from-[#5E2A8C] to-[#7C3AED] text-white p-8 lg:p-12 flex-col justify-center relative overflow-hidden rounded-xl">
          {/* Logo */}
          <div className="absolute top-6 left-6 z-20">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm text-red-500 px-3 py-2 rounded-lg text-sm font-bold">
              <Image src="/Logo.svg" alt="Globe icon" width={120} height={40} className="relative z-10" />
            </div>
          </div>

          {/* World map illustration */}
          <div className="mb-6 flex justify-center relative z-10">
            <div className="relative">
              <Image
                src="/Frame 2147223744.svg"
                alt="World map illustration"
                width={350}
                height={350}
                className="opacity-90"
              />
            </div>
          </div>

          <h1 className="text-3xl lg:text-5xl font-extrabold mb-3 leading-tight">
            Seamless Payments,
            <br />
            Anywhere.
          </h1>
          <p className="text-sm text-white/90 leading-relaxed">
            Experience Fast, Secure Crypto & Fiat Payroll & Invoicing with
            VestRoll
          </p>
        </div>

        {/* Right Side - Form Section */}
        <div className="relative w-full lg:w-2/5 flex flex-col items-center justify-start pt-12 px-4 sm:px-8 lg:px-12 bg-white">

          <div className="w-full max-w-md">
            {/* Form Content */}
            <div className="mb-10">
              <h2 className="text-2xl lg:text-3xl font-bold text-black mb-6">
                Forgot your password?
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                Provide the email address linked to your VestRoll account to reset your password and login
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-black mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Provide email address"
                  className={`w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-sm text-gray-900 placeholder-gray-400 ${
                    errors.email ? "border-red-300 ring-red-200" : ""
                  }`}
                  aria-describedby={errors.email ? "email-error" : ""}
                  autoComplete="email"
                />
                {errors.email && (
                  <p id="email-error" className="mt-2 text-xs text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
                  isFormValid && !isSubmitting
                    ? "bg-[#5E2A8C] text-white hover:bg-[#4A1F73] focus:outline-none focus:ring-2 focus:ring-[#5E2A8C] focus:ring-offset-2 focus:ring-offset-white transform hover:scale-[1.02]"
                    : "bg-[#5E2A8C] text-white opacity-50 cursor-not-allowed"
                }`}
                aria-describedby="button-description"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  "Continue"
                )}
              </button>
              <p id="button-description" className="sr-only">
                {isSubmitting ? "Sending reset link" : "Send password reset link to your email"}
              </p>

              {/* Back to Login Link */}
              <div className="text-center mt-8">
                <Link
                  href="/"
                  className="text-[#5E2A8C] hover:text-[#4A1F73] font-medium text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#5E2A8C] focus:ring-offset-2 focus:ring-offset-white rounded"
                >
                  Back to login
                </Link>
              </div>
            </form>

            {/* Footer Links (Desktop only) */}
            <div className="hidden lg:block absolute bottom-6 right-6">
              <div className="flex space-x-4 text-xs text-gray-600">
                <Link href="#" className="hover:text-black transition-colors">
                  Privacy Policy
                </Link>
                <span>·</span>
                <Link href="#" className="hover:text-black transition-colors">
                  Terms and condition
                </Link>
              </div>
            </div>

            {/* Copyright (Desktop only) */}
            <div className="hidden lg:block absolute bottom-6 left-6 text-xs text-gray-600">
              © 2025, all rights reserved
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;