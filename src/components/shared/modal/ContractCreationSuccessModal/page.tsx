'use client'

import { useState } from 'react';
import { X } from 'lucide-react';

export default function ContractSuccessModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  
  // Demo contract link
  const contractLink = "https://app.VestBlock.sol/4cbab924-3466-49...";
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contractLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  
  const handleClose = () => {
    setIsOpen(false);
  };
  
  if (!isOpen) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <button
          onClick={() => setIsOpen(true)}
          className="px-6 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors"
        >
          Show Success Modal
        </button>
      </div>
    );
  }
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-40">
      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-xl w-full max-w-[280px] p-6">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 left-4 text-gray-700 hover:text-gray-900 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" strokeWidth={2} />
        </button>
        
        {/* Success Icon */}
        <div className="flex justify-center mt-6 mb-6">
          <div className="relative w-16 h-16">
            {/* Outer circle - light purple */}
            <div className="absolute inset-0 bg-purple-200 rounded-full opacity-40"></div>
            {/* Inner circle - darker purple */}
            <div className="absolute inset-2 bg-purple-700 rounded-full flex items-center justify-center">
              {/* Document icon */}
              <svg 
                className="w-7 h-7 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                strokeWidth={2}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                />
              </svg>
            </div>
          </div>
        </div>
        
        <h2 className="text-xl font-semibold text-gray-900 text-center mb-2">
          Contract created
        </h2>
        
        {/* Confirmation Message */}
        <p className="text-gray-500 text-center mb-6 text-xs leading-relaxed px-2">
          The contract has been created successfully. You can now<br />
          get shareable link and copy it from your contract page
        </p>
        
        {/* Shareable Link Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex-1 text-xs text-gray-700 truncate font-mono">
              {contractLink}
            </div>
            <button
              onClick={handleCopy}
              className="flex-shrink-0 text-purple-700 hover:text-purple-800 transition-colors text-xs font-medium flex items-center gap-1"
              aria-label="Copy link"
            >
              Copy
              <svg 
                className="w-3.5 h-3.5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" 
                />
              </svg>
            </button>
          </div>
          
          {copied && (
            <p className="text-green-600 text-xs mt-2 text-center">
              Link copied!
            </p>
          )}
        </div>
        
        <button
          onClick={handleClose}
          className="w-full py-3 bg-purple-700 text-white rounded-xl hover:bg-purple-800 transition-colors font-medium text-sm"
        >
          All done
        </button>
      </div>
    </div>
  );
}