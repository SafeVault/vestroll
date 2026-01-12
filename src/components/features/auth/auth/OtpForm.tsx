"use client";
import React, { useRef, useState, useEffect } from "react";

const OTP_LENGTH = 6;
const RESEND_TIME = 60; // seconds
const MASK_DELAY = 300; // ms

const OtpForm: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [masked, setMasked] = useState<boolean[]>(
    Array(OTP_LENGTH).fill(false)
  );
  const [activeInput, setActiveInput] = useState(0);
  const [timer, setTimer] = useState(RESEND_TIME);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const val = e.target.value.replace(/[^0-9]/g, "").slice(0, 1);
    const newOtp = [...otp];
    newOtp[idx] = val;
    setOtp(newOtp);

    // Unmask this input
    setMasked((prev) => {
      const arr = [...prev];
      arr[idx] = false;
      return arr;
    });

    if (val) {
      // Mask after delay
      setTimeout(() => {
        setMasked((prev) => {
          const arr = [...prev];
          arr[idx] = true;
          return arr;
        });
      }, MASK_DELAY);

      if (idx < OTP_LENGTH - 1) {
        inputsRef.current[idx + 1]?.focus();
        setActiveInput(idx + 1);
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === "Backspace") {
      setMasked((prev) => {
        const arr = [...prev];
        arr[idx] = false;
        return arr;
      });
      if (!otp[idx] && idx > 0) {
        inputsRef.current[idx - 1]?.focus();
        setActiveInput(idx - 1);
      }
    }
  };

  const handleResend = () => {
    setOtp(Array(OTP_LENGTH).fill(""));
    setMasked(Array(OTP_LENGTH).fill(false));
    setTimer(RESEND_TIME);
    setActiveInput(0);
    inputsRef.current[0]?.focus();
    // Add resend logic here
  };

  return (
    <div className="space-y-5 ">
      <div className="space-y-2">
        <label htmlFor="otp" className="text-xs font-medium text-text-header">
          OTP
        </label>
        <div className="flex justify-between items-center gap-2 max-w-md ">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => {
                inputsRef.current[idx] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              id="otp"
              value={masked[idx] && digit ? "*" : digit}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className="flex-1 bg-[#f5f6f7] rounded-lg border-0  text-center text-text-header outline-none focus:ring-0 flex appearance-none w-12.5 sm:w-16 py-5  font-semibold"
              autoFocus={idx === activeInput}
            />
          ))}
        </div>
      </div>
      <div style={{ marginTop: "16px", textAlign: "center" }}>
        {timer > 0 ? (
          <span className="text-base font-semibold text-[#BDC5D1]">
            Resend code in <span className="text-primary-500">{timer}</span>
          </span>
        ) : (
          <button className="text-primary-500" onClick={handleResend}>
            Resend Code
          </button>
        )}
      </div>
    </div>
  );
};

export default OtpForm;
