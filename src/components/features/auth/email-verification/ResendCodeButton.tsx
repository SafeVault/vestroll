"use client";

import { useState, useEffect } from "react";

interface ResendCodeButtonProps {
  onClick: () => void;
  disabled?: boolean;
  cooldownSeconds?: number;
}

export function ResendCodeButton({ 
  onClick, 
  disabled = false, 
  cooldownSeconds = 60 
}: ResendCodeButtonProps) {
  const [countdown, setCountdown] = useState(0);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [countdown]);

  const handleClick = async () => {
    if (disabled || countdown > 0) return;
    
    setIsResending(true);
    try {
      await onClick();
      setCountdown(cooldownSeconds);
    } finally {
      setIsResending(false);
    }
  };

  const isDisabled = disabled || countdown > 0 || isResending;

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isDisabled}
      className="
        text-sm font-medium transition-all duration-200
        focus:outline-none focus:underline
        disabled:cursor-not-allowed
        text-[#6366F1] hover:text-[#5855EB] disabled:text-gray-400
      "
      aria-label={isResending ? "Resending code..." : "Resend verification code"}
    >
      {isResending ? "Resending..." : 
       countdown > 0 ? `Resend code (${countdown}s)` : 
       "Resend code"}
    </button>
  );
}