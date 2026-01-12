"use client";

import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";

interface TwoFactorCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (code: string) => void;
}

export default function TwoFactorCodeModal({
  isOpen,
  onClose,
  onSubmit,
}: TwoFactorCodeModalProps) {
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (isOpen) {
      // Reset code when modal opens
      setCode(["", "", "", "", "", ""]);
      // Focus first input
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  }, [isOpen]);

  const handleChange = (value: string, index: number) => {
    // Only allow numeric values
    if (!/^[0-9]?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-advance to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Handle backspace - move to previous input if current is empty
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text");
    const digits = pasteData.replace(/\D/g, "").slice(0, 6).split("");

    if (digits.length > 0) {
      const newCode = [...code];
      digits.forEach((digit, idx) => {
        if (idx < 6) {
          newCode[idx] = digit;
        }
      });
      setCode(newCode);

      // Focus the next empty field or the last field
      const nextIndex = Math.min(digits.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleSubmit = () => {
    const codeString = code.join("");
    if (codeString.length === 6) {
      onSubmit(codeString);
    }
  };

  const isCodeComplete = code.every((digit) => digit !== "");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center md:bg-black/50 md:p-4">
      <div className="bg-white md:rounded-lg w-full h-full md:h-auto md:max-w-[480px] relative flex flex-col">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute left-4 top-4 md:left-auto md:right-4 text-[#414F62] hover:text-[#17171C] transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="p-4 pt-16 md:p-8 md:pt-8 flex flex-col h-full">
          {/* Title */}
          <h2 className="text-xl font-semibold text-[#17171C] mb-2 text-center md:text-left">
            Provide 2FA code
          </h2>

          {/* Instruction text */}
          <p className="text-sm font-medium text-[#414F62] mb-8 text-center md:text-left">
            Authorize transaction with your 2FA code to complete process
          </p>

          {/* Label */}
          <label className="text-sm font-medium text-[#414F62] block mb-3 text-center md:text-left">
            Enter 2FA code
          </label>

          {/* 6-digit input boxes */}
          <div className="flex gap-2 justify-center md:justify-between mb-8">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className="w-full aspect-square flex-1 max-w-[48px] md:max-w-[56px] text-center text-2xl font-semibold bg-[#F5F6F7] border border-[#E7E9EB] rounded-lg focus:outline-none focus:border-[#5E2A8C] focus:bg-white transition-all"
                aria-label={`Digit ${index + 1}`}
              />
            ))}
          </div>

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={!isCodeComplete}
            className={`w-full h-14 rounded-lg font-medium text-base transition-colors mt-auto md:mt-0 ${
              isCodeComplete
                ? "bg-[#5E2A8C] text-white hover:bg-[#4E2275]"
                : "bg-[#E7E9EB] text-[#9EA8B6] cursor-not-allowed"
            }`}
          >
            Authorize
          </button>
        </div>
      </div>
    </div>
  );
}
