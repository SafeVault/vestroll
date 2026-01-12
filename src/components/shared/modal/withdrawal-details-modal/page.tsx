'use client'

import { useState } from 'react';
import { X, Copy, Share2 } from 'lucide-react';

export default function WithdrawalDetailsModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [copiedTx, setCopiedTx] = useState(false);
  const [copiedDate, setCopiedDate] = useState(false);
  
  // Demo transaction data
  const transaction = {
    amount: '-581 USDT',
    usdValue: '$ 576.19',
    network: 'Ethereum',
    status: 'Successful',
    txId: '0x4d8Sda...d72b3',
    fullTxId: '0x4d8Sdad72b3',
    fee: '0.0095 ETH (≈ $1.31)',
    date: '29th Oct 2025 | 2:00pm',
  };
  
  const handleClose = () => {
    setIsOpen(false);
  };
  
  const handleCopyTx = async () => {
    try {
      await navigator.clipboard.writeText(transaction.fullTxId);
      setCopiedTx(true);
      setTimeout(() => setCopiedTx(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  
  const handleCopyDate = async () => {
    try {
      await navigator.clipboard.writeText(transaction.date);
      setCopiedDate(true);
      setTimeout(() => setCopiedDate(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  
  const handleShareReceipt = () => {
    alert('Share receipt functionality');
  };
  
  if (!isOpen) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <button
          onClick={() => setIsOpen(true)}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Show Withdrawal Details
        </button>
      </div>
    );
  }
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-30">
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[340px] sm:max-w-md">
        {/* Header */}
        <div className="relative px-6 py-4 border-b border-gray-200">
          <button
            onClick={handleClose}
            className="absolute top-4 left-4 text-gray-700 hover:text-gray-900 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
          <h2 className="text-center text-base font-semibold text-gray-900">Withdrawal</h2>
        </div>
        
        {/* Content */}
        <div className="px-6 py-6">
          {/* Status Icon with Amount */}
          <div className="flex flex-col items-center mb-6 pb-6 border-b border-gray-100">
            {/* Icon */}
            <div className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center mb-4 shadow-md">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            
            {/* Amount */}
            <div className="text-center">
              <p className="text-2xl font-bold text-red-500 mb-1">
                {transaction.amount}
              </p>
              <p className="text-sm text-gray-500">{transaction.usdValue}</p>
            </div>
          </div>
          
          {/* Transaction Details */}
          <div className="space-y-4">
            {/* Network & Status Row */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center">
                  <svg className="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z"/>
                  </svg>
                </div>
                <span className="text-sm text-gray-600">Network</span>
                <span className="text-sm text-gray-900 font-medium">{transaction.network}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-green-500 font-medium">{transaction.status}</span>
              </div>
            </div>
            
            {/* Transaction ID Row */}
            <div className="bg-gray-50 rounded-lg px-4 py-3 flex justify-between items-center">
              <span className="text-sm text-gray-900 font-mono">{transaction.txId}</span>
              <button
                onClick={handleCopyTx}
                className="text-purple-600 hover:text-purple-700 transition-colors"
                aria-label="Copy transaction ID"
              >
                <Copy className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>
            {copiedTx && (
              <p className="text-green-600 text-xs text-center -mt-2">
                Transaction ID copied!
              </p>
            )}
            
            {/* Transaction ID Label */}
            <div className="text-xs text-gray-500 -mt-2 px-1">Transaction ID</div>
            
            {/* Fee Row */}
            <div className="flex justify-between items-center pt-1">
              <span className="text-sm text-gray-600">Fee</span>
              <span className="text-sm text-gray-900 font-medium">{transaction.fee}</span>
            </div>
            
            {/* Date Row */}
            <div className="bg-gray-50 rounded-lg px-4 py-3 flex justify-between items-center">
              <span className="text-sm text-gray-900 font-medium">{transaction.date}</span>
              <button
                onClick={handleCopyDate}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Copy date"
              >
                <Copy className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>
            {copiedDate && (
              <p className="text-green-600 text-xs text-center -mt-2">
                Date copied!
              </p>
            )}
          </div>
          
          {/* Share Receipt Button */}
          <button
            onClick={handleShareReceipt}
            className="w-full mt-6 py-3.5 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-medium text-sm flex items-center justify-center gap-2 shadow-sm"
          >
            <Share2 className="w-4 h-4" />
            Share receipt
          </button>
        </div>
      </div>
    </div>
  );
}