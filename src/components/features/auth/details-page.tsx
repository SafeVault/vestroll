"use client";
import React, { useState, useMemo } from 'react';
import { Eye, EyeOff, Check } from 'lucide-react';
import AuthLayer from './auth/AuthLayer';
import { useRouter } from 'next/navigation';

interface RequirementItemProps {
  met: boolean;
  text: string;
}

const RequirementItem: React.FC<RequirementItemProps> = ({ met, text }) => (
  <div className="flex items-center gap-2">
    <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${
      met ? 'bg-primary-600' : 'bg-gray-100 border border-gray-200'
    }`}>
      {met && <Check size={10} className="text-white" strokeWidth={3} />}
    </div>
    <span className={`text-xs font-medium ${met ? 'text-gray-900' : 'text-gray-400'}`}>
      {text}
    </span>
  </div>
);

export default function DetailsPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    password: ''
  });

  const requirements = useMemo(() => ({
    minLength: formData.password.length >= 8,
    hasUppercase: /[A-Z]/.test(formData.password),
    hasNumber: /[0-9]/.test(formData.password),
    hasSpecial: /[!@#$%^&*]/.test(formData.password),
  }), [formData.password]);

  const allRequirementsMet = Object.values(requirements).every(Boolean);
  const isFormValid = formData.fullName && formData.companyName && allRequirementsMet;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    router.push('/verify-email');
  };

  return (
    <AuthLayer>
      <div className="w-full">
        {/* Stepper */}
        <div className="flex gap-2 mb-10 w-full">
          <div className="h-1 flex-1 bg-primary-600 rounded-full"></div>
          <div className="h-1 flex-1 bg-primary-600 rounded-full"></div>
          <div className="h-1 flex-1 bg-gray-100 rounded-full"></div>
          <div className="h-1 flex-1 bg-gray-100 rounded-full"></div>
          <div className="h-1 flex-1 bg-gray-100 rounded-full"></div>
        </div>

        <div className="mb-10">
          <h2 className="text-gray-900 text-3xl font-bold mb-3">
            Provide few details
          </h2>
          <p className="text-gray-500 text-sm sm:text-base font-medium">
            Tell us about yourself and your company to get started.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-gray-900 text-sm font-semibold">
              Full name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-sm"
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-900 text-sm font-semibold">
              Company name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-sm"
              placeholder="Enter your company name"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-900 text-sm font-semibold">
              Create password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-sm"
                placeholder="Enter password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-y-3 pt-2">
            <RequirementItem met={requirements.minLength} text="8 characters min" />
            <RequirementItem met={requirements.hasUppercase} text="One uppercase" />
            <RequirementItem met={requirements.hasNumber} text="One number" />
            <RequirementItem met={requirements.hasSpecial} text="One special character" />
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            Continue
          </button>
        </form>
      </div>
    </AuthLayer>
  );
}
