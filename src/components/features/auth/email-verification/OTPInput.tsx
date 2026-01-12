import { useState, useRef } from "react";

interface OTPInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
  error?: string | null;
}

export function OTPInput({ value, onChange, disabled = false, error }: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (inputValue: string, index: number) => {
    // Only allow single digits
    if (/^[0-9]?$/.test(inputValue)) {
      const newValue = [...value];
      newValue[index] = inputValue;
      onChange(newValue);

      // Auto focus next input
      if (inputValue && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text");
    const digits = pasteData.replace(/\D/g, "").slice(0, 6).split("");
    
    if (digits.length > 0) {
      const newValue = [...value];
      digits.forEach((digit, index) => {
        if (index < 6) {
          newValue[index] = digit;
        }
      });
      onChange(newValue);
      
      // Focus the next empty field or the last field
      const nextIndex = Math.min(digits.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="flex justify-between items-center gap-1 sm:gap-2 lg:gap-3">
        {value.map((digit, index) => (
          <input
            key={index}
            ref={(el) => { inputRefs.current[index] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            disabled={disabled}
            className={`
              flex-1 aspect-square max-w-[45px] sm:max-w-[50px] lg:max-w-[56px]
              text-center text-base sm:text-lg lg:text-xl font-semibold
              bg-gray-50 border-2 rounded-lg
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-[#6366F1]/50
              disabled:bg-gray-100 disabled:cursor-not-allowed
              ${error 
                ? 'border-red-300 focus:border-red-500' 
                : 'border-gray-200 focus:border-[#6366F1] hover:border-gray-300'
              }
              ${digit ? 'bg-[#6366F1]/5' : ''}
            `}
            aria-label={`Verification code digit ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
