"use client";

import React, { useState } from 'react';
import { Pencil, Mail, X } from 'lucide-react';

interface BillingEmailSectionProps {
  billingEmail: string;
  onEmailUpdate: (email: string) => void;
}

export default function BillingEmailSection({
  billingEmail,
  onEmailUpdate
}: BillingEmailSectionProps) {
  const [showModal, setShowModal] = useState(false);
  const [tempEmail, setTempEmail] = useState('');
  const [error, setError] = useState('');

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleUpdate = (): void => {
    const trimmedEmail = tempEmail.trim();
    
    if (!trimmedEmail) {
      setError('Email address is required');
      return;
    }
    
    if (!isValidEmail(trimmedEmail)) {
      setError('Please enter a valid email address');
      return;
    }
    
    onEmailUpdate(trimmedEmail);
    setShowModal(false);
    setTempEmail('');
    setError('');
  };

  const openModal = (): void => {
    setTempEmail(billingEmail);
    setError('');
    setShowModal(true);
  };

  const closeModal = (): void => {
    setShowModal(false);
    setTempEmail('');
    setError('');
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">
            Billing email address
          </h2>
          <button
            onClick={openModal}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
          >
            <Pencil className="w-3 h-3 sm:w-4 sm:h-4" />
            Edit
          </button>
        </div>
        
        {billingEmail ? (
          <div className="flex items-center gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-gray-500 mb-1">Email address</p>
              <p className="text-sm font-medium text-gray-900 truncate">{billingEmail}</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 px-4 text-xs sm:text-sm text-gray-500 bg-gray-50 rounded-lg">
            You don&apos;t have any billing email addresses set up currently, therefore, invoices will be sent to company administrators by default.
          </div>
        )}
      </div>

      {showModal && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Billing email address</h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <input
                type="email"
                value={tempEmail}
                onChange={(e) => {
                  setTempEmail(e.target.value);
                  if (error) setError('');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleUpdate();
                }}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors ${
                  error ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter billing email"
                autoFocus
              />
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>

            <button
              onClick={handleUpdate}
              className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

