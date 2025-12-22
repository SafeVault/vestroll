// components/finance/otp-modal.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OtpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export function OtpModal({ isOpen, onClose, onComplete }: OtpModalProps) {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if all fields are filled
    if (newOtp.every((digit) => digit !== "") && index === 5) {
      // Auto-submit when last digit is entered
      setTimeout(() => {
        handleSubmit();
      }, 100);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const otpValue = otp.join("");
    console.log("OTP submitted:", otpValue);

    // Simulate OTP verification
    setTimeout(() => {
      onComplete();
      onClose();
    }, 1000);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const pastedArray = pastedData.split("");

    const newOtp = [...otp];
    pastedArray.forEach((char, index) => {
      if (index < 6) {
        newOtp[index] = char;
      }
    });

    setOtp(newOtp);

    // Focus the last filled input
    const lastFilledIndex = Math.min(pastedArray.length, 5);
    inputRefs.current[lastFilledIndex]?.focus();
  };

  useEffect(() => {
    // Focus first input when modal opens
    if (isOpen) {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-auto">
        {/* Header */}
        <div className="relative flex items-center justify-center p-6 border-b border-gray-200 min-h-[80px]">
          <button
            onClick={onClose}
            className="absolute left-6 top-1/2 text-black -translate-y-1/2 h-8 w-8 rounded-full hover:bg-gray-100 flex items-center justify-center"
          >
            <X className="h-8 w-8" />
          </button>

          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900">Enter OTP</h2>
            <p className="text-sm text-gray-500 mt-1">
              Enter the 6-digit code sent to your email
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600 mb-2">
                Please enter the 6-digit verification code
              </p>
              <p className="text-sm text-gray-500">
                Check your email for the OTP
              </p>
            </div>

            {/* OTP Input */}
            <div className="flex justify-center gap-3" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-900"
                />
              ))}
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500">
                Didn&apos;t receive code?{" "}
                <button className="text-purple-900 hover:text-purple-700 font-medium">
                  Resend OTP
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6">
          <Button
            type="button"
            onClick={handleSubmit}
            className="w-full py-3 bg-purple-900 hover:bg-purple-800 text-white"
            disabled={otp.some((digit) => digit === "")}
          >
            Verify & Complete Withdrawal
          </Button>
        </div>
      </div>
    </div>
  );
}
