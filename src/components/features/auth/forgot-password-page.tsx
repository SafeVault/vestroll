import React, { useState } from 'react';
import AuthLayer from './auth/AuthLayer';

interface ForgotPasswordPageProps {
  onBackToLogin: () => void;
  onForgotPassword: () => void;
}

interface FormData {
  email: string;
}

interface FormErrors {
  email?: string;
}

export default function ForgotPasswordPage({
    onBackToLogin,
    onForgotPassword
  }: ForgotPasswordPageProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    email: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Forgot Password Request:', formData);
      setIsLoading(false);
      onForgotPassword();
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <AuthLayer>
      <div className="w-full">
        <div className="mb-10">
          <h2 className="text-gray-900 text-3xl font-bold mb-3">
            Forgot Your Password?
          </h2>
          <p className="text-gray-500 text-sm sm:text-base font-medium">
            Provide the email address linked to your VestRoll account to reset your password and login
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className="block text-gray-900 text-sm font-semibold">
              Email address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-gray-50 border ${
                  errors.email ? 'border-red-500' : 'border-gray-200'
                } rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-sm sm:text-base`}
                placeholder="Provide email address"
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 font-medium">{errors.email}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Sending..." : "Continue"}
          </button>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={onBackToLogin}
              className="text-sm font-bold text-primary-700 hover:text-primary-800"
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </AuthLayer>
  );
}
