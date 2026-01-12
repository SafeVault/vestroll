'use client';

import React, { useState, useRef } from 'react';

interface ProvideOTPModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (otp: string) => Promise<void>;
}

const ProvideOTPModal: React.FC<ProvideOTPModalProps> = ({
    isOpen,
    onClose,
    onSubmit
}) => {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
    const [isSubmitting, setIsSubmitting] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    React.useEffect(() => {
        if (!isOpen) return;

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);

        if (isOpen) {
            setTimeout(() => inputRefs.current[0]?.focus(), 100);
        }

        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    const handleChange = (inputValue: string, index: number) => {
        if (/^[0-9]?$/.test(inputValue)) {
            const newOtp = [...otp];
            newOtp[index] = inputValue;
            setOtp(newOtp);

            if (inputValue && index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text');
        const digits = pasteData.replace(/\D/g, '').slice(0, 6).split('');

        if (digits.length > 0) {
            const newOtp = [...otp];
            digits.forEach((digit, index) => {
                if (index < 6) {
                    newOtp[index] = digit;
                }
            });
            setOtp(newOtp);

            const nextIndex = Math.min(digits.length, 5);
            inputRefs.current[nextIndex]?.focus();
        }
    };

    const handleSubmit = async () => {
        const otpString = otp.join('');
        if (otpString.length !== 6) return;

        setIsSubmitting(true);
        try {
            await onSubmit(otpString);
            setOtp(Array(6).fill(''));
        } catch (error) {
            console.error('OTP submission failed:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    const isComplete = otp.every(digit => digit !== '');

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/30 backdrop-blur-[2px]"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div
                className="relative w-full max-w-sm bg-white rounded-2xl p-6 md:p-8 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Close modal"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>

                <h2 className="text-xl md:text-2xl font-bold text-center text-gray-900 mb-2">
                    Provide OTP
                </h2>

                <p className="text-sm text-center text-gray-600 mb-6">
                    Enter the verification code sent to your email address
                </p>

                <div className="flex justify-center gap-2 mb-6">
                    {otp.map((digit, index) => (
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
                            className="w-12 h-14 text-center text-xl font-semibold text-gray-900 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#5E2A8C] focus:ring-2 focus:ring-[#5E2A8C]/20 transition-all"
                            aria-label={`Digit ${index + 1}`}
                        />
                    ))}
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={!isComplete || isSubmitting}
                    className="w-full bg-[#5E2A8C] hover:bg-[#4E1F6C] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                    {isSubmitting ? 'Verifying...' : 'Submit'}
                </button>
            </div>
        </div>
    );
};

export default ProvideOTPModal;